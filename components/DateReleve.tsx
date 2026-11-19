// Date de relevé toujours en gras et en rouge (demandé par l'utilisateur le 19/11/2026) : le visiteur voit tout de suite
// de quand date un prix. `texte` est la phrase complète (ex. « vu le 17 novembre »), `date` la partie à mettre en avant.
// `sombre` : rouge plus vif, lisible sur les fonds bleu nuit (tableau des départs, photo de l'accueil).
export default function DateReleve({ texte, date, sombre = false }: { texte: string; date: string; sombre?: boolean }) {
  const i = date ? texte.indexOf(date) : -1;
  const style = `font-bold ${sombre ? 'text-[#ff6b5e]' : 'text-[#c62828]'}`;
  if (i < 0) return <span className={style}>{texte}</span>;
  // Toute la mention est en rouge (« Relevé du 17 novembre », « vu le … », « Dernier relevé : … ») :
  // elle commence au début de la phrase qui contient la date.
  const debut = texte.lastIndexOf('. ', i) + 1 && texte.lastIndexOf('. ', i) + 2;
  return (
    <>
      {texte.slice(0, debut)}
      <strong className={style}>{texte.slice(debut, i + date.length)}</strong>
      {texte.slice(i + date.length)}
    </>
  );
}
