'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Séjours', href: '/sejour' },
  { label: 'Vols', href: '/vol' },
  { label: 'Hôtels', href: '/vol-hotel' },
  { label: 'Dernière minute', href: '/derniere-minute' },
];

const SEARCH_LINKS = ['Séjours', 'Vols', 'Hôtels'];
const DUREES = ['1 à 2 jours','2 à 3 jours','3 à 5 jours','5 à 7 jours','7 à 10 jours','1 semaine','10 jours','2 semaines','3 semaines','4 semaines','5 semaines','6 semaines','2 mois','3 mois'];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSearch, setActiveSearch] = useState<string | null>(null);
  const [dateMode, setDateMode] = useState<'exactes' | 'flexibles'>('exactes');
  const [duree, setDuree] = useState<string | null>(null);
  const [adultes, setAdultes] = useState(2);
  const [enfants, setEnfants] = useState(0);
  const [agesEnfants, setAgesEnfants] = useState<number[]>([]);
  const [showVoyageurs, setShowVoyageurs] = useState(false);

  const handleNavClick = (label: string) => {
    if (SEARCH_LINKS.includes(label)) {
      setActiveSearch(activeSearch === label ? null : label);
      setDateMode('exactes');
      setDuree(null);
    } else {
      setActiveSearch(null);
    }
  };

  const updateEnfants = (nb: number) => {
    const newNb = Math.max(0, Math.min(6, nb));
    setEnfants(newNb);
    if (newNb > agesEnfants.length) {
      setAgesEnfants([...agesEnfants, ...Array(newNb - agesEnfants.length).fill(5)]);
    } else {
      setAgesEnfants(agesEnfants.slice(0, newNb));
    }
  };

  const voyageursLabel = () => {
    let label = `${adultes} Adulte${adultes > 1 ? 's' : ''}`;
    if (enfants > 0) label += ` · ${enfants} enfant${enfants > 1 ? 's' : ''}`;
    return label;
  };

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100" style={{boxShadow: '0 2px 8px rgba(0,0,0,0.07)'}}>
      <div style={{background: 'linear-gradient(90deg, #7B2FBE 0%, #5B9BD5 100%)'}} className="h-1 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => setActiveSearch(null)}>
            <Image src="/cigogne.svg" alt="Mascotte cigogne" width={40} height={48} />
            <div className="leading-tight">
              <span className="font-black text-lg tracking-tight" style={{color: '#7B2FBE'}}>
                Basel<span style={{color: '#2C3E50'}}>Mulhouse</span>
              </span>
              <p className="text-gray-400 text-[9px] font-semibold tracking-widest uppercase -mt-0.5">Fly Deals</p>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              SEARCH_LINKS.includes(link.label) ? (
                <button key={link.href} onClick={() => handleNavClick(link.label)}
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${activeSearch === link.label ? 'bg-purple-700 text-white' : 'text-gray-700 hover:bg-purple-700 hover:text-white'}`}>
                  {link.label}
                </button>
              ) : (
                <Link key={link.href} href={link.href} className="px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-purple-700 hover:text-white rounded-full transition-all duration-200">
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <Link href="#newsletter" className="hidden md:block text-sm font-bold px-4 py-2 rounded-full text-white" style={{background: 'linear-gradient(90deg, #FF9AA2, #FFB347)'}}>
            🔔 Alertes deals
          </Link>
          <button className="md:hidden p-2" style={{color: '#7B2FBE'}} onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {activeSearch && (
        <div className="border-t border-gray-100 bg-white px-4 py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap items-end gap-3">
              {/* Destination */}
              <div className="flex-1 min-w-[150px]">
                <label className="block text-xs font-bold text-gray-500 mb-1">Destination</label>
                <input type="text" placeholder="Où ?" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-purple-400" />
              </div>

              {/* Dates exactes */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-xs font-bold text-gray-500">Période de voyage</label>
                  <button onClick={() => setDateMode('exactes')} className={`text-xs px-2 py-0.5 rounded-full border transition-all ${dateMode === 'exactes' ? 'border-purple-500 text-purple-600 font-bold' : 'border-gray-300 text-gray-400'}`}>Dates exactes</button>
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                  <input type="text" placeholder="Départ le ?" className="w-full text-sm text-gray-700 focus:outline-none" />
                  <span className="text-gray-300">–</span>
                  <input type="text" placeholder="Retour le ?" className="w-full text-sm text-gray-700 focus:outline-none" />
                </div>
              </div>

              <span className="text-gray-400 text-sm font-medium pb-2">ou</span>

              {/* Dates flexibles */}
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <label className="text-xs font-bold text-gray-500">Période de voyage</label>
                  <button onClick={() => setDateMode('flexibles')} className={`text-xs px-2 py-0.5 rounded-full border transition-all ${dateMode === 'flexibles' ? 'border-purple-500 text-purple-600 font-bold' : 'border-gray-300 text-gray-400'}`}>Dates flexibles</button>
                </div>
                <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                  <input type="text" placeholder="Départ le ?" className="w-full text-sm text-gray-700 focus:outline-none" />
                  <span className="text-gray-300">–</span>
                  <input type="text" placeholder="Retour le ?" className="w-full text-sm text-gray-700 focus:outline-none" />
                </div>
              </div>

              {/* Prix max */}
              <div className="min-w-[120px]">
                <label className="block text-xs font-bold text-gray-500 mb-1">Prix max / personne</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5">
                  <span className="text-gray-400 text-sm mr-1">€</span>
                  <input type="number" placeholder="Max" className="w-full text-sm text-gray-700 focus:outline-none" />
                </div>
              </div>

              {/* Voyageurs */}
              <div className="relative min-w-[180px]">
                <label className="block text-xs font-bold text-gray-500 mb-1">Voyageurs</label>
                <button
                  onClick={() => setShowVoyageurs(!showVoyageurs)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 text-left flex items-center justify-between hover:border-purple-400 transition-colors"
                >
                  <span>{voyageursLabel()}</span>
                  <span className="text-gray-400">▾</span>
                </button>

                {showVoyageurs && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-50 w-72">
                    {/* Adultes */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm font-bold text-gray-700">Adultes</p>
                        <p className="text-xs text-gray-400">12 ans et plus</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setAdultes(Math.max(1, adultes - 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600 font-bold transition-colors">−</button>
                        <span className="w-6 text-center font-bold text-gray-700">{adultes}</span>
                        <button onClick={() => setAdultes(Math.min(8, adultes + 1))} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600 font-bold transition-colors">+</button>
                      </div>
                    </div>

                    {/* Enfants */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-bold text-gray-700">Enfants</p>
                        <p className="text-xs text-gray-400">De 2 à 11 ans</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateEnfants(enfants - 1)} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600 font-bold transition-colors">−</button>
                        <span className="w-6 text-center font-bold text-gray-700">{enfants}</span>
                        <button onClick={() => updateEnfants(enfants + 1)} className="w-8 h-8 rounded-full border border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600 font-bold transition-colors">+</button>
                      </div>
                    </div>

                    {/* Ages enfants */}
                    {enfants > 0 && (
                      <div className="border-t border-gray-100 pt-3 mt-2">
                        <p className="text-xs font-bold text-gray-500 mb-2">Âge des enfants au départ</p>
                        <div className="space-y-2">
                          {agesEnfants.map((age, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <span className="text-xs text-gray-600">Enfant {i + 1}</span>
                              <select
                                value={age}
                                onChange={(e) => {
                                  const newAges = [...agesEnfants];
                                  newAges[i] = parseInt(e.target.value);
                                  setAgesEnfants(newAges);
                                }}
                                className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 focus:outline-none focus:border-purple-400"
                              >
                                {Array.from({length: 12}, (_, i) => i).map(a => (
                                  <option key={a} value={a}>{a === 0 ? 'Moins de 1 an' : `${a} an${a > 1 ? 's' : ''}`}</option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <button onClick={() => setShowVoyageurs(false)} className="mt-4 w-full btn-cta py-2 text-sm font-bold rounded-xl">
                      Valider
                    </button>
                  </div>
                )}
              </div>

              {/* Bouton rechercher */}
              <div>
                <button className="btn-cta px-6 py-2.5 text-sm font-bold rounded-xl whitespace-nowrap">
                  Rechercher
                </button>
              </div>
            </div>

            {/* Durée si flexibles */}
            {dateMode === 'flexibles' && (
              <div className="mt-4 border-t border-gray-100 pt-4">
                <p className="text-sm font-bold text-gray-700 mb-1">Combien de temps voulez-vous partir ?</p>
                <p className="text-xs text-gray-400 mb-3">durant la période indiquée ci-dessus :</p>
                <div className="flex flex-wrap gap-2">
                  {DUREES.map((d) => (
                    <button key={d} onClick={() => setDuree(duree === d ? null : d)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-all ${duree === d ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-400 hover:text-purple-600'}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
