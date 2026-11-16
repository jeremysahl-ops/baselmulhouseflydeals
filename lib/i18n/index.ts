import { de } from './de';
import { en } from './en';
import { fr, type Dict } from './fr';
import type { Lang } from './config';

export * from './config';
export type { Dict };

const DICTS: Record<Lang, Dict> = { fr, de, en };

/** Textes du site dans une langue. */
export function getDict(lang: Lang): Dict {
  return DICTS[lang];
}
