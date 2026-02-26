'use client';

import { useState, useEffect } from 'react';

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 6s, unless already dismissed
    const dismissed = localStorage.getItem('newsletter_dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => setVisible(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem('newsletter_dismissed', '1');
    setVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connecter à Supabase table "subscribers" ou Mailchimp
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setTimeout(dismiss, 2500);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative border border-[#E8E0F0] animate-in slide-in-from-bottom-4 duration-300">
        {/* Close */}
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#999] hover:text-[#333] transition-colors"
          aria-label="Fermer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="font-black text-xl text-[#2C3E50] mb-2">Yes ! T'es dans l'avion !</h3>
            <p className="text-[#555] text-sm">On te prévient dès qu'un deal de folie décolle ✈️</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-5">
              <span className="text-4xl">✉️✈️</span>
              <h3 className="font-black text-xl text-[#2C3E50] mt-2 mb-1">
                Les deals avant tout le monde !
              </h3>
              <p className="text-[#666] text-sm">
                Reçois les meilleurs bons plans Basel-Mulhouse directement dans ta boîte. 0 spam, que des deals. 🌟
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input w-full px-4 py-3 rounded-full border border-[#E0D0F0] text-[#333] text-sm bg-[#FDFDFF]"
              />
              <button type="submit" className="btn-cta py-3 px-6 text-sm shadow-lg shadow-rose-200">
                🚀 Je veux les deals !
              </button>
            </form>

            <p className="text-center text-xs text-[#aaa] mt-3">
              Désinscription en 1 clic. Pas de spam. Promis. 🤞
            </p>
          </>
        )}
      </div>
    </div>
  );
}
