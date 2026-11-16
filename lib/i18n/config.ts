// Langues du site. Le français est à la racine (/…), l'allemand sous /de/…, l'anglais sous /en/….
// Techniquement toutes les pages vivent sous app/[lang]/ ; proxy.ts réécrit /… vers /fr/… sans changer l'adresse.

export const LOCALES = ['fr', 'de', 'en'] as const;
export type Lang = (typeof LOCALES)[number];
export const DEFAULT_LANG: Lang = 'fr';

export function isLang(value: string): value is Lang {
  return (LOCALES as readonly string[]).includes(value);
}

/** Balise de langue pour les dates et les nombres. */
export const INTL_LOCALE: Record<Lang, string> = { fr: 'fr-FR', de: 'de-DE', en: 'en-GB' };
/** Balise Open Graph. */
export const OG_LOCALE: Record<Lang, string> = { fr: 'fr_FR', de: 'de_DE', en: 'en_GB' };
/** Nom de la langue, dans cette langue (sélecteur de langue). */
export const LANG_NAME: Record<Lang, string> = { fr: 'Français', de: 'Deutsch', en: 'English' };

/** Adresse d'une page dans une langue : localePath('de', '/alertes') → '/de/alertes' ; en français, inchangée. */
export function localePath(lang: Lang, path: string): string {
  if (lang === DEFAULT_LANG) return path || '/';
  if (path === '/' || path === '') return `/${lang}`;
  return `/${lang}${path}`;
}

/** Retire un éventuel préfixe de langue : '/de/alertes' → '/alertes', '/fr' → '/'. */
export function stripLocale(pathname: string): string {
  const m = pathname.match(/^\/(fr|de|en)(\/.*)?$/);
  return m ? m[2] || '/' : pathname || '/';
}

/** `alternates` des métadonnées : adresse canonique + équivalents dans les autres langues (hreflang). */
export function alternatesFor(lang: Lang, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      fr: localePath('fr', path),
      de: localePath('de', path),
      en: localePath('en', path),
      'x-default': localePath('fr', path),
    },
  };
}
