// Texte der Website auf Deutsch. Gleiche Form wie fr.ts (die Referenz).
// Bei Ortsnamen vermeiden wir « in/auf » (Städte und Inseln), daher Formulierungen mit Doppelpunkt.
import type { Dict } from './fr';

export const de: Dict = {
  meta: {
    defaultTitle: 'Günstige Direktflüge ab Basel-Mulhouse',
    description:
      'Direktflüge zu wirklich niedrigen Preisen ab dem EuroAirport Basel-Mulhouse: Jeder Preis wird mit dem üblichen Tarif des Reiseziels verglichen. Unabhängige Website, zweimal pro Woche aktualisiert.',
    ogDescription: 'Nur wirklich niedrige Preise, verglichen mit dem üblichen Tarif jedes Reiseziels.',
  },
  place: {
    airport: 'EuroAirport Basel-Mulhouse-Freiburg',
    city: 'Basel-Mulhouse',
  },
  common: {
    skip: 'Zum Inhalt springen',
    tagline: 'Flug-Schnäppchen aus dem Dreiländereck',
    logoSub: 'Deals · Dreiländereck',
    logoAria: 'FlyBSL, Startseite',
    home: 'Startseite',
    breadcrumb: 'Brotkrumennavigation',
    partnerBadge: 'Partner',
  },
  nav: {
    destinations: 'Reiseziele',
    method: 'Methode',
    alerts: 'Preisalarm erhalten',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    main: 'Hauptnavigation',
    mobile: 'Mobile Navigation',
    language: 'Sprache',
  },
  sections: {
    'city-trip': {
      label: 'Wochenenden',
      title: 'Wochenenden und Kurztrips',
      hint: '2 bis 4 Nächte',
      intro: 'Direktflüge für 2 bis 4 Nächte: ideal für ein verlängertes Wochenende in Europa.',
    },
    vol: {
      label: 'Eine Woche',
      title: 'Eine Woche vor Ort',
      hint: '5 bis 8 Nächte',
      intro: 'Direktflüge für 5 bis 8 Nächte vor Ort, das klassische Urlaubsformat.',
    },
    sejour: {
      label: 'Lange Reisen',
      title: 'Lange Aufenthalte',
      hint: '10 bis 15 Nächte',
      intro: 'Direktflüge für Aufenthalte von 10 bis 15 Nächten, wenn Sie richtig abschalten möchten.',
    },
    'derniere-minute': {
      label: 'Bald abfliegen',
      title: 'Abflug in den nächsten 30 Tagen',
      hint: 'in den nächsten 30 Tagen',
      intro: 'Deals mit Abflug in den nächsten 30 Tagen, vom nächsten bis zum spätesten Termin.',
    },
  },
  sectionPage: {
    eyebrow: (city, hint) => `Ab ${city} · ${hint}`,
    metaTitle: (title, city) => `${title} ab ${city}`,
  },
  footer: {
    about: (airport) =>
      `Unabhängige Website, die Direktflüge zu wirklich niedrigen Preisen ab dem ${airport} aufspürt. Wir verkaufen keine Tickets: Die Buchung erfolgt bei unserem Partner.`,
    dealsHeading: 'Die Deals',
    dealsAria: 'Rubriken',
    allDeals: 'Alle Deals',
    infoHeading: 'Informationen',
    guides: 'Reiseführer nach Reiseziel',
    method: 'Unsere Methode',
    alerts: 'Preisalarm per E-Mail',
    partner: 'Partner werden',
    legal: 'Impressum',
    privacy: 'Datenschutz',
    contact: 'Kontakt',
    madeIn: 'Im Elsass entwickelt.',
    affiliateNote:
      'Die Buchungslinks sind Partnerlinks: Wir können dafür eine Provision erhalten, ohne Mehrkosten für Sie.',
  },
  card: {
    direct: 'Direktflug',
    usualPrice: 'Üblicher Preis',
    roundTrip: 'Hin- und Rückflug',
    seeDeal: 'Deal ansehen',
    photoAlt: (label) => `Ansicht: ${label}`,
    nights: (n) => `${n} ${n > 1 ? 'Nächte' : 'Nacht'}`,
    routeLine: (city, label) => `${city} → ${label}`,
  },
  explorer: {
    sortBest: 'Größter Rabatt',
    sortPrice: 'Preis aufsteigend',
    sortDate: 'Nächster Abflug',
    sortBy: 'Sortieren nach',
    emptyTitle: 'Zurzeit kein Deal in dieser Rubrik',
    emptyText:
      'Wir veröffentlichen nur wirklich niedrige Preise. Die Flüge werden zweimal pro Woche geprüft: Schauen Sie bald wieder vorbei oder erhalten Sie die nächsten Deals per E-Mail.',
    monthsAria: 'Abflugmonat',
    allMonths: 'Alle Monate',
    budgetAria: 'Maximales Budget',
    allBudgets: 'Alle Budgets',
    upTo: (b) => `Bis ${b} €`,
    count: (shown, total) => `${shown} ${shown === 1 ? 'Deal' : 'Deals'}${shown !== total ? ` von ${total}` : ''}`,
    noMatch: 'Kein Deal entspricht diesen Filtern',
    reset: 'Filter zurücksetzen',
  },
  newsletter: {
    emailLabel: 'E-Mail-Adresse',
    placeholder: 'ihre@email.de',
    submit: 'Deals erhalten',
    sending: 'Wird gesendet…',
    done: (email) => `Vielen Dank. Sie erhalten unsere nächsten Deals an ${email}.`,
    invalid: 'Diese E-Mail-Adresse scheint ungültig zu sein.',
    failed: 'Die Anmeldung ist zurzeit nicht möglich. Bitte versuchen Sie es später noch einmal.',
    note: 'Eine E-Mail, wenn gute Preise auftauchen, mehr nicht. Abmeldung jederzeit möglich.',
    privacy: 'Datenschutz',
  },
  home: {
    h1: (city) => `Direktflüge zu wirklich niedrigen Preisen ab ${city}`,
    lead: (min) =>
      `Wir vergleichen jeden Flug mit dem üblichen Preis seines Reiseziels und veröffentlichen nur Flüge, die mindestens ${min} % günstiger sind. Keine Scheinangebote.`,
    ctaDeals: 'Aktuelle Deals ansehen',
    ctaMethod: 'Unsere Methode',
    statDeals: 'Deals online',
    statBest: 'Größter Rabatt',
    statFrom: 'Hin und zurück ab',
    notAvailable: 'k. A.',
    dealsHeading: 'Die aktuellen Deals',
    lastUpdate: (date) => `Letzte Preisabfrage: ${date}`,
    sectionsAria: 'Rubriken',
    partnersAria: 'Partner',
    hotelsHeading: 'Aktuelle Hotel-Tipps',
    hotelsText: (city) =>
      `Von uns entdeckte Angebote, direkt auf den Websites der Hotels, in Städten mit Direktflug ab ${city}.`,
    stepsHeading: 'So wählen wir die Deals aus',
    steps: (min, partner) => [
      {
        title: 'Wir erfassen die Preise',
        text: 'Zweimal pro Woche erfasst unser Tool die Preise für Direktflüge (Hin- und Rückflug) zu rund fünfzig Reisezielen für die kommenden neun Monate.',
      },
      {
        title: 'Wir vergleichen mit dem üblichen Preis',
        text: `Jeder Preis wird mit dem für die Saison üblichen Tarif des Reiseziels verglichen. Wir behalten nur Flüge, die mindestens ${min} % günstiger sind.`,
      },
      {
        title: 'Sie buchen bei unserem Partner',
        text: `Ein Klick öffnet die Suche auf ${partner}, bereits mit den richtigen Daten ausgefüllt. Dort prüfen Sie den Tagespreis, bevor Sie buchen.`,
      },
    ],
    newsletterHeading: 'Erhalten Sie die Deals, bevor sie verschwinden',
    newsletterText: (city) =>
      `Die besten Preise halten selten länger als ein paar Tage. Wir schreiben Ihnen nur, wenn wirklich gute Preise ab ${city} auftauchen.`,
    faqHeading: 'Häufige Fragen',
    faq: [
      {
        q: 'Sind die angezeigten Preise garantiert?',
        a: 'Nein. Es handelt sich um Preise, die an dem bei jedem Deal angegebenen Datum festgestellt wurden. Flugpreise ändern sich mehrmals täglich: Maßgeblich ist der Preis, den die Buchungsseite zum Zeitpunkt der Zahlung anzeigt.',
      },
      {
        q: 'Was ist im Preis enthalten?',
        a: 'Der Hin- und Rückflug für eine Person inklusive Steuern, in der Regel mit einem kleinen Handgepäckstück. Aufgabegepäck, Sitzplatzwahl und je nach Airline das normale Handgepäck kosten extra.',
      },
      {
        q: 'Wie finanziert sich die Website?',
        a: 'Über Partnerlinks: Wenn Sie nach einem Klick auf einen unserer Links buchen, kann unser Partner uns eine Provision zahlen. Das ändert weder Ihren Preis noch unsere Auswahl, die allein auf dem Abstand zum üblichen Preis beruht.',
      },
      {
        q: 'Von wo starten die Flüge?',
        a: 'Vom EuroAirport Basel-Mulhouse-Freiburg (Codes BSL, MLH und EAP) in Saint-Louis, gut erreichbar aus dem Elsass, der Region Basel und Südbaden.',
      },
    ],
  },
  deal: {
    notFoundTitle: 'Deal nicht gefunden',
    metaTitle: (city, label, price) => `${city} → ${label} für ${price} hin und zurück`,
    metaDescription: (city, label, price, percent, date) =>
      `Direktflug hin und zurück nach ${label} ab ${city} für ${price}${
        percent ? `, ${percent} % unter dem üblichen Preis` : ''
      }. Preis festgestellt am ${date}.`,
    eyebrow: (city) => `Direktflug ab ${city}`,
    detailsAria: 'Flugdetails',
    departure: 'Hinflug',
    return: 'Rückflug',
    stay: 'Aufenthalt',
    flightType: 'Flugart',
    flightTypeValue: 'Direkt, hin und zurück',
    airline: 'Airline',
    airport: 'Abflughafen',
    seenOn: 'Preis festgestellt am',
    tipHeading: 'Tipp für diese Reise',
    picksAria: 'Hotel-Tipps',
    picksHeading: (label) => `Übernachten: unsere Hotel-Tipps für ${label}`,
    picksText: 'Von uns entdeckt, direkt auf der Website des Hotels.',
    noCommission: 'Für diese Links erhalten wir keine Provision.',
    knowHeading: 'Gut zu wissen vor der Buchung',
    know: (date) => [
      {
        lead: 'Der Preis kann sich geändert haben.',
        text: `Er wurde am ${date} festgestellt; Flugpreise ändern sich mehrmals täglich.`,
      },
      {
        lead: 'Aufgabegepäck ist nicht inbegriffen.',
        text: 'Der Preis entspricht dem Basistarif für eine Person, mit dem von der Airline vorgesehenen Handgepäck.',
      },
      {
        lead: 'Vergleichen Sie vor dem Bezahlen.',
        text: 'Derselbe Flug kostet direkt bei der Airline manchmal gleich viel oder weniger.',
      },
    ],
    asideAria: 'Preis und Buchung',
    belowUsual: (percent) => `−${percent} % gegenüber dem üblichen Preis`,
    perPerson: 'hin und zurück pro Person, inklusive Steuern',
    usualForSeason: 'Üblicher Preis in der Saison',
    estimatedSaving: 'Geschätzte Ersparnis',
    bookOn: (partner) => `Flug auf ${partner} ansehen`,
    partnerNote:
      'Partnerlink: öffnet sich in einem neuen Tab, die Daten sind bereits ausgefüllt. Wenn Sie buchen, können wir eine Provision erhalten, ohne Mehrkosten für Sie.',
    hotelHeading: 'Und die Unterkunft?',
    hotelText: (label, from, to, stay) =>
      `Hotels für ${label} vom ${from} bis ${to}${stay ? ` (${stay})` : ''}, für 2 Personen.`,
    hotelButton: 'Hotel für diese Daten finden',
    hotelNote: (partner) => `Öffnet ${partner}, Daten und Ort sind bereits ausgefüllt.`,
    unavailable: 'Dieser Deal ist nicht mehr verfügbar.',
    seeCurrent: 'Aktuelle Deals ansehen',
    othersHeading: 'Weitere aktuelle Deals',
  },
  hotelPick: {
    badge: 'Hotel-Tipp',
    stars: (n) => `${n} Sterne`,
    stayDates: (from, to) => `Aufenthalte vom ${from} bis ${to}.`,
    checked: (date) => `Preis am ${date} auf der Website des Hotels geprüft; er kann sich geändert haben.`,
    perNight: 'pro Nacht für 2',
    button: 'Auf der Hotel-Website ansehen',
  },
  itinerary: {
    aria: 'Reiseprogramm',
    heading: (label, nights) => `${label}: Programm für ${nights} ${nights > 1 ? 'Nächte' : 'Nacht'}`,
    intro: 'Eine Programmidee, Tag für Tag, für die Dauer dieses Aufenthalts. Passen Sie sie an Ihre Wünsche und das Wetter an.',
    dayBadge: (n) => `T${n}`,
    spare: (nights, spare) =>
      `Bei ${nights} Nächten vor Ort ${spare > 1 ? `bleiben Ihnen ${spare} freie Tage` : 'bleibt Ihnen ein freier Tag'}: Zeit, um es ruhiger angehen zu lassen, an Ihren Lieblingsort zurückzukehren oder zwei Tage lang die Region zu erkunden.`,
    note: 'Unverbindliche Vorschläge: Prüfen Sie vor der Abreise Öffnungszeiten, Ruhetage und Reservierungspflichten.',
    fullGuide: (label) => `Zum vollständigen Reiseführer: ${label}`,
  },
  destinations: {
    metaTitle: (city) => `Reiseziele ab ${city}: unsere Reiseführer`,
    metaDescription: (city) =>
      `Rund fünfzig Reiseziele per Direktflug ab ${city}, jeweils mit einem Programm Tag für Tag und den aktuellen günstigen Preisen.`,
    crumb: 'Reiseziele',
    eyebrow: (city, n) => `Ab ${city} · ${n} Reiseziele`,
    h1: 'Unsere Reiseführer nach Reiseziel',
    lead: (airport) =>
      `Für jede Stadt, die wir per Direktflug ab dem ${airport} beobachten: ein Programm Tag für Tag, die aktuellen günstigen Preise und Hinweise zur Unterkunft.`,
    from: (price) => `ab ${price}`,
    dealsCount: (n) => `${n} ${n === 1 ? 'aktueller Deal' : 'aktuelle Deals'}`,
  },
  guide: {
    notFoundTitle: 'Reiseziel nicht gefunden',
    metaTitle: (label) => `${label}: Sehenswürdigkeiten und Programm Tag für Tag`,
    metaDescription: (label, country, city) =>
      `Unser Programm für ${label} (${country}) in 2 bis 6 Tagen, die aktuellen günstigen Direktflüge ab ${city} und Tipps zur Unterkunft.`,
    eyebrow: (country) => `Reiseführer · ${country}`,
    h1: (label) => `${label}: Was gibt es zu sehen?`,
    lead: (label, airport) =>
      `${label} gehört zu den Reisezielen, die wir per Direktflug ab dem ${airport} beobachten. Hier finden Sie unser Programm Tag für Tag, die aktuellen günstigen Preise für die Anreise und Hinweise zur Unterkunft.`,
    flightsAria: 'Aktuelle Flüge',
    flightsHeading: (label) => `Aktuelle Flüge nach ${label}`,
    flightsText: (city, min) => `Direktflüge hin und zurück ab ${city}, mindestens ${min} % unter dem üblichen Preis.`,
    noFlights: (label) =>
      `Zurzeit kein besonders günstiger Flug nach ${label}. Wir erfassen die Preise zweimal pro Woche: Der Preisalarm informiert Sie, sobald ein guter Preis auftaucht.`,
    daysHeading: (label) => `${label} Tag für Tag`,
    daysText:
      'Für ein Wochenende folgen Sie den ersten drei Tagen: Das sind die Höhepunkte. Für eine Woche kommen die Ausflüge der folgenden Tage hinzu, in der Reihenfolge, die Ihnen passt.',
    sleepAria: 'Unterkunft',
    sleepHeading: (label) => `Übernachten: ${label}`,
    sleepText: (label, partner) =>
      `Vergleichen Sie Hotels und Apartments für ${label} auf ${partner}. Auf der Seite eines Flugs öffnet die Hotel-Schaltfläche die Suche direkt mit den Daten dieses Flugs.`,
    sleepButton: (label) => `Hotels ansehen: ${label}`,
    othersAria: 'Weitere Reiseziele',
    othersHeading: 'Weitere Ideen für Reiseziele',
    all: 'Alle Reiseziele',
  },
  notFound: {
    eyebrow: 'Fehler 404',
    h1: 'Diese Seite gibt es nicht (mehr)',
    text: 'Der gesuchte Deal wurde vielleicht entfernt: Gute Preise halten nur wenige Tage.',
    button: 'Aktuelle Deals ansehen',
  },
  alerts: {
    metaTitle: 'Preisalarm per E-Mail',
    metaDescription: (city) =>
      `Erhalten Sie Direktflüge zu wirklich niedrigen Preisen ab ${city} per E-Mail, sobald sie veröffentlicht werden.`,
    eyebrow: 'Preisalarm per E-Mail',
    h1: (city) => `Gute Preise ab ${city}, direkt in Ihrem Postfach`,
    lead: 'Die besten Tarife verschwinden innerhalb weniger Tage. Melden Sie sich an, um informiert zu werden, sobald sie veröffentlicht sind.',
    points: (min) => [
      ['Nur wirklich gute Preise', `Direktflüge mindestens ${min} % unter dem üblichen Preis des Reiseziels.`],
      ['Wenige Nachrichten', 'Eine E-Mail, wenn neue Deals veröffentlicht werden, höchstens zweimal pro Woche.'],
      ['Kostenlos und unverbindlich', 'Abmeldung mit einem Klick, Ihre Adresse wird für nichts anderes verwendet.'],
    ],
  },
};
