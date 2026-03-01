'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '/sejour', label: 'Séjours' },
  { href: '/vol', label: 'Vols' },
  { href: '/vol-hotel', label: 'Hôtels' },
  { href: '/derniere-minute', label: 'Dernière minute' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/cigogne.svg" alt="Logo" width={36} height={36} />
            <div>
              <span className="font-black text-[#6C3483] text-lg leading-none">Basel<span className="text-[#2C3E50]">Mulhouse</span></span>
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase leading-none">Fly Deals</p>
            </div>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm font-semibold text-gray-600 hover:text-[#6C3483] transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/alertes" className="btn-cta text-sm px-4 py-2">
              🔔 Alertes deals
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-3">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm font-semibold text-gray-600 hover:text-[#6C3483] hover:bg-purple-50 rounded-lg transition-colors">
                {label}
              </Link>
            ))}
            <Link href="/alertes" onClick={() => setMenuOpen(false)}
              className="block mt-2 mx-4 text-center btn-cta text-sm px-4 py-2">
              🔔 Alertes deals
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}