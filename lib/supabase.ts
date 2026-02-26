import { createClient } from '@supabase/supabase-js';
import { Deal } from '@/types/deal';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Deals ────────────────────────────────────────────────────────────────────

export async function getDeals(limit = 12): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase getDeals error:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getDealsByCategory(
  category: string,
  limit = 24
): Promise<Deal[]> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Supabase getDealsByCategory error:', error.message);
    return [];
  }
  return data ?? [];
}

export async function getDealById(id: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Supabase getDealById error:', error.message);
    return null;
  }
  return data;
}

export async function getAllDealIds(): Promise<string[]> {
  const { data, error } = await supabase.from('deals').select('id');
  if (error) return [];
  return (data ?? []).map((d) => d.id);
}
