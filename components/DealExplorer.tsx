'use client';

import { useMemo, useState } from 'react';
import { Deal } from '@/types/deal';
import DealCard from '@/components/DealCard';
import { formatMonth, saving } from '@/lib/format';

type Sort = 'remise' | 'prix' | 'date';

const BUDGETS = [50, 75, 100, 150];
const SORTS: { value: Sort; label: string }[] = [
  { value: 'remise', label: 'Meilleure remise' },
  { value: 'prix', label: 'Prix croissant' },
  { value: 'date', label: 'Départ le plus proche' },
];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-ink-soft hover:border-ink-muted'
      }`}
    >
      {children}
    </button>
  );
}

/** Grille de deals avec filtres (mois de départ, budget) et tri. Tout se passe dans le navigateur. */
export default function DealExplorer({ deals, defaultSort = 'remise' }: { deals: Deal[]; defaultSort?: Sort }) {
  const [month, setMonth] = useState<string | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>(defaultSort);

  const months = useMemo(
    () => Array.from(new Set(deals.map((d) => d.departure_date?.slice(0, 7)).filter((m): m is string => !!m))).sort(),
    [deals],
  );
  const budgets = useMemo(() => BUDGETS.filter((b) => deals.some((d) => d.price <= b) && deals.some((d) => d.price > b)), [deals]);

  const shown = useMemo(() => {
    const list = deals.filter(
      (d) => (!month || d.departure_date?.startsWith(month)) && (!budget || d.price <= budget),
    );
    const by: Record<Sort, (a: Deal, b: Deal) => number> = {
      remise: (a, b) => (saving(b)?.percent ?? 0) - (saving(a)?.percent ?? 0) || a.price - b.price,
      prix: (a, b) => a.price - b.price,
      date: (a, b) => (a.departure_date ?? '').localeCompare(b.departure_date ?? ''),
    };
    return [...list].sort(by[sort]);
  }, [deals, month, budget, sort]);

  if (deals.length === 0) {
    return (
      <div className="card px-6 py-14 text-center">
        <p className="text-lg font-semibold text-ink">Aucun deal dans cette rubrique pour le moment</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
          Nous ne publions que les prix réellement bas. Les vols sont vérifiés deux fois par semaine : revenez bientôt ou
          recevez les prochains deals par e-mail.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          {months.length > 1 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Mois de départ">
              <Chip active={!month} onClick={() => setMonth(null)}>Tous les mois</Chip>
              {months.map((m) => (
                <Chip key={m} active={month === m} onClick={() => setMonth(month === m ? null : m)}>
                  {formatMonth(m)}
                </Chip>
              ))}
            </div>
          )}
          {budgets.length > 0 && (
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Budget maximum">
              <Chip active={!budget} onClick={() => setBudget(null)}>Tous les budgets</Chip>
              {budgets.map((b) => (
                <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? null : b)}>
                  Jusqu&apos;à {b} €
                </Chip>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <span className="whitespace-nowrap">Trier par</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-ink"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <p className="mb-4 text-sm text-ink-muted" aria-live="polite">
        {shown.length} deal{shown.length > 1 ? 's' : ''}
        {shown.length !== deals.length ? ` sur ${deals.length}` : ''}
      </p>

      {shown.length === 0 ? (
        <div className="card px-6 py-12 text-center">
          <p className="font-semibold text-ink">Aucun deal ne correspond à ces filtres</p>
          <button type="button" onClick={() => { setMonth(null); setBudget(null); }} className="mt-3 text-sm font-semibold text-action hover:underline">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((deal, i) => (
            <DealCard key={deal.id} deal={deal} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
