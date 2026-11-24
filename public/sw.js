// Service worker FlyBSL : rend le site installable et affiche les alertes de prix (notifications push).
// Pas de cache hors ligne : les pages viennent toujours du réseau, pour afficher les prix du jour.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

// Nécessaire pour que Chrome propose l'installation ; on laisse passer toutes les requêtes.
self.addEventListener('fetch', () => {});

self.addEventListener('push', (event) => {
  let d = {};
  try {
    d = event.data ? event.data.json() : {};
  } catch {
    d = { title: 'FlyBSL', body: event.data ? event.data.text() : '' };
  }
  event.waitUntil(
    self.registration.showNotification(d.title || 'FlyBSL', {
      body: d.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: d.tag,
      data: { url: d.url || '/' },
    }),
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/', self.location.origin).href;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if (w.url === url && 'focus' in w) return w.focus();
      }
      return self.clients.openWindow(url);
    }),
  );
});
