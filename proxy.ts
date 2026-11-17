import { NextResponse, type NextRequest } from 'next/server';

/**
 * Aiguillage des langues. Les pages vivent sous app/[lang]/ :
 *   - /…        → français : on sert /fr/… sans changer l'adresse affichée ;
 *   - /de/…, /en/… → servies telles quelles ;
 *   - /fr/…     → redirigé vers /… pour ne pas avoir deux adresses pour la même page.
 * Langue automatique (17/11/2026) : à la première visite d'une page française, on choisit la langue selon le pays
 * (pays francophone → français, Allemagne/Autriche/Liechtenstein → allemand, Suisse → langue du navigateur,
 * reste du monde → anglais). Le choix est retenu dans le cookie `lang` ; les drapeaux le changent (?l=fr pour le français).
 * Les robots des moteurs de recherche ne sont jamais redirigés.
 */
const FRANCOPHONES = new Set(['FR', 'BE', 'LU', 'MC', 'RE', 'GP', 'MQ', 'GF', 'YT', 'NC', 'PF', 'PM', 'BL', 'MF', 'WF', 'SN', 'CI', 'ML', 'BF', 'NE', 'TG', 'BJ', 'GN', 'CM', 'GA', 'CG', 'CD', 'MG', 'TD', 'CF', 'DJ', 'KM', 'BI', 'RW', 'HT', 'MA', 'TN', 'DZ', 'MU', 'SC', 'VU']);
const GERMANOPHONES = new Set(['DE', 'AT', 'LI']);
const ROBOT = /bot|crawl|spider|slurp|facebookexternalhit|preview/i;
const UN_AN = 60 * 60 * 24 * 365;

function langueDuVisiteur(request: NextRequest): 'fr' | 'de' | 'en' {
  const pays = (request.headers.get('x-vercel-ip-country') ?? '').toUpperCase();
  const nav = (request.headers.get('accept-language') ?? '').toLowerCase();
  if (FRANCOPHONES.has(pays)) return 'fr';
  if (GERMANOPHONES.has(pays)) return 'de';
  if (pays === 'CH') return nav.startsWith('fr') ? 'fr' : nav.startsWith('en') ? 'en' : 'de';
  if (!pays) return nav.startsWith('de') ? 'de' : nav.startsWith('en') ? 'en' : 'fr'; // en local, sans pays
  return 'en';
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || '/';
    return NextResponse.redirect(url, 308);
  }

  // Le drapeau français : on retient le choix puis on revient à l'adresse propre.
  if (searchParams.get('l') === 'fr') {
    const url = request.nextUrl.clone();
    url.searchParams.delete('l');
    const res = NextResponse.redirect(url, 307);
    res.cookies.set('lang', 'fr', { maxAge: UN_AN, path: '/' });
    return res;
  }

  const prefixe = pathname.match(/^\/(de|en)(\/|$)/)?.[1];
  if (prefixe) {
    const res = NextResponse.next();
    if (request.cookies.get('lang')?.value !== prefixe) res.cookies.set('lang', prefixe, { maxAge: UN_AN, path: '/' });
    return res;
  }

  // Navigation interne du site (requêtes RSC / préchargement) : jamais de changement de langue en cours de route,
  // sinon la page s'affiche dans une langue et le menu dans une autre.
  const navigationInterne = request.headers.has('rsc') || request.headers.has('next-router-prefetch') || request.headers.has('next-router-state-tree');
  const dejaChoisi = request.cookies.get('lang')?.value;

  if (!navigationInterne && !ROBOT.test(request.headers.get('user-agent') ?? '')) {
    const choix = dejaChoisi ?? langueDuVisiteur(request);
    if (choix === 'de' || choix === 'en') {
      const url = request.nextUrl.clone();
      url.pathname = `/${choix}${pathname === '/' ? '' : pathname}`;
      const res = NextResponse.redirect(url, 307);
      res.cookies.set('lang', choix, { maxAge: UN_AN, path: '/' });
      return res;
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/fr${pathname === '/' ? '' : pathname}`;
  const res = NextResponse.rewrite(url);
  // Visiteur servi en français : on retient ce choix pour qu'il ne bascule plus ensuite.
  if (!dejaChoisi && !navigationInterne) res.cookies.set('lang', 'fr', { maxAge: UN_AN, path: '/' });
  return res;
}

export const config = {
  matcher: ['/((?!api/|go/|hotel/|_next/|opengraph-image|.*\\.).*)'],
};
