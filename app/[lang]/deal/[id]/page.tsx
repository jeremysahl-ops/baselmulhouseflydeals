import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDealIds, getDealById, getDeals } from '@/lib/supabase';
import DealCard from '@/components/DealCard';
import PartnerCard from '@/components/PartnerCard';
import { partnersForDestination } from '@/lib/partners';
import DealVisual from '@/components/DealVisual';
import {
  airlineName, daysUntil, destinationCountry, destinationLabel, formatDay, formatDayLong, formatPrice, formatStamp, nights,
} from '@/lib/format';
import { itineraryFor } from '@/lib/itineraries';
import { guidePath } from '@/lib/guides';
import ItinerarySection from '@/components/ItinerarySection';
import { HOTEL_PARTNER, hotelSearchLink } from '@/lib/hotels';
import { hotelPicksForDeal } from '@/lib/hotel-picks';
import HotelPickCard from '@/components/HotelPickCard';
import { SITE, getSection } from '@/lib/site';
import { LOCALES, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';
import DateReleve from '@/components/DateReleve';

export const revalidate = 600;

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllDealIds();
  return LOCALES.flatMap((lang) => ids.map((id) => ({ lang, id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  const deal = await getDealById(id);
  if (!deal) return { title: dict.deal.notFoundTitle };
  const label = destinationLabel(deal.destination, lang);
  const price = formatPrice(deal.price, lang);
  return {
    title: dict.deal.metaTitle(dict.place.city, label, price),
    description: dict.deal.metaDescription(dict.place.city, label, price, formatStamp(deal.created_at, lang)),
    alternates: alternatesFor(lang, `/deal/${deal.id}`),
  };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3">
      <dt className="text-sm text-ink-muted">{label}</dt>
      <dd className="text-right text-sm font-medium text-ink">{children}</dd>
    </div>
  );
}

export default async function DealPage({ params }: Props) {
  const lang = await langParam(params);
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) notFound();

  const dict = getDict(lang);
  const t = dict.deal;
  const href = (path: string) => localePath(lang, path);
  const label = destinationLabel(deal.destination, lang);
  const country = destinationCountry(deal.destination, lang);
  const section = getSection(deal.category);
  const airline = airlineName(deal.airline);
  const n = nights(deal);
  const stay = n ? dict.card.nights(n) : null;
  const seenOn = formatStamp(deal.created_at, lang);
  const available = deal.is_active !== false && !!deal.departure_date && daysUntil(deal.departure_date) >= 0;
  const itinerary = itineraryFor(deal.destination, n, lang);
  const hotels = hotelSearchLink(deal, lang) !== null;
  const hotelPicks = available ? hotelPicksForDeal(deal) : [];
  const others = (await getDeals()).filter((d) => d.id !== deal.id).slice(0, 3);
  // Les liens de sortie portent la langue, pour ouvrir le partenaire dans la langue du visiteur.
  const out = lang === 'fr' ? '' : `?lang=${lang}`;

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={href('/')} className="hover:text-ink">{dict.common.home}</Link>
        {section && (
          <>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={href(`/${section.slug}`)} className="hover:text-ink">{dict.sections[section.slug].label}</Link>
          </>
        )}
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-brand-soft">
            <DealVisual destination={deal.destination} lang={lang} sizes="(max-width: 1024px) 100vw, 60vw" width={1400} priority />
          </div>

          <header className="mt-6">
            <p className="eyebrow">{t.eyebrow(dict.place.city)}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {label}
              {country && <span className="ml-3 text-xl font-medium text-ink-muted">{country}</span>}
            </h1>
          </header>

          <section className="card mt-6 px-5" aria-label={t.detailsAria}>
            <dl className="divide-y divide-line">
              <Row label={t.departure}>{formatDayLong(deal.departure_date, lang)}</Row>
              <Row label={t.return}>{formatDayLong(deal.return_date, lang)}</Row>
              {stay && <Row label={t.stay}>{stay}</Row>}
              <Row label={t.flightType}>{t.flightTypeValue}</Row>
              {airline && <Row label={t.airline}>{airline}</Row>}
              <Row label={t.airport}>{dict.place.airport}</Row>
              <Row label={t.seenOn}><DateReleve texte={seenOn} date={seenOn} /></Row>
            </dl>
          </section>

          {itinerary && (
            <ItinerarySection label={label} itinerary={itinerary} lang={lang} guideHref={href(guidePath(deal.destination))} />
          )}

          {/* Le conseil est rédigé en français dans la base : on ne l'affiche que sur la version française. */}
          {deal.insider_tip && lang === 'fr' && (
            <section className="card mt-6 p-5">
              <h2 className="font-semibold text-ink">{t.tipHeading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{deal.insider_tip}</p>
            </section>
          )}

          {hotelPicks.length > 0 && (
            <section className="mt-6" aria-label={t.picksAria}>
              <h2 className="text-lg font-bold text-ink">{t.picksHeading(label)}</h2>
              <p className="mt-1 text-sm text-ink-muted">
                {t.picksText}
                {!hotelPicks.some((p) => p.partner) && ` ${t.noCommission}`}
              </p>
              <div className="mt-4 space-y-4">
                {hotelPicks.map((p) => (
                  <HotelPickCard key={`${p.name}-${p.checkedOn}`} pick={p} lang={lang} />
                ))}
              </div>
            </section>
          )}

          {partnersForDestination(deal.destination).map((p) => (
            <div key={p.name} className="mt-6">
              <PartnerCard partner={p} lang={lang} />
            </div>
          ))}

          <section className="mt-8">
            <h2 className="text-lg font-bold text-ink">{t.knowHeading}</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              {t.know(seenOn).map((item) => (
                <li key={item.lead}>
                  <strong className="font-semibold text-ink">{item.lead}</strong> {item.text}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="card p-6 lg:sticky lg:top-24" aria-label={t.asideAria}>
          <p className="text-5xl font-bold tracking-tight text-ink">{formatPrice(deal.price, lang)}</p>
          <p className="mt-1 text-sm text-ink-muted">{t.perPerson}</p>

          {available ? (
            <>
              <a href={`/go/${deal.id}${out}`} target="_blank" rel="nofollow sponsored noopener" className="btn-primary mt-6 w-full !py-3.5 !text-base">
                {t.bookOn(SITE.bookingPartner)}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">{t.partnerNote}</p>
              {hotels && (
                <div className="mt-6 border-t border-line pt-5">
                  <h2 className="font-semibold text-ink">{t.hotelHeading}</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    {t.hotelText(label, formatDay(deal.departure_date, lang), formatDay(deal.return_date, lang), stay)}
                  </p>
                  <a href={`/hotel/${deal.id}${out}`} target="_blank" rel="nofollow noopener" className="btn-secondary mt-3 w-full">
                    {t.hotelButton}
                  </a>
                  <p className="mt-2 text-xs text-ink-muted">{t.hotelNote(HOTEL_PARTNER)}</p>
                </div>
              )}
            </>
          ) : (
            <p className="mt-6 rounded-lg bg-surface px-4 py-3 text-sm text-ink-soft">
              {t.unavailable}{' '}
              <Link href={href('/')} className="font-semibold text-brand underline underline-offset-2">{t.seeCurrent}</Link>
            </p>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{t.othersHeading}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((d) => (
              <DealCard key={d.id} deal={d} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
