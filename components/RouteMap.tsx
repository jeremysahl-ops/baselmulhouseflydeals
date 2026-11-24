// Carte des routes au départ de Bâle-Mulhouse : le fond de carte et la position des aéroports sont calculés
// ici, côté serveur (une seule fois par construction du site) ; les filtres et le curseur de prix vivent
// dans RouteMapClient. Fond de carte : Natural Earth via le paquet world-atlas (domaine public).
import { geoArea, geoConicConformal, geoPath } from 'd3-geo';
import type { Feature, MultiPolygon, Polygon } from 'geojson';
import type { GeometryCollection, GeometryObject, Topology } from 'topojson-specification';
import { feature, mesh } from 'topojson-client';
import land50 from 'world-atlas/land-50m.json';
import pays50 from 'world-atlas/countries-50m.json';
import RouteMapClient, { type MapRoute } from '@/components/RouteMapClient';
import { AIRPORTS, airportCountry, airportName, airportSlug } from '@/lib/airports';
import { BSL_COORDS, COORDS, HORS_CARTE } from '@/lib/coords';
import { DUREES, getVilles } from '@/lib/prix';
import { formatMonth } from '@/lib/format';
import { getDict, localePath, type Lang } from '@/lib/i18n';

// Noms des pays dans world-atlas → code ISO utilisé par lib/airports.ts.
const ISO: Record<string, string> = {
  'United Arab Emirates': 'AE', Albania: 'AL', Armenia: 'AM', Austria: 'AT', 'Bosnia and Herz.': 'BA', Bulgaria: 'BG', Cyprus: 'CY',
  Czechia: 'CZ', Germany: 'DE', Denmark: 'DK', Algeria: 'DZ', Egypt: 'EG', Spain: 'ES', France: 'FR', 'United Kingdom': 'GB', Greece: 'GR',
  Croatia: 'HR', Hungary: 'HU', Ireland: 'IE', Iceland: 'IS', Italy: 'IT', Morocco: 'MA', Moldova: 'MD', Montenegro: 'ME', Macedonia: 'MK',
  Malta: 'MT', Netherlands: 'NL', Norway: 'NO', Poland: 'PL', Portugal: 'PT', Romania: 'RO', Serbia: 'RS', Sweden: 'SE', Slovakia: 'SK',
  Tunisia: 'TN', Turkey: 'TR', Kosovo: 'XK', Switzerland: 'CH',
};
// Petits ajustements pour que le drapeau ne cache pas une destination (en pixels de la carte).
const DECALE: Record<string, [number, number]> = {};

const W = 1000;
const H = 700;

function geometrie() {
  const pts = Object.entries(COORDS).filter(([c]) => !HORS_CARTE.has(c)).map(([, [lat, lon]]) => [lon, lat]);
  const projection = geoConicConformal()
    .parallels([35, 60])
    .rotate([-10, 0])
    .fitExtent([[24, 24], [W - 24, H - 24]], { type: 'MultiPoint', coordinates: pts })
    .clipExtent([[0, 0], [W, H]]);
  const topo = land50 as unknown as Topology<{ land: GeometryObject }>;
  const chemin = geoPath(projection).digits(1);
  const terre = chemin(feature(topo, topo.objects.land)) ?? '';
  // Frontières (traits entre deux pays) et pays desservis (teinte plus chaude, petit drapeau au centre du territoire principal).
  const tp = pays50 as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
  const frontieres = chemin(mesh(tp, tp.objects.countries, (a, b) => a !== b)) ?? '';
  const servis = new Set(Object.values(AIRPORTS).map((a) => a.country as string));
  const desservis: string[] = [];
  const drapeaux: { iso: string; x: number; y: number }[] = [];
  for (const g of tp.objects.countries.geometries) {
    const iso = ISO[(g.properties as { name?: string } | undefined)?.name ?? ''];
    if (!iso || !servis.has(iso)) continue;
    const f = feature(tp, g) as Feature<Polygon | MultiPolygon>;
    desservis.push(chemin(f) ?? '');
    const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
    const principal = polys.reduce((a, b) => (geoArea({ type: 'Polygon', coordinates: b }) > geoArea({ type: 'Polygon', coordinates: a }) ? b : a));
    const [x, y] = chemin.centroid({ type: 'Polygon', coordinates: principal });
    if (x > 14 && x < W - 14 && y > 14 && y < H - 14) drapeaux.push({ iso: iso.toLowerCase(), x: Math.round(x + (DECALE[iso]?.[0] ?? 0)), y: Math.round(y + (DECALE[iso]?.[1] ?? 0)) });
  }
  const xy = (lat: number, lon: number) => {
    const p = projection([lon, lat]) ?? [0, 0];
    return [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10] as [number, number];
  };
  return { terre, frontieres, desservis: desservis.join(''), drapeaux, xy };
}

let cache: ReturnType<typeof geometrie> | null = null;

export default function RouteMap({ lang }: { lang: Lang }) {
  cache ??= geometrie();
  const { terre, frontieres, desservis, drapeaux, xy } = cache;
  const dict = getDict(lang);

  // Prix « dès » par ville, mois et durée : le meilleur combo encore réservable.
  const villes = new Map(getVilles().map((v) => [v.code, v]));
  const moisSet = new Set<string>();
  const routes: MapRoute[] = Object.keys(AIRPORTS)
    .filter((c) => COORDS[c] && !HORS_CARTE.has(c))
    .map((code) => {
      const [x, y] = xy(...COORDS[code]);
      const prix: MapRoute['prix'] = {};
      for (const m of villes.get(code)?.mois ?? []) {
        const parDuree: Record<string, number> = {};
        for (const d of DUREES) {
          const best = m.durees[d].combos[0]?.prix;
          if (best != null) parDuree[d] = Math.round(best);
        }
        if (Object.keys(parDuree).length) {
          prix[m.mois] = parDuree;
          moisSet.add(m.mois);
        }
      }
      return { code, name: airportName(code, lang), country: airportCountry(code, lang), href: localePath(lang, `/vols/${airportSlug(code)}`), x, y, prix };
    });

  const mois = [...moisSet].sort().map((m) => ({ value: m, label: formatMonth(m, lang).replace(/ \d{4}$/, ''), year: m.slice(0, 4) }));
  const [bx, by] = xy(...BSL_COORDS);

  return (
    <RouteMapClient
      width={W}
      height={H}
      land={terre}
      borders={frontieres}
      served={desservis}
      flags={drapeaux}
      origin={{ x: bx, y: by }}
      routes={routes}
      mois={mois}
      durees={DUREES.map((d) => ({ value: d, label: dict.durees[d].label, hint: dict.durees[d].hint }))}
      t={dict.carte}
      lang={lang}
    />
  );
}
