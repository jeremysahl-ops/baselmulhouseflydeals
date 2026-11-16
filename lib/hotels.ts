import { Deal } from '@/types/deal';
import { DESTINATIONS } from '@/lib/destinations';
import type { Lang } from '@/lib/i18n/config';
import { localizedCountry, localizedLabel } from '@/lib/i18n/destinations';

/** Comparateur d'hôtels vers lequel renvoie le bouton « Trouver un hôtel ». */
export const HOTEL_PARTNER = 'Booking.com';

/** Code de langue attendu par Booking.com. */
const BOOKING_LANG: Record<Lang, string> = { fr: 'fr', de: 'de', en: 'en-gb' };

/** Ville + pays dans la langue du visiteur : évite les homonymes (Naples en Floride, Split…). */
function place(destination: string, lang: Lang): string {
  return `${localizedLabel(destination, lang)}, ${localizedCountry(destination, lang)}`;
}

/** Recherche d'hôtels dans une ville, sans dates (pages guides). Renvoie null si la destination est inconnue. */
export function hotelCityLink(destination: string, lang: Lang = 'fr'): string | null {
  if (!DESTINATIONS[destination]) return null;
  const q = new URLSearchParams({ ss: place(destination, lang), lang: BOOKING_LANG[lang], selected_currency: 'EUR' });
  return `https://www.booking.com/searchresults.html?${q.toString()}`;
}

/**
 * Lien de recherche d'hôtels pour la ville et les dates exactes du vol (arrivée le jour de l'aller,
 * départ le jour du retour), 2 adultes, 1 chambre. Renvoie null si la destination ou les dates manquent.
 *
 * Pas encore de commission : pour être rémunéré, il faudra rejoindre un programme hôtels
 * (Travelpayouts, Booking.com…) puis transformer ce lien ici, à un seul endroit.
 */
export function hotelSearchLink(
  deal: Pick<Deal, 'destination' | 'departure_date' | 'return_date'>,
  lang: Lang = 'fr',
): string | null {
  const checkin = deal.departure_date?.slice(0, 10);
  const checkout = deal.return_date?.slice(0, 10);
  if (!DESTINATIONS[deal.destination] || !checkin || !checkout || checkout <= checkin) return null;
  const q = new URLSearchParams({
    ss: place(deal.destination, lang),
    checkin,
    checkout,
    group_adults: '2',
    no_rooms: '1',
    group_children: '0',
    lang: BOOKING_LANG[lang],
    selected_currency: 'EUR',
  });
  return `https://www.booking.com/searchresults.html?${q.toString()}`;
}
