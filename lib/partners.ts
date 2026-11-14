// Partenaires mis en avant sur le site (hôtels, parkings, navettes…).
// Un partenaire est toujours affiché avec la mention « Partenaire » : c'est une obligation légale
// (publicité identifiable) et un engagement pris sur la page /partenaires.
// Tant que la liste est vide, aucun encart n'apparaît sur le site.

export type Partner = {
  name: string;
  /** Ex. « Parking à 5 min de l'aéroport », « Hôtel 4 étoiles à Lisbonne ». */
  kind: string;
  /** Une ou deux phrases, factuelles. */
  description: string;
  /** Adresse du site du partenaire (https://…). */
  url: string;
  /** Texte du bouton. */
  cta: string;
  /**
   * Où afficher l'encart : 'local' = accueil et toutes les pages de deal (parking, navette, hôtel
   * près de l'aéroport) ; sinon, noms de destinations tels qu'en base (ex. ['Lisbonne']) : l'encart
   * n'apparaît que sur les deals vers ces destinations.
   */
  scope: 'local' | string[];
};

export const PARTNERS: Partner[] = [];

export function partnersForHome(): Partner[] {
  return PARTNERS.filter((p) => p.scope === 'local');
}

export function partnersForDestination(destination: string): Partner[] {
  return PARTNERS.filter((p) => p.scope === 'local' || p.scope.includes(destination));
}
