import { centre, tx, type Trajet } from './commun';

export const LOT1: Record<string, Trajet> = {
  BCN: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'train', nom: 'R2 Nord', vers: { fr: 'Gares de Sants et Passeig de Gràcia (depuis le terminal 2)', de: 'Bahnhöfe Sants und Passeig de Gràcia (ab Terminal 2)', en: 'Sants and Passeig de Gràcia stations (from Terminal 2)' }, duree: '20-25 min', prix: '≈ 5 €' },
      { mode: 'metro', nom: 'L9 Sud', vers: { fr: 'Zona Universitària, puis correspondance', de: 'Zona Universitària, dann umsteigen', en: 'Zona Universitària, then change' }, duree: '35-45 min', prix: '≈ 5-6 €' },
      { mode: 'bus', nom: 'Aerobús', vers: { fr: 'Plaça de Catalunya', de: 'Plaça de Catalunya', en: 'Plaça de Catalunya' }, duree: '≈ 35 min', prix: '≈ 7,75 €' },
      { mode: 'taxi', vers: centre, duree: '25-30 min', prix: '≈ 30-40 €' },
    ],
    bonPlan: {
      fr: "Le métro n'accepte pas les tickets ordinaires à l'aéroport : il faut un billet « aéroport ». Le train R2 Nord, au départ du terminal 2, est souvent le moins cher et le plus rapide.",
      de: 'In der U-Bahn gelten am Flughafen keine normalen Fahrscheine, man braucht ein Flughafenticket. Der Zug R2 Nord ab Terminal 2 ist oft am günstigsten und schnellsten.',
      en: 'Ordinary metro tickets are not valid at the airport: you need an airport ticket. The R2 Nord train from Terminal 2 is often the cheapest and fastest option.',
    },
  },
  PMI: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'bus', nom: 'A1', vers: { fr: "Centre de Palma (Plaça d'Espanya) et le port", de: "Zentrum von Palma (Plaça d'Espanya) und Hafen", en: "Palma centre (Plaça d'Espanya) and the port" }, duree: '≈ 30 min', prix: '≈ 5 €' },
      { mode: 'taxi', vers: centre, duree: '15-20 min', prix: '≈ 20-35 €' },
    ],
    bonPlan: {
      fr: 'Le bus A1 longe aussi le front de mer et le port : pratique si votre hôtel est sur le Passeig Marítim. Le taxi coûte plus cher la nuit, le week-end et les jours fériés.',
      de: 'Der Bus A1 fährt auch an der Uferpromenade und am Hafen entlang: praktisch, wenn Ihr Hotel am Passeig Marítim liegt. Taxis sind nachts, am Wochenende und an Feiertagen teurer.',
      en: 'The A1 bus also runs along the seafront and the port: handy if your hotel is on the Passeig Marítim. Taxis cost more at night, at weekends and on public holidays.',
    },
  },
  LIS: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'metro', nom: tx('Ligne rouge', 'Rote Linie', 'Red line'), vers: { fr: 'Centre (correspondance à Alameda ou São Sebastião)', de: 'Zentrum (umsteigen in Alameda oder São Sebastião)', en: 'City centre (change at Alameda or São Sebastião)' }, duree: '20-30 min', prix: '≈ 1,90 €' },
      { mode: 'taxi', vers: centre, duree: '15-20 min', prix: '≈ 10-20 €' },
      { mode: 'vtc', vers: centre, duree: '15-20 min', prix: '≈ 8-15 €' },
    ],
    bonPlan: {
      fr: "L'aéroport est à seulement 7 km du centre. Le ticket de métro se charge sur une carte rechargeable (≈ 0,50 €) qui sert ensuite pour les métros, trams et bus de la ville. L'ancien bus Aerobus n'existe plus.",
      de: 'Der Flughafen liegt nur 7 km vom Zentrum entfernt. Das U-Bahn-Ticket wird auf eine aufladbare Karte (≈ 0,50 €) geladen, die danach für U-Bahn, Tram und Bus der Stadt gilt. Den früheren Aerobus gibt es nicht mehr.',
      en: 'The airport is only 7 km from the centre. The metro ticket goes on a rechargeable card (≈ €0.50) that you can then use on the city’s metro, trams and buses. The old Aerobus no longer runs.',
    },
  },
  OPO: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'metro', nom: tx('Ligne E (violette)', 'Linie E (violett)', 'Line E (purple)'), vers: { fr: 'Trindade, au centre', de: 'Trindade, im Zentrum', en: 'Trindade, in the centre' }, duree: '25-35 min', prix: '≈ 2,30-2,90 €' },
      { mode: 'taxi', vers: centre, duree: '20-30 min', prix: '≈ 20-30 €' },
      { mode: 'vtc', vers: centre, duree: '20-30 min', prix: '≈ 15-25 €' },
    ],
    bonPlan: {
      fr: 'Achetez à la station de métro la carte rechargeable Andante : elle sert ensuite pour tout le réseau (métro, bus) pendant le séjour.',
      de: 'Kaufen Sie an der U-Bahn-Station die aufladbare Andante-Karte: Sie gilt danach für das ganze Netz (U-Bahn, Bus).',
      en: 'Buy the rechargeable Andante card at the metro station: you can then use it across the network (metro, buses) during your stay.',
    },
  },
  NAP: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'bus', nom: 'Alibus', vers: { fr: 'Gare centrale (Piazza Garibaldi) et port (Molo Beverello)', de: 'Hauptbahnhof (Piazza Garibaldi) und Hafen (Molo Beverello)', en: 'Central station (Piazza Garibaldi) and port (Molo Beverello)' }, duree: '15-40 min', prix: '≈ 5 €' },
      { mode: 'taxi', vers: { fr: 'Gare centrale, centre historique ou port (tarif fixe)', de: 'Hauptbahnhof, Altstadt oder Hafen (Festpreis)', en: 'Central station, historic centre or port (fixed fare)' }, duree: '15-25 min', prix: '≈ 21-24 €' },
    ],
    bonPlan: {
      fr: "Demandez le tarif fixe (« tariffa predeterminata ») AVANT de monter dans le taxi : environ 21 € pour la gare, 24 € pour le port, bagages compris. Sinon, c'est le compteur.",
      de: 'Verlangen Sie den Festpreis („tariffa predeterminata“) VOR dem Einsteigen: etwa 21 € zum Bahnhof, 24 € zum Hafen, Gepäck inklusive. Sonst läuft das Taxameter.',
      en: 'Ask for the fixed fare (“tariffa predeterminata”) BEFORE you get in: about €21 to the station and €24 to the port, luggage included. Otherwise the meter runs.',
    },
  },
  AGP: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'train', nom: 'C1', vers: { fr: 'Málaga Centro-Alameda', de: 'Málaga Centro-Alameda', en: 'Málaga Centro-Alameda' }, duree: '≈ 12 min', prix: '≈ 1,80-2,70 €' },
      { mode: 'bus', nom: 'A Express', vers: { fr: 'Centre et port', de: 'Zentrum und Hafen', en: 'Centre and port' }, duree: '20-30 min', prix: '≈ 4 €' },
      { mode: 'taxi', vers: centre, duree: '15-20 min', prix: '≈ 20-30 €' },
    ],
    bonPlan: {
      fr: 'Le train C1, toutes les 20 minutes environ, est imbattable pour le centre ; dans l’autre sens, il dessert aussi Torremolinos et Fuengirola.',
      de: 'Der Zug C1, etwa alle 20 Minuten, ist für das Zentrum unschlagbar; in der Gegenrichtung fährt er auch nach Torremolinos und Fuengirola.',
      en: 'The C1 train, roughly every 20 minutes, is unbeatable for the centre; in the other direction it also serves Torremolinos and Fuengirola.',
    },
  },
  MAD: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'metro', nom: tx('Ligne 8', 'Linie 8', 'Line 8'), vers: { fr: 'Nuevos Ministerios, puis correspondance', de: 'Nuevos Ministerios, dann umsteigen', en: 'Nuevos Ministerios, then change' }, duree: '30-40 min', prix: '≈ 4,50-5 €' },
      { mode: 'bus', nom: 'Exprés Aeropuerto', vers: { fr: 'Atocha (la nuit : Cibeles)', de: 'Atocha (nachts: Cibeles)', en: 'Atocha (at night: Cibeles)' }, duree: '35-45 min', prix: '≈ 5 €' },
      { mode: 'taxi', vers: { fr: 'Centre, dans le périphérique M-30 (forfait)', de: 'Zentrum innerhalb des Rings M-30 (Pauschale)', en: 'Centre, inside the M-30 ring road (flat fare)' }, duree: '20-30 min', prix: '≈ 33 €' },
    ],
    bonPlan: {
      fr: 'Le taxi a un forfait d’environ 33 € jusqu’au centre (à l’intérieur de la M-30), de jour comme de nuit : à plusieurs, c’est souvent plus simple que le métro. Le bus Exprés roule 24 h sur 24.',
      de: 'Für Taxis gilt eine Pauschale von etwa 33 € ins Zentrum (innerhalb der M-30), Tag und Nacht: zu mehreren oft einfacher als die U-Bahn. Der Exprés-Bus fährt rund um die Uhr.',
      en: 'Taxis charge a flat fare of about €33 to the centre (inside the M-30), day or night: for a group it is often easier than the metro. The Exprés bus runs 24 hours a day.',
    },
  },
  PRG: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'bus', nom: tx('59 + métro A', '59 + U-Bahn A', '59 + metro A'), vers: { fr: 'Veleslavín, puis métro jusqu’au centre', de: 'Veleslavín, dann U-Bahn ins Zentrum', en: 'Veleslavín, then metro to the centre' }, duree: '≈ 35 min', prix: '≈ 50 CZK (≈ 2 €)' },
      { mode: 'bus', nom: 'Airport Express (AE)', vers: { fr: 'Gare centrale (Hlavní nádraží)', de: 'Hauptbahnhof (Hlavní nádraží)', en: 'Main station (Hlavní nádraží)' }, duree: '35-45 min', prix: '≈ 100 CZK (≈ 4 €)' },
      { mode: 'taxi', vers: centre, duree: '25-35 min', prix: '≈ 25-30 €' },
    ],
    bonPlan: {
      fr: 'Un seul billet de 90 minutes du réseau de Prague couvre le bus 59 et le métro jusqu’au centre. Attention : il n’est pas valable dans le bus AE, qui a son propre tarif.',
      de: 'Ein einziges 90-Minuten-Ticket des Prager Netzes gilt für Bus 59 und U-Bahn bis ins Zentrum. Achtung: im AE-Bus gilt es nicht, dort gibt es einen eigenen Tarif.',
      en: 'A single 90-minute Prague public transport ticket covers bus 59 and the metro to the centre. Note: it is not valid on the AE bus, which has its own fare.',
    },
  },
  FCO: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'train', nom: 'Leonardo Express', vers: { fr: 'Gare de Roma Termini, sans arrêt', de: 'Bahnhof Roma Termini, ohne Halt', en: 'Roma Termini station, non-stop' }, duree: '≈ 32 min', prix: '≈ 14 €' },
      { mode: 'train', nom: 'FL1', vers: { fr: 'Trastevere et Ostiense (train régional)', de: 'Trastevere und Ostiense (Regionalzug)', en: 'Trastevere and Ostiense (regional train)' }, duree: '30-45 min', prix: '≈ 8 €' },
      { mode: 'taxi', vers: { fr: 'Centre historique (tarif fixe)', de: 'Altstadt (Festpreis)', en: 'Historic centre (fixed fare)' }, duree: '40-50 min', prix: '≈ 55 €' },
    ],
    bonPlan: {
      fr: 'Le train régional FL1 coûte presque deux fois moins cher que le Leonardo Express et dessert le quartier de Trastevere. À quatre, un lot de 4 billets Leonardo Express revient à environ 40 €.',
      de: 'Der Regionalzug FL1 kostet fast nur die Hälfte des Leonardo Express und hält in Trastevere. Zu viert gibt es beim Leonardo Express ein Paket mit 4 Fahrkarten für etwa 40 €.',
      en: 'The FL1 regional train costs about half as much as the Leonardo Express and stops at Trastevere. For four people, a bundle of 4 Leonardo Express tickets costs about €40.',
    },
  },
  LGW: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'train', nom: 'Southern / Thameslink', vers: { fr: 'Victoria, London Bridge ou St Pancras', de: 'Victoria, London Bridge oder St Pancras', en: 'Victoria, London Bridge or St Pancras' }, duree: '30-35 min', prix: '≈ 11-19 £ (≈ 13-23 €)' },
      { mode: 'train', nom: 'Gatwick Express', vers: { fr: 'Victoria, sans arrêt', de: 'Victoria, ohne Halt', en: 'Victoria, non-stop' }, duree: '≈ 30 min', prix: '≈ 24 £ (≈ 29 €)' },
    ],
    bonPlan: {
      fr: 'Payez directement aux portiques avec votre carte bancaire sans contact : en heures creuses, le trajet en Southern ou Thameslink coûte environ 10,70 £, soit moins de la moitié du Gatwick Express, qui ne fait gagner que 5 minutes.',
      de: 'Zahlen Sie direkt an der Sperre mit Ihrer kontaktlosen Bankkarte: außerhalb der Stoßzeiten kostet die Fahrt mit Southern oder Thameslink etwa 10,70 £, weniger als die Hälfte des Gatwick Express, der nur 5 Minuten schneller ist.',
      en: 'Tap in at the gates with your contactless bank card: off-peak, Southern or Thameslink costs about £10.70, less than half the Gatwick Express, which is only 5 minutes faster.',
    },
  },
  NCE: {
    verifie: '2026-11-24',
    lignes: [
      { mode: 'tram', nom: tx('Ligne 2', 'Linie 2', 'Line 2'), vers: { fr: 'Centre-ville et port', de: 'Stadtzentrum und Hafen', en: 'City centre and port' }, duree: '25-30 min', prix: '≈ 1,70 €' },
      { mode: 'taxi', vers: { fr: 'Centre-ville (forfait aéroport)', de: 'Stadtzentrum (Flughafenpauschale)', en: 'City centre (airport flat fare)' }, duree: '≈ 20 min', prix: '≈ 32-35 €' },
    ],
    bonPlan: {
      fr: 'Le tram 2 part juste devant les terminaux, toutes les 8 à 15 minutes, et un simple ticket suffit : c’est le trajet aéroport-centre le moins cher de la Côte d’Azur.',
      de: 'Die Tram 2 fährt direkt vor den Terminals alle 8 bis 15 Minuten ab, ein einfacher Fahrschein genügt: die günstigste Verbindung vom Flughafen ins Zentrum an der Côte d’Azur.',
      en: 'Tram line 2 leaves right outside the terminals every 8 to 15 minutes and a single ticket is enough: the cheapest airport-to-centre trip on the Riviera.',
    },
  },
};
