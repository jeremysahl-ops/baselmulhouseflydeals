import { MetadataRoute } from 'next';
import { getAllDealIds } from '@/lib/supabase';

const BASE_URL = 'https://baselmulhouseflydeals.com';

const CATEGORIES = ['vol', 'vol-hotel', 'city-trip', 'sejour', 'derniere-minute'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dealIds = await getAllDealIds();

  const dealUrls: MetadataRoute.Sitemap = dealIds.map((id) => ({
    url: `${BASE_URL}/deal/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const categoryUrls: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryUrls,
    ...dealUrls,
  ];
}
