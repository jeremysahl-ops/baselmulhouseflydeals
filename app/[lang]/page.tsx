import Link from 'next/link';
import Board from '@/components/Board';
import DestinationTile from '@/components/DestinationTile';
import MonthTile from '@/components/MonthTile';
import PartnerCard from '@/components/PartnerCard';
import RouteMap from '@/components/RouteMap';
import HotelPickCard from '@/components/HotelPickCard';
import { partnersForHome } from '@/lib/partners';
import { activeHotelPicks } from '@/lib/hotel-picks';
import { AIRPORTS, airportName, airportSlug } from '@/lib/airports';
import { DESTINATIONS } from '@/lib/destinations';
import { combosDuMois, dernierReleve, meilleurParVille, moisDisponibles } from '@/lib/prix';
import { formatMonth, formatPrice, formatStamp } from '@/lib/format';
import { getDict, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';
import DateReleve from '@/components/DateReleve';

// Pages entièrement statiques : les données ne changent qu'à une mise en ligne. Une régénération
// périodique (ISR) consommait le quota gratuit de Vercel (« ISR Writes »), alerte du 22/11/2026.
export const revalidate = false;
export const dynamic = 'force-static';

/** Photo de l'accueil : une destination réelle au départ de Bâle, photo contrôlée (lib/destinations.ts). */
const HERO = { code: 'FUE', photo: DESTINATIONS['Fuerteventura'].photo };

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.home;
  const href = (p: string) => localePath(lang, p);

  const top = meilleurParVille();
  const mois = moisDisponibles().map((m) => ({ mois: m, combos: combosDuMois(m) }));
  const fromByCode = new Map(top.map((c) => [c.code, c.prix]));
  const codes = Object.keys(AIRPORTS);
  // Vitrine : les villes avec un prix (les moins chères d'abord), complétées par des villes avec photo.
  const vitrine = [
    ...top.map((c) => c.code),
    ...codes.filter((c) => AIRPORTS[c].guide && !fromByCode.has(c)).sort((a, b) => airportName(a, lang).localeCompare(airportName(b, lang), lang)),
  ].slice(0, 8);
  const updated = dernierReleve();
  const partners = partnersForHome();
  const hotelPicks = activeHotelPicks();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: t.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-board">
        {/* Photo de fond : Fuerteventura (destination desservie depuis Bâle), déjà contrôlée pour la page guide. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://images.unsplash.com/${HERO.photo}?auto=format&fit=crop&w=2000&q=70`}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[30%_20%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-board/70 via-board/40 to-board/75 lg:bg-gradient-to-r lg:from-board/75 lg:via-board/25 lg:to-transparent" aria-hidden="true" />

        <div className="container-page grid gap-10 pb-14 pt-28 md:pb-20 md:pt-32 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          <div className="text-white">
            <p className="eyebrow !text-white/75">{dict.common.tagline}</p>
            <h1 className="display mt-4 text-6xl drop-shadow-sm sm:text-7xl">
              {t.h1a}
              <span className="mt-1 block text-4xl text-white/85 xl:text-5xl">{t.h1b(dict.place.city)}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">{t.lead}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90">{t.lead2}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href('/prix')} className="btn-primary">{t.ctaCheapest}</Link>
              <Link href={href('/mois')} className="btn-secondary !border-white/40 !bg-white/10 !text-white backdrop-blur hover:!border-white">
                {t.ctaMonths}
              </Link>
            </div>
            {updated && <p className="eyebrow mt-8 !text-white/70"><DateReleve texte={t.lastUpdate(formatStamp(updated, lang))} date={formatStamp(updated, lang)} sombre /></p>}
          </div>

          <div>
            <div className="shadow-2xl shadow-black/40">
              <Board combos={top.slice(0, 8)} lang={lang} title={t.boardHeading} />
            </div>
            <p className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm text-white/85 [text-shadow:0_1px_2px_rgb(0_0_0/0.6)]">
              <span>{t.boardText}</span>
              <Link href={href('/prix')} className="font-semibold text-white underline underline-offset-4">{t.boardAll} →</Link>
            </p>
          </div>
        </div>

        <Link
          href={href(`/vols/${airportSlug(HERO.code)}`)}
          className="absolute bottom-3 right-4 rounded bg-black/40 px-2 py-1 font-board text-[11px] text-white/85 backdrop-blur hover:text-white"
        >
          {t.heroPhoto(airportName(HERO.code, lang))}
        </Link>
      </section>

      <section className="container-page pt-14" aria-labelledby="carte-routes">
        <h2 id="carte-routes" className="display text-4xl text-ink">{dict.carte.heading}</h2>
        <p className="mt-2 max-w-2xl text-ink-soft">{dict.carte.text}</p>
        <div className="mt-6">
          <RouteMap lang={lang} />
        </div>
      </section>

      {mois.length > 0 && (
        <section className="container-page py-14">
          <h2 className="display text-4xl text-ink">{t.monthsHeading}</h2>
          <p className="mt-2 text-ink-soft">{t.monthsText}</p>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {mois.map((m) => (
              <li key={m.mois}>
                <MonthTile mois={m.mois} combos={m.combos} lang={lang} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-y border-line bg-white">
        <div className="container-page py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="display text-4xl text-ink">{t.destHeading}</h2>
              <p className="mt-2 max-w-2xl text-ink-soft">{t.destText(codes.length)}</p>
            </div>
          </div>
          <ul className="-mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {vitrine.map((c) => (
              <li key={c} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <DestinationTile code={c} lang={lang} price={fromByCode.get(c)} sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw" />
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <Link href={href('/destinations')} className="btn-secondary">{t.destAllCount(codes.length)} →</Link>
          </div>
        </div>
      </section>

      {partners.length > 0 && (
        <section className="container-page space-y-4 pt-12" aria-label={t.partnersAria}>
          {partners.map((p) => (
            <PartnerCard key={p.name} partner={p} lang={lang} />
          ))}
        </section>
      )}

      {hotelPicks.length > 0 && (
        <section id="hotels" className="container-page scroll-mt-20 pt-12">
          <h2 className="display text-4xl text-ink">{t.hotelsHeading}</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">
            {t.hotelsText(dict.place.city)}
            {!hotelPicks.some((p) => p.partner) && ` ${dict.deal.noCommission}`}
          </p>
          <div className="mt-6 space-y-4">
            {hotelPicks.map((p) => (
              <HotelPickCard key={`${p.destination}-${p.name}-${p.checkedOn}`} pick={p} lang={lang} showDestination />
            ))}
          </div>
        </section>
      )}

      <section className="container-page py-14">
        <h2 className="display text-4xl text-ink">{t.stepsHeading}</h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {t.steps.map((step, i) => (
            <li key={step.title} className="border-t-2 border-ink pt-4">
              <span className="font-board text-sm font-bold text-ink-muted">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>


      <section className="container-page pb-4">
        <h2 className="display text-4xl text-ink">{t.faqHeading}</h2>
        <div className="mt-6 divide-y divide-line border-y border-line">
          {t.faq.map(({ q, a }) => (
            <details key={q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {q}
                <span className="font-board text-ink-muted transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
