// Allemagne, îles Britanniques, Scandinavie, Islande, Europe centrale et de l'Est, Chypre, Malte :
// relevé en ligne le 24/11/2026.
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const EUROPE_NORD_EST: Record<string, Trajet> = {
  BER: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'FEX', vers: tx('Gare centrale (Hauptbahnhof)', 'Hauptbahnhof', 'Central station (Hauptbahnhof)'), duree: '≈ 25 min', prix: '≈ 5 €' },
      { mode: 'train', nom: 'S9', vers: tx('Alexanderplatz', 'Alexanderplatz', 'Alexanderplatz'), duree: '≈ 40 min', prix: '≈ 5 €' },
      { mode: 'taxi', vers: centre, duree: '35-50 min', prix: '≈ 45-70 €' },
    ],
    bonPlan: tx(
      'Un billet de zone ABC (≈ 5 €) suffit pour tous les trains vers le centre. Le billet 24 heures ABC (≈ 13 €) devient rentable dès trois trajets.',
      'Ein ABC-Einzelfahrschein (≈ 5 €) reicht für alle Züge ins Zentrum. Das 24-Stunden-Ticket ABC (≈ 13 €) lohnt sich ab drei Fahrten.',
      'A single zone ABC ticket (≈ €5) covers every train into the centre. The 24-hour ABC ticket (≈ €13) pays off from three trips.',
    ),
  },
  HAM: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'S1', vers: tx('Gare centrale (Hauptbahnhof)', 'Hauptbahnhof', 'Central station (Hauptbahnhof)'), duree: '≈ 25 min', prix: '≈ 3,50-4,10 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 30-45 €' },
    ],
    bonPlan: tx(
      'L’aéroport est dans la zone tarifaire de la ville : un ticket normal suffit, sans supplément. Le S1 passe toutes les 10 minutes en journée.',
      'Der Flughafen liegt im Stadttarifgebiet: ein normales Ticket genügt, ohne Zuschlag. Die S1 fährt tagsüber alle 10 Minuten.',
      'The airport is in the city fare zone: a normal ticket is enough, with no supplement. The S1 runs every 10 minutes during the day.',
    ),
  },
  CPH: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: 'M2', vers: tx('Centre (Kongens Nytorv, Nørreport)', 'Zentrum (Kongens Nytorv, Nørreport)', 'City centre (Kongens Nytorv, Nørreport)'), duree: '≈ 15 min', prix: '≈ 30-36 DKK (≈ 4-5 €)' },
      { mode: 'train', vers: tx('Gare centrale (København H)', 'Hauptbahnhof (København H)', 'Central station (København H)'), duree: '≈ 15 min', prix: '≈ 30-36 DKK (≈ 4-5 €)' },
      { mode: 'taxi', vers: centre, duree: '25-35 min', prix: '≈ 260-350 DKK (≈ 35-47 €)' },
    ],
    bonPlan: tx(
      'Métro et train partent tous deux du terminal 3 avec le même ticket 3 zones. Uber n’existe pas à Copenhague, et le taxi coûte sept à dix fois plus cher.',
      'U-Bahn und Zug fahren beide ab Terminal 3 mit demselben 3-Zonen-Ticket. Uber gibt es in Kopenhagen nicht, das Taxi kostet sieben- bis zehnmal mehr.',
      'The metro and train both leave from Terminal 3 on the same 3-zone ticket. Uber does not operate in Copenhagen, and a taxi costs seven to ten times more.',
    ),
  },
  EDI: {
    verifie: V,
    lignes: [
      { mode: 'tram', vers: tx('Centre (Princes Street, St Andrew Square)', 'Zentrum (Princes Street, St Andrew Square)', 'City centre (Princes Street, St Andrew Square)'), duree: '30-35 min', prix: '≈ 7,90 £ (≈ 9 €)' },
      { mode: 'bus', nom: 'Airlink 100', vers: tx('Waverley Bridge, au centre', 'Waverley Bridge, im Zentrum', 'Waverley Bridge, in the centre'), duree: '≈ 30 min', prix: '≈ 6 £ (≈ 7 €)' },
      { mode: 'taxi', vers: centre, duree: '20-40 min', prix: '≈ 20-40 £ (≈ 24-47 €)' },
    ],
    bonPlan: tx(
      'Le bus Airlink 100 est le moins cher et roule presque 24 h sur 24 ; le tram et le bus acceptent le paiement sans contact. Le billet aller-retour du tram (≈ 9,50 £) est très avantageux.',
      'Der Airlink-100-Bus ist am günstigsten und fährt fast rund um die Uhr; Tram und Bus akzeptieren kontaktloses Zahlen. Das Tram-Rückfahrticket (≈ 9,50 £) lohnt sich sehr.',
      'The Airlink 100 bus is the cheapest and runs almost round the clock; tram and bus both take contactless. The tram open return (≈ £9.50) is great value.',
    ),
  },
  MAN: {
    verifie: V,
    lignes: [
      { mode: 'train', vers: tx('Gare de Manchester Piccadilly', 'Bahnhof Manchester Piccadilly', 'Manchester Piccadilly station'), duree: '≈ 17 min', prix: '≈ 4-8 £ (≈ 5-9 €)' },
      { mode: 'taxi', vers: centre, duree: '25-35 min', prix: '≈ 30-40 £ (≈ 35-47 €)' },
    ],
    bonPlan: tx(
      'Les trains vers Piccadilly partent plusieurs fois par heure ; les billets réservés à l’avance démarrent autour de 4 £. Le tram Metrolink dessert aussi l’aéroport, plus lentement.',
      'Züge nach Piccadilly fahren mehrmals pro Stunde; vorab gebuchte Tickets gibt es ab etwa 4 £. Die Metrolink-Tram fährt ebenfalls zum Flughafen, aber langsamer.',
      'Trains to Piccadilly run several times an hour; advance tickets start at about £4. The Metrolink tram also serves the airport, more slowly.',
    ),
  },
  BRS: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'A1 Airport Flyer', vers: tx('Centre de Bristol et gare de Temple Meads', 'Zentrum von Bristol und Bahnhof Temple Meads', 'Bristol centre and Temple Meads station'), duree: '≈ 35 min', prix: '≈ 9,50 £ (≈ 11 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 20-50 £ (≈ 24-59 €)' },
    ],
    bonPlan: tx(
      'Le bus A1 passe jusqu’à toutes les 8 minutes ; l’aller-retour (≈ 16 £) coûte moins cher que deux allers.',
      'Der A1-Bus fährt bis zu alle 8 Minuten; Hin und zurück (≈ 16 £) ist günstiger als zwei Einzelfahrten.',
      'The A1 bus runs up to every 8 minutes; a return (≈ £16) is cheaper than two singles.',
    ),
  },
  LTN: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'DART + Luton Airport Express', vers: tx('Londres St Pancras', 'London St Pancras', 'London St Pancras'), duree: '35-45 min', prix: '≈ 10-25 £ (≈ 12-30 €)' },
    ],
    bonPlan: tx(
      'Réservez le train à l’avance en choisissant la gare « Luton Airport » : la navette DART (≈ 4,90 £) est alors incluse, et les billets démarrent vers 10 £.',
      'Buchen Sie den Zug vorab mit dem Ziel „Luton Airport“: Dann ist der DART-Shuttle (≈ 4,90 £) inklusive, Tickets ab etwa 10 £.',
      'Book the train ahead and choose “Luton Airport” as the station: the DART shuttle (≈ £4.90) is then included, with fares from about £10.',
    ),
  },
  STN: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'Stansted Express', vers: tx('Londres Liverpool Street', 'London Liverpool Street', 'London Liverpool Street'), duree: '≈ 47 min', prix: '≈ 19-25 £ (≈ 22-30 €)' },
      { mode: 'bus', nom: 'National Express', vers: tx('Londres Liverpool Street et autres arrêts', 'London Liverpool Street und weitere Halte', 'London Liverpool Street and other stops'), duree: '70-90 min', prix: '≈ 7-10 £ (≈ 8-12 €)' },
    ],
    bonPlan: tx(
      'Le car réservé en ligne coûte deux à trois fois moins cher que le train. Le Stansted Express propose aussi des billets à l’avance dès 10 £ environ.',
      'Der online gebuchte Bus kostet zwei- bis dreimal weniger als der Zug. Der Stansted Express bietet auch Vorverkaufstickets ab etwa 10 £.',
      'The coach booked online costs two to three times less than the train. Stansted Express also sells advance tickets from about £10.',
    ),
  },
  DUB: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Airlink Express, Dublin Express', vers: tx('Centre de Dublin (O’Connell Street) et gares', 'Zentrum von Dublin (O’Connell Street) und Bahnhöfe', 'Dublin centre (O’Connell Street) and stations'), duree: '30-40 min', prix: '≈ 8-10 €' },
      { mode: 'taxi', vers: centre, duree: '25-40 min', prix: '≈ 25-45 €' },
    ],
    bonPlan: tx(
      'Pas de train ni de tram jusqu’à l’aéroport : les bus express sont la solution la plus simple. L’aller-retour revient moins cher que deux allers.',
      'Es gibt weder Zug noch Tram zum Flughafen: die Expressbusse sind am einfachsten. Hin und zurück ist günstiger als zwei Einzelfahrten.',
      'There is no train or tram to the airport: the express buses are the simplest option. A return is cheaper than two singles.',
    ),
  },
  KEF: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Flybus', vers: tx('Gare routière BSÍ, Reykjavik', 'Busbahnhof BSÍ, Reykjavík', 'BSÍ bus terminal, Reykjavik'), duree: '≈ 45 min', prix: '≈ 4 000 ISK (≈ 28 €)' },
      { mode: 'bus', nom: 'Strætó 55', vers: tx('Reykjavik (bus public, horaires limités)', 'Reykjavík (Linienbus, wenige Fahrten)', 'Reykjavik (public bus, limited timetable)'), duree: '≈ 60 min', prix: '≈ 2 400 ISK (≈ 17 €)' },
      { mode: 'taxi', vers: tx('Reykjavik', 'Reykjavík', 'Reykjavik'), duree: '≈ 45 min', prix: '≈ 16 000-22 500 ISK (≈ 110-155 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est à 50 km de Reykjavik : le taxi est très cher. Le Flybus attend chaque vol ; pour environ 1 300 ISK de plus, il vous dépose à votre hôtel.',
      'Der Flughafen liegt 50 km von Reykjavík entfernt: Taxis sind sehr teuer. Der Flybus wartet auf jeden Flug; für etwa 1 300 ISK mehr bringt er Sie bis zum Hotel.',
      'The airport is 50 km from Reykjavik, so taxis are very expensive. The Flybus meets every flight; for about 1,300 ISK more it drops you at your hotel.',
    ),
  },
  BUD: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '100E', vers: tx('Deák Ferenc tér, au centre (24 h sur 24)', 'Deák Ferenc tér, im Zentrum (rund um die Uhr)', 'Deák Ferenc tér, in the centre (24 hours)'), duree: '≈ 40 min', prix: '≈ 2 500 HUF (≈ 6,50 €)' },
      { mode: 'taxi', vers: centre, duree: '25-40 min', prix: '≈ 11 000-13 000 HUF (≈ 28-33 €)' },
    ],
    bonPlan: tx(
      'Le bus 100E roule jour et nuit, avec un billet spécial (les tickets ordinaires ne sont pas valables). Les taxis officiels de l’aéroport ont des tarifs réglementés.',
      'Der Bus 100E fährt Tag und Nacht, mit einem eigenen Ticket (normale Fahrscheine gelten nicht). Die offiziellen Flughafentaxis haben regulierte Tarife.',
      'Bus 100E runs day and night on its own ticket (ordinary tickets are not valid). Official airport taxis have regulated fares.',
    ),
  },
  VIE: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'S7, Railjet', vers: tx('Wien Mitte et gare centrale', 'Wien Mitte und Hauptbahnhof', 'Wien Mitte and the main station'), duree: '15-25 min', prix: '≈ 4,40-5,50 €' },
      { mode: 'train', nom: 'CAT', vers: tx('Wien Mitte, sans arrêt', 'Wien Mitte, ohne Halt', 'Wien Mitte, non-stop'), duree: '≈ 16 min', prix: '≈ 14,90 €' },
      { mode: 'taxi', vers: tx('Centre (prix fixe)', 'Zentrum (Fixpreis)', 'City centre (fixed price)'), duree: '≈ 25 min', prix: '≈ 36-45 €' },
    ],
    bonPlan: tx(
      'Le train régional S7 ou le Railjet coûtent trois fois moins cher que le CAT pour à peine quelques minutes de plus. Des travaux sur la ligne jusqu’en 2027 peuvent modifier les horaires : vérifiez avant de partir.',
      'S-Bahn S7 oder Railjet kosten ein Drittel des CAT und sind kaum langsamer. Bauarbeiten an der Strecke bis 2027 können den Fahrplan ändern: vorher prüfen.',
      'The S7 train or the Railjet cost a third of the CAT and are barely slower. Works on the line until 2027 may change timetables: check before you go.',
    ),
  },
  BTS: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '61', vers: tx('Gare centrale de Bratislava', 'Hauptbahnhof Bratislava', 'Bratislava main station'), duree: '25-45 min', prix: '≈ 1,20 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'Sans changement, un ticket de 30 minutes suffit pour aller de l’aéroport à la gare avec le bus 61. Pas de tarif taxi réglementé : demandez le compteur ou fixez le prix avant.',
      'Ohne Umsteigen reicht ein 30-Minuten-Ticket für Bus 61 vom Flughafen zum Bahnhof. Kein regulierter Taxitarif: Taxameter verlangen oder Preis vorher vereinbaren.',
      'With no change, a 30-minute ticket covers bus 61 from the airport to the station. There is no regulated taxi fare: ask for the meter or agree the price first.',
    ),
  },
  KRK: {
    verifie: V,
    lignes: [
      { mode: 'train', vers: tx('Gare centrale (Kraków Główny)', 'Hauptbahnhof (Kraków Główny)', 'Main station (Kraków Główny)'), duree: '≈ 18 min', prix: '≈ 17-20 PLN (≈ 4-5 €)' },
      { mode: 'taxi', vers: centre, duree: '25-40 min', prix: '≈ 90-110 PLN (≈ 21-26 €)' },
      { mode: 'vtc', vers: centre, duree: '25-40 min', prix: '≈ 60-150 PLN (≈ 14-35 €)' },
    ],
    bonPlan: tx(
      'Le train part toutes les 30 minutes de 4 h 30 à minuit environ et arrive à deux pas de la vieille ville.',
      'Der Zug fährt etwa von 4.30 Uhr bis Mitternacht alle 30 Minuten und hält nahe der Altstadt.',
      'The train runs every 30 minutes from about 4.30 am to midnight and stops close to the old town.',
    ),
  },
  WAW: {
    verifie: V,
    lignes: [
      { mode: 'train', nom: 'S2, S3', vers: tx('Centre (Śródmieście, gare centrale)', 'Zentrum (Śródmieście, Hauptbahnhof)', 'City centre (Śródmieście, central station)'), duree: '20-25 min', prix: '≈ 4,40 PLN (≈ 1 €)' },
      { mode: 'bus', nom: '175', vers: tx('Centre et vieille ville', 'Zentrum und Altstadt', 'City centre and old town'), duree: '≈ 30 min', prix: '≈ 4,40 PLN (≈ 1 €)' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 50-65 PLN (≈ 12-15 €)' },
    ],
    bonPlan: tx(
      'Le même ticket de 75 minutes (≈ 1 €) vaut pour le train et le bus 175, correspondances comprises. En taxi, mettez-vous d’accord sur le prix avant de partir.',
      'Dasselbe 75-Minuten-Ticket (≈ 1 €) gilt für Zug und Bus 175, Umstiege inklusive. Beim Taxi den Preis vor der Fahrt vereinbaren.',
      'The same 75-minute ticket (≈ €1) covers the train and bus 175, transfers included. By taxi, agree the price before setting off.',
    ),
  },
  WRO: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '106', vers: tx('Centre et gare centrale', 'Zentrum und Hauptbahnhof', 'City centre and main station'), duree: '35-40 min', prix: '≈ 4,60 PLN (≈ 1 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 75-100 PLN (≈ 17-23 €)' },
    ],
    bonPlan: tx(
      'Le bus 106 passe toutes les 15 à 20 minutes ; la nuit, c’est la ligne 206. Le taxi peut coûter jusqu’à 50 % de plus la nuit.',
      'Bus 106 fährt alle 15 bis 20 Minuten; nachts übernimmt die Linie 206. Nachts kann das Taxi bis zu 50 % mehr kosten.',
      'Bus 106 runs every 15 to 20 minutes; at night it is line 206. Taxis can cost up to 50% more at night.',
    ),
  },
  POZ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '159, 148', vers: tx('Gare centrale (Poznań Główny)', 'Hauptbahnhof (Poznań Główny)', 'Main station (Poznań Główny)'), duree: '20-25 min', prix: '≈ 6 PLN (≈ 1,40 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 30-40 PLN (≈ 7-9 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est tout proche du centre : à deux ou trois, le taxi ou le VTC coûte à peine plus que le bus.',
      'Der Flughafen liegt nah am Zentrum: zu zweit oder dritt kostet Taxi oder Fahrdienst kaum mehr als der Bus.',
      'The airport is close to the centre: for two or three people, a taxi or ride-hail costs barely more than the bus.',
    ),
  },
  OTP: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '100 Express', vers: tx('Piața Unirii, au centre (24 h sur 24)', 'Piața Unirii, im Zentrum (rund um die Uhr)', 'Piața Unirii, in the centre (24 hours)'), duree: '45-60 min', prix: '≈ 3 lei (≈ 0,60 €)' },
      { mode: 'train', vers: tx('Gare du Nord (Gara de Nord)', 'Nordbahnhof (Gara de Nord)', 'North station (Gara de Nord)'), duree: '20-25 min', prix: '≈ 6,50 lei (≈ 1,30 €)' },
      { mode: 'vtc', nom: 'Uber, Bolt', vers: centre, duree: '30-45 min', prix: '≈ 13 € +' },
    ],
    bonPlan: tx(
      'Le bus 100 roule jour et nuit pour environ 0,60 €. Pour la voiture, préférez Uber ou Bolt aux chauffeurs qui vous abordent dans le hall.',
      'Bus 100 fährt Tag und Nacht für etwa 0,60 €. Für das Auto lieber Uber oder Bolt als Fahrer, die Sie in der Halle ansprechen.',
      'Bus 100 runs day and night for about €0.60. For a car, use Uber or Bolt rather than drivers who approach you in the hall.',
    ),
  },
  CLJ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '8', vers: tx('Piața Mihai Viteazul, au centre', 'Piața Mihai Viteazul, im Zentrum', 'Piața Mihai Viteazul, in the centre'), duree: '≈ 30 min', prix: '≈ 3-4 lei (≈ 0,70 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 30-50 lei (≈ 6-10 €)' },
      { mode: 'vtc', vers: centre, duree: '≈ 20 min', prix: '≈ 25-45 lei (≈ 5-9 €)' },
    ],
    bonPlan: tx(
      'Le bus 8 passe toutes les 15 minutes environ, mais pas après 22 h : pour une arrivée tardive, prenez un taxi ou un VTC, qui restent bon marché.',
      'Bus 8 fährt etwa alle 15 Minuten, aber nicht nach 22 Uhr: bei später Ankunft Taxi oder Fahrdienst nehmen, beides bleibt günstig.',
      'Bus 8 runs about every 15 minutes, but not after 10 pm: for a late arrival take a taxi or ride-hail, both still cheap.',
    ),
  },
  TGM: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Târgu Mureș, à 17 km', 'Târgu Mureș, 17 km entfernt', 'Târgu Mureș, 17 km away'), duree: '≈ 20 min', prix: '≈ 28-40 €' },
    ],
    bonPlan: tx(
      'Pas de bus fiable depuis l’aéroport : réservez un transfert à prix fixe (dès 28 € environ) ou demandez le prix au chauffeur avant de partir.',
      'Kein verlässlicher Bus ab dem Flughafen: Transfer zum Festpreis buchen (ab etwa 28 €) oder den Preis vorher beim Fahrer erfragen.',
      'No reliable bus from the airport: book a fixed-price transfer (from about €28) or ask the driver for the price before setting off.',
    ),
  },
  LCA: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Centre de Larnaca (plus cher de 21 h à 4 h)', 'Zentrum von Larnaka (21-4 Uhr teurer)', 'Larnaca centre (dearer 9 pm-4 am)'), duree: '20-30 min', prix: '≈ 2,70-4,70 €' },
      { mode: 'taxi', vers: centre, duree: '10-15 min', prix: '≈ 15-25 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 5 km du centre de Larnaca. Pour Nicosie, Limassol ou Ayia Napa, des bus directs partent aussi de l’aéroport.',
      'Der Flughafen liegt 5 km vom Zentrum Larnakas entfernt. Nach Nikosia, Limassol oder Ayia Napa fahren auch Direktbusse ab dem Flughafen.',
      'The airport is 5 km from Larnaca centre. For Nicosia, Limassol or Ayia Napa, direct buses also leave from the airport.',
    ),
  },
  MLA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'X4', vers: tx('La Valette', 'Valletta', 'Valletta'), duree: '≈ 25 min', prix: '≈ 1,50-2,50 €' },
      { mode: 'taxi', vers: tx('La Valette (tarif fixe ; Sliema : 20-25 €)', 'Valletta (Festpreis; Sliema: 20-25 €)', 'Valletta (fixed fare; Sliema: €20-25)'), duree: '≈ 15 min', prix: '≈ 17-20 €' },
      { mode: 'vtc', nom: 'Bolt', vers: tx('La Valette', 'Valletta', 'Valletta'), duree: '≈ 15 min', prix: '≈ 8-15 €' },
    ],
    bonPlan: tx(
      'Les taxis officiels se paient d’avance au comptoir du hall d’arrivée, à prix fixe. Bolt est souvent moins cher ; pour Sliema, prenez le bus X7.',
      'Offizielle Taxis bezahlt man vorab am Schalter in der Ankunftshalle, zum Festpreis. Bolt ist oft günstiger; nach Sliema fährt der Bus X7.',
      'Official taxis are prepaid at the desk in arrivals, at a fixed price. Bolt is often cheaper; for Sliema, take bus X7.',
    ),
  },
  RMO: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '165', vers: tx('Centre de Chișinău', 'Zentrum von Chișinău', 'Chișinău centre'), duree: '25-35 min', prix: '≈ 6 lei (≈ 0,30 €)' },
      { mode: 'vtc', nom: 'Bolt, inDriver', vers: centre, duree: '≈ 20 min', prix: '≈ 60-100 lei (≈ 3-5 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 80-160 lei (≈ 4-8 €)' },
    ],
    bonPlan: tx(
      'Les applications Bolt et inDriver coûtent moins cher que les taxis devant le terminal, qui gonflent souvent les prix pour les étrangers. Le bus se paie en espèces au chauffeur.',
      'Die Apps Bolt und inDriver sind günstiger als die Taxis vor dem Terminal, die von Ausländern oft zu viel verlangen. Der Bus wird bar beim Fahrer bezahlt.',
      'The Bolt and inDriver apps are cheaper than the taxis outside the terminal, which often overcharge foreigners. Pay the bus driver in cash.',
    ),
  },
};
