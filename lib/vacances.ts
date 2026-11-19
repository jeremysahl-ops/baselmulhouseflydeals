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

/** Jours fériés (Alsace-Moselle, Bâle-Ville, Bade-Wurtemberg), décembre 2026 → octobre 2027. */
export const FERIES: { date: string; pays: Pays[]; noms: Record<Lang, string> }[] = [
  { date: '2026-12-25', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Noël', de: 'Weihnachten', en: 'Christmas Day' } },
  { date: '2026-12-26', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Saint-Étienne', de: 'Stephanstag', en: "St Stephen's Day" } },
  { date: '2027-01-01', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Jour de l’an', de: 'Neujahr', en: "New Year's Day" } },
  { date: '2027-01-06', pays: ['DE'], noms: { fr: 'Épiphanie', de: 'Heilige Drei Könige', en: 'Epiphany' } },
  { date: '2027-03-26', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Vendredi saint', de: 'Karfreitag', en: 'Good Friday' } },
  { date: '2027-03-29', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Lundi de Pâques', de: 'Ostermontag', en: 'Easter Monday' } },
  { date: '2027-05-01', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Fête du travail', de: 'Tag der Arbeit', en: 'Labour Day' } },
  { date: '2027-05-06', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Ascension', de: 'Auffahrt / Christi Himmelfahrt', en: 'Ascension Day' } },
  { date: '2027-05-08', pays: ['FR'], noms: { fr: 'Victoire 1945', de: 'Tag des Sieges 1945', en: 'Victory in Europe Day' } },
  { date: '2027-05-17', pays: ['FR', 'CH', 'DE'], noms: { fr: 'Lundi de Pentecôte', de: 'Pfingstmontag', en: 'Whit Monday' } },
  { date: '2027-05-27', pays: ['DE'], noms: { fr: 'Fête-Dieu', de: 'Fronleichnam', en: 'Corpus Christi' } },
  { date: '2027-07-14', pays: ['FR'], noms: { fr: 'Fête nationale', de: 'Französischer Nationalfeiertag', en: 'Bastille Day' } },
  { date: '2027-08-01', pays: ['CH'], noms: { fr: 'Fête nationale suisse', de: 'Bundesfeier', en: 'Swiss National Day' } },
  { date: '2027-08-15', pays: ['FR'], noms: { fr: 'Assomption', de: 'Mariä Himmelfahrt', en: 'Assumption Day' } },
  { date: '2027-10-03', pays: ['DE'], noms: { fr: 'Fête de l’Unité allemande', de: 'Tag der Deutschen Einheit', en: 'German Unity Day' } },
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

/** Pour un pont : combo « à 2 jours près » (départ de 2 jours avant à 1 jour après le début, retour de 1 jour avant à 2 jours après la fin), hors combos qui conviennent déjà. */
export function proche(p: Periode, depart: string, retour: string): boolean {
  if (p.type !== 'pont' || convient(p, depart, retour)) return false;
  const d = jour(depart), r = jour(retour), a = jour(p.debut), b = jour(p.fin);
  return d >= a - 2 && d <= a + 1 && r >= b - 1 && r <= b + 2 && r > d;
}
