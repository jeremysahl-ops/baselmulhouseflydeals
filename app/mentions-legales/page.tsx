import type { Metadata } from 'next';
import { HOST, LEGAL, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Mentions légales',
  alternates: { canonical: '/mentions-legales' },
};

export default function MentionsLegalesPage() {
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        {LEGAL.publisher ? (
          <ul>
            <li>Éditeur : {LEGAL.publisher}</li>
            {LEGAL.status && <li>Statut : {LEGAL.status}</li>}
            {LEGAL.address && <li>Adresse : {LEGAL.address}</li>}
            {LEGAL.siret && <li>SIRET : {LEGAL.siret}</li>}
            {LEGAL.publicationDirector && <li>Directeur de la publication : {LEGAL.publicationDirector}</li>}
          </ul>
        ) : (
          <p>
            {SITE.name} est édité à titre personnel par un particulier. Son identité et ses coordonnées ont été
            communiquées à l&apos;hébergeur du site, indiqué ci-dessous.
          </p>
        )}
        <p>
          Contact : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>

        <h2>Hébergeur</h2>
        <p>
          {HOST.name}, {HOST.address}. <a href={HOST.site} rel="noopener">{HOST.site.replace('https://', '')}</a>
        </p>

        <h2>Nature du service</h2>
        <p>
          {SITE.name} est un site d&apos;information indépendant. Il ne vend aucun billet et n&apos;est ni une agence de
          voyages ni un intermédiaire de réservation. Les prix affichés sont des prix constatés à une date donnée, fournis
          à titre indicatif : seul le prix affiché par le site de réservation au moment du paiement fait foi.
        </p>
        <p>
          {SITE.name} n&apos;est affilié ni à l&apos;EuroAirport Bâle-Mulhouse-Fribourg ni aux compagnies aériennes citées.
        </p>

        <h2>Liens d&apos;affiliation</h2>
        <p>
          Les boutons de réservation sont des liens d&apos;affiliation vers {SITE.bookingPartner}. Lorsqu&apos;une
          réservation est effectuée après un clic sur l&apos;un de ces liens, l&apos;éditeur peut percevoir une commission,
          sans surcoût pour l&apos;utilisateur.
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, la sélection des offres et la mise en page du site sont la propriété de l&apos;éditeur. Les
          photographies proviennent d&apos;Unsplash et restent la propriété de leurs auteurs. Les marques citées
          appartiennent à leurs titulaires.
        </p>
      </div>
    </article>
  );
}
