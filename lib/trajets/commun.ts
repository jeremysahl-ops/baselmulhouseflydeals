// « Rejoindre le centre-ville » : comment aller de l'aéroport d'arrivée au centre, par aéroport.
// Données relevées en ligne (sites des transports et guides récents), prix APPROXIMATIFS et indicatifs.
// Une ligne par moyen trouvé (train et bus = deux lignes, taxi et VTC = deux lignes).
// Une ville absente d'ici n'affiche pas la section : n'ajouter que des villes vérifiées en ligne.
import type { Lang } from '@/lib/i18n/config';

export type Mode = 'train' | 'metro' | 'tram' | 'bus' | 'bateau' | 'taxi' | 'vtc';
export type Txt = Record<Lang, string>;

export interface LigneTrajet {
  mode: Mode;
  /** Nom de la ligne ou du service, tel qu'affiché sur place (ex. « Aerobús »). */
  nom?: string | Txt;
  /** Où va la ligne. */
  vers: Txt;
  /** Durée jusqu'au centre, ex. « 25-35 min ». */
  duree: string;
  /** Prix approximatif pour une personne (taxi et VTC : pour la voiture). Vide = introuvable, affiché « à vérifier ». */
  prix: string;
}

export interface Trajet {
  /** Date du relevé en ligne (AAAA-MM-JJ). */
  verifie: string;
  lignes: LigneTrajet[];
  bonPlan?: Txt;
}

export const centre: Txt = { fr: 'Centre-ville', de: 'Stadtzentrum', en: 'City centre' };

/** Petit raccourci : un texte en français, allemand et anglais. */
export const tx = (fr: string, de: string, en: string): Txt => ({ fr, de, en });
