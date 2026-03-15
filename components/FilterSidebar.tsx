'use client';
import { useState, useMemo } from 'react';
import DealCard from './DealCard';

const MOIS = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];
const CATEGORIES = [
  { slug: 'all', label: 'Toutes' },
  { slug: 'vol', label: '✈️ Vols' },
  { slug: 'vol-hotel', label: '🏨 Hôtels' },
  { slug: 'sejour', label: '🌴 Séjours' },
  { slug: 'derniere-minute', label: '⚡ Dernière minute' },
];

export default function FilterSidebar({ deals }: { deals: any[] }) {
  const [mois, setMois] = useState<number | null>(null);
  const [categorie, setCategorie] = useState('all');
  const [scoreMin, setScoreMin] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (mois !== null && d.month_departure !== mois + 1) return false;
      if (categorie !== 'all' && d.category !== categorie) return false;
      if (d.deal_score && d.deal_score < scoreMin) return false;
      return true;
    });
  }, [deals, mois, categorie, scoreMin]);

  const FilterContent = () => (
    <>
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-500 mb-2">Mois de départ</label>
        <div className="grid grid-cols-3 gap-1">
          {MOIS.map((m, i) => (
            <button key={i} onClick={() => setMois(mois === i ? null : i)} className={`text-xs py-1 px-1 rounded-lg border transition-all ${mois === i ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-400'}`}>
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-500 mb-2">Catégorie</label>
        <div className="space-y-1">
          {CATEGORIES.map((c) => (
            <button key={c.slug} onClick={() => setCategorie(c.slug)} className={`w-full text-left text-xs py-1.5 px-3 rounded-lg border transition-all ${categorie === c.slug ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-400'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-bold text-gray-500 mb-2">Score minimum</label>
        <div className="flex gap-1">
          {[1,2,3,4,5].map((s) => (
            <button key={s} onClick={() => setScoreMin(s)} className={`flex-1 py-1.5 text-xs rounded-lg border transition-all ${scoreMin === s ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-500 hover:border-purple-400'}`}>
              {s}★
            </button>
          ))}
        </div>
      </div>
      <button onClick={() => { setMois(null); setCategorie('all'); setScoreMin(1); }} className="w-full text-xs text-purple-600 hover:text-purple-800 font-semibold py-2 border border-purple-200 rounded-xl hover:bg-purple-50 transition-all">
        Réinitialiser les filtres
      </button>
    </>
  );

  return (
    <div className="w-full">

      {/* Bouton filtres mobile */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm font-semibold text-gray-700 text-sm"
        >
          <span>🔍 Filtres {mois !== null || categorie !== 'all' || scoreMin > 1 ? '(actifs)' : ''}</span>
          <span>{mobileFiltersOpen ? '▲' : '▼'}</span>
        </button>
        {mobileFiltersOpen && (
          <div className="mt-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <FilterContent />
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar desktop uniquement */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
            <h3 className="font-black text-gray-800 text-lg mb-5">🔍 Filtres</h3>
            <FilterContent />
          </div>
        </aside>

        {/* Grille deals */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-black text-[#2C3E50]">🔥 Derniers deals</h2>
            <span className="text-sm text-gray-500">{filtered.length} deal{filtered.length > 1 ? 's' : ''}</span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <p className="text-4xl mb-3">✈️</p>
              <p className="text-lg font-semibold text-gray-600">Aucun deal pour ces critères</p>
              <p className="text-sm text-gray-400 mt-1">Essayez un autre mois ou une autre catégorie</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
