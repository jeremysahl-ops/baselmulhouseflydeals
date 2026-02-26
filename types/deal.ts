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
  dates: string;
  company: string;
  destination: string;
  link: string;
  insider_tip: string | null;
  image_url?: string | null;
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
