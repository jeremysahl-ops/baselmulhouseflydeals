import { Metadata } from 'next';
import { getDeals } from '@/lib/supabase';
import DealCard from '@/components/DealCard';
import Hero from '@/components/Hero';
import NewsletterPopup from '@/components/NewsletterPopup';
import { CATEGORY_LABELS, DealCategory } from '@/types/deal';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Accueil – Deals vols Basel-Mulhouse',
  description:
    'Découvrez les meilleurs bons plans vols, city trips et séjours au départ de l\'EuroAirport Basel-Mulhouse.',
};

// Revalidation ISR toutes les 10 minutes
export const revalidate = 600;

export default async function HomePage() {
  const deals = await getDeals(12);

  // Grouper par catégorie pour l'affichage
  const categoryLinks: { slug: DealCategory; emoji: string }[] = [
    { slug: 'vol', emoji: '✈️' },
    { slug: 'vol-hotel', emoji: '🏨' },
    { slug: 'city-trip', emoji: '🌆' },
    { slug: 'sejour', emoji: '🌴' },
    { slug: 'derniere-minute', emoji: '⚡' },
  ];

  return (
    <>
      <NewsletterPopup />
      <Hero />

      {/* Category pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categoryLinks.map(({ slug, emoji }) => (
            <Link
              key={slug}
              href={`/${slug}`}
              className="px-4 py-2 rounded-full bg-white border border-[#E0D0F0] text-[#6C3483] text-sm font-semibold hover:bg-[#C9A0DC]/10 hover:border-[#C9A0DC] transition-all shadow-sm"
            >
              {emoji} {CATEGORY_LABELS[slug]}
            </Link>
          ))}
        </div>
      </section>

      {/* Deals grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-[#2C3E50]">
            🔥 Derniers deals
          </h2>
          <Link
            href="/vol"
            className="text-[#5DADE2] text-sm font-semibold hover:underline"
          >
            Voir tout →
          </Link>
        </div>

        {deals.length === 0 ? (
          <div className="text-center py-16 text-[#aaa]">
            <p className="text-5xl mb-4">✈️</p>
            <p className="text-lg font-semibold">Aucun deal pour l'instant</p>
            <p className="text-sm mt-1">Les pistes sont en cours de préparation… Reviens vite !</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </section>

      {/* CTA section */}
      <section className="bg-gradient-to-r from-[#C9A0DC]/20 to-[#5DADE2]/10 py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-black text-[#2C3E50] mb-3">
            🌍 Ton prochain voyage part d'ici
          </h2>
          <p className="text-[#555] mb-6">
            L'EuroAirport Basel-Mulhouse, c'est des centaines de destinations.
            On déniche les meilleurs prix pour toi. 🎯
          </p>
          <Link href="/derniere-minute" className="btn-cta inline-block px-8 py-3 text-base shadow-lg shadow-rose-200">
            ⚡ Voir les dernière minute
          </Link>
        </div>
      </section>
    </>
  );
}
