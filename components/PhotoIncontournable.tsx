import photos from '@/lib/data/incontournables-photos.json';
import ThemeIcon, { type Theme } from '@/components/ThemeIcon';

interface Photo { url: string; page: string; auteur: string; licence: string; article: string }
const PHOTOS = photos as Record<string, Photo>;

/** Vrai si au moins une des journées de la liste a une photo (on aligne alors les pictogrammes sur le format photo). */
export function aDesPhotos(cles: string[]): boolean {
  return cles.some((c) => PHOTOS[c]);
}

/**
 * Illustration d'un incontournable : photo libre du lieu (Wikimedia Commons, contrôlée à l'œil, avec crédit et licence),
 * sinon la tuile pictogramme du thème.
 */
export default function PhotoIncontournable({ cle, theme, lang, alt, aligne }: { cle: string; theme: Theme; lang: 'fr' | 'de' | 'en'; alt: string; aligne: boolean }) {
  const p = PHOTOS[cle];
  if (!p && !aligne) return <ThemeIcon theme={theme} lang={lang} />;
  if (!p) {
    return (
      <div>
        <ThemeIcon theme={theme} lang={lang} format="photo" />
        <p className="mt-1 h-[15px]" aria-hidden="true" />
      </div>
    );
  }
  return (
    <figure>
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-line">
        {/* Vignette servie par Wikimedia (pas d'optimisation Next : image déjà redimensionnée à 900 px). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.url} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-1 truncate text-[10px] text-ink-muted">
        <a href={p.page} target="_blank" rel="noopener nofollow" className="hover:underline">
          © {p.auteur} · {p.licence} · Wikimedia Commons
        </a>
      </figcaption>
    </figure>
  );
}
