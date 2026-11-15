import type { Itinerary } from '@/lib/itineraries';

/** Programme d'activités jour par jour, adapté au nombre de nuits du deal. */
export default function ItinerarySection({ label, itinerary }: { label: string; itinerary: Itinerary }) {
  const { days, nights, spare } = itinerary;
  return (
    <section className="mt-8" aria-label="Programme d'activités">
      <h2 className="text-lg font-bold text-ink">
        Que faire à {label} en {nights} nuit{nights > 1 ? 's' : ''} ?
      </h2>
      <p className="mt-1 text-sm text-ink-muted">
        Une idée de programme, jour par jour, pour la durée de ce séjour. À adapter à vos envies et à la météo.
      </p>
      <ol className="card mt-4 divide-y divide-line px-5">
        {days.map((day, i) => (
          <li key={day.title} className="flex gap-4 py-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-bold text-brand">
              J{i + 1}
            </span>
            <div>
              <h3 className="font-semibold text-ink">{day.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">{day.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {spare > 0 && (
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Avec {nights} nuits sur place, il vous reste {spare} jour{spare > 1 ? 's' : ''} libre{spare > 1 ? 's' : ''} : de quoi
          ralentir, retourner dans votre endroit préféré ou partir deux jours explorer la région.
        </p>
      )}
      <p className="mt-3 text-xs text-ink-muted">
        Suggestions indicatives : vérifiez les horaires, les jours de fermeture et les réservations obligatoires avant de partir.
      </p>
    </section>
  );
}
