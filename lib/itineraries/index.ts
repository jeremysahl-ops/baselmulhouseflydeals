// Programmes d'activités par destination, rédigés à partir de connaissances générales (sites et
// excursions classiques), sans prix ni horaires pour ne pas vieillir. Les premières journées sont les
// incontournables, les suivantes des excursions : on affiche autant de journées que de nuits sur place.
// Français : part1.ts … part4.ts ; allemand : de/ ; anglais : en/. Une destination sans traduction
// retombe sur le français.

import { PART1 } from './part1';
import { PART2 } from './part2';
import { PART3 } from './part3';
import { PART4 } from './part4';
import { PART5 } from './part5';
import { PART6 } from './part6';
import { PART7 } from './part7';
import { DE_ITINERARIES } from './de';
import { EN_ITINERARIES } from './en';
import type { RawItineraries } from './types';
import type { Lang } from '@/lib/i18n/config';

export interface DayPlan {
  title: string;
  text: string;
}

export const ITINERARIES: RawItineraries = { ...PART1, ...PART2, ...PART3, ...PART4, ...PART5, ...PART6, ...PART7 };

const BY_LANG: Record<Lang, RawItineraries> = { fr: ITINERARIES, de: DE_ITINERARIES, en: EN_ITINERARIES };

function raw(destination: string, lang: Lang) {
  const local = BY_LANG[lang][destination];
  return local && local.length > 0 ? local : ITINERARIES[destination];
}

export interface Itinerary {
  /** Journées affichées (au plus une par nuit sur place). */
  days: DayPlan[];
  /** Nuits sur place prises en compte. */
  nights: number;
  /** Nuits au-delà du programme : à garder libres. */
  spare: number;
}

/** Programme complet d'une destination (pages guides), ou null si elle n'en a pas. */
export function fullItinerary(destination: string, lang: Lang = 'fr'): DayPlan[] | null {
  const all = raw(destination, lang);
  return all && all.length > 0 ? all.map(([title, text]) => ({ title, text })) : null;
}

/** Programme adapté à la durée du séjour, ou null si la destination n'en a pas. */
export function itineraryFor(destination: string, nights: number | null, lang: Lang = 'fr'): Itinerary | null {
  const all = raw(destination, lang);
  if (!all || all.length === 0) return null;
  const n = nights && nights > 0 ? Math.round(nights) : 3;
  const days = all.slice(0, Math.min(n, all.length)).map(([title, text]) => ({ title, text }));
  return { days, nights: n, spare: Math.max(0, n - all.length) };
}
