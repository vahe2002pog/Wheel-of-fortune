let debugMode = false;
const RUNTIME = 'cache-version-1';

/**
 * @param {string} msg 
 */
function log(msg) {
    if (debugMode) {
        console.log(msg);
    }
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isYm(url) {
    return /^https?:\/\/mc\.yandex.*/.test(url);
}

function loadFromOrigin(request) {
    log('load file: ' + request.url);
    return fetch(request);
}

function addToCache(request, response) {
    log('add to cache: ' + request.url);
    return caches.open(RUNTIME).then((cache) => cache.put(request, response.clone())).then(() => response);
}

function loadFromCache(request) {
    return caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
            log('load from cache: ' + request.url);
            return cachedResponse;
        } else {
            log('failed load from cache: ' + request.url);
            throw new Error('Response not cached');
        }
    });
}

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
    const currentCaches = [RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames =>
            cacheNames.filter(cacheName => !currentCaches.includes(cacheName))
        ).then(cachesToDelete => 
            Promise.all(cachesToDelete.map(cacheToDelete => caches.delete(cacheToDelete)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    // ignore chrome extensions
    const isExtensions = event.request.url.startsWith('chrome');
    if (!isExtensions && !isYm(event.request.url)) {
        event.respondWith(
            loadFromOrigin(event.request)
            .then((response) => addToCache(event.request, response))
            .catch(() => loadFromCache(event.request))
        );
    }
});
