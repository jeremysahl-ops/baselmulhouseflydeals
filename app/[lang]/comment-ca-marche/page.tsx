import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site';
import { alternatesFor, getDict, isLang, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

interface Props {
  params: Promise<{ lang: string }>;
}

const META: Record<Lang, { title: string; description: string }> = {
  fr: {
    title: 'Notre méthode : comment nous sélectionnons les deals',
    description: "D'où viennent les prix, comment nous décidons qu'un vol est un bon prix, et comment le site est financé.",
  },
  de: {
    title: 'Unsere Methode: So wählen wir die Deals aus',
    description: 'Woher die Preise stammen, wann ein Flug für uns ein guter Preis ist und wie sich die Website finanziert.',
  },
  en: {
    title: 'Our method: how we select deals',
    description: 'Where the prices come from, how we decide that a flight is a good price, and how the site is funded.',
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { ...META[lang], alternates: alternatesFor(lang, '/comment-ca-marche') };
}

function Fr({ airport }: { airport: string }) {
  return (
    <>
      <p className="eyebrow">Transparence</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Notre méthode</h1>
      <p className="mt-4 text-lg">
        {SITE.name} est un site indépendant. Nous ne vendons pas de billets : nous repérons les vols directs
        anormalement bon marché au départ de l&apos;{airport} et vous renvoyons vers un site de réservation.
      </p>

      <h2>D&apos;où viennent les prix</h2>
      <p>
        Deux fois par semaine, notre outil interroge une base de prix alimentée par les recherches de voyageurs sur un
        comparateur de vols. Pour chaque destination, il relève les allers-retours directs les moins chers sur les neuf
        mois à venir. Ce sont des prix <strong>constatés</strong> dans les 48 heures précédant le relevé, pas des prix
        garantis.
      </p>

      <h2>Ce que nous appelons un deal</h2>
      <ul>
        <li>Un vol <strong>direct</strong> à l&apos;aller comme au retour.</li>
        <li>Un <strong>aller-retour</strong> de 2 à 15 nuits sur place.</li>
        <li>
          Un prix au moins <strong>{SITE.minDiscount} % inférieur au prix habituel</strong> de la destination pour la
          saison du départ.
        </li>
        <li>Au plus trois deals par destination, sur des mois différents.</li>
      </ul>
      <p>
        Le « prix habituel » est une référence que nous tenons pour chaque destination et chaque saison. C&apos;est une
        estimation, pas une moyenne officielle : elle sert à écarter les prix simplement corrects et à ne garder que les
        écarts nets. Aucun deal n&apos;est choisi ou rédigé à la main, et aucun deal n&apos;est mis en avant contre
        rémunération.
      </p>

      <h2>Ce que le prix comprend</h2>
      <p>
        Le prix affiché est celui d&apos;un aller-retour pour une personne, taxes comprises, au tarif de base de la
        compagnie. Le bagage en soute, le choix du siège et, selon les compagnies, le bagage cabine standard sont en
        supplément.
      </p>

      <h2>Pourquoi le prix peut être différent quand vous cliquez</h2>
      <p>
        Les tarifs aériens changent plusieurs fois par jour, et un prix vu par un voyageur hier peut avoir disparu
        aujourd&apos;hui. Chaque deal indique la date à laquelle son prix a été constaté. Un deal que notre outil ne
        retrouve plus est retiré du site au bout de cinq jours environ.
      </p>

      <h2>Comment le site est financé</h2>
      <p>
        Le bouton de réservation ouvre {SITE.bookingPartner} avec un lien d&apos;affiliation. Si vous réservez, ce
        partenaire peut nous reverser une commission. Vous ne payez rien de plus, et cela n&apos;intervient pas dans la
        sélection : celle-ci dépend uniquement de l&apos;écart entre le prix constaté et le prix habituel. Vous pouvez
        aussi réserver directement auprès de la compagnie aérienne.
      </p>
      <p>
        Le site peut aussi présenter des établissements partenaires (hôtels, parkings, navettes). Leurs encarts sont
        séparés des deals et portent toujours la mention « Partenaire ». Voir{' '}
        <Link href="/partenaires">devenir partenaire</Link>.
      </p>

      <p className="mt-10">
        <Link href="/#deals">Voir les deals du moment</Link>
      </p>
    </>
  );
}

function De({ airport }: { airport: string }) {
  return (
    <>
      <p className="eyebrow">Transparenz</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Unsere Methode</h1>
      <p className="mt-4 text-lg">
        {SITE.name} ist eine unabhängige Website. Wir verkaufen keine Tickets: Wir spüren ungewöhnlich günstige
        Direktflüge ab dem {airport} auf und leiten Sie zu einer Buchungsseite weiter.
      </p>

      <h2>Woher die Preise stammen</h2>
      <p>
        Zweimal pro Woche fragt unser Tool eine Preisdatenbank ab, die aus den Suchanfragen von Reisenden auf einem
        Flugvergleichsportal gespeist wird. Für jedes Reiseziel erfasst es die günstigsten Direktflüge (Hin- und
        Rückflug) der kommenden neun Monate. Es handelt sich um Preise, die in den 48 Stunden vor der Abfrage{' '}
        <strong>festgestellt</strong> wurden, nicht um garantierte Preise.
      </p>

      <h2>Was wir einen Deal nennen</h2>
      <ul>
        <li>Ein <strong>Direktflug</strong> auf dem Hin- und dem Rückweg.</li>
        <li>Ein <strong>Hin- und Rückflug</strong> mit 2 bis 15 Nächten vor Ort.</li>
        <li>
          Ein Preis, der mindestens <strong>{SITE.minDiscount} % unter dem üblichen Preis</strong> des Reiseziels für
          die Reisesaison liegt.
        </li>
        <li>Höchstens drei Deals pro Reiseziel, in verschiedenen Monaten.</li>
      </ul>
      <p>
        Der „übliche Preis“ ist ein Richtwert, den wir für jedes Reiseziel und jede Saison führen. Er ist eine
        Schätzung, kein offizieller Durchschnitt: Er dient dazu, lediglich ordentliche Preise auszusortieren und nur
        deutliche Abweichungen zu behalten. Kein Deal wird von Hand ausgewählt oder verfasst, und kein Deal wird gegen
        Bezahlung hervorgehoben.
      </p>

      <h2>Was im Preis enthalten ist</h2>
      <p>
        Der angezeigte Preis gilt für einen Hin- und Rückflug für eine Person inklusive Steuern im Basistarif der
        Airline. Aufgabegepäck, Sitzplatzwahl und je nach Airline das normale Handgepäck kosten extra.
      </p>

      <h2>Warum der Preis beim Klick abweichen kann</h2>
      <p>
        Flugpreise ändern sich mehrmals täglich, und ein Preis, den ein Reisender gestern gesehen hat, kann heute
        verschwunden sein. Bei jedem Deal steht das Datum, an dem der Preis festgestellt wurde. Ein Deal, den unser
        Tool nicht mehr findet, wird nach etwa fünf Tagen von der Website entfernt.
      </p>

      <h2>Wie sich die Website finanziert</h2>
      <p>
        Die Buchungsschaltfläche öffnet {SITE.bookingPartner} über einen Partnerlink. Wenn Sie buchen, kann uns dieser
        Partner eine Provision zahlen. Sie zahlen nichts zusätzlich, und die Auswahl wird davon nicht beeinflusst: Sie
        hängt allein vom Abstand zwischen dem festgestellten und dem üblichen Preis ab. Sie können auch direkt bei der
        Airline buchen.
      </p>
      <p>
        Die Website kann außerdem Partnerbetriebe vorstellen (Hotels, Parkplätze, Shuttles). Deren Hinweise sind von
        den Deals getrennt und tragen stets den Vermerk „Partner“. Siehe{' '}
        <Link href="/de/partenaires">Partner werden</Link>.
      </p>

      <p className="mt-10">
        <Link href="/de#deals">Aktuelle Deals ansehen</Link>
      </p>
    </>
  );
}

function En({ airport }: { airport: string }) {
  return (
    <>
      <p className="eyebrow">Transparency</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Our method</h1>
      <p className="mt-4 text-lg">
        {SITE.name} is an independent site. We do not sell tickets: we spot unusually cheap direct flights from{' '}
        {airport} and send you to a booking site.
      </p>

      <h2>Where the prices come from</h2>
      <p>
        Twice a week, our tool queries a price database fed by travellers&apos; searches on a flight comparison site.
        For each destination, it collects the cheapest direct return flights over the next nine months. These are
        prices <strong>observed</strong> in the 48 hours before the check, not guaranteed prices.
      </p>

      <h2>What we call a deal</h2>
      <ul>
        <li>A <strong>direct</strong> flight both ways.</li>
        <li>A <strong>return trip</strong> with 2 to 15 nights at the destination.</li>
        <li>
          A price at least <strong>{SITE.minDiscount}% below the usual price</strong> for the destination in the
          season of departure.
        </li>
        <li>No more than three deals per destination, in different months.</li>
      </ul>
      <p>
        The &quot;usual price&quot; is a reference we keep for each destination and each season. It is an estimate,
        not an official average: it is used to rule out prices that are merely decent and keep only clear gaps. No
        deal is chosen or written by hand, and no deal is promoted in exchange for payment.
      </p>

      <h2>What the price includes</h2>
      <p>
        The price shown is for a return flight for one person, taxes included, at the airline&apos;s basic fare. Hold
        luggage, seat selection and, depending on the airline, a standard cabin bag cost extra.
      </p>

      <h2>Why the price may differ when you click</h2>
      <p>
        Air fares change several times a day, and a price seen by a traveller yesterday may be gone today. Each deal
        shows the date on which its price was observed. A deal that our tool can no longer find is removed from the
        site after about five days.
      </p>

      <h2>How the site is funded</h2>
      <p>
        The booking button opens {SITE.bookingPartner} through an affiliate link. If you book, this partner may pay
        us a commission. You pay nothing extra, and it plays no part in the selection, which depends solely on the gap
        between the observed price and the usual price. You can also book directly with the airline.
      </p>
      <p>
        The site may also feature partner businesses (hotels, car parks, shuttles). Their listings are kept separate
        from the deals and always carry the label &quot;Partner&quot;. See{' '}
        <Link href="/en/partenaires">become a partner</Link>.
      </p>

      <p className="mt-10">
        <Link href="/en#deals">See current deals</Link>
      </p>
    </>
  );
}

export default async function MethodePage({ params }: Props) {
  const lang = await langParam(params);
  const airport = getDict(lang).place.airport;
  const Body = { fr: Fr, de: De, en: En }[lang];
  return (
    <article className="container-page prose-page py-14">
      <div className="mx-auto max-w-2xl">
        <Body airport={airport} />
      </div>
    </article>
  );
}
