import { CONSEILS_DE } from './de';
import { CONSEILS_EN } from './en';
import { CONSEILS_FR } from './fr';
import type { Lang } from '@/lib/i18n/config';

const BY_LANG = { fr: CONSEILS_FR, de: CONSEILS_DE, en: CONSEILS_EN };

/** Les quatre conseils de voyage d'un aéroport, ou null (retombe sur le français si la traduction manque). */
export function conseils(code: string, lang: Lang): [string, string, string, string] | null {
  return BY_LANG[lang][code] ?? CONSEILS_FR[code] ?? null;
}
