import Link from 'next/link';
import { Deal } from '@/types/deal';
import DealVisual from '@/components/DealVisual';
import { airlineName, destinationCountry, destinationLabel, formatDay, formatPrice, nightsLabel, saving } from '@/lib/format';

export default function DealCard({ deal, priority = false }: { deal: Deal; priority?: boolean }) {
  const label = destinationLabel(deal.destination);
  const country = destinationCountry(deal.destination);
  const save = saving(deal);
  const airline = airlineName(deal.airline);
  const stay = nightsLabel(deal);

  return (
    <Link href={`/deal/${deal.id}`} className="group block h-full">
      <article className="card flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-lift">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
            <DealVisual destination={deal.destination} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} />
          </div>
          {save && (
            <span className="absolute right-3 top-3 rounded-md bg-saving px-2 py-1 text-sm font-bold text-white shadow-sm">
              −{save.percent} %
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-bold leading-tight text-ink">
            {label}
            {country && <span className="ml-2 text-sm font-medium text-ink-muted">{country}</span>}
          </h3>

          {deal.departure_date && (
            <p className="mt-1.5 text-sm text-ink-soft">
              {formatDay(deal.departure_date)} → {formatDay(deal.return_date)}
              {stay && <span className="text-ink-muted"> · {stay}</span>}
            </p>
          )}
          <p className="mt-0.5 text-sm text-ink-muted">Vol direct{airline ? ` · ${airline}` : ''}</p>

          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              {save && (
                <p className="text-xs text-ink-muted">
                  Prix habituel <span className="line-through">{formatPrice(save.reference)}</span>
                </p>
              )}
              <p className="text-2xl font-bold leading-none text-ink">
                {formatPrice(deal.price)}
                <span className="ml-1.5 text-xs font-medium text-ink-muted">aller-retour</span>
              </p>
            </div>
            <span className="text-sm font-semibold text-action group-hover:underline">Voir le deal</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
