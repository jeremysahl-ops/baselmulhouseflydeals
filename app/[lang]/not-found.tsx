'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DEFAULT_LANG, getDict, isLang, localePath } from '@/lib/i18n';

// Une page 404 ne reçoit pas la langue en paramètre : on la lit dans l'adresse (/de/…, /en/…, sinon français).
export default function NotFound() {
  const first = (usePathname() ?? '/').split('/')[1] ?? '';
  const lang = isLang(first) ? first : DEFAULT_LANG;
  const t = getDict(lang).notFound;
  return (
    <div className="container-page py-24 text-center">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">{t.h1}</h1>
      <p className="mx-auto mt-3 max-w-md text-ink-soft">{t.text}</p>
      <Link href={localePath(lang, '/')} className="btn-primary mt-8">{t.button}</Link>
    </div>
  );
}
