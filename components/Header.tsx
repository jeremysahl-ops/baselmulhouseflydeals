'use client';

import { useEffect, useState } from 'react';
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
  // Accueil : barre transparente posée sur la grande photo (façon Opodo), qui redevient pleine en défilant.
  const surPhoto = path === '/';
  const [defile, setDefile] = useState(false);
  useEffect(() => {
    if (!surPhoto) return;
    const maj = () => setDefile(window.scrollY > 40);
    maj();
    window.addEventListener('scroll', maj, { passive: true });
    return () => window.removeEventListener('scroll', maj);
  }, [surPhoto]);
  const clair = surPhoto && !defile && !open; // texte blanc sur la photo

  const nav = [
    { href: '/destinations', label: t.nav.byDestination, icon: 'pin' },
    { href: '/mois', label: t.nav.byMonth, icon: 'calendar' },
    { href: '/prix', label: t.nav.allPrices, icon: 'tag' },
    { href: '/sejours', label: t.nav.sejours, icon: 'suitcase' },
    { href: '/vacances', label: t.nav.vacances, icon: 'sun' },
    { href: '/alertes', label: t.nav.alerts, icon: 'bell' },
  ] as const;

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
            className={`flex items-center gap-1.5 rounded px-1.5 py-1 uppercase ${
              clair
                ? l === lang ? 'bg-white/20 text-white' : 'text-white/75 hover:text-white'
                : l === lang ? 'bg-brand-soft text-brand' : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Flag lang={l} />
            {/* Entre 1280 et 1536 px, le menu complet manque de place : drapeaux seuls (le code reste lu par les lecteurs d'écran). */}
            <span className="xl:max-2xl:sr-only">{l}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${surPhoto ? '-mb-16' : ''} ${
        clair ? 'border-b border-white/15 bg-gradient-to-b from-black/45 to-black/10' : 'border-b border-black/5 bg-white/55 backdrop-blur-md backdrop-saturate-150'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo lang={lang} tone={clair ? 'light' : 'dark'} />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label={t.nav.main}>
          {nav.map(({ href, label, icon }) => {
            const active = path === href || path.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={localePath(lang, href)}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-[14px] font-semibold transition-colors ${
                  clair
                    ? active ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/15 hover:text-white'
                    : active ? 'bg-brand-soft text-ink' : 'text-ink-soft hover:bg-brand-soft hover:text-ink'
                }`}
              >
                <NavIcon name={icon} />
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
            className={`rounded-md p-2 xl:hidden ${clair ? 'text-white hover:bg-white/15' : 'text-ink-soft hover:bg-surface'}`}
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
            {nav.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={localePath(lang, href)}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-md px-2 py-3 text-[15px] font-medium text-ink hover:bg-surface"
              >
                <NavIcon name={icon} />
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

/** Petits pictogrammes du menu, dans la couleur du texte. */
function NavIcon({ name }: { name: 'pin' | 'calendar' | 'tag' | 'suitcase' | 'sun' | 'bell' }) {
  const d = {
    pin: 'M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
    calendar: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5v-12zM4 10h16M8 3v4M16 3v4',
    tag: 'M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1l8 8a1.4 1.4 0 0 1 0 2l-6.1 6.1a1.4 1.4 0 0 1-2 0l-9-9zM8 8h.01',
    suitcase: 'M4 8.5A1.5 1.5 0 0 1 5.5 7h13A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9zM9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M4 12h16',
    bell: 'M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15zM10 20.5a2 2 0 0 0 4 0',
    sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4',
  }[name];
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
