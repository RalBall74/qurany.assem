const CACHE_NAME = 'quran-app-v13';
const AUDIO_CACHE_NAME = 'quran-audio-v1';

const CORE_ASSETS = [
    './',
    './index.html',
    './others/style.css',
    './js/surahs-data.js',
    './js/app.js',
    './js/reciters.js',
    './js/translations.js',
    './js/ai-service.js',
    './others/manifest.json',
    './images/icon-192x192.png',
    './images/icon-512x512.jpg',
    './images/favicon.ico',
    './images/me.png',
    // صور جميع القراء لتعمل بالكامل أوفلاين
    './images/1.jpg', './images/2.jpg', './images/3.jpg', './images/4.jpg',
    './images/5.jpg', './images/6.jpg', './images/7.jpg', './images/8.jpg',
    './images/9.jpg', './images/10.jpg', './images/11.jpg', './images/12.jpg',
    './images/13.jpg', './images/14.jpg', './images/15.jpg', './images/16.jpg',
    './images/17.jpg', './images/18.jpg', './images/19.jpg', './images/20.jpg',
    './images/21.jpg', './images/22.jpg', './images/23.jpg', './images/24.jpg',
    './images/25.jpg', './images/26.jpg', './images/27.jpg', './images/28.jpg',
    './images/29.jpg', './images/30.jpg', './images/31.jpg', './images/32.jpg',
    // أيقونات Font Awesome لضمان عدم اختفاء الأزرار والأيقونات أوفلاين
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
    // خطوط جوجل
    'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Outfit:wght@300;400;600&family=Tajawal:wght@300;400;500;700&display=swap'
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async cache => {
            console.log('[SW] Pre-caching core assets for offline support');
            // استخدام Promise.allSettled لضمان كاش كل الملفات حتى لو فشل رابط خارجي
            await Promise.allSettled(
                CORE_ASSETS.map(async asset => {
                    try {
                        const response = await fetch(asset, {
                            mode: asset.startsWith('http') ? 'cors' : 'same-origin'
                        });
                        if (response.ok || response.type === 'opaque') {
                            await cache.put(asset, response);
                        }
                    } catch (err) {
                        console.warn('[SW] Pre-cache item failed (continuing others):', asset, err);
                    }
                })
            );
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== AUDIO_CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
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

    // 1. ملفات الصوت MP3: كاش أولاً، ثم شبكة
    if (url.pathname.endsWith('.mp3')) {
        event.respondWith((async () => {
            const cache = await caches.open(AUDIO_CACHE_NAME);
            let response = await cache.match(event.request.url) || await cache.match(event.request);
            if (response) return response;

            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse.ok && networkResponse.status === 200) {
                    await cache.put(event.request.url, networkResponse.clone());
                }
                return networkResponse;
            } catch (err) {
                console.error('[SW] Audio fetch failed (offline):', err);
                return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
            }
        })());
        return;
    }

    // 2. خطوط جوجل وأيقونات Font Awesome من الـ CDN: Cache First لتفادي تشوه التصميم بدون اتصال
    if (url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.hostname.includes('cdnjs.cloudflare.com')) {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) return cachedResponse;

            try {
                const networkResponse = await fetch(event.request);
                if (networkResponse.ok || networkResponse.type === 'opaque') {
                    await cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            } catch (err) {
                console.warn('[SW] CDN font/icon fetch failed:', err);
                return cachedResponse || new Response('', { status: 408 });
            }
        })());
        return;
    }

    // 3. طلبات API القرآن: Cache First مع تحديث في الخلفية إن وجد اتصال
    if (url.hostname === 'api.alquran.cloud') {
        event.respondWith((async () => {
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(event.request);

            const networkFetch = fetch(event.request).then(async networkResponse => {
                if (networkResponse.ok && networkResponse.status === 200) {
                    await cache.put(event.request, networkResponse.clone());
                }
                return networkResponse;
            }).catch(err => {
                console.warn('[SW] API offline or background fetch failed:', err);
                return null;
            });

            if (cachedResponse) {
                event.waitUntil(networkFetch);
                return cachedResponse;
            }

            const netRes = await networkFetch;
            if (netRes) return netRes;

            return new Response(JSON.stringify({ code: 503, status: 'Offline', data: [] }), {
                headers: { 'Content-Type': 'application/json' }
            });
        })());
        return;
    }

    // 4. طلبات التنقل (Navigation) والملفات الأساسية: Cache First مع Fallback آمن لصفحة التطبيق
    event.respondWith((async () => {
        const cache = await caches.open(CACHE_NAME);
        let cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            // تحديث الكاش في الخلفية لو متصل
            event.waitUntil((async () => {
                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse.ok && networkResponse.status === 200) {
                        await cache.put(event.request, networkResponse.clone());
                    }
                } catch (e) {
                    // تجاهل الأخطاء أوفلاين في الخلفية
                }
            })());
            return cachedResponse;
        }

        // محاولة جلب من الشبكة
        try {
            const networkResponse = await fetch(event.request);
            if (networkResponse.ok && networkResponse.status === 200) {
                await cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
        } catch (error) {
            // لو طلب تنقل (فتح التطبيق بدون نت) نرجع الصفحة الرئيسية من الكاش
            if (event.request.mode === 'navigate') {
                const indexFallback = await cache.match('./index.html') || await cache.match('./');
                if (indexFallback) return indexFallback;
            }
            console.error('[SW] Fetch failed offline:', event.request.url);
            return new Response('Offline', { status: 503, statusText: 'Offline' });
        }
    })());
});
