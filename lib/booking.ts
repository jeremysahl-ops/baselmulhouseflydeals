import { Deal } from '@/types/deal';
import { DESTINATIONS } from '@/lib/destinations';

// Identifiant d'affiliation Kiwi fourni par Travelpayouts (public : il figure dans tout lien kiwi.tpx.gr).
// Même valeur que dans pipeline/dealhunter.py. L'ancien site envoyait seulement « 707798 »,
// que Kiwi ne peut pas rattacher au compte.
const TP_MARKER = '488de323a4ee43df95eb88630-707798';
const KIWI_AFFILID = `travelpayoutsdeeplink_www.baselmulhouseflydeals.com_${TP_MARKER}`;
const ORIGIN_IATA = 'BSL';

/**
 * Lien de réservation officiel (deep link Kiwi) : recherche pré-remplie sur les dates du deal,
 * vols directs. Renvoie null si la destination ou les dates sont inconnues.
 */
export function bookingLink(deal: Pick<Deal, 'destination' | 'departure_date' | 'return_date'>): string | null {
  const iata = DESTINATIONS[deal.destination]?.iata;
  if (!iata || !deal.departure_date || !deal.return_date) return null;
  const q = new URLSearchParams({
    affilid: KIWI_AFFILID,
    sub1: TP_MARKER,
    lang: 'fr',
    currency: 'eur',
    from: ORIGIN_IATA,
    to: iata,
    departure: deal.departure_date.slice(0, 10),
    return: deal.return_date.slice(0, 10),
    stopNumber: '0',
  });
  return `https://www.kiwi.com/deep?${q.toString()}`;
}

/** Lien générique (page d'accueil Kiwi attribuée au compte), en dernier recours. */
export const BOOKING_FALLBACK = `https://www.kiwi.com/deep?affilid=${KIWI_AFFILID}&sub1=${TP_MARKER}&lang=fr`;
