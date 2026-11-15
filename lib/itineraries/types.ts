/** Une journée : [titre, programme]. */
export type RawDay = [title: string, text: string];

/** Clé = destination telle qu'en base et dans lib/destinations.ts. */
export type RawItineraries = Record<string, RawDay[]>;
