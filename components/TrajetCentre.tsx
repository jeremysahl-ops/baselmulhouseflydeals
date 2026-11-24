import { trajet, type Mode } from '@/lib/trajets';
import { formatStamp } from '@/lib/format';
import { getDict, type Lang } from '@/lib/i18n';

const PICTO: Record<Mode, string> = { train: '🚆', metro: '🚇', tram: '🚊', bus: '🚌', bateau: '⛴️', taxi: '🚕', vtc: '🚗' };

/** « Rejoindre le centre-ville » : une ligne par moyen de transport trouvé, puis le bon plan. */
export default function TrajetCentre({ code, lang }: { code: string; lang: Lang }) {
  const tr = trajet(code);
  if (!tr) return null;
  const t = getDict(lang).ville;
  return (
    <section className="mt-12" aria-labelledby="trajet-centre">
      <h2 id="trajet-centre" className="display text-4xl text-ink">{t.trajetHeading}</h2>
      <p className="mt-2 max-w-3xl text-ink-soft">{t.trajetLead}</p>
      <div className="mt-6 overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface text-ink-muted">
            <tr>
              <th scope="col" className="px-4 py-2.5 font-semibold">{t.trajetCols[0]}</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">{t.trajetCols[1]}</th>
              <th scope="col" className="px-4 py-2.5 text-right font-semibold">{t.trajetCols[2]}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {tr.lignes.map((l, i) => (
              <tr key={i} className="align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-ink">
                    <span className="mr-1.5" aria-hidden="true">{PICTO[l.mode]}</span>
                    {t.trajetModes[l.mode]}
                    {l.nom && <span className="font-normal text-ink-soft"> · {typeof l.nom === 'string' ? l.nom : l.nom[lang]}</span>}
                  </p>
                  <p className="mt-0.5 text-[13px] text-ink-muted">{l.vers[lang]}</p>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">{l.duree}</td>
                <td className="whitespace-nowrap px-4 py-3 text-right font-board font-bold text-ink">{l.prix || <span className="font-sans text-xs font-normal text-ink-muted">{t.trajetUnknown}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {tr.bonPlan && (
          <p className="border-t border-line bg-saving-soft px-4 py-3 text-sm leading-relaxed text-ink-soft">
            <span className="mr-1" aria-hidden="true">💡</span>
            <strong className="text-saving">{t.trajetTip}{lang === 'fr' ? ' : ' : ': '}</strong>
            {tr.bonPlan[lang]}
          </p>
        )}
      </div>
      <p className="mt-2 text-xs text-ink-muted">{t.trajetNote(formatStamp(tr.verifie, lang))}</p>
    </section>
  );
}
