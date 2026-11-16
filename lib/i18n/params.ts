import { notFound } from 'next/navigation';
import { isLang, type Lang } from './config';

/** Langue de la page, lue dans l'adresse (/[lang]/…). Une valeur inconnue donne une page 404. */
export async function langParam(params: Promise<{ lang: string }>): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}
