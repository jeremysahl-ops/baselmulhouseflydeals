import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDealsByCategory, getUpcomingDeals } from '@/lib/supabase';
import DealExplorer from '@/components/DealExplorer';
import { SECTIONS, getSection } from '@/lib/site';
import { LOCALES, alternatesFor, getDict, isLang, localePath } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

export const revalidate = 600;

interface Props {
  params: Promise<{ lang: string; category: string }>;
}

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => SECTIONS.map((s) => ({ lang, category: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, category } = await params;
  const section = getSection(category);
  if (!section || !isLang(lang)) return {};
  const dict = getDict(lang);
  const text = dict.sections[section.slug];
  return {
    title: dict.sectionPage.metaTitle(text.title, dict.place.city),
    description: text.intro,
    alternates: alternatesFor(lang, `/${section.slug}`),
  };
}

export default async function SectionPage({ params }: Props) {
  const lang = await langParam(params);
  const { category } = await params;
  const section = getSection(category);
  if (!section) notFound();

  const dict = getDict(lang);
  const text = dict.sections[section.slug];
  const upcoming = section.slug === 'derniere-minute';
  const deals = upcoming ? await getUpcomingDeals(30) : await getDealsByCategory(section.slug);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label={dict.common.breadcrumb}>
        <Link href={localePath(lang, '/')} className="hover:text-ink">{dict.common.home}</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{text.label}</span>
      </nav>

      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">{dict.sectionPage.eyebrow(dict.place.city, text.hint)}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{text.title}</h1>
        <p className="mt-3 text-ink-soft">{text.intro}</p>
      </header>

      <DealExplorer deals={deals} lang={lang} defaultSort={upcoming ? 'date' : 'remise'} />
    </div>
  );
}
