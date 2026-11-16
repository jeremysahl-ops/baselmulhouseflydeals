import Link from 'next/link';
import { Deal } from '@/types/deal';
import DealVisual from '@/components/DealVisual';
import { airlineName, destinationCountry, destinationLabel, formatDay, formatPrice, nights } from '@/lib/format';
import { getDict, localePath, type Lang } from '@/lib/i18n';

export default function DealCard({ deal, lang, priority = false }: { deal: Deal; lang: Lang; priority?: boolean }) {
  const t = getDict(lang);
  const label = destinationLabel(deal.destination, lang);
  const country = destinationCountry(deal.destination, lang);
  const airline = airlineName(deal.airline);
  const n = nights(deal);
  const stay = n ? t.card.nights(n) : null;

  return (
    <Link href={localePath(lang, `/deal/${deal.id}`)} className="group block h-full">
      <article className="card flex h-full flex-col overflow-hidden transition-shadow group-hover:shadow-lift">
        <div className="relative aspect-[16/10] overflow-hidden bg-brand-soft">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
            <DealVisual destination={deal.destination} lang={lang} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-lg font-bold leading-tight text-ink">
            {label}
            {country && <span className="ml-2 text-sm font-medium text-ink-muted">{country}</span>}
          </h3>

          {deal.departure_date && (
            <p className="mt-1.5 text-sm text-ink-soft">
              {formatDay(deal.departure_date, lang)} → {formatDay(deal.return_date, lang)}
              {stay && <span className="text-ink-muted"> · {stay}</span>}
            </p>
          )}
          <p className="mt-0.5 text-sm text-ink-muted">{t.card.direct}{airline ? ` · ${airline}` : ''}</p>

          <div className="mt-auto flex items-end justify-between pt-4">
            <div>
              <p className="text-2xl font-bold leading-none text-ink">
                {formatPrice(deal.price, lang)}
                <span className="ml-1.5 text-xs font-medium text-ink-muted">{t.card.roundTrip}</span>
              </p>
            </div>
            <span className="text-sm font-semibold text-action group-hover:underline">{t.card.seeDeal}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
