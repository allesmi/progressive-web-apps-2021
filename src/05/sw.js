// Network First Caching Strategie
// 1. fetch Event passiert
// 2. SW macht einen fetch vom Server
// 3.1. Response vom Server wird im Cache gespeichert
// 3.2. Response vom Server wird an die Seite zurückgegeben

// Network First, wenn der Server nicht erreichbar ist
// 1. fetch Event passiert
// 2. Server ist nicht erreichbar, Request schlägt fehl
// 3. SW holt den letzten erfolgreichen Response aus dem Cache
// 4. ... und beantwortet den Request der Seite.

// Cache First Caching Strategie
// 1. fetch Event passiert
// 2. SW holt den Response aus dem Cache
// 3. ... und beantwortet den Request der Seite.

// Cache First, wenn kein Response für diesen Request
//   gefunden wird (Cache Miss)
// 1. fetch Event
// 2. SW findet keinen Response (Cache Miss)
// 3. SW macht einen fetch vom Server
// 4.1. Response vom Server wird im Cache gespeichert
// 4.2. Response vom Server wird an die Seite zurückgegeben

const SW_NAME = 'dog-app';
const DATA_CACHE = `${SW_NAME}-data-v1`;
const FILE_CACHE = `${SW_NAME}-file-v6`;

const FILES = [
  './', // localhost:5500/05/
  './index.html', // localhost:5500/05/index.html
  './detail.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './images/icon-64.png',
  './images/icon-256.png'
];

async function precacheFiles() {
  const cache = await caches.open(FILE_CACHE);

  return cache.addAll(FILES);
}

//
self.addEventListener('install', event => {
  event.waitUntil(precacheFiles());
});

async function deleteOldCaches() {
  const cacheNames = await caches.keys();

  for (let cacheName of cacheNames) {
    if (cacheName !== FILE_CACHE && cacheName !== DATA_CACHE) {
      await caches.delete(cacheName);
    }
  }
}

self.addEventListener('activate', event => {
  event.waitUntil(deleteOldCaches());
});

async function cacheFirst(request) {
  const cacheResponse = await caches.match(request);

  if (cacheResponse !== undefined) {
    // 2. SW holt den Response aus dem Cache
    // 3. ... und beantwortet den Request der Seite.
    return cacheResponse;
  }
  else {
    // 2. SW findet keinen Response (Cache Miss)
    // 3. SW macht einen fetch vom Server
    const response = await fetch(request);

    if (response.ok) {
      // 4.1. Response vom Server wird im Cache gespeichert
      const cache = await caches.open(FILE_CACHE);
      cache.put(request, response.clone());
    }

    // 4.2. Response vom Server wird an die Seite zurückgegeben
    return response;
  }
}

async function networkFirst(request) {
  const cache = await caches.open(DATA_CACHE);
  let response;

  try {
    response = await fetch(request);
  }
  catch (error) {
    // 2. Server ist nicht erreichbar, Request schlägt fehl
    // 3. SW holt den letzten erfolgreichen Response aus dem Cache
    // 4. ... und beantwortet den Request der Seite.
    return cache.match(request);
  }

  if (response.ok) {
    console.log('Wir speichern die Antwort im Cache');
    // 3.1. Response vom Server wird im Cache gespeichert
    cache.put(request, response.clone());
  }

  // 3.2. Response vom Server wird an die Seite zurückgegeben
  return response;
}

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (url.startsWith('http://localhost:5500')) {
    // FILE_CACHE - cache first
    event.respondWith(cacheFirst(event.request));
  }
  else {
    // DATA_CACHE - network first
    console.log(`${SW_NAME}: Zugriff auf API`);
    event.respondWith(networkFirst(event.request));
  }
});

// Geht nicht, weil await immer in einer async function stehen muss:
// const cache = await caches.open(DATA_CACHE);