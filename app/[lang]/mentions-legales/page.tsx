import type { Metadata } from 'next';
import { HOST, LEGAL, SITE } from '@/lib/site';
import { alternatesFor, isLang, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

interface Copy {
  title: string;
  /** Sur les versions traduites : la version française fait foi. */
  authoritative: string | null;
  publisherHeading: string;
  publisher: string;
  status: string;
  address: string;
  siret: string;
  director: string;
  individual: string;
  contact: string;
  hostHeading: string;
  serviceHeading: string;
  service: string[];
  affiliateHeading: string;
  affiliate: string;
  ipHeading: string;
  ip: string;
}

const COPY: Record<Lang, Copy> = {
  fr: {
    title: 'Mentions légales',
    authoritative: null,
    publisherHeading: 'Éditeur du site',
    publisher: 'Éditeur',
    status: 'Statut',
    address: 'Adresse',
    siret: 'SIRET',
    director: 'Directeur de la publication',
    individual: `${SITE.name} est édité à titre personnel par un particulier. Son identité et ses coordonnées ont été communiquées à l'hébergeur du site, indiqué ci-dessous.`,
    contact: 'Contact',
    hostHeading: 'Hébergeur',
    serviceHeading: 'Nature du service',
    service: [
      `${SITE.name} est un site d'information indépendant. Il ne vend aucun billet et n'est ni une agence de voyages ni un intermédiaire de réservation. Les prix affichés sont des prix constatés à une date donnée, fournis à titre indicatif : seul le prix affiché par le site de réservation au moment du paiement fait foi.`,
      `${SITE.name} n'est affilié ni à l'EuroAirport Bâle-Mulhouse-Fribourg ni aux compagnies aériennes citées.`,
    ],
    affiliateHeading: "Liens d'affiliation",
    affiliate: `Les boutons de réservation sont des liens d'affiliation vers ${SITE.bookingPartner}. Lorsqu'une réservation est effectuée après un clic sur l'un de ces liens, l'éditeur peut percevoir une commission, sans surcoût pour l'utilisateur.`,
    ipHeading: 'Propriété intellectuelle',
    ip: "Les textes, la sélection des offres et la mise en page du site sont la propriété de l'éditeur. Les photographies proviennent d'Unsplash et restent la propriété de leurs auteurs. Les marques citées appartiennent à leurs titulaires.",
  },
  de: {
    title: 'Impressum',
    authoritative: 'Diese Seite ist eine Übersetzung. Rechtlich maßgeblich ist die französische Fassung.',
    publisherHeading: 'Herausgeber der Website',
    publisher: 'Herausgeber',
    status: 'Rechtsform',
    address: 'Anschrift',
    siret: 'SIRET-Nummer',
    director: 'Verantwortlich für den Inhalt',
    individual: `${SITE.name} wird von einer Privatperson herausgegeben. Ihre Identität und ihre Kontaktdaten wurden dem unten genannten Hosting-Anbieter der Website mitgeteilt, wie es das französische Recht vorsieht.`,
    contact: 'Kontakt',
    hostHeading: 'Hosting',
    serviceHeading: 'Art des Angebots',
    service: [
      `${SITE.name} ist eine unabhängige Informationswebsite. Sie verkauft keine Tickets und ist weder ein Reisebüro noch ein Buchungsvermittler. Die angezeigten Preise wurden an einem bestimmten Datum festgestellt und dienen nur zur Orientierung: Maßgeblich ist allein der Preis, den die Buchungsseite zum Zeitpunkt der Zahlung anzeigt.`,
      `${SITE.name} ist weder mit dem EuroAirport Basel-Mulhouse-Freiburg noch mit den genannten Fluggesellschaften verbunden.`,
    ],
    affiliateHeading: 'Partnerlinks',
    affiliate: `Die Buchungsschaltflächen sind Partnerlinks zu ${SITE.bookingPartner}. Wird nach einem Klick auf einen dieser Links gebucht, kann der Herausgeber eine Provision erhalten, ohne Mehrkosten für die Nutzerinnen und Nutzer.`,
    ipHeading: 'Urheberrecht',
    ip: 'Die Texte, die Auswahl der Angebote und die Gestaltung der Website sind Eigentum des Herausgebers. Die Fotos stammen von Unsplash und bleiben Eigentum ihrer Urheber. Die genannten Marken gehören ihren jeweiligen Inhabern.',
  },
  en: {
    title: 'Legal notice',
    authoritative: 'This page is a translation. The French version is the legally binding one.',
    publisherHeading: 'Site publisher',
    publisher: 'Publisher',
    status: 'Legal status',
    address: 'Address',
    siret: 'SIRET number',
    director: 'Publication director',
    individual: `${SITE.name} is published by a private individual. Their identity and contact details have been provided to the site's hosting provider, named below, as French law requires.`,
    contact: 'Contact',
    hostHeading: 'Hosting provider',
    serviceHeading: 'Nature of the service',
    service: [
      `${SITE.name} is an independent information site. It sells no tickets and is neither a travel agency nor a booking intermediary. The prices shown were observed on a given date and are for guidance only: the only price that counts is the one shown by the booking site at the time of payment.`,
      `${SITE.name} is not affiliated with EuroAirport Basel-Mulhouse-Freiburg or with the airlines mentioned.`,
    ],
    affiliateHeading: 'Affiliate links',
    affiliate: `The booking buttons are affiliate links to ${SITE.bookingPartner}. When a booking is made after clicking one of these links, the publisher may earn a commission, at no extra cost to the user.`,
    ipHeading: 'Intellectual property',
    ip: "The text, the selection of offers and the site's layout belong to the publisher. The photographs come from Unsplash and remain the property of their authors. The trademarks mentioned belong to their owners.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: COPY[lang].title, alternates: alternatesFor(lang, '/mentions-legales') };
}

export default async function MentionsLegalesPage({ params }: Props) {
  const lang = await langParam(params);
  const t = COPY[lang];
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.title}</h1>
        {t.authoritative && <p className="mt-4 text-sm">{t.authoritative}</p>}

        <h2>{t.publisherHeading}</h2>
        {LEGAL.publisher ? (
          <ul>
            <li>{t.publisher} : {LEGAL.publisher}</li>
            {LEGAL.status && <li>{t.status} : {LEGAL.status}</li>}
            {LEGAL.address && <li>{t.address} : {LEGAL.address}</li>}
            {LEGAL.siret && <li>{t.siret} : {LEGAL.siret}</li>}
            {LEGAL.publicationDirector && <li>{t.director} : {LEGAL.publicationDirector}</li>}
          </ul>
        ) : (
          <p>{t.individual}</p>
        )}
        <p>
          {t.contact} : <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
        </p>

        <h2>{t.hostHeading}</h2>
        <p>
          {HOST.name}, {HOST.address}. <a href={HOST.site} rel="noopener">{HOST.site.replace('https://', '')}</a>
        </p>

        <h2>{t.serviceHeading}</h2>
        {t.service.map((p) => (
          <p key={p}>{p}</p>
        ))}

        <h2>{t.affiliateHeading}</h2>
        <p>{t.affiliate}</p>

        <h2>{t.ipHeading}</h2>
        <p>{t.ip}</p>
      </div>
    </article>
  );
}
