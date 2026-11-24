// Espagne, Portugal, Baléares, Canaries, Madère : relevé en ligne le 24/11/2026.
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const ESPAGNE_PORTUGAL: Record<string, Trajet> = {
  ALC: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'C6', vers: tx('Centre d’Alicante (Plaza del Mar, gare)', 'Zentrum von Alicante (Plaza del Mar, Bahnhof)', 'Alicante centre (Plaza del Mar, station)'), duree: '25-30 min', prix: '≈ 4,70 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 20-27 €' },
    ],
    bonPlan: tx(
      'Le bus C6 passe toutes les 20 minutes environ et s’arrête aussi à la gare : pratique pour continuer en train ou en tram vers Benidorm.',
      'Der Bus C6 fährt etwa alle 20 Minuten und hält auch am Bahnhof: praktisch für die Weiterfahrt mit Zug oder Tram nach Benidorm.',
      'The C6 bus runs about every 20 minutes and also stops at the station: handy to continue by train or tram towards Benidorm.',
    ),
  },
  VLC: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: tx('Lignes 3 et 5', 'Linien 3 und 5', 'Lines 3 and 5'), vers: tx('Centre (Xàtiva, Colón)', 'Zentrum (Xàtiva, Colón)', 'City centre (Xàtiva, Colón)'), duree: '≈ 25 min', prix: '≈ 4,80 €' },
      { mode: 'bus', nom: '150', vers: tx('Centre (bus urbain)', 'Zentrum (Stadtbus)', 'City centre (local bus)'), duree: '30-40 min', prix: '≈ 2,50 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 20-25 €' },
    ],
    bonPlan: tx(
      'Le métro relie directement l’aéroport au centre sans changement ; le bus 150, plus lent, coûte deux fois moins cher.',
      'Die U-Bahn fährt ohne Umsteigen vom Flughafen ins Zentrum; der langsamere Bus 150 kostet nur die Hälfte.',
      'The metro runs straight from the airport to the centre with no change; the slower 150 bus costs half as much.',
    ),
  },
  SVQ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'EA', vers: tx('Centre (Plaza de Armas, Prado de San Sebastián)', 'Zentrum (Plaza de Armas, Prado de San Sebastián)', 'City centre (Plaza de Armas, Prado de San Sebastián)'), duree: '35-40 min', prix: '≈ 6 €' },
      { mode: 'taxi', vers: tx('Centre (tarif fixe)', 'Zentrum (Festpreis)', 'City centre (fixed fare)'), duree: '≈ 20 min', prix: '≈ 25-29 €' },
    ],
    bonPlan: tx(
      'Le taxi a un prix fixe vers le centre : environ 25 € en semaine de jour, un peu plus la nuit, le week-end et les jours fériés.',
      'Taxis haben einen Festpreis ins Zentrum: etwa 25 € werktags tagsüber, etwas mehr nachts, am Wochenende und an Feiertagen.',
      'Taxis charge a fixed fare to the centre: about €25 on weekdays during the day, a little more at night, at weekends and on public holidays.',
    ),
  },
  BIO: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Bizkaibus A3247', vers: tx('Centre de Bilbao (Moyúa) et gare routière', 'Zentrum von Bilbao (Moyúa) und Busbahnhof', 'Bilbao centre (Moyúa) and bus station'), duree: '20-30 min', prix: '≈ 5 €' },
      { mode: 'taxi', vers: centre, duree: '15-20 min', prix: '≈ 21-30 €' },
    ],
    bonPlan: tx(
      'Avec la carte rechargeable Barik, le même bus coûte environ 1,20 € au lieu de 5 € : intéressant si vous utilisez aussi le métro et le tram.',
      'Mit der aufladbaren Barik-Karte kostet derselbe Bus etwa 1,20 € statt 5 €: lohnend, wenn Sie auch U-Bahn und Tram nutzen.',
      'With the rechargeable Barik card the same bus costs about €1.20 instead of €5: worth it if you also use the metro and tram.',
    ),
  },
  IBZ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'L10', vers: tx('Ville d’Ibiza (port)', 'Stadt Ibiza (Hafen)', 'Ibiza Town (port)'), duree: '20-30 min', prix: '≈ 3,50-5 €' },
      { mode: 'taxi', vers: tx('Ville d’Ibiza', 'Stadt Ibiza', 'Ibiza Town'), duree: '15-20 min', prix: '≈ 15-25 €' },
    ],
    bonPlan: tx(
      'Payez le bus par carte bancaire ou QR code : c’est moins cher qu’en espèces. En été, les files de taxis sont longues : le bus est souvent plus rapide.',
      'Bezahlen Sie den Bus mit Karte oder QR-Code: günstiger als bar. Im Sommer sind die Taxischlangen lang, der Bus ist oft schneller.',
      'Pay for the bus by card or QR code: it is cheaper than cash. In summer the taxi queues are long, so the bus is often quicker.',
    ),
  },
  MAH: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '10', vers: tx('Gare routière de Mahón', 'Busbahnhof Mahón', 'Mahón bus station'), duree: '≈ 15 min', prix: '≈ 2,80 €' },
      { mode: 'taxi', vers: tx('Mahón, quartier du port', 'Mahón, Hafenviertel', 'Mahón, port area'), duree: '≈ 10 min', prix: '≈ 18-20 €' },
    ],
    bonPlan: tx(
      'L’aéroport n’est qu’à 5 km de Mahón. Pour Ciutadella ou les plages, il faut changer de bus à la gare routière de Mahón.',
      'Der Flughafen liegt nur 5 km von Mahón entfernt. Nach Ciutadella oder zu den Stränden steigt man am Busbahnhof Mahón um.',
      'The airport is only 5 km from Mahón. For Ciutadella or the beaches, change buses at Mahón bus station.',
    ),
  },
  SCQ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '6A', vers: tx('Praza de Galicia, à quelques minutes à pied de la cathédrale', 'Praza de Galicia, wenige Gehminuten von der Kathedrale', 'Praza de Galicia, a short walk from the cathedral'), duree: '20-35 min', prix: '≈ 1 €' },
      { mode: 'taxi', vers: centre, duree: '15-20 min', prix: '≈ 21-25 €' },
    ],
    bonPlan: tx(
      'Le bus urbain 6A ne coûte qu’environ 1 €, payé au chauffeur. Uber et Bolt ne sont pas présents à Saint-Jacques.',
      'Der Stadtbus 6A kostet nur etwa 1 €, beim Fahrer zu zahlen. Uber und Bolt gibt es in Santiago nicht.',
      'The 6A city bus costs only about €1, paid to the driver. Uber and Bolt do not operate in Santiago.',
    ),
  },
  LPA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Global 60', vers: tx('Las Palmas (San Telmo, Santa Catalina)', 'Las Palmas (San Telmo, Santa Catalina)', 'Las Palmas (San Telmo, Santa Catalina)'), duree: '20-30 min', prix: '≈ 2,30-3 €' },
      { mode: 'taxi', vers: tx('Las Palmas', 'Las Palmas', 'Las Palmas'), duree: '20-30 min', prix: '≈ 30-35 €' },
    ],
    bonPlan: tx(
      'Pour les plages du sud (Maspalomas, Playa del Inglés), d’autres bus Global partent aussi de l’aéroport : inutile de passer par Las Palmas.',
      'Für die Strände im Süden (Maspalomas, Playa del Inglés) fahren andere Global-Busse direkt ab dem Flughafen, ohne Umweg über Las Palmas.',
      'For the southern beaches (Maspalomas, Playa del Inglés), other Global buses leave from the airport too: no need to go via Las Palmas.',
    ),
  },
  TFS: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'TITSA 111', vers: tx('Los Cristianos et Playa de las Américas', 'Los Cristianos und Playa de las Américas', 'Los Cristianos and Playa de las Américas'), duree: '30-40 min', prix: '≈ 3-5 €' },
      { mode: 'taxi', vers: tx('Los Cristianos', 'Los Cristianos', 'Los Cristianos'), duree: '≈ 20 min', prix: '≈ 25-45 €' },
    ],
    bonPlan: tx(
      'L’aéroport du sud est à 15 km des grandes stations balnéaires : le bus suffit si vous avez peu de bagages. La nuit, le taxi coûte environ 25 % de plus.',
      'Der Südflughafen liegt 15 km von den großen Badeorten entfernt: mit wenig Gepäck reicht der Bus. Nachts kostet das Taxi etwa 25 % mehr.',
      'The south airport is 15 km from the main resorts: the bus is fine if you travel light. At night taxis cost about 25% more.',
    ),
  },
  ACE: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Arrecife ou Puerto del Carmen', 'Arrecife oder Puerto del Carmen', 'Arrecife or Puerto del Carmen'), duree: '15-30 min', prix: '≈ 1,50 €' },
      { mode: 'taxi', vers: tx('Arrecife (Puerto del Carmen : 20-30 €)', 'Arrecife (Puerto del Carmen: 20-30 €)', 'Arrecife (Puerto del Carmen: €20-30)'), duree: '10-15 min', prix: '≈ 12-20 €' },
    ],
    bonPlan: tx(
      'Le bus ne coûte qu’environ 1,50 € ; prévoyez de la monnaie, on paie souvent en espèces au chauffeur.',
      'Der Bus kostet nur etwa 1,50 €; halten Sie Kleingeld bereit, oft wird bar beim Fahrer bezahlt.',
      'The bus costs only about €1.50; bring change, as you often pay the driver in cash.',
    ),
  },
  FUE: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '3', vers: tx('Puerto del Rosario (et Caleta de Fuste)', 'Puerto del Rosario (und Caleta de Fuste)', 'Puerto del Rosario (and Caleta de Fuste)'), duree: '10-20 min', prix: '≈ 1,50 €' },
      { mode: 'taxi', vers: tx('Puerto del Rosario (Corralejo : ≈ 60-70 €)', 'Puerto del Rosario (Corralejo: ≈ 60-70 €)', 'Puerto del Rosario (Corralejo: ≈ €60-70)'), duree: '≈ 10 min', prix: '≈ 14-20 €' },
    ],
    bonPlan: tx(
      'Pas de bus direct pour Corralejo : bus 3 jusqu’à Puerto del Rosario, puis bus 6, environ 5 € en tout. Le taxi jusqu’à Corralejo est cher : partagez-le à plusieurs.',
      'Kein Direktbus nach Corralejo: Bus 3 bis Puerto del Rosario, dann Bus 6, insgesamt etwa 5 €. Das Taxi nach Corralejo ist teuer: am besten teilen.',
      'No direct bus to Corralejo: take bus 3 to Puerto del Rosario, then bus 6, about €5 in total. A taxi to Corralejo is expensive: share it.',
    ),
  },
  SPC: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '500', vers: tx('Santa Cruz de La Palma', 'Santa Cruz de La Palma', 'Santa Cruz de La Palma'), duree: '≈ 30 min', prix: '≈ 1,50-2,50 €' },
      { mode: 'taxi', vers: tx('Santa Cruz de La Palma', 'Santa Cruz de La Palma', 'Santa Cruz de La Palma'), duree: '≈ 15 min', prix: '≈ 12-15 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 8 km de Santa Cruz : à deux, le taxi coûte à peine plus cher que le bus.',
      'Der Flughafen liegt 8 km von Santa Cruz entfernt: zu zweit kostet das Taxi kaum mehr als der Bus.',
      'The airport is 8 km from Santa Cruz: for two people a taxi costs barely more than the bus.',
    ),
  },
  FAO: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '16', vers: tx('Centre de Faro (gare routière)', 'Zentrum von Faro (Busbahnhof)', 'Faro centre (bus station)'), duree: '≈ 20 min', prix: '≈ 2,25-2,85 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 10 min', prix: '≈ 10-15 €' },
      { mode: 'vtc', vers: centre, duree: '≈ 10 min', prix: '≈ 7-12 €' },
    ],
    bonPlan: tx(
      'Le centre de Faro n’est qu’à 6 km : en VTC, le trajet coûte souvent moins de 10 €. Pour Albufeira ou Lagos, des bus partent de la gare routière de Faro.',
      'Das Zentrum von Faro ist nur 6 km entfernt: mit einem Fahrdienst kostet die Fahrt oft unter 10 €. Nach Albufeira oder Lagos fahren Busse ab dem Busbahnhof Faro.',
      'Faro centre is only 6 km away: by ride-hailing the trip often costs under €10. For Albufeira or Lagos, buses leave from Faro bus station.',
    ),
  },
  FNC: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Aerobus', vers: tx('Funchal, centre et zone hôtelière', 'Funchal, Zentrum und Hotelzone', 'Funchal, centre and hotel zone'), duree: '≈ 45-50 min', prix: '≈ 5-6,50 €' },
      { mode: 'taxi', vers: tx('Funchal', 'Funchal', 'Funchal'), duree: '≈ 25 min', prix: '≈ 25-35 €' },
    ],
    bonPlan: tx(
      'L’Aerobus s’arrête devant de nombreux hôtels de Funchal ; à trois ou quatre, le taxi revient presque au même prix et va deux fois plus vite.',
      'Der Aerobus hält vor vielen Hotels in Funchal; zu dritt oder viert kostet das Taxi fast gleich viel und ist doppelt so schnell.',
      'The Aerobus stops outside many Funchal hotels; for three or four people a taxi costs about the same and is twice as fast.',
    ),
  },
};
