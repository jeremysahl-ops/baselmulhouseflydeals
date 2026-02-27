import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#2C3E50] text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✈️</span>
              <span className="font-black text-white text-lg">
                Basel<span className="text-[#C9A0DC]">Mulhouse</span> Fly Deals
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Les meilleurs bons plans vols au départ de l&apos;aéroport Basel-Mulhouse-Freiburg.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Catégories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/sejour" className="hover:text-[#C9A0DC] transition-colors">🌴 Séjours</Link></li>
              <li><Link href="/city-trip" className="hover:text-[#C9A0DC] transition-colors">🌆 Week-end</Link></li>
              <li><Link href="/vol" className="hover:text-[#C9A0DC] transition-colors">✈️ Vols</Link></li>
              <li><Link href="/vol-hotel" className="hover:text-[#C9A0DC] transition-colors">🏨 Hôtel</Link></li>
              <li><Link href="/derniere-minute" className="hover:text-[#C9A0DC] transition-colors">⚡ Dernière minute</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Infos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/mentions-legales" className="hover:text-[#C9A0DC] transition-colors">Mentions légales</Link></li>
              <li><Link href="/confidentialite" className="hover:text-[#C9A0DC] transition-colors">Confidentialité</Link></li>
              <li><a href="mailto:contact@baselmulhouseflydeals.com" className="hover:text-[#C9A0DC] transition-colors">📩 Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © {currentYear} BaselMulhouseFlyDeals.com — Fait avec ❤️ en Alsace
        </div>
      </div>
    </footer>
  );
}
