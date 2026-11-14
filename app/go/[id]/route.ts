import { NextResponse } from 'next/server';
import { getDealById } from '@/lib/supabase';
import { BOOKING_FALLBACK, bookingLink } from '@/lib/booking';

/**
 * Redirection immédiate vers le partenaire de réservation (remplace l'ancienne page d'attente de 6 s).
 * Le lien est toujours reconstruit ici, à partir de la destination et des dates du deal :
 * on ne redirige jamais vers une adresse arbitraire stockée en base.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deal = await getDealById(id);
  if (!deal) {
    return new NextResponse('Deal introuvable', { status: 404, headers: { 'X-Robots-Tag': 'noindex' } });
  }
  return NextResponse.redirect(bookingLink(deal) ?? BOOKING_FALLBACK, {
    status: 302,
    headers: { 'X-Robots-Tag': 'noindex, nofollow', 'Cache-Control': 'no-store' },
  });
}
