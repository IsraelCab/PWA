// Assign name
const CACHE_NAME = 'v1_cache_ic_pwa'

//Files configuration
var urlsToCache = [
    './',
    './css/syles.css',
    './img/icon 16.png',
    './img/icon 32.png',
    './img/icon 64.png',
    './img/icon 128.png',
    './img/icon 256.png',
    './img/icon 512.png',
    './img/icon 1024.png'
];

// Event install to install the service worker
self.addEventListener('install', e => {

    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('Cache has not been registered', err))
    );

});

// Activate event to work offline

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if(cacheWhiteList.indexOf(cacheName) == -1)
                        {
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
    );
})

// Fetch event
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if(res){
                    return res;
                }
                return fetch(e.request);

            })
    );
});
