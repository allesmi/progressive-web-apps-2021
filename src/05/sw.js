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
const FILE_CACHE = `${SW_NAME}-file-v5`;

const FILES = [
  './', // localhost:5500/05/
  './index.html', // localhost:5500/05/index.html
  './detail.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './images/icon-64.png',
  './images/icon-256.png',
  './images/logo.png'
];

//
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(FILE_CACHE)
      .then(cache => {
        return cache.addAll(FILES)
      })
  )
});

self.addEventListener('activate', event => {
  caches.keys().then(cacheNames => {
    for (let cacheName of cacheNames) {
      if (cacheName !== FILE_CACHE && cacheName !== DATA_CACHE) {
        caches.delete(cacheName);
      }
    }
  });
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  if (url.startsWith('http://localhost:5500')) {
    // FILE_CACHE - cache first
    event.respondWith(caches.match(event.request)
      .then(response => {
        if (response !== undefined) {
          // 2. SW holt den Response aus dem Cache
          // 3. ... und beantwortet den Request der Seite.
          return response;
        }
        else {
          // 2. SW findet keinen Response (Cache Miss)
          // 4.2. Response vom Server wird an die Seite zurückgegeben
          return fetch(event.request)
            .then(response => {
              if (response.ok) {
                caches.open(FILE_CACHE).then(cache => {
                  // 4.1. Response vom Server wird im Cache gespeichert
                  cache.put(event.request, response.clone());
                });
              }
              return response;
            }
            );
        }
      })
    );
  }
  else {
    // DATA_CACHE - network first
    console.log(`${SW_NAME}: Zugriff auf API`);
    event.respondWith(
      caches.open(DATA_CACHE).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.ok) {
              // 3.1. Response vom Server wird im Cache gespeichert
              cache.put(event.request, response.clone());
            }
            // 3.2. Response vom Server wird an die Seite zurückgegeben
            return response;
          })
          .catch(error => {
            // 2. Server ist nicht erreichbar, Request schlägt fehl
            // 3. SW holt den letzten erfolgreichen Response aus dem Cache
            // 4. ... und beantwortet den Request der Seite.
            return cache.match(event.request);
          });
      })
    )
  }


  // event.respondWith(
  //   caches.match(event.request)
  //     .then(response => {
  //       if (response !== undefined) {
  //         return response;
  //       }
  //       else {
  //         return fetch(event.request)
  //           .then(response => {
  //             const responseClone = response.clone();

  //             caches.open(FILE_CACHE)
  //               .then(cache => {
  //                 cache.put(event.request, responseClone);
  //               });

  //             return response;
  //           });
  //       }
  //     })
  // );
});