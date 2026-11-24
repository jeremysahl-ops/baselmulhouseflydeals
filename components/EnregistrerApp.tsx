'use client';

import { useEffect } from 'react';

/**
 * Enregistre le service worker (public/sw.js) : rend le site installable et permet les alertes de prix.
 * Garde aussi l'événement d'installation de Chrome/Android pour le bouton « Installer FlyBSL » de la page alertes.
 */
export default function EnregistrerApp() {
  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    const garder = (e: Event) => {
      e.preventDefault();
      window.__flybslInstall = e as typeof window.__flybslInstall;
      window.dispatchEvent(new Event('flybsl-installable'));
    };
    window.addEventListener('beforeinstallprompt', garder);
    return () => window.removeEventListener('beforeinstallprompt', garder);
  }, []);
  return null;
}
