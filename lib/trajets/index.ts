// « Rejoindre le centre-ville » : voir commun.ts pour le format. Un fichier par lot de villes.
import type { Trajet } from './commun';
import { LOT1 } from './lot1';
import { ESPAGNE_PORTUGAL } from './espagne-portugal';
import { ITALIE_FRANCE } from './italie-france';
import { GRECE_BALKANS } from './grece-balkans';
import { EUROPE_NORD_EST } from './europe-nord-est';
import { SUD } from './sud';
import { HORS_RELEVE } from './hors-releve';

export type { Mode, Trajet, LigneTrajet } from './commun';

const TRAJETS: Record<string, Trajet> = { ...LOT1, ...ESPAGNE_PORTUGAL, ...ITALIE_FRANCE, ...GRECE_BALKANS, ...EUROPE_NORD_EST, ...SUD, ...HORS_RELEVE };

export function trajet(code: string): Trajet | null {
  return TRAJETS[code] ?? null;
}
