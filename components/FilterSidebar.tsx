'use client';
import { useState, useMemo } from 'react';
import DealCard from './DealCard';

const MOIS = ['Janvier','Fev.','Mars','Avril','Mai','Juin','Juillet','Aout','Sept.','Oct.','Nov.','Dec.'];
const DUREES = [
  { label: 'Tous', min: 0, max: 999 },
  { label: '2-3 jours', min: 2, max: 3 },
  { label: '4-7 jours', min: 4, max: 7 },
  { label: '8-14 jours', min: 8, max: 14 },
  { label: '15+ jours', min: 15, max: 999 },
];
const CATEGORIES = [
  { slug: 'all', label: 'Toutes' },
  { slug: 'vol', label: 'Vols' },
  { slug: 'vol-hotel', label: 'Hotels' },
  { slug: 'sejour', label: 'Sejours' },
  { slug: 'derniere-minute', label: 'Derniere minute' },
];

export default function FilterSidebar({ deals }: { deals: any[] }) {
  const [budgetMax, setBudgetMax] = useState(2000);
  const [mois, setMois] = useState<number | null>(null);
  const [duree, setDuree] = useState(0);
  const [categorie, setCategorie] = useState('all');
  const [scoreMin, setScoreMin] = useState(1);

  const filtered = useMemo(() => {
    return deals.filter((d) => {
      if (d.price > budgetMax) return false;
      if (mois !== null && d.month_departure !== mois + 1) return false;
      if (DUREES[duree].min > 0) {
        if (!d.duration_days) return false;
        if (d.duration_days < DUREES[duree].min || d.duration_days > DUREES[duree].max) return false;
      }
      if (categorie !== 'all' && d.category !== categorie) return false;
      if (d.deal_score && d.deal_score < scoreMin) return false;
      return true;
    });
  }, [deals, budgetMax, mois, duree, categorie, scoreMin]);

  return (
    <div className="flex gap-6 w-full">
      <aside className="w-64 shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sticky top-20">
          <h3 className="font-black text-gray-800 text-lg mb-5">Filtres</h3>
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 mb-2">Budget max -- {budgetMax}EUR</label>
            <input type="range" min={50} max={3000} step={50} value={budgetMax} onChange={(e) => setBudgetMax(parseInt(e.target.value))} className="w-full accent-purple-600" />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>50EUR</span><span>3000EUR</span></div>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 mb-2">Mois de depart</label>
            <div className="grid grid-cols-3 gap-1">
              {MOIS.map((m, i) => (
                <button key={i} onClick={() => setMois(mois === i ? null : i)} className={`text-xs py-1 px-1 rounded-lg border transition-all ${mois === i ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-400'}`}>
                  {m.slice(0,3)}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 mb-2">Duree</label>
            <div className="space-y-1">
              {DUREES.map((d, i) => (
                <button key={i} onClick={() => setDuree(i)} className={`w-full text-left text-xs py-1.5 px-3 rounded-lg border transition-all ${duree === i ? 'bg-purple-700 text-white border-purple-700' : 'border-gray-200 text-gray-600 hover:border-purple-400'}`}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 mb-2">Categorie</label>
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
          <button onClick={() => { setBudgetMax(2000); setMois(null); setDuree(0); setCategorie('all'); setScoreMin(1); }} className="w-full text-xs text-purple-600 hover:text-purple-800 font-semibold py-2 border border-purple-200 rounded-xl hover:bg-purple-50 transition-all">
            Reinitialiser les filtres
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-black text-[#2C3E50]">Derniers deals</h2>
          <span className="text-sm text-gray-500">{filtered.length} deal{filtered.length > 1 ? 's' : ''} trouve{filtered.length > 1 ? 's' : ''}</span>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <p className="text-4xl mb-3">OK</p>
            <p className="text-lg font-semibold text-gray-600">Aucun deal pour ces criteres</p>
            <p className="text-sm text-gray-400 mt-1">Essayez un budget plus eleve ou d autres filtres</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

