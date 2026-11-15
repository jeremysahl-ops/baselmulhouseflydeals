// Programmes d'activités par destination, rédigés à partir de connaissances générales (sites et
// excursions classiques), sans prix ni horaires pour ne pas vieillir. Les premières journées sont les
// incontournables, les suivantes des excursions : on affiche autant de journées que de nuits sur place.
// Pour corriger un programme, modifier le texte dans part1.ts … part4.ts.

import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';
import { PART4 } from './part4';
import type { RawItineraries } from './types';

export interface DayPlan {
  title: string;
  text: string;
}

export const ITINERARIES: RawItineraries = { ...PART1, ...PART2, ...PART3, ...PART4 };

export interface Itinerary {
  /** Journées affichées (au plus une par nuit sur place). */
  days: DayPlan[];
  /** Nuits sur place prises en compte. */
  nights: number;
  /** Nuits au-delà du programme : à garder libres. */
  spare: number;
}

/** Programme complet d'une destination (pages guides), ou null si elle n'en a pas. */
export function fullItinerary(destination: string): DayPlan[] | null {
  const all = ITINERARIES[destination];
  return all && all.length > 0 ? all.map(([title, text]) => ({ title, text })) : null;
}

/** Programme adapté à la durée du séjour, ou null si la destination n'en a pas. */
export function itineraryFor(destination: string, nights: number | null): Itinerary | null {
  const all = ITINERARIES[destination];
  if (!all || all.length === 0) return null;
  const n = nights && nights > 0 ? Math.round(nights) : 3;
  const days = all.slice(0, Math.min(n, all.length)).map(([title, text]) => ({ title, text }));
  return { days, nights: n, spare: Math.max(0, n - all.length) };
}
