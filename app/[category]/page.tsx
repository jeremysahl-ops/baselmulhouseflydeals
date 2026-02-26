import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getDealsByCategory } from '@/lib/supabase';
import DealCard from '@/components/DealCard';
import { CATEGORY_LABELS, CATEGORY_SLUGS, DealCategory } from '@/types/deal';

export const revalidate = 600;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const slug = CATEGORY_SLUGS[category];

  if (!slug) {
    return { title: 'Catégorie introuvable' };
  }

  const label = CATEGORY_LABELS[slug];

  return {
    title: `${label} – Deals Basel-Mulhouse`,
    description: `Meilleurs bons plans "${label}" au départ de l'EuroAirport Basel-Mulhouse. Deals mis à jour régulièrement. ✈️`,
    openGraph: {
      title: `${label} | BaselMulhouse Fly Deals`,
      description: `Deals ${label} au départ de Basel-Mulhouse`,
    },
  };
}

const CATEGORY_DESCRIPTIONS: Record<DealCategory, string> = {
  'vol': 'Les vols secs au meilleur prix depuis l\'EuroAirport. Vacances, weekend, affaires — on a ce qu\'il faut. ✈️',
  'vol-hotel': 'Vol + hébergement packagés pour un séjour clé en main et sans stress. 🏨',
  'city-trip': 'Escapades urbaines de 2 à 4 jours. Rome, Lisbonne, Barcelone… depuis Basel-Mulhouse. 🌆',
  'sejour': 'Semaines complètes au soleil ou à la montagne, all-inclusive ou en liberté. 🌴',
  'derniere-minute': 'Les deals qui décollent dans les 2 semaines ! Pour les spontanés et aventuriers. ⚡',
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const slug = CATEGORY_SLUGS[category] as DealCategory | undefined;

  if (!slug) {
    notFound();
  }

  const deals = await getDealsByCategory(slug);
  const label = CATEGORY_LABELS[slug];
  const description = CATEGORY_DESCRIPTIONS[slug];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page header */}
      <div className="mb-10 text-center">
        <span className="inline-block bg-[#C9A0DC]/15 text-[#6C3483] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
          📍 EuroAirport Basel-Mulhouse
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-[#2C3E50] mb-3">
          {label}
        </h1>
        <p className="text-[#555] max-w-xl mx-auto">{description}</p>
      </div>

      {/* Count */}
      {deals.length > 0 && (
        <p className="text-sm text-[#999] mb-5 text-center">
          {deals.length} deal{deals.length > 1 ? 's' : ''} disponible{deals.length > 1 ? 's' : ''}
        </p>
      )}

      {/* Grid */}
      {deals.length === 0 ? (
        <div className="text-center py-20 text-[#aaa]">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-semibold text-[#666]">Pas encore de deals dans cette catégorie</p>
          <p className="text-sm mt-2">On surveille les prix — reviens vite ! 👀</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}
