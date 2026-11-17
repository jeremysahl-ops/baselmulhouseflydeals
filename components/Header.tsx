'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import Flag from '@/components/Flag';
import { LANG_NAME, LOCALES, getDict, localePath, stripLocale, type Lang } from '@/lib/i18n';

export default function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = getDict(lang);
  // Adresse sans préfixe de langue : identique côté serveur (/fr/… après réécriture) et côté navigateur.
  const path = stripLocale(usePathname() ?? '/');

  const nav = [
    { href: '/mois', label: t.nav.byMonth },
    { href: '/destinations', label: t.nav.byDestination },
    { href: '/prix', label: t.nav.allPrices },
    { href: '/sejours', label: t.nav.sejours },
  ];

  const languages = (
    <ul className="flex items-center gap-0.5 text-xs font-semibold" aria-label={t.nav.language}>
      {LOCALES.map((l) => (
        <li key={l}>
          {/* Lien classique (pas de navigation interne) : la page est rechargée et le choix retenu par ?l=… */}
          <a
            href={`${localePath(l, path)}?l=${l}`}
            hrefLang={l}
            lang={l}
            title={LANG_NAME[l]}
            aria-current={l === lang ? 'true' : undefined}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-1.5 rounded px-1.5 py-1 uppercase ${l === lang ? 'bg-brand-soft text-brand' : 'text-ink-muted hover:text-ink'}`}
          >
            <Flag lang={l} />
            {l}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo lang={lang} />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={t.nav.main}>
          {nav.map(({ href, label }) => {
            const active = path === href || path.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={localePath(lang, href)}
                aria-current={active ? 'page' : undefined}
                className={`whitespace-nowrap px-2.5 py-2 font-display text-base font-semibold uppercase tracking-wide xl:text-lg transition-colors ${
                  active ? 'text-ink underline decoration-action decoration-4 underline-offset-8' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">{languages}</div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-ink-soft hover:bg-surface xl:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18 18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-line bg-white xl:hidden" aria-label={t.nav.mobile}>
          <div className="container-page flex flex-col py-3">
            {nav.map(({ href, label }) => (
              <Link
                key={href}
                href={localePath(lang, href)}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface"
              >
                {label}
              </Link>
            ))}
            <div className="px-2 py-3">{languages}</div>
          </div>
        </nav>
      )}
    </header>
  );
}
