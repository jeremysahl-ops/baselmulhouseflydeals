// Grèce, Croatie, Balkans, Bulgarie, Arménie : relevé en ligne le 24/11/2026.
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const GRECE_BALKANS: Record<string, Trajet> = {
  ATH: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: tx('Ligne 3', 'Linie 3', 'Line 3'), vers: tx('Syntagma, au centre', 'Syntagma, im Zentrum', 'Syntagma, in the centre'), duree: '≈ 40 min', prix: '≈ 9 €' },
      { mode: 'bus', nom: 'X95', vers: tx('Syntagma, 24 h sur 24', 'Syntagma, rund um die Uhr', 'Syntagma, 24 hours a day'), duree: '60-90 min', prix: '≈ 5,50 €' },
      { mode: 'taxi', vers: tx('Centre (tarif fixe ; de minuit à 5 h : 55 €)', 'Zentrum (Festpreis; 0-5 Uhr: 55 €)', 'City centre (fixed fare; midnight-5 am: €55)'), duree: '35-50 min', prix: '≈ 40-55 €' },
    ],
    bonPlan: tx(
      'Le taxi a un tarif fixe vers le centre, tout compris : environ 40 € de 5 h à minuit. À trois ou quatre, il revient moins cher que le métro, à 9 € par personne.',
      'Taxis haben einen Festpreis ins Zentrum, alles inklusive: etwa 40 € von 5 Uhr bis Mitternacht. Zu dritt oder viert günstiger als die U-Bahn mit 9 € pro Person.',
      'Taxis charge an all-inclusive fixed fare to the centre: about €40 from 5 am to midnight. For three or four people it is cheaper than the metro at €9 each.',
    ),
  },
  HER: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '1', vers: tx('Centre d’Héraklion', 'Zentrum von Heraklion', 'Heraklion centre'), duree: '20-30 min', prix: '≈ 1,50-2 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 5 km du centre seulement. Pour La Canée ou Réthymnon, les bus régionaux KTEL partent de la gare routière d’Héraklion.',
      'Der Flughafen liegt nur 5 km vom Zentrum entfernt. Nach Chania oder Rethymno fahren KTEL-Regionalbusse ab dem Busbahnhof Heraklion.',
      'The airport is only 5 km from the centre. For Chania or Rethymno, KTEL regional buses leave from Heraklion bus station.',
    ),
  },
  CHQ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'KTEL', vers: tx('Gare routière de La Canée', 'Busbahnhof Chania', 'Chania bus station'), duree: '≈ 30 min', prix: '≈ 2,50 €' },
      { mode: 'taxi', vers: tx('La Canée', 'Chania', 'Chania'), duree: '≈ 20 min', prix: '≈ 23-35 €' },
    ],
    bonPlan: tx(
      'Le bus s’arrête en face du hall des départs et ne coûte que 2,50 € : dix fois moins que le taxi.',
      'Der Bus hält gegenüber der Abflughalle und kostet nur 2,50 €: zehnmal weniger als das Taxi.',
      'The bus stops opposite the departures hall and costs only €2.50: ten times less than a taxi.',
    ),
  },
  RHO: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'KTEL', vers: tx('Ville de Rhodes (près du Nouveau Marché)', 'Stadt Rhodos (beim Neuen Markt)', 'Rhodes Town (near the New Market)'), duree: '35-40 min', prix: '≈ 2,20-2,50 €' },
      { mode: 'taxi', vers: tx('Ville de Rhodes', 'Stadt Rhodos', 'Rhodes Town'), duree: '20-25 min', prix: '≈ 27-29 €' },
    ],
    bonPlan: tx(
      'Le ticket de bus s’achète en espèces au chauffeur. Pour Lindos, comptez environ 75-85 € en taxi : le bus via la ville de Rhodes est bien moins cher.',
      'Das Busticket zahlt man bar beim Fahrer. Nach Lindos kostet das Taxi etwa 75-85 €: der Bus über Rhodos-Stadt ist viel günstiger.',
      'Pay the bus driver in cash. To Lindos a taxi costs about €75-85: the bus via Rhodes Town is much cheaper.',
    ),
  },
  KGS: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'KTEL', vers: tx('Ville de Kos', 'Stadt Kos', 'Kos Town'), duree: '≈ 40 min', prix: '≈ 3-7 €' },
      { mode: 'taxi', vers: tx('Ville de Kos', 'Stadt Kos', 'Kos Town'), duree: '30-35 min', prix: '≈ 35-45 €' },
    ],
    bonPlan: tx(
      'L’aéroport est au centre de l’île, à 25 km de la ville. Le bus se paie en espèces ; après minuit, le taxi peut coûter près du double.',
      'Der Flughafen liegt in der Inselmitte, 25 km von der Stadt. Der Bus wird bar bezahlt; nach Mitternacht kann das Taxi fast doppelt so viel kosten.',
      'The airport is in the middle of the island, 25 km from town. Pay the bus in cash; after midnight a taxi can cost almost double.',
    ),
  },
  CFU: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '15', vers: tx('Ville de Corfou (place San Rocco)', 'Stadt Korfu (Platz San Rocco)', 'Corfu Town (San Rocco Square)'), duree: '≈ 10-15 min', prix: '≈ 1,10-1,70 €' },
      { mode: 'taxi', vers: tx('Ville de Corfou', 'Stadt Korfu', 'Corfu Town'), duree: '≈ 10 min', prix: '≈ 15-20 €' },
    ],
    bonPlan: tx(
      'Achetez le ticket de bus avant de monter : environ 1,10 € au lieu de 1,70 €. Évitez les chauffeurs non officiels du hall d’arrivée, qui peuvent demander jusqu’à 45 €.',
      'Kaufen Sie das Busticket vor dem Einsteigen: etwa 1,10 € statt 1,70 €. Meiden Sie inoffizielle Fahrer in der Ankunftshalle, die bis zu 45 € verlangen.',
      'Buy your bus ticket before boarding: about €1.10 instead of €1.70. Avoid unofficial drivers in the arrivals hall, who may charge up to €45.',
    ),
  },
  SKG: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('01X (nuit : 01N)', '01X (nachts: 01N)', '01X (night: 01N)'), vers: tx('Centre et gare routière', 'Zentrum und Busbahnhof', 'City centre and bus station'), duree: '50-70 min', prix: '≈ 1,80-2 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 20-35 €' },
    ],
    bonPlan: tx(
      'Le bus 01X ne coûte que 2 € environ et le 01N prend le relais la nuit. Validez votre ticket dès la montée.',
      'Der Bus 01X kostet nur etwa 2 €, nachts übernimmt der 01N. Entwerten Sie das Ticket gleich beim Einsteigen.',
      'Bus 01X costs only about €2 and the 01N takes over at night. Validate your ticket as soon as you board.',
    ),
  },
  DBV: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Platanus', vers: tx('Vieille ville (porte Ploče) et gare routière', 'Altstadt (Ploče-Tor) und Busbahnhof', 'Old Town (Ploče Gate) and bus station'), duree: '30-40 min', prix: '≈ 10 €' },
      { mode: 'taxi', vers: tx('Vieille ville', 'Altstadt', 'Old Town'), duree: '≈ 30 min', prix: '≈ 35-60 €' },
      { mode: 'vtc', vers: tx('Vieille ville', 'Altstadt', 'Old Town'), duree: '≈ 30 min', prix: '≈ 25-40 €' },
    ],
    bonPlan: tx(
      'Le billet aller-retour ouvert de la navette coûte environ 15 € au lieu de deux fois 10 €. Il s’achète avant de monter, pas dans le bus.',
      'Das offene Hin- und Rückfahrticket des Shuttles kostet etwa 15 € statt zweimal 10 €. Es wird vor dem Einsteigen gekauft, nicht im Bus.',
      'The open return shuttle ticket costs about €15 instead of twice €10. Buy it before boarding, not on the bus.',
    ),
  },
  SPU: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Gare routière de Split, près du port', 'Busbahnhof Split, am Hafen', 'Split bus station, by the port'), duree: '30-40 min', prix: '≈ 8-10 €' },
      { mode: 'bus', nom: '37', vers: tx('Gare routière locale (à 1,5 km du centre)', 'Lokaler Busbahnhof (1,5 km vom Zentrum)', 'Local bus station (1.5 km from the centre)'), duree: '50-60 min', prix: '≈ 3 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 30 min', prix: '≈ 25-55 €' },
    ],
    bonPlan: tx(
      'L’aéroport est à 25 km de Split, plus près de Trogir. En VTC (Bolt), le trajet coûte souvent près de moitié moins que le taxi officiel.',
      'Der Flughafen liegt 25 km von Split entfernt, näher an Trogir. Mit Bolt kostet die Fahrt oft fast nur die Hälfte des offiziellen Taxis.',
      'The airport is 25 km from Split, closer to Trogir. By ride-hailing (Bolt) the trip often costs about half the official taxi fare.',
    ),
  },
  ZAD: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Gare routière et vieille ville de Zadar', 'Busbahnhof und Altstadt von Zadar', 'Zadar bus station and old town'), duree: '≈ 20-30 min', prix: '≈ 4-6 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 20-40 €' },
    ],
    bonPlan: tx(
      'La navette part environ une demi-heure après chaque arrivée de vol : inutile de réserver. En taxi, demandez le prix ou vérifiez le compteur avant de partir.',
      'Das Shuttle fährt etwa eine halbe Stunde nach jeder Flugankunft: keine Reservierung nötig. Im Taxi Preis erfragen oder Taxameter prüfen.',
      'The shuttle leaves about half an hour after each flight lands: no need to book. By taxi, ask the price or check the meter before setting off.',
    ),
  },
  PUY: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette aéroport', 'Flughafen-Shuttle', 'Airport shuttle'), vers: tx('Gare routière de Pula', 'Busbahnhof Pula', 'Pula bus station'), duree: '≈ 15-20 min', prix: '≈ 6 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 20-35 €' },
    ],
    bonPlan: tx(
      'La navette officielle part 30 minutes après l’atterrissage de chaque vol. Il n’y a pas de tarif officiel pour les taxis : fixez le prix avant de monter.',
      'Das offizielle Shuttle fährt 30 Minuten nach jeder Landung. Für Taxis gibt es keinen offiziellen Tarif: Preis vor dem Einsteigen vereinbaren.',
      'The official shuttle leaves 30 minutes after each flight lands. There is no official taxi tariff: agree the price before getting in.',
    ),
  },
  TIV: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Kotor', 'Kotor', 'Kotor'), duree: '≈ 15 min', prix: '≈ 12-20 €' },
      { mode: 'taxi', vers: tx('Budva', 'Budva', 'Budva'), duree: '≈ 25 min', prix: '≈ 25-45 €' },
      { mode: 'bus', vers: tx('Budva, depuis la gare routière de Tivat (à 1,5 km à pied)', 'Budva, ab Busbahnhof Tivat (1,5 km zu Fuß)', 'Budva, from Tivat bus station (1.5 km walk)'), duree: '≈ 50 min', prix: '≈ 4-8 €' },
    ],
    bonPlan: tx(
      'Aucun bus ne s’arrête à l’aéroport. En été, les prix des taxis montent : beaucoup d’hôtels et de loueurs proposent un transfert à prix fixe, demandez-le à la réservation.',
      'Am Flughafen hält kein Bus. Im Sommer steigen die Taxipreise: viele Hotels und Vermieter bieten einen Transfer zum Festpreis an, fragen Sie bei der Buchung.',
      'No bus stops at the airport. In summer taxi prices rise: many hotels and hosts offer a fixed-price transfer, so ask when you book.',
    ),
  },
  SJJ: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Centrotrans', vers: tx('Centre de Sarajevo (Baščaršija)', 'Zentrum von Sarajevo (Baščaršija)', 'Sarajevo centre (Baščaršija)'), duree: '≈ 30 min', prix: '≈ 5 KM (≈ 2,50 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 20 KM (≈ 10 €)' },
    ],
    bonPlan: tx(
      'Le mark bosnien (KM) vaut environ 0,50 €. Le bus comprend une valise de 23 kg ; chaque bagage en plus coûte 5 KM.',
      'Die Konvertible Mark (KM) ist etwa 0,50 € wert. Im Bus ist ein Koffer bis 23 kg inklusive; jedes weitere Gepäckstück kostet 5 KM.',
      'The Bosnian mark (KM) is worth about €0.50. The bus includes one 23 kg suitcase; each extra bag costs 5 KM.',
    ),
  },
  TZL: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Centre de Tuzla (environ toutes les 2 h)', 'Zentrum von Tuzla (etwa alle 2 Std.)', 'Tuzla centre (about every 2 hours)'), duree: '≈ 20-30 min', prix: '≈ 2,50 KM (≈ 1,30 €)' },
      { mode: 'taxi', vers: tx('Centre de Tuzla (tarif fixe)', 'Zentrum von Tuzla (Festpreis)', 'Tuzla centre (fixed fare)'), duree: '≈ 20 min', prix: '≈ 30 KM (≈ 15 €)' },
    ],
    bonPlan: tx(
      'Le taxi vers le centre a un tarif fixe d’environ 30 KM, à payer en espèces : au-delà, c’est trop cher. Pour Sarajevo, des cars partent de la gare routière de Tuzla (≈ 3 h).',
      'Das Taxi ins Zentrum hat einen Festpreis von etwa 30 KM, bar zu zahlen: mehr ist zu viel. Nach Sarajevo fahren Busse ab dem Busbahnhof Tuzla (≈ 3 Std.).',
      'Taxis to the centre charge a fixed fare of about 30 KM, cash only: anything more is too much. For Sarajevo, coaches leave from Tuzla bus station (≈ 3 hours).',
    ),
  },
  BNX: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: tx('Navette', 'Shuttle', 'Shuttle'), vers: tx('Centre de Banja Luka', 'Zentrum von Banja Luka', 'Banja Luka centre'), duree: '35-40 min', prix: '≈ 10-12 KM (≈ 5-6 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 30 min', prix: '≈ 30-45 KM (≈ 15-23 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est à 25 km de la ville. La carte bancaire n’est pas toujours acceptée : prévoyez quelques marks (KM) en petites coupures.',
      'Der Flughafen liegt 25 km von der Stadt entfernt. Karten werden nicht immer akzeptiert: halten Sie etwas KM in kleinen Scheinen bereit.',
      'The airport is 25 km from the city. Cards are not always accepted: carry some marks (KM) in small notes.',
    ),
  },
  TIA: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Rinas Express', vers: tx('Centre de Tirana', 'Zentrum von Tirana', 'Tirana centre'), duree: '≈ 30 min', prix: '≈ 400 lekë (≈ 4 €)' },
      { mode: 'taxi', vers: tx('Centre (tarif fixe)', 'Zentrum (Festpreis)', 'City centre (fixed fare)'), duree: '≈ 25 min', prix: '≈ 22-25 €' },
    ],
    bonPlan: tx(
      'Le bus passe environ toutes les heures mais s’arrête vers 19-20 h. Après, prenez un taxi officiel et convenez du prix en lekë avant de monter.',
      'Der Bus fährt etwa stündlich, aber nur bis gegen 19-20 Uhr. Danach ein offizielles Taxi nehmen und den Preis in Lek vorher vereinbaren.',
      'The bus runs about hourly but stops around 7-8 pm. After that, take an official taxi and agree the price in lekë before getting in.',
    ),
  },
  SKP: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Vardar Express', vers: tx('Centre de Skopje', 'Zentrum von Skopje', 'Skopje centre'), duree: '30-40 min', prix: '≈ 200 MKD (≈ 3 €)' },
      { mode: 'taxi', vers: tx('Centre (tarif affiché)', 'Zentrum (ausgehängter Tarif)', 'City centre (posted fare)'), duree: '≈ 25 min', prix: '≈ 1 200-1 500 MKD (≈ 20-25 €)' },
    ],
    bonPlan: tx(
      'Les prix des taxis officiels sont affichés à la sortie de l’aéroport et dans chaque voiture : vérifiez-les avant de partir.',
      'Die Preise der offiziellen Taxis hängen am Flughafenausgang und in jedem Wagen aus: vor der Fahrt prüfen.',
      'Official taxi fares are posted at the airport exit and in every car: check them before you set off.',
    ),
  },
  OHD: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Ohrid (tarif fixe)', 'Ohrid (Festpreis)', 'Ohrid (fixed fare)'), duree: '≈ 15 min', prix: '≈ 730 MKD (≈ 12 €)' },
    ],
    bonPlan: tx(
      'Pas de navette régulière : les taxis de l’aéroport appliquent des tarifs fixes, publiés sur le site de l’aéroport. Ils acceptent les denars et les euros.',
      'Kein regelmäßiges Shuttle: Die Flughafentaxis haben Festpreise, die auf der Website des Flughafens stehen. Denar und Euro werden angenommen.',
      'No regular shuttle: airport taxis charge fixed fares, published on the airport’s website. They accept denars and euros.',
    ),
  },
  BEG: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'A1', vers: tx('Place Slavija, au centre', 'Slavija-Platz, im Zentrum', 'Slavija Square, in the centre'), duree: '≈ 30 min', prix: '≈ 300-400 RSD (≈ 3 €)' },
      { mode: 'bus', nom: '72', vers: tx('Zeleni Venac (bus urbain)', 'Zeleni Venac (Stadtbus)', 'Zeleni Venac (city bus)'), duree: '≈ 45 min', prix: '≈ 0-1 €' },
      { mode: 'taxi', vers: tx('Centre (tarif fixe par zone)', 'Zentrum (Festpreis nach Zone)', 'City centre (fixed zone fare)'), duree: '≈ 25 min', prix: '≈ 1 800-3 000 RSD (≈ 15-25 €)' },
    ],
    bonPlan: tx(
      'Prenez le taxi avec un bon délivré au comptoir officiel du hall d’arrivée : le prix est fixé selon la zone. Ignorez les chauffeurs qui vous abordent dans le terminal.',
      'Nehmen Sie das Taxi mit einem Gutschein vom offiziellen Schalter in der Ankunftshalle: Festpreis nach Zone. Ignorieren Sie Fahrer, die Sie im Terminal ansprechen.',
      'Take a taxi with a voucher from the official desk in arrivals: the price is fixed by zone. Ignore drivers who approach you in the terminal.',
    ),
  },
  INI: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '34', vers: tx('Centre de Niš', 'Zentrum von Niš', 'Niš centre'), duree: '≈ 15-20 min', prix: '≈ 0-60 RSD' },
      { mode: 'taxi', vers: centre, duree: '≈ 10 min', prix: '≈ 250-900 RSD (≈ 2-8 €)' },
    ],
    bonPlan: tx(
      'L’aéroport n’est qu’à 4 km du centre. En taxi, choisissez une compagnie avec compteur ou passez par une application : la course dépasse rarement 8 €.',
      'Der Flughafen liegt nur 4 km vom Zentrum. Beim Taxi ein Unternehmen mit Taxameter oder eine App wählen: die Fahrt kostet selten mehr als 8 €.',
      'The airport is only 4 km from the centre. By taxi, choose a company with a meter or use an app: the ride rarely costs more than €8.',
    ),
  },
  TGD: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 10-15 €' },
      { mode: 'train', vers: tx('Podgorica (gare à 10 min à pied de l’aéroport)', 'Podgorica (Bahnhof 10 Gehminuten vom Flughafen)', 'Podgorica (station a 10-minute walk from the airport)'), duree: '≈ 10 min', prix: '≈ 1-2 €' },
    ],
    bonPlan: tx(
      'Le taxi propose souvent un prix fixe pour le centre : demandez-le avant de monter. La petite gare voisine est l’option la moins chère, mais les trains sont rares.',
      'Taxis bieten oft einen Festpreis ins Zentrum an: vorher erfragen. Der nahe Bahnhof ist am günstigsten, aber Züge fahren selten.',
      'Taxis often offer a fixed price to the centre: ask before getting in. The nearby station is the cheapest option, but trains are infrequent.',
    ),
  },
  SOF: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: 'M4', vers: tx('Serdika, au centre (depuis le terminal 2)', 'Serdika, im Zentrum (ab Terminal 2)', 'Serdika, in the centre (from Terminal 2)'), duree: '≈ 20 min', prix: '≈ 0,80 €' },
      { mode: 'taxi', nom: 'OK Supertrans', vers: centre, duree: '≈ 20 min', prix: '≈ 10-15 €' },
    ],
    bonPlan: tx(
      'Le métro part directement du terminal 2 pour moins d’1 €. En taxi, passez uniquement par le comptoir officiel OK Supertrans et refusez les chauffeurs qui vous abordent.',
      'Die U-Bahn fährt direkt ab Terminal 2 für unter 1 €. Beim Taxi nur den offiziellen Schalter von OK Supertrans nutzen und Fahrer ablehnen, die Sie ansprechen.',
      'The metro leaves straight from Terminal 2 for under €1. For a taxi, use only the official OK Supertrans desk and turn down drivers who approach you.',
    ),
  },
  VAR: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '409', vers: tx('Centre de Varna et plages du nord', 'Zentrum von Varna und Nordstrände', 'Varna centre and northern beaches'), duree: '≈ 20 min', prix: '≈ 1-1,50 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 15 min', prix: '≈ 10-20 €' },
    ],
    bonPlan: tx(
      'Le bus 409 passe toutes les 15 minutes environ depuis le terminal 2. Les taxis coûtent environ 15 % de plus entre 22 h et 6 h : exigez le compteur.',
      'Bus 409 fährt etwa alle 15 Minuten ab Terminal 2. Taxis kosten zwischen 22 und 6 Uhr etwa 15 % mehr: auf dem Taxameter bestehen.',
      'Bus 409 runs about every 15 minutes from Terminal 2. Taxis cost about 15% more between 10 pm and 6 am: insist on the meter.',
    ),
  },
  EVN: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '201', vers: tx('Centre d’Erevan', 'Zentrum von Jerewan', 'Yerevan centre'), duree: '30-45 min', prix: '≈ 300 AMD (≈ 0,70 €)' },
      { mode: 'vtc', nom: 'GG, Yandex Go', vers: centre, duree: '≈ 20 min', prix: '≈ 2 000-4 000 AMD (≈ 5-9 €)' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 4 000-6 000 AMD (≈ 9-14 €)' },
    ],
    bonPlan: tx(
      'Les applications locales GG et Yandex Go coûtent environ moitié moins que les taxis du comptoir de l’aéroport. Le bus 201 circule de 7 h à 21 h 30 environ.',
      'Die lokalen Apps GG und Yandex Go kosten etwa die Hälfte der Taxis vom Flughafenschalter. Bus 201 fährt etwa von 7 bis 21.30 Uhr.',
      'The local GG and Yandex Go apps cost about half as much as taxis from the airport desk. Bus 201 runs from about 7 am to 9.30 pm.',
    ),
  },
  ZAG: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: 'Pleso Prijevoz', vers: tx('Gare routière de Zagreb', 'Busbahnhof Zagreb', 'Zagreb bus station'), duree: '35-45 min', prix: '≈ 8 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 25 min', prix: '≈ 35-45 €' },
      { mode: 'vtc', nom: 'Uber, Bolt', vers: centre, duree: '≈ 25 min', prix: '≈ 25-35 €' },
    ],
    bonPlan: tx(
      'Le billet aller-retour de la navette (≈ 12 €) reste valable 30 jours : bien moins cher que deux allers.',
      'Das Hin- und Rückfahrticket des Shuttles (≈ 12 €) gilt 30 Tage: viel günstiger als zwei Einzelfahrten.',
      'The shuttle return ticket (≈ €12) is valid for 30 days: much cheaper than two singles.',
    ),
  },
  PRN: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '1A', vers: tx('Centre de Pristina', 'Zentrum von Pristina', 'Pristina centre'), duree: '≈ 30 min', prix: '≈ 3 €' },
      { mode: 'taxi', vers: centre, duree: '≈ 20 min', prix: '≈ 15-25 €' },
    ],
    bonPlan: tx(
      'L’aéroport publie une liste officielle des prix des taxis : vérifiez-la, ou fixez le prix avant de monter. Le bus ne passe que toutes les une à deux heures.',
      'Der Flughafen veröffentlicht eine offizielle Taxipreisliste: prüfen Sie sie oder vereinbaren Sie den Preis vorher. Der Bus fährt nur alle ein bis zwei Stunden.',
      'The airport publishes an official taxi price list: check it, or agree the price before getting in. The bus only runs every one to two hours.',
    ),
  },
};
