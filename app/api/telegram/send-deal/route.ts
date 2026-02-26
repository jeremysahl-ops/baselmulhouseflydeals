import { NextRequest, NextResponse } from 'next/server';
import { getDealById } from '@/lib/supabase';
import { sendDealDraftToTelegram } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const { dealId } = await req.json();

    if (!dealId) {
      return NextResponse.json({ error: 'dealId required' }, { status: 400 });
    }

    const deal = await getDealById(dealId);
    if (!deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const success = await sendDealDraftToTelegram(deal);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send to Telegram. Check TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, message: 'Deal sent to Telegram ✅' });
  } catch (err) {
    console.error('API send-deal error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
