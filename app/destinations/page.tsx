import type { Metadata } from 'next';
import Link from 'next/link';
import DealVisual from '@/components/DealVisual';
import { DESTINATIONS } from '@/lib/destinations';
import { formatPrice } from '@/lib/format';
import { allDestinations, guidePath } from '@/lib/guides';
import { SITE } from '@/lib/site';
import { getDeals } from '@/lib/supabase';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Destinations au départ de Bâle-Mulhouse : nos guides',
  description:
    'Une cinquantaine de destinations en vol direct depuis Bâle-Mulhouse, avec pour chacune un programme jour par jour et les bons prix du moment.',
  alternates: { canonical: '/destinations' },
};

export default async function DestinationsPage() {
  const destinations = allDestinations();
  const deals = await getDeals(200);

  // Par destination : nombre de deals en cours et prix le plus bas.
  const stats = new Map<string, { count: number; from: number }>();
  for (const d of deals) {
    const s = stats.get(d.destination);
    stats.set(d.destination, { count: (s?.count ?? 0) + 1, from: Math.min(s?.from ?? Infinity, d.price) });
  }

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">Destinations</span>
      </nav>

      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">Au départ de Bâle-Mulhouse · {destinations.length} destinations</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Nos guides par destination</h1>
        <p className="mt-3 text-ink-soft">
          Pour chaque ville que nous surveillons en vol direct depuis l&apos;{SITE.airport} : un programme jour par jour,
          les bons prix du moment et de quoi trouver où dormir.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((d, i) => {
          const { label, country } = DESTINATIONS[d];
          const s = stats.get(d);
          return (
            <li key={d}>
              <Link href={guidePath(d)} className="group block h-full">
                <article className="card flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                      <DealVisual
                        destination={d}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        width={600}
                        priority={i < 4}
                      />
                    </div>
                    {s && (
                      <span className="absolute right-3 top-3 rounded-md bg-saving px-2 py-1 text-xs font-bold text-white shadow-sm">
                        dès {formatPrice(s.from)}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold leading-tight text-ink">{label}</h2>
                    <p className="mt-0.5 text-sm text-ink-muted">
                      {country}
                      {s && ` · ${s.count} deal${s.count > 1 ? 's' : ''} en cours`}
                    </p>
                  </div>
                </article>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
