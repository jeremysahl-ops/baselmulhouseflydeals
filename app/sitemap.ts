import type { MetadataRoute } from 'next';
import { getAllDealIds } from '@/lib/supabase';
import { SECTIONS, SITE } from '@/lib/site';
import { allDestinations, guidePath } from '@/lib/guides';
import { LOCALES, localePath } from '@/lib/i18n';
import { AIRPORTS, airportSlug } from '@/lib/airports';
import { moisDisponibles } from '@/lib/prix';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  // Chaque page existe en trois langues : une entrée par langue, avec ses équivalents (hreflang).
  const page = (path: string, changeFrequency: 'daily' | 'weekly' | 'monthly', priority: number) =>
    LOCALES.map((lang) => ({
      url: `${SITE.url}${localePath(lang, path).replace(/^\/$/, '')}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE.url}${localePath(l, path).replace(/^\/$/, '')}`]),
        ),
      },
    }));

  return [
    ...page('/', 'daily', 1),
    ...page('/prix', 'daily', 0.9),
    ...page('/mois', 'daily', 0.9),
    ...moisDisponibles().flatMap((m) => page(`/mois/${m}`, 'daily', 0.8)),
    ...Object.keys(AIRPORTS).flatMap((c) => page(`/vols/${airportSlug(c)}`, 'daily', 0.8)),
    ...SECTIONS.flatMap((s) => page(`/${s.slug}`, 'daily', 0.7)),
    ...page('/destinations', 'weekly', 0.7),
    ...allDestinations().flatMap((d) => page(guidePath(d), 'weekly', 0.7)),
    ...page('/comment-ca-marche', 'monthly', 0.5),
    ...page('/partenaires', 'monthly', 0.4),
    ...(await getAllDealIds()).flatMap((id) => page(`/deal/${id}`, 'weekly', 0.6)),
    ...page('/mentions-legales', 'monthly', 0.2),
    ...page('/confidentialite', 'monthly', 0.2),
  ];
}
