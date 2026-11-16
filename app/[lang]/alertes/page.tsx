import { redirect } from 'next/navigation';
import { localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

// Les alertes par e-mail ont été retirées (décision du 16/11/2026) : l'ancienne adresse renvoie vers l'accueil.
export default async function AlertesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = await langParam(params);
  redirect(localePath(lang, '/'));
}
