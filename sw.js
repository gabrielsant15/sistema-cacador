// ════════════════════════════════════════
//  SOLO LEVELING OS — Service Worker
//  Cache offline + atualizações automáticas
// ════════════════════════════════════════

const CACHE_NAME = 'sl-os-v1';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap'
];

// ─── INSTALL: faz cache dos assets principais ───
self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Cacheando assets...');
      return cache.addAll(CACHE_ASSETS).catch(err => {
        console.warn('[SW] Alguns assets falharam no cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// ─── ACTIVATE: limpa caches antigos ───
self.addEventListener('activate', event => {
  console.log('[SW] Ativando...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => {
          console.log('[SW] Deletando cache antigo:', key);
          return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH: Cache-first para assets, network-first para resto ───
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Fontes Google: cache-first
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }

  // App shell (index.html, manifest, icons): cache-first
  if (
    request.destination === 'document' ||
    request.destination === 'image' ||
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.json') ||
    url.pathname.endsWith('.png')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          // Tenta atualizar em background
          fetch(request).then(response => {
            caches.open(CACHE_NAME).then(cache => cache.put(request, response));
          }).catch(() => {});
          return cached;
        }
        return fetch(request).then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        });
      })
    );
    return;
  }

  // Default: network com fallback para cache
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});

// ─── MENSAGENS: skip waiting manual ───
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Solo Leveling OS Service Worker carregado.');
