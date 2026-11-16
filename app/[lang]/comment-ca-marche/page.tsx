import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { alternatesFor, getDict, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Notre méthode : comment nous relevons les prix des vols',
    description:
      "D'où viennent les prix, comment nous les assemblons en combos aller-retour, ce que veut dire « prix courant » et comment le site est financé.",
  },
  de: {
    title: 'Unsere Methode: So erfassen wir die Flugpreise',
    description:
      'Woher die Preise stammen, wie wir sie zu Hin-und-Rückflug-Kombis zusammensetzen, was „üblicher Preis“ bedeutet und wie sich die Website finanziert.',
  },
  en: {
    title: 'Our method: how we check flight prices',
    description: 'Where the prices come from, how we combine them into return combos, what “usual price” means and how the site is funded.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { ...META[lang], alternates: alternatesFor(lang, '/comment-ca-marche') };
}

type BodyProps = { airport: string; href: (p: string) => string };

function Fr({ airport, href }: BodyProps) {
  return (
    <>
      <p className="eyebrow">Transparence</p>
      <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">Notre méthode</h1>
      <p className="mt-4 text-lg">
        {SITE.name} est un site indépendant, pensé pour les voyageurs des trois frontières. Nous ne vendons pas de
        billets : nous relevons les prix des vols au départ de l&apos;{airport}, vous montrons les meilleurs et vous redirigeons vers la compagnie qui opère le vol.
      </p>

      <h2>D&apos;où viennent les prix</h2>
      <p>
        Nous lisons le calendrier des prix des compagnies pour chaque destination desservie depuis Bâle-Mulhouse, comme le
        ferait un voyageur : un prix par jour à l&apos;aller, un prix par jour au retour, sur toute la période ouverte à la
        réservation. Les grandes destinations sont relevées chaque semaine, les autres toutes les deux semaines. La date du
        relevé est indiquée à côté de chaque prix.
      </p>

      <h2>Comment nous assemblons les combos</h2>
      <p>
        Les compagnies vendent souvent l&apos;aller et le retour séparément. Nous assemblons donc chaque aller avec chaque retour possible pour
        trois durées : le week-end (2 à 4 nuits), la semaine (5 à 8 nuits) et le long séjour (10 à 15 nuits). Pour chaque
        mois et chaque durée, nous gardons les trois combos les moins chers, à des dates espacées d&apos;au moins quatre
        jours. Un « mois » compte aussi les départs des cinq derniers jours du mois d&apos;avant et des cinq premiers jours
        du mois d&apos;après.
      </p>

      <h2>Le prix courant</h2>
      <p>
        Pour chaque mois et chaque durée, nous indiquons aussi le <strong>prix courant</strong> : le prix typique d&apos;un
        aller-retour, calculé à partir de tous les prix relevés. Nous prenons le prix situé au milieu de la liste plutôt
        qu&apos;une moyenne, pour qu&apos;un pic de prix (Noël, mois d&apos;août) ne fausse pas le chiffre. C&apos;est un repère
        pour juger un prix ce mois-là. Nous ne calculons pas de pourcentage de réduction : ce ne sont pas des promotions, seulement des prix
        constatés.
      </p>

      <h2>Ce que le prix comprend</h2>
      <p>
        L&apos;aller et le retour pour un adulte, taxes comprises. Les bagages inclus et le choix du siège dépendent de la
        politique de chaque compagnie : vérifiez-les sur son site avant de réserver.
      </p>

      <h2>Pourquoi le prix peut être différent quand vous cliquez</h2>
      <p>
        Les prix des vols changent souvent : un prix vu lors de notre relevé peut avoir monté, ou baissé. Le bouton ouvre le
        site de la compagnie aux bonnes dates ; c&apos;est là que vous voyez le prix du jour, avant de payer. Un relevé de plus
        de huit jours n&apos;est plus affiché.
      </p>

      <h2>Comment le site est financé</h2>
      <p>
        Nous ne touchons rien sur les liens vers les compagnies aériennes. Le site peut présenter des établissements partenaires (hôtels, parkings,
        navettes) : leurs encarts sont séparés des prix et portent toujours la mention « Partenaire ». Voir{' '}
        <Link href={href('/partenaires')}>devenir partenaire</Link>.
      </p>

      <p className="mt-10">
        <Link href={href('/prix')}>Voir tous les prix</Link>
      </p>
    </>
  );
}

function De({ airport, href }: BodyProps) {
  return (
    <>
      <p className="eyebrow">Transparenz</p>
      <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">Unsere Methode</h1>
      <p className="mt-4 text-lg">
        {SITE.name} ist eine unabhängige Website für Reisende im Dreiländereck. Wir verkaufen keine Tickets: Wir erfassen
        die Flugpreise ab dem {airport}, zeigen Ihnen die besten und leiten Sie zur Fluggesellschaft weiter, die den Flug durchführt.
      </p>

      <h2>Woher die Preise stammen</h2>
      <p>
        Wir lesen die Preiskalender der Fluggesellschaften für jedes Reiseziel ab Basel-Mulhouse, so wie es ein Reisender tun würde: ein
        Preis pro Tag für den Hinflug, ein Preis pro Tag für den Rückflug, über den gesamten buchbaren Zeitraum. Große
        Reiseziele werden jede Woche erfasst, die anderen alle zwei Wochen. Das Datum der Erfassung steht neben jedem Preis.
      </p>

      <h2>Wie wir die Kombis bilden</h2>
      <p>
        Fluggesellschaften verkaufen Hin- und Rückflug oft einzeln. Wir kombinieren daher jeden Hinflug mit jedem möglichen Rückflug für drei
        Reisedauern: Wochenende (2 bis 4 Nächte), Woche (5 bis 8 Nächte) und längere Reise (10 bis 15 Nächte). Für jeden
        Monat und jede Dauer behalten wir die drei günstigsten Kombis mit mindestens vier Tagen Abstand. Ein „Monat“ umfasst
        auch Abflüge in den letzten fünf Tagen des Vormonats und den ersten fünf Tagen des Folgemonats.
      </p>

      <h2>Der übliche Preis</h2>
      <p>
        Für jeden Monat und jede Dauer zeigen wir auch den <strong>üblichen Preis</strong>: den typischen Preis für Hin- und
        Rückflug, berechnet aus allen erfassten Preisen. Wir nehmen den Preis in der Mitte der Liste statt eines
        Durchschnitts, damit Preisspitzen (Weihnachten, August) das Ergebnis nicht verfälschen. So können Sie einen Preis in
        diesem Monat einschätzen. Wir berechnen keine Rabatt-Prozentsätze: Es sind keine Aktionen, sondern festgestellte Preise.
      </p>

      <h2>Was im Preis enthalten ist</h2>
      <p>
        Hin- und Rückflug für einen Erwachsenen, inklusive Steuern. Welches Gepäck enthalten ist und ob die Sitzplatzwahl
        etwas kostet, hängt von der jeweiligen Fluggesellschaft ab: Prüfen Sie es vor der Buchung auf ihrer Website.
      </p>

      <h2>Warum der Preis beim Klick abweichen kann</h2>
      <p>
        Flugpreise ändern sich oft: Ein bei unserer Erfassung gesehener Preis kann gestiegen oder gesunken sein. Der
        Button öffnet die Website der Fluggesellschaft mit den richtigen Daten; dort sehen Sie den aktuellen Preis vor dem Bezahlen.
        Erfassungen, die älter als acht Tage sind, werden nicht mehr angezeigt.
      </p>

      <h2>Wie sich die Website finanziert</h2>
      <p>
        Für Links zu Fluggesellschaften erhalten wir nichts. Die Website kann Partnerbetriebe vorstellen (Hotels, Parkplätze, Shuttles):
        Diese Hinweise sind von den Preisen getrennt und immer als „Partner“ gekennzeichnet. Siehe{' '}
        <Link href={href('/partenaires')}>Partner werden</Link>.
      </p>

      <p className="mt-10">
        <Link href={href('/prix')}>Alle Preise ansehen</Link>
      </p>
    </>
  );
}

function En({ airport, href }: BodyProps) {
  return (
    <>
      <p className="eyebrow">Transparency</p>
      <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">Our method</h1>
      <p className="mt-4 text-lg">
        {SITE.name} is an independent site for travellers in the three-border region. We don&apos;t sell tickets: we check
        flight prices from {airport}, show you the best ones and send you to the airline that operates the flight.
      </p>

      <h2>Where the prices come from</h2>
      <p>
        We read the airlines&apos; fare calendars for every destination served from Basel-Mulhouse, just as a traveller would:
        one price per day outbound, one price per day for the return, over the whole period open for booking. Major
        destinations are checked every week, the others every two weeks. The check date is shown next to every price.
      </p>

      <h2>How we build the combos</h2>
      <p>
        Airlines often sell outbound and return flights separately. So we pair every outbound flight with every possible return
        for three lengths of stay: weekend (2 to 4 nights), one week (5 to 8 nights) and longer trip (10 to 15 nights). For
        each month and length, we keep the three cheapest combos, at least four days apart. A &ldquo;month&rdquo; also
        includes departures in the last five days of the previous month and the first five days of the next.
      </p>

      <h2>The usual price</h2>
      <p>
        For each month and length of stay we also show the <strong>usual price</strong>: the typical price of a return trip,
        worked out from all the prices we checked. We take the price in the middle of the list rather than an average, so
        that price peaks (Christmas, August) don&apos;t skew the figure. It is a benchmark to judge a price that month. We don&apos;t calculate
        discount percentages: these are not promotions, just observed prices.
      </p>

      <h2>What the price includes</h2>
      <p>
        The outbound and return flights for one adult, taxes included. Included baggage and seat selection depend on each
        airline&apos;s policy: check them on their website before booking.
      </p>

      <h2>Why the price may differ when you click</h2>
      <p>
        Flight prices change often: a price seen during our check may have gone up, or down. The button opens the
        airline&apos;s website with the right dates; that is where you see the current price, before paying. Checks older
        than eight days are no longer shown.
      </p>

      <h2>How the site is funded</h2>
      <p>
        We earn nothing on links to airlines. The site may feature partner businesses (hotels, parking, shuttles): their boxes
        are kept separate from the prices and are always labelled &ldquo;Partner&rdquo;. See{' '}
        <Link href={href('/partenaires')}>become a partner</Link>.
      </p>

      <p className="mt-10">
        <Link href={href('/prix')}>See all prices</Link>
      </p>
    </>
  );
}

export default async function MethodePage({ params }: Props) {
  const lang = await langParam(params);
  const airport = getDict(lang).place.airport;
  const href = (p: string) => localePath(lang, p);
  const Body = { fr: Fr, de: De, en: En }[lang];
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <Body airport={airport} href={href} />
      </div>
    </article>
  );
}
