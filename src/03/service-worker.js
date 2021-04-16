const SW_VERSION = 'v2';
const CACHE_NAME = `towers-cache-${SW_VERSION}`;

const FILES = [
    './',
    'index.html',
    'js/script.js',
    'css/style.css',
    'data.json',
    'manifest.json'
];

self.addEventListener('install', event => {
    console.log('SW: Der ServiceWorker wurde installiert.');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('SW: Der ServiceWorker wurde aktiviert.');
});

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    if (url.pathname.endsWith('/data.json')) {
        console.log('SW: Ich bemerke einen fetch auf data.json');
        console.log(event);

        const newData = {
            "data": "Hallo vom ServiceWorker"
        };
        const res = new Response(JSON.stringify(newData), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        event.respondWith(res);
    }
    else {

        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        console.log(`SW-${SW_VERSION}: Antwort aus dem Cache.`);
                        return response;
                    }
                    else {
                        console.log(`SW-${SW_VERSION}: Nicht im Cache gefunden, Antwort vom Server`);
                        return fetch(event.request);
                    }
                })
        );
    }
});
