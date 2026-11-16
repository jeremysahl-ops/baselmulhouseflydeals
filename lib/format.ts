import { Deal } from '@/types/deal';
import { DESTINATIONS } from '@/lib/destinations';
import { INTL_LOCALE, type Lang } from '@/lib/i18n/config';
import { localizedCountry, localizedLabel } from '@/lib/i18n/destinations';

const AIRLINES: Record<string, string> = {
  U2: 'easyJet', DS: 'easyJet', EC: 'easyJet', W6: 'Wizz Air', W4: 'Wizz Air', W9: 'Wizz Air',
  FR: 'Ryanair', VY: 'Vueling', PC: 'Pegasus', VF: 'AJet', TK: 'Turkish Airlines', XQ: 'SunExpress',
  D8: 'Norwegian', DY: 'Norwegian', DE: 'Condor', LH: 'Lufthansa', AF: 'Air France', KL: 'KLM',
  BA: 'British Airways', TO: 'Transavia', HV: 'Transavia', TP: 'TAP Air Portugal', IB: 'Iberia',
  AT: 'Royal Air Maroc', TU: 'Tunisair', BJ: 'Nouvelair', A3: 'Aegean', OS: 'Austrian', LX: 'Swiss',
  EW: 'Eurowings', V7: 'Volotea', JU: 'Air Serbia', EI: 'Aer Lingus', LS: 'Jet2', SK: 'SAS',
  LO: 'LOT', RO: 'Tarom', FB: 'Bulgaria Air', OU: 'Croatia Airlines', '3O': 'Air Arabia Maroc',
};

export function airlineName(code?: string | null): string | null {
  if (!code) return null;
  return AIRLINES[code.toUpperCase()] ?? null;
}

export function destinationLabel(destination: string, lang: Lang = 'fr'): string {
  return localizedLabel(destination, lang);
}

export function destinationCountry(destination: string, lang: Lang = 'fr'): string | null {
  return localizedCountry(destination, lang);
}

/** Photo de la destination (Unsplash, largeur demandée), ou null : la carte affiche alors un visuel typographique. */
export function destinationPhoto(destination: string, width = 800): string | null {
  const id = DESTINATIONS[destination]?.photo;
  return id ? `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70` : null;
}

export function formatPrice(value: number, lang: Lang = 'fr'): string {
  const n = Math.round(value);
  return lang === 'en' ? `€${n}` : `${n} €`;
}

// Les dates en base sont des jours civils (AAAA-MM-JJ) : on les lit en UTC pour ne jamais décaler d'un jour.
function parseDay(day: string): Date {
  return new Date(`${day.slice(0, 10)}T00:00:00Z`);
}

type Formats = { day: Intl.DateTimeFormat; dayLong: Intl.DateTimeFormat; month: Intl.DateTimeFormat; stamp: Intl.DateTimeFormat };
const FORMATS: Partial<Record<Lang, Formats>> = {};

function formats(lang: Lang): Formats {
  return (FORMATS[lang] ??= {
    day: new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' }),
    dayLong: new Intl.DateTimeFormat(INTL_LOCALE[lang], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
    month: new Intl.DateTimeFormat(INTL_LOCALE[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }),
    stamp: new Intl.DateTimeFormat(INTL_LOCALE[lang], { day: 'numeric', month: 'long', timeZone: 'Europe/Paris' }),
  });
}

export function formatDay(day?: string | null, lang: Lang = 'fr'): string {
  return day ? formats(lang).day.format(parseDay(day)) : '';
}

export function formatDayLong(day?: string | null, lang: Lang = 'fr'): string {
  return day ? formats(lang).dayLong.format(parseDay(day)) : '';
}

export function formatMonth(month: string, lang: Lang = 'fr'): string {
  const label = formats(lang).month.format(parseDay(`${month}-01`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatStamp(iso?: string | null, lang: Lang = 'fr'): string {
  return iso ? formats(lang).stamp.format(new Date(iso)) : '';
}

export function nights(deal: Deal): number | null {
  if (deal.duration_days) return deal.duration_days;
  if (!deal.departure_date || !deal.return_date) return null;
  return Math.round((parseDay(deal.return_date).getTime() - parseDay(deal.departure_date).getTime()) / 86_400_000);
}

export function daysUntil(day: string, from = new Date()): number {
  const today = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round((parseDay(day).getTime() - today) / 86_400_000);
}
