import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DealCard from '@/components/DealCard';
import DealVisual from '@/components/DealVisual';
import HotelPickCard from '@/components/HotelPickCard';
import PartnerCard from '@/components/PartnerCard';
import { ITINERARY_NOTE, ItineraryDays } from '@/components/ItinerarySection';
import { DESTINATIONS } from '@/lib/destinations';
import { allDestinations, destinationFromSlug, guidePath, guideSlug } from '@/lib/guides';
import { activeHotelPicks } from '@/lib/hotel-picks';
import { HOTEL_PARTNER, hotelCityLink } from '@/lib/hotels';
import { fullItinerary } from '@/lib/itineraries';
import { partnersForDestination } from '@/lib/partners';
import { SITE } from '@/lib/site';
import { getDealsByDestination } from '@/lib/supabase';

export const revalidate = 600;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allDestinations().map((d) => ({ slug: guideSlug(d) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationFromSlug(slug);
  if (!destination) return { title: 'Destination introuvable' };
  const { label, country } = DESTINATIONS[destination];
  return {
    title: `Que faire à ${label} : programme jour par jour`,
    description: `Notre programme pour visiter ${label} (${country}) en 2 à 6 jours, les vols directs à bas prix du moment au départ de Bâle-Mulhouse et où dormir sur place.`,
    alternates: { canonical: guidePath(destination) },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const destination = destinationFromSlug(slug);
  if (!destination) notFound();

  const { label, country } = DESTINATIONS[destination];
  const days = fullItinerary(destination);
  const deals = await getDealsByDestination(destination);
  const hotelPicks = activeHotelPicks().filter((p) => p.destination === destination);
  const hotelLink = hotelCityLink(destination);
  const partners = partnersForDestination(destination);

  // Autres guides : d'abord le même pays, puis la suite de la liste alphabétique.
  const everyone = allDestinations().filter((d) => d !== destination);
  const sameCountry = everyone.filter((d) => DESTINATIONS[d].country === country);
  const others = [...sameCountry, ...everyone.filter((d) => DESTINATIONS[d].country !== country)].slice(0, 8);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href="/destinations" className="hover:text-ink">Destinations</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{label}</span>
      </nav>

      <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-soft sm:aspect-[21/9]">
        <DealVisual destination={destination} sizes="(max-width: 1152px) 100vw, 1152px" width={1600} priority />
      </div>

      <header className="mt-8 max-w-3xl">
        <p className="eyebrow">Guide · {country}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Que faire à {label} ?</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          {label} fait partie des destinations que nous surveillons en vol direct au départ de l&apos;{SITE.airport}. Voici
          notre programme jour par jour pour en profiter, les bons prix du moment pour y aller et de quoi trouver où dormir.
        </p>
      </header>

      <section className="mt-10" aria-label="Vols du moment">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Les vols du moment vers {label}</h2>
        {deals.length > 0 ? (
          <>
            <p className="mt-1 text-sm text-ink-muted">
              Vols directs aller-retour au départ de Bâle-Mulhouse, au moins {SITE.minDiscount} % sous le prix habituel.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {deals.map((d) => (
                <DealCard key={d.id} deal={d} />
              ))}
            </div>
          </>
        ) : (
          <div className="card mt-4 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
              Pas de vol à prix cassé vers {label} en ce moment. Nous relevons les prix deux fois par semaine : les
              alertes vous préviennent dès qu&apos;un bon prix apparaît.
            </p>
            <Link href="/alertes" className="btn-primary shrink-0">Recevoir les alertes</Link>
          </div>
        )}
      </section>

      {days && (
        <section className="mt-12 max-w-3xl" aria-label="Programme d'activités">
          <h2 className="text-2xl font-bold tracking-tight text-ink">{label} jour par jour</h2>
          <p className="mb-5 mt-1 text-sm leading-relaxed text-ink-muted">
            Pour un week-end, suivez les trois premières journées : ce sont les incontournables. Pour une semaine, ajoutez
            les excursions des journées suivantes, dans l&apos;ordre qui vous convient.
          </p>
          <ItineraryDays days={days} />
          <p className="mt-3 text-xs text-ink-muted">{ITINERARY_NOTE}</p>
        </section>
      )}

      <section className="mt-12 max-w-3xl" aria-label="Où dormir">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Où dormir à {label}</h2>
        {hotelPicks.length > 0 && (
          <div className="mt-5 space-y-4">
            {hotelPicks.map((p) => (
              <HotelPickCard key={`${p.name}-${p.checkedOn}`} pick={p} />
            ))}
          </div>
        )}
        {hotelLink && (
          <div className="card mt-5 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
              Comparez les hôtels et les appartements de {label} sur {HOTEL_PARTNER}. Depuis la page d&apos;un vol, le
              bouton hôtel ouvre directement la recherche aux dates de ce vol.
            </p>
            <a href={hotelLink} target="_blank" rel="nofollow noopener" className="btn-secondary shrink-0">
              Voir les hôtels à {label}
            </a>
          </div>
        )}
      </section>

      {partners.length > 0 && (
        <div className="mt-10 max-w-3xl space-y-4" aria-label="Partenaires">
          {partners.map((p) => (
            <PartnerCard key={p.name} partner={p} />
          ))}
        </div>
      )}

      <section className="mt-14" aria-label="Autres destinations">
        <h2 className="text-lg font-bold text-ink">D&apos;autres idées de destinations</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((d) => (
            <li key={d}>
              <Link href={guidePath(d)} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:border-ink-muted">
                {DESTINATIONS[d].label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/destinations" className="inline-block rounded-full bg-brand-soft px-4 py-2 text-sm font-semibold text-brand">
              Toutes les destinations
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
