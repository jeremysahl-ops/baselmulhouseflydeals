// Maroc, Tunisie, Égypte, Turquie, Dubaï : relevé en ligne le 24/11/2026.
import { centre, tx, type Trajet } from './commun';

const V = '2026-11-24';

export const SUD: Record<string, Trajet> = {
  RAK: {
    verifie: V,
    lignes: [
      { mode: 'bus', nom: '19', vers: tx('Place Jemaa el-Fna et Guéliz', 'Platz Djemaa el-Fna und Guéliz', 'Jemaa el-Fna square and Guéliz'), duree: '≈ 30 min', prix: '≈ 30 MAD (≈ 3 €)' },
      { mode: 'taxi', vers: tx('Médina ou Guéliz (prix affiché)', 'Medina oder Guéliz (ausgehängter Preis)', 'Medina or Guéliz (posted price)'), duree: '≈ 20 min', prix: '≈ 70-150 MAD (≈ 7-14 €)' },
    ],
    bonPlan: tx(
      'L’aller-retour en bus 19 le même jour coûte environ 50 MAD. En taxi, vérifiez le prix affiché à la station avant de monter : il augmente d’environ 50 % le soir.',
      'Hin und zurück mit Bus 19 am selben Tag kostet etwa 50 MAD. Beim Taxi den am Stand ausgehängten Preis prüfen: abends etwa 50 % teurer.',
      'A same-day return on bus 19 costs about 50 MAD. By taxi, check the price posted at the rank before getting in: it rises by about 50% in the evening.',
    ),
  },
  AGA: {
    verifie: V,
    lignes: [
      { mode: 'taxi', nom: tx('Grand taxi', 'Sammeltaxi (Grand Taxi)', 'Grand taxi'), vers: tx('Centre d’Agadir et la baie (jusqu’à 6 personnes)', 'Zentrum von Agadir und Bucht (bis 6 Personen)', 'Agadir centre and the bay (up to 6 people)'), duree: '25-35 min', prix: '≈ 200 MAD (≈ 18 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est à 25 km du centre et les bus y sont rares. Le grand taxi prend jusqu’à six passagers pour un prix fixe d’environ 200 MAD : mettez-vous d’accord avant de monter.',
      'Der Flughafen liegt 25 km vom Zentrum, Busse fahren selten. Das Grand Taxi nimmt bis zu sechs Personen zum Festpreis von etwa 200 MAD mit: Preis vorher vereinbaren.',
      'The airport is 25 km from the centre and buses are rare. A grand taxi takes up to six passengers for a fixed price of about 200 MAD: agree on it before getting in.',
    ),
  },
  TNG: {
    verifie: V,
    lignes: [
      { mode: 'bus', vers: tx('Centre de Tanger', 'Zentrum von Tanger', 'Tangier centre'), duree: '≈ 40 min', prix: '≈ 40 MAD (≈ 4 €)' },
      { mode: 'taxi', vers: tx('Centre (tarif fixe ; plus cher après 22 h 30)', 'Zentrum (Festpreis; nach 22.30 Uhr teurer)', 'City centre (fixed fare; dearer after 10.30 pm)'), duree: '20-30 min', prix: '≈ 100-150 MAD (≈ 9-14 €)' },
    ],
    bonPlan: tx(
      'Le tarif du taxi est fixé par les autorités et affiché à la sortie de l’aéroport : environ 100 MAD de jour. Le bus se paie en espèces, en dirhams ou en euros.',
      'Der Taxipreis ist behördlich festgelegt und am Ausgang ausgehängt: tagsüber etwa 100 MAD. Den Bus bezahlt man bar, in Dirham oder Euro.',
      'The taxi fare is set by the authorities and posted at the airport exit: about 100 MAD by day. The bus takes cash, in dirhams or euros.',
    ),
  },
  DJE: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Houmt Souk', 'Houmt Souk', 'Houmt Souk'), duree: '≈ 15 min', prix: '≈ 10-30 TND (≈ 3-9 €)' },
      { mode: 'taxi', vers: tx('Hôtels de la zone touristique (Midoun)', 'Hotels der Touristenzone (Midoun)', 'Hotels in the tourist zone (Midoun)'), duree: '25-35 min', prix: '≈ 50 TND (≈ 15 €)' },
    ],
    bonPlan: tx(
      'Demandez au chauffeur de mettre le compteur ou fixez le prix avant de partir : les tarifs annoncés aux touristes varient beaucoup.',
      'Bitten Sie den Fahrer, das Taxameter einzuschalten, oder vereinbaren Sie den Preis vorher: die Preise für Touristen schwanken stark.',
      'Ask the driver to use the meter or agree the price before leaving: fares quoted to tourists vary a lot.',
    ),
  },
  NBE: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Hammamet', 'Hammamet', 'Hammamet'), duree: '≈ 45 min', prix: '≈ 60-150 TND (≈ 18-44 €)' },
      { mode: 'taxi', vers: tx('Sousse', 'Sousse', 'Sousse'), duree: '≈ 40 min', prix: '≈ 130 TND (≈ 38 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est isolé, à 40-50 km des stations balnéaires : à plusieurs, un transfert réservé à l’avance revient souvent moins cher que le taxi pris sur place.',
      'Der Flughafen liegt abgelegen, 40-50 km von den Badeorten entfernt: zu mehreren ist ein vorab gebuchter Transfer oft günstiger als ein Taxi vor Ort.',
      'The airport is isolated, 40-50 km from the resorts: for a group, a transfer booked in advance is often cheaper than a taxi on the spot.',
    ),
  },
  HRG: {
    verifie: V,
    lignes: [
      { mode: 'taxi', vers: tx('Hurghada (Sekalla, centre)', 'Hurghada (Sekalla, Zentrum)', 'Hurghada (Sekalla, centre)'), duree: '10-15 min', prix: '≈ 6-10 €' },
      { mode: 'taxi', vers: tx('El Gouna (Safaga : ≈ 18 €)', 'El Gouna (Safaga: ≈ 18 €)', 'El Gouna (Safaga: ≈ €18)'), duree: '≈ 30 min', prix: '≈ 12 €' },
    ],
    bonPlan: tx(
      'Aucun bus ne dessert l’aéroport et les prix des taxis se négocient : fixez le montant avant de monter, ou demandez à votre hôtel s’il propose un transfert.',
      'Kein Bus fährt zum Flughafen, Taxipreise werden verhandelt: Betrag vor dem Einsteigen festlegen oder beim Hotel nach einem Transfer fragen.',
      'No bus serves the airport and taxi fares are negotiated: agree the amount before getting in, or ask your hotel whether it offers a transfer.',
    ),
  },
  AYT: {
    verifie: V,
    lignes: [
      { mode: 'tram', nom: 'AntRay', vers: tx('Centre d’Antalya, près de Kaleiçi', 'Zentrum von Antalya, nahe Kaleiçi', 'Antalya centre, near Kaleiçi'), duree: '35-50 min', prix: '≈ 42 TL (≈ 1 €)' },
      { mode: 'bus', nom: '600', vers: tx('Centre d’Antalya', 'Zentrum von Antalya', 'Antalya centre'), duree: '≈ 40 min', prix: '≈ 80 TL (≈ 2 €)' },
      { mode: 'taxi', vers: tx('Kaleiçi (vieille ville)', 'Kaleiçi (Altstadt)', 'Kaleiçi (old town)'), duree: '≈ 25 min', prix: '≈ 12-17 €' },
    ],
    bonPlan: tx(
      'Le tram et le bus ne prennent pas d’espèces : achetez et chargez une carte Antalyakart dès l’arrivée. À la station de taxis, un panneau affiche les prix vers les destinations courantes.',
      'Tram und Bus nehmen kein Bargeld: Kaufen und laden Sie gleich nach der Ankunft eine Antalyakart. Am Taxistand zeigt eine Tafel die Preise zu den üblichen Zielen.',
      'Trams and buses take no cash: buy and top up an Antalyakart on arrival. At the taxi rank, a board shows prices to common destinations.',
    ),
  },
  SAW: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: 'M4', vers: tx('Kadıköy, rive asiatique (puis bateau vers l’Europe)', 'Kadıköy, asiatische Seite (dann Fähre nach Europa)', 'Kadıköy, Asian side (then ferry to Europe)'), duree: '≈ 50 min', prix: '≈ 42 TL (≈ 1 €)' },
      { mode: 'bus', nom: 'Havabus', vers: tx('Taksim ou Kadıköy', 'Taksim oder Kadıköy', 'Taksim or Kadıköy'), duree: '60-90 min', prix: '≈ 200-440 TL (≈ 5-10 €)' },
      { mode: 'taxi', vers: tx('Taksim (Kadıköy : ≈ 850 TL)', 'Taksim (Kadıköy: ≈ 850 TL)', 'Taksim (Kadıköy: ≈ 850 TL)'), duree: '60-90 min', prix: '≈ 1 100-1 900 TL (≈ 23-40 €)' },
    ],
    bonPlan: tx(
      'L’aéroport est sur la rive asiatique, loin de Sultanahmet et Taksim. Le métro M4 jusqu’à Kadıköy, puis le bateau qui traverse le Bosphore, est le trajet le moins cher et le plus joli. Prenez une carte Istanbulkart.',
      'Der Flughafen liegt auf der asiatischen Seite, weit von Sultanahmet und Taksim. U-Bahn M4 bis Kadıköy und dann die Fähre über den Bosporus ist am günstigsten und am schönsten. Holen Sie sich eine Istanbulkart.',
      'The airport is on the Asian side, far from Sultanahmet and Taksim. The M4 metro to Kadıköy, then the ferry across the Bosphorus, is the cheapest and prettiest route. Get an Istanbulkart.',
    ),
  },
  DXB: {
    verifie: V,
    lignes: [
      { mode: 'metro', nom: tx('Ligne rouge', 'Rote Linie', 'Red line'), vers: tx('Downtown (Burj Khalifa) et Dubai Marina, depuis les terminaux 1 et 3', 'Downtown (Burj Khalifa) und Dubai Marina, ab Terminal 1 und 3', 'Downtown (Burj Khalifa) and Dubai Marina, from Terminals 1 and 3'), duree: '25-60 min', prix: '≈ 5-8,50 AED (≈ 1-2 €)' },
      { mode: 'taxi', vers: tx('Downtown Dubai', 'Downtown Dubai', 'Downtown Dubai'), duree: '15-25 min', prix: '≈ 55-75 AED (≈ 13-18 €)' },
      { mode: 'taxi', vers: tx('Dubai Marina', 'Dubai Marina', 'Dubai Marina'), duree: '≈ 30 min', prix: '≈ 90-120 AED (≈ 21-28 €)' },
    ],
    bonPlan: tx(
      'Achetez une carte Nol « Silver » au guichet du métro : moins chère que le billet papier. Le terminal 2 n’a pas de métro. Les taxis démarrent à 20 AED à l’aéroport.',
      'Kaufen Sie am U-Bahn-Schalter eine Nol-Karte „Silver“: günstiger als das Papierticket. Terminal 2 hat keine U-Bahn. Taxis starten am Flughafen bei 20 AED.',
      'Buy a Nol “Silver” card at the metro counter: cheaper than a paper ticket. Terminal 2 has no metro. Taxis start at 20 AED at the airport.',
    ),
  },
};
