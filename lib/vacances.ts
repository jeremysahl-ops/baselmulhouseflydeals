// Ponts, jours fériés et vacances scolaires des trois pays de l'EuroAirport, de décembre 2026 à octobre 2027.
// Sources (vérifiées le 19/11/2026) :
//  - France, zone B (académie de Strasbourg) : données ouvertes du ministère de l'Éducation nationale
//    (data.education.gouv.fr, jeu « fr-en-calendrier-scolaire ») ; Alsace-Moselle : Vendredi saint et 26 décembre fériés ;
//  - Bâle-Ville : calendrier officiel du canton (data-bs.ch/stata/ed/schulferien/SchulferienBS.ics) ;
//  - Bade-Wurtemberg : règlement des vacances du ministère, repris par kalenderpedia.de ; jours fériés du Land.
// `debut` et `fin` = premier et dernier jour libre (week-end compris).
import type { Lang } from '@/lib/i18n/config';

export type Pays = 'FR' | 'CH' | 'DE';
export interface Periode {
  id: string;
  type: 'pont' | 'vacances';
  debut: string;
  fin: string;
  pays: Pays[];
  noms: Record<Lang, string>;
}

export const PERIODES: Periode[] = [
  { id: 'noel-we', type: 'pont', debut: '2026-12-25', fin: '2026-12-27', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Week-end de Noël', de: 'Weihnachtswochenende', en: 'Christmas weekend' } },
  { id: 'noel-fr', type: 'vacances', debut: '2026-12-19', fin: '2027-01-03', pays: ['FR', 'CH'], noms: { fr: 'Vacances de Noël (Alsace, Bâle)', de: 'Weihnachtsferien (Elsass, Basel)', en: 'Christmas holidays (Alsace, Basel)' } },
  { id: 'noel-de', type: 'vacances', debut: '2026-12-23', fin: '2027-01-09', pays: ['DE'], noms: { fr: 'Vacances de Noël (Bade-Wurtemberg)', de: 'Weihnachtsferien (Baden-Württemberg)', en: 'Christmas holidays (Baden-Württemberg)' } },
  { id: 'nouvel-an', type: 'pont', debut: '2027-01-01', fin: '2027-01-03', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Week-end du Nouvel An', de: 'Neujahrswochenende', en: "New Year's weekend" } },
  { id: 'fasnacht', type: 'vacances', debut: '2027-02-06', fin: '2027-02-21', pays: ['CH'], noms: { fr: 'Vacances de Fasnacht (Bâle)', de: 'Fasnachts- und Sportferien (Basel)', en: 'Fasnacht holidays (Basel)' } },
  { id: 'hiver-fr', type: 'vacances', debut: '2027-02-20', fin: '2027-03-07', pays: ['FR'], noms: { fr: "Vacances d'hiver (Alsace)", de: 'Winterferien (Elsass)', en: 'Winter holidays (Alsace)' } },
  { id: 'printemps-ch', type: 'vacances', debut: '2027-03-20', fin: '2027-04-04', pays: ['CH'], noms: { fr: 'Vacances de printemps (Bâle)', de: 'Frühjahrsferien (Basel)', en: 'Spring holidays (Basel)' } },
  { id: 'paques', type: 'pont', debut: '2027-03-26', fin: '2027-03-29', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Week-end de Pâques', de: 'Osterwochenende', en: 'Easter weekend' } },
  { id: 'paques-de', type: 'vacances', debut: '2027-03-25', fin: '2027-04-04', pays: ['DE'], noms: { fr: 'Vacances de Pâques (Bade-Wurtemberg)', de: 'Osterferien (Baden-Württemberg)', en: 'Easter holidays (Baden-Württemberg)' } },
  { id: 'printemps-fr', type: 'vacances', debut: '2027-04-17', fin: '2027-05-02', pays: ['FR'], noms: { fr: 'Vacances de printemps (Alsace)', de: 'Frühlingsferien (Elsass)', en: 'Spring holidays (Alsace)' } },
  { id: 'ascension', type: 'pont', debut: '2027-05-06', fin: '2027-05-09', pays: ['FR', 'CH', 'DE'], noms: { fr: "Pont de l'Ascension", de: 'Auffahrts-/Himmelfahrtsbrücke', en: 'Ascension long weekend' } },
  { id: 'pentecote', type: 'pont', debut: '2027-05-15', fin: '2027-05-17', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Week-end de Pentecôte', de: 'Pfingstwochenende', en: 'Whitsun weekend' } },
  { id: 'pentecote-de', type: 'vacances', debut: '2027-05-15', fin: '2027-05-30', pays: ['DE'], noms: { fr: 'Vacances de Pentecôte (Bade-Wurtemberg)', de: 'Pfingstferien (Baden-Württemberg)', en: 'Whitsun holidays (Baden-Württemberg)' } },
  { id: 'fete-dieu', type: 'pont', debut: '2027-05-27', fin: '2027-05-30', pays: ['DE'], noms: { fr: 'Pont de la Fête-Dieu (Bade-Wurtemberg)', de: 'Fronleichnamsbrücke (Baden-Württemberg)', en: 'Corpus Christi long weekend (Baden-Württemberg)' } },
  { id: 'ete-ch', type: 'vacances', debut: '2027-07-03', fin: '2027-08-15', pays: ['CH'], noms: { fr: "Vacances d'été (Bâle)", de: 'Sommerferien (Basel)', en: 'Summer holidays (Basel)' } },
  { id: 'ete-fr', type: 'vacances', debut: '2027-07-03', fin: '2027-08-31', pays: ['FR'], noms: { fr: "Vacances d'été (Alsace)", de: 'Sommerferien (Elsass)', en: 'Summer holidays (Alsace)' } },
  { id: 'ete-de', type: 'vacances', debut: '2027-07-29', fin: '2027-09-11', pays: ['DE'], noms: { fr: "Vacances d'été (Bade-Wurtemberg)", de: 'Sommerferien (Baden-Württemberg)', en: 'Summer holidays (Baden-Württemberg)' } },
  { id: 'automne-ch', type: 'vacances', debut: '2027-10-02', fin: '2027-10-17', pays: ['CH'], noms: { fr: "Vacances d'automne (Bâle)", de: 'Herbstferien (Basel)', en: 'Autumn holidays (Basel)' } },
  { id: 'toussaint', type: 'vacances', debut: '2027-10-23', fin: '2027-11-07', pays: ['FR'], noms: { fr: 'Vacances de la Toussaint (Alsace)', de: 'Herbstferien (Elsass)', en: 'All Saints holidays (Alsace)' } },
];

const jour = (iso: string) => Date.parse(iso + 'T12:00:00Z') / 864e5;

/**
 * Un combo convient à une période quand on part au plus tôt la veille du premier jour libre et qu'on rentre au plus
 * tard le lendemain du dernier. Pour un pont, il faut en plus couvrir tout le pont (départ au plus tard le premier
 * jour, retour au plus tôt le dernier).
 */
export function convient(p: Periode, depart: string, retour: string): boolean {
  const d = jour(depart), r = jour(retour), a = jour(p.debut), b = jour(p.fin);
  if (d < a - 1 || r > b + 1) return false;
  return p.type === 'pont' ? d <= a && r >= b : d <= b;
}
