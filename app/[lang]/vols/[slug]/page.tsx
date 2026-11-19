import type { Metadata } from 'next';
import Link from 'next/link';
import AirportVisual from '@/components/AirportVisual';
import QuandPartir from '@/components/QuandPartir';
import PhotoIncontournable, { aDesPhotos } from '@/components/PhotoIncontournable';
import { themeDe } from '@/components/ThemeIcon';
import SejourTuiles from '@/components/SejourTuiles';
import { conseils } from '@/lib/conseils';
import { fullItinerary } from '@/lib/itineraries';
import { notFound } from 'next/navigation';
import { AIRPORTS, airportCountry, airportFromSlug, airportName, airportSlug, lienVol, NOM_COMPAGNIE } from '@/lib/airports';
import { DUREES, getVille, meilleurParVille } from '@/lib/prix';
import { guidePath } from '@/lib/guides';
import { formatDay, formatMonth, formatPrice, formatStamp } from '@/lib/format';
import { LOCALES, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';
import DateReleve from '@/components/DateReleve';

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
  const must = guide ? (fullItinerary(guide, lang)?.slice(0, 3) ?? null) : null;
  const mustFr = guide ? (fullItinerary(guide, 'fr')?.slice(0, 3) ?? []) : [];
  const aligne = guide ? aDesPhotos([0, 1, 2].map((i) => `${guide}|${i}`)) : false;
  const tips = conseils(code, lang);
  const best = meilleurParVille().find((c) => c.code === code)?.prix ?? null;

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href={localePath(lang, '/destinations')} className="hover:text-ink">{dict.destinations.crumb}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <header className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl bg-board sm:aspect-[21/9]">
        <AirportVisual code={code} lang={lang} sizes="(max-width: 1152px) 100vw, 1152px" width={1600} priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
          <div>
            <p className="eyebrow !text-white/80">{t.eyebrow(airportCountry(code, lang))}</p>
            <h1 className="display mt-2 text-6xl text-white sm:text-7xl">
              <span className="font-board text-xl text-white/70 sm:text-2xl">BSL → {code}</span>
              <span className="block">{label}</span>
            </h1>
          </div>
          {best != null && (
            <a href="#prix" className="flex items-center gap-3 rounded-lg bg-board/85 px-4 py-3 font-board text-board-text backdrop-blur hover:bg-board">
              <span className="text-sm">{t.fromLabel}</span>
              <span className="flap text-2xl">{formatPrice(best, lang)}</span>
            </a>
          )}
        </div>
      </header>

      {must && (
        <section className="mt-12" aria-labelledby="incontournables">
          <h2 id="incontournables" className="display text-4xl text-ink">{t.mustHeading(label)}</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {must.map((d, i) => (
              <li key={d.title}>
                {guide && mustFr[i] && <PhotoIncontournable cle={`${guide}|${i}`} theme={themeDe(guide, i, mustFr[i].title, mustFr[i].text)} lang={lang} alt={d.title} aligne={aligne} />}
                <span className="mt-4 block border-t-2 border-ink pt-3 font-board text-sm font-bold text-ink-muted">0{i + 1}</span>
                <h3 className="mt-1 text-lg font-semibold text-ink">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.text}</p>
              </li>
            ))}
          </ol>
          {guide && (
            <Link href={localePath(lang, guidePath(guide))} className="mt-5 inline-block font-semibold text-ink underline underline-offset-4">
              {t.mustMore} →
            </Link>
          )}
        </section>
      )}

      {tips && (
        <section className="mt-12" aria-labelledby="conseils">
          <h2 id="conseils" className="display text-4xl text-ink">{t.tipsHeading}</h2>
          <dl className="mt-6 grid gap-x-8 gap-y-5 rounded-xl border border-line bg-white p-6 sm:grid-cols-2">
            {tips.map((tip, i) => (
              <div key={i}>
                <dt className="eyebrow">{t.tipLabels[i]}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-soft">{tip}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-ink-muted">{t.tipsNote}</p>
        </section>
      )}

      <QuandPartir code={code} ville={ville} lang={lang} />

      <section id="prix" className="mt-12 scroll-mt-24" aria-labelledby="prix-titre">
        <h2 id="prix-titre" className="display text-4xl text-ink">{t.pricesHeading}</h2>
        {ville && <p className="mb-6 mt-2 text-ink-soft"><DateReleve texte={t.lead(dict.place.city, formatStamp(ville.vuLe, lang))} date={formatStamp(ville.vuLe, lang)} /></p>}
      </section>

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
                                  href={lienVol(c, lang)}
                                  target="_blank"
                                  rel="noopener nofollow"
                                  aria-label={dict.board.bookAria(label, from, to, price, NOM_COMPAGNIE[c.cie])}
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

      <section className="mt-12" aria-labelledby="pour-ton-sejour">
        <h2 id="pour-ton-sejour" className="display text-4xl text-ink">{dict.pourTonSejour.heading}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{dict.pourTonSejour.text(label)}</p>
        <SejourTuiles code={code} lang={lang} />
      </section>
      <p className="mt-8">
        <Link href={localePath(lang, '/destinations')} className="font-semibold text-ink underline underline-offset-4">← {t.allDestinations}</Link>
      </p>
    </div>
  );
}
