import type { Metadata } from 'next';
import Link from 'next/link';
import { HOST, LEGAL, SITE } from '@/lib/site';
import { alternatesFor, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

interface Section {
  heading: string;
  paragraphs: string[];
}

interface Copy {
  title: string;
  /** Sur les versions traduites : la version française fait foi. */
  authoritative: string | null;
  intro: string;
  publisherHeading: string;
  publisher: string;
  status: string;
  address: string;
  siret: string;
  director: string;
  individual: string;
  contact: string;
  hostHeading: string;
  sections: Section[];
  privacyLink: string;
  updated: string;
}

const COPY: Record<Lang, Copy> = {
  fr: {
    title: "Mentions légales et conditions d'utilisation",
    authoritative: null,
    intro: `En utilisant ${SITE.name}, vous acceptez les conditions ci-dessous. En résumé : ${SITE.name} est une plateforme d'information gratuite qui donne de la visibilité aux vols au départ de l'EuroAirport. Nous ne vendons rien : vous réservez directement auprès de la compagnie aérienne, selon ses propres conditions.`,
    publisherHeading: 'Éditeur du site',
    publisher: 'Éditeur',
    status: 'Statut',
    address: 'Adresse',
    siret: 'SIRET',
    director: 'Directeur de la publication',
    individual: `${SITE.name} est édité à titre personnel et non commercial par un particulier. Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, son identité et ses coordonnées ont été communiquées à l'hébergeur du site, indiqué ci-dessous.`,
    contact: 'Contact',
    hostHeading: 'Hébergeur',
    sections: [
      {
        heading: 'Nature du service',
        paragraphs: [
          `${SITE.name} est une plateforme d'information indépendante et gratuite. Elle présente des prix de vols relevés au départ de l'EuroAirport Bâle-Mulhouse-Fribourg et renvoie vers le site de la compagnie aérienne qui opère le vol.`,
          `${SITE.name} ne vend aucun billet, aucun voyage ni aucune prestation touristique. Le site n'est ni une agence de voyages, ni un opérateur de voyages, ni un intermédiaire de réservation au sens du Code du tourisme. Aucun contrat n'est conclu par son intermédiaire : la réservation, le paiement, les conditions de transport, les bagages, les modifications et les remboursements relèvent exclusivement de la compagnie aérienne choisie.`,
        ],
      },
      {
        heading: 'Origine et valeur des prix',
        paragraphs: [
          "Les prix affichés sont relevés sur les sites publics des compagnies aériennes, à la date indiquée à côté de chaque prix. Ils sont fournis à titre purement indicatif et ne constituent ni une offre, ni une promesse de prix, ni une garantie de disponibilité.",
          "Les prix des vols changent fréquemment. Seul le prix affiché par la compagnie au moment de la réservation fait foi. Un « combo » associe un vol aller et un vol retour vendus séparément par la compagnie : chacun est soumis à ses propres conditions.",
          "Le « prix courant » est un repère statistique calculé à partir de nos relevés ; il ne correspond à aucun prix officiel et ne permet pas de calculer une réduction.",
        ],
      },
      {
        heading: 'Indépendance et marques',
        paragraphs: [
          `${SITE.name} n'est ni affilié, ni partenaire, ni sponsorisé, ni approuvé par l'EuroAirport Bâle-Mulhouse-Fribourg ou par l'une des compagnies aériennes citées.`,
          "Les noms de compagnies aériennes (notamment easyJet), d'aéroports et les autres marques citées appartiennent à leurs titulaires respectifs. Ils ne sont mentionnés que pour indiquer chez qui un vol est proposé, sans aucune intention de créer une confusion ou de laisser croire à un partenariat.",
        ],
      },
      {
        heading: 'Liens externes et rémunération',
        paragraphs: [
          `${SITE.name} ne perçoit aucune commission sur les liens vers les compagnies aériennes. D'autres liens (par exemple vers des sites d'hébergement) peuvent être des liens partenaires : ils sont alors signalés et n'entraînent aucun surcoût pour vous. Les encarts de partenaires portent toujours la mention « Partenaire ».`,
          "Les sites vers lesquels nous renvoyons sont indépendants de nous. Nous ne contrôlons ni leur contenu, ni leurs prix, ni leurs conditions, et nous déclinons toute responsabilité à leur égard.",
        ],
      },
      {
        heading: 'Responsabilité',
        paragraphs: [
          `Les informations du site (prix, dates, idées de visites, conseils de voyage) sont fournies en l'état, à titre informatif, et peuvent contenir des erreurs ou être devenues inexactes. ${SITE.name} s'efforce de les tenir à jour mais ne garantit ni leur exactitude, ni leur exhaustivité, ni leur actualité.`,
          `${SITE.name} ne saurait être tenu responsable d'un écart de prix, d'une indisponibilité, d'un retard, d'une annulation, d'une décision de voyage ou de tout dommage lié à l'utilisation du site ou des sites tiers. Il vous appartient de vérifier les conditions de la compagnie ainsi que les formalités de voyage (papiers d'identité, visas, santé) avant de réserver.`,
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          "Les textes, la sélection et la présentation des informations du site sont la propriété de l'éditeur. Toute reproduction substantielle sans autorisation est interdite.",
          "Les photographies proviennent d'Unsplash et sont utilisées selon la licence Unsplash ; elles restent la propriété de leurs auteurs.",
        ],
      },
      {
        heading: 'Données personnelles',
        paragraphs: [
          `${SITE.name} ne demande aucune inscription et ne vend aucune donnée. La mesure d'audience est anonyme et ne dépose pas de cookie. Le détail figure dans la politique de confidentialité.`,
        ],
      },
      {
        heading: 'Droit applicable',
        paragraphs: [
          "Les présentes mentions et conditions sont soumises au droit français. En cas de question ou de réclamation, écrivez-nous d'abord à l'adresse de contact ci-dessus : nous chercherons une solution amiable.",
          "Ces conditions peuvent évoluer ; la version en ligne est celle qui s'applique.",
        ],
      },
    ],
    privacyLink: 'Politique de confidentialité',
    updated: 'Dernière mise à jour : 17 novembre 2026.',
  },
  de: {
    title: 'Impressum und Nutzungsbedingungen',
    authoritative: 'Diese Seite ist eine Übersetzung. Rechtlich maßgeblich ist die französische Fassung.',
    intro: `Mit der Nutzung von ${SITE.name} akzeptieren Sie die folgenden Bedingungen. Kurz gesagt: ${SITE.name} ist eine kostenlose Informationsplattform, die Flüge ab dem EuroAirport sichtbar macht. Wir verkaufen nichts: Sie buchen direkt bei der Fluggesellschaft, zu deren eigenen Bedingungen.`,
    publisherHeading: 'Herausgeber der Website',
    publisher: 'Herausgeber',
    status: 'Rechtsform',
    address: 'Anschrift',
    siret: 'SIRET-Nummer',
    director: 'Verantwortlich für den Inhalt',
    individual: `${SITE.name} wird privat und nicht gewerblich von einer Privatperson herausgegeben. Gemäß Artikel 6 des französischen Gesetzes Nr. 2004-575 vom 21. Juni 2004 wurden ihre Identität und Kontaktdaten dem unten genannten Hosting-Anbieter mitgeteilt.`,
    contact: 'Kontakt',
    hostHeading: 'Hosting',
    sections: [
      {
        heading: 'Art des Angebots',
        paragraphs: [
          `${SITE.name} ist eine unabhängige, kostenlose Informationsplattform. Sie zeigt Flugpreise ab dem EuroAirport Basel-Mulhouse-Freiburg und verlinkt auf die Website der Fluggesellschaft, die den Flug durchführt.`,
          `${SITE.name} verkauft keine Tickets, Reisen oder touristischen Leistungen. Die Website ist weder Reisebüro noch Reiseveranstalter noch Buchungsvermittler. Über sie wird kein Vertrag geschlossen: Buchung, Zahlung, Beförderungsbedingungen, Gepäck, Änderungen und Erstattungen liegen ausschließlich bei der gewählten Fluggesellschaft.`,
        ],
      },
      {
        heading: 'Herkunft und Bedeutung der Preise',
        paragraphs: [
          'Die angezeigten Preise werden auf den öffentlichen Websites der Fluggesellschaften erfasst, an dem neben jedem Preis angegebenen Datum. Sie dienen ausschließlich zur Orientierung und stellen weder ein Angebot noch eine Preiszusage noch eine Verfügbarkeitsgarantie dar.',
          'Flugpreise ändern sich häufig. Maßgeblich ist allein der Preis, den die Fluggesellschaft bei der Buchung anzeigt. Eine „Kombi“ verbindet einen Hin- und einen Rückflug, die von der Fluggesellschaft getrennt verkauft werden: Für jeden gelten eigene Bedingungen.',
          'Der „übliche Preis“ ist ein statistischer Richtwert aus unseren Erfassungen; er entspricht keinem offiziellen Preis und erlaubt keine Berechnung eines Rabatts.',
        ],
      },
      {
        heading: 'Unabhängigkeit und Marken',
        paragraphs: [
          `${SITE.name} ist weder mit dem EuroAirport Basel-Mulhouse-Freiburg noch mit einer der genannten Fluggesellschaften verbunden, partnerschaftlich verbunden, von ihnen gesponsert oder genehmigt.`,
          'Namen von Fluggesellschaften (insbesondere easyJet), Flughäfen und andere genannte Marken gehören ihren jeweiligen Inhabern. Sie werden nur genannt, um anzugeben, wo ein Flug angeboten wird, ohne die Absicht, Verwechslungen oder den Eindruck einer Partnerschaft zu erzeugen.',
        ],
      },
      {
        heading: 'Externe Links und Vergütung',
        paragraphs: [
          `${SITE.name} erhält keine Provision für Links zu Fluggesellschaften. Andere Links (zum Beispiel zu Unterkunftsseiten) können Partnerlinks sein: Sie sind dann gekennzeichnet und verursachen keine Mehrkosten. Partnerhinweise tragen immer den Vermerk „Partner“.`,
          'Die verlinkten Websites sind unabhängig von uns. Wir kontrollieren weder ihre Inhalte noch ihre Preise oder Bedingungen und übernehmen dafür keine Haftung.',
        ],
      },
      {
        heading: 'Haftung',
        paragraphs: [
          `Die Informationen der Website (Preise, Daten, Ausflugsideen, Reisetipps) werden ohne Gewähr und nur zur Information bereitgestellt und können Fehler enthalten oder veraltet sein. ${SITE.name} bemüht sich um Aktualität, garantiert aber weder Richtigkeit noch Vollständigkeit.`,
          `${SITE.name} haftet nicht für Preisabweichungen, Nichtverfügbarkeit, Verspätungen, Annullierungen, Reiseentscheidungen oder Schäden im Zusammenhang mit der Nutzung der Website oder fremder Websites. Prüfen Sie vor der Buchung die Bedingungen der Fluggesellschaft sowie die Reiseformalitäten (Ausweisdokumente, Visa, Gesundheit).`,
        ],
      },
      {
        heading: 'Urheberrecht',
        paragraphs: [
          'Die Texte sowie die Auswahl und Darstellung der Informationen sind Eigentum des Herausgebers. Eine wesentliche Vervielfältigung ohne Genehmigung ist untersagt.',
          'Die Fotos stammen von Unsplash und werden gemäß der Unsplash-Lizenz verwendet; sie bleiben Eigentum ihrer Urheber.',
        ],
      },
      {
        heading: 'Personenbezogene Daten',
        paragraphs: [
          `${SITE.name} verlangt keine Registrierung und verkauft keine Daten. Die Reichweitenmessung ist anonym und setzt keine Cookies. Einzelheiten stehen in der Datenschutzerklärung.`,
        ],
      },
      {
        heading: 'Anwendbares Recht',
        paragraphs: [
          'Diese Angaben und Bedingungen unterliegen französischem Recht. Bei Fragen oder Beschwerden schreiben Sie uns zuerst an die obige Kontaktadresse: Wir suchen eine einvernehmliche Lösung.',
          'Diese Bedingungen können sich ändern; es gilt die online veröffentlichte Fassung.',
        ],
      },
    ],
    privacyLink: 'Datenschutzerklärung',
    updated: 'Letzte Aktualisierung: 17. November 2026.',
  },
  en: {
    title: 'Legal notice and terms of use',
    authoritative: 'This page is a translation. The French version is the legally binding one.',
    intro: `By using ${SITE.name}, you accept the terms below. In short: ${SITE.name} is a free information platform that gives visibility to flights from EuroAirport. We sell nothing: you book directly with the airline, under its own terms.`,
    publisherHeading: 'Site publisher',
    publisher: 'Publisher',
    status: 'Legal status',
    address: 'Address',
    siret: 'SIRET number',
    director: 'Publication director',
    individual: `${SITE.name} is published privately and non-commercially by an individual. In accordance with Article 6 of French Law No. 2004-575 of 21 June 2004, their identity and contact details have been provided to the site's hosting provider, named below.`,
    contact: 'Contact',
    hostHeading: 'Hosting provider',
    sections: [
      {
        heading: 'Nature of the service',
        paragraphs: [
          `${SITE.name} is an independent, free information platform. It shows flight prices observed from EuroAirport Basel-Mulhouse-Freiburg and links to the website of the airline operating the flight.`,
          `${SITE.name} sells no tickets, trips or travel services. The site is neither a travel agency, nor a tour operator, nor a booking intermediary. No contract is concluded through it: booking, payment, conditions of carriage, baggage, changes and refunds are solely a matter for the chosen airline.`,
        ],
      },
      {
        heading: 'Origin and value of the prices',
        paragraphs: [
          'The prices shown are observed on the airlines’ public websites, on the date shown next to each price. They are for guidance only and are neither an offer, nor a price commitment, nor a guarantee of availability.',
          'Flight prices change frequently. Only the price shown by the airline when booking counts. A “combo” pairs an outbound and a return flight sold separately by the airline: each is subject to its own conditions.',
          'The “usual price” is a statistical benchmark calculated from our observations; it is not an official price and cannot be used to calculate a discount.',
        ],
      },
      {
        heading: 'Independence and trademarks',
        paragraphs: [
          `${SITE.name} is not affiliated with, partnered with, sponsored or endorsed by EuroAirport Basel-Mulhouse-Freiburg or any of the airlines mentioned.`,
          'Airline names (including easyJet), airport names and other trademarks mentioned belong to their respective owners. They are mentioned only to indicate where a flight is offered, with no intention of causing confusion or suggesting a partnership.',
        ],
      },
      {
        heading: 'External links and remuneration',
        paragraphs: [
          `${SITE.name} earns no commission on links to airlines. Other links (for example to accommodation sites) may be partner links: they are then labelled and cost you nothing extra. Partner boxes are always labelled “Partner”.`,
          'The websites we link to are independent of us. We do not control their content, prices or conditions and accept no liability for them.',
        ],
      },
      {
        heading: 'Liability',
        paragraphs: [
          `The information on the site (prices, dates, sightseeing ideas, travel tips) is provided as is, for information only, and may contain errors or be out of date. ${SITE.name} strives to keep it up to date but does not guarantee its accuracy, completeness or currency.`,
          `${SITE.name} cannot be held liable for any price difference, unavailability, delay, cancellation, travel decision or damage arising from the use of the site or third-party sites. It is up to you to check the airline’s conditions and travel formalities (identity documents, visas, health) before booking.`,
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          "The text and the selection and presentation of the site's information belong to the publisher. Substantial reproduction without permission is prohibited.",
          'The photographs come from Unsplash and are used under the Unsplash licence; they remain the property of their authors.',
        ],
      },
      {
        heading: 'Personal data',
        paragraphs: [
          `${SITE.name} requires no registration and sells no data. Audience measurement is anonymous and sets no cookies. Details are in the privacy policy.`,
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'This notice and these terms are governed by French law. For any question or complaint, please write to the contact address above first: we will look for an amicable solution.',
          'These terms may change; the version online is the one that applies.',
        ],
      },
    ],
    privacyLink: 'Privacy policy',
    updated: 'Last updated: 17 November 2026.',
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
        <h1 className="display text-5xl text-ink">{t.title}</h1>
        {t.authoritative && <p className="mt-4 text-sm">{t.authoritative}</p>}
        <p className="mt-4">{t.intro}</p>

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

        {t.sections.map((s) => (
          <section key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}

        <p>
          <Link href={localePath(lang, '/confidentialite')}>{t.privacyLink}</Link>
        </p>
        <p className="text-sm">{t.updated}</p>
      </div>
    </article>
  );
}
