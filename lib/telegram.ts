import { Deal } from '@/types/deal';

/**
 * Envoie un deal draft au canal Telegram configuré.
 * Utilise le Bot Token + Chat ID stockés dans les variables d'env serveur.
 */
export async function sendDealDraftToTelegram(deal: Deal): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram not configured: missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return false;
  }

  const text = `
✈️ *NOUVEAU DEAL – Basel-Mulhouse* ✈️

📍 *Destination :* ${deal.destination}
🏷️ *Titre :* ${deal.title}
💰 *Prix :* ${deal.price}€
🗓️ *Dates :* ${deal.dates}
🏢 *Compagnie :* ${deal.company}
📂 *Catégorie :* ${deal.category}
${deal.insider_tip ? `\n💡 *Astuce insider :* ${deal.insider_tip}` : ''}

🔗 [Voir le deal](${deal.link})

_Envoyé depuis baselmulhouseflydeals.com_
`.trim();

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'Markdown',
          disable_web_page_preview: false,
        }),
      }
    );

    const json = await res.json();
    if (!json.ok) {
      console.error('Telegram sendMessage error:', json.description);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Telegram fetch error:', err);
    return false;
  }
}
