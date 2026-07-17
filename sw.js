const CACHE_NAME = 'solo-leveling-os-v3';

// As URLs de fontes abaixo agora estão idênticas às chamadas no HTML para garantir o cache offline
const CACHE_ASSETS = [
  'index.html',
  'manifest.json',
  'icon-120.png',
  'icon-152.png',
  'icon-180.png',
  'icon-512.png',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&family=Share+Tech+Mono&display=swap',
  'https://fonts.gstatic.com/crossorigin'
];

// Instalação do Service Worker e Caching dos arquivos estáticos
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de Cache: Network First, caindo para o Cache se estiver Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
