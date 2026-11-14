// Réglages du site, regroupés ici pour ne pas avoir à chercher dans les pages.

export const SITE = {
  name: 'BaselMulhouse Fly Deals',
  shortName: 'Fly Deals',
  url: 'https://www.baselmulhouseflydeals.com',
  airport: 'EuroAirport Bâle-Mulhouse-Fribourg',
  contactEmail: 'contact@baselmulhouseflydeals.com',
  /** Remise minimale appliquée par le robot (pipeline/dealhunter.py, MIN_DISCOUNT_PCT). */
  minDiscount: 15,
  bookingPartner: 'Kiwi.com',
} as const;

/**
 * Mentions légales. Tant que `publisher` vaut null, la page indique que le site est édité
 * à titre personnel par un particulier. À compléter dès qu'une structure existe (micro-entreprise…).
 */
export const LEGAL: {
  publisher: string | null; // nom et prénom, ou raison sociale
  status: string | null; // ex. « Entrepreneur individuel », « SAS au capital de … »
  address: string | null;
  siret: string | null;
  publicationDirector: string | null;
} = {
  publisher: null,
  status: null,
  address: null,
  siret: null,
  publicationDirector: null,
};

export const HOST = {
  name: 'Vercel Inc.',
  address: '440 N Barranca Ave #4133, Covina, CA 91723, États-Unis',
  site: 'https://vercel.com',
};

/** Les rubriques classent les deals par durée sur place (c'est ce que calcule le robot). */
export const SECTIONS = [
  { slug: 'city-trip', label: 'Week-ends', title: 'Week-ends et courts séjours', hint: '2 à 4 nuits' },
  { slug: 'vol', label: 'Une semaine', title: 'Une semaine sur place', hint: '5 à 8 nuits' },
  { slug: 'sejour', label: 'Longs séjours', title: 'Longs séjours', hint: '10 à 15 nuits' },
  { slug: 'derniere-minute', label: 'Départs proches', title: 'Départs dans les 30 jours', hint: 'dans les 30 jours' },
] as const;

export type SectionSlug = (typeof SECTIONS)[number]['slug'];

export function getSection(slug: string) {
  return SECTIONS.find((s) => s.slug === slug);
}
