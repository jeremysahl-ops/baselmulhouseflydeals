import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2C3E50] text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✈️</span>
              <span className="font-black text-white text-lg">
                Basel<span className="text-[#FFB6C1]">Mulhouse</span> Fly Deals
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Les meilleurs bons plans vols au départ de l'aéroport Basel-Mulhouse-Freiburg (EuroAirport).
            </p>
            <p className="mt-3 text-xs font-semibold text-[#C9A0DC] bg-[#C9A0DC]/10 inline-block px-3 py-1 rounded-full">
              🏠 Site indépendant — non affilié à l'EuroAirport
            </p>
          </div>

          {/* Catégories */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Catégories</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['✈️ Vols', '/vol'],
                ['🏨 Vol + Hôtel', '/vol-hotel'],
                ['🌆 City Trips', '/city-trip'],
                ['🌴 Séjours', '/sejour'],
                ['⚡ Dernière Minute', '/derniere-minute'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-[#C9A0DC] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal & Contact */}
          <div>
            <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Infos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="hover:text-[#C9A0DC] transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-[#C9A0DC] transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <a
                  href="mailto:contact@baselmulhouseflydeals.com"
                  className="hover:text-[#C9A0DC] transition-colors"
                >
                  📩 Contact
                </a>
              </li>
            </ul>
            <p className="mt-4 text-xs text-white/40 leading-relaxed">
              Les prix affichés sont indicatifs et peuvent varier. Certains liens sont affiliés — merci de nous soutenir ! 🙏
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/40">
          © {currentYear} BaselMulhouseFlyDeals.com — Fait avec ❤️ et ✈️ en Alsace
        </div>
      </div>
    </footer>
  );
}
