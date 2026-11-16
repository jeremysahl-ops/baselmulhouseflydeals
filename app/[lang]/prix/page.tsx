import type { Metadata } from 'next';
import Link from 'next/link';
import ComboExplorer from '@/components/ComboExplorer';
import { tousLesCombos } from '@/lib/prix';
import { alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 3600;

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const dict = getDict(lang);
  return {
    title: dict.prixPage.metaTitle(dict.place.city),
    description: dict.prixPage.metaDescription(dict.place.city),
    alternates: alternatesFor(lang, '/prix'),
  };
}

export default async function PrixPage({ params }: Props) {
  const lang = await langParam(params);
  const dict = getDict(lang);
  const t = dict.prixPage;
  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{t.crumb}</span>
      </nav>
      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
        <p className="mt-3 text-ink-soft">{t.lead}</p>
      </header>
      <ComboExplorer combos={tousLesCombos()} lang={lang} />
    </div>
  );
}
