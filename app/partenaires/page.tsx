import type { Metadata } from 'next';
import Link from 'next/link';
import { getDeals } from '@/lib/supabase';
import { SITE } from '@/lib/site';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Devenir partenaire',
  description:
    "Hôtels, parkings, navettes, acteurs du tourisme : présentez votre établissement aux voyageurs qui partent de l'EuroAirport Bâle-Mulhouse-Fribourg.",
  alternates: { canonical: '/partenaires' },
};

const FORMATS = [
  {
    title: 'Partenaire local',
    text: "Parking, navette, hôtel proche de l'aéroport : votre encart apparaît sur l'accueil et sur chaque page de deal, au moment où le voyageur prépare son départ.",
  },
  {
    title: 'Partenaire destination',
    text: 'Hôtel, résidence ou activité sur place : votre encart apparaît sur les deals vers votre destination, à côté des dates et du prix du vol.',
  },
  {
    title: 'Mention dans les alertes',
    text: 'Une recommandation identifiée comme partenaire dans les alertes envoyées aux abonnés lorsque des deals vers votre destination sont publiés.',
  },
];

const RULES = [
  'Chaque encart porte la mention « Partenaire », visible et sans ambiguïté.',
  "Les partenariats n'influencent jamais la sélection des deals, qui dépend uniquement des prix constatés.",
  'Un seul partenaire par catégorie et par destination : pas de mise en concurrence sur la même page.',
  'Nous ne mettons en avant que des établissements que nous pourrions recommander à un proche.',
];

export default async function PartenairesPage() {
  const deals = await getDeals();
  const destinations = new Set(deals.map((d) => d.destination)).size;
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`Partenariat ${SITE.name}`)}`;

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Hôtels, parkings, tourisme</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Devenir partenaire de {SITE.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {SITE.name} s&apos;adresse aux voyageurs d&apos;Alsace, de la région de Bâle et du sud du pays de Bade qui
          partent de l&apos;{SITE.airport}. Ils viennent ici avec une intention précise : partir, bientôt, vers une
          destination donnée. C&apos;est le bon moment pour leur présenter votre établissement.
        </p>

        {deals.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 divide-x divide-line rounded-xl border border-line bg-white text-center">
            <div className="px-4 py-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">Deals en ligne aujourd&apos;hui</dt>
              <dd className="mt-1 text-3xl font-bold text-ink">{deals.length}</dd>
            </div>
            <div className="px-4 py-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">Destinations concernées</dt>
              <dd className="mt-1 text-3xl font-bold text-ink">{destinations}</dd>
            </div>
          </dl>
        )}

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">Ce que nous proposons</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {FORMATS.map((f) => (
            <li key={f.title} className="card p-5">
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">
          Les conditions se discutent au cas par cas : tarif fixe, commission ou échange de visibilité. Les chiffres de
          fréquentation du site sont communiqués sur simple demande.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">Nos règles</h2>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
          {RULES.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-action" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-brand px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight">Parlons-en</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Écrivez-nous en quelques lignes : votre établissement, votre ville, ce que vous aimeriez mettre en avant.
            Nous répondons à chaque message.
          </p>
          <a href={mailto} className="btn-primary mt-6">Écrire à {SITE.contactEmail}</a>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          Pour comprendre comment les deals sont choisis :{' '}
          <Link href="/comment-ca-marche" className="font-medium text-brand underline underline-offset-2">notre méthode</Link>.
        </p>
      </div>
    </div>
  );
}
