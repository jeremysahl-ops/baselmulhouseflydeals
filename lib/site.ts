// Réglages du site, regroupés ici pour ne pas avoir à chercher dans les pages.

export const SITE = {
  name: 'FlyBSL',
  shortName: 'FlyBSL',
  /** Signature affichée avec le logo. BSL = code de l'aéroport, commun aux trois pays. */
  tagline: 'Les bons plans vols des trois frontières',
  url: 'https://www.flybsl.com',
  airport: 'EuroAirport Bâle-Mulhouse-Fribourg',
  /** Boîte Gmail dédiée au site. À remplacer par contact@flybsl.com une fois le domaine acheté. */
  contactEmail: 'flybslmlh@gmail.com',
  bookingPartner: 'Kiwi.com',
  /** Clé PUBLIQUE des notifications (alertes de prix). La clé privée reste sur l'ordinateur : %USERPROFILE%\.flybslapid.json. */
  vapidPublicKey: 'BKX2S_Ih--4S6Yp9fyW_W5Eac6DH08Q2mpkJjUQXW-ceyf9jOqKS4HfvejkNHsy7bIZ1FRNJFuDQMuyQvs3M-OQ',
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
