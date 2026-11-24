// Destinations dont nous ne pouvons pas relever les prix (Air France, Lufthansa, KLM…) : relevé en ligne le 24/11/2026.
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const HORS_RELEVE: Record<string, Trajet> = {
  CDG: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'RER B', vers: tx('Gare du Nord, Châtelet, Saint-Michel', 'Gare du Nord, Châtelet, Saint-Michel', 'Gare du Nord, Châtelet, Saint-Michel'), duree: '35-50 min', prix: '≈ 14 €' },
      { mode: 'bus', nom: '9517', vers: tx('Saint-Denis-Pleyel, puis métro', 'Saint-Denis-Pleyel, dann Métro', 'Saint-Denis-Pleyel, then metro'), duree: '50-55 min', prix: '≈ 2 €' },
      { mode: 'taxi', vers: tx('Paris rive droite (rive gauche : 65 €), tarif fixe', 'Paris rechtes Ufer (linkes Ufer: 65 €), Festpreis', 'Paris Right Bank (Left Bank: €65), fixed fare'), duree: '40-60 min', prix: '≈ 56-65 €' },
      { mode: 'vtc', vers: centre, duree: '40-60 min', prix: '≈ 45-85 €' },
    ],
    bonPlan: tx(
      'Le taxi a un forfait obligatoire jusqu’à Paris : 56 € rive droite, 65 € rive gauche, jour et nuit, bagages compris. À trois ou quatre, il revient presque au prix du RER. Le Roissybus n’existe plus depuis mars 2026.',
      'Taxis haben einen Pflicht-Festpreis bis Paris: 56 € rechtes Ufer, 65 € linkes Ufer, Tag und Nacht, Gepäck inklusive. Zu dritt oder viert kaum teurer als der RER. Den Roissybus gibt es seit März 2026 nicht mehr.',
      'Taxis charge a compulsory flat fare into Paris: €56 to the Right Bank, €65 to the Left Bank, day or night, luggage included. For three or four people it costs about the same as the RER. The Roissybus stopped running in March 2026.',
    ),
  },
  AMS: {
    verifie: V,
    lignes: [
      { mode: 'train', vers: tx('Amsterdam Centraal', 'Amsterdam Centraal', 'Amsterdam Centraal'), duree: '15-20 min', prix: '≈ 5-6 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 50-65 €' },
    ],
    bonPlan: tx(
      'Les trains partent directement sous le terminal, plusieurs fois par heure et même la nuit. Payez aux portiques avec votre carte bancaire sans contact : pas besoin d’acheter de billet.',
      'Die Züge fahren direkt unter dem Terminal ab, mehrmals pro Stunde und sogar nachts. Zahlen Sie an der Sperre mit Ihrer kontaktlosen Bankkarte: kein Ticketkauf nötig.',
      'Trains leave right beneath the terminal, several times an hour and even at night. Tap in at the gates with your contactless bank card: no need to buy a ticket.',
    ),
  },
  FRA: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'S8, S9', vers: tx('Gare centrale (Hauptbahnhof)', 'Hauptbahnhof', 'Central station (Hauptbahnhof)'), duree: '≈ 11 min', prix: '≈ 6,90 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 35-45 €' },
    ],
    bonPlan: tx(
      'Le S-Bahn rejoint la gare centrale en à peine 11 minutes : c’est l’un des aéroports les plus proches de son centre-ville en Europe.',
      'Die S-Bahn erreicht den Hauptbahnhof in nur 11 Minuten: einer der Flughäfen Europas, die am nächsten am Stadtzentrum liegen.',
      'The S-Bahn reaches the central station in just 11 minutes: one of Europe’s airports closest to its city centre.',
    ),
  },
  MUC: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'S1, S8', vers: tx('Gare centrale et Marienplatz', 'Hauptbahnhof und Marienplatz', 'Central station and Marienplatz'), duree: '40-45 min', prix: '≈ 13,60 €' },
      { mode: 'bus', nom: 'Lufthansa Express Bus', vers: tx('Gare centrale', 'Hauptbahnhof', 'Central station'), duree: '≈ 45 min', prix: '≈ 13 €' },
      { mode: 'taxi', vers: centre, duree: '35-50 min', prix: '≈ 70-100 €' },
    ],
    bonPlan: tx(
      'Le billet « Airport-City-Day-Ticket » (≈ 16-17 €) couvre le trajet depuis l’aéroport et tous les transports de Munich jusqu’au lendemain 6 h : à peine plus cher qu’un aller simple.',
      'Das Airport-City-Day-Ticket (≈ 16-17 €) gilt für die Fahrt vom Flughafen und alle Münchner Verkehrsmittel bis 6 Uhr am Folgetag: kaum teurer als eine Einzelfahrt.',
      'The Airport-City-Day-Ticket (≈ €16-17) covers the ride from the airport and all Munich transport until 6 am the next day: barely more than a single.',
    ),
  },
  LHR: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: 'Piccadilly line', vers: tx('Centre de Londres (Piccadilly Circus, King’s Cross)', 'Zentrum von London (Piccadilly Circus, King’s Cross)', 'Central London (Piccadilly Circus, King’s Cross)'), duree: '50-60 min', prix: '≈ 5,90 £ (≈ 7 €)' },
      { mode: 'train', nom: 'Elizabeth line', vers: tx('Paddington, Bond Street, Liverpool Street', 'Paddington, Bond Street, Liverpool Street', 'Paddington, Bond Street, Liverpool Street'), duree: '≈ 35 min', prix: '≈ 15,50 £ (≈ 18 €)' },
      { mode: 'train', nom: 'Heathrow Express', vers: tx('Paddington, sans arrêt', 'Paddington, ohne Halt', 'Paddington, non-stop'), duree: '≈ 15 min', prix: '≈ 26 £ (≈ 31 €)' },
      { mode: 'taxi', vers: centre, duree: '45-70 min', prix: '≈ 60-115 £ (≈ 70-135 €)' },
    ],
    bonPlan: tx(
      'Le métro (Piccadilly line) est quatre fois moins cher que le Heathrow Express : payez directement aux portiques avec votre carte sans contact. Réservé 30 jours à l’avance, le Heathrow Express descend à 10 £.',
      'Die U-Bahn (Piccadilly Line) kostet ein Viertel des Heathrow Express: einfach mit der kontaktlosen Karte an der Sperre zahlen. 30 Tage im Voraus gebucht, kostet der Heathrow Express nur 10 £.',
      'The Tube (Piccadilly line) costs a quarter of the Heathrow Express: just tap your contactless card at the gates. Booked 30 days ahead, the Heathrow Express drops to £10.',
    ),
  },
  IST: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Havaist', vers: tx('Taksim, Sultanahmet ou Aksaray', 'Taksim, Sultanahmet oder Aksaray', 'Taksim, Sultanahmet or Aksaray'), duree: '60-90 min', prix: '≈ 470 TL (≈ 10 €)' },
      { mode: 'metro', nom: 'M11', vers: tx('Gayrettepe, puis métro M2 vers le centre', 'Gayrettepe, dann U-Bahn M2 ins Zentrum', 'Gayrettepe, then metro M2 to the centre'), duree: '≈ 60 min', prix: '≈ 40 TL (≈ 1 €)' },
      { mode: 'taxi', vers: tx('Taksim ou Sultanahmet', 'Taksim oder Sultanahmet', 'Taksim or Sultanahmet'), duree: '40-70 min', prix: '≈ 2 100-3 000 TL (≈ 44-63 €)' },
    ],
    bonPlan: tx(
      'Le nouvel aéroport est à 40 km du centre. Les bus Havaist vont directement à Sultanahmet et à Taksim ; pour le métro, achetez une carte Istanbulkart. En taxi, demandez si les péages sont compris.',
      'Der neue Flughafen liegt 40 km vom Zentrum. Havaist-Busse fahren direkt nach Sultanahmet und Taksim; für die U-Bahn eine Istanbulkart kaufen. Beim Taxi fragen, ob Mautgebühren inklusive sind.',
      'The new airport is 40 km from the centre. Havaist buses go straight to Sultanahmet and Taksim; for the metro, buy an Istanbulkart. By taxi, ask whether tolls are included.',
    ),
  },
  ADB: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'İZBAN', vers: tx('Alsancak, au centre d’Izmir', 'Alsancak, im Zentrum von Izmir', 'Alsancak, in central Izmir'), duree: '≈ 30 min', prix: '≈ 40 TL (≈ 1 €)' },
      { mode: 'bus', nom: 'Havaş', vers: tx('Alsancak', 'Alsancak', 'Alsancak'), duree: '≈ 40 min', prix: '≈ 200 TL (≈ 4 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 550-1 000 TL (≈ 12-21 €)' },
    ],
    bonPlan: tx(
      'Le train İZBAN part juste sous le terminal ; il faut une carte rechargeable (≈ 75 TL) achetée au distributeur. En taxi, mettez-vous d’accord sur le prix avant de partir.',
      'Der İZBAN-Zug fährt direkt unter dem Terminal ab; man braucht eine aufladbare Karte (≈ 75 TL) aus dem Automaten. Beim Taxi den Preis vorher vereinbaren.',
      'The İZBAN train leaves right under the terminal; you need a rechargeable card (≈ 75 TL) from the machine. By taxi, agree the price before setting off.',
    ),
  },
  ASR: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Centre de Kayseri', 'Zentrum von Kayseri', 'Kayseri centre'), duree: '≈ 15 min', prix: '≈ 660 TL (≈ 14 €)' },
      { mode: 'bus', nom: tx('Navette partagée', 'Sammelshuttle', 'Shared shuttle'), vers: tx('Göreme, en Cappadoce (sur réservation)', 'Göreme, Kappadokien (auf Reservierung)', 'Göreme, Cappadocia (on booking)'), duree: '70-80 min', prix: '≈ 10-20 €' },
      { mode: 'taxi', vers: tx('Göreme, en Cappadoce', 'Göreme, Kappadokien', 'Göreme, Cappadocia'), duree: '≈ 65 min', prix: '≈ 45-60 €' },
    ],
    bonPlan: tx(
      'Kayseri est la porte d’entrée de la Cappadoce. Les navettes partagées vers Göreme ne roulent que sur réservation : réservez-la, ou demandez à votre hôtel, avant le départ.',
      'Kayseri ist das Tor nach Kappadokien. Sammelshuttles nach Göreme fahren nur auf Reservierung: vor der Abreise buchen oder beim Hotel anfragen.',
      'Kayseri is the gateway to Cappadocia. Shared shuttles to Göreme only run on booking: reserve one, or ask your hotel, before you travel.',
    ),
  },
  GZT: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Havaş', vers: tx('Centre de Gaziantep', 'Zentrum von Gaziantep', 'Gaziantep centre'), duree: '≈ 30 min', prix: '' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 820-850 TL (≈ 17-18 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est à 20 km du centre. Il n’y a pas de tarif taxi officiel : fixez le prix avant de monter.',
      'Der Flughafen liegt 20 km vom Zentrum. Es gibt keinen offiziellen Taxitarif: Preis vor dem Einsteigen vereinbaren.',
      'The airport is 20 km from the centre. There is no official taxi fare: agree the price before getting in.',
    ),
  },
  OSL: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Vy', vers: tx('Gare centrale d’Oslo (Oslo S)', 'Hauptbahnhof Oslo (Oslo S)', 'Oslo Central Station (Oslo S)'), duree: '25-30 min', prix: '≈ 124 NOK (≈ 11 €)' },
      { mode: 'train', nom: 'Flytoget', vers: tx('Oslo S, train express', 'Oslo S, Expresszug', 'Oslo S, express train'), duree: '≈ 19 min', prix: '≈ 243 NOK (≈ 21 €)' },
      { mode: 'taxi', vers: tx('Centre (prix fixe)', 'Zentrum (Festpreis)', 'City centre (fixed price)'), duree: '40-50 min', prix: '≈ 830-950 NOK (≈ 71-81 €)' },
    ],
    bonPlan: tx(
      'Le train régional Vy coûte deux fois moins cher que le Flytoget pour seulement 10 minutes de plus. L’aéroport est à 50 km d’Oslo : évitez le taxi.',
      'Der Regionalzug von Vy kostet die Hälfte des Flytoget und ist nur 10 Minuten langsamer. Der Flughafen liegt 50 km von Oslo: lieber kein Taxi.',
      'The Vy regional train costs half as much as Flytoget and is only 10 minutes slower. The airport is 50 km from Oslo: avoid taxis.',
    ),
  },
  ARN: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Arlanda Express', vers: tx('Gare centrale de Stockholm', 'Hauptbahnhof Stockholm', 'Stockholm Central Station'), duree: '≈ 18 min', prix: '≈ 340 SEK (≈ 31 €)' },
      { mode: 'bus', nom: 'Flygbussarna', vers: tx('Stockholm City', 'Stockholm City', 'Stockholm City'), duree: '≈ 45 min', prix: '≈ 129 SEK (≈ 12 €)' },
      { mode: 'taxi', vers: tx('Centre (prix plafonné)', 'Zentrum (Höchstpreis)', 'City centre (capped price)'), duree: '35-45 min', prix: '≈ 550-800 SEK (≈ 50-73 €)' },
    ],
    bonPlan: tx(
      'Le car Flygbussarna est presque trois fois moins cher que l’Arlanda Express. L’aéroport plafonne le taxi à 800 SEK vers le centre : à quatre, c’est moins cher que quatre billets de train express.',
      'Der Flygbussarna-Bus kostet fast ein Drittel des Arlanda Express. Der Flughafen deckelt das Taxi ins Zentrum bei 800 SEK: zu viert günstiger als vier Expresszugtickets.',
      'The Flygbussarna coach costs almost a third of the Arlanda Express. The airport caps taxis to the centre at 800 SEK: for four people that is cheaper than four express train tickets.',
    ),
  },
  YUL: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '747', vers: tx('Centre-ville (René-Lévesque / Berri)', 'Innenstadt (René-Lévesque / Berri)', 'Downtown (René-Lévesque / Berri)'), duree: '45-70 min', prix: '≈ 11,25 CAD (≈ 7 €)' },
      { mode: 'taxi', vers: tx('Centre-ville (tarif fixe)', 'Innenstadt (Festpreis)', 'Downtown (flat fare)'), duree: '25-40 min', prix: '≈ 49,45 CAD (≈ 32 €)' },
    ],
    bonPlan: tx(
      'Le billet du bus 747 vaut aussi passe 24 heures sur tout le réseau de Montréal (bus, métro, REM). Il se paie en monnaie exacte à bord. Le taxi a un forfait vers le centre-ville, plus cher de 23 h à 5 h.',
      'Das Ticket für Bus 747 gilt zugleich als 24-Stunden-Pass für das ganze Montrealer Netz (Bus, Metro, REM). Im Bus passend bar zahlen. Taxis haben einen Festpreis in die Innenstadt, von 23 bis 5 Uhr teurer.',
      'The 747 bus ticket doubles as a 24-hour pass on Montreal’s whole network (bus, metro, REM). Pay the exact fare in cash on board. Taxis charge a flat fare downtown, higher from 11 pm to 5 am.',
    ),
  },
  ALG: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '100', vers: tx('Centre d’Alger', 'Zentrum von Algier', 'Central Algiers'), duree: '45-60 min', prix: '≈ 50 DZD (≈ 0,35 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 1 200-2 200 DZD (≈ 8-15 €)' },
    ],
    bonPlan: tx(
      'Les compteurs sont rarement utilisés à l’aéroport : fixez le prix du taxi avant de monter. L’application locale Yassir est souvent bien moins chère.',
      'Taxameter werden am Flughafen selten benutzt: Taxipreis vor dem Einsteigen vereinbaren. Die lokale App Yassir ist oft deutlich günstiger.',
      'Meters are rarely used at the airport: agree the taxi fare before getting in. The local Yassir app is often much cheaper.',
    ),
  },
  CZL: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Centre de Constantine, à environ 9 km', 'Zentrum von Constantine, etwa 9 km', 'Constantine centre, about 9 km'), duree: '≈ 20 min', prix: '≈ 500-1 000 DZD (≈ 3-7 €)' },
    ],
    bonPlan: tx(
      'Il n’y a pas de tarif officiel : mettez-vous d’accord sur le prix avec le chauffeur avant de partir, ou utilisez l’application Yassir.',
      'Es gibt keinen offiziellen Tarif: Preis vor der Fahrt mit dem Fahrer vereinbaren oder die App Yassir nutzen.',
      'There is no official fare: agree the price with the driver before setting off, or use the Yassir app.',
    ),
  },
  ORN: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Centre d’Oran, à environ 15 km', 'Zentrum von Oran, etwa 15 km', 'Oran centre, about 15 km'), duree: '≈ 25 min', prix: '≈ 600-1 000 DZD (≈ 4-7 €)' },
    ],
    bonPlan: tx(
      'Négociez le prix du taxi avant de monter : il varie beaucoup selon le chauffeur. L’application Yassir fonctionne aussi à Oran.',
      'Den Taxipreis vor dem Einsteigen aushandeln: er schwankt stark je nach Fahrer. Die App Yassir funktioniert auch in Oran.',
      'Negotiate the taxi fare before getting in: it varies a lot between drivers. The Yassir app also works in Oran.',
    ),
  },
  CMN: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Al Bidaoui', vers: tx('Casa Port et Casa Voyageurs', 'Casa Port und Casa Voyageurs', 'Casa Port and Casa Voyageurs'), duree: '≈ 45 min', prix: '≈ 42-50 MAD (≈ 4-5 €)' },
      { mode: 'taxi', nom: tx('Grand taxi', 'Grand Taxi', 'Grand taxi'), vers: centre, duree: '40-50 min', prix: '≈ 250-350 MAD (≈ 24-33 €)' },
    ],
    bonPlan: tx(
      'Le train part sous le terminal environ toutes les heures, de 6 h à 22 h : sept fois moins cher que le grand taxi. Pour le taxi, le tarif officiel est affiché à la station.',
      'Der Zug fährt etwa stündlich unter dem Terminal ab, von 6 bis 22 Uhr: siebenmal günstiger als das Grand Taxi. Der offizielle Taxitarif hängt am Taxistand aus.',
      'The train leaves under the terminal about hourly, from 6 am to 10 pm: seven times cheaper than a grand taxi. The official taxi fare is posted at the rank.',
    ),
  },
  RBA: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Gare de Rabat-Agdal', 'Bahnhof Rabat-Agdal', 'Rabat-Agdal station'), duree: '≈ 20 min', prix: '≈ 25 MAD (≈ 2,40 €)' },
      { mode: 'taxi', vers: tx('Centre de Rabat (tarif officiel ; Salé : 100 MAD)', 'Zentrum von Rabat (offizieller Tarif; Salé: 100 MAD)', 'Rabat centre (official fare; Salé: 100 MAD)'), duree: '≈ 20 min', prix: '≈ 150-200 MAD (≈ 14-19 €)' },
    ],
    bonPlan: tx(
      'Les tarifs officiels des taxis sont affichés dans le hall et à la station : 150 MAD de jour, 200 MAD la nuit pour Rabat. Le bus accepte la carte bancaire.',
      'Die offiziellen Taxitarife hängen in der Halle und am Taxistand aus: 150 MAD tagsüber, 200 MAD nachts nach Rabat. Im Bus kann man mit Karte zahlen.',
      'Official taxi fares are posted in the hall and at the rank: 150 MAD by day, 200 MAD at night to Rabat. The bus takes bank cards.',
    ),
  },
  TUN: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '35, 635', vers: tx('Place de la Marine, au centre de Tunis', 'Place de la Marine, im Zentrum von Tunis', 'Place de la Marine, central Tunis'), duree: '25-30 min', prix: '≈ 1 TND (≈ 0,30 €)' },
      { mode: 'taxi', vers: centre, duree: '15-30 min', prix: '≈ 15-20 TND (≈ 4-6 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est tout près du centre. Exigez le compteur dans les taxis jaunes ; le bus se paie en espèces, prévoyez de la monnaie.',
      'Der Flughafen liegt nah am Zentrum. Bestehen Sie in den gelben Taxis auf dem Taxameter; den Bus bar bezahlen, Kleingeld bereithalten.',
      'The airport is close to the centre. Insist on the meter in the yellow taxis; the bus takes cash only, so bring change.',
    ),
  },
};
