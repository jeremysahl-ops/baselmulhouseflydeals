'use client';

// Calendrier des ponts et vacances des trois pays : 11 mois de grilles, une barre de couleur par pays en vacances
// ou en pont, jours fériés en gras. Un clic sur un jour coloré affiche les meilleurs combos de la période.
import { useMemo, useState } from 'react';
import Board from '@/components/Board';
import type { Combo } from '@/lib/prix';
import type { Pays, Periode } from '@/lib/vacances';
import { formatDay } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

export interface PeriodeAvecCombos extends Periode { combos: Combo[]; proches: Combo[] }
interface Ferie { date: string; pays: Pays[]; noms: Record<Lang, string> }

export const COULEUR_PAYS: Record<Pays, string> = { FR: '#2f5bd3', CH: '#d23b3b', DE: '#c9971c' };
const iso = (d: Date) => d.toISOString().slice(0, 10);

export default function CalendrierVacances({ periodes, feries, mois, lang }: {
  periodes: PeriodeAvecCombos[]; feries: Ferie[]; mois: string[]; lang: Lang;
}) {
  const t = getDict(lang).vacances;
  const [choisie, setChoisie] = useState<string>(periodes[0]?.id ?? '');
  const [jourClique, setJourClique] = useState<string | null>(null);
  const ferieDe = useMemo(() => new Map(feries.map((f) => [f.date, f])), [feries]);
  const periodesDuJour = (d: string) => periodes.filter((p) => d >= p.debut && d <= p.fin);
  const sel = periodes.find((p) => p.id === choisie);
  const loc = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang];
  const nomMois = new Intl.DateTimeFormat(loc, { month: 'long', year: 'numeric', timeZone: 'UTC' });
  const nomJour = new Intl.DateTimeFormat(loc, { weekday: 'narrow', timeZone: 'UTC' });
  const lundi = new Date(Date.UTC(2024, 0, 1));
  const entetes = Array.from({ length: 7 }, (_, i) => nomJour.format(new Date(lundi.getTime() + i * 864e5)));

  const choisirJour = (d: string) => {
    const liste = periodesDuJour(d);
    if (!liste.length) return;
    setJourClique(liste.length > 1 ? d : null);
    // Par défaut la période la plus courte (un pont plutôt que des vacances qui l'englobent).
    const courte = [...liste].sort((a, b) => (Date.parse(a.fin) - Date.parse(a.debut)) - (Date.parse(b.fin) - Date.parse(b.debut)))[0];
    setChoisie(courte.id);
    requestAnimationFrame(() => document.getElementById('periode-choisie')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return (
    <div>
      <p className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-ink-soft">
        {(Object.keys(COULEUR_PAYS) as Pays[]).map((p) => (
          <span key={p} className="flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-5 rounded-full" style={{ backgroundColor: COULEUR_PAYS[p] }} />
            {t.pays[p]}
          </span>
        ))}
        <span><b className="text-ink">12</b> = {t.ferie}</span>
      </p>
      <p className="mb-5 text-sm text-ink-soft">{t.clic}</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mois.map((m) => {
          const premier = new Date(`${m}-01T00:00:00Z`);
          const decalage = (premier.getUTCDay() + 6) % 7;
          const nbJours = new Date(Date.UTC(premier.getUTCFullYear(), premier.getUTCMonth() + 1, 0)).getUTCDate();
          return (
            <section key={m} className="rounded-xl border border-line bg-white p-3" aria-label={nomMois.format(premier)}>
              <h3 className="mb-2 text-sm font-bold capitalize text-ink">{nomMois.format(premier)}</h3>
              <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
                {entetes.map((e, i) => <span key={i} className="pb-1 font-semibold uppercase text-ink-muted">{e}</span>)}
                {Array.from({ length: decalage }, (_, i) => <span key={`v${i}`} />)}
                {Array.from({ length: nbJours }, (_, i) => {
                  const d = iso(new Date(premier.getTime() + i * 864e5));
                  const ps = periodesDuJour(d);
                  const f = ferieDe.get(d);
                  const pays = (['FR', 'CH', 'DE'] as Pays[]).filter((x) => ps.some((p) => p.pays.includes(x)) || f?.pays.includes(x));
                  const actif = sel && d >= sel.debut && d <= sel.fin;
                  const we = (new Date(`${d}T00:00:00Z`).getUTCDay() + 6) % 7 >= 5;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => choisirJour(d)}
                      disabled={!ps.length}
                      title={[f?.noms[lang], ...ps.map((p) => p.noms[lang])].filter(Boolean).join(' · ') || undefined}
                      className={`relative flex h-8 flex-col items-center justify-start rounded pt-0.5 ${ps.length ? 'cursor-pointer hover:bg-brand-soft' : 'cursor-default'} ${actif ? 'bg-flap/30 ring-1 ring-ink' : ''} ${we ? 'text-ink-muted' : 'text-ink-soft'}`}
                    >
                      <span className={f ? 'font-extrabold text-ink' : ''}>{i + 1}</span>
                      <span className="absolute inset-x-1 bottom-0.5 flex gap-px">
                        {pays.map((x) => <span key={x} className="h-1 flex-1 rounded-full" style={{ backgroundColor: COULEUR_PAYS[x] }} />)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {sel && (
        <section id="periode-choisie" className="mt-10 scroll-mt-24" aria-live="polite">
          {jourClique && periodesDuJour(jourClique).length > 1 && (
            <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-ink-muted">{t.choix}</span>
              {periodesDuJour(jourClique).map((p) => (
                <button key={p.id} type="button" onClick={() => setChoisie(p.id)}
                  className={`rounded-md border px-3 py-1 ${p.id === choisie ? 'border-ink bg-ink text-white' : 'border-line bg-white text-ink hover:border-ink'}`}>
                  {p.noms[lang]}
                </button>
              ))}
            </div>
          )}
          <p className="flex flex-wrap items-center gap-2 text-xs">
            <span className="eyebrow">{sel.type === 'pont' ? t.typePont : t.typeVacances}</span>
            {sel.pays.map((x) => (
              <span key={x} className="rounded px-2 py-0.5 font-semibold text-white" style={{ backgroundColor: COULEUR_PAYS[x] }}>{x}</span>
            ))}
          </p>
          <h2 className="display mt-1 text-3xl text-ink">{sel.noms[lang]}</h2>
          <p className="mb-4 mt-1 text-sm text-ink-soft">{t.dates(formatDay(sel.debut, lang), formatDay(sel.fin, lang))}</p>
          <Board combos={sel.combos} lang={lang} title={sel.noms[lang]} empty={t.empty} />
          {sel.proches.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-1 text-lg font-semibold text-ink">{t.prochesTitre}</h3>
              <p className="mb-3 text-sm text-ink-soft">{t.prochesTexte}</p>
              <Board combos={sel.proches} lang={lang} title={t.prochesTitre} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
