import { createClient } from '@supabase/supabase-js';
import { Deal } from '@/types/deal';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // clé « publishable » (lecture seule via RLS)

export const supabase = createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } });

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Deals affichables : actifs et dont le départ n'est pas passé, meilleure remise d'abord. */
function activeDeals() {
  return supabase
    .from('deals')
    .select('*')
    .eq('is_active', true)
    .gte('departure_date', today())
    .order('discount_percentage', { ascending: false, nullsFirst: false })
    .order('price', { ascending: true });
}

async function run(label: string, query: PromiseLike<{ data: Deal[] | null; error: { message: string } | null }>): Promise<Deal[]> {
  const { data, error } = await query;
  if (error) {
    console.error(`Supabase ${label}:`, error.message);
    return [];
  }
  return data ?? [];
}

export function getDeals(limit = 60): Promise<Deal[]> {
  return run('getDeals', activeDeals().limit(limit));
}

export function getDealsByCategory(category: string, limit = 60): Promise<Deal[]> {
  return run('getDealsByCategory', activeDeals().eq('category', category).limit(limit));
}

export function getDealsByDestination(destination: string, limit = 12): Promise<Deal[]> {
  return run('getDealsByDestination', activeDeals().eq('destination', destination).limit(limit));
}

/** Départs dans les `days` prochains jours, les plus proches d'abord. */
export function getUpcomingDeals(days = 30, limit = 60): Promise<Deal[]> {
  const until = new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
  return run(
    'getUpcomingDeals',
    supabase
      .from('deals')
      .select('*')
      .eq('is_active', true)
      .gte('departure_date', today())
      .lte('departure_date', until)
      .order('departure_date', { ascending: true })
      .limit(limit),
  );
}

export async function getDealById(id: string): Promise<Deal | null> {
  // Un identifiant mal formé ferait échouer la requête (colonne uuid) : on répond « introuvable ».
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return null;
  const { data, error } = await supabase.from('deals').select('*').eq('id', id).maybeSingle();
  if (error) {
    console.error('Supabase getDealById:', error.message);
    return null;
  }
  return data;
}

export async function getAllDealIds(): Promise<string[]> {
  const { data, error } = await supabase.from('deals').select('id').eq('is_active', true).gte('departure_date', today());
  if (error) return [];
  return (data ?? []).map((d) => d.id);
}
