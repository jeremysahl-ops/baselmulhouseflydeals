import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDealsByCategory, getUpcomingDeals } from '@/lib/supabase';
import DealExplorer from '@/components/DealExplorer';
import { SECTIONS, getSection } from '@/lib/site';

export const revalidate = 600;

interface Props {
  params: Promise<{ category: string }>;
}

const INTRO: Record<string, string> = {
  'city-trip': 'Des vols directs pour partir 2 à 4 nuits : idéal pour un week-end prolongé en Europe.',
  vol: 'Des vols directs pour rester 5 à 8 nuits sur place, le format classique des vacances.',
  sejour: 'Des vols directs pour des séjours de 10 à 15 nuits, quand on veut vraiment couper.',
  'derniere-minute': 'Les deals dont le départ a lieu dans les 30 prochains jours, du plus proche au plus lointain.',
};

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ category: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const section = getSection(category);
  if (!section) return {};
  return {
    title: `${section.title} au départ de Bâle-Mulhouse`,
    description: INTRO[section.slug],
    alternates: { canonical: `/${section.slug}` },
  };
}

export default async function SectionPage({ params }: Props) {
  const { category } = await params;
  const section = getSection(category);
  if (!section) notFound();

  const upcoming = section.slug === 'derniere-minute';
  const deals = upcoming ? await getUpcomingDeals(30) : await getDealsByCategory(section.slug);

  return (
    <div className="container-page py-10">
      <nav className="text-sm text-ink-muted" aria-label="Fil d'Ariane">
        <Link href="/" className="hover:text-ink">Accueil</Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-ink-soft">{section.label}</span>
      </nav>

      <header className="mb-8 mt-4 max-w-2xl">
        <p className="eyebrow">Au départ de Bâle-Mulhouse · {section.hint}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{section.title}</h1>
        <p className="mt-3 text-ink-soft">{INTRO[section.slug]}</p>
      </header>

      <DealExplorer deals={deals} defaultSort={upcoming ? 'date' : 'remise'} />
    </div>
  );
}
