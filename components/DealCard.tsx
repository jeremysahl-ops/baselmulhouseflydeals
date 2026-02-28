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
  bilbao: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?w=600&q=80',
  valence: 'https://images.unsplash.com/photo-1599484054144-df350f14b8e5?w=600&q=80',
  seville: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=80',
  'santiago de compostela': 'https://images.unsplash.com/photo-1600700012083-7e4d6de98e11?w=600&q=80',
  'palma de mallorca': 'https://images.unsplash.com/photo-1562874673-6f8a38bc1f58?w=600&q=80',
  majorque: 'https://images.unsplash.com/photo-1562874673-6f8a38bc1f58?w=600&q=80',
  ibiza: 'https://images.unsplash.com/photo-1571906493621-6e93a37c5e4a?w=600&q=80',
  mahon: 'https://images.unsplash.com/photo-1583242602786-1a7dee508041?w=600&q=80',
  fuerteventura: 'https://images.unsplash.com/photo-1589554533269-9f01c2aed6f0?w=600&q=80',
  'grande canarie': 'https://images.unsplash.com/photo-1567214759399-bce4e6f28f31?w=600&q=80',
  lanzarote: 'https://images.unsplash.com/photo-1583236960843-00c5c90b1b5a?w=600&q=80',
  'la palma': 'https://images.unsplash.com/photo-1599578046560-4ca68c21b8ae?w=600&q=80',
  tenerife: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?w=600&q=80',
  lisbonne: 'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600&q=80',
  porto: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80',
  faro: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
  funchal: 'https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=600&q=80',
  rome: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
  naples: 'https://images.unsplash.com/photo-1529539795054-3c162aab037a?w=600&q=80',
  venise: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80',
  bari: 'https://images.unsplash.com/photo-1633419434873-8b8e3b20d7a0?w=600&q=80',
  cagliari: 'https://images.unsplash.com/photo-1580984969071-a8da8e0d3c75?w=600&q=80',
  catane: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe9b?w=600&q=80',
  palerme: 'https://images.unsplash.com/photo-1523365280197-f1783db9fe9b?w=600&q=80',
  athenes: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=600&q=80',
  heraklion: 'https://images.unsplash.com/photo-1594985516986-a3ba9e4a5c80?w=600&q=80',
  rhodes: 'https://images.unsplash.com/photo-1601581875039-e899893d520c?w=600&q=80',
  corfou: 'https://images.unsplash.com/photo-1587923953553-79b09e8c9a4e?w=600&q=80',
  mykonos: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=600&q=80',
  paris: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
  nice: 'https://images.unsplash.com/photo-1491166617655-0723a0f2f54a?w=600&q=80',
  marseille: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80',
  bordeaux: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&q=80',
  toulouse: 'https://images.unsplash.com/photo-1591780720927-1b41b5b9a8c0?w=600&q=80',
  ajaccio: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
  bastia: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80',
  berlin: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&q=80',
  munich: 'https://images.unsplash.com/photo-1595867818082-083862f3d630?w=600&q=80',
  hambourg: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80',
  francfort: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80',
  londres: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80',
  manchester: 'https://images.unsplash.com/photo-1543872084-c7bd3822856f?w=600&q=80',
  edimbourg: 'https://images.unsplash.com/photo-1506377872008-6645d9d29ef7?w=600&q=80',
  amsterdam: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80',
  dubrovnik: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80',
  split: 'https://images.unsplash.com/photo-1591455882562-87975f3b5c41?w=600&q=80',
  zadar: 'https://images.unsplash.com/photo-1570612861542-284f4c12e75f?w=600&q=80',
  zagreb: 'https://images.unsplash.com/photo-1555990793-da11153b2473?w=600&q=80',
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
  reykjavik: 'https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=600&q=80',
  bratislava: 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=600&q=80',
  sofia: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80',
  bucarest: 'https://images.unsplash.com/photo-1584646098378-0e8a6f4b1c9c?w=600&q=80',
  belgrade: 'https://images.unsplash.com/photo-1566457671653-f9f51bcacaff?w=600&q=80',
  cracovie: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80',
  varsovie: 'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80',
  tirana: 'https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=600&q=80',
  pristina: 'https://images.unsplash.com/photo-1592878940526-0214b0f374f6?w=600&q=80',
  dubai: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
  'tel aviv': 'https://images.unsplash.com/photo-1574260031597-bcd9eb192b4f?w=600&q=80',
  montreal: 'https://images.unsplash.com/photo-1519178614-68673b201f36?w=600&q=80',
  alger: 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&q=80',
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
    stars >= 4 ? '⭐ Tres bon prix' :
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
            des {deal.price}€
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