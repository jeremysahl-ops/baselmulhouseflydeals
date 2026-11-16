import type { Metadata } from 'next';
import Link from 'next/link';
import { AIRPORTS, airportCountry, airportName, airportSlug } from '@/lib/airports';
import { meilleurParVille } from '@/lib/prix';
import { formatPrice } from '@/lib/format';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;

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
  const from = new Map(meilleurParVille().map((c) => [c.code, c.prix]));
  const codes = Object.keys(AIRPORTS).sort((a, b) => airportName(a, lang).localeCompare(airportName(b, lang), lang));

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{t.crumb}</span>
      </nav>

      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow(dict.place.city, codes.length)}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
        <p className="mt-3 text-ink-soft">{t.lead(dict.place.airport)}</p>
      </header>

      <ul className="grid gap-x-8 border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {codes.map((c) => {
          const p = from.get(c);
          return (
            <li key={c} className="border-b border-line">
              <Link href={localePath(lang, `/vols/${airportSlug(c)}`)} className="group flex items-center justify-between gap-3 py-3">
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-ink group-hover:underline group-hover:underline-offset-4">{airportName(c, lang)}</span>
                  <span className="block truncate text-xs text-ink-muted">
                    <span className="font-board">{c}</span> · {airportCountry(c, lang)}
                  </span>
                </span>
                {p != null ? (
                  <span className="shrink-0 rounded bg-board px-2 py-1 font-board text-sm font-bold text-flap">{t.from(formatPrice(p, lang))}</span>
                ) : (
                  <span className="shrink-0 text-xs text-ink-muted">{t.pending}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
