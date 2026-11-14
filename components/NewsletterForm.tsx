'use client';

import { useState } from 'react';
import Link from 'next/link';

type State = 'idle' | 'sending' | 'done' | 'error';

/** Inscription aux alertes. L'adresse est réellement enregistrée (POST /api/subscribe). */
export default function NewsletterForm({ source, tone = 'light' }: { source: string; tone?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // champ piège anti-robots, invisible
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');
  const dark = tone === 'dark';

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website, source }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error ?? 'Inscription impossible pour le moment.');
      setState('done');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Inscription impossible pour le moment.');
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className={`rounded-lg px-4 py-3 text-sm font-medium ${dark ? 'bg-white/10 text-white' : 'bg-saving-soft text-saving'}`}>
        C&apos;est noté. Vous recevrez nos prochains deals à l&apos;adresse {email}.
      </p>
    );
  }

  return (
    <form onSubmit={submit}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`email-${source}`}>Adresse e-mail</label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="votre@email.fr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted"
        />
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden="true"
        />
        <button type="submit" disabled={state === 'sending'} className="btn-primary disabled:opacity-60">
          {state === 'sending' ? 'Envoi…' : 'Recevoir les deals'}
        </button>
      </div>
      {state === 'error' && (
        <p role="alert" className={`mt-2 text-sm ${dark ? 'text-red-200' : 'text-red-700'}`}>{message}</p>
      )}
      <p className={`mt-3 text-xs ${dark ? 'text-white/60' : 'text-ink-muted'}`}>
        Un e-mail quand de bons prix apparaissent, pas plus. Désinscription à tout moment.{' '}
        <Link href="/confidentialite" className="underline underline-offset-2">Confidentialité</Link>
      </p>
    </form>
  );
}
