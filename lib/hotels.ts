import { Deal } from '@/types/deal';
import { DESTINATIONS } from '@/lib/destinations';

/** Comparateur d'hôtels vers lequel renvoie le bouton « Trouver un hôtel ». */
export const HOTEL_PARTNER = 'Booking.com';

/**
 * Lien de recherche d'hôtels pour la ville et les dates exactes du vol (arrivée le jour de l'aller,
 * départ le jour du retour), 2 adultes, 1 chambre. Renvoie null si la destination ou les dates manquent.
 *
 * Pas encore de commission : pour être rémunéré, il faudra rejoindre un programme hôtels
 * (Travelpayouts, Booking.com…) puis transformer ce lien ici, à un seul endroit.
 */
export function hotelSearchLink(deal: Pick<Deal, 'destination' | 'departure_date' | 'return_date'>): string | null {
  const info = DESTINATIONS[deal.destination];
  const checkin = deal.departure_date?.slice(0, 10);
  const checkout = deal.return_date?.slice(0, 10);
  if (!info || !checkin || !checkout || checkout <= checkin) return null;
  const q = new URLSearchParams({
    // Ville + pays : évite les homonymes (Naples en Floride, Split…).
    ss: `${info.label}, ${info.country}`,
    checkin,
    checkout,
    group_adults: '2',
    no_rooms: '1',
    group_children: '0',
    lang: 'fr',
    selected_currency: 'EUR',
  });
  return `https://www.booking.com/searchresults.html?${q.toString()}`;
}
