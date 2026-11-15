import type { MetadataRoute } from 'next';
import { getAllDealIds } from '@/lib/supabase';
import { SECTIONS, SITE } from '@/lib/site';
import { allDestinations, guidePath } from '@/lib/guides';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const page = (path: string, changeFrequency: 'daily' | 'weekly' | 'monthly', priority: number) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    page('', 'daily', 1),
    ...SECTIONS.map((s) => page(`/${s.slug}`, 'daily', 0.8)),
    page('/destinations', 'weekly', 0.7),
    ...allDestinations().map((d) => page(guidePath(d), 'weekly', 0.7)),
    page('/alertes', 'monthly', 0.5),
    page('/comment-ca-marche', 'monthly', 0.5),
    page('/partenaires', 'monthly', 0.4),
    ...(await getAllDealIds()).map((id) => page(`/deal/${id}`, 'weekly', 0.6)),
    page('/mentions-legales', 'monthly', 0.2),
    page('/confidentialite', 'monthly', 0.2),
  ];
}
