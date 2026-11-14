import type { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';

export const metadata: Metadata = {
  title: 'Alertes deals par e-mail',
  description: 'Recevez par e-mail les vols directs à prix réellement bas au départ de Bâle-Mulhouse, dès leur publication.',
  alternates: { canonical: '/alertes' },
};

const POINTS = [
  ['Uniquement de vrais bons prix', 'Des vols directs au moins 15 % sous le prix habituel de la destination.'],
  ['Peu de messages', 'Un e-mail quand de nouveaux deals sont publiés, deux fois par semaine au maximum.'],
  ['Gratuit et sans engagement', 'Désinscription en un clic, votre adresse ne sert à rien d’autre.'],
];

export default function AlertesPage() {
  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Alertes par e-mail</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Les bons prix au départ de Bâle-Mulhouse, directement dans votre boîte
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Les meilleurs tarifs disparaissent en quelques jours. Inscrivez-vous pour être prévenu dès qu&apos;ils sont publiés.
        </p>

        <div className="card mt-8 p-6">
          <NewsletterForm source="alertes" />
        </div>

        <ul className="mt-10 space-y-5">
          {POINTS.map(([title, text]) => (
            <li key={title} className="flex gap-4">
              <span className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-saving-soft text-saving" aria-hidden="true">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m4 10 4 4 8-8" /></svg>
              </span>
              <div>
                <h2 className="font-semibold text-ink">{title}</h2>
                <p className="text-sm text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
