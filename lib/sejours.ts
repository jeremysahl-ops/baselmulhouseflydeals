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
  { destination: "Marrakech", pays: 'MA', titre: "Riad Les Jardins des Lilas", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/maroc/riad-les-jardins-des-lilas/492449?from=2685&duration=3-2', nuits: 2, depart: '2027-02-15', prix: 146, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Malte", pays: 'MT', titre: "Hôtel Relax Inn ***", voyagiste: "Plein Vent", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/malte/hotel-relax-inn-3-etoiles/292570?from=2685&duration=3-2', nuits: 2, formule: 'petit-dejeuner', depart: '2027-02-16', prix: 154, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Vienne", pays: 'AT', titre: "ArtHotel Ana Gala Vienna 4* - Sans transfert", voyagiste: "Boomerang Séjours", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/autriche/arthotel-ana-gala-vienna-4-etoiles-sans-transfert/211806?from=2685&duration=3-2', nuits: 2, depart: '2027-01-15', prix: 156, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Malaga", pays: 'ES', titre: "Pierre & Vacances Terrazas Costa del Sol 4*", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/espagne/pierre-vacances-terrazas-costa-del-sol-4-etoiles/557446?from=2685&duration=5-4', nuits: 4, depart: '2027-01-25', prix: 166, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Marrakech", pays: 'MA', titre: "Riad Palmiers de la Medina (Ex Riad Nuits d'Orient)", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/maroc/riad-palmiers-de-la-medina-ex-riad-nuits-dorient/501803?from=2685&duration=3-2', nuits: 2, formule: 'petit-dejeuner', depart: '2027-01-13', prix: 170, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Istanbul", pays: 'TR', titre: "Santa Sophia Hotel", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/turquie/santa-sophia-hotel/507344?from=2685&duration=4-3', nuits: 3, depart: '2027-03-10', prix: 182, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Porto", pays: 'PT', titre: "WOT Porto 3* - Sans transfert", voyagiste: "Boomerang Séjours", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/portugal/wot-porto-3-etoiles-sans-transfert/228073?from=2685&duration=3-2', nuits: 2, depart: '2027-02-23', prix: 188, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Porticcio (Corse)", pays: 'FR', titre: "Résidence Suite Home Porticcio 4*", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/france/residence-suite-home-porticcio-4-etoiles/540366?from=2685&duration=3-2', nuits: 2, depart: '2027-03-31', prix: 189, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Budapest", pays: 'HU', titre: "Hotel Parlament 4* - Sans transfert", voyagiste: "Boomerang Séjours", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/sejours/hongrie/hotel-parlament-4-etoiles-sans-transfert/202487?from=2685&duration=3-2', nuits: 2, depart: '2027-02-15', prix: 193, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Djerba", pays: 'TN', titre: "Club Jumbo Djerba Resort ****", voyagiste: "Plein Vent", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/clubs/tunisie/club-jumbo-djerba-resort-4-etoiles/248256?from=2685&duration=6-5', nuits: 5, formule: 'tout-compris', depart: '2027-04-01', prix: 327, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Canaries", pays: 'ES', titre: "Club Jumbo Chatur Costa Caleta ***", voyagiste: "Plein Vent", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/clubs/espagne/club-jumbo-chatur-costa-caleta-3-etoiles/252470?from=2685&duration=6-5', nuits: 5, formule: 'tout-compris', depart: '2027-01-28', prix: 420, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
  { destination: "Athènes et Santorin", pays: 'GR', titre: "Ôcombiné - Athènes & ile de Santorin", voyagiste: "Thalasso n°1 Flex", source: 'Salaün Holidays', url: 'https://www.salaun-holidays.com/combines/grece/ocombine-athenes-ile-de-santorin/492446?from=2685&duration=7-5', nuits: 5, formule: 'petit-dejeuner', depart: '2027-04-26', prix: 713, vuLe: '2026-11-21', jusquAu: '2026-12-12' },
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
