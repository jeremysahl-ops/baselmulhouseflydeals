import { Deal } from '@/types/deal';
import { DESTINATIONS } from '@/lib/destinations';

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

export function destinationLabel(destination: string): string {
  return DESTINATIONS[destination]?.label ?? destination;
}

export function destinationCountry(destination: string): string | null {
  return DESTINATIONS[destination]?.country ?? null;
}

/** Photo de la destination (Unsplash, largeur demandée), ou null : la carte affiche alors un visuel typographique. */
export function destinationPhoto(destination: string, width = 800): string | null {
  const id = DESTINATIONS[destination]?.photo;
  return id ? `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70` : null;
}

export function formatPrice(value: number): string {
  return `${Math.round(value)} €`;
}

// Les dates en base sont des jours civils (AAAA-MM-JJ) : on les lit en UTC pour ne jamais décaler d'un jour.
function parseDay(day: string): Date {
  return new Date(`${day.slice(0, 10)}T00:00:00Z`);
}

const DAY = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });
const DAY_LONG = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const MONTH = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const STAMP = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', timeZone: 'Europe/Paris' });

export function formatDay(day?: string | null): string {
  return day ? DAY.format(parseDay(day)) : '';
}

export function formatDayLong(day?: string | null): string {
  return day ? DAY_LONG.format(parseDay(day)) : '';
}

export function formatMonth(month: string): string {
  const label = MONTH.format(parseDay(`${month}-01`));
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatStamp(iso?: string | null): string {
  return iso ? STAMP.format(new Date(iso)) : '';
}

export function nights(deal: Deal): number | null {
  if (deal.duration_days) return deal.duration_days;
  if (!deal.departure_date || !deal.return_date) return null;
  return Math.round((parseDay(deal.return_date).getTime() - parseDay(deal.departure_date).getTime()) / 86_400_000);
}

export function nightsLabel(deal: Deal): string | null {
  const n = nights(deal);
  return n ? `${n} nuit${n > 1 ? 's' : ''}` : null;
}

/** Prix habituel et remise : uniquement si le robot les a fournis et qu'ils sont cohérents. */
export function saving(deal: Deal): { reference: number; percent: number; amount: number } | null {
  let reference = deal.original_price ?? deal.price_average_estimated ?? null;
  // Deals publiés avant la v2 du robot : seule la remise est stockée, on en déduit le prix habituel.
  const pct = deal.discount_percentage;
  if (!reference && pct && pct > 0 && pct < 100) reference = deal.price / (1 - pct / 100);
  if (!reference || reference <= deal.price) return null;
  const percent = Math.round(((reference - deal.price) / reference) * 100);
  return percent >= 1 ? { reference: Math.round(reference), percent, amount: Math.round(reference - deal.price) } : null;
}

export function daysUntil(day: string, from = new Date()): number {
  const today = Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), from.getUTCDate());
  return Math.round((parseDay(day).getTime() - today) / 86_400_000);
}
