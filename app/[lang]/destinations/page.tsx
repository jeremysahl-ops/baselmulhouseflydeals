import type { Metadata } from 'next';
import Link from 'next/link';
import DealVisual from '@/components/DealVisual';
import { destinationCountry, destinationLabel, formatPrice } from '@/lib/format';
import { allDestinations, guidePath } from '@/lib/guides';
import { getDeals } from '@/lib/supabase';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 600;

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.destinations.metaTitle(dict.place.city),
    description: dict.destinations.metaDescription(dict.place.city),
    alternates: alternatesFor(lang, '/destinations'),
  };
}

export default async function DestinationsPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.destinations;
  // Ordre alphabétique des noms dans la langue affichée.
  const destinations = allDestinations().sort((a, b) =>
    destinationLabel(a, lang).localeCompare(destinationLabel(b, lang), lang),
  );
  const deals = await getDeals(200);

  // Par destination : nombre de deals en cours et prix le plus bas.
  const stats = new Map<string, { count: number; from: number }>();
  for (const d of deals) {
    const s = stats.get(d.destination);
    stats.set(d.destination, { count: (s?.count ?? 0) + 1, from: Math.min(s?.from ?? Infinity, d.price) });
  }

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{t.crumb}</span>
      </nav>

      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow(dict.place.city, destinations.length)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.h1}</h1>
        <p className="mt-3 text-ink-soft">{t.lead(dict.place.airport)}</p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((d, i) => {
          const s = stats.get(d);
          return (
            <li key={d}>
              <Link href={localePath(lang, guidePath(d))} className="group block h-full">
                <article className="card flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-lift">
                  <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
                      <DealVisual
                        destination={d}
                        lang={lang}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        width={600}
                        priority={i < 4}
                      />
                    </div>
                    {s && (
                      <span className="absolute right-3 top-3 rounded-md bg-saving px-2 py-1 text-xs font-bold text-white shadow-sm">
                        {t.from(formatPrice(s.from, lang))}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-lg font-bold leading-tight text-ink">{destinationLabel(d, lang)}</h2>
                    <p className="mt-0.5 text-sm text-ink-muted">
                      {destinationCountry(d, lang)}
                      {s && ` · ${t.dealsCount(s.count)}`}
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
