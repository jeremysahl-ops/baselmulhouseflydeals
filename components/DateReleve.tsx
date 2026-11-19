// Date de relevé toujours en gras et en rouge (demandé par l'utilisateur le 19/11/2026) : le visiteur voit tout de suite
// de quand date un prix. `texte` est la phrase complète (ex. « vu le 17 novembre »), `date` la partie à mettre en avant.
// `sombre` : rouge plus vif, lisible sur les fonds bleu nuit (tableau des départs, photo de l'accueil).
export default function DateReleve({ texte, date, sombre = false }: { texte: string; date: string; sombre?: boolean }) {
  const i = date ? texte.indexOf(date) : -1;
  const style = `font-bold ${sombre ? 'text-[#ff6b5e]' : 'text-[#c62828]'}`;
  if (i < 0) return <span className={style}>{texte}</span>;
  return (
    <>
      {texte.slice(0, i)}
      <strong className={style}>{date}</strong>
      {texte.slice(i + date.length)}
    </>
  );
}
