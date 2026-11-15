import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllDealIds, getDealById, getDeals } from '@/lib/supabase';
import DealCard from '@/components/DealCard';
import PartnerCard from '@/components/PartnerCard';
import { partnersForDestination } from '@/lib/partners';
import DealVisual from '@/components/DealVisual';
import {
  airlineName, daysUntil, destinationCountry, destinationLabel, formatDay, formatDayLong, formatPrice, formatStamp, nights, nightsLabel, saving,
} from '@/lib/format';
import { itineraryFor } from '@/lib/itineraries';
import { guidePath } from '@/lib/guides';
import ItinerarySection from '@/components/ItinerarySection';
import { HOTEL_PARTNER, hotelSearchLink } from '@/lib/hotels';
import { hotelPicksForDeal } from '@/lib/hotel-picks';
import HotelPickCard from '@/components/HotelPickCard';
import { SITE, getSection } from '@/lib/site';

export const revalidate = 600;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return (await getAllDealIds()).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) return { title: 'Deal introuvable' };
  const label = destinationLabel(deal.destination);
  const save = saving(deal);
  return {
    title: `Bâle-Mulhouse → ${label} à ${formatPrice(deal.price)} aller-retour`,
    description: `Vol direct aller-retour vers ${label} au départ de Bâle-Mulhouse à ${formatPrice(deal.price)}${
      save ? `, soit ${save.percent} % sous le prix habituel` : ''
    }. Prix constaté le ${formatStamp(deal.created_at)}.`,
    alternates: { canonical: `/deal/${deal.id}` },
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
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) notFound();

  const label = destinationLabel(deal.destination);
  const country = destinationCountry(deal.destination);
  const section = getSection(deal.category);
  const save = saving(deal);
  const airline = airlineName(deal.airline);
  const stay = nightsLabel(deal);
  const available = deal.is_active !== false && !!deal.departure_date && daysUntil(deal.departure_date) >= 0;
  const itinerary = itineraryFor(deal.destination, nights(deal));
  const hotels = hotelSearchLink(deal) !== null;
  const hotelPicks = available ? hotelPicksForDeal(deal) : [];
  const others = (await getDeals()).filter((d) => d.id !== deal.id).slice(0, 3);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        {section && (
          <>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link href={`/${section.slug}`} className="hover:text-ink">{section.label}</Link>
          </>
        )}
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-brand-soft">
            <DealVisual destination={deal.destination} sizes="(max-width: 1024px) 100vw, 60vw" width={1400} priority />
          </div>

          <header className="mt-6">
            <p className="eyebrow">Vol direct au départ de Bâle-Mulhouse</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {label}
              {country && <span className="ml-3 text-xl font-medium text-ink-muted">{country}</span>}
            </h1>
          </header>

          <section className="card mt-6 px-5" aria-label="Détails du vol">
            <dl className="divide-y divide-line">
              <Row label="Départ">{formatDayLong(deal.departure_date)}</Row>
              <Row label="Retour">{formatDayLong(deal.return_date)}</Row>
              {stay && <Row label="Durée sur place">{stay}</Row>}
              <Row label="Type de vol">Direct, aller et retour</Row>
              {airline && <Row label="Compagnie">{airline}</Row>}
              <Row label="Aéroport de départ">{SITE.airport}</Row>
              <Row label="Prix constaté le">{formatStamp(deal.created_at)}</Row>
            </dl>
          </section>

          {itinerary && <ItinerarySection label={label} itinerary={itinerary} guideHref={guidePath(deal.destination)} />}

          {deal.insider_tip && (
            <section className="card mt-6 p-5">
              <h2 className="font-semibold text-ink">Conseil pour ce voyage</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{deal.insider_tip}</p>
            </section>
          )}

          {hotelPicks.length > 0 && (
            <section className="mt-6" aria-label="Bons plans hôtels">
              <h2 className="text-lg font-bold text-ink">Où dormir à {label} : nos bons plans</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Repérés par nos soins, directement sur le site de l&apos;hôtel.
                {!hotelPicks.some((p) => p.partner) && " Nous ne touchons pas de commission sur ces liens."}
              </p>
              <div className="mt-4 space-y-4">
                {hotelPicks.map((p) => (
                  <HotelPickCard key={`${p.name}-${p.checkedOn}`} pick={p} />
                ))}
              </div>
            </section>
          )}

          {partnersForDestination(deal.destination).map((p) => (
            <div key={p.name} className="mt-6">
              <PartnerCard partner={p} />
            </div>
          ))}

          <section className="mt-8">
            <h2 className="text-lg font-bold text-ink">À savoir avant de réserver</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
              <li>
                <strong className="font-semibold text-ink">Le prix peut avoir changé.</strong> Il a été constaté le{' '}
                {formatStamp(deal.created_at)} ; les tarifs aériens évoluent plusieurs fois par jour.
              </li>
              <li>
                <strong className="font-semibold text-ink">Les bagages en soute ne sont pas compris.</strong> Le prix
                correspond au tarif de base pour une personne, avec le bagage cabine prévu par la compagnie.
              </li>
              <li>
                <strong className="font-semibold text-ink">Comparez avant de payer.</strong> Le même vol est parfois
                au même prix, ou moins cher, directement sur le site de la compagnie.
              </li>
            </ul>
          </section>
        </div>

        <aside className="card p-6 lg:sticky lg:top-24" aria-label="Prix et réservation">
          {save && (
            <p className="inline-block rounded-md bg-saving-soft px-2.5 py-1 text-sm font-bold text-saving">
              −{save.percent} % par rapport au prix habituel
            </p>
          )}
          <p className="mt-4 text-5xl font-bold tracking-tight text-ink">{formatPrice(deal.price)}</p>
          <p className="mt-1 text-sm text-ink-muted">aller-retour par personne, taxes comprises</p>

          {save && (
            <dl className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-muted">Prix habituel pour la saison</dt>
                <dd className="text-ink-soft line-through">{formatPrice(save.reference)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-muted">Économie estimée</dt>
                <dd className="font-semibold text-saving">{formatPrice(save.amount)}</dd>
              </div>
            </dl>
          )}

          {available ? (
            <>
              <a href={`/go/${deal.id}`} target="_blank" rel="nofollow sponsored noopener" className="btn-primary mt-6 w-full !py-3.5 !text-base">
                Voir ce vol sur {SITE.bookingPartner}
              </a>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                Lien partenaire : s&apos;ouvre dans un nouvel onglet, avec les dates déjà remplies. Si vous réservez, nous
                pouvons toucher une commission, sans surcoût pour vous.
              </p>
              {hotels && (
                <div className="mt-6 border-t border-line pt-5">
                  <h2 className="font-semibold text-ink">Et pour dormir sur place ?</h2>
                  <p className="mt-1 text-sm text-ink-muted">
                    Hôtels à {label} du {formatDay(deal.departure_date)} au {formatDay(deal.return_date)}
                    {stay ? ` (${stay})` : ''}, pour 2 personnes.
                  </p>
                  <a href={`/hotel/${deal.id}`} target="_blank" rel="nofollow noopener" className="btn-secondary mt-3 w-full">
                    Trouver un hôtel pour ces dates
                  </a>
                  <p className="mt-2 text-xs text-ink-muted">S&apos;ouvre sur {HOTEL_PARTNER}, dates et ville déjà remplies.</p>
                </div>
              )}
            </>
          ) : (
            <p className="mt-6 rounded-lg bg-surface px-4 py-3 text-sm text-ink-soft">
              Ce deal n&apos;est plus disponible. <Link href="/" className="font-semibold text-brand underline underline-offset-2">Voir les deals du moment</Link>
            </p>
          )}
        </aside>
      </div>

      {others.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">D&apos;autres deals du moment</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((d) => (
              <DealCard key={d.id} deal={d} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
