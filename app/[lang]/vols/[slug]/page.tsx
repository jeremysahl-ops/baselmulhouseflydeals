import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AIRPORTS, airportCountry, airportFromSlug, airportName, airportSlug, lienEasyJet } from '@/lib/airports';
import { DUREES, getVille } from '@/lib/prix';
import { guidePath } from '@/lib/guides';
import { formatDay, formatMonth, formatPrice, formatStamp } from '@/lib/format';
import { LOCALES, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => Object.keys(AIRPORTS).map((c) => ({ lang, slug: airportSlug(c) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const code = airportFromSlug(slug);
  if (!isLang(lang) || !code) return {};
  const dict = getDict(lang);
  const label = airportName(code, lang);
  return {
    title: dict.ville.metaTitle(label, dict.place.city),
    description: dict.ville.metaDescription(label, dict.place.city),
    alternates: alternatesFor(lang, `/vols/${slug}`),
  };
}

export default async function VillePage({ params }: Props) {
  const lang = await langParam(params);
  const { slug } = await params;
  const code = airportFromSlug(slug);
  if (!code) notFound();
  const dict = getDict(lang);
  const t = dict.ville;
  const label = airportName(code, lang);
  const ville = getVille(code);
  const guide = AIRPORTS[code].guide;

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href={localePath(lang, '/destinations')} className="hover:text-ink">{dict.destinations.crumb}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <header className="mb-8 mt-4 max-w-3xl">
        <p className="eyebrow">{t.eyebrow(airportCountry(code, lang))}</p>
        <h1 className="display mt-2 text-6xl text-ink sm:text-7xl">
          <span className="font-board text-2xl text-ink-muted sm:text-3xl">BSL → {code}</span>
          <span className="block">{label}</span>
        </h1>
        {ville && <p className="mt-4 text-ink-soft">{t.lead(dict.place.city, formatStamp(ville.vuLe, lang))}</p>}
        {guide && (
          <Link href={localePath(lang, guidePath(guide))} className="mt-4 inline-block font-semibold text-ink underline underline-offset-4">
            {t.guide(label)} →
          </Link>
        )}
      </header>

      {!ville || ville.mois.length === 0 ? (
        <p className="board px-5 py-8 text-sm text-board-dim">{t.noData(label)}</p>
      ) : (
        <div className="space-y-5">
          {ville.mois.map((m) => (
            <section key={m.mois} className="board" aria-labelledby={`m-${m.mois}`}>
              <div className="board-head">
                <h2 id={`m-${m.mois}`} className="text-sm font-bold tracking-[0.2em] text-board-text">{formatMonth(m.mois, lang)}</h2>
                {m.semaine != null && <span className="normal-case tracking-normal">{t.weekCourant(formatPrice(m.semaine, lang))}</span>}
              </div>
              <div className="grid divide-y divide-board-line md:grid-cols-3 md:divide-x md:divide-y-0">
                {DUREES.map((d) => {
                  const bloc = m.durees[d];
                  return (
                    <div key={d} className="px-4 py-4 sm:px-5">
                      <p className="flex items-baseline justify-between gap-2">
                        <span className="text-[13px] font-bold uppercase tracking-wide">{dict.durees[d].label}</span>
                        <span className="text-[11px] text-board-dim">{dict.durees[d].hint}</span>
                      </p>
                      {bloc.courant != null && <p className="mt-1 text-[11px] text-board-dim">{t.courant(formatPrice(bloc.courant, lang))}</p>}
                      {bloc.combos.length === 0 ? (
                        <p className="mt-3 text-[12px] text-board-dim">{t.noCombo}</p>
                      ) : (
                        <ul className="mt-3 space-y-2">
                          {bloc.combos.map((c) => {
                            const from = formatDay(c.depart, lang);
                            const to = formatDay(c.retour, lang);
                            const price = formatPrice(c.prix, lang);
                            return (
                              <li key={`${c.depart}-${c.nuits}`}>
                                <a
                                  href={lienEasyJet(c, lang)}
                                  target="_blank"
                                  rel="noopener nofollow"
                                  aria-label={dict.board.bookAria(label, from, to, price)}
                                  className="flex items-center justify-between gap-3 rounded px-1 py-0.5 hover:bg-board-row"
                                >
                                  <span className="text-[12px]">
                                    {from} <span className="text-board-dim">→</span> {to}
                                    <span className="block text-[11px] text-board-dim">{dict.board.nights(c.nuits)}</span>
                                  </span>
                                  <span className="flap text-base">{price}</span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      <p className="mt-6 max-w-3xl text-xs leading-relaxed text-ink-muted">{dict.board.note}</p>
      <p className="mt-8">
        <Link href={localePath(lang, '/destinations')} className="font-semibold text-ink underline underline-offset-4">← {t.allDestinations}</Link>
      </p>
    </div>
  );
}
