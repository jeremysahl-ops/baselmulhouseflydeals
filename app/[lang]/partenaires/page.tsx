import type { Metadata } from 'next';
import Link from 'next/link';
import { getDeals } from '@/lib/supabase';
import { SITE } from '@/lib/site';
import { alternatesFor, getDict, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

// Pages entièrement statiques : les données ne changent qu'à une mise en ligne. Une régénération
// périodique (ISR) consommait le quota gratuit de Vercel (« ISR Writes »), alerte du 22/11/2026.
export const revalidate = false;
export const dynamic = 'force-static';

interface Props {
  params: Promise<{ lang: string }>;
}

interface Copy {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: (airport: string) => string;
  statDeals: string;
  statDestinations: string;
  offerHeading: string;
  formats: { title: string; text: string }[];
  terms: string;
  rulesHeading: string;
  rules: string[];
  talkHeading: string;
  talkText: string;
  write: (email: string) => string;
  subject: string;
  methodBefore: string;
  methodLink: string;
}

const COPY: Record<Lang, Copy> = {
  fr: {
    metaTitle: 'Devenir partenaire',
    metaDescription:
      "Hôtels, parkings, navettes, acteurs du tourisme : présentez votre établissement aux voyageurs qui partent de l'EuroAirport Bâle-Mulhouse-Fribourg.",
    eyebrow: 'Hôtels, parkings, tourisme',
    h1: `Devenir partenaire de ${SITE.name}`,
    lead: (airport) =>
      `${SITE.name} s'adresse aux voyageurs d'Alsace, de la région de Bâle et du sud du pays de Bade qui partent de l'${airport}. Ils viennent ici avec une intention précise : partir, bientôt, vers une destination donnée. C'est le bon moment pour leur présenter votre établissement.`,
    statDeals: "Deals en ligne aujourd'hui",
    statDestinations: 'Destinations concernées',
    offerHeading: 'Ce que nous proposons',
    formats: [
      {
        title: 'Partenaire local',
        text: "Parking, navette, hôtel proche de l'aéroport : votre encart apparaît sur l'accueil et sur chaque page de deal, au moment où le voyageur prépare son départ.",
      },
      {
        title: 'Partenaire destination',
        text: 'Hôtel, résidence ou activité sur place : votre encart apparaît sur les deals vers votre destination, à côté des dates et du prix du vol.',
      },
    ],
    terms:
      'Les conditions se discutent au cas par cas : tarif fixe, commission ou échange de visibilité. Les chiffres de fréquentation du site sont communiqués sur simple demande.',
    rulesHeading: 'Nos règles',
    rules: [
      'Chaque encart porte la mention « Partenaire », visible et sans ambiguïté.',
      "Les partenariats n'influencent jamais la sélection des deals, qui dépend uniquement des prix constatés.",
      'Un seul partenaire par catégorie et par destination : pas de mise en concurrence sur la même page.',
      'Nous ne mettons en avant que des établissements que nous pourrions recommander à un proche.',
    ],
    talkHeading: 'Parlons-en',
    talkText:
      'Écrivez-nous en quelques lignes : votre établissement, votre ville, ce que vous aimeriez mettre en avant. Nous répondons à chaque message.',
    write: (email) => `Écrire à ${email}`,
    subject: `Partenariat ${SITE.name}`,
    methodBefore: 'Pour comprendre comment les deals sont choisis :',
    methodLink: 'notre méthode',
  },
  de: {
    metaTitle: 'Partner werden',
    metaDescription:
      'Hotels, Parkplätze, Shuttles, Tourismusanbieter: Stellen Sie Ihren Betrieb den Reisenden vor, die vom EuroAirport Basel-Mulhouse-Freiburg abfliegen.',
    eyebrow: 'Hotels, Parkplätze, Tourismus',
    h1: `Partner von ${SITE.name} werden`,
    lead: (airport) =>
      `${SITE.name} richtet sich an Reisende aus dem Elsass, der Region Basel und Südbaden, die vom ${airport} abfliegen. Sie kommen mit einer klaren Absicht hierher: bald zu einem bestimmten Ziel zu reisen. Das ist der richtige Moment, um ihnen Ihren Betrieb vorzustellen.`,
    statDeals: 'Deals heute online',
    statDestinations: 'Betroffene Reiseziele',
    offerHeading: 'Was wir anbieten',
    formats: [
      {
        title: 'Lokaler Partner',
        text: 'Parkplatz, Shuttle, Hotel in Flughafennähe: Ihr Hinweis erscheint auf der Startseite und auf jeder Deal-Seite, genau dann, wenn die Reisenden ihre Abreise planen.',
      },
      {
        title: 'Partner am Reiseziel',
        text: 'Hotel, Ferienanlage oder Aktivität vor Ort: Ihr Hinweis erscheint bei den Deals zu Ihrem Reiseziel, neben den Reisedaten und dem Flugpreis.',
      },
    ],
    terms:
      'Die Konditionen werden im Einzelfall besprochen: Festpreis, Provision oder gegenseitige Sichtbarkeit. Die Besucherzahlen der Website teilen wir auf Anfrage mit.',
    rulesHeading: 'Unsere Regeln',
    rules: [
      'Jeder Hinweis trägt gut sichtbar und eindeutig den Vermerk „Partner“.',
      'Partnerschaften beeinflussen niemals die Auswahl der Deals, die allein von den festgestellten Preisen abhängt.',
      'Ein einziger Partner pro Kategorie und Reiseziel: kein Wettbewerb auf derselben Seite.',
      'Wir stellen nur Betriebe vor, die wir auch Freunden und Familie empfehlen würden.',
    ],
    talkHeading: 'Sprechen wir darüber',
    talkText:
      'Schreiben Sie uns ein paar Zeilen: Ihr Betrieb, Ihr Ort, was Sie hervorheben möchten. Wir antworten auf jede Nachricht.',
    write: (email) => `E-Mail an ${email}`,
    subject: `Partnerschaft ${SITE.name}`,
    methodBefore: 'So werden die Deals ausgewählt:',
    methodLink: 'unsere Methode',
  },
  en: {
    metaTitle: 'Become a partner',
    metaDescription:
      'Hotels, car parks, shuttles, tourism businesses: present your business to travellers flying from EuroAirport Basel-Mulhouse-Freiburg.',
    eyebrow: 'Hotels, car parks, tourism',
    h1: `Become a ${SITE.name} partner`,
    lead: (airport) =>
      `${SITE.name} is for travellers from Alsace, the Basel area and southern Baden who fly from ${airport}. They come here with a clear intention: to travel soon to a specific destination. That is the right moment to show them your business.`,
    statDeals: 'Deals online today',
    statDestinations: 'Destinations covered',
    offerHeading: 'What we offer',
    formats: [
      {
        title: 'Local partner',
        text: 'Car park, shuttle, hotel near the airport: your listing appears on the home page and on every deal page, just when travellers are planning their departure.',
      },
      {
        title: 'Destination partner',
        text: 'Hotel, holiday residence or local activity: your listing appears on deals to your destination, next to the dates and the flight price.',
      },
    ],
    terms:
      'Terms are agreed case by case: fixed fee, commission or an exchange of visibility. Site traffic figures are available on request.',
    rulesHeading: 'Our rules',
    rules: [
      'Every listing carries a visible, unambiguous "Partner" label.',
      'Partnerships never influence the selection of deals, which depends solely on observed prices.',
      'Only one partner per category and per destination: no competitors side by side on the same page.',
      'We only feature businesses we would recommend to friends and family.',
    ],
    talkHeading: "Let's talk",
    talkText:
      'Write us a few lines: your business, your town, what you would like to highlight. We reply to every message.',
    write: (email) => `Email ${email}`,
    subject: `${SITE.name} partnership`,
    methodBefore: 'To understand how deals are chosen:',
    methodLink: 'our method',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: COPY[lang].metaTitle,
    description: COPY[lang].metaDescription,
    alternates: alternatesFor(lang, '/partenaires'),
  };
}

export default async function PartenairesPage({ params }: Props) {
  const lang = await langParam(params);
  const t = COPY[lang];
  const airport = getDict(lang).place.airport;
  const deals = await getDeals();
  const destinations = new Set(deals.map((d) => d.destination)).size;
  const mailto = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(t.subject)}`;

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.lead(airport)}</p>

        {deals.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 divide-x divide-line rounded-xl border border-line bg-white text-center">
            <div className="px-4 py-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">{t.statDeals}</dt>
              <dd className="mt-1 text-3xl font-bold text-ink">{deals.length}</dd>
            </div>
            <div className="px-4 py-5">
              <dt className="text-xs font-medium uppercase tracking-wider text-ink-muted">{t.statDestinations}</dt>
              <dd className="mt-1 text-3xl font-bold text-ink">{destinations}</dd>
            </div>
          </dl>
        )}

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">{t.offerHeading}</h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-3">
          {t.formats.map((f) => (
            <li key={f.title} className="card p-5">
              <h3 className="font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-ink-soft">{t.terms}</p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight text-ink">{t.rulesHeading}</h2>
        <ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-soft">
          {t.rules.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-action" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-2xl bg-brand px-6 py-10 text-white sm:px-10">
          <h2 className="text-2xl font-bold tracking-tight">{t.talkHeading}</h2>
          <p className="mt-3 max-w-xl text-white/70">{t.talkText}</p>
          <a href={mailto} className="btn-primary mt-6">{t.write(SITE.contactEmail)}</a>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          {t.methodBefore}{' '}
          <Link href={localePath(lang, '/comment-ca-marche')} className="font-medium text-brand underline underline-offset-2">{t.methodLink}</Link>.
        </p>
      </div>
    </div>
  );
}
