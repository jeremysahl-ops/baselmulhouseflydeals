import { CONSEILS_DE } from './de';
import { CONSEILS_EN } from './en';
import { CONSEILS_FR } from './fr';
import { CONSEILS_DE2 } from './de2';
import { CONSEILS_EN2 } from './en2';
import { CONSEILS_FR2 } from './fr2';
import { CONSEILS_DE3 } from './de3';
import { CONSEILS_EN3 } from './en3';
import { CONSEILS_FR3 } from './fr3';
import type { Lang } from '@/lib/i18n/config';

const FR = { ...CONSEILS_FR, ...CONSEILS_FR2, ...CONSEILS_FR3 };
const BY_LANG = { fr: FR, de: { ...CONSEILS_DE, ...CONSEILS_DE2, ...CONSEILS_DE3 }, en: { ...CONSEILS_EN, ...CONSEILS_EN2, ...CONSEILS_EN3 } };

/** Les quatre conseils de voyage d'un aéroport, ou null (retombe sur le français si la traduction manque). */
export function conseils(code: string, lang: Lang): [string, string, string, string] | null {
  return BY_LANG[lang][code] ?? FR[code] ?? null;
}
