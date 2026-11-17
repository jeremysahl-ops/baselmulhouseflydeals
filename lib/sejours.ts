// Séjours vol + hôtel au départ de Bâle-Mulhouse, REPRIS de sites de voyagistes (onglet « Séjours »).
// FlyBSL ne vend rien : chaque ligne renvoie vers l'offre chez le site qui la publie.
// Règles : uniquement des faits courts (aucun texte ni photo recopiés), prix vu sur la page du site source
// le jour `vuLe`, et l'offre disparaît du site après `jusquAu` (ou dès que la date de départ est trop proche).
// Pas de « −X % » ni de prix barré : seulement le prix affiché par le site.

export type Formule = 'petit-dejeuner' | 'demi-pension' | 'pension-complete' | 'tout-compris';

export interface Sejour {
  /** Ville ou région, telle qu'affichée (français). */
  destination: string;
  /** Code pays ISO (pour le drapeau et le nom du pays). */
  pays: string;
  /** Aéroport dont la photo illustre le séjour (même ville seulement) ; sinon déduit du nom de la destination. */
  code?: string;
  /** Hôtel ou nom du séjour, tel que publié par le site. */
  titre: string;
  /** Voyagiste qui organise le séjour (ex. Fram, Plein Vent). */
  voyagiste: string;
  /** Site où l'offre est publiée et réservée. */
  source: string;
  url: string;
  nuits: number;
  formule?: Formule;
  /** Date de départ affichée pour ce prix (AAAA-MM-JJ). */
  depart: string;
  /** Prix par personne, en euros, vol + hôtel. */
  prix: number;
  /** Jour où le prix a été vu sur le site source (AAAA-MM-JJ). */
  vuLe: string;
  /** Dernier jour d'affichage (AAAA-MM-JJ). */
  jusquAu: string;
}

export const SEJOURS: Sejour[] = [
  { destination: 'Malte', pays: 'MT', titre: 'Hôtel Relax Inn 3*', voyagiste: 'Plein Vent', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/malte/hotel-relax-inn-3-etoiles/292570?from=2685&duration=3-2', nuits: 2, formule: 'petit-dejeuner', depart: '2027-02-16', prix: 155, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Marrakech', pays: 'MA', titre: 'Riad Palmiers de la Medina', voyagiste: 'Thalasso n°1', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/maroc/riad-palmiers-de-la-medina-ex-riad-nuits-dorient/501803?from=2685&duration=3-2', nuits: 2, formule: 'petit-dejeuner', depart: '2027-02-01', prix: 174, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Vienne', pays: 'AT', titre: 'ArtHotel Ana Gala Vienna 4*', voyagiste: 'Boomerang Séjours', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/autriche/arthotel-ana-gala-vienna-4-etoiles-sans-transfert/211806?from=2685&duration=3-2', nuits: 2, depart: '2027-02-05', prix: 177, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Malaga', pays: 'ES', titre: 'Pierre & Vacances Terrazas Costa del Sol 4*', voyagiste: 'Thalasso n°1', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/espagne/pierre-vacances-terrazas-costa-del-sol-4-etoiles/557446?from=2685&duration=4-3', nuits: 3, depart: '2027-03-08', prix: 181, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Istanbul', pays: 'TR', titre: 'Santa Sophia Hotel', voyagiste: 'Thalasso n°1', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/turquie/santa-sophia-hotel/507344?from=2685&duration=4-3', nuits: 3, depart: '2027-01-16', prix: 182, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Marrakech', pays: 'MA', titre: 'Ôclub Experience Targa Aqualis Club Resort 4*', voyagiste: 'Thalasso n°1', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/clubs/maroc/oclub-experience-targa-aqualis-club-resort-4-etoiles-ex-club-targa-resort/543761?from=2685&duration=3-2', nuits: 2, formule: 'tout-compris', depart: '2027-02-01', prix: 204, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Albufeira (Algarve)', pays: 'PT', titre: 'Club Framissima Albufeira Sol Hotel & Spa 4*', voyagiste: 'Fram', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/clubs/portugal/club-framissima-albufeira-sol-hotel-spa-4-etoiles/211599?from=2685&duration=4-3', nuits: 3, formule: 'petit-dejeuner', depart: '2027-02-21', prix: 276, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Tunisie', pays: 'TN', code: 'NBE', titre: 'Club Jumbo Venice Beach 3*', voyagiste: 'Plein Vent', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/clubs/tunisie/club-jumbo-venice-beach-3-etoiles/303237?from=2685&duration=4-3', nuits: 3, formule: 'tout-compris', depart: '2027-05-01', prix: 287, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Marrakech et désert d’Agafay', pays: 'MA', titre: 'Combiné Targa Aqualis Club Resort 4* & Mia Agafay Resort 4*', voyagiste: 'Thalasso n°1', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/combines/maroc/ocombine-oclub-targa-aqualis-club-resort-4-etoiles-mia-agafay-resort-4-etoiles/554987?from=2685&duration=5-4', nuits: 4, depart: '2027-02-03', prix: 342, vuLe: '2026-11-17', jusquAu: '2026-12-08' },
  { destination: 'Le Caire et mer Rouge', pays: 'EG', titre: 'Combiné circuit Le Caire + Jumbo Bellagio Beach Resort & Spa', voyagiste: 'Plein Vent', source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/combines/egypte/combine-circuit-et-hotel-le-caire-mythique-et-extension-au-jumbo-bellagio-beach-resort-spa/567034?from=2685&duration=8-7', nuits: 7, depart: '2026-12-10', prix: 866, vuLe: '2026-11-17', jusquAu: '2026-12-03' },
];

/** Séjours encore affichables : avant leur date limite et avec un départ dans au moins 3 jours. */
export function sejoursActifs(now = new Date()): Sejour[] {
  const jour = now.toISOString().slice(0, 10);
  const limiteDepart = new Date(now.getTime() + 3 * 86_400_000).toISOString().slice(0, 10);
  return SEJOURS.filter((s) => s.jusquAu >= jour && s.depart >= limiteDepart).sort((a, b) => a.prix - b.prix);
}

import { AIRPORTS } from '@/lib/airports';

const sansAccent = (x: string) => x.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/** Aéroport dont la photo peut illustrer le séjour : jamais la photo d'une autre ville. */
export function codePhoto(s: Sejour): string | null {
  if (s.code && AIRPORTS[s.code]) return s.code;
  const d = sansAccent(s.destination);
  return Object.keys(AIRPORTS).find((c) => d.startsWith(sansAccent(AIRPORTS[c].names[0]))) ?? null;
}
