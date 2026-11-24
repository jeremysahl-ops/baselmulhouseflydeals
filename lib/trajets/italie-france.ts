// Italie, France, Corse : relevé en ligne le 24/11/2026.
// prix vide ('') = prix introuvable en ligne, la page affiche « à vérifier ».
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const ITALIE_FRANCE: Record<string, Trajet> = {
  VCE: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'ATVO', vers: tx('Piazzale Roma, porte d’entrée de Venise', 'Piazzale Roma, Eingang zu Venedig', 'Piazzale Roma, the gateway to Venice'), duree: '≈ 20 min', prix: '≈ 10-12 €' },
      { mode: 'bateau', nom: 'Alilaguna', vers: tx('Venise (Saint-Marc, Rialto) et Murano', 'Venedig (San Marco, Rialto) und Murano', 'Venice (St Mark’s, Rialto) and Murano'), duree: '60-75 min', prix: '≈ 18 €' },
      { mode: 'taxi', vers: tx('Piazzale Roma', 'Piazzale Roma', 'Piazzale Roma'), duree: '≈ 20 min', prix: '≈ 40 €' },
      { mode: 'bateau', nom: tx('Bateau-taxi', 'Wassertaxi', 'Water taxi'), vers: tx('Jusqu’à votre hôtel, par la lagune', 'Bis zum Hotel, über die Lagune', 'To your hotel, across the lagoon'), duree: '≈ 30 min', prix: '≈ 120 € +' },
    ],
    bonPlan: tx(
      'Le bus jusqu’à Piazzale Roma, puis le vaporetto, reste de loin la solution la moins chère. Le bateau Alilaguna ne circule plus après 21 h environ.',
      'Bus bis Piazzale Roma und dann Vaporetto ist mit Abstand am günstigsten. Das Alilaguna-Boot fährt nach etwa 21 Uhr nicht mehr.',
      'The bus to Piazzale Roma and then the vaporetto is by far the cheapest option. The Alilaguna boat stops running after about 9 pm.',
    ),
  },
  BRI: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Ferrotramviaria', vers: tx('Gare de Bari Centrale', 'Bahnhof Bari Centrale', 'Bari Centrale station'), duree: '≈ 20 min', prix: '≈ 5,30 €' },
      { mode: 'taxi', vers: tx('Centre de Bari (tarif fixe selon le quartier)', 'Zentrum von Bari (Festpreis je nach Viertel)', 'Bari centre (fixed fare by district)'), duree: '≈ 20 min', prix: '≈ 20-28 €' },
    ],
    bonPlan: tx(
      'Le train part de l’aéroport toutes les 20 à 30 minutes, de 5 h à minuit environ. Les taxis appliquent des tarifs fixes par quartier : demandez le prix avant de monter (≈ +3 € la nuit).',
      'Der Zug fährt etwa alle 20 bis 30 Minuten, von ca. 5 Uhr bis Mitternacht. Taxis haben Festpreise je nach Viertel: Preis vor dem Einsteigen erfragen (nachts ≈ +3 €).',
      'Trains leave the airport every 20 to 30 minutes, from about 5 am to midnight. Taxis charge fixed fares by district: ask the price before you get in (≈ +€3 at night).',
    ),
  },
  BDS: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Centre de Brindisi', 'Zentrum von Brindisi', 'Brindisi centre'), duree: '≈ 20 min', prix: '≈ 1-1,50 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 10 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'Achetez le ticket de bus à la librairie du terminal : environ 1 €, contre 1,50 € auprès du chauffeur.',
      'Kaufen Sie das Busticket im Buchladen des Terminals: etwa 1 € statt 1,50 € beim Fahrer.',
      'Buy your bus ticket at the bookshop in the terminal: about €1, against €1.50 from the driver.',
    ),
  },
  CTA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Alibus', vers: tx('Centre de Catane et gare', 'Zentrum von Catania und Bahnhof', 'Catania centre and station'), duree: '15-20 min', prix: '≈ 4 €' },
      { mode: 'taxi', vers: tx('Piazza Duomo ou la gare (tarif fixe)', 'Piazza Duomo oder Bahnhof (Festpreis)', 'Piazza Duomo or the station (fixed fare)'), duree: '≈ 15 min', prix: '≈ 25-28 €' },
    ],
    bonPlan: tx(
      'Le ticket Alibus vaut 90 minutes sur les autres bus de la ville. En taxi, demandez le tarif fixe (« tariffa predeterminata ») avant de partir.',
      'Das Alibus-Ticket gilt 90 Minuten auch in den anderen Stadtbussen. Im Taxi vor der Fahrt den Festpreis („tariffa predeterminata“) verlangen.',
      'The Alibus ticket is valid for 90 minutes on the city’s other buses. By taxi, ask for the fixed fare (“tariffa predeterminata”) before you set off.',
    ),
  },
  PMO: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Trinacria Express', vers: tx('Gare de Palermo Centrale', 'Bahnhof Palermo Centrale', 'Palermo Centrale station'), duree: '≈ 50-60 min', prix: '≈ 6-7 €' },
      { mode: 'bus', nom: 'Prestia e Comandè', vers: tx('Centre de Palerme (Politeama) et gare', 'Zentrum von Palermo (Politeama) und Bahnhof', 'Palermo centre (Politeama) and station'), duree: '≈ 50 min', prix: '≈ 6-6,50 €' },
      { mode: 'taxi', vers: centre, duree: '35-45 min', prix: '≈ 35-50 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 35 km de Palerme. Le billet aller-retour du bus Prestia e Comandè (≈ 11 €) revient moins cher que deux allers.',
      'Der Flughafen liegt 35 km von Palermo entfernt. Das Hin- und Rückfahrticket des Busses Prestia e Comandè (≈ 11 €) ist günstiger als zwei einfache Fahrten.',
      'The airport is 35 km from Palermo. The Prestia e Comandè return bus ticket (≈ €11) is cheaper than two singles.',
    ),
  },
  CAG: {
    verifie: V,
    lignes: [
      { mode: 'train', vers: tx('Gare de Cagliari, au centre', 'Bahnhof Cagliari, im Zentrum', 'Cagliari station, in the centre'), duree: '5-7 min', prix: '≈ 1,30 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 17-20 €' },
    ],
    bonPlan: tx(
      'La gare de l’aéroport est à 5 minutes à pied du terminal, et le train arrive en plein centre pour à peine plus d’un euro.',
      'Der Flughafenbahnhof liegt 5 Gehminuten vom Terminal entfernt, und der Zug fährt für kaum mehr als einen Euro bis ins Zentrum.',
      'The airport station is a 5-minute walk from the terminal, and the train reaches the city centre for little more than a euro.',
    ),
  },
  OLB: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Lignes 2 et 10', 'Linien 2 und 10', 'Lines 2 and 10'), vers: tx('Centre d’Olbia', 'Zentrum von Olbia', 'Olbia centre'), duree: '≈ 15 min', prix: '≈ 1-1,50 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 10 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'L’aéroport n’est qu’à 4 km du centre. Le taxi coûte environ 20 % de plus entre 22 h et 6 h.',
      'Der Flughafen liegt nur 4 km vom Zentrum entfernt. Zwischen 22 und 6 Uhr kostet das Taxi etwa 20 % mehr.',
      'The airport is only 4 km from the centre. Taxis cost about 20% more between 10 pm and 6 am.',
    ),
  },
  SUF: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Tropea (quelques départs par jour)', 'Tropea (wenige Abfahrten pro Tag)', 'Tropea (a few departures a day)'), duree: '≈ 1 h 30', prix: '≈ 4-6 €' },
      { mode: 'train', vers: tx('Tropea, via la gare de Lamezia Terme Centrale', 'Tropea, über den Bahnhof Lamezia Terme Centrale', 'Tropea, via Lamezia Terme Centrale station'), duree: '1 h 30 et plus', prix: '≈ 4-6,50 €' },
      { mode: 'taxi', vers: tx('Lamezia Terme', 'Lamezia Terme', 'Lamezia Terme'), duree: '≈ 15 min', prix: '≈ 25 €' },
    ],
    bonPlan: tx(
      'Il n’y a pas de gare à l’aéroport et les correspondances vers Tropea sont rares : si vous arrivez tard, réservez un transfert à l’avance.',
      'Am Flughafen gibt es keinen Bahnhof, und Verbindungen nach Tropea sind selten: bei später Ankunft einen Transfer vorab buchen.',
      'There is no station at the airport and connections to Tropea are infrequent: if you land late, book a transfer in advance.',
    ),
  },
  RMI: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '9', vers: tx('Gare de Rimini', 'Bahnhof Rimini', 'Rimini station'), duree: '≈ 25 min', prix: '≈ 1-1,50 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 8 km du centre : le bus 9 dessert aussi les hôtels du bord de mer avant d’arriver à la gare.',
      'Der Flughafen liegt 8 km vom Zentrum entfernt: Bus 9 fährt vor dem Bahnhof auch an den Strandhotels vorbei.',
      'The airport is 8 km from the centre: bus 9 also passes the seafront hotels before reaching the station.',
    ),
  },
  PNL: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Ville de Pantelleria (port)', 'Stadt Pantelleria (Hafen)', 'Pantelleria town (port)'), duree: '10-15 min', prix: '≈ 15-35 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 5 km de la ville et les bus sont rares : pour découvrir l’île, louez une voiture ou un scooter dès l’arrivée.',
      'Der Flughafen liegt 5 km von der Stadt entfernt und Busse sind selten: Für die Insel mieten Sie am besten gleich ein Auto oder einen Roller.',
      'The airport is 5 km from town and buses are rare: to explore the island, rent a car or scooter on arrival.',
    ),
  },
  AJA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette ligne 8', 'Shuttle Linie 8', 'Shuttle line 8'), vers: tx('Centre d’Ajaccio et gare', 'Zentrum von Ajaccio und Bahnhof', 'Ajaccio centre and station'), duree: '20-30 min', prix: '≈ 6-10 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 20-25 €' },
      { mode: 'vtc', vers: centre, duree: '≈ 15 min', prix: '≈ 16-20 €' },
    ],
    bonPlan: tx(
      'Le billet de la navette coûte moins cher acheté sur l’application mobile du réseau qu’auprès du chauffeur. Elle ne passe qu’une fois par heure environ.',
      'Das Shuttle-Ticket ist in der App des Verkehrsnetzes günstiger als beim Fahrer. Das Shuttle fährt nur etwa einmal pro Stunde.',
      'The shuttle ticket is cheaper in the network’s mobile app than from the driver. It only runs about once an hour.',
    ),
  },
  BIA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Gare de Bastia, au centre', 'Bahnhof Bastia, im Zentrum', 'Bastia station, in the centre'), duree: '25-45 min', prix: '≈ 9-10 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 30 min', prix: '≈ 40-60 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 20 km de Bastia : la navette coûte quatre à cinq fois moins cher que le taxi, qui passe à environ 55-60 € la nuit et le dimanche.',
      'Der Flughafen liegt 20 km von Bastia entfernt: Das Shuttle kostet vier- bis fünfmal weniger als das Taxi, das nachts und sonntags etwa 55-60 € kostet.',
      'The airport is 20 km from Bastia: the shuttle costs four to five times less than a taxi, which rises to about €55-60 at night and on Sundays.',
    ),
  },
  CLY: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Calvi, à 7 km', 'Calvi, 7 km entfernt', 'Calvi, 7 km away'), duree: '≈ 10 min', prix: '' },
    ],
    bonPlan: tx(
      'Pas de bus public entre l’aéroport et la ville : prenez un taxi (demandez le prix avant de monter) ou réservez un transfert à l’avance.',
      'Kein öffentlicher Bus zwischen Flughafen und Stadt: Nehmen Sie ein Taxi (Preis vorher erfragen) oder buchen Sie einen Transfer.',
      'No public bus between the airport and town: take a taxi (ask the price before you get in) or book a transfer in advance.',
    ),
  },
  FSC: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette', 'Shuttle', 'Shuttle'), vers: tx('Porto-Vecchio (ticket à bord)', 'Porto-Vecchio (Fahrschein im Bus)', 'Porto-Vecchio (ticket on board)'), duree: '≈ 30 min', prix: '' },
      { mode: 'taxi', vers: tx('Porto-Vecchio', 'Porto-Vecchio', 'Porto-Vecchio'), duree: '≈ 30 min', prix: '≈ 50-95 €' },
    ],
    bonPlan: tx(
      'Une navette relie l’aéroport à Porto-Vecchio tous les jours de l’année : bien moins chère que le taxi, souvent au-delà de 80 €.',
      'Ein Shuttle verbindet den Flughafen das ganze Jahr täglich mit Porto-Vecchio: viel günstiger als das Taxi, das oft über 80 € kostet.',
      'A shuttle links the airport with Porto-Vecchio every day of the year: much cheaper than a taxi, which often costs over €80.',
    ),
  },
  BOD: {
    verifie: V,
    lignes: [
      { mode: 'tram', nom: 'A', vers: tx('Centre (Hôtel de Ville, Pey Berland)', 'Zentrum (Hôtel de Ville, Pey Berland)', 'City centre (Hôtel de Ville, Pey Berland)'), duree: '≈ 35 min', prix: '≈ 1,90 €' },
      { mode: 'bus', nom: '30’Direct', vers: tx('Gare Saint-Jean', 'Bahnhof Saint-Jean', 'Saint-Jean station'), duree: '≈ 30 min', prix: '≈ 8 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 35-45 €' },
    ],
    bonPlan: tx(
      'Le tram part devant l’aéroport toutes les 10 minutes avec un simple ticket de 1,90 € (2,10 € s’il est acheté à bord d’un bus) : imbattable.',
      'Die Tram fährt alle 10 Minuten direkt am Flughafen ab, mit einem einfachen Ticket für 1,90 € (2,10 €, wenn im Bus gekauft): unschlagbar.',
      'The tram leaves outside the airport every 10 minutes on a simple €1.90 ticket (€2.10 if bought on a bus): unbeatable.',
    ),
  },
  LIL: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Gares Lille-Flandres et Lille-Europe', 'Bahnhöfe Lille-Flandres und Lille-Europe', 'Lille-Flandres and Lille-Europe stations'), duree: '≈ 20 min', prix: '≈ 8 €' },
      { mode: 'vtc', vers: centre, duree: '≈ 15 min', prix: '≈ 18-30 €' },
    ],
    bonPlan: tx(
      'La navette part toutes les heures, 7 jours sur 7, et arrive juste devant la gare Lille-Flandres, à côté du métro et du tram.',
      'Das Shuttle fährt stündlich, 7 Tage die Woche, und hält direkt vor dem Bahnhof Lille-Flandres, neben U-Bahn und Tram.',
      'The shuttle runs hourly, 7 days a week, and stops right outside Lille-Flandres station, next to the metro and tram.',
    ),
  },
  MPL: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '620', vers: tx('Place de l’Europe (puis tram vers le centre)', 'Place de l’Europe (dann Tram ins Zentrum)', 'Place de l’Europe (then tram to the centre)'), duree: '20-45 min', prix: '≈ 2-3 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 30-40 €' },
    ],
    bonPlan: tx(
      'La navette 620 dessert aussi la gare TGV Sud de France. Prenez le billet combiné navette + tram : environ 3 € jusqu’au centre.',
      'Das Shuttle 620 hält auch am TGV-Bahnhof Sud de France. Nehmen Sie das Kombiticket Shuttle + Tram: etwa 3 € bis ins Zentrum.',
      'Shuttle 620 also serves the Sud de France TGV station. Get the combined shuttle + tram ticket: about €3 to the centre.',
    ),
  },
  NTE: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Centre (Hôtel-Dieu) et gare', 'Zentrum (Hôtel-Dieu) und Bahnhof', 'City centre (Hôtel-Dieu) and station'), duree: '20-30 min', prix: '≈ 9-10 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 35 €' },
    ],
    bonPlan: tx(
      'Le ticket de la navette reste valable 1 heure sur tout le réseau (tram, bus et TER de l’agglomération) : pratique pour finir le trajet jusqu’à l’hôtel.',
      'Das Shuttle-Ticket gilt 1 Stunde im ganzen Netz (Tram, Bus, Regionalzug im Großraum): praktisch für den Weg zum Hotel.',
      'The shuttle ticket stays valid for 1 hour across the network (tram, bus and local trains): handy to finish the trip to your hotel.',
    ),
  },
  BIQ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Ligne 3', 'Linie 3', 'Line 3'), vers: tx('Biarritz et gare de Bayonne', 'Biarritz und Bahnhof Bayonne', 'Biarritz and Bayonne station'), duree: '20-45 min', prix: '≈ 2 €' },
      { mode: 'taxi', vers: tx('Biarritz ou Bayonne', 'Biarritz oder Bayonne', 'Biarritz or Bayonne'), duree: '≈ 10-15 min', prix: '≈ 20-40 €' },
    ],
    bonPlan: tx(
      'L’aéroport est entre Biarritz et Bayonne : la ligne 3 passe toutes les 15 minutes environ en semaine, pour à peine 2 €.',
      'Der Flughafen liegt zwischen Biarritz und Bayonne: Linie 3 fährt werktags etwa alle 15 Minuten für knapp 2 €.',
      'The airport lies between Biarritz and Bayonne: line 3 runs about every 15 minutes on weekdays for barely €2.',
    ),
  },
  TLS: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Centre et gare Matabiau', 'Zentrum und Bahnhof Matabiau', 'City centre and Matabiau station'), duree: '25-35 min', prix: '≈ 9 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 25-35 €' },
    ],
    bonPlan: tx(
      'Le billet de la navette permet aussi de prendre le métro, le tram et les bus de Toulouse pour terminer le trajet. Paiement par carte bancaire possible à bord.',
      'Mit dem Shuttle-Ticket fahren Sie auch mit U-Bahn, Tram und Bussen in Toulouse weiter. Kartenzahlung im Bus möglich.',
      'The shuttle ticket also lets you use Toulouse’s metro, trams and buses to finish your trip. You can pay by card on board.',
    ),
  },
};
