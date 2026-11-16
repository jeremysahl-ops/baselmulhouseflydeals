import type { HotelPick } from '@/lib/hotel-picks';
import { destinationLabel, formatDay, formatPrice } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

/**
 * Bon plan hôtel repéré à la main chez l'hôtelier. Le lien mène au site de l'hôtel, sans commission ;
 * si l'hôtel est partenaire, la mention « Partenaire » et rel="sponsored" ne sont pas optionnels.
 */
export default function HotelPickCard({ pick, lang, showDestination = false }: { pick: HotelPick; lang: Lang; showDestination?: boolean }) {
  const dict = getDict(lang);
  const t = dict.hotelPick;
  const stars = pick.stars && pick.stars >= 1 && pick.stars <= 5 ? Math.round(pick.stars) : null;
  return (
    <div className="card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-saving-soft px-2 py-0.5 font-semibold uppercase tracking-wider text-saving">{t.badge}</span>
          {pick.partner && (
            <span className="rounded bg-brand-soft px-2 py-0.5 font-semibold uppercase tracking-wider text-brand">{dict.common.partnerBadge}</span>
          )}
          {showDestination && <span className="font-medium text-ink-soft">{destinationLabel(pick.destination, lang)}</span>}
        </p>
        <p className="mt-2 font-semibold text-ink">
          {pick.name}
          {stars && (
            <span className="ml-2 text-sm font-normal text-ink-muted" aria-label={t.stars(stars)}>
              {'★'.repeat(stars)}
            </span>
          )}
        </p>
        {pick.area && <p className="mt-0.5 text-sm text-ink-muted">{pick.area}</p>}
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{pick.offer}</p>
        <p className="mt-2 text-xs text-ink-muted">
          {pick.stayFrom && pick.stayTo && <>{t.stayDates(formatDay(pick.stayFrom, lang), formatDay(pick.stayTo, lang))} </>}
          {t.checked(formatDay(pick.checkedOn, lang))}
        </p>
      </div>
      <div className="shrink-0 sm:text-right">
        {pick.pricePerNight != null && (
          <p className="mb-3">
            <span className="text-2xl font-bold tracking-tight text-ink">{formatPrice(pick.pricePerNight, lang)}</span>
            <span className="ml-1 text-sm text-ink-muted">{t.perNight}</span>
          </p>
        )}
        <a
          href={pick.url}
          target="_blank"
          rel={pick.partner ? 'sponsored noopener' : 'nofollow noopener'}
          className="btn-secondary w-full sm:w-auto"
        >
          {t.button}
        </a>
      </div>
    </div>
  );
}
