const CACHE_NAME = 'static-cache-v1';
const STATIC_RESOURCES = [];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(STATIC_RESOURCES);
        })
    );
    self.skipWaiting();
});

/*
 * If you enable this method it will break some POST requests (createRetailer)
 * self.addEventListener('fetch', (event) => {
 *     if (event.request.method !== 'GET') {
 *         return fetch(event.request);
 *     }
 *     event.respondWith(
 *         caches.match(event.request).then((response) => {
 *             return response || fetch(event.request);
 *         })
 *     );
 * });
 */

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
