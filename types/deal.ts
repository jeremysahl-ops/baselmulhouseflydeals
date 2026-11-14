// Reflète les colonnes de la table Supabase `deals` utilisées par le site.
export type DealCategory = 'vol' | 'vol-hotel' | 'city-trip' | 'sejour' | 'derniere-minute';

export interface Deal {
  id: string;
  category: DealCategory;
  title: string;
  description?: string | null;
  price: number;
  /** Prix habituel de la destination pour la saison (référence de la remise). */
  original_price?: number | null;
  price_average_estimated?: number | null;
  discount_percentage?: number | null;
  destination: string;
  departure_city?: string | null;
  departure_date?: string | null;
  return_date?: string | null;
  duration_days?: number | null;
  month_departure?: number | null;
  airline?: string | null;
  deal_url?: string | null;
  insider_tip?: string | null;
  image_url?: string | null;
  deal_score?: number | null;
  is_active?: boolean;
  status?: string;
  source?: string;
  expires_at?: string | null;
  created_at: string;
}
