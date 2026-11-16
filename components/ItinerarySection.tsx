import Link from 'next/link';
import type { DayPlan, Itinerary } from '@/lib/itineraries';
import { getDict, type Lang } from '@/lib/i18n';

/** Liste des journées (J1, J2…), commune aux pages de deal et aux pages guides. */
export function ItineraryDays({ days, lang }: { days: DayPlan[]; lang: Lang }) {
  const t = getDict(lang).itinerary;
  return (
    <ol className="card divide-y divide-line px-5">
      {days.map((day, i) => (
        <li key={day.title} className="flex gap-4 py-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
            {t.dayBadge(i + 1)}
          </span>
          <div>
            <h3 className="font-semibold text-ink">{day.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{day.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Programme d'activités jour par jour, adapté au nombre de nuits du deal. */
export default function ItinerarySection({
  label,
  itinerary,
  lang,
  guideHref,
}: {
  label: string;
  itinerary: Itinerary;
  lang: Lang;
  /** Adresse de la page guide de la destination. */
  guideHref?: string;
}) {
  const t = getDict(lang).itinerary;
  const { days, nights, spare } = itinerary;
  return (
    <section className="mt-8" aria-label={t.aria}>
      <h2 className="text-lg font-bold text-ink">{t.heading(label, nights)}</h2>
      <p className="mb-4 mt-1 text-sm text-ink-muted">{t.intro}</p>
      <ItineraryDays days={days} lang={lang} />
      {spare > 0 && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{t.spare(nights, spare)}</p>}
      <p className="mt-3 text-xs text-ink-muted">{t.note}</p>
      {guideHref && (
        <p className="mt-3 text-sm">
          <Link href={guideHref} className="font-semibold text-brand underline underline-offset-4">
            {t.fullGuide(label)}
          </Link>
        </p>
      )}
    </section>
  );
}
