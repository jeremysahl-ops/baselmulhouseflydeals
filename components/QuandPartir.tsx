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
              {c && (
                <p className="mt-1 text-[12px] leading-snug text-ink-soft">
                  {t.whenMax(Math.round(c[0]))}
                  <span className="block text-ink-muted">{t.whenRain(c[2] < 20 ? 0 : c[2] < 60 ? 1 : c[2] < 110 ? 2 : 3)}</span>
                </p>
              )}
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
