'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import { SECTIONS } from '@/lib/site';

const NAV = [
  ...SECTIONS.map((s) => ({ href: `/${s.slug}`, label: s.label })),
  { href: '/destinations', label: 'Destinations' },
  { href: '/comment-ca-marche', label: 'Notre méthode' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {NAV.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-brand-soft text-brand' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/alertes" className="btn-primary hidden !py-2.5 sm:inline-flex">
            Recevoir les alertes
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-md p-2 text-ink-soft hover:bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18 18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-line bg-white lg:hidden" aria-label="Navigation mobile">
          <div className="container-page flex flex-col py-3">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink hover:bg-surface"
              >
                {label}
              </Link>
            ))}
            <Link href="/alertes" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Recevoir les alertes
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
