import climat from '@/lib/data/climat.json';
import type { Ville } from '@/lib/prix';
import { formatPrice } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

type Mois = [number, number, number, number] | null; // [t. max, t. min, pluie mm, jours de pluie]
const CLIMAT = climat as unknown as Record<string, Mois[]>;

/**
 * « Quand partir ? » : les 12 prochains mois d'une destination. Pour chacun, le prix courant d'une semaine
 * aller-retour (ou, à défaut, le plus bas prix courant des trois durées) coloré selon son rang parmi les mois
 * de la même ville (un tiers le moins cher en vert, un tiers le plus cher en rose), et le climat moyen.
 * Aucun pourcentage ni comparaison chiffrée.
 */
export default function QuandPartir({ code, ville, lang }: { code: string; ville: Ville | null; lang: Lang }) {
  const t = getDict(lang).ville;
  const clim = CLIMAT[code];
  const now = new Date();
  const mois = Array.from({ length: 12 }, (_, i) => {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + i, 1));
    return d.toISOString().slice(0, 7);
  });
  const prix = new Map<string, number>();
  for (const m of ville?.mois ?? []) {
    const courants = Object.values(m.durees).map((b) => b.courant).filter((x): x is number => x != null);
    const v = m.semaine ?? (courants.length ? Math.min(...courants) : null);
    if (v != null) prix.set(m.mois, v);
  }
  if (!clim && prix.size === 0) return null;
  const tries = [...prix.values()].sort((a, b) => a - b);
  const tiers = Math.floor(tries.length / 3);
  const rang = (v: number) => (tiers === 0 ? 'mid' : v <= tries[tiers - 1] ? 'cheap' : v >= tries[tries.length - tiers] ? 'dear' : 'mid');
  const court = new Intl.DateTimeFormat({ fr: 'fr-FR', de: 'de-DE', en: 'en-GB' }[lang], { month: 'short', timeZone: 'UTC' });

  return (
    <section className="mt-12" aria-labelledby="quand-partir">
      <h2 id="quand-partir" className="display text-4xl text-ink">{t.whenHeading}</h2>
      <p className="mt-2 max-w-3xl text-ink-soft">{t.whenLead}</p>
      <ol className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {mois.map((m) => {
          const v = prix.get(m);
          const r = v == null ? 'none' : rang(v);
          const c = clim?.[+m.slice(5, 7) - 1];
          const fond = r === 'cheap' ? 'bg-saving-soft border-saving/30' : r === 'dear' ? 'bg-[#fbeceb] border-[#e4b4ae]' : 'bg-white border-line';
          return (
            <li key={m} className={`rounded-lg border p-3 ${fond}`}>
              <p className="flex items-baseline justify-between text-sm font-semibold text-ink">
                <span className="capitalize">{court.format(new Date(`${m}-01T00:00:00Z`)).replace('.', '')}</span>
                <span className="text-[11px] font-normal text-ink-muted">{m.slice(0, 4)}</span>
              </p>
              <p className={`mt-1 font-board text-lg font-bold ${r === 'cheap' ? 'text-saving' : r === 'dear' ? 'text-[#a3341f]' : 'text-ink'}`}>
                {v != null ? formatPrice(v, lang) : <span className="text-sm font-normal text-ink-muted">{t.whenNoPrice}</span>}
              </p>
              {c && (() => {
                const pluie = c[2] < 20 ? 0 : c[2] < 60 ? 1 : c[2] < 110 ? 2 : 3;
                return (
                  <div className="mt-1 space-y-0.5 text-[12px] leading-snug">
                    <p className="flex items-center gap-1 text-ink-soft">
                      <Thermometre chaud={c[0]} />
                      {t.whenMax(Math.round(c[0]))}
                    </p>
                    <p className="flex items-center gap-1 text-ink-muted">
                      <Meteo pluie={pluie} />
                      {t.whenRain(pluie)}
                    </p>
                  </div>
                );
              })()}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink-muted">
        <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-saving-soft ring-1 ring-saving/40 align-middle" />{t.whenCheap}</span>
        <span><span className="mr-1 inline-block h-2.5 w-2.5 rounded-sm bg-[#fbeceb] ring-1 ring-[#e4b4ae] align-middle" />{t.whenDear}</span>
      </p>
      {clim && <p className="mt-1 text-xs text-ink-muted">{t.whenClimate}</p>}
    </section>
  );
}

/** Petit thermomètre, rouge quand il fait chaud (25° et plus), orange entre 15 et 25°, bleu en dessous. */
function Thermometre({ chaud }: { chaud: number }) {
  const couleur = chaud >= 25 ? '#d9452b' : chaud >= 15 ? '#e08a1e' : '#2f6fd1';
  const niveau = chaud >= 25 ? 4 : chaud >= 15 ? 7 : 10;
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke={couleur} strokeWidth={1.8} strokeLinecap="round" aria-hidden="true">
      <path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z" />
      <path d={`M12 ${niveau}v7`} strokeWidth={2.4} />
      <circle cx="12" cy="17" r="1.6" fill={couleur} />
    </svg>
  );
}

/** Soleil (sec), soleil et nuage (averses), nuage et goutte (pluvieux), deux gouttes (très pluvieux). */
function Meteo({ pluie }: { pluie: number }) {
  const soleil = '#e0a400', nuage = '#7c8798', goutte = '#2f6fd1';
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {pluie === 0 && (
        <g stroke={soleil}>
          <circle cx="12" cy="12" r="4" fill={soleil} />
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </g>
      )}
      {pluie === 1 && (
        <>
          <g stroke={soleil}><circle cx="9" cy="8" r="3" fill={soleil} /><path d="M9 2.5v1.2M3.5 8h1.2M5 4l.9.9M13 4l-.9.9" /></g>
          <path d="M8 19h9a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.4 1.6A2.8 2.8 0 0 0 8 19z" stroke={nuage} fill="#ffffff" />
        </>
      )}
      {pluie >= 2 && (
        <>
          <path d="M7 14h10a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.4 1.6A2.8 2.8 0 0 0 7 14z" stroke={nuage} />
          <path d="M10 17l-1 3" stroke={goutte} />
          {pluie === 3 && <path d="M14 17l-1 3" stroke={goutte} />}
        </>
      )}
    </svg>
  );
}
