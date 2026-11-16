// Site copy in English. Same shape as fr.ts (the reference).
import type { Dict } from './fr';

export const en: Dict = {
  meta: {
    defaultTitle: 'Cheap direct flights from Basel-Mulhouse',
    description:
      'Cheap direct flights from EuroAirport Basel-Mulhouse to around fifty destinations. Independent site, updated twice a week.',
    ogDescription: 'Cheap direct flights to around fifty destinations, checked twice a week.',
  },
  place: {
    airport: 'EuroAirport Basel-Mulhouse-Freiburg',
    city: 'Basel-Mulhouse',
  },
  common: {
    skip: 'Skip to content',
    tagline: 'Flight deals from the three-border region',
    logoSub: 'Deals · 3 borders',
    logoAria: 'FlyBSL, home',
    home: 'Home',
    breadcrumb: 'Breadcrumb',
    partnerBadge: 'Partner',
  },
  nav: {
    destinations: 'Destinations',
    method: 'Our method',
    alerts: 'Get price alerts',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    main: 'Main navigation',
    mobile: 'Mobile navigation',
    language: 'Language',
  },
  sections: {
    'city-trip': {
      label: 'Weekends',
      title: 'Weekends and short breaks',
      hint: '2 to 4 nights',
      intro: 'Direct flights for 2 to 4 nights away: ideal for a long weekend in Europe.',
    },
    vol: {
      label: 'One week',
      title: 'A week away',
      hint: '5 to 8 nights',
      intro: 'Direct flights for 5 to 8 nights away, the classic holiday format.',
    },
    sejour: {
      label: 'Long stays',
      title: 'Long stays',
      hint: '10 to 15 nights',
      intro: 'Direct flights for stays of 10 to 15 nights, when you really want to switch off.',
    },
    'derniere-minute': {
      label: 'Leaving soon',
      title: 'Departures within 30 days',
      hint: 'within 30 days',
      intro: 'Deals departing within the next 30 days, soonest first.',
    },
  },
  sectionPage: {
    eyebrow: (city, hint) => `From ${city} · ${hint}`,
    metaTitle: (title, city) => `${title} from ${city}`,
  },
  footer: {
    about: (airport) =>
      `Independent site that spots cheap direct flights from ${airport}. We do not sell tickets: you book with our partner.`,
    dealsHeading: 'Deals',
    dealsAria: 'Sections',
    allDeals: 'All deals',
    infoHeading: 'Information',
    guides: 'Destination guides',
    method: 'Our method',
    alerts: 'Email alerts',
    partner: 'Become a partner',
    legal: 'Legal notice',
    privacy: 'Privacy',
    contact: 'Contact',
    madeIn: 'Made in Alsace.',
    affiliateNote: 'Booking links are partner links: we may earn a commission, at no extra cost to you.',
  },
  card: {
    direct: 'Direct flight',
    roundTrip: 'return',
    seeDeal: 'View deal',
    photoAlt: (label) => `View of ${label}`,
    nights: (n) => `${n} night${n > 1 ? 's' : ''}`,
    routeLine: (city, label) => `${city} → ${label}`,
  },
  explorer: {
    sortPrice: 'Lowest price',
    sortDate: 'Soonest departure',
    sortBy: 'Sort by',
    emptyTitle: 'No deals in this section right now',
    emptyText:
      'We only publish low prices. Flights are checked twice a week: come back soon or get the next deals by email.',
    monthsAria: 'Departure month',
    allMonths: 'All months',
    budgetAria: 'Maximum budget',
    allBudgets: 'Any budget',
    upTo: (b) => `Up to €${b}`,
    count: (shown, total) => `${shown} deal${shown === 1 ? '' : 's'}${shown !== total ? ` of ${total}` : ''}`,
    noMatch: 'No deals match these filters',
    reset: 'Reset filters',
  },
  newsletter: {
    emailLabel: 'Email address',
    placeholder: 'you@email.com',
    submit: 'Get the deals',
    sending: 'Sending…',
    done: (email) => `All set. You will receive our next deals at ${email}.`,
    invalid: 'This email address does not look valid.',
    failed: 'Sign-up is unavailable right now. Please try again later.',
    note: 'One email when good prices appear, nothing more. Unsubscribe at any time.',
    privacy: 'Privacy',
  },
  home: {
    h1: (city) => `Cheap direct flights from ${city}`,
    lead:
      'Twice a week, we check prices for direct flights to around fifty destinations and only publish those below the price ceiling we set ourselves for each one.',
    ctaDeals: 'See current deals',
    ctaMethod: 'Our method',
    statDeals: 'Deals online',
    statDestinations: 'Destinations',
    statFrom: 'Return flights from',
    dealsHeading: 'Current deals',
    lastUpdate: (date) => `Prices last checked: ${date}`,
    sectionsAria: 'Sections',
    partnersAria: 'Partners',
    hotelsHeading: 'Current hotel picks',
    hotelsText: (city) =>
      `Offers we found ourselves, directly on the hotels' own websites, in cities served from ${city}.`,
    stepsHeading: 'How we select deals',
    steps: (partner) => [
      {
        title: 'We collect prices',
        text: 'Twice a week, our tool collects prices for direct return flights to around fifty destinations over the next nine months.',
      },
      {
        title: 'We only keep low prices',
        text: 'For each destination, we set our own price ceiling. Only direct flights below it are published.',
      },
      {
        title: 'You book with our partner',
        text: `One click opens the search on ${partner}, already filled in with the right dates. You check the current price there before booking.`,
      },
    ],
    newsletterHeading: 'Get the deals before they disappear',
    newsletterText: (city) =>
      `The best prices rarely last more than a few days. We only write to you when genuinely good prices appear from ${city}.`,
    faqHeading: 'Frequently asked questions',
    faq: [
      {
        q: 'Are the prices shown guaranteed?',
        a: 'No. They are prices observed on the date shown on each deal. Air fares change several times a day: the final price is the one shown by the booking site when you pay.',
      },
      {
        q: 'What does the price include?',
        a: 'The return flight for one person, taxes included, usually with a small cabin bag. Hold luggage, seat selection and, depending on the airline, a standard cabin bag cost extra.',
      },
      {
        q: 'How is the site funded?',
        a: 'Through affiliate links: if you book after clicking one of our links, our partner may pay us a commission. This does not change the price you pay or influence our selection, which is based solely on the price of the flight.',
      },
      {
        q: 'Where do the flights leave from?',
        a: 'From EuroAirport Basel-Mulhouse-Freiburg (codes BSL, MLH and EAP), located in Saint-Louis, France, and easy to reach from Alsace, the Basel area and southern Baden.',
      },
    ],
  },
  deal: {
    notFoundTitle: 'Deal not found',
    metaTitle: (city, label, price) => `${city} → ${label} for ${price} return`,
    metaDescription: (city, label, price, date) =>
      `Direct return flight to ${label} from ${city} for ${price}. Price observed on ${date}.`,
    eyebrow: (city) => `Direct flight from ${city}`,
    detailsAria: 'Flight details',
    departure: 'Outbound',
    return: 'Return',
    stay: 'Length of stay',
    flightType: 'Flight type',
    flightTypeValue: 'Direct, both ways',
    airline: 'Airline',
    airport: 'Departure airport',
    seenOn: 'Price observed on',
    tipHeading: 'Tip for this trip',
    picksAria: 'Hotel picks',
    picksHeading: (label) => `Where to stay in ${label}: our hotel picks`,
    picksText: "Found by us, directly on the hotel's own website.",
    noCommission: 'We earn no commission on these links.',
    knowHeading: 'Good to know before you book',
    know: (date) => [
      {
        lead: 'The price may have changed.',
        text: `It was observed on ${date}; air fares change several times a day.`,
      },
      {
        lead: 'Hold luggage is not included.',
        text: "The price is the basic fare for one person, with the airline's standard cabin bag allowance.",
      },
      {
        lead: 'Compare before you pay.',
        text: "The same flight is sometimes the same price, or cheaper, directly on the airline's website.",
      },
    ],
    asideAria: 'Price and booking',
    perPerson: 'return per person, taxes included',
    bookOn: (partner) => `View this flight on ${partner}`,
    partnerNote:
      'Partner link: opens in a new tab with the dates already filled in. If you book, we may earn a commission, at no extra cost to you.',
    hotelHeading: 'Need somewhere to stay?',
    hotelText: (label, from, to, stay) =>
      `Hotels in ${label} from ${from} to ${to}${stay ? ` (${stay})` : ''}, for 2 people.`,
    hotelButton: 'Find a hotel for these dates',
    hotelNote: (partner) => `Opens ${partner} with the dates and city already filled in.`,
    unavailable: 'This deal is no longer available.',
    seeCurrent: 'See current deals',
    othersHeading: 'More current deals',
  },
  hotelPick: {
    badge: 'Hotel pick',
    stars: (n) => `${n} stars`,
    stayDates: (from, to) => `Stays from ${from} to ${to}.`,
    checked: (date) => `Price checked on the hotel's website on ${date}; it may have changed.`,
    perNight: 'per night for 2',
    button: "View on the hotel's website",
  },
  itinerary: {
    aria: 'Itinerary',
    heading: (label, nights) => `What to do in ${label} in ${nights} night${nights > 1 ? 's' : ''}`,
    intro: 'A day-by-day itinerary idea for the length of this stay. Adapt it to your tastes and the weather.',
    dayBadge: (n) => `D${n}`,
    spare: (nights, spare) =>
      `With ${nights} nights there, you have ${spare} spare day${
        spare > 1 ? 's' : ''
      }: time to slow down, go back to your favourite spot or spend two days exploring the region.`,
    note: 'Suggestions only: check opening hours, closing days and compulsory bookings before you travel.',
    fullGuide: (label) => `See the full guide to ${label}`,
  },
  destinations: {
    metaTitle: (city) => `Destinations from ${city}: our guides`,
    metaDescription: (city) =>
      `Around fifty destinations with direct flights from ${city}, each with a day-by-day itinerary and the current low prices.`,
    crumb: 'Destinations',
    eyebrow: (city, n) => `From ${city} · ${n} destinations`,
    h1: 'Our destination guides',
    lead: (airport) =>
      `For each city we track with direct flights from ${airport}: a day-by-day itinerary, the current low prices and where to find somewhere to stay.`,
    from: (price) => `from ${price}`,
    dealsCount: (n) => `${n} current deal${n === 1 ? '' : 's'}`,
  },
  guide: {
    notFoundTitle: 'Destination not found',
    metaTitle: (label) => `What to do in ${label}: day-by-day itinerary`,
    metaDescription: (label, country, city) =>
      `Our itinerary for visiting ${label} (${country}) in 2 to 6 days, the current cheap direct flights from ${city} and where to stay.`,
    eyebrow: (country) => `Guide · ${country}`,
    h1: (label) => `What to do in ${label}`,
    lead: (label, airport) =>
      `${label} is one of the destinations we track with direct flights from ${airport}. Here is our day-by-day itinerary to make the most of it, the current low prices to get there and where to find somewhere to stay.`,
    flightsAria: 'Current flights',
    flightsHeading: (label) => `Current flights to ${label}`,
    flightsText: (city) => `Direct return flights from ${city}, checked twice a week.`,
    noFlights: (label) =>
      `No cheap flights to ${label} right now. We check prices twice a week: alerts let you know as soon as a good price appears.`,
    daysHeading: (label) => `${label} day by day`,
    daysText:
      'For a weekend, follow the first three days: they are the essentials. For a week, add the day trips from the following days, in whatever order suits you.',
    sleepAria: 'Where to stay',
    sleepHeading: (label) => `Where to stay in ${label}`,
    sleepText: (label, partner) =>
      `Compare hotels and apartments in ${label} on ${partner}. On a flight page, the hotel button opens the search directly for that flight's dates.`,
    sleepButton: (label) => `See hotels in ${label}`,
    othersAria: 'Other destinations',
    othersHeading: 'More destination ideas',
    all: 'All destinations',
  },
  notFound: {
    eyebrow: 'Error 404',
    h1: 'This page does not exist (any more)',
    text: 'The deal you are looking for may have been removed: good prices only last a few days.',
    button: 'See current deals',
  },
  alerts: {
    metaTitle: 'Deal alerts by email',
    metaDescription: (city) =>
      `Get cheap direct flights from ${city} by email, as soon as they are published.`,
    eyebrow: 'Email alerts',
    h1: (city) => `Good prices from ${city}, straight to your inbox`,
    lead: 'The best fares disappear within days. Sign up to be told as soon as they are published.',
    points: [
      ['Only low prices', 'Direct flights below the price ceiling we set ourselves for each destination.'],
      ['Few messages', 'One email when new deals are published, twice a week at most.'],
      ['Free, no commitment', 'Unsubscribe in one click; your address is used for nothing else.'],
    ],
  },
};
