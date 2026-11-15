import { NextResponse } from 'next/server';
import { getDealById } from '@/lib/supabase';
import { hotelSearchLink } from '@/lib/hotels';

/**
 * Redirection vers la recherche d'hôtels pour la ville et les dates du deal.
 * Comme pour /go/[id], le lien est reconstruit ici : jamais d'adresse arbitraire stockée en base.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDealById(id);
  const link = deal ? hotelSearchLink(deal) : null;
  if (!link) {
    return new NextResponse('Deal introuvable', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  }
  return NextResponse.redirect(link, {
    status: 302,
    headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' },
  });
}
