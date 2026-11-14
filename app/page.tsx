import Link from 'next/link';
import { getDeals } from '@/lib/supabase';
import DealExplorer from '@/components/DealExplorer';
import NewsletterForm from '@/components/NewsletterForm';
import PartnerCard from '@/components/PartnerCard';
import { partnersForHome } from '@/lib/partners';
import { formatPrice, formatStamp, saving } from '@/lib/format';
import { SECTIONS, SITE } from '@/lib/site';

export const revalidate = 600;

const STEPS = [
  {
    title: 'Nous relevons les prix',
    text: 'Deux fois par semaine, notre outil relève les prix des vols directs aller-retour vers une cinquantaine de destinations, sur les neuf mois à venir.',
  },
  {
    title: 'Nous les comparons au prix habituel',
    text: `Chaque prix est comparé au tarif habituel de la destination pour la saison. Nous ne gardons que les vols au moins ${SITE.minDiscount} % moins chers.`,
  },
  {
    title: 'Vous réservez chez notre partenaire',
    text: `Un clic ouvre la recherche sur ${SITE.bookingPartner}, déjà remplie avec les bonnes dates. Vous y vérifiez le prix du jour avant de réserver.`,
  },
];

const FAQ = [
  {
    q: 'Les prix affichés sont-ils garantis ?',
    a: "Non. Ce sont des prix constatés à la date indiquée sur chaque deal. Les tarifs aériens changent plusieurs fois par jour : le prix final est celui affiché par le site de réservation au moment où vous payez.",
  },
  {
    q: 'Que comprend le prix ?',
    a: "Le vol aller-retour pour une personne, taxes comprises, généralement avec un petit bagage cabine. Le bagage en soute, le choix du siège et parfois le bagage cabine standard sont en supplément selon la compagnie.",
  },
  {
    q: 'Comment le site est-il financé ?',
    a: "Par l'affiliation : si vous réservez après avoir cliqué sur un de nos liens, notre partenaire peut nous reverser une commission. Cela ne change pas le prix que vous payez et n'influence pas notre sélection, qui repose uniquement sur l'écart avec le prix habituel.",
  },
  {
    q: "D'où partent les vols ?",
    a: "De l'EuroAirport Bâle-Mulhouse-Fribourg (codes BSL, MLH et EAP), situé à Saint-Louis, accessible depuis l'Alsace, la région de Bâle et le sud du pays de Bade.",
  },
];

export default async function HomePage() {
  const deals = await getDeals();
  const partners = partnersForHome();
  const best = deals.reduce((max, d) => Math.max(max, saving(d)?.percent ?? 0), 0);
  const cheapest = deals.reduce((min, d) => Math.min(min, d.price), Infinity);
  const updated = deals.reduce((latest, d) => (d.created_at > latest ? d.created_at : latest), '');

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };

  return (
    <>
      <section className="bg-brand text-white">
        <div className="container-page grid gap-10 py-14 md:py-20 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">{SITE.tagline}</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
              Les vols directs à prix réellement bas, au départ de Bâle-Mulhouse
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
              Nous comparons chaque vol au prix habituel de sa destination et ne publions que ceux qui sont au moins{' '}
              {SITE.minDiscount} % moins chers. Pas de fausses promotions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#deals" className="btn-primary">Voir les deals du moment</a>
              <Link href="/comment-ca-marche" className="btn-secondary !border-white/25 !bg-transparent !text-white hover:!border-white/60">
                Notre méthode
              </Link>
            </div>
          </div>

          {deals.length > 0 && (
            <dl className="grid grid-cols-3 divide-x divide-white/10 rounded-xl border border-white/10 bg-white/5 text-center lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:text-left">
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">Deals en ligne</dt>
                <dd className="mt-1 text-3xl font-bold">{deals.length}</dd>
              </div>
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">Meilleure remise</dt>
                <dd className="mt-1 text-3xl font-bold">{best > 0 ? `−${best} %` : 'n. c.'}</dd>
              </div>
              <div className="px-4 py-5 lg:px-6">
                <dt className="text-xs font-medium uppercase tracking-wider text-white/55">Aller-retour dès</dt>
                <dd className="mt-1 text-3xl font-bold">{formatPrice(cheapest)}</dd>
              </div>
            </dl>
          )}
        </div>
      </section>

      <section id="deals" className="container-page scroll-mt-20 py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Les deals du moment</h2>
            {updated && <p className="mt-1 text-sm text-ink-muted">Dernier relevé de prix : {formatStamp(updated)}</p>}
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-1 text-sm font-medium" aria-label="Rubriques">
            {SECTIONS.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="text-brand underline-offset-4 hover:underline">
                {s.label}
              </Link>
            ))}
          </nav>
        </div>
        <DealExplorer deals={deals} />
        {partners.length > 0 && (
          <div className="mt-10 space-y-4" aria-label="Partenaires">
            {partners.map((p) => (
              <PartnerCard key={p.name} partner={p} />
            ))}
          </div>
        )}
      </section>

      <section className="border-y border-line bg-white">
        <div className="container-page py-14">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Comment nous sélectionnons les deals</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">{i + 1}</span>
                <h3 className="mt-4 font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-8 rounded-2xl bg-brand px-6 py-10 text-white sm:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Recevez les deals avant qu&apos;ils disparaissent</h2>
            <p className="mt-3 max-w-md text-white/70">
              Les meilleurs prix durent rarement plus de quelques jours. Nous vous écrivons uniquement quand de vrais bons
              prix apparaissent au départ de Bâle-Mulhouse.
            </p>
          </div>
          <NewsletterForm source="accueil" tone="dark" />
        </div>
      </section>

      <section className="container-page pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-ink">Questions fréquentes</h2>
        <div className="mt-6 divide-y divide-line rounded-xl border border-line bg-white">
          {FAQ.map(({ q, a }) => (
            <details key={q} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                {q}
                <span className="text-ink-muted transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-soft">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
