import Link from 'next/link';
import Image from 'next/image';
import { Deal, CATEGORY_LABELS } from '@/types/deal';

interface DealCardProps {
  deal: Deal;
}

const DESTINATION_IMAGES: Record<string, string> = {
  default: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
  barcelone: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&q=80',
  madrid: 'https://images.unsplash.com/photo-1543785734-4b6e564642f8?w=600&q=80',
  malaga: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  alicante: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80',
  majorque: 'https://images.unsplash.com/photo-1562874673-6f8a38bc1f58?w=600&q=80',
  ibiza: 'https://images.unsplash.com/photo-1571906493621-6e93a37c5e4a?w=600&q=80',
  fuerteventura: 'https://images.unsplash.com/photo-1589554533269-9f01c2aed6f0?w=600&q=80',
  lanzarote: 'https://images.unsplash.com/photo-1583236960843-00c5c90b1b5a?w=600&q=80',
  tenerife: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80',
  lisbonne: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
  porto: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  faro: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  naples: 'https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=600&q=80',
  venise: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80',
  athenes: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=600&q=80',
  heraklion: 'https://images.unsplash.com/photo-1594985516986-a3ba9e4a5c80?w=600&q=80',
  rhodes: 'https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&q=80',
  mykonos: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  nice: 'https://images.unsplash.com/photo-1491166617655-0723a0f2f54a?w=600&q=80',
  marseille: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  berlin: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80',
  munich: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&q=80',
  hambourg: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80',
  londres: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
  manchester: 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=600&q=80',
  edimbourg: 'https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?w=600&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
  dubrovnik: 'https://images.unsplash.com/photo-1580681152792-4a1be53c4e8a?w=600&q=80',
  split: 'https://images.unsplash.com/photo-1580681152792-4a1be53c4e8a?w=600&q=80',
  zagreb: 'https://images.unsplash.com/photo-1582456032629-4a54a1a65697?w=600&q=80',
  istanbul: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80',
  antalya: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80',
  marrakech: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80',
  casablanca: 'https://images.unsplash.com/photo-1539020140153-e479b8e98451?w=600&q=80',
  agadir: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80',
  tunis: 'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=600&q=80',
  djerba: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80',
  hurghada: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=600&q=80',
  vienne: 'https://images.unsplash.com/photo-1516550893885-985c836c5eba?w=600&q=80',
  budapest: 'https://images.unsplash.com/photo-1587789202069-f57b6a3a9c7e?w=600&q=80',
  prague: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80',
  oslo: 'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=600&q=80',
  copenhague: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80',
  dublin: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80',
  sofia: 'https://images.unsplash.com/photo-1601974028136-1086408d2c43?w=600&q=80',
  bucarest: 'https://images.unsplash.com/photo-1584646098378-0e8a6f4b1c9c?w=600&q=80',
  belgrade: 'https://images.unsplash.com/photo-1566457671653-f9f51bcacaff?w=600&q=80',
  cracovie: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80',
  varsovie: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  montreal: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=600&q=80',
  singapour: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
};

function getDestinationImage(destination: string, imageUrl?: string | null): string {
  if (imageUrl) return imageUrl;
  const key = destination.toLowerCase().split('(')[0].trim();
  return DESTINATION_IMAGES[key] ?? DESTINATION_IMAGES.default;
}

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function ScoreBadge({ score }: { score?: number | null }) {
  if (!score || score < 2) return null;
  const stars = Math.round(score);
  const config =
    stars >= 5 ? { color: 'bg-green-500', label: '🔥 Exceptionnel' } :
    stars >= 4 ? { color: 'bg-emerald-400', label: '⭐ Très bon prix' } :
    stars >= 3 ? { color: 'bg-yellow-400', label: '👍 Bon plan' } :
    { color: 'bg-blue-300', label: '✓ Prix correct' };
  return (
    <span className={`${config.color} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
      {config.label}
    </span>
  );
}

export default function DealCard({ deal }: DealCardProps) {
  const categoryLabel = CATEGORY_LABELS[deal.category] ?? deal.category;
  const imgSrc = getDestinationImage(deal.destination, deal.image_url);
  const score = (deal as any).deal_score ?? (deal as any).score_final ?? (deal as any).score_ai;
  const departureFormatted = formatDate(deal.departure_date);
  const returnFormatted = formatDate(deal.return_date);

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
            des {deal.price}€
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[#C9A0DC] text-xs font-semibold uppercase tracking-wider">
              {deal.destination}
            </p>
            <ScoreBadge score={score} />
          </div>
          <h3 className="font-bold text-[#2C3E50] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#6C3483] transition-colors">
            {deal.title}
          </h3>
          <div className="flex items-center gap-3 text-xs text-[#777] mb-3">
            {departureFormatted && (
              <span>✈️ {departureFormatted}{returnFormatted ? ` → ${returnFormatted}` : ''}</span>
            )}
            {deal.airline && <span>🏷️ {deal.airline}</span>}
          </div>
          {deal.insider_tip && (
            <p className="text-xs bg-[#FFF0F5] border border-[#FFB6C1] text-[#555] rounded-xl px-3 py-2 line-clamp-2">
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
