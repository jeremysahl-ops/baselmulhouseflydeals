import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getDealById, getAllDealIds } from '@/lib/supabase';
import TelegramDraftButton from '@/components/TelegramDraftButton';
import { CATEGORY_LABELS } from '@/types/deal';
import { buildAffiliateLink } from '@/lib/affiliate';

export const revalidate = 600;

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = await getAllDealIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal) return { title: 'Deal introuvable' };

  return {
    title: `${deal.title} – ${deal.price}€ | BaselMulhouse Fly Deals`,
    description: `✈️ ${deal.destination} dès ${deal.price}€ avec ${deal.departure_date ?? deal.dates}. ${deal.dates}. ${deal.insider_tip ?? ''}`,
    openGraph: {
      title: `${deal.title} – dès ${deal.price}€`,
      description: `Deal ${deal.destination} avec ${deal.departure_date ?? deal.dates}`,
      images: deal.image_url ? [{ url: deal.image_url }] : [],
    },
  };
}

export default async function DealPage({ params }: Props) {
  const { id } = await params;
  const deal = await getDealById(id);

  if (!deal) notFound();

  const categoryLabel = CATEGORY_LABELS[deal.category] ?? deal.category;
  const imgSrc = deal.image_url ?? 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-[#999] mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-[#C9A0DC] transition-colors">Accueil</Link>
        <span>/</span>
        <Link href={`/${deal.category}`} className="hover:text-[#C9A0DC] transition-colors">
          {categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#555] truncate">{deal.destination}</span>
      </nav>

      {/* Hero image */}
      <div className="relative w-full h-64 md:h-80 rounded-3xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={imgSrc}
          alt={`${deal.destination} – ${deal.title}`}
          fill
          className="object-cover"
          priority
          unoptimized={imgSrc.startsWith('https://images.unsplash')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className="inline-block bg-white/90 backdrop-blur text-[#6C3483] text-xs font-bold px-3 py-1 rounded-full mb-2">
            {categoryLabel}
          </span>
          <h1 className="text-white font-black text-xl md:text-2xl leading-tight drop-shadow-md">
            {deal.title}
          </h1>
        </div>
      </div>

      {/* Price + infos */}
      <div className="bg-white rounded-2xl border border-[#E8E0F0] p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-4xl font-black text-[#C9A0DC] mb-1">
              dès {deal.price}€
              <span className="text-base font-normal text-[#999] ml-2">/ pers.</span>
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-[#555] mt-2">
              <span className="flex items-center gap-1">✈️ <strong>{deal.company ?? deal.airline}</strong></span>
              <span className="flex items-center gap-1">🗓️ {deal.dates}</span>
              <span className="flex items-center gap-1">📍 {deal.destination}</span>
            </div>
          </div>

          <a
            href={buildAffiliateLink(deal.link ?? deal.deal_url, deal.destination, deal.departure_date)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="btn-cta px-8 py-4 text-base text-center shadow-xl shadow-rose-200 whitespace-nowrap"
          >
            🚀 J'y vais !
          </a>
        </div>
      </div>

      {/* Insider tip */}
      {deal.insider_tip && (
        <div className="bg-gradient-to-r from-[#FFF0F5] to-[#F5F0FF] border border-[#FFB6C1] rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-[#2C3E50] text-base mb-2 flex items-center gap-2">
            💡 Astuce insider
          </h2>
          <p className="text-[#444] text-sm leading-relaxed">{deal.insider_tip}</p>
        </div>
      )}

      {/* Info box */}
      <div className="bg-[#EDE7F6]/40 rounded-2xl p-5 mb-8 text-sm text-[#555] leading-relaxed">
        <p className="font-semibold text-[#2C3E50] mb-1">ℹ️ Bon à savoir</p>
        <ul className="list-disc list-inside space-y-1 text-[#666]">
          <li>Prix constaté automatiquement — vérifiez toujours le prix final sur le site de la compagnie. Les prix peuvent varier selon les disponibilités et la date de consultation.</li>
          <li>Vérifiez toujours le prix final sur le site de la compagnie.</li>
          <li>L'aéroport Basel-Mulhouse se situe à Saint-Louis (68).</li>
          <li>Pensez aux parkings P4/P5 longue durée pour économiser !</li>
        </ul>
      </div>

      {/* Telegram draft button (visible only si admin — à protéger côté UI si nécessaire) */}
      <div className="flex items-center justify-between border-t border-[#EEE] pt-6">
        <Link href={`/${deal.category}`} className="text-[#5DADE2] text-sm font-semibold hover:underline">
          ← Retour à {categoryLabel}
        </Link>
        <TelegramDraftButton deal={deal} />
      </div>
    </div>
  );
}
