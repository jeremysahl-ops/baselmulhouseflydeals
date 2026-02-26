'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: '✈️ Vol', href: '/vol' },
  { label: '🏨 Vol+Hôtel', href: '/vol-hotel' },
  { label: '🌆 City Trip', href: '/city-trip' },
  { label: '🌴 Séjour', href: '/sejour' },
  { label: '⚡ Dernière Minute', href: '/derniere-minute' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="gradient-header sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">✈️</span>
            <div className="leading-tight">
              <span className="font-black text-white text-lg tracking-tight group-hover:opacity-90 transition-opacity">
                Basel<span className="text-[#FFB6C1]">Mulhouse</span>
              </span>
              <p className="text-white/80 text-[10px] font-medium tracking-widest uppercase -mt-0.5">
                Fly Deals
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 text-sm font-medium transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile burger */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
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
          <div className="md:hidden pb-4 pt-1 border-t border-white/20">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-white/90 hover:text-white hover:bg-white/20 rounded-lg text-sm font-medium transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
