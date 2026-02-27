'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Sejours', href: '/sejour' },
  { label: 'Week-end', href: '/city-trip' },
  { label: 'Vols', href: '/vol' },
  { label: 'Hotel', href: '/vol-hotel' },
  { label: 'Derniere minute', href: '/derniere-minute' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}}>
      <div style={{background: 'linear-gradient(90deg, #7B2FBE 0%, #5B9BD5 100%)'}} className="h-1 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">✈️</span>
            <div className="leading-tight">
              <span className="font-black text-lg tracking-tight" style={{color: '#7B2FBE'}}>
                Basel<span style={{color: '#2C3E50'}}>Mulhouse</span>
              </span>
              <p className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase -mt-0.5">
                Fly Deals
              </p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-purple-600 hover:text-white rounded-full transition-all duration-200">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="#newsletter" className="hidden md:block text-sm font-bold px-4 py-2 rounded-full text-white" style={{background: 'linear-gradient(90deg, #FF9AA2, #FFB347)'}}>
            Alertes deals
          </Link>
          <button className="md:hidden p-2" style={{color: '#7B2FBE'}} onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-purple-50">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
