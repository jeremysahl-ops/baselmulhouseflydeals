import type { Metadata } from 'next';
import Link from 'next/link';
import DestinationTile from '@/components/DestinationTile';
import { AIRPORTS, airportName } from '@/lib/airports';
import { meilleurParVille } from '@/lib/prix';
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
  // Les villes avec photo et guide d'abord, puis les autres, chacune par ordre alphabétique.
  const codes = Object.keys(AIRPORTS).sort(
    (a, b) => Number(!!AIRPORTS[b].guide) - Number(!!AIRPORTS[a].guide) || airportName(a, lang).localeCompare(airportName(b, lang), lang),
  );

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

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {codes.map((c, i) => {
          return (
            <li key={c}>
              <DestinationTile code={c} lang={lang} price={from.get(c)} priority={i < 4} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
