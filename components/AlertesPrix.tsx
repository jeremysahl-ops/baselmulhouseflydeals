'use client';

// Page « Alertes de prix » : installer l'application, autoriser les notifications, créer et supprimer ses alertes.
// Les alertes sont enregistrées dans Supabase par les fonctions alerte_ajouter / alertes_lister / alerte_supprimer
// (pipeline/sql/2026-11-24_alertes_prix.sql) ; l'envoi se fait après chaque relevé (scripts/envoi-alertes.mjs).
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SITE } from '@/lib/site';
import { getDict, type Lang } from '@/lib/i18n';
interface Alerte { id: string; code: string | null; prix_max: number; duree: string | null; mois: string | null }
interface InstallEvent extends Event { prompt: () => Promise<void> }
declare global { interface Window { __flybslInstall?: InstallEvent } }

function cle(base64: string): Uint8Array<ArrayBuffer> {
  const pad = '='.repeat((4 - (base64.length % 4)) % 4);
  const raw = atob((base64 + pad).replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(new ArrayBuffer(raw.length));
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

export default function AlertesPrix({
  lang, destinations, durees, mois,
}: {
  lang: Lang;
  destinations: { code: string; nom: string }[];
  durees: { value: string; label: string }[];
  mois: { value: string; label: string }[];
}) {
  const t = getDict(lang).alerts;
  const [support, setSupport] = useState<'oui' | 'non' | null>(null);
  const [installe, setInstalle] = useState(false);
  const [ios, setIos] = useState(false);
  const [installable, setInstallable] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);
  const [abo, setAbo] = useState<PushSubscription | null>(null);
  const [alertes, setAlertes] = useState<Alerte[]>([]);
  const [form, setForm] = useState({ code: '', prix: 100, duree: '', mois: '' });
  const [etat, setEtat] = useState<'' | 'envoi' | 'ok' | 'erreur'>('');

  const nom = (code: string | null) => (code ? destinations.find((d) => d.code === code)?.nom ?? code : t.allDest);
  const euros = (n: number) => new Intl.NumberFormat({ fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang], { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  const charger = useCallback(async (s: PushSubscription) => {
    const { data } = await supabase.rpc('alertes_lister', { p_endpoint: s.endpoint });
    setAlertes((data as Alerte[]) ?? []);
  }, []);

  useEffect(() => {
    const ok = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
    setSupport(ok ? 'oui' : 'non');
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    setInstalle(window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true);
    setInstallable(!!window.__flybslInstall);
    const surInstall = () => setInstallable(true);
    window.addEventListener('flybsl-installable', surInstall);
    if (ok) {
      setPermission(Notification.permission);
      navigator.serviceWorker.ready.then(async (reg) => {
        const s = await reg.pushManager.getSubscription();
        if (s) { setAbo(s); charger(s); }
      });
    }
    return () => window.removeEventListener('flybsl-installable', surInstall);
  }, [charger]);

  const installer = async () => {
    const e = window.__flybslInstall;
    if (!e) return;
    await e.prompt();
    window.__flybslInstall = undefined;
    setInstallable(false);
  };

  const activer = async () => {
    const p = await Notification.requestPermission();
    setPermission(p);
    if (p !== 'granted') return;
    const reg = await navigator.serviceWorker.ready;
    const s = (await reg.pushManager.getSubscription()) ?? (await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: cle(SITE.vapidPublicKey) }));
    setAbo(s);
    charger(s);
  };

  const ajouter = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!abo) return;
    setEtat('envoi');
    const k = abo.toJSON().keys ?? {};
    const { error } = await supabase.rpc('alerte_ajouter', {
      p_endpoint: abo.endpoint, p_p256dh: k.p256dh ?? '', p_auth: k.auth ?? '', p_lang: lang,
      p_code: form.code, p_prix_max: Math.round(form.prix), p_duree: form.duree, p_mois: form.mois,
    });
    setEtat(error ? 'erreur' : 'ok');
    if (!error) charger(abo);
  };

  const supprimer = async (id: string) => {
    if (!abo) return;
    await supabase.rpc('alerte_supprimer', { p_endpoint: abo.endpoint, p_id: id });
    charger(abo);
  };

  const bloc = 'rounded-xl border border-line bg-white p-5 sm:p-6';
  const titre = 'text-lg font-semibold text-ink';
  const champ = 'mt-1 w-full rounded-md border border-line bg-white px-3 py-2 text-ink';

  return (
    <div className="mt-8 grid gap-5">
      <section className={bloc}>
        <h2 className={titre}>{t.step1}</h2>
        {installe ? (
          <p className="mt-2 text-saving">✓ {t.installed}</p>
        ) : installable ? (
          <button type="button" onClick={installer} className="btn-primary mt-3">{t.installBtn}</button>
        ) : (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{ios ? t.installIos : t.installOther}</p>
        )}
      </section>

      <section className={bloc}>
        <h2 className={titre}>{t.step2}</h2>
        {support === 'non' ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.notifUnsupported}</p>
        ) : permission === 'denied' ? (
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.notifDenied}</p>
        ) : abo ? (
          <p className="mt-2 text-saving">✓ {t.notifOk}</p>
        ) : (
          <button type="button" onClick={activer} disabled={support !== 'oui'} className="btn-primary mt-3">{t.notifBtn}</button>
        )}
      </section>

      <section className={`${bloc} ${abo ? '' : 'opacity-50'}`} aria-disabled={!abo}>
        <h2 className={titre}>{t.step3}</h2>
        <form onSubmit={ajouter} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-ink-soft">
            {t.destLabel}
            <select className={champ} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} disabled={!abo}>
              <option value="">{t.allDest}</option>
              {destinations.map((d) => <option key={d.code} value={d.code}>{d.nom}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-ink-soft">
            {t.maxLabel}
            <input className={champ} type="number" min={10} max={5000} step={5} required value={form.prix} onChange={(e) => setForm({ ...form, prix: Number(e.target.value) })} disabled={!abo} />
          </label>
          <label className="text-sm font-medium text-ink-soft">
            {t.durationLabel}
            <select className={champ} value={form.duree} onChange={(e) => setForm({ ...form, duree: e.target.value })} disabled={!abo}>
              <option value="">{t.anyDuration}</option>
              {durees.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
          </label>
          <label className="text-sm font-medium text-ink-soft">
            {t.monthLabel}
            <select className={champ} value={form.mois} onChange={(e) => setForm({ ...form, mois: e.target.value })} disabled={!abo}>
              <option value="">{t.anyMonth}</option>
              {mois.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary" disabled={!abo || etat === 'envoi'}>{etat === 'envoi' ? t.adding : t.addBtn}</button>
            {etat === 'ok' && <p className="mt-2 text-sm text-saving">{t.added}</p>}
            {etat === 'erreur' && <p className="mt-2 text-sm text-[#a3341f]">{t.error}</p>}
          </div>
        </form>

        <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-ink-muted">{t.listTitle}</h3>
        {alertes.length === 0 ? (
          <p className="mt-2 text-sm text-ink-muted">{t.none}</p>
        ) : (
          <ul className="mt-2 divide-y divide-line">
            {alertes.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="text-ink">
                  <strong>{nom(a.code)}</strong> · {t.under(euros(a.prix_max))}
                  {a.duree && <span className="text-ink-muted"> · {durees.find((d) => d.value === a.duree)?.label}</span>}
                  {a.mois && <span className="text-ink-muted"> · {mois.find((m) => m.value === a.mois)?.label ?? a.mois}</span>}
                </span>
                <button type="button" onClick={() => supprimer(a.id)} className="text-ink-muted underline hover:text-ink">{t.deleteBtn}</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <p className="text-xs leading-relaxed text-ink-muted">{t.note}</p>
    </div>
  );
}
