// Liens du bloc « Pour ton séjour » (pages destinations) : hôtels, activités, transferts depuis l'aéroport.
// Chaque lien passe par `affilie()` : tant qu'un partenaire n'est pas branché (programme Travelpayouts rejoint
// et modèle de lien relevé dans le tableau de bord), le lien est un lien direct, sans commission.
import { AIRPORTS, airportCountry, airportName } from '@/lib/airports';
import type { Lang } from '@/lib/i18n/config';

export type Partenaire = 'booking' | 'getyourguide' | 'kiwitaxi';

export const NOM_PARTENAIRE: Record<Partenaire, string> = { booking: 'Booking.com', getyourguide: 'GetYourGuide', kiwitaxi: 'Kiwitaxi' };

/**
 * Lien Travelpayouts de chaque partenaire : `null` = pas encore branché (lien direct).
 * Une fois le programme rejoint, mettre ici le modèle généré par l'outil « Links » de Travelpayouts,
 * avec {URL} à la place de l'adresse encodée de la page visée.
 */
const MODELE_AFFILIATION: Record<Partenaire, string | null> = {
  booking: null,
  getyourguide: null,
  kiwitaxi: null,
};

function affilie(p: Partenaire, url: string): string {
  const modele = MODELE_AFFILIATION[p];
  return modele ? modele.replace('{URL}', encodeURIComponent(url)) : url;
}

/** Nom de ville utilisable dans une recherche (sans le nom de l'aéroport : « Londres Gatwick » → « Londres »). */
function ville(code: string, lang: Lang): string {
  return airportName(code, lang).replace(/ (Gatwick|Luton|Chopin|Otopeni|Modlin|Băneasa)$/u, '');
}

const BOOKING_LANG: Record<Lang, string> = { fr: 'fr', de: 'de', en: 'en-gb' };
const GYG_DOMAINE: Record<Lang, string> = { fr: 'www.getyourguide.fr', de: 'www.getyourguide.de', en: 'www.getyourguide.com' };

export interface LienSejour {
  partenaire: Partenaire;
  url: string;
  /** true si le lien rapporte une commission (partenaire branché). */
  affilie: boolean;
}

/** Les trois liens du bloc pour un aéroport ; dates facultatives (arrivée / départ de l'hôtel). */
export function liensSejour(code: string, lang: Lang, dates?: { arrivee: string; depart: string }): LienSejour[] {
  if (!AIRPORTS[code]) return [];
  const v = ville(code, lang);
  const q = new URLSearchParams({ ss: `${v}, ${airportCountry(code, lang)}`, lang: BOOKING_LANG[lang], selected_currency: 'EUR', group_adults: '2', no_rooms: '1' });
  if (dates) {
    q.set('checkin', dates.arrivee);
    q.set('checkout', dates.depart);
  }
  return [
    { partenaire: 'booking', affilie: MODELE_AFFILIATION.booking != null, url: affilie('booking', `https://www.booking.com/searchresults.html?${q}`) },
    { partenaire: 'getyourguide', affilie: MODELE_AFFILIATION.getyourguide != null, url: affilie('getyourguide', `https://${GYG_DOMAINE[lang]}/s/?q=${encodeURIComponent(v)}`) },
    { partenaire: 'kiwitaxi', affilie: MODELE_AFFILIATION.kiwitaxi != null, url: affilie('kiwitaxi', `https://kiwitaxi.com/${lang}/`) },
  ];
}
