// Tableau des départs : une ligne par combo aller-retour relevé, façon écran d’aéroport.
// Composant sans état, utilisable côté serveur comme dans la liste filtrable (ComboExplorer).
import Link from 'next/link';
import type { Combo } from '@/lib/prix';
import { airportCountry, airportName, airportSlug, lienVol, NOM_COMPAGNIE } from '@/lib/airports';
import { formatDay, formatPrice, formatStamp } from '@/lib/format';
import { getDict, localePath, type Lang } from '@/lib/i18n';


export default function Board({
  combos,
  lang,
  title,
  showDestination = true,
  showSeen = true,
  empty,
}: {
  combos: Combo[];
  lang: Lang;
  title?: string;
  showDestination?: boolean;
  showSeen?: boolean;
  empty?: string;
}) {
  const t = getDict(lang).board;
  const city = getDict(lang).place.city;
  return (
    <div className="board">
      <div className="board-head">
        <span>{title ?? t.head(city)}</span>
        <span aria-hidden="true" className="text-flap">BSL ✈</span>
      </div>
      {combos.length === 0 ? (
        <p className="px-5 py-8 text-sm text-board-dim">{empty ?? t.empty}</p>
      ) : (
        <ul>
          {combos.map((c) => {
            const label = airportName(c.code, lang);
            const from = formatDay(c.depart, lang);
            const to = formatDay(c.retour, lang);
            const price = formatPrice(c.prix, lang);
            return (
              <li key={`${c.code}-${c.depart}-${c.nuits}`} className="board-row">
                <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-4 py-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1.4fr)_auto] sm:px-5">
                  {showDestination ? (
                    <div className="min-w-0">
                      <Link
                        href={localePath(lang, `/vols/${airportSlug(c.code)}`)}
                        className="block truncate text-[15px] font-bold uppercase tracking-wide text-board-text hover:text-flap"
                      >
                        {label}
                      </Link>
                      <span className="block truncate text-[11px] uppercase tracking-wider text-board-dim">{airportCountry(c.code, lang)}</span>
                    </div>
                  ) : (
                    <div className="text-[13px] font-bold uppercase tracking-wide text-board-text">{t.nights(c.nuits)}</div>
                  )}
                  <div className="order-3 col-span-2 min-w-0 text-[13px] text-board-text sm:order-none sm:col-span-1">
                    <span className="whitespace-nowrap">{from}</span>
                    <span className="mx-1.5 text-board-dim" aria-hidden="true">→</span>
                    <span className="whitespace-nowrap">{to}</span>
                    {(showDestination || showSeen) && (
                      <span className="block text-[11px] text-board-dim">
                        {showDestination && t.nights(c.nuits)}
                        {showDestination && showSeen && ' · '}
                        {showSeen && t.seen(formatStamp(c.vuLe, lang))}
                      </span>
                    )}
                  </div>
                  <a
                    href={lienVol(c, lang)}
                    target="_blank"
                    rel="noopener nofollow"
                    aria-label={t.bookAria(label, from, to, price, NOM_COMPAGNIE[c.cie])}
                    className="group flex items-center gap-2 justify-self-end"
                  >
                    <span className="flap text-lg sm:text-xl">{price}</span>
                    <span className="hidden text-[11px] uppercase tracking-wider text-board-dim group-hover:text-flap sm:inline" aria-hidden="true">
                      {NOM_COMPAGNIE[c.cie]} ↗
                    </span>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
