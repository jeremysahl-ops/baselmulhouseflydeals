export type DealCategory =
  | 'vol'
  | 'vol-hotel'
  | 'city-trip'
  | 'sejour'
  | 'derniere-minute';

export interface Deal {
  id: string;
  category: DealCategory;
  title: string;
  price: number;
  dates?: string | null;
  company?: string | null;
  airline?: string | null;
  destination: string;
  departure_city?: string | null;
  departure_date?: string | null;
  return_date?: string | null;
  duration_days?: number | null;
  link?: string | null;
  deal_url?: string | null;
  insider_tip?: string | null;
  image_url?: string | null;
  deal_score?: number | null;
  score_ai?: number | null;
  score_final?: number | null;
  discount_percentage?: number | null;
  is_active?: boolean;
  status?: string;
  source?: string;
  created_at: string;
}

export const CATEGORY_LABELS: Record<DealCategory, string> = {
  'vol': 'Vol ✈️',
  'vol-hotel': 'Vol + Hôtel 🏨',
  'city-trip': 'City Trip 🌆',
  'sejour': 'Séjour 🌴',
  'derniere-minute': 'Dernière Minute ⚡',
};

export const CATEGORY_SLUGS: Record<string, DealCategory> = {
  vol: 'vol',
  'vol-hotel': 'vol-hotel',
  'city-trip': 'city-trip',
  sejour: 'sejour',
  'derniere-minute': 'derniere-minute',
};