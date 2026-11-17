// Carte des routes au départ de Bâle-Mulhouse : le fond de carte et la position des aéroports sont calculés
// ici, côté serveur (une seule fois par construction du site) ; les filtres et le curseur de prix vivent
// dans RouteMapClient. Fond de carte : Natural Earth via le paquet world-atlas (domaine public).
import { geoConicConformal, geoPath } from 'd3-geo';
import type { GeometryObject, Topology } from 'topojson-specification';
import { feature } from 'topojson-client';
import land50 from 'world-atlas/land-50m.json';
import RouteMapClient, { type MapRoute } from '@/components/RouteMapClient';
import { AIRPORTS, airportCountry, airportName, airportSlug } from '@/lib/airports';
import { BSL_COORDS, COORDS } from '@/lib/coords';
import { DUREES, getVilles } from '@/lib/prix';
import { formatMonth } from '@/lib/format';
import { getDict, localePath, type Lang } from '@/lib/i18n';

const W = 1000;
const H = 700;

function geometrie() {
  const pts = Object.values(COORDS).map(([lat, lon]) => [lon, lat]);
  const projection = geoConicConformal()
    .parallels([35, 60])
    .rotate([-10, 0])
    .fitExtent([[24, 24], [W - 24, H - 24]], { type: 'MultiPoint', coordinates: pts })
    .clipExtent([[0, 0], [W, H]]);
  const topo = land50 as unknown as Topology<{ land: GeometryObject }>;
  const terre = geoPath(projection).digits(1)(feature(topo, topo.objects.land)) ?? '';
  const xy = (lat: number, lon: number) => {
    const p = projection([lon, lat]) ?? [0, 0];
    return [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10] as [number, number];
  };
  return { terre, xy };
}

let cache: ReturnType<typeof geometrie> | null = null;

export default function RouteMap({ lang }: { lang: Lang }) {
  cache ??= geometrie();
  const { terre, xy } = cache;
  const dict = getDict(lang);

  // Prix « dès » par ville, mois et durée : le meilleur combo encore réservable.
  const villes = new Map(getVilles().map((v) => [v.code, v]));
  const moisSet = new Set<string>();
  const routes: MapRoute[] = Object.keys(AIRPORTS)
    .filter((c) => COORDS[c])
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
      origin={{ x: bx, y: by }}
      routes={routes}
      mois={mois}
      durees={DUREES.map((d) => ({ value: d, label: dict.durees[d].label, hint: dict.durees[d].hint }))}
      t={dict.carte}
      lang={lang}
    />
  );
}
