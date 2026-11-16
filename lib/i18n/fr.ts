// Textes du site en français. C'est la référence : de.ts et en.ts doivent avoir exactement la même forme.

export const fr = {
  meta: {
    defaultTitle: 'Vols directs pas chers au départ de Bâle-Mulhouse',
    description:
      "Les vols directs à prix réellement bas au départ de l'EuroAirport Bâle-Mulhouse : chaque prix est comparé au tarif habituel de la destination. Site indépendant, mis à jour deux fois par semaine.",
    ogDescription: 'Uniquement les prix réellement bas, comparés au tarif habituel de chaque destination.',
  },
  place: {
    airport: 'EuroAirport Bâle-Mulhouse-Fribourg',
    city: 'Bâle-Mulhouse',
  },
  common: {
    skip: 'Aller au contenu',
    tagline: 'Les bons plans vols des trois frontières',
    logoSub: 'Deals · 3 frontières',
    logoAria: 'FlyBSL, accueil',
    home: 'Accueil',
    breadcrumb: "Fil d'Ariane",
    partnerBadge: 'Partenaire',
  },
  nav: {
    destinations: 'Destinations',
    method: 'Notre méthode',
    alerts: 'Recevoir les alertes',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    main: 'Navigation principale',
    mobile: 'Navigation mobile',
    language: 'Langue',
  },
  sections: {
    'city-trip': {
      label: 'Week-ends',
      title: 'Week-ends et courts séjours',
      hint: '2 à 4 nuits',
      intro: 'Des vols directs pour partir 2 à 4 nuits : idéal pour un week-end prolongé en Europe.',
    },
    vol: {
      label: 'Une semaine',
      title: 'Une semaine sur place',
      hint: '5 à 8 nuits',
      intro: 'Des vols directs pour rester 5 à 8 nuits sur place, le format classique des vacances.',
    },
    sejour: {
      label: 'Longs séjours',
      title: 'Longs séjours',
      hint: '10 à 15 nuits',
      intro: 'Des vols directs pour des séjours de 10 à 15 nuits, quand on veut vraiment couper.',
    },
    'derniere-minute': {
      label: 'Départs proches',
      title: 'Départs dans les 30 jours',
      hint: 'dans les 30 jours',
      intro: 'Les deals dont le départ a lieu dans les 30 prochains jours, du plus proche au plus lointain.',
    },
  },
  sectionPage: {
    eyebrow: (city: string, hint: string) => `Au départ de ${city} · ${hint}`,
    metaTitle: (title: string, city: string) => `${title} au départ de ${city}`,
  },
  footer: {
    about: (airport: string) =>
      `Site indépendant qui repère les vols directs à prix réellement bas au départ de l'${airport}. Nous ne vendons pas de billets : la réservation se fait chez notre partenaire.`,
    dealsHeading: 'Les deals',
    dealsAria: 'Rubriques',
    allDeals: 'Tous les deals',
    infoHeading: 'Informations',
    guides: 'Guides des destinations',
    method: 'Notre méthode',
    alerts: 'Alertes par e-mail',
    partner: 'Devenir partenaire',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    contact: 'Contact',
    madeIn: 'Conçu en Alsace.',
    affiliateNote:
      'Les liens de réservation sont des liens partenaires : ils peuvent nous rapporter une commission, sans surcoût pour vous.',
  },
  card: {
    direct: 'Vol direct',
    usualPrice: 'Prix habituel',
    roundTrip: 'aller-retour',
    seeDeal: 'Voir le deal',
    photoAlt: (label: string) => `Vue de ${label}`,
    nights: (n: number) => `${n} nuit${n > 1 ? 's' : ''}`,
    routeLine: (city: string, label: string) => `${city} → ${label}`,
  },
  explorer: {
    sortBest: 'Meilleure remise',
    sortPrice: 'Prix croissant',
    sortDate: 'Départ le plus proche',
    sortBy: 'Trier par',
    emptyTitle: 'Aucun deal dans cette rubrique pour le moment',
    emptyText:
      'Nous ne publions que les prix réellement bas. Les vols sont vérifiés deux fois par semaine : revenez bientôt ou recevez les prochains deals par e-mail.',
    monthsAria: 'Mois de départ',
    allMonths: 'Tous les mois',
    budgetAria: 'Budget maximum',
    allBudgets: 'Tous les budgets',
    upTo: (b: number) => `Jusqu'à ${b} €`,
    count: (shown: number, total: number) =>
      `${shown} deal${shown > 1 ? 's' : ''}${shown !== total ? ` sur ${total}` : ''}`,
    noMatch: 'Aucun deal ne correspond à ces filtres',
    reset: 'Réinitialiser les filtres',
  },
  newsletter: {
    emailLabel: 'Adresse e-mail',
    placeholder: 'votre@email.fr',
    submit: 'Recevoir les deals',
    sending: 'Envoi…',
    done: (email: string) => `C'est noté. Vous recevrez nos prochains deals à l'adresse ${email}.`,
    invalid: 'Cette adresse e-mail ne semble pas valide.',
    failed: 'Inscription impossible pour le moment. Merci de réessayer plus tard.',
    note: 'Un e-mail quand de bons prix apparaissent, pas plus. Désinscription à tout moment.',
    privacy: 'Confidentialité',
  },
  home: {
    h1: (city: string) => `Les vols directs à prix réellement bas, au départ de ${city}`,
    lead: (min: number) =>
      `Nous comparons chaque vol au prix habituel de sa destination et ne publions que ceux qui sont au moins ${min} % moins chers. Pas de fausses promotions.`,
    ctaDeals: 'Voir les deals du moment',
    ctaMethod: 'Notre méthode',
    statDeals: 'Deals en ligne',
    statBest: 'Meilleure remise',
    statFrom: 'Aller-retour dès',
    notAvailable: 'n. c.',
    dealsHeading: 'Les deals du moment',
    lastUpdate: (date: string) => `Dernier relevé de prix : ${date}`,
    sectionsAria: 'Rubriques',
    partnersAria: 'Partenaires',
    hotelsHeading: 'Les bons plans hôtels du moment',
    hotelsText: (city: string) =>
      `Des offres repérées par nos soins, directement sur le site des hôteliers, dans les villes desservies depuis ${city}.`,
    stepsHeading: 'Comment nous sélectionnons les deals',
    steps: (min: number, partner: string) => [
      {
        title: 'Nous relevons les prix',
        text: 'Deux fois par semaine, notre outil relève les prix des vols directs aller-retour vers une cinquantaine de destinations, sur les neuf mois à venir.',
      },
      {
        title: 'Nous les comparons au prix habituel',
        text: `Chaque prix est comparé au tarif habituel de la destination pour la saison. Nous ne gardons que les vols au moins ${min} % moins chers.`,
      },
      {
        title: 'Vous réservez chez notre partenaire',
        text: `Un clic ouvre la recherche sur ${partner}, déjà remplie avec les bonnes dates. Vous y vérifiez le prix du jour avant de réserver.`,
      },
    ],
    newsletterHeading: "Recevez les deals avant qu'ils disparaissent",
    newsletterText: (city: string) =>
      `Les meilleurs prix durent rarement plus de quelques jours. Nous vous écrivons uniquement quand de vrais bons prix apparaissent au départ de ${city}.`,
    faqHeading: 'Questions fréquentes',
    faq: [
      {
        q: 'Les prix affichés sont-ils garantis ?',
        a: 'Non. Ce sont des prix constatés à la date indiquée sur chaque deal. Les tarifs aériens changent plusieurs fois par jour : le prix final est celui affiché par le site de réservation au moment où vous payez.',
      },
      {
        q: 'Que comprend le prix ?',
        a: 'Le vol aller-retour pour une personne, taxes comprises, généralement avec un petit bagage cabine. Le bagage en soute, le choix du siège et parfois le bagage cabine standard sont en supplément selon la compagnie.',
      },
      {
        q: 'Comment le site est-il financé ?',
        a: "Par l'affiliation : si vous réservez après avoir cliqué sur un de nos liens, notre partenaire peut nous reverser une commission. Cela ne change pas le prix que vous payez et n'influence pas notre sélection, qui repose uniquement sur l'écart avec le prix habituel.",
      },
      {
        q: "D'où partent les vols ?",
        a: "De l'EuroAirport Bâle-Mulhouse-Fribourg (codes BSL, MLH et EAP), situé à Saint-Louis, accessible depuis l'Alsace, la région de Bâle et le sud du pays de Bade.",
      },
    ],
  },
  deal: {
    notFoundTitle: 'Deal introuvable',
    metaTitle: (city: string, label: string, price: string) => `${city} → ${label} à ${price} aller-retour`,
    metaDescription: (city: string, label: string, price: string, percent: number | null, date: string) =>
      `Vol direct aller-retour vers ${label} au départ de ${city} à ${price}${
        percent ? `, soit ${percent} % sous le prix habituel` : ''
      }. Prix constaté le ${date}.`,
    eyebrow: (city: string) => `Vol direct au départ de ${city}`,
    detailsAria: 'Détails du vol',
    departure: 'Départ',
    return: 'Retour',
    stay: 'Durée sur place',
    flightType: 'Type de vol',
    flightTypeValue: 'Direct, aller et retour',
    airline: 'Compagnie',
    airport: 'Aéroport de départ',
    seenOn: 'Prix constaté le',
    tipHeading: 'Conseil pour ce voyage',
    picksAria: 'Bons plans hôtels',
    picksHeading: (label: string) => `Où dormir à ${label} : nos bons plans`,
    picksText: "Repérés par nos soins, directement sur le site de l'hôtel.",
    noCommission: 'Nous ne touchons pas de commission sur ces liens.',
    knowHeading: 'À savoir avant de réserver',
    know: (date: string) => [
      {
        lead: 'Le prix peut avoir changé.',
        text: `Il a été constaté le ${date} ; les tarifs aériens évoluent plusieurs fois par jour.`,
      },
      {
        lead: 'Les bagages en soute ne sont pas compris.',
        text: 'Le prix correspond au tarif de base pour une personne, avec le bagage cabine prévu par la compagnie.',
      },
      {
        lead: 'Comparez avant de payer.',
        text: 'Le même vol est parfois au même prix, ou moins cher, directement sur le site de la compagnie.',
      },
    ],
    asideAria: 'Prix et réservation',
    belowUsual: (percent: number) => `−${percent} % par rapport au prix habituel`,
    perPerson: 'aller-retour par personne, taxes comprises',
    usualForSeason: 'Prix habituel pour la saison',
    estimatedSaving: 'Économie estimée',
    bookOn: (partner: string) => `Voir ce vol sur ${partner}`,
    partnerNote:
      "Lien partenaire : s'ouvre dans un nouvel onglet, avec les dates déjà remplies. Si vous réservez, nous pouvons toucher une commission, sans surcoût pour vous.",
    hotelHeading: 'Et pour dormir sur place ?',
    hotelText: (label: string, from: string, to: string, stay: string | null) =>
      `Hôtels à ${label} du ${from} au ${to}${stay ? ` (${stay})` : ''}, pour 2 personnes.`,
    hotelButton: 'Trouver un hôtel pour ces dates',
    hotelNote: (partner: string) => `S'ouvre sur ${partner}, dates et ville déjà remplies.`,
    unavailable: "Ce deal n'est plus disponible.",
    seeCurrent: 'Voir les deals du moment',
    othersHeading: "D'autres deals du moment",
  },
  hotelPick: {
    badge: 'Bon plan hôtel',
    stars: (n: number) => `${n} étoiles`,
    stayDates: (from: string, to: string) => `Séjours du ${from} au ${to}.`,
    checked: (date: string) => `Prix vérifié sur le site de l'hôtel le ${date} ; il peut avoir changé.`,
    perNight: 'la nuit pour 2',
    button: "Voir sur le site de l'hôtel",
  },
  itinerary: {
    aria: "Programme d'activités",
    heading: (label: string, nights: number) => `Que faire à ${label} en ${nights} nuit${nights > 1 ? 's' : ''} ?`,
    intro: 'Une idée de programme, jour par jour, pour la durée de ce séjour. À adapter à vos envies et à la météo.',
    dayBadge: (n: number) => `J${n}`,
    spare: (nights: number, spare: number) =>
      `Avec ${nights} nuits sur place, il vous reste ${spare} jour${spare > 1 ? 's' : ''} libre${
        spare > 1 ? 's' : ''
      } : de quoi ralentir, retourner dans votre endroit préféré ou partir deux jours explorer la région.`,
    note: 'Suggestions indicatives : vérifiez les horaires, les jours de fermeture et les réservations obligatoires avant de partir.',
    fullGuide: (label: string) => `Voir le guide complet de ${label}`,
  },
  destinations: {
    metaTitle: (city: string) => `Destinations au départ de ${city} : nos guides`,
    metaDescription: (city: string) =>
      `Une cinquantaine de destinations en vol direct depuis ${city}, avec pour chacune un programme jour par jour et les bons prix du moment.`,
    crumb: 'Destinations',
    eyebrow: (city: string, n: number) => `Au départ de ${city} · ${n} destinations`,
    h1: 'Nos guides par destination',
    lead: (airport: string) =>
      `Pour chaque ville que nous surveillons en vol direct depuis l'${airport} : un programme jour par jour, les bons prix du moment et de quoi trouver où dormir.`,
    from: (price: string) => `dès ${price}`,
    dealsCount: (n: number) => `${n} deal${n > 1 ? 's' : ''} en cours`,
  },
  guide: {
    notFoundTitle: 'Destination introuvable',
    metaTitle: (label: string) => `Que faire à ${label} : programme jour par jour`,
    metaDescription: (label: string, country: string, city: string) =>
      `Notre programme pour visiter ${label} (${country}) en 2 à 6 jours, les vols directs à bas prix du moment au départ de ${city} et où dormir sur place.`,
    eyebrow: (country: string) => `Guide · ${country}`,
    h1: (label: string) => `Que faire à ${label} ?`,
    lead: (label: string, airport: string) =>
      `${label} fait partie des destinations que nous surveillons en vol direct au départ de l'${airport}. Voici notre programme jour par jour pour en profiter, les bons prix du moment pour y aller et de quoi trouver où dormir.`,
    flightsAria: 'Vols du moment',
    flightsHeading: (label: string) => `Les vols du moment vers ${label}`,
    flightsText: (city: string, min: number) =>
      `Vols directs aller-retour au départ de ${city}, au moins ${min} % sous le prix habituel.`,
    noFlights: (label: string) =>
      `Pas de vol à prix cassé vers ${label} en ce moment. Nous relevons les prix deux fois par semaine : les alertes vous préviennent dès qu'un bon prix apparaît.`,
    daysHeading: (label: string) => `${label} jour par jour`,
    daysText:
      "Pour un week-end, suivez les trois premières journées : ce sont les incontournables. Pour une semaine, ajoutez les excursions des journées suivantes, dans l'ordre qui vous convient.",
    sleepAria: 'Où dormir',
    sleepHeading: (label: string) => `Où dormir à ${label}`,
    sleepText: (label: string, partner: string) =>
      `Comparez les hôtels et les appartements de ${label} sur ${partner}. Depuis la page d'un vol, le bouton hôtel ouvre directement la recherche aux dates de ce vol.`,
    sleepButton: (label: string) => `Voir les hôtels à ${label}`,
    othersAria: 'Autres destinations',
    othersHeading: "D'autres idées de destinations",
    all: 'Toutes les destinations',
  },
  notFound: {
    eyebrow: 'Erreur 404',
    h1: "Cette page n'existe pas ou plus",
    text: 'Le deal que vous cherchez a peut-être été retiré : les bons prix ne durent que quelques jours.',
    button: 'Voir les deals du moment',
  },
  alerts: {
    metaTitle: 'Alertes deals par e-mail',
    metaDescription: (city: string) =>
      `Recevez par e-mail les vols directs à prix réellement bas au départ de ${city}, dès leur publication.`,
    eyebrow: 'Alertes par e-mail',
    h1: (city: string) => `Les bons prix au départ de ${city}, directement dans votre boîte`,
    lead: "Les meilleurs tarifs disparaissent en quelques jours. Inscrivez-vous pour être prévenu dès qu'ils sont publiés.",
    points: (min: number) => [
      ['Uniquement de vrais bons prix', `Des vols directs au moins ${min} % sous le prix habituel de la destination.`],
      ['Peu de messages', 'Un e-mail quand de nouveaux deals sont publiés, deux fois par semaine au maximum.'],
      ['Gratuit et sans engagement', "Désinscription en un clic, votre adresse ne sert à rien d'autre."],
    ],
  },
};

export type Dict = typeof fr;
