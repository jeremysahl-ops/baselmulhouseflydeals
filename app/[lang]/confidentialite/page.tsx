import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { alternatesFor, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

interface Copy {
  title: string;
  authoritative: string | null;
  introBefore: string;
  legalLink: string;
  alertsHeading: string;
  alerts: [label: string, text: string][];
  unsubscribe: string;
  analyticsHeading: string;
  analytics: string;
  bookingHeading: string;
  booking: string;
  rightsHeading: string;
  rightsBefore: string;
  rightsAfter: string;
}

const COPY: Record<Lang, Copy> = {
  fr: {
    title: 'Politique de confidentialité',
    authoritative: null,
    introBefore: `Cette page décrit les données que ${SITE.name} traite, pourquoi, et comment exercer vos droits. Le responsable du traitement est l'éditeur du site, identifié dans les`,
    legalLink: 'mentions légales',
    alertsHeading: "Alertes de prix sur votre téléphone",
    alerts: [
      ["Données enregistrées :", "l'adresse technique de notification de votre appareil (fournie par votre navigateur), ses clés de chiffrement, la langue du site et les critères de vos alertes (destination, prix maximum, durée, mois). Ni nom, ni adresse e-mail, ni numéro de téléphone."],
      ["Finalité :", "vous envoyer une notification quand un prix relevé correspond à l'une de vos alertes. Rien d'autre."],
      ["Base légale :", "votre consentement, donné en autorisant les notifications et en créant une alerte."],
      ["Durée :", "jusqu'à ce que vous supprimiez vos alertes, ou que votre appareil se désabonne des notifications (les alertes sont alors effacées automatiquement)."],
      ["Destinataires :", "l'éditeur, son hébergeur de base de données (Supabase) et le service de notification de votre navigateur (Google, Apple ou Mozilla), qui achemine le message chiffré."],
    ],
    unsubscribe: "Pour arrêter, supprimez vos alertes sur la page Alertes de prix, bloquez les notifications de FlyBSL dans les réglages, ou écrivez à",
    analyticsHeading: "Mesure d'audience",
    analytics:
      "Le site utilise Vercel Web Analytics, un outil de mesure d'audience qui ne dépose pas de cookie et ne permet pas de vous identifier : il compte les pages vues de façon agrégée.",
    bookingHeading: 'Liens vers les sites de réservation',
    booking: `Lorsque vous cliquez sur un bouton de réservation, vous quittez ${SITE.name} pour le site d'un partenaire (la compagnie aérienne pour les vols, Booking.com pour les hôtels). Le lien peut contenir un identifiant qui indique à ce partenaire que vous venez de notre site ; il ne contient aucune donnée personnelle vous concernant. Le partenaire applique ensuite sa propre politique de confidentialité et peut déposer ses propres cookies.`,
    rightsHeading: 'Vos droits',
    rightsBefore:
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition et de portabilité de vos données. Pour les exercer, écrivez à",
    rightsAfter: 'Vous pouvez aussi adresser une réclamation à la CNIL',
  },
  de: {
    title: 'Datenschutzerklärung',
    authoritative: 'Diese Seite ist eine Übersetzung. Rechtlich maßgeblich ist die französische Fassung.',
    introBefore: `Diese Seite beschreibt, welche Daten ${SITE.name} verarbeitet, zu welchem Zweck und wie Sie Ihre Rechte ausüben können. Verantwortlich für die Verarbeitung ist der Herausgeber der Website, siehe`,
    legalLink: 'Impressum',
    alertsHeading: "Preisalarm auf Ihrem Handy",
    alerts: [
      ["Gespeicherte Daten:", "die technische Benachrichtigungsadresse Ihres Geräts (von Ihrem Browser bereitgestellt), deren Verschlüsselungsschlüssel, die Sprache der Website und die Kriterien Ihrer Alarme (Reiseziel, Höchstpreis, Dauer, Monat). Kein Name, keine E-Mail-Adresse, keine Telefonnummer."],
      ["Zweck:", "Sie zu benachrichtigen, wenn ein erfasster Preis zu einem Ihrer Alarme passt. Nichts anderes."],
      ["Rechtsgrundlage:", "Ihre Einwilligung, die Sie mit dem Erlauben der Benachrichtigungen und dem Anlegen eines Alarms erteilen."],
      ["Dauer:", "bis Sie Ihre Alarme löschen oder Ihr Gerät die Benachrichtigungen abbestellt (die Alarme werden dann automatisch gelöscht)."],
      ["Empfänger:", "der Herausgeber, sein Datenbank-Hosting-Anbieter (Supabase) und der Benachrichtigungsdienst Ihres Browsers (Google, Apple oder Mozilla), der die verschlüsselte Nachricht zustellt."],
    ],
    unsubscribe: "Zum Beenden löschen Sie Ihre Alarme auf der Seite Preisalarm, blockieren Sie die Benachrichtigungen von FlyBSL in den Einstellungen oder schreiben Sie an",
    analyticsHeading: 'Reichweitenmessung',
    analytics:
      'Die Website nutzt Vercel Web Analytics, ein Werkzeug zur Reichweitenmessung, das keine Cookies setzt und Sie nicht identifizieren kann: Es zählt Seitenaufrufe in zusammengefasster Form.',
    bookingHeading: 'Links zu den Buchungsseiten',
    booking: `Wenn Sie auf eine Buchungsschaltfläche klicken, verlassen Sie ${SITE.name} und gelangen auf die Website eines Partners (die Fluggesellschaft für Flüge, Booking.com für Hotels). Der Link kann eine Kennung enthalten, die dem Partner anzeigt, dass Sie von unserer Website kommen; er enthält keine personenbezogenen Daten über Sie. Anschließend gilt die Datenschutzerklärung des Partners, der eigene Cookies setzen kann.`,
    rightsHeading: 'Ihre Rechte',
    rightsBefore:
      'Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Widerspruch und Datenübertragbarkeit. Um diese Rechte auszuüben, schreiben Sie an',
    rightsAfter: 'Sie können sich außerdem bei der französischen Datenschutzbehörde CNIL beschweren',
  },
  en: {
    title: 'Privacy policy',
    authoritative: 'This page is a translation. The French version is the legally binding one.',
    introBefore: `This page describes the data ${SITE.name} processes, why, and how to exercise your rights. The data controller is the site publisher, identified in the`,
    legalLink: 'legal notice',
    alertsHeading: "Price alerts on your phone",
    alerts: [
      ["Data stored:", "your device's technical notification address (provided by your browser), its encryption keys, the site language and your alert criteria (destination, maximum price, length of stay, month). No name, email address or phone number."],
      ["Purpose:", "to notify you when a checked fare matches one of your alerts. Nothing else."],
      ["Legal basis:", "your consent, given by allowing notifications and creating an alert."],
      ["Retention:", "until you delete your alerts or your device unsubscribes from notifications (the alerts are then deleted automatically)."],
      ["Recipients:", "the publisher, its database hosting provider (Supabase) and your browser's notification service (Google, Apple or Mozilla), which delivers the encrypted message."],
    ],
    unsubscribe: "To stop, delete your alerts on the Price alerts page, block FlyBSL notifications in your settings, or write to",
    analyticsHeading: 'Audience measurement',
    analytics:
      'The site uses Vercel Web Analytics, an audience measurement tool that sets no cookies and cannot identify you: it counts page views in aggregate.',
    bookingHeading: 'Links to booking sites',
    booking: `When you click a booking button, you leave ${SITE.name} for a partner's website (the airline for flights, Booking.com for hotels). The link may contain an identifier telling the partner that you came from our site; it contains no personal data about you. The partner then applies its own privacy policy and may set its own cookies.`,
    rightsHeading: 'Your rights',
    rightsBefore:
      'Under the GDPR, you have the right to access, rectify, erase, object to the processing of and port your data. To exercise these rights, write to',
    rightsAfter: 'You can also lodge a complaint with the French data protection authority, the CNIL',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: COPY[lang].title, alternates: alternatesFor(lang, '/confidentialite') };
}

export default async function ConfidentialitePage({ params }: Props) {
  const lang = await langParam(params);
  const t = COPY[lang];
  const mail = <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>;
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t.title}</h1>
        {t.authoritative && <p className="mt-4 text-sm">{t.authoritative}</p>}
        <p className="mt-4">
          {t.introBefore} <Link href={localePath(lang, '/mentions-legales')}>{t.legalLink}</Link>.
        </p>

        <h2>{t.alertsHeading}</h2>
        <ul>
          {t.alerts.map(([label, text]) => (
            <li key={label}>
              <strong>{label}</strong> {text}
            </li>
          ))}
        </ul>
        <p>
          {t.unsubscribe} {mail}.
        </p>

        <h2>{t.analyticsHeading}</h2>
        <p>{t.analytics}</p>

        <h2>{t.bookingHeading}</h2>
        <p>{t.booking}</p>

        <h2>{t.rightsHeading}</h2>
        <p>
          {t.rightsBefore} {mail}. {t.rightsAfter} (<a href="https://www.cnil.fr" rel="noopener">cnil.fr</a>).
        </p>
      </div>
    </article>
  );
}
