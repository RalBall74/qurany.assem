const CACHE_NAME = 'quran-app-v11';
const AUDIO_CACHE_NAME = 'quran-audio-v1';

const CORE_ASSETS = [
    './',
    './index.html',
    './others/style.css',
    './js/app.js',
    './js/reciters.js',
    './js/duas.js',
    './js/translations.js',
    './js/ai-service.js',
    './others/manifest.json',
    './images/icon-192x192.png',
    './images/icon-512x512.jpg'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            console.log('[SW] Pre-caching core assets');
            try {
                // We add assets one by one or via addAll but handle failures
                return await cache.addAll(CORE_ASSETS);
            } catch (err) {
                console.error('[SW] Pre-caching failed:', err);
            }
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // 1. Audio Files: Use the cached copy if we have it, otherwise download it.
    if (url.pathname.endsWith('.mp3')) {
        event.respondWith((async () => {
            const cache = await caches.open(AUDIO_CACHE_NAME);
            
            // Try URL matching
            let response = await cache.match(event.request.url);
            if (!response) {
                // Try Request matching
                response = await cache.match(event.request);
            }

            if (response) {
                // Return cached version if found
                return response;
            }

            // Fallback to network and cache the full result if it's a 200 OK
            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse.ok && networkResponse.status === 200) {
                    await cache.put(event.request.url, networkResponse.clone());
                }
                return networkResponse;
            } catch (err) {
                console.error('[SW] Audio fetch failed:', err);
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            }
        })());
        return;
    }

    // 2. API requests to Alquran.cloud: Stale-While-Revalidate strategy
    if (url.hostname === 'api.alquran.cloud') {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);

            const fetchPromise = fetch(event.request).then(async networkResponse => {
                if (networkResponse.ok && networkResponse.status === 200) {
                    await cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }).catch(err => {
                console.warn('[SW] API background fetch failed:', err);
            });

            return cachedResponse || fetchPromise;
        })());
        return;
    }

    // 3. Core App Files & Anything else: Cache first, network fallback (with Stale-While-Revalidate)
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            // Update cache in the background but return cached immediately
            event.waitUntil((async () => {
                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse.ok && networkResponse.status === 200) {
                        await cache.put(event.request, networkResponse.clone());
                    }
                } catch (err) {
                    // Fail silently in background
                }
            })());
            return cachedResponse;
        }

        // If not in cache, fetch and put in cache
        try {
            const networkResponse = await fetch(event.request);
            if (networkResponse.ok && networkResponse.status === 200) {
                await cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
        } catch (error) {
            console.error('[SW] Fetch failed or offline:', error);
            // Optional: return a custom offline page if it's a navigation request
        }
    })());
});
