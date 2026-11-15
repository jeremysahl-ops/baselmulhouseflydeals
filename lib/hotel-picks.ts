// Bons plans hôtels repérés À LA MAIN, directement chez l'hôtelier (« coups de cœur »).
// Ce n'est pas le robot qui les trouve : chaque ligne est ajoutée après avoir vérifié le prix sur le
// site de l'hôtel. Un bon plan disparaît tout seul du site après sa date `validUntil`.
// Tant que la liste est vide, rien n'apparaît sur le site.
//
// Exemple à copier :
//   {
//     destination: 'Lisbonne',                      // nom tel que dans lib/destinations.ts
//     name: 'Hotel Exemple',
//     stars: 4,
//     area: 'Quartier du Chiado, à 5 min du métro',
//     offer: '−20 % en réservant sur le site de l’hôtel, petit-déjeuner compris',
//     pricePerNight: 89,                            // pour 2 personnes
//     url: 'https://www.hotel-exemple.com/offres',
//     checkedOn: '2026-11-15',                      // jour où le prix a été vérifié
//     validUntil: '2026-12-15',                     // dernier jour d'affichage
//   },

import { Deal } from '@/types/deal';

export type HotelPick = {
  /** Destination telle qu'en base et dans lib/destinations.ts (ex. 'Lisbonne', 'Palma de Mallorca'). */
  destination: string;
  name: string;
  /** Nombre d'étoiles (1 à 5), si connu. */
  stars?: number;
  /** Où se trouve l'hôtel, en quelques mots. */
  area?: string;
  /** Le bon plan, en une phrase factuelle. */
  offer: string;
  /** Prix constaté par nuit, pour 2 personnes, en euros. */
  pricePerNight?: number;
  /** Page de l'offre sur le site de l'hôtelier (https://…). */
  url: string;
  /** Jour où le prix a été vérifié (AAAA-MM-JJ). */
  checkedOn: string;
  /** Dernier jour d'affichage (AAAA-MM-JJ). Ensuite, le bon plan n'apparaît plus. */
  validUntil: string;
  /** Si l'offre ne vaut que pour certaines dates de séjour (AAAA-MM-JJ). */
  stayFrom?: string;
  stayTo?: string;
  /** true si l'hôtel est un partenaire du site : la mention « Partenaire » est alors affichée (obligation légale). */
  partner?: boolean;
};

export const HOTEL_PICKS: HotelPick[] = [];

/** Jour civil à Paris (AAAA-MM-JJ). */
function today(): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris' }).format(new Date());
}

/** Bons plans encore valables aujourd'hui. */
export function activeHotelPicks(picks: HotelPick[] = HOTEL_PICKS): HotelPick[] {
  const now = today();
  return picks.filter((p) => p.validUntil >= now);
}

/**
 * Bons plans à montrer sur un deal : même destination, encore valables, et, si l'offre est limitée
 * à certaines dates de séjour, uniquement quand le séjour du deal tombe entièrement dedans.
 */
export function hotelPicksForDeal(
  deal: Pick<Deal, 'destination' | 'departure_date' | 'return_date'>,
  picks: HotelPick[] = HOTEL_PICKS,
): HotelPick[] {
  const from = deal.departure_date?.slice(0, 10);
  const to = deal.return_date?.slice(0, 10);
  return activeHotelPicks(picks).filter((p) => {
    if (p.destination !== deal.destination) return false;
    if (p.stayFrom && (!from || from < p.stayFrom)) return false;
    if (p.stayTo && (!to || to > p.stayTo)) return false;
    return true;
  });
}
