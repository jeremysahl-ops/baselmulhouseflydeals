'use client';

import { useState } from 'react';
import { Deal } from '@/types/deal';

interface Props {
  deal: Deal;
}

export default function TelegramDraftButton({ deal }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSend = async () => {
    setStatus('loading');
    try {
      const res = await fetch('/api/telegram/send-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId: deal.id }),
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const labels = {
    idle: '📤 Valider via Telegram',
    loading: '⏳ Envoi…',
    success: '✅ Envoyé sur Telegram !',
    error: '❌ Erreur, réessaie',
  };

  return (
    <button
      onClick={handleSend}
      disabled={status === 'loading'}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 border
        ${status === 'success'
          ? 'bg-green-50 border-green-300 text-green-700'
          : status === 'error'
          ? 'bg-red-50 border-red-300 text-red-700'
          : 'bg-[#EDE7F6] border-[#C9A0DC] text-[#6C3483] hover:bg-[#C9A0DC]/20'
        }
        disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {labels[status]}
    </button>
  );
}
