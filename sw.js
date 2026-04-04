const CACHE_NAME = 'quran-app-v9';
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
        caches.open(CACHE_NAME).then(cache => {
            // Pre-cache core files so the app works offline from the first install
            return cache.addAll(CORE_ASSETS);
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
    // We only want to handle GET requests. POST, PUT, DELETE, etc. are not cacheable.
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // 1. Audio Files: Use the cached copy if we have it, otherwise download it.
    if (url.pathname.endsWith('.mp3')) {
        event.respondWith(
            caches.open(AUDIO_CACHE_NAME).then(async cache => {
                // جرب أولاً بالـ URL عشان نتجنب مشاكل الـ headers المختلفة
                let response = await cache.match(event.request.url);
                if (!response) {
                    // جرب بالـ Request نفسه كـ fallback
                    response = await cache.match(event.request);
                }
                if (response) {
                    console.log('[SW] Audio from cache:', event.request.url);
                    return response;
                }
                console.log('[SW] Audio from network:', event.request.url);
                return fetch(event.request).then(networkResponse => {
                    // لو الجلب نجح واستلمنا ملف كامل (status 200)، نحفظه في الكاش للمرة الجاية
                    // الـ 206 (Partial Content) مش بتتحفظ في الكاش مع cache.put
                    if (networkResponse.ok && networkResponse.status === 200) {
                        cache.put(event.request.url, networkResponse.clone());
                    }
                    return networkResponse;
                });
            })
        );
        return;
    }

    // 2. API requests to Alquran.cloud: Stale-While-Revalidate strategy
    if (url.hostname === 'api.alquran.cloud') {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    if (networkResponse.ok && networkResponse.status === 200) {
                        const clonedResponse = networkResponse.clone();
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clonedResponse));
                    }
                    return networkResponse;
                });
                // Return cached version immediately if found, otherwise wait for network
                return cachedResponse || fetchPromise;
            })
        );
        return;
    }

    // 3. Core App Files & Anything else: Cache first, network fallback (with Stale-While-Revalidate)
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                // Update cache in the background but return cached immediately
                fetch(event.request).then(networkResponse => {
                    if (networkResponse.ok && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then(cache => cache.put(event.request, networkResponse.clone()));
                    }
                }).catch(() => { });
                return cachedResponse;
            }
            // If not in cache, fetch and put in cache
            return fetch(event.request).then(networkResponse => {
                if (networkResponse.ok && networkResponse.status === 200) {
                    const clonedResponse = networkResponse.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, clonedResponse);
                    });
                }
                return networkResponse;
            }).catch(error => {
                console.error('Fetch failed or offline:', error);
            });
        })
    );
});
