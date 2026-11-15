import type { HotelPick } from '@/lib/hotel-picks';
import { destinationLabel, formatDay, formatPrice } from '@/lib/format';

/**
 * Bon plan hôtel repéré à la main chez l'hôtelier. Le lien mène au site de l'hôtel, sans commission ;
 * si l'hôtel est partenaire, la mention « Partenaire » et rel="sponsored" ne sont pas optionnels.
 */
export default function HotelPickCard({ pick, showDestination = false }: { pick: HotelPick; showDestination?: boolean }) {
  const stars = pick.stars && pick.stars >= 1 && pick.stars <= 5 ? Math.round(pick.stars) : null;
  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-saving-soft px-2 py-0.5 font-semibold uppercase tracking-wider text-saving">Bon plan hôtel</span>
          {pick.partner && (
            <span className="rounded bg-brand-soft px-2 py-0.5 font-semibold uppercase tracking-wider text-brand">Partenaire</span>
          )}
          {showDestination && <span className="font-medium text-ink-soft">{destinationLabel(pick.destination)}</span>}
        </p>
        <p className="mt-2 font-semibold text-ink">
          {pick.name}
          {stars && (
            <span className="ml-2 text-sm font-normal text-ink-muted" aria-label={`${stars} étoiles`}>
              {'★'.repeat(stars)}
            </span>
          )}
        </p>
        {pick.area && <p className="mt-0.5 text-sm text-ink-muted">{pick.area}</p>}
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{pick.offer}</p>
        <p className="mt-2 text-xs text-ink-muted">
          {pick.stayFrom && pick.stayTo && <>Séjours du {formatDay(pick.stayFrom)} au {formatDay(pick.stayTo)}. </>}
          Prix vérifié sur le site de l&apos;hôtel le {formatDay(pick.checkedOn)} ; il peut avoir changé.
        </p>
      </div>
      <div className="shrink-0 sm:text-right">
        {pick.pricePerNight != null && (
          <p className="mb-3">
            <span className="text-2xl font-bold tracking-tight text-ink">{formatPrice(pick.pricePerNight)}</span>
            <span className="ml-1 text-sm text-ink-muted">la nuit pour 2</span>
          </p>
        )}
        <a
          href={pick.url}
          target="_blank"
          rel={pick.partner ? 'sponsored noopener' : 'nofollow noopener'}
          className="btn-secondary w-full sm:w-auto"
        >
          Voir sur le site de l&apos;hôtel
        </a>
      </div>
    </div>
  );
}
