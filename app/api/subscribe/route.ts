import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Inscription aux alertes : enregistre l'adresse dans la table Supabase `subscribers`
 * (à créer avec pipeline/sql/2026-11-14_newsletter_et_historique.sql ; la règle RLS n'autorise
 * que l'ajout, jamais la lecture).
 */
export async function POST(request: Request) {
  let body: { email?: unknown; website?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  // Champ piège rempli = robot : on répond « ok » sans rien enregistrer.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Cette adresse e-mail ne semble pas valide.' }, { status: 400 });
  }
  const source = typeof body.source === 'string' ? body.source.slice(0, 40) : null;

  const { error } = await supabase.from('subscribers').insert({ email, source });
  if (error && error.code !== '23505') {
    // 23505 = adresse déjà inscrite : pour le visiteur, c'est un succès.
    console.error('subscribe:', error.code, error.message);
    return NextResponse.json({ error: 'Inscription momentanément indisponible. Merci de réessayer plus tard.' }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
