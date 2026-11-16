import { NextResponse, type NextRequest } from 'next/server';

/**
 * Aiguillage des langues. Les pages vivent sous app/[lang]/ :
 *   - /…        → français : on sert /fr/… sans changer l'adresse affichée ;
 *   - /de/…, /en/… → servies telles quelles ;
 *   - /fr/…     → redirigé vers /… pour ne pas avoir deux adresses pour la même page.
 * Les routes techniques (/api, /go, /hotel, fichiers, image de partage) ne passent pas par ici.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  if (/^\/(de|en)(\/|$)/.test(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!api/|go/|hotel/|_next/|opengraph-image|.*\\.).*)'],
};
