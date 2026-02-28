import Link from 'next/link';
import Image from 'next/image';
import { Deal, CATEGORY_LABELS } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
}

const DESTINATION_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  barcelone: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  lisbonne: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
};

function getDestinationImage(destination: string, imageUrl?: string | null): string {
  if (imageUrl) return imageUrl;
  const key = destination.toLowerCase();
  return DESTINATION_IMAGES[key] ?? DESTINATION_IMAGES.default;
}

function ScoreBadge({ score }: { score?: number | null }) {
  if (!score) return null;
  const stars = Math.round(score);
  const color =
    stars >= 5 ? 'bg-green-500' :
    stars >= 4 ? 'bg-emerald-400' :
    stars >= 3 ? 'bg-yellow-400' :
    'bg-gray-300';
  const label =
    stars >= 5 ? '🔥 Exceptionnel' :
    stars >= 4 ? '⭐ Très bon prix' :
    stars >= 3 ? '👍 Bon plan' :
    '• Prix correct';
  return (
    <span className={`${color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
      {label}
    </span>
  );
}

export default function DealCard({ deal }: DealCardProps) {
  const categoryLabel = CATEGORY_LABELS[deal.category] ?? deal.category;
  const imgSrc = getDestinationImage(deal.destination, deal.image_url);

  return (
    <Link href={`/deal/${deal.id}`} className="block group">
      <article className="deal-card bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E8E0F0] hover:border-[#C9A0DC]">
        <div className="relative h-44 overflow-hidden bg-[#EDE7F6]">
          <Image
            src={imgSrc}
            alt={`${deal.destination} - ${deal.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized={imgSrc.startsWith('https://images.unsplash')}
          />
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#6C3483] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {categoryLabel}
          </span>
          <span className="absolute top-3 right-3 btn-cta text-sm px-3 py-1 shadow-md">
            dès {deal.price}€
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#C9A0DC] text-xs font-semibold uppercase tracking-wider">
              {deal.destination}
            </p>
            <ScoreBadge score={(deal as any).deal_score} />
          </div>
          <h3 className="font-bold text-[#2C3E50] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#6C3483] transition-colors">
            {deal.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-[#777] mb-3">
            <span>🗓️ {deal.dates}</span>
            <span>✈️ {deal.company}</span>
          </div>
          {deal.insider_tip && (
            <p className="text-xs bg-[#FFF0F5] border border-[#FFB6C1] text-[#555] rounded-xl px-3 py-2 line-clamp-1">
              💡 {deal.insider_tip}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[#5DADE2] text-xs font-semibold hover:underline">
              Voir le deal →
            </span>
            <span className="text-[#C9A0DC] text-lg font-black">{deal.price}€</span>
          </div>
        </div>
      </article>
    </Link>
  );
}