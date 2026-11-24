import type { Metadata } from 'next';
import Link from 'next/link';
import { airportSlug } from '@/lib/airports';
import { alternatesFor, isLang, localePath, type Lang } from '@/lib/i18n';
import { langParam } from '@/lib/i18n/params';

// Fiche pratique de l'EuroAirport : accès, parkings, nouveautés, travaux, histoire.
// Informations publiques vérifiées le 24/11/2026 (sources en bas de page) ; prix et horaires indicatifs.
// Page entièrement statique (quota ISR de Vercel, 22/11/2026).
export const revalidate = false;
export const dynamic = 'force-static';

interface Props {
  params: Promise<{ lang: string }>;
}

type Ligne = [nom: string, detail: string, prix: string];
interface Bloc { id: string; titre: string; texte?: string[]; lignes?: Ligne[]; entetes?: [string, string, string]; note?: string }
interface Plan { titre: string; france: string; suisse: string; terminal: string; anneaux: [string, string, string]; echelle: string; entetes: [string, string, string]; lignes: Ligne[]; note: string }
interface Copie {
  metaTitle: string; metaDescription: string; eyebrow: string; h1: string; lead: string;
  blocs: Bloc[]; montreal: string; sourcesTitre: string; maj: string;
  plan: Plan; independance: string; frise: [annee: string, texte: string][];
}

const COPIE: Record<Lang, Copie> = {
  fr: {
    metaTitle: "EuroAirport Bâle-Mulhouse : accès, parkings, nouveautés et travaux",
    metaDescription: "Venir à l'EuroAirport en bus ou en voiture, parkings officiels et privés avec navette, nouvelles lignes, agrandissement du terminal et histoire du plus ancien aéroport binational au monde.",
    eyebrow: 'Votre aéroport',
    h1: "L'EuroAirport en pratique",
    lead: "Le plus ancien aéroport binational au monde (celui de Rivera, entre l'Uruguay et le Brésil, a été déclaré binational en 2023) : construit sur le sol français, à Saint-Louis, il est géré ensemble par la France et la Suisse, avec une sortie de chaque côté. Voici l'essentiel pour y arriver sereinement.",
    blocs: [
      {
        id: 'acces', titre: "Venir à l'aéroport",
        entetes: ['Moyen', 'Détail', 'Prix indicatif'],
        lignes: [
          ['Bus 50 (côté suisse)', 'Gare de Bâle CFF ↔ aéroport, toutes les 7 à 10 minutes de 4 h 30 à minuit, environ 20 minutes de trajet.', 'environ 4,50 à 6,50 CHF'],
          ['Bus 11 (côté français)', 'Gare de Saint-Louis ↔ aéroport, de 5 h à minuit tous les jours, 10 à 15 minutes de trajet.', 'environ 3 €'],
          ['Voiture', "Autoroute A35 (sortie EuroAirport) côté France ; route douanière directe depuis Bâle côté Suisse. Choisissez le bon côté selon l'endroit où vous vous garez.", '—'],
          ['Taxi', "Stations devant le terminal, côté France et côté Suisse.", 'environ 50 CHF (Bâle centre)'],
        ],
      },
      {
        id: 'parkings', titre: 'Se garer',
        texte: [
          "Les parkings officiels de l'EuroAirport, côté France et côté Suisse, sont les plus proches du terminal. Certains se réservent uniquement en ligne.",
          "Pour un long séjour, des parkings privés proposent une navette vers le terminal. Comparez leurs prix et conditions sur leurs sites :",
        ],
        entetes: ['Parking', 'Navette', 'Prix'],
        lignes: [
          ['BluePark', 'environ 4 minutes', 'à vérifier'],
          ['AdoPark', 'environ 5 minutes', 'à vérifier'],
          ['NewAirpark', 'environ 10 à 14 minutes', 'à vérifier'],
        ],
        note: 'Durées de navette indicatives, relevées sur des comparateurs. Nous ne recommandons aucun de ces parkings et n’avons aucun lien commercial avec eux.',
      },
      {
        id: 'nouveautes', titre: 'Nouveautés et nouvelles lignes',
        texte: [
          "Été 2027 : Air Canada a annoncé relier Montréal à Bâle-Mulhouse du 16 juin au 23 octobre 2027, 4 vols par semaine en Airbus A321XLR, avec une cabine Signature à sièges-lits.",
          'Nous mettons à jour cette rubrique à chaque nouvelle ligne annoncée par les compagnies.',
        ],
      },
      {
        id: 'travaux', titre: 'Travaux : le terminal s’agrandit',
        texte: [
          "Les cantons de Bâle-Ville et Bâle-Campagne et l'aviation civile française ont validé l'extension du terminal : environ 157 millions d'euros, un nouveau bâtiment d'environ 14 000 m² sur la façade est et la rénovation d'environ 15 000 m² du terminal actuel, ainsi que des voies d'accès refaites.",
          "Les travaux doivent commencer fin 2027, pour une mise en service par étapes entre 2030 et 2031. Le but n'est pas d'accueillir plus d'avions, mais d'offrir plus de confort : par exemple, des contrôles de sûreté regroupés dans un seul bâtiment.",
          "Pendant le chantier, prévoyez un peu de marge : les accès et les dépose-minute peuvent être déplacés.",
        ],
      },
      {
        id: 'histoire', titre: 'Un peu d’histoire',
      },
    ],
    plan: {
      titre: 'Les parkings officiels et le temps à pied jusqu’au terminal',
      france: 'Secteur France', suisse: 'Secteur Suisse', terminal: 'Terminal',
      anneaux: ["accès direct", "3 à 5 min à pied", "6 à 8 min à pied"],
      echelle: 'Schéma indicatif, pas à l’échelle',
      entetes: ['Parking', 'Bon à savoir', 'À pied'],
      lignes: [["Express France et Suisse", "Courte durée, sans réservation.", "accès direct"], ["F1, S1 et S2", "Les plus proches du terminal.", "accès direct"], ["F3, F4, F5", "Secteur France, sur réservation.", "3, 4 et 5 min"], ["S12", "Secteur Suisse, sur réservation.", "5 min"], ["F6", "Secteur France.", "6 min"], ["S4 et S13", "Secteur Suisse.", "8 min"], ["F7 et S47", "Parkings relais, navette toutes les 20 min.", "navette : 5 min (F7), 10 min (S47)"]],
      note: "Temps publiés par l’aéroport, consultés le 24 novembre 2026. F : secteur France, S : secteur Suisse. Schéma simplifié : la position exacte n’est pas représentée, suivez la signalisation.",
    },
    frise: [
      ['1946', 'Le premier avion civil se pose le 2 mai, après deux mois de travaux. La France fournit le terrain, la Suisse finance.'],
      ['1949', 'Convention franco-suisse signée à Berne le 4 juillet : elle règle toujours le fonctionnement de l’aéroport.'],
      ['1970', 'Ouverture du terminal actuel : près de 700 000 passagers cette année-là.'],
      ['1985', 'Plus d’un million de passagers.'],
      ['2026', 'L’EuroAirport fête ses 80 ans.'],
    ],
    montreal: 'Voir la fiche Montréal',
    sourcesTitre: 'Sources',
    maj: 'Informations vérifiées le 24 novembre 2026. Horaires, prix et calendriers peuvent changer : vérifiez auprès de l’aéroport et des transporteurs avant de partir.',
    independance: "FlyBSL est un site d’information indépendant, édité à titre personnel et non commercial. Il n’est ni affilié à l’EuroAirport, ni à aucune compagnie, aucun parking ou transporteur cité ; les marques appartiennent à leurs titulaires. Informations fournies sans garantie : seules font foi celles des exploitants.",
  },
  de: {
    metaTitle: 'EuroAirport Basel-Mulhouse: Anreise, Parkplätze, Neuigkeiten und Bauarbeiten',
    metaDescription: 'Mit Bus oder Auto zum EuroAirport, offizielle und private Parkplätze mit Shuttle, neue Strecken, Terminalerweiterung und Geschichte des ältesten binationalen Flughafens der Welt.',
    eyebrow: 'Ihr Flughafen',
    h1: 'Der EuroAirport praktisch',
    lead: 'Der älteste binationale Flughafen der Welt (Rivera zwischen Uruguay und Brasilien wurde 2023 für binational erklärt): Er liegt auf französischem Boden in Saint-Louis, wird gemeinsam von Frankreich und der Schweiz betrieben und hat auf jeder Seite einen Ausgang. Das Wichtigste für eine entspannte Anreise.',
    blocs: [
      {
        id: 'acces', titre: 'Anreise zum Flughafen',
        entetes: ['Verkehrsmittel', 'Details', 'Richtpreis'],
        lignes: [
          ['Bus 50 (Schweizer Seite)', 'Bahnhof Basel SBB ↔ Flughafen, alle 7 bis 10 Minuten von 4.30 Uhr bis Mitternacht, etwa 20 Minuten Fahrt.', 'etwa 4.50 bis 6.50 CHF'],
          ['Bus 11 (französische Seite)', 'Bahnhof Saint-Louis ↔ Flughafen, täglich 5 bis 24 Uhr, 10 bis 15 Minuten Fahrt.', 'etwa 3 €'],
          ['Auto', 'Autobahn A35 (Ausfahrt EuroAirport) auf französischer Seite; direkte Zollstraße ab Basel auf Schweizer Seite. Wählen Sie die Seite je nach Parkplatz.', '—'],
          ['Taxi', 'Taxistände vor dem Terminal, auf französischer und Schweizer Seite.', 'etwa 50 CHF (Basel Zentrum)'],
        ],
      },
      {
        id: 'parkings', titre: 'Parken',
        texte: [
          'Die offiziellen Parkplätze des EuroAirport auf französischer und Schweizer Seite liegen am nächsten am Terminal. Einige sind nur online buchbar.',
          'Für längere Reisen bieten private Parkplätze einen Shuttle zum Terminal. Vergleichen Sie Preise und Bedingungen auf deren Websites:',
        ],
        entetes: ['Parkplatz', 'Shuttle', 'Preis'],
        lignes: [
          ['BluePark', 'etwa 4 Minuten', 'zu prüfen'],
          ['AdoPark', 'etwa 5 Minuten', 'zu prüfen'],
          ['NewAirpark', 'etwa 10 bis 14 Minuten', 'zu prüfen'],
        ],
        note: 'Ungefähre Shuttle-Zeiten laut Vergleichsportalen. Wir empfehlen keinen dieser Parkplätze und haben keine Geschäftsbeziehung zu ihnen.',
      },
      {
        id: 'nouveautes', titre: 'Neuigkeiten und neue Strecken',
        texte: [
          'Sommer 2027 (angekündigt): Air Canada fliegt vom 16. Juni bis 23. Oktober 2027 viermal pro Woche von Montreal nach Basel-Mulhouse, mit einem Airbus A321XLR und der Signature-Kabine mit Liegesitzen.',
          'Wir aktualisieren diesen Abschnitt bei jeder neu angekündigten Strecke.',
        ],
      },
      {
        id: 'travaux', titre: 'Bauarbeiten: Das Terminal wird erweitert',
        texte: [
          'Die Kantone Basel-Stadt und Basel-Landschaft sowie die französische Luftfahrtbehörde haben die Terminalerweiterung genehmigt: rund 157 Millionen Euro, ein Neubau von etwa 14 000 m² an der Ostfassade, die Renovierung von etwa 15 000 m² des bestehenden Terminals und neue Zufahrten.',
          'Baubeginn ist Ende 2027, die schrittweise Inbetriebnahme ist für 2030 bis 2031 geplant. Ziel sind nicht mehr Flugzeuge, sondern mehr Komfort, zum Beispiel zusammengelegte Sicherheitskontrollen in einem Gebäude.',
          'Planen Sie während der Bauzeit etwas mehr Zeit ein: Zufahrten und Kurzzeit-Haltezonen können verlegt werden.',
        ],
      },
      {
        id: 'histoire', titre: 'Ein wenig Geschichte',
      },
    ],
    plan: {
      titre: 'Die offiziellen Parkplätze und die Gehzeit zum Terminal',
      france: 'Sektor Frankreich', suisse: 'Sektor Schweiz', terminal: 'Terminal',
      anneaux: ["direkter Zugang", "3–5 Min. zu Fuß", "6–8 Min. zu Fuß"],
      echelle: 'Schematische Darstellung, nicht maßstabsgetreu',
      entetes: ['Parkplatz', 'Gut zu wissen', 'Zu Fuß'],
      lignes: [["Express Frankreich und Schweiz", "Kurzparken, ohne Reservierung.", "direkt"], ["F1, S1 und S2", "Am nächsten zum Terminal.", "direkt"], ["F3, F4, F5", "Sektor Frankreich, mit Reservierung.", "3, 4 und 5 Min."], ["S12", "Sektor Schweiz, mit Reservierung.", "5 Min."], ["F6", "Sektor Frankreich.", "6 Min."], ["S4 und S13", "Sektor Schweiz.", "8 Min."], ["F7 und S47", "Park and Ride, Shuttle alle 20 Min.", "Shuttle: 5 Min. (F7), 10 Min. (S47)"]],
      note: "Zeiten laut Flughafen, abgerufen am 24. November 2026. F: Sektor Frankreich, S: Sektor Schweiz. Vereinfachtes Schema ohne genaue Lage; folgen Sie der Beschilderung.",
    },
    frise: [
      ['1946', 'Am 2. Mai landet nach zwei Monaten Bauzeit das erste Zivilflugzeug. Frankreich stellt das Gelände, die Schweiz finanziert.'],
      ['1949', 'Französisch-schweizerischer Staatsvertrag, am 4. Juli in Bern unterzeichnet: Er regelt den Betrieb bis heute.'],
      ['1970', 'Eröffnung des heutigen Terminals: fast 700 000 Passagiere in diesem Jahr.'],
      ['1985', 'Über eine Million Passagiere.'],
      ['2026', 'Der EuroAirport feiert seinen 80. Geburtstag.'],
    ],
    montreal: 'Zur Seite Montreal',
    sourcesTitre: 'Quellen',
    maj: 'Stand: 24. November 2026. Fahrpläne, Preise und Termine können sich ändern: Prüfen Sie vor der Reise beim Flughafen und den Verkehrsbetrieben.',
    independance: "FlyBSL ist eine unabhängige, privat und nicht gewerblich betriebene Informationsseite. Es besteht keine Verbindung zum EuroAirport oder zu den genannten Fluggesellschaften, Parkplätzen oder Verkehrsbetrieben; Marken gehören ihren Inhabern. Angaben ohne Gewähr: Maßgeblich sind die Angaben der Betreiber.",
  },
  en: {
    metaTitle: 'EuroAirport Basel-Mulhouse: getting there, parking, news and works',
    metaDescription: 'Getting to EuroAirport by bus or car, official and private parking with shuttle, new routes, terminal expansion and the history of the world’s oldest binational airport.',
    eyebrow: 'Your airport',
    h1: 'EuroAirport made simple',
    lead: 'The oldest binational airport in the world (Rivera, on the Uruguay–Brazil border, was declared binational in 2023): it stands on French soil in Saint-Louis, is run jointly by France and Switzerland, and has an exit on each side. Here is what you need for a stress-free start.',
    blocs: [
      {
        id: 'acces', titre: 'Getting to the airport',
        entetes: ['Mode', 'Details', 'Approx. price'],
        lignes: [
          ['Bus 50 (Swiss side)', 'Basel SBB station ↔ airport, every 7 to 10 minutes from 4:30am to midnight, about 20 minutes.', 'about CHF 4.50 to 6.50'],
          ['Bus 11 (French side)', 'Saint-Louis station ↔ airport, 5am to midnight daily, 10 to 15 minutes.', 'about €3'],
          ['Car', 'A35 motorway (EuroAirport exit) on the French side; direct customs road from Basel on the Swiss side. Pick the side that matches your car park.', '—'],
          ['Taxi', 'Taxi ranks outside the terminal, on both the French and Swiss sides.', 'about CHF 50 (central Basel)'],
        ],
      },
      {
        id: 'parkings', titre: 'Parking',
        texte: [
          'EuroAirport’s official car parks, on the French and Swiss sides, are closest to the terminal. Some can only be booked online.',
          'For longer trips, private car parks run a shuttle to the terminal. Compare prices and terms on their own websites:',
        ],
        entetes: ['Car park', 'Shuttle', 'Price'],
        lignes: [
          ['BluePark', 'about 4 minutes', 'to check'],
          ['AdoPark', 'about 5 minutes', 'to check'],
          ['NewAirpark', 'about 10 to 14 minutes', 'to check'],
        ],
        note: 'Indicative shuttle times from comparison sites. We do not recommend any of these car parks and have no commercial link with them.',
      },
      {
        id: 'nouveautes', titre: 'News and new routes',
        texte: [
          'Summer 2027 (announced): Air Canada links Montreal and Basel-Mulhouse from 16 June to 23 October 2027, four flights a week on an Airbus A321XLR with lie-flat Signature seats.',
          'We update this section whenever an airline announces a new route.',
        ],
      },
      {
        id: 'travaux', titre: 'Works: the terminal is growing',
        texte: [
          'The cantons of Basel-Stadt and Basel-Landschaft and the French civil aviation authority have approved the terminal extension: about €157 million, a new building of about 14,000 m² on the east side, renovation of about 15,000 m² of the current terminal and rebuilt access roads.',
          'Work is due to start at the end of 2027, with phased opening between 2030 and 2031. The aim is not more flights but more comfort, for example security checks grouped in a single building.',
          'Allow a little extra time during the works: access roads and drop-off areas may move.',
        ],
      },
      {
        id: 'histoire', titre: 'A little history',
      },
    ],
    plan: {
      titre: 'Official car parks and walking time to the terminal',
      france: 'French sector', suisse: 'Swiss sector', terminal: 'Terminal',
      anneaux: ["direct access", "3–5 min walk", "6–8 min walk"],
      echelle: 'Indicative diagram, not to scale',
      entetes: ['Car park', 'Good to know', 'On foot'],
      lignes: [["Express France and Switzerland", "Short stay, no booking.", "direct"], ["F1, S1 and S2", "Closest to the terminal.", "direct"], ["F3, F4, F5", "French sector, booking only.", "3, 4 and 5 min"], ["S12", "Swiss sector, booking only.", "5 min"], ["F6", "French sector.", "6 min"], ["S4 and S13", "Swiss sector.", "8 min"], ["F7 and S47", "Park and ride, shuttle every 20 min.", "shuttle: 5 min (F7), 10 min (S47)"]],
      note: "Times published by the airport, viewed on 24 November 2026. F: French sector, S: Swiss sector. Simplified diagram, exact locations not shown; follow the signs.",
    },
    frise: [
      ['1946', 'On 2 May the first civil aircraft lands, after two months of building work. France provides the land, Switzerland pays.'],
      ['1949', 'Franco-Swiss treaty signed in Bern on 4 July: it still governs the airport today.'],
      ['1970', 'Today’s terminal opens: nearly 700,000 passengers that year.'],
      ['1985', 'More than a million passengers.'],
      ['2026', 'EuroAirport celebrates its 80th birthday.'],
    ],
    montreal: 'See the Montreal page',
    sourcesTitre: 'Sources',
    maj: 'Information checked on 24 November 2026. Timetables, prices and schedules can change: check with the airport and operators before you travel.',
    independance: "FlyBSL is an independent information site, run privately and non-commercially. It is not affiliated with EuroAirport or with any airline, car park or operator mentioned; trademarks belong to their owners. Information is given without guarantee: only the operators’ own information is authoritative.",
  },
};

const SOURCES: [string, string][] = [
  ['EuroAirport – bus', 'https://www.euroairport.com/en/transport'],
  ['EuroAirport – parkings', 'https://www.euroairport.com/en/parkings'],
  ['L’Écho touristique – chantier du terminal', 'https://www.lechotouristique.com/transport/bale-mulhouse-un-chantier-de-157-millions-d-euros-valide-pour-restructurer-le-terminal-d-ici-2031'],
  ['Air Journal – Air Canada Montréal–Bâle-Mulhouse', 'https://www.air-journal.fr/2026-09-04-air-canada-annonce-la-ligne-nice-toronto-et-montreal-bale-mulhouse-parmi-ses-nouvelles-liaisons-internationales-en-2027-5277316.html'],
  ['EuroAirport – 75 ans du traité franco-suisse', 'https://www.euroairport.com/en/event/new-tower-banner-euroairport-75-years-franco-swiss-treaty.html'],
  ['EuroAirport – taxis', 'https://euroairport.com/en/passengers-visitors/access-parking/access/taxi.html'],
  ['Aéroport binational de Rivera (Uruguay–Brésil)', 'https://en.wikipedia.org/wiki/Rivera_International_Airport'],
  ['Parkmundo – parkings privés', 'https://www.parkmundo.fr/blog/top-5-parking-aeroport-bale-mulhouse-pas-cher'],
];

export function generateStaticParams() {
  return (['fr', 'de', 'en'] as const).map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return { title: COPIE[lang].metaTitle, description: COPIE[lang].metaDescription, alternates: alternatesFor(lang, '/euroairport') };
}

// Petits pictogrammes (émojis, en couleur sur tous les systèmes ; les drapeaux, eux, sont des images).
const ICONE_BLOC: Record<string, string> = { acces: '🧭', parkings: '🅿️', nouveautes: '✈️', travaux: '🏗️', histoire: '📜' };
function iconeLigne(nom: string): string {
  if (/^Bus/.test(nom)) return '🚌';
  if (/^(Voiture|Auto|Car)$/.test(nom)) return '🚗';
  if (/^Taxi/.test(nom)) return '🚕';
  if (/Park/i.test(nom)) return '🚐';
  return '🅿️';
}
const Drapeau = ({ iso }: { iso: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/drapeaux/${iso}.svg`} alt="" width={20} height={15} className="inline-block h-[15px] w-5 rounded-[2px] align-[-2px] ring-1 ring-black/10" />
);

function Tableau({ entetes, lignes, icone }: { entetes: [string, string, string]; lignes: Ligne[]; icone?: (nom: string) => string }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
          <tr>{entetes.map((e) => <th key={e} className="px-4 py-3 font-semibold">{e}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-line">
          {lignes.map(([nom, detail, prix]) => (
            <tr key={nom} className="align-top">
              <td className="whitespace-nowrap px-4 py-3 font-semibold text-ink">
                {icone && <span className="mr-2" aria-hidden="true">{icone(nom)}</span>}
                {nom}
              </td>
              <td className="px-4 py-3 leading-relaxed text-ink-soft">{detail}</td>
              <td className="whitespace-nowrap px-4 py-3 text-ink">{prix}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Schéma des parkings officiels : terminal au centre, France à gauche, Suisse à droite, anneaux de temps à pied. */
function PlanParkings({ p }: { p: Plan }) {
  const cx = 320, cy = 262;
  const R = [72, 132, 202];
  const pastille = (x: number, y: number, txt: string, fonce = true) => (
    <g key={txt}>
      <rect x={x - 22} y={y - 13} width={44} height={26} rx={6} fill={fonce ? '#0d1b2e' : '#ffc72c'} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={800} fill={fonce ? '#ffc72c' : '#0d1b2e'}>{txt}</text>
    </g>
  );
  const sur = (r: number, deg: number): [number, number] => [cx + r * Math.cos((deg * Math.PI) / 180), cy - r * Math.sin((deg * Math.PI) / 180)];
  return (
    <figure className="mt-6 rounded-xl border border-line bg-white p-4">
      <figcaption className="mb-2 text-sm font-semibold text-ink">🚶 {p.titre}</figcaption>
      <svg viewBox="0 0 640 300" className="h-auto w-full" role="img" aria-label={p.titre}>
        <rect x={0} y={0} width={320} height={300} fill="#eef3f9" />
        <rect x={320} y={0} width={320} height={300} fill="#fbf1f1" />
        <line x1={320} y1={8} x2={320} y2={300} stroke="#94a3b8" strokeDasharray="4 5" />
        <image href="/drapeaux/fr.svg" x={14} y={12} width={24} height={18} />
        <text x={44} y={26} fontSize={14} fontWeight={700} fill="#0d1b2e">{p.france}</text>
        <image href="/drapeaux/ch.svg" x={602} y={12} width={24} height={18} />
        <text x={596} y={26} fontSize={14} fontWeight={700} fill="#0d1b2e" textAnchor="end">{p.suisse}</text>
        {R.map((r, i) => (
          <g key={r}>
            <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke="#c7a54a" strokeWidth={1.4} strokeDasharray="3 5" />
            <text x={cx} y={cy - r - 6} textAnchor="middle" fontSize={11} fill="#6b5a2e" fontWeight={600}>{p.anneaux[i]}</text>
          </g>
        ))}
        <rect x={cx - 48} y={cy - 22} width={96} height={34} rx={6} fill="#0d1b2e" />
        <text x={cx} y={cy} textAnchor="middle" fontSize={13} fontWeight={800} fill="#ffffff">✈ {p.terminal}</text>
        {pastille(...sur(R[0], 178), 'EXP', false)}
        {pastille(...sur(R[0], 140), 'F1')}
        {pastille(...sur(R[0], 55), 'S1')}
        {pastille(...sur(R[0], 25), 'S2')}
        {pastille(...sur(R[1], 165), 'F3')}
        {pastille(...sur(R[1], 142), 'F4')}
        {pastille(...sur(R[1], 119), 'F5')}
        {pastille(...sur(R[1], 35), 'S12')}
        {pastille(...sur(R[2], 150), 'F6')}
        {pastille(...sur(R[2], 55), 'S13')}
        {pastille(...sur(R[2], 28), 'S4')}
        <text x={632} y={294} textAnchor="end" fontSize={10} fill="#64748b">{p.echelle}</text>
      </svg>
    </figure>
  );
}

export default async function EuroAirportPage({ params }: Props) {
  const lang = await langParam(params);
  const t = COPIE[lang];
  return (
    <div className="container-page max-w-4xl py-10">
      <p className="eyebrow">{t.eyebrow}</p>
      <h1 className="display mt-2 text-5xl text-ink sm:text-6xl">{t.h1}</h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.lead}</p>

      <nav className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
        {t.blocs.map((b) => (
          <a key={b.id} href={`#${b.id}`} className="rounded-full border border-line bg-white px-3 py-1.5 text-ink-soft hover:text-ink"><span aria-hidden="true">{ICONE_BLOC[b.id]}</span> {b.titre}</a>
        ))}
      </nav>

      {t.blocs.map((b) => (
        <section key={b.id} id={b.id} className="mt-12 scroll-mt-24" aria-labelledby={`${b.id}-titre`}>
          <h2 id={`${b.id}-titre`} className="display text-4xl text-ink"><span className="mr-3 align-[0.1em] text-3xl" aria-hidden="true">{ICONE_BLOC[b.id]}</span>{b.titre}</h2>
          {b.texte?.slice(0, b.id === 'parkings' ? 1 : undefined).map((p, i) => <p key={i} className="mt-4 leading-relaxed text-ink-soft">{p}</p>)}
          {b.id === 'parkings' && (
            <>
              <PlanParkings p={t.plan} />
              <Tableau entetes={t.plan.entetes} lignes={t.plan.lignes} icone={() => '🅿️'} />
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{t.plan.note}</p>
              {b.texte?.slice(1).map((p, i) => <p key={i} className="mt-6 leading-relaxed text-ink-soft">🚐 {p}</p>)}
            </>
          )}
          {b.id === 'histoire' && (
            <ol className="mt-6 border-l-2 border-flap pl-6">
              {t.frise.map(([annee, texte]) => (
                <li key={annee} className="relative pb-5 last:pb-0">
                  <span className="absolute -left-[33px] top-0.5 grid h-4 w-4 place-items-center rounded-full bg-flap ring-4 ring-surface" aria-hidden="true" />
                  <span className="font-board text-sm font-bold text-ink">{annee}</span>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{texte}</p>
                </li>
              ))}
            </ol>
          )}
          {b.lignes && b.entetes && <Tableau entetes={b.entetes} lignes={b.lignes} icone={iconeLigne} />}
          {b.note && <p className="mt-2 text-xs leading-relaxed text-ink-muted">{b.note}</p>}
          {b.id === 'nouveautes' && (
            <Link href={localePath(lang, `/vols/${airportSlug('YUL')}`)} className="mt-4 inline-block font-semibold text-ink underline underline-offset-4">
              <Drapeau iso="ca" /> {t.montreal} →
            </Link>
          )}
        </section>
      ))}

      <section className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-ink-muted">
        <p>{t.maj}</p>
        <p className="mt-2">{t.independance}</p>
        <h2 className="mt-4 font-semibold uppercase tracking-wide">{t.sourcesTitre}</h2>
        <ul className="mt-2 space-y-1">
          {SOURCES.map(([nom, url]) => (
            <li key={url}><a href={url} target="_blank" rel="noopener nofollow" className="underline hover:text-ink">{nom}</a></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
