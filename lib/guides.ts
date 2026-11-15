// Pages guides (/destinations/…) : une par destination de lib/destinations.ts.
import { DESTINATIONS } from '@/lib/destinations';

/** 'Palma de Mallorca' → 'palma-de-mallorca', 'Athenes' → 'athenes'. */
export function guideSlug(destination: string): string {
  return destination
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function guidePath(destination: string): string {
  return `/destinations/${guideSlug(destination)}`;
}

const BY_SLUG: Record<string, string> = Object.fromEntries(Object.keys(DESTINATIONS).map((d) => [guideSlug(d), d]));

/** Destination (clé de DESTINATIONS) correspondant à une adresse, ou null. */
export function destinationFromSlug(slug: string): string | null {
  return BY_SLUG[slug] ?? null;
}

/** Toutes les destinations, par ordre alphabétique de leur nom affiché. */
export function allDestinations(): string[] {
  return Object.keys(DESTINATIONS).sort((a, b) => DESTINATIONS[a].label.localeCompare(DESTINATIONS[b].label, 'fr'));
}
