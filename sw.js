// Service Worker para Cuaderno Interactivo Virtual Física III
const CACHE_NAME = 'fisica3-cuaderno-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/main.css',
  './css/notebook.css',
  './css/geogebra.css',
  './css/simulation.css',
  './js/app.js',
  './js/notebook.js',
  './js/geogebra-engine.js',
  './js/physics-simulation.js',
  './js/timeline-mindmap.js',
  './js/data/content.js',
  './js/data/exercises.js',
  './js/data/glossary-ref.js',
  './imagenes/Portada.webp',
  './imagenes/plantilla_contenido.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(err => {
        console.warn('Cache fallback durante la instalación:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        return caches.match('./index.html');
      });
    })
  );
});
