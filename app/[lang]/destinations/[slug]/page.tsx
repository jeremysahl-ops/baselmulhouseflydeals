import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DealCard from '@/components/DealCard';
import DealVisual from '@/components/DealVisual';
import HotelPickCard from '@/components/HotelPickCard';
import PartnerCard from '@/components/PartnerCard';
import { ItineraryDays } from '@/components/ItinerarySection';
import { DESTINATIONS } from '@/lib/destinations';
import { destinationCountry, destinationLabel } from '@/lib/format';
import { allDestinations, destinationFromSlug, guidePath, guideSlug } from '@/lib/guides';
import { activeHotelPicks } from '@/lib/hotel-picks';
import { HOTEL_PARTNER, hotelCityLink } from '@/lib/hotels';
import { fullItinerary } from '@/lib/itineraries';
import { partnersForDestination } from '@/lib/partners';
import { getDealsByDestination } from '@/lib/supabase';
import { LOCALES, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 600;

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => allDestinations().map((d) => ({ lang, slug: guideSlug(d) })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  const destination = destinationFromSlug(slug);
  if (!destination) return { title: dict.guide.notFoundTitle };
  const label = destinationLabel(destination, lang);
  return {
    title: dict.guide.metaTitle(label),
    description: dict.guide.metaDescription(label, destinationCountry(destination, lang) ?? '', dict.place.city),
    alternates: alternatesFor(lang, guidePath(destination)),
  };
}

export default async function GuidePage({ params }: Props) {
  const lang = await langParam(params);
  const { slug } = await params;
  const destination = destinationFromSlug(slug);
  if (!destination) notFound();

  const dict = getDict(lang);
  const t = dict.guide;
  const href = (path: string) => localePath(lang, path);
  const label = destinationLabel(destination, lang);
  const country = destinationCountry(destination, lang) ?? '';
  const days = fullItinerary(destination, lang);
  const deals = await getDealsByDestination(destination);
  const hotelPicks = activeHotelPicks().filter((p) => p.destination === destination);
  const hotelLink = hotelCityLink(destination, lang);
  const partners = partnersForDestination(destination);

  // Autres guides : d'abord le même pays, puis la suite de la liste alphabétique.
  const sameCountry = (d: string) => DESTINATIONS[d].country === DESTINATIONS[destination].country;
  const everyone = allDestinations().filter((d) => d !== destination);
  const others = [...everyone.filter(sameCountry), ...everyone.filter((d) => !sameCountry(d))].slice(0, 8);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={href('/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href={href('/destinations')} className="hover:text-ink">{dict.destinations.crumb}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-soft sm:aspect-[21/9]">
        <DealVisual destination={destination} lang={lang} sizes="(max-width: 1152px) 100vw, 1152px" width={1600} priority />
      </div>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">{t.eyebrow(country)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.h1(label)}</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">{t.lead(label, dict.place.airport)}</p>
      </header>

      <section className="mt-10" aria-label={t.flightsAria}>
        <h2 className="text-2xl font-bold tracking-tight text-ink">{t.flightsHeading(label)}</h2>
        {deals.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-ink-muted">{t.flightsText(dict.place.city)}</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((d) => (
                <DealCard key={d.id} deal={d} lang={lang} />
              ))}
            </div>
          </>
        ) : (
          <div className="card mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{t.noFlights(label)}</p>
            <Link href={href('/alertes')} className="btn-primary shrink-0">{dict.nav.alerts}</Link>
          </div>
        )}
      </section>

      {days && (
        <section className="mt-12 max-w-3xl" aria-label={dict.itinerary.aria}>
          <h2 className="text-2xl font-bold tracking-tight text-ink">{t.daysHeading(label)}</h2>
          <p className="mb-5 mt-1 text-sm leading-relaxed text-ink-muted">{t.daysText}</p>
          <ItineraryDays days={days} lang={lang} />
          <p className="mt-3 text-xs text-ink-muted">{dict.itinerary.note}</p>
        </section>
      )}

      <section className="mt-12 max-w-3xl" aria-label={t.sleepAria}>
        <h2 className="text-2xl font-bold tracking-tight text-ink">{t.sleepHeading(label)}</h2>
        {hotelPicks.length > 0 && (
          <div className="mt-5 space-y-4">
            {hotelPicks.map((p) => (
              <HotelPickCard key={`${p.name}-${p.checkedOn}`} pick={p} lang={lang} />
            ))}
          </div>
        )}
        {hotelLink && (
          <div className="card mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ink-soft">{t.sleepText(label, HOTEL_PARTNER)}</p>
            <a href={hotelLink} target="_blank" rel="nofollow noopener" className="btn-secondary shrink-0">
              {t.sleepButton(label)}
            </a>
          </div>
        )}
      </section>

      {partners.length > 0 && (
        <div className="mt-10 max-w-3xl space-y-4" aria-label={dict.home.partnersAria}>
          {partners.map((p) => (
            <PartnerCard key={p.name} partner={p} lang={lang} />
          ))}
        </div>
      )}

      <section className="mt-14" aria-label={t.othersAria}>
        <h2 className="text-lg font-bold text-ink">{t.othersHeading}</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((d) => (
            <li key={d}>
              <Link href={href(guidePath(d))} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink-muted">
                {destinationLabel(d, lang)}
              </Link>
            </li>
          ))}
          <li>
            <Link href={href('/destinations')} className="inline-block rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              {t.all}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
