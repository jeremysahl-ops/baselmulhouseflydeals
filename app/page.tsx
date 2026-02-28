import { Metadata } from 'next';
import { getDeals } from '@/lib/supabase';
import DealCard from '@/components/DealCard';
import Hero from '@/components/Hero';
import NewsletterPopup from '@/components/NewsletterPopup';
import FilterSidebar from '@/components/FilterSidebar';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accueil - Deals vols Basel-Mulhouse',
  description: 'Les meilleurs bons plans vols au départ de EuroAirport Basel-Mulhouse.',
};

export const revalidate = 600;

export default async function HomePage() {
  const deals = await getDeals(50);

  const categoryLinks = [
    { slug: 'sejour', label: '🌴 Séjours' },
    { slug: 'vol', label: '✈️ Vols' },
    { slug: 'vol-hotel', label: '🏨 Hôtels' },
    { slug: 'derniere-minute', label: '⚡ Dernière minute' },
  ];

  return (
    <>
      <NewsletterPopup />
      <Hero />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categoryLinks.map(({ slug, label }) => (
            <Link key={slug} href={`/${slug}`} className="px-4 py-2 rounded-full bg-white border border-purple-200 text-purple-700 text-sm font-semibold hover:bg-purple-700 hover:text-white hover:border-purple-700 transition-all shadow-sm">
              {label}
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex gap-6">
          <FilterSidebar deals={deals} />
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-100 to-blue-50 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#2C3E50] mb-3">🌍 Ton prochain voyage part d&apos;ici</h2>
          <p className="text-gray-600 mb-6">L&apos;EuroAirport Basel-Mulhouse, c&apos;est des centaines de destinations. On déniche les meilleurs prix pour toi.</p>
          <Link href="/derniere-minute" className="btn-cta inline-block px-8 py-3 text-base shadow-lg">
            ⚡ Voir les dernière minute
          </Link>
        </div>
      </section>
    </>
  );
}
