document.addEventListener('DOMContentLoaded', () => {
    // العناصر والحاجات اللي في الصفحة
    const surahListEl = document.getElementById('surah-list');
    const recitersGridEl = document.getElementById('reciters-grid');
    const searchInput = document.getElementById('surah-search');
    const themeSwitch = document.getElementById('theme-switch');
    const playerAudio = document.getElementById('main-audio');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFilled = document.getElementById('progress-filled');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playerSurah = document.getElementById('player-surah');
    const playerReciter = document.getElementById('player-reciter');
    const playerImg = document.getElementById('player-img');
    const favBtn = document.getElementById('fav-btn');
    const downloadBtn = document.getElementById('download-btn');
    const showTextBtn = document.getElementById('show-text-btn');
    const ayahViewer = document.getElementById('ayah-viewer');
    const closeViewer = document.getElementById('close-viewer');
    const ayahContent = document.getElementById('ayah-content');
    const viewerTitle = document.getElementById('viewer-title');
    const langBtn = document.getElementById('lang-btn');
    const languageModal = document.getElementById('language-modal');
    const closeLanguage = document.getElementById('close-language');
    const duaView = document.getElementById('dua-view');
    const duaTextEl = document.getElementById('dua-text-el');
    const tafsirModal = document.getElementById('tafsir-modal');
    const closeTafsir = document.getElementById('close-tafsir');
    const tafsirBody = document.getElementById('tafsir-body');
    const tafsirTitle = document.getElementById('tafsir-title');
    const tafsirEngineSelect = document.getElementById('tafsir-engine-select');

    const navItems = document.querySelectorAll('.nav-item');
    const searchTypeToggle = document.getElementById('search-type-toggle');
    const searchTypeLabel = document.getElementById('search-type-label');
    const salawatModal = document.getElementById('salawat-modal');
    const closeSalawat = document.getElementById('close-salawat');
    const othersSection = document.getElementById('others-section');
    const athkarView = document.getElementById('athkar-view');
    const aboutView = document.getElementById('about-view');
    const playerBar = document.querySelector('.player-bar');
    const playerMaximizeBtn = document.getElementById('player-maximize-btn');
    const miniPlayerImg = document.getElementById('mini-player-img');
    const contentArea = document.getElementById('content-area');

    const rosaryBtn = document.getElementById('rosary-btn');
    const rosaryView = document.getElementById('rosary-view');
    const rosaryBack = document.getElementById('rosary-back');
    const rosaryCountEl = document.getElementById('rosary-count');
    const rosaryIncrementBtn = document.getElementById('rosary-increment-btn');
    const rosaryResetBtn = document.getElementById('rosary-reset-btn');
    const prayerTimesBtn = document.getElementById('prayer-times-btn');
    const prayerView = document.getElementById('prayer-view');
    const prayerBack = document.getElementById('prayer-back');
    const prayerTimesList = document.getElementById('prayer-times-list');
    const prayerGregorianDate = document.getElementById('prayer-gregorian-date');
    const prayerHijriDate = document.getElementById('prayer-hijri-date');
    const prayerLocation = document.getElementById('prayer-location');
    const offlineBanner = document.getElementById('offline-banner');
    const shareModal = document.getElementById('share-modal');
    const closeShare = document.getElementById('close-share');
    const videosBtn = document.getElementById('videos-btn');
    const videosView = document.getElementById('videos-view');
    const videosBack = document.getElementById('videos-back');
    const playlistModal = document.getElementById('playlist-modal');
    const closePlaylistModal = document.getElementById('close-playlist-modal');
    const showPlaylistItemsBtn = document.getElementById('show-playlist-items-btn');
    const playlistItemsContainer = document.getElementById('playlist-items-container');
    const youtubePlayer = document.getElementById('youtube-player');
    const playlistsGridContainer = document.getElementById('playlists-grid-container');
    const playlistPlayerView = document.getElementById('playlist-player-view');
    const playlistPlayerBack = document.getElementById('playlist-player-back');
    const currentPlaylistTitle = document.getElementById('current-playlist-title');
    const individualVideosGrid = document.getElementById('individual-videos-grid');
    const singleVideoPlayerView = document.getElementById('single-video-player-view');
    const singleVideoBack = document.getElementById('single-video-back');
    const singleYoutubePlayer = document.getElementById('single-youtube-player');
    const currentVideoTitle = document.getElementById('current-video-title');
    const shareCanvas = document.getElementById('share-canvas');
    const sharePreview = document.getElementById('share-card-preview');
    const downloadCardBtn = document.getElementById('download-card-btn');
    const nativeShareBtn = document.getElementById('native-share-btn');



    // حالة التطبيق والحاجات اللي بتتحفظ
    let surahs = [];
    let reciter = recitersData[0];
    let curIdx = -1;
    let favorites = JSON.parse(localStorage.getItem('quran_favorites')) || [];
    let isPlaying = false;
    let sleepTimer = null;
    let searchType = 'surah'; // ممكن يكون 'surah' عشان يدور على السور أو 'ayah' عشان يدور على كلمات في الآيات
    let searchDebounceTimer = null;
    let currentTafsirEdition = localStorage.getItem('quran_tafsir_edition') || 'ar.muyassar';
    let activeTafsirAyah = null;
    let activeTafsirSurah = null;
    let prayersTimings = null;
    let notificationPreferences = { prayer: false };
    let readingObserver = null;
    let prayerCountdownInterval = null;
    let playerManuallyMaximized = false;
    let audioContext, analyser, audioSource, visualizerAnimationId;
    let isFocusMode = false;


    const innahuRabbiPlaylist = [
        { "title": "١- الرب (المجلس الأول) - إنه ربي - شريف علي", "id": "-zMW2Rqjwcc" },
        { "title": "٢- الرب (المجلس الثاني) - إنه ربي - شريف علي", "id": "flt8aQV5aVw" },
        { "title": "3- The Name of God the Lord (Third Session) - He is my Lord - Sharif Ali", "id": "KB-nstu8RQs" },
        { "title": "٤- اسم الله الرب (المجلس الرابع) - إنه ربي - شريف علي", "id": "CAnLTzJ-z3s" },
        { "title": "٥- اسم الله الشكور - إنه الله - شريف علي", "id": "n1UtgKERsjc" },
        { "title": "٦- اسم الله الشكور (المجلس الثاني) - إنه ربي - شريف علي", "id": "92gJfGhHufs" },
        { "title": "٧- اسم الله الحليم - إنه ربي - شريف علي", "id": "U4weeQ2ehgQ" },
        { "title": "٨- اسم الله الحليم (المجلس الثاني) - إنه ربي - شريف علي", "id": "hYSlYpXVFV0" },
        { "title": "٩- اسم الله الحليم (المجلس الثالث) - إنه ربي - شريف علي", "id": "KUTnq9dl1Rg" },
        { "title": "١٠- اسم الله السميع - إنه ربي - شريف علي", "id": "54So9oj3izU" },
        { "title": "١١- اسم الله السميع (المجلس الثاني) - إنه ربي - شريف علي", "id": "3pUA_PdkOvI" },
        { "title": "١٢- اسم الله السميع (المجلس الثالث) - إنه ربي - شريف علي", "id": "BsRSP5wPaRc" },
        { "title": "١٣- اسم الله المجيب - إنه ربي - شريف علي", "id": "HJiMyjMTX8k" },
        { "title": "14- The Name of God, the Responsive (Second Session) - He is my Lord - Sharif Ali", "id": "ntFuG7xQHho" },
        { "title": "١٥- اسم الله المجيب (المجلس الثالث) - إنه ربي - شريف علي", "id": "uPTVg-8Usn4" },
        { "title": "١٦- اسم الله المجيب (المجلس الرابع) - إنه ربي - شريف علي", "id": "ZN-dB9LLhdg" },
        { "title": "17- The name of God, the Guardian - He is my Lord - Sharif Ali", "id": "Ii_2geIRPjU" },
        { "title": "١٨- اسم الله الولي (المجلس الثاني) - إنه ربي - شريف علي", "id": "uFRKthmqxGs" },
        { "title": "١٩- اسم الله اللطيف - إنه ربي - شريف علي", "id": "TYi4agOY7E0" },
        { "title": "٢٠- اسم الله اللطيف (المجلس الثاني) - إنه ربي - شريف علي", "id": "mF7Ou4L9UO0" },
        { "title": "٢١- اسم الله التواب - إنه ربي - شريف علي", "id": "praC1bowlVA" },
        { "title": "22- The Name of God, the Oft-Returning (Second Session) - The Virtues of Repentance - He is my Lo...", "id": "wxsHAMrcZb4" },
        { "title": "٢٣- اسم الله التواب (المجلس الثالث) - أسباب الثبات بعد التوبة - إنه ربي - شريف علي", "id": "yVyTQ4PrHfw" },
        { "title": "24- The Name of God, the Oft-Returning (Session Four) - Reasons for Steadfastness After Repentanc...", "id": "P5zgWynO1ws" },
        { "title": "٢٥- الرحمن الرحيم - إنه ربي - شريف علي", "id": "E1nj3HwIW7s" },
        { "title": "٢٦- الرحمن الرحيم (المجلس الثاني) - الرجاء وأسباب الرحمة - إنه ربي - شريف علي", "id": "_pY233EX4t0" },
        { "title": "٢٧- العليـم - إنه ربي - شريف علي", "id": "4aXpegEi-jw" },
        { "title": "٢٨- اسم الله العليم (المجلس الثاني) - إنه ربي - شريف علي", "id": "OI9ijCkziFk" },
        { "title": "٢٩- اسم الله العليـم (المجلس الثالث) - إنه ربي - شريف علي", "id": "IVz7pMY-604" },
        { "title": "٣٠- أصفى الحب - الودود (١) - إنه ربي - شريف علي", "id": "_7Ax8NPaC1I" },
        { "title": "٣١- هل تحب الله؟ - الودود (٢) - إنه ربي - شريف علي", "id": "wg29OoQ5sWg" },
        { "title": "٣٢- الغاية العُظمى - الودود (٣) - إنه ربي - شريف علي", "id": "JqZfqGPHMPI" },
        { "title": "٣٣- طريق الولاية - الودود (٤) - إنه ربي - شريف علي", "id": "SMNGAtYFZnI" },
        { "title": "٣٤- ماذا لو أحبك الله؟ - الودود (٥) - إنه ربي - شريف علي", "id": "oAbE8EjFdbU" }
    ];

    const majalisQuranPlaylist = [
        { "title": "مجالس القرآن -الدرس الأول- سورة ق", "id": "1lpcJ-YE0EU" },
        { "title": "مجالس القرآن -الدرس الثاني- سورة الطور", "id": "YSfS16xkSLI" },
        { "title": "مجالس القرآن -الدرس الثالث- سورة الذاريات", "id": "p5iQWT64cpc" },
        { "title": "مجالس القرآن -الدرس الرابع- سورة النجم", "id": "dEOMwpjzowo" },
        { "title": "مجالس القرآن -الدرس الخامس- سورة القمر", "id": "FQvfbSKMgcA" },
        { "title": "مجالس القرآن -الدرس السادس- سورة الرحمن", "id": "rB_ReP1BQLM" },
        { "title": "مجالس القرآن -الدرس السابع- سورة الواقعة", "id": "lOY1286q-nc" },
        { "title": "مجالس القرآن -الدرس الثامن- سورة الواقعة الجزء الثاني", "id": "FHzdUP5u9ss" },
        { "title": "مجالس القرآن -الدرس التاسع- سورة الحديد", "id": "aEmkf1bk7sk" },
        { "title": "مجالس القرآن -الدرس العاشر- سورة الحديد الجزء الثاني", "id": "ukx6MQjhzrM" },
        { "title": "مجالس القرآن -الدرس الحادي عشر- سورة التغابن", "id": "4D0rmZ6ueQU" },
        { "title": "مجالس القرآن -الدرس الثاني عشر- سورة الملك", "id": "N_cIYGonSd4" },
        { "title": "مجالس القرآن -الدرس الثالث عشر- سورة القلم", "id": "V077FGzDfNk" },
        { "title": "مجالس القرآن -الدرس الرابع عشر- سورة الحاقة", "id": "RqJijQsNHUk" },
        { "title": "مجالس القرآن -الدرس الخامس عشر- سورة القمر", "id": "Rjn50Kw6cyI" },
        { "title": "مجالس القرآن -الدرس السادس عشر- سورة المزمل", "id": "OQFnaWgZCu8" },
        { "title": "تدبر سورة إبراهيم - الدرس الأول", "id": "cQL0YlWRDks" },
        { "title": "تدبر سورة إبراهيم - الدرس الثاني", "id": "EeQCLtyXPi4" },
        { "title": "تدبر سورة إبراهيم - الدرس الثالث", "id": "kH-ACFEEd3s" },
        { "title": "تدبر سورة إبراهيم - الدرس الرابع", "id": "YEp0HI39Gp8" },
        { "title": "تدبر سورة إبراهيم - الدرس الخامس", "id": "bgfrBQjgqSs" },
        { "title": "تدبر سورة إبراهيم - الدرس السادس", "id": "rZy96Sej1sY" }
    ];

    const tadawuqIbadatPlaylist = [
        { "title": "الصلاة", "id": "63_AOCldyXo" },
        { "title": "القرآن", "id": "hK-9Be0prrA" },
        { "title": "الدعاء", "id": "si994Z9BAr8" },
        { "title": "الذكر", "id": "nkil1U1GxdA" }
    ];

    const waeyAkhlaqPlaylist = [
        { "title": "مقدمة عن أهمية الأخلاق والمعاملات في الإسلام", "id": "zzWhkMWlIo0" },
        { "title": "الصدق والكذب", "id": "yLyb_H7y-Ho" },
        { "title": "الحلم والغضب", "id": "FZbf5KM8FiA" },
        { "title": "الكلم الطيب والسب", "id": "7qH889sV1oY" },
        { "title": "السخرية وكبيرة الغيبة والنميمة", "id": "ejBW7Wtlqb4" },
        { "title": "معنى الشح وضرورة فهمه والبخل والكرم", "id": "EdvGjyhyP50" },
        { "title": "الكرم والإيثار", "id": "abdhcuWoeBM" },
        { "title": "المعاملات مع الجيرة والكبار والصغار والخدم واليتيم", "id": "svaB8OMNkKs" },
        { "title": "الكبر وأسبابه وخطورته ومعالجة النفس منه", "id": "XkMCNwxgoMc" },
        { "title": "التواضع", "id": "lY7H7xK_Lz0" },
        { "title": "الحياء", "id": "AM2V9T7830Q" },
        { "title": "صلة الأرحام", "id": "aw7gLYF6Ttg" }
    ];

    const individualVideos = [
        { id: "x-BZKZLXyx0", title: "ايش علاج التشتّت والكسل وضعف الإرادة؟ الشيخ أحمد النفيس" },
        { id: "ZWraKKwNfpE", title: "كيف نصل إلى القلب السليم؟ | د.أحمد العربي | بودكاست بدون ورق" },
        { id: "3u5uYyGKYU8", title: "إيه المشكلة لو مفيش دين؟!" },
        { id: "W0xjif69Yos", title: "خطة ستغير حياتك في رمضان ..كيف تخرج من رمضان بقلب صافٍ ؟ د . أحمد العربي" },
        { id: "qHXCBBBXes4", title: "إيه المشكلة في التوبة؟!" },
        { id: "CL02A6eCSQA", title: "الى أين الوجهة..؟" },
        { id: "Ez6mJarIMmU", title: "هكذا تثبت على الصلاة الي الأبد.." },
        { id: "ZKH2vJrRBrM", title: "بكفي حياتك تضيع منك!" },
        { id: "S6RAL5W7fPE", title: "أول مواجهة بين ابليس وآدم!" },
        { id: "vU1jcbqvZvo", title: "الطريق الذي يجب أن تمشيه وحيدا" },
        { id: "hC-hfDGgMVg", title: "قصة سيدنا آدم عليه السلام" },
        { id: "jFn4yVoICmM", title: "كيف بدأ الخلق؟.. قصة نبي الله آدم (عليه السلام)" },
        { id: "psjKG2yUdwI", title: "كيف انتصر سيدنا ابراهيم على النمرود" },
        { id: "E0pVDTNr0Gk", title: "حوت سيدنا يونس" }
    ];

    let currentActivePlaylist = [];
    let currentPlaylistIdStr = "";

    // تشغيل الـ App أول ما يفتح
    init();

    async function init() {
        // console.log('Starting app...');
        renderReciters();
        await fetchSurahs();
        // console.log('Surahs ready:', surahs.length);
        loadLastPlayback(); // Resume last session
        setupEventListeners();
        applyTheme();
        updateFavoritesUI();
        if (tafsirEngineSelect) tafsirEngineSelect.value = currentTafsirEdition;

        // Set default reciter if nothing is playing
        if (reciter && (playerSurah.textContent === 'اختر سورة' || playerSurah.textContent === t('اختر سورة'))) {
            playerReciter.textContent = t(reciter.name);
            playerImg.src = reciter.img;
            if (miniPlayerImg) miniPlayerImg.src = reciter.img;
        }


        // مراقبة الاتصال بالنت
        updateOnlineStatus();
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        // تفويض الأحداث للقوائم لتحسين الأداء
        if (surahListEl) {
            surahListEl.addEventListener('click', (e) => {
                const card = e.target.closest('.surah-card');
                if (card) {
                    const idx = parseInt(card.dataset.index);
                    playSurah(surahs[idx], idx);
                }
            });
        }

        if (recitersGridEl) {
            recitersGridEl.addEventListener('click', (e) => {
                const card = e.target.closest('.reciter-card');
                if (card) {
                    const id = card.dataset.id;
                    reciter = recitersData.find(r => r.id === id);
                    document.querySelectorAll('.reciter-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    playerReciter.textContent = t(reciter.name);
                    playerImg.src = reciter.img;
                    if (miniPlayerImg) miniPlayerImg.src = reciter.img;
                    if (curIdx !== -1) playSurah(surahs[curIdx]);
                }
            });
        }

        // ضروري عشان الـ Audio Visualizer يقدر يقرأ الترددات من السيرفر (CORS)
        playerAudio.crossOrigin = "anonymous";
        updateHeroCard();
    }



    // وظائف لعرض الهياكل (Skeletons)

    function showSurahSkeletons() {
        surahListEl.innerHTML = Array(12).fill(0).map(() => `
            <li class="surah-card-skeleton" role="listitem">
                <div class="skeleton-number skeleton"></div>
                <div class="skeleton-info">
                    <div class="skeleton-title skeleton"></div>
                    <div class="skeleton-text skeleton"></div>
                </div>
                <div class="skeleton-icon skeleton"></div>
            </li>
        `).join('');
    }

    function showReciterSkeletons() {
        recitersGridEl.innerHTML = Array(8).fill(0).map(() => `
            <li class="reciter-skeleton" role="listitem">
                <div class="skeleton-circle skeleton"></div>
                <div class="skeleton-name skeleton"></div>
            </li>
        `).join('');
    }

    function showAyahSkeletons() {
        ayahContent.innerHTML = Array(15).fill(0).map(() => `
            <div class="ayah-row-skeleton">
                <div class="skeleton-ayah-text skeleton"></div>
                <div class="skeleton-ayah-text short skeleton"></div>
            </div>
        `).join('');
    }

    function showPrayerSkeletons() {
        prayerTimesList.innerHTML = Array(6).fill(0).map(() => `
            <li class="prayer-item-skeleton" role="listitem">
                <div class="skeleton-prayer-name skeleton"></div>
                <div class="skeleton-prayer-time skeleton"></div>
            </li>
        `).join('');
    }

    function showTafsirSkeletons() {
        tafsirBody.innerHTML = `
            <div class="tafsir-skeleton">
                <div class="skeleton-line skeleton"></div>
                <div class="skeleton-line skeleton"></div>
                <div class="skeleton-line skeleton"></div>
                <div class="skeleton-line last skeleton"></div>
            </div>
        `;
    }

    function renderPlaylistItems() {
        if (!playlistItemsContainer) return;

        playlistItemsContainer.innerHTML = currentActivePlaylist.map((item, index) => {
            const isActive = youtubePlayer.src.includes(item.id);
            return `
                <li class="playlist-item-card ${isActive ? 'active' : ''}" data-id="${item.id}" data-idx="${index}" role="listitem">
                    <div class="ep-num">${index + 1}</div>
                    <div class="playlist-item-name">${item.title}</div>
                </li>
            `;
        }).join('');

        document.querySelectorAll('.playlist-item-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                youtubePlayer.src = `https://www.youtube.com/embed/${id}?list=${currentPlaylistIdStr}&autoplay=1`;
                playlistModal.classList.remove('active');
                setTimeout(() => playlistModal.style.display = 'none', 400);

                // Update active state in UI
                document.querySelectorAll('.playlist-item-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
            });
        });
    }



    function updateOnlineStatus() {
        if (!navigator.onLine) {
            offlineBanner.style.display = 'flex';
        } else {
            offlineBanner.style.display = 'none';
        }
    }

    // جلب بيانات السور من الـ API
    async function fetchSurahs() {
        showSurahSkeletons(); // أظهر الهياكل فوراً قبل البدء
        const url = 'https://api.alquran.cloud/v1/surah';

        // جرب نجيب من الكاش الأول عشان السرعة
        try {
            const cache = await caches.open('quran-app-v11');
            const cachedResponse = await cache.match(url);
            if (cachedResponse) {
                const data = await cachedResponse.json();
                surahs = data.data;
                renderSurahs(surahs);
                // كمل برضه وهات النسخة الجديدة من النت في الخلفية لو عاوز بس كفاية كدة دلوقتى
            }
        } catch (e) { console.log('Cache read error:', e); }

        try {
            const response = await fetch(url);
            const data = await response.json();
            surahs = data.data;
            renderSurahs(surahs);
        } catch (error) {
            console.error('Error fetching surahs:', error);
            if (surahs.length === 0) {
                surahListEl.innerHTML = '<p class="error">لا يوجد اتصال بالإنترنت. يرجى التأكد من الاتصال لتحميل السور لأول مرة.</p>';
            }
        }
    }

    async function fetchSurahText(number) {
        let edition = window.currentQuranLang === 'en' ? '/en.asad' : '';
        const url = `https://api.alquran.cloud/v1/surah/${number}${edition}`;

        // جرب الكاش الأول
        try {
            const cache = await caches.open('quran-app-v11');
            const cachedResponse = await cache.match(url);
            if (cachedResponse) {
                const data = await cachedResponse.json();
                return data.data.ayahs;
            }
        } catch (e) { console.log('Cache read error:', e); }

        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.data.ayahs;
        } catch (error) {
            console.error('Error fetching surah text:', error);
            return null;
        }
    }

    // رسم الواجهة وعرض البيانات
    function renderReciters() {
        recitersGridEl.innerHTML = recitersData.map(r => `
            <li class="reciter-card ${r.id === reciter.id ? 'active' : ''}" data-id="${r.id}" role="listitem">
                <img src="${r.img}" alt="${t(r.name)}" loading="lazy">
                <p>${t(r.name)}</p>
            </li>
        `).join('');
    }

    function renderSurahs(surahList) {
        if (surahList.length === 0) {
            surahListEl.innerHTML = `<p class="no-results">${t('لا توجد نتائج مطابقة')}</p>`;
            return;
        }

        const isEng = window.currentUiLang === 'en';
        const ayahLabel = isEng ? 'Ayahs' : 'آية';

        surahListEl.innerHTML = surahList.map((surah, index) => {
            const idx = surah.number - 1; // الوصول المباشر للأندكس بدل indexOf المجهد
            const isPlayingThis = idx === curIdx;
            const sName = isEng ? surah.englishName : surah.name;
            const revType = isEng ? (surah.revelationType === 'Meccan' ? 'Meccan' : 'Medinan') : (surah.revelationType === 'Meccan' ? 'مكية' : 'مدنية');

            return `
                <li class="surah-card" role="listitem" data-index="${idx}" style="animation-delay: ${index * 0.01}s">
                    <div class="number">${surah.number}</div>
                    <div class="surah-info">
                        <h3>${sName}</h3>
                        <p>${revType} - ${surah.numberOfAyahs} ${ayahLabel}</p>
                    </div>
                    <i class="fas ${isPlayingThis && isPlaying ? 'fa-pause-circle' : 'fa-play-circle'} play-icon-pulse"></i>
                </li>
            `;
        }).join('');
    }

    // لوجيك الصوت والتحكم في المشغل
    function playSurah(surah, index = -1) {
        if (index !== -1) curIdx = index;
        // console.log('Playing:', surah.name, 'with', reciter.name);

        // Format number to 00X for audio availability
        const formattedNumber = String(surah.number).padStart(3, '0');
        const audioUrl = `${reciter.server}${formattedNumber}.mp3`;

        playerAudio.src = audioUrl;
        const sName = window.currentUiLang === 'en' ? surah.englishName : surah.name;
        playerSurah.textContent = sName;
        playerReciter.textContent = window.currentUiLang === 'en' ? t(reciter.name) : reciter.name;
        playerImg.src = reciter.img;
        if (miniPlayerImg) miniPlayerImg.src = reciter.img;


        // Check if favorite
        const isFav = favorites.includes(surah.number);
        favBtn.classList.toggle('active', isFav);
        favBtn.querySelector('i').className = isFav ? 'fas fa-heart' : 'far fa-heart';

        playerAudio.play();
        // بار المشغل بيظبط نفسه لما الصوت يشتغل أو يقف
        // setupMediaSession(surah);
        setupMediaSession(surah);

        checkDownloadStatus(audioUrl);
        savePlaybackState();

        // أظهر المشغل فور اختيار السورة
        if (playerBar) playerBar.style.display = 'flex';

        // ابدأ الـ Visualizer (مبيتفعش إلا بتفاعل اليوزر)
        initAudioVisualizer();
    }

    async function setupMediaSession(surah) {
        // تحديث الميديا سيشن عشان أزرار التحكم في الويندوز والموبايل بره المتصفح
        try {
            // صورة شيك عشان تظهر في شاشة القفل ببراند التطبيق
            const brandedArtworkUrl = await generateBrandedArtwork(reciter.img, reciter.name);
            const appIconUrl = new URL('images/icon-512x512.jpg', window.location.href).href;

            navigator.mediaSession.metadata = new MediaMetadata({
                title: surah.name,
                artist: reciter.name,
                album: 'تطبيق قرآني',
                artwork: [
                    { src: brandedArtworkUrl, sizes: '512x512', type: 'image/png' },
                    { src: appIconUrl, sizes: '512x512', type: 'image/png' }
                ]
            });

            // Action Handlers
            navigator.mediaSession.setActionHandler('play', () => { playerAudio.play(); });
            navigator.mediaSession.setActionHandler('pause', () => { playerAudio.pause(); });
            navigator.mediaSession.setActionHandler('previoustrack', () => { playPrev(); });
            navigator.mediaSession.setActionHandler('nexttrack', () => { playNext(); });
        } catch (error) {
            console.error('Media Session update failed:', error);
        }
    }

    function generateBrandedArtwork(imgSrc, reciterName) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 512;
            const ctx = canvas.getContext('2d');

            // خلفية مدرجة شيك
            const gradient = ctx.createLinearGradient(0, 0, 0, 512);
            gradient.addColorStop(0, '#1abc9c');
            gradient.addColorStop(1, '#16a085');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 512, 512);

            // تأثير توهج خفيف
            ctx.globalAlpha = 0.1;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(256, 256, 350, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;

            // صورة الشخص اللي بيقرأ معانا
            const img = new Image();
            // هات الصورة برابط كامل عشان الـ Canvas ما تزعلش
            img.src = new URL(imgSrc, window.location.href).href;
            img.crossOrigin = "anonymous";

            img.onload = () => {
                // ارسم دائرة بيضاء حوالين الصورة
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 10;
                ctx.beginPath();
                ctx.arc(256, 180, 110, 0, Math.PI * 2);
                ctx.stroke();

                // قص الصورة وحطها جوه الدائرة
                ctx.save();
                ctx.beginPath();
                ctx.arc(256, 180, 105, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, 256 - 105, 180 - 105, 210, 210);
                ctx.restore();

                // نكتب اسم التطبيق "قرآني" بخط عريض
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.font = '900 60px Tajawal, sans-serif';
                ctx.shadowColor = 'rgba(0,0,0,0.2)';
                ctx.shadowBlur = 15;
                ctx.fillText('قرآني', 256, 380);

                // ونكتب اسم القارئ تحتيه بقارئ أصغر شوية
                ctx.font = '500 35px Tajawal, sans-serif';
                ctx.shadowBlur = 0;
                ctx.fillText(reciterName, 256, 440);

                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => {
                // لو الصورة مجاتش، خلاص نستخدم الموجودة وخلاص
                resolve(new URL(imgSrc, window.location.href).href);
            };
        });
    }

    function updateMediaPlaybackState(state) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.playbackState = state;
        }
    }

    function togglePlay() {
        if (curIdx === -1) {
            playSurah(surahs[0], 0);
            return;
        }
        
        // تفعيل المرئيات عند الاستئناف
        initAudioVisualizer();

        if (isPlaying) {
            playerAudio.pause();
        } else {
            playerAudio.play();
        }
    }

    function updatePlayBtn() {
        playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
    }

    async function playNext() {
        if (curIdx >= surahs.length - 1) return;

        if (!navigator.onLine) {
            // لو مفيش نت، دور على السورة اللي بعدها وتكون متحملة فعلاً
            const cache = await caches.open('quran-audio-v1');
            for (let i = curIdx + 1; i < surahs.length; i++) {
                const s = surahs[i];
                const formattedNumber = String(s.number).padStart(3, '0');
                const url = `${reciter.server}${formattedNumber}.mp3`;
                const match = await cache.match(url);
                if (match) {
                    playSurah(s, i);
                    return;
                }
            }
            // لو وصلنا هنا يبقى مفيش سور تانية متحملة تحت دي
            // alert('لا توجد سور محملة تالية للتشغيل أوفلاين.');
        } else {
            // لو فيه نت بنشتغل طبيعي خالص
            playSurah(surahs[curIdx + 1], curIdx + 1);
        }
    }

    async function playPrev() {
        if (curIdx <= 0) return;

        if (!navigator.onLine) {
            // لو مفيش نت، هندور على السورة اللي قبلها وتكون متحملة فعلاً
            const cache = await caches.open('quran-audio-v1');
            for (let i = curIdx - 1; i >= 0; i--) {
                const s = surahs[i];
                const formattedNumber = String(s.number).padStart(3, '0');
                const url = `${reciter.server}${formattedNumber}.mp3`;
                const match = await cache.match(url);
                if (match) {
                    playSurah(s, i);
                    return;
                }
            }
            // لو وصلنا هنا يبقى مفيش سور تانية متحملة فوق دي
        } else {
            // لو فيه نت بنشتغل طبيعي
            playSurah(surahs[curIdx - 1], curIdx - 1);
        }
    }


    // لوجيك البحث والحوارات دي
    function normalizeArabic(text) {
        if (!text) return "";
        return text
            .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, "") // Remove all diacritics and Quranic marks
            .replace(/[أإآٱ]/g, "ا")         // Normalize Alef and Alef Wasla
            .replace(/ة/g, "ه")             // Normalize Teh Marbuta
            .replace(/ى/g, "ي");            // Normalize Alef Maksura
    }

    function handleSearch(query) {
        if (!query.trim()) {
            renderSurahs(surahs);
            return;
        }

        if (searchType === 'surah') {
            const normalizedQuery = normalizeArabic(query.trim().toLowerCase());
            const filtered = surahs.filter(s =>
                normalizeArabic(s.name).includes(normalizedQuery) ||
                s.englishName.toLowerCase().includes(normalizedQuery)
            );
            renderSurahs(filtered);
        } else {
            // تأخير شوية في البحث عشان ما يتعبش السيرفر والرامات
            searchDebounceTimer = setTimeout(() => {
                handleAyahSearch(query);
            }, 600);
        }
    }

    async function handleAyahSearch(query) {
        if (query.length < 3) return;
        showAyahSkeletons();
        try {
            // بحث بسيط للنص من غير تشكيل عشان يبقى أسهل
            const response = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/quran-simple`);
            const data = await response.json();

            if (data.status === 'OK' && data.data.count > 0) {
                renderAyahSearchResults(data.data.matches);
            } else {
                surahListEl.innerHTML = `<p class="no-results">${t('لم يتم العثور على نتائج في الآيات')}</p>`;
            }
        } catch (error) {
            console.error('Error searching ayahs:', error);
            surahListEl.innerHTML = `<p class="error">${t('حدث خطأ أثناء البحث.')}</p>`;
        }
    }

    async function renderAyahSearchResults(matches) {
        surahListEl.innerHTML = '';
        matches.forEach((match, index) => {
            const card = document.createElement('div');
            card.className = 'surah-card ayah-result';
            card.dataset.surahNum = match.surah.number;
            card.dataset.ayahNum = match.numberInSurah;
            card.style.animationDelay = `${index * 0.05}s`;

            const sName = window.currentUiLang === 'en' ? match.surah.englishName : match.surah.name;
            const ayahWord = window.currentUiLang === 'en' ? 'Ayah' : 'آية';
            card.innerHTML = `
                <div class="number">${match.surah.number}</div>
                <div class="surah-info">
                    <h3>${sName} (${ayahWord} ${match.numberInSurah})</h3>
                    <p class="ayah-snippet">${match.text}</p>
                </div>
                <i class="fas fa-play-circle play-icon-pulse"></i>
            `;

            card.addEventListener('click', async () => {
                const surahNum = parseInt(card.dataset.surahNum);
                const ayahNum = parseInt(card.dataset.ayahNum);
                const surah = surahs.find(s => s.number === surahNum);

                if (surah) {
                    playSurah(surah, surahs.indexOf(surah));

                    // افتح العارض وانزل للآية المطلوبة
                    viewerTitle.textContent = window.currentUiLang === 'en' ? surah.englishName : surah.name;
                    showAyahSkeletons();
                    ayahViewer.classList.add('active');

                    const ayahs = await fetchSurahText(surah.number);
                    if (ayahs) {
                        ayahContent.innerHTML = ayahs.map(a => `
                            <div class="ayah-row">
                                <span class="ayah-txt" id="ayah-${a.numberInSurah}" data-surah="${surah.number}" data-ayah="${a.numberInSurah}">${a.text} <span class="ayah-num">(${a.numberInSurah})</span></span>
                                <div class="ayah-actions">
                                    <div class="ayah-action-btn share-ayah-btn" title="مشاركة كصورة" data-surah="${surah.name.replace('سورة ', '')}" data-ayah="${a.numberInSurah}" data-text="${a.text}">
                                        <i class="fas fa-camera"></i>
                                    </div>
                                </div>
                            </div>
                        `).join(' ');

                        // روح للآية اللي بندور عليها بالظبط
                        const targetAyah = document.getElementById(`ayah-${ayahNum}`);
                        if (targetAyah) {
                            targetAyah.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetAyah.style.background = 'rgba(26, 188, 156, 0.2)';
                            setTimeout(() => targetAyah.style.background = 'transparent', 3000);
                        }

                        setTimeout(() => setupReadingObserver(surah.number), 500);
                    }
                }
            });

            surahListEl.appendChild(card);
        });
    }

    // تظبيط تتبع السكرول في القراءة عشان نعرف اليوزر واقف فين
    function setupReadingObserver(surahNumber) {
        if (readingObserver) {
            readingObserver.disconnect();
        }

        readingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ayahNum = entry.target.dataset.ayah;
                    localStorage.setItem(`quran_read_pos_${surahNumber}`, ayahNum);
                }
            });
        }, {
            root: ayahViewer, // بيراقب جوه العارض نفسه
            rootMargin: '-20% 0px -20% 0px', // يركز في نص الشاشة بالظبط
            threshold: 0
        });

        // استنى شوية لحد ما الصفحة تظبط Layout بتاعها وبعدين نبدأ نراقب
        setTimeout(() => {
            document.querySelectorAll('.ayah-txt').forEach(el => {
                readingObserver.observe(el);
            });
        }, 100);
    }

    // شوية أدوات وإعدادات عامة في التطبيق
    function applyTheme() {
        const isDark = localStorage.getItem('theme') === 'dark';
        themeSwitch.checked = isDark;
        document.body.className = isDark ? 'dark-mode' : 'light-mode';
        updateMetaThemeColor(isDark);
    }

    function updateMetaThemeColor(isDark) {
        // تحديث لون الـ Status Bar في الموبايلات عشان يبقى لايق ع الثيم
        const themeColor = isDark ? '#0f172a' : '#ffffff';
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', themeColor);
        }
    }

    function updateFavoritesUI() {
        // لو فاتح المفضلة وحدثت حاجة، خليها تتغير قدامك علطول
        const activeTab = document.querySelector('.nav-item.active').dataset.target;
        if (activeTab === 'favorites') {
            const favSurahs = surahs.filter(s => favorites.includes(s.number));
            renderSurahs(favSurahs);
        }
    }

    function updateSalawatContent() {
        const icon = document.getElementById('salawat-icon');
        const iconContainer = document.getElementById('salawat-icon-container');
        const title = document.getElementById('salawat-title');
        const text = document.getElementById('salawat-text');
        const btn = document.getElementById('close-salawat');

        // شكل التنبيه الافتراضي بتاع الصلاة على النبي
        icon.className = 'fas fa-heart';
        if (iconContainer) iconContainer.style.color = ''; // ريست لون القلب للأصلي
        title.style.color = 'var(--primary-color)';
        title.textContent = t('🤍صلى على اشرف الخلق🤍');
        text.textContent = t('صلى عليه وخد حسنات وادعيلي');
        btn.textContent = t('عليه الصلاة والسلام');
    }

    function showSalawatModal() {
        updateSalawatContent();

        // يظهره في الحال من غير تأخير
        salawatModal.style.display = 'flex';
        setTimeout(() => {
            salawatModal.classList.add('show');
        }, 10);
    }


    function renderAthkar(category) {
        const container = document.getElementById('athkar-container');
        const data = athkarData[category];
        if (!data) return;

        container.innerHTML = data.items.map((item, index) => `
                <div class="thikr-card" style="animation-delay: ${index * 0.1}s">
                    <p class="thikr-text">${item.text}</p>
                    <div class="thikr-footer">
                        <span class="thikr-ref">${item.ref}</span>
                        <span class="thikr-counter">${item.count}</span>
                    </div>
                </div>
            `).join('');
    }

    // تنبيه الصلاة على النبي كل 5 دقايق عشان ناخد ثواب
    setInterval(() => {
        if (salawatModal.style.display !== 'flex') {
            showSalawatModal();
        }
    }, 5 * 60 * 1000);

    // شغلانة الـ Events بتاع الواجهة والزراير
    function setupEventListeners() {
        playBtn.addEventListener('click', togglePlay);
        nextBtn.addEventListener('click', playNext);
        prevBtn.addEventListener('click', playPrev);

        // تحديث شريط التقدم بتاع الصوت والوقت اللي فات واللي فاضل
        playerAudio.addEventListener('timeupdate', (e) => {
            const { currentTime, duration } = e.target;
            const progressPercent = (currentTime / duration) * 100;
            progressFilled.style.width = `${progressPercent}%`;

            currentTimeEl.textContent = formatTime(currentTime);
            if (duration) durationEl.textContent = formatTime(duration);

            // حفظ مكانه كل 5 ثواني عشان لو قفل ورجع يكمل من مطرح ما وقف
            if (Math.floor(currentTime) % 5 === 0) {
                savePlaybackState();
            }
        });

        // تظبيط شكل الواجهة مع حالة الصوت (شغال ولا واقف)
        playerAudio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayBtn();
            playerImg.classList.add('playing');
            updateMediaPlaybackState('playing');
            renderSurahs(surahs);
        });

        playerAudio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayBtn();
            playerImg.classList.remove('playing');
            updateMediaPlaybackState('paused');
            renderSurahs(surahs);
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const width = rect.width;
            const duration = playerAudio.duration;
            if (duration) {
                const direction = window.getComputedStyle(progressBar).direction;
                let clickX;
                if (direction === 'rtl') {
                    clickX = rect.right - e.clientX;
                } else {
                    clickX = e.clientX - rect.left;
                }
                clickX = Math.max(0, Math.min(clickX, width));
                playerAudio.currentTime = (clickX / width) * duration;
            }
        });

        searchInput.addEventListener('input', (e) => {
            handleSearch(e.target.value);
        });

        searchTypeToggle.addEventListener('click', () => {
            searchType = searchType === 'surah' ? 'ayah' : 'surah';
            searchTypeLabel.textContent = searchType === 'surah' ? t('سورة') : t('آية');
            searchTypeToggle.classList.toggle('ayah', searchType === 'ayah');
            searchInput.placeholder = searchType === 'surah' ? t('ابحث عن سورة...') : t('ابحث عن كلمة في القرآن...');
            if (searchInput.value) handleSearch(searchInput.value);
            else if (searchType === 'surah') renderSurahs(surahs);
        });

        themeSwitch.addEventListener('change', () => {
            const isDark = themeSwitch.checked;
            document.body.className = isDark ? 'dark-mode' : 'light-mode';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateMetaThemeColor(isDark);
        });

        // لوجيك التنقل بين التبويبات اللي تحت في المنيو
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const target = item.dataset.target;

                const contentArea = document.getElementById('content-area');
                const aiSection = document.getElementById('ai-section');

                contentArea.style.display = 'none';
                aiSection.style.display = 'none';
                if (othersSection) othersSection.style.display = 'none';
                if (athkarView) athkarView.style.display = 'none';
                if (aboutView) aboutView.style.display = 'none';
                if (duaView) duaView.style.display = 'none';
                if (rosaryView) rosaryView.style.display = 'none';
                if (prayerView) prayerView.style.display = 'none';
                if (videosView) videosView.style.display = 'none';
                if (playlistModal) playlistModal.style.display = 'none';
                if (singleVideoPlayerView) singleVideoPlayerView.style.display = 'none';

                if (playlistPlayerView) {
                    playlistPlayerView.style.display = 'none';
                    if (playlistsGridContainer) playlistsGridContainer.style.display = 'grid';
                }

                if (target === 'home' && curIdx !== -1) {
                    playerBar.style.display = 'flex';
                } else {
                    playerBar.style.display = 'none';
                }

                if (target === 'ai') {
                    aiSection.style.display = 'flex';
                } else if (target === 'others') {
                    if (othersSection) othersSection.style.display = 'block';
                } else {
                    contentArea.style.display = 'block';
                    if (target === 'home') {
                        renderSurahs(surahs);
                        document.getElementById('current-category').textContent = t('السور');
                    } else if (target === 'favorites') {
                        const favSurahs = surahs.filter(s => favorites.includes(s.number));
                        renderSurahs(favSurahs);
                        document.getElementById('current-category').textContent = t('المفضلة');
                    }
                }
            });
        });

        // التنقل بين الأقسام الفرعية في صفحة "أخرى"
        document.getElementById('athkar-btn')?.addEventListener('click', () => {
            othersSection.style.display = 'none';
            athkarView.style.display = 'block';
            renderAthkar('morning');
        });

        document.getElementById('about-dev-btn')?.addEventListener('click', () => {
            othersSection.style.display = 'none';
            aboutView.style.display = 'block';
        });

        document.getElementById('dua-day-btn')?.addEventListener('click', () => {
            othersSection.style.display = 'none';
            duaView.style.display = 'block';
            duaTextEl.textContent = t(getDuaOfTheDay());
        });

        // لوجيك أزرار الرجوع من الصفحات الفرعية للرئيسية "أخرى"
        document.getElementById('athkar-back')?.addEventListener('click', () => {
            athkarView.style.display = 'none';
            othersSection.style.display = 'block';
        });

        document.getElementById('about-back')?.addEventListener('click', () => {
            aboutView.style.display = 'none';
            othersSection.style.display = 'block';
        });

        document.getElementById('dua-back')?.addEventListener('click', () => {
            duaView.style.display = 'none';
            othersSection.style.display = 'block';
        });

        if (prayerBack) {
            prayerBack.addEventListener('click', () => {
                if (prayerView) prayerView.style.display = 'none';
                if (othersSection) othersSection.style.display = 'block';
            });
        }

        if (rosaryBack) {
            rosaryBack.addEventListener('click', () => {
                if (rosaryView) rosaryView.style.display = 'none';
                if (othersSection) othersSection.style.display = 'block';
            });
        }

        // لوجيك السبحة الإلكترونية الجميل بتاعنا
        if (rosaryBtn) {
            rosaryBtn.addEventListener('click', () => {
                if (othersSection) othersSection.style.display = 'none';
                if (rosaryView) rosaryView.style.display = 'block';
            });
        }

        if (videosBtn) {
            videosBtn.addEventListener('click', () => {
                if (othersSection) othersSection.style.display = 'none';
                if (videosView) videosView.style.display = 'block';
                // تأكد إن الفيديوهات مرسومة أول ما تفتح القسم
                renderRandomVideos();
            });
        }

        if (videosBack) {
            videosBack.addEventListener('click', () => {
                if (videosView) videosView.style.display = 'none';
                if (othersSection) othersSection.style.display = 'block';
            });
        }


        // لوجيك التبديل بين الفيديوهات وقوائم التشغيل
        const videoTabBtns = document.querySelectorAll('.video-tab-btn');
        videoTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                videoTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const tabId = btn.dataset.tab;
                document.querySelectorAll('.video-content-area').forEach(area => {
                    area.classList.remove('active');
                });
                const targetArea = document.getElementById(tabId);
                if (targetArea) targetArea.classList.add('active');

                // ريست لمكاننا في قوائم التشغيل لو رجعنا
                if (tabId === 'playlists-list') {
                    if (playlistPlayerView) playlistPlayerView.style.display = 'none';
                    if (playlistsGridContainer) playlistsGridContainer.style.display = 'grid';
                }

                if (tabId === 'videos-list') {
                    if (singleVideoPlayerView) singleVideoPlayerView.style.display = 'none';
                    if (individualVideosGrid) individualVideosGrid.style.display = 'grid';
                    renderRandomVideos();
                }
            });
        });

        // لوجيك الفيديوهات الفردية
        function renderRandomVideos() {
            if (!individualVideosGrid) return;

            // ترتيب عشوائي
            const shuffled = [...individualVideos].sort(() => 0.5 - Math.random());

            individualVideosGrid.innerHTML = shuffled.map(video => `
                <div class="video-main-card" data-id="${video.id}" data-title="${video.title}">
                    <div class="video-card-image">
                        <img src="https://img.youtube.com/vi/${video.id}/mqdefault.jpg" alt="${video.title}">
                        <div class="video-overlay">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                    <div class="video-card-info">
                        <h3>${video.title}</h3>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.video-main-card').forEach(card => {
                card.addEventListener('click', () => {
                    const id = card.dataset.id;
                    const title = card.dataset.title;
                    openSingleVideo(title, id);
                });
            });
        }

        function openSingleVideo(title, id) {
            if (!singleVideoPlayerView || !singleYoutubePlayer) return;
            currentVideoTitle.textContent = title;
            singleYoutubePlayer.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
            individualVideosGrid.style.display = 'none';
            singleVideoPlayerView.style.display = 'block';
        }

        if (singleVideoBack) {
            singleVideoBack.addEventListener('click', () => {
                singleVideoPlayerView.style.display = 'none';
                individualVideosGrid.style.display = 'grid';
                singleYoutubePlayer.src = '';
            });
        }

        document.querySelectorAll('.playlist-main-card').forEach(card => {
            card.addEventListener('click', () => {
                const playlistId = card.dataset.playlist;
                if (playlistId === 'innahu-rabbi') {
                    currentActivePlaylist = innahuRabbiPlaylist;
                    currentPlaylistIdStr = 'PL_ZXIiZMp3MIllp2SfW-d6FzsRboFpLQn';
                    openPlaylist('إنه ربي', '-zMW2Rqjwcc');
                } else if (playlistId === 'majalis-quran') {
                    currentActivePlaylist = majalisQuranPlaylist;
                    currentPlaylistIdStr = 'PLHw4N1oY3SvBTDMJdSHd7j0Druku94zfm';
                    openPlaylist('مجالس القرآن', '1lpcJ-YE0EU');
                } else if (playlistId === 'tadawuq-ibadat') {
                    currentActivePlaylist = tadawuqIbadatPlaylist;
                    currentPlaylistIdStr = 'PL654l2H0X3xXGFHcpJyLHbS63gUC097u8';
                    openPlaylist('تذوق العبادات', '63_AOCldyXo');
                } else if (playlistId === 'waey-akhlaq') {
                    currentActivePlaylist = waeyAkhlaqPlaylist;
                    currentPlaylistIdStr = 'PLrCPzRcAO1CMnfiwDt5LO0aNfEW0M6sC6';
                    openPlaylist('وعي - الأخلاق', 'zzWhkMWlIo0');
                }
            });
        });

        if (playlistPlayerBack) {
            playlistPlayerBack.addEventListener('click', () => {
                playlistPlayerView.style.display = 'none';
                playlistsGridContainer.style.display = 'grid';
                youtubePlayer.src = '';
                currentActivePlaylist = [];
                currentPlaylistIdStr = "";
            });
        }

        function openPlaylist(title, firstVideoId) {
            currentPlaylistTitle.textContent = title;
            youtubePlayer.src = `https://www.youtube.com/embed/${firstVideoId}?list=${currentPlaylistIdStr}`;
            playlistsGridContainer.style.display = 'none';
            playlistPlayerView.style.display = 'block';
        }

        // لوجيك قائمة التشغيل واختيار الحلقات
        if (showPlaylistItemsBtn) {
            showPlaylistItemsBtn.addEventListener('click', () => {
                renderPlaylistItems();
                playlistModal.style.display = 'flex';
                setTimeout(() => playlistModal.classList.add('show'), 10);
            });
        }

        if (closePlaylistModal) {
            closePlaylistModal.addEventListener('click', () => {
                playlistModal.classList.remove('show');
                setTimeout(() => playlistModal.style.display = 'none', 300);
            });
        }

        function renderPlaylistItems() {
            if (!playlistItemsContainer || currentActivePlaylist.length === 0) return;

            const currentId = youtubePlayer.src.split('/embed/')[1].split('?')[0];

            playlistItemsContainer.innerHTML = currentActivePlaylist.map((item, index) => `
                <div class="playlist-item-card ${item.id === currentId ? 'active' : ''}" data-id="${item.id}">
                    <div class="ep-num">${index + 1}</div>
                    <div class="playlist-item-name">الحلقة ${index + 1}</div>
                </div>
            `).join('');

            document.querySelectorAll('.playlist-item-card').forEach(card => {
                card.addEventListener('click', () => {
                    const videoId = card.dataset.id;
                    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?list=${currentPlaylistIdStr}&autoplay=1`;

                    playlistModal.classList.remove('show');
                    setTimeout(() => playlistModal.style.display = 'none', 300);
                });
            });
        }

        // الحفاظ على عداد السبحة عشان ما يضيعش لو قفلت التطبيق
        const rosaryCountKey = 'quran_rosary_count';
        let rosaryCount = parseInt(localStorage.getItem(rosaryCountKey)) || 0;
        if (rosaryCountEl) rosaryCountEl.textContent = rosaryCount;

        if (rosaryIncrementBtn) {
            rosaryIncrementBtn.addEventListener('click', () => {
                rosaryCount++;
                rosaryCountEl.textContent = rosaryCount;
                localStorage.setItem(rosaryCountKey, rosaryCount);
                rosaryIncrementBtn.classList.add('clicked');
                setTimeout(() => rosaryIncrementBtn.classList.remove('clicked'), 100);
                if (navigator.vibrate) navigator.vibrate(10);
            });
        }

        if (rosaryResetBtn) {
            rosaryResetBtn.addEventListener('click', () => {
                if (confirm(t('هل تريد تصفير العداد؟'))) {
                    rosaryCount = 0;
                    rosaryCountEl.textContent = rosaryCount;
                    localStorage.setItem(rosaryCountKey, rosaryCount);
                }
            });
        }

        // زرار فتح شاشة مواقيت الصلاة والمكان وكده
        if (prayerTimesBtn) {
            prayerTimesBtn.addEventListener('click', () => {
                if (othersSection) othersSection.style.display = 'none';
                if (prayerView) {
                    prayerView.style.display = 'block';
                    fetchPrayerTimes();
                }
            });
        }

        // تغيير فئة الأذكار (صباح/مساء وكده) لما تدوس على الزراير
        document.querySelectorAll('.athkar-categories button').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.athkar-categories button').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderAthkar(btn.dataset.cat);
            });
        });

        // إضافة أو حذف السورة من المفضلة بقلب أحمر شيك
        favBtn.addEventListener('click', () => {
            if (curIdx === -1) return;
            const surahNumber = surahs[curIdx].number;
            if (favorites.includes(surahNumber)) {
                favorites = favorites.filter(id => id !== surahNumber);
            } else {
                favorites.push(surahNumber);
            }
            localStorage.setItem('quran_favorites', JSON.stringify(favorites));
            const isFav = favorites.includes(surahNumber);
            favBtn.classList.toggle('active', isFav);
            favBtn.querySelector('i').className = isFav ? 'fas fa-heart' : 'far fa-heart';
            updateFavoritesUI();
        });

        // نقطة الدخول لعرض نصوص الآيات في السورة
        showTextBtn.addEventListener('click', async () => {
            if (curIdx === -1) return;
            const surah = surahs[curIdx];
            viewerTitle.textContent = window.currentUiLang === 'en' ? surah.englishName : surah.name;
            showAyahSkeletons();
            ayahViewer.classList.add('active');
            const ayahs = await fetchSurahText(surah.number);
            if (ayahs) {
                ayahContent.innerHTML = ayahs.map(a => `
                    <div class="ayah-row">
                        <span class="ayah-txt" id="ayah-${a.numberInSurah}" data-surah="${surah.number}" data-ayah="${a.numberInSurah}">${a.text} <span class="ayah-num">(${a.numberInSurah})</span></span>
                        <div class="ayah-actions">
                            <div class="ayah-action-btn share-ayah-btn" title="مشاركة كصورة" data-surah="${surah.name.replace('سورة ', '')}" data-ayah="${a.numberInSurah}" data-text="${a.text}">
                                <i class="fas fa-camera"></i>
                            </div>
                        </div>
                    </div>
                `).join(' ');

                const savedPos = localStorage.getItem(`quran_read_pos_${surah.number}`);
                if (savedPos) {
                    setTimeout(() => {
                        const targetAyah = document.getElementById(`ayah-${savedPos}`);
                        if (targetAyah) {
                            targetAyah.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            targetAyah.style.background = 'rgba(26, 188, 156, 0.2)';
                            setTimeout(() => targetAyah.style.background = 'transparent', 3000);
                        }
                        setupReadingObserver(surah.number);
                    }, 50);
                } else {
                    setupReadingObserver(surah.number);
                }
            }
        });

        closeViewer.addEventListener('click', () => {
            ayahViewer.classList.remove('active');
        });

        ayahContent.addEventListener('click', (e) => {
            const ayahTxt = e.target.closest('.ayah-txt');
            if (ayahTxt) showTafsir(ayahTxt.dataset.surah, ayahTxt.dataset.ayah);
        });

        closeTafsir.addEventListener('click', () => {
            tafsirModal.style.display = 'none';
            activeTafsirSurah = null;
            activeTafsirAyah = null;
        });

        window.addEventListener('click', (e) => {
            if (e.target === tafsirModal) {
                tafsirModal.style.display = 'none';
                activeTafsirSurah = null;
                activeTafsirAyah = null;
            }
            if (e.target === shareModal) {
                shareModal.style.display = 'none';
            }
        });

        // لوجيك كروت المشاركة
        ayahContent.addEventListener('click', (e) => {
            const shareBtn = e.target.closest('.share-ayah-btn');
            if (shareBtn) {
                e.stopPropagation(); // عشان ما يفتحش التفسير بالصدفة
                const data = {
                    surah: shareBtn.dataset.surah,
                    ayah: shareBtn.dataset.ayah,
                    text: shareBtn.dataset.text
                };
                generateAyahCard(data);
            }
        });

        closeShare.addEventListener('click', () => {
            shareModal.style.display = 'none';
        });

        downloadCardBtn.addEventListener('click', () => {
            const dataUrl = shareCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `qurany-ayah-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
        });

        nativeShareBtn.addEventListener('click', async () => {
            const dataUrl = shareCanvas.toDataURL('image/png');
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            const file = new File([blob], 'ayah.png', { type: 'image/png' });

            if (navigator.share) {
                try {
                    await navigator.share({
                        files: [file],
                        title: t('آية من القرآن الكريم'),
                        text: t('تطبيق قرآني - تجربة إيمانية متكاملة')
                    });
                } catch (err) {
                    console.error('Share failed:', err);
                }
            } else {
                alert(t('المشاركة غير مدعومة في متصفحك، يمكنك حفظ الصورة بدلاً من ذلك.'));
            }
        });

        langBtn.addEventListener('click', () => {
            languageModal.style.display = 'flex';
            
            // Set active states
            document.querySelectorAll('.lang-option-btn').forEach(b => b.classList.remove('active'));
            
            if (window.currentUiLang === 'en' && window.currentQuranLang === 'ar') 
                document.getElementById('btn-lang-en-ui').classList.add('active');
            else if (window.currentUiLang === 'ar' && window.currentQuranLang === 'en')
                document.getElementById('btn-lang-en-quran').classList.add('active');
            else if (window.currentUiLang === 'en' && window.currentQuranLang === 'en')
                document.getElementById('btn-lang-en-full').classList.add('active');
            else
                document.getElementById('btn-lang-ar').classList.add('active');
        });

        closeLanguage.addEventListener('click', () => {
            languageModal.style.display = 'none';
        });

        document.getElementById('btn-lang-en-ui').addEventListener('click', () => {
             localStorage.setItem('quran_ui_lang', 'en');
             localStorage.setItem('quran_quran_lang', 'ar');
             window.location.reload();
        });
        document.getElementById('btn-lang-en-quran').addEventListener('click', () => {
             localStorage.setItem('quran_ui_lang', 'ar');
             localStorage.setItem('quran_quran_lang', 'en');
             window.location.reload();
        });
        document.getElementById('btn-lang-en-full').addEventListener('click', () => {
             localStorage.setItem('quran_ui_lang', 'en');
             localStorage.setItem('quran_quran_lang', 'en');
             window.location.reload();
        });
        document.getElementById('btn-lang-ar').addEventListener('click', () => {
             localStorage.setItem('quran_ui_lang', 'ar');
             localStorage.setItem('quran_quran_lang', 'ar');
             window.location.reload();
        });


        // التعامل مع رسالة الصلاة على النبي اللي بتظهر كل شوية
        closeSalawat.addEventListener('click', () => {
            salawatModal.classList.remove('show');
            setTimeout(() => { salawatModal.style.display = 'none'; }, 400);
        });

        if (tafsirEngineSelect) {
            tafsirEngineSelect.addEventListener('change', (e) => {
                currentTafsirEdition = e.target.value;
                localStorage.setItem('quran_tafsir_edition', currentTafsirEdition);
                if (activeTafsirSurah && activeTafsirAyah) {
                    showTafsir(activeTafsirSurah, activeTafsirAyah);
                }
            });
        }

        playerAudio.addEventListener('ended', playNext);

        // لوجيك تصغير المشغل عند السكرول وتحويله لزرار دائري
        if (contentArea && playerBar) {
            contentArea.addEventListener('scroll', () => {
                if (contentArea.scrollTop > 400 && playerBar.style.display === 'flex') {
                    if (!playerManuallyMaximized) {
                        playerBar.classList.add('minimized');
                    }
                } else if (contentArea.scrollTop <= 400) {
                    playerBar.classList.remove('minimized');
                    playerManuallyMaximized = false; // ريست للحالة لما نرجع لفوق
                }

            });
        }

        // لو ضغطنا على المشغل وهو صغير يرجع تاني كبير
        if (playerBar) {
            playerBar.addEventListener('click', () => {
                if (playerBar.classList.contains('minimized')) {
                    playerBar.classList.remove('minimized');
                    playerManuallyMaximized = true; // علامة إن اليوزر كبره بنفسه وهو تحت
                }
            });
        }

    }


    async function fetchPrayerTimes(silent = false) {
        if (!navigator.geolocation) {
            if (!silent) renderPrayerError(t('عذراً، المتصفح لا يدعم تحديد الموقع.'));
            return;
        }

        if (!silent) {
            showPrayerSkeletons();
            prayerLocation.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${t('جاري التحديد...')}`;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const date = new Date();
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const response = await fetch(`https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=5`);
                const data = await response.json();

                if (data.code === 200) {
                    displayPrayerTimes(data.data);
                } else if (!silent) {
                    renderPrayerError(t('حدث خطأ في جلب البيانات.'));
                }
            } catch (error) {
                console.error('Error fetching prayer times:', error);
                if (!silent) renderPrayerError(t('تعذر الاتصال بالخادم.'));
            }
        }, (error) => {
            console.error('Geolocation error:', error);
            if (!silent) {
                let msg = t('تعذر تحديد الموقع.');
                if (error.code === 1) msg = t('يرجى السماح بتحديد الموقع لعرض المواقيت.');
                renderPrayerError(msg);
            }
        });
    }

    function displayPrayerTimes(data) {
        prayersTimings = data.timings; // شيلهم عشان لو هنحتاج نبعت تنبيهات مواقيت الصلاة بعدين
        const timings = data.timings;
        const date = data.date;

        // تحديث بيانات التاريخ والمكان في الشاشة قدام اليوزر
        prayerGregorianDate.textContent = date.gregorian.date;
        prayerHijriDate.textContent = `${date.hijri.day} ${date.hijri.month.ar} ${date.hijri.year}`;
        prayerLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.meta.timezone}`;

        // بنعرض الخمس صلوات ومعاهم الشروق بأسماء عربية وأيقونات لايقة عليهم
        const prayers = [
            { key: 'Fajr', name: 'الفجر', icon: 'fa-cloud-sun' },
            { key: 'Sunrise', name: 'الشروق', icon: 'fa-sun' },
            { key: 'Dhuhr', name: 'الظهر', icon: 'fa-sun' },
            { key: 'Asr', name: 'العصر', icon: 'fa-cloud-sun' },
            { key: 'Maghrib', name: 'المغرب', icon: 'fa-moon' },
            { key: 'Isha', name: 'العشاء', icon: 'fa-moon' }
        ];

        // بنبني قايمة المواقيت عشان تترص في الصفحة بجمالها
        prayerTimesList.innerHTML = prayers.map(p => {
            return `
                <div class="prayer-item" id="prayer-${p.key}">
                    <div class="prayer-name"><i class="fas ${p.icon} fa-fw" style="margin-left:8px; color:var(--primary-color);"></i>${t(p.name)}</div>
                    <div class="prayer-time">${formatTime12(timings[p.key])}</div>
                </div>
                `;
        }).join('');

        highlightNextPrayer(timings);
    }

    function formatTime12(time24) {
        const [hours, minutes] = time24.split(':');
        let h = parseInt(hours);
        const m = minutes;
        const ampm = h >= 12 ? 'م' : 'ص';
        h = h % 12;
        h = h ? h : 12; // the hour '0' should be '12'
        return `${h}:${m} ${ampm}`;
    }

    function renderPrayerError(msg) {
        prayerTimesList.innerHTML = `
                <div style="text-align:center; padding: 2rem; color: var(--text-muted);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 10px; color: #e74c3c;"></i>
                    <p>${msg}</p>
                    <button onclick="window.location.reload()" style="margin-top:10px; padding:5px 15px; border:none; background:var(--primary-color); color:white; border-radius:5px;">${t('إعادة المحاولة')}</button>
                </div>
            `;
        prayerLocation.textContent = t('غير معروف');
    }

    function highlightNextPrayer(timings) {
        if (prayerCountdownInterval) clearInterval(prayerCountdownInterval);

        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        const prayers = ['Fajr', 'Sunrise', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
        const prayerNamesAr = {
            'Fajr': 'الفجر',
            'Sunrise': 'الشروق',
            'Dhuhr': 'الظهر',
            'Asr': 'العصر',
            'Maghrib': 'المغرب',
            'Isha': 'العشاء'
        };

        let nextPrayer = null;
        let isTomorrow = false;

        for (const p of prayers) {
            const [h, m] = timings[p].split(':').map(Number);
            const prayerTime = h * 60 + m;

            if (prayerTime > currentTime) {
                nextPrayer = p;
                break;
            }
        }

        if (!nextPrayer) {
            nextPrayer = 'Fajr';
            isTomorrow = true;
        }

        // تمييز الصلاة القادمة في الجدول
        const el = document.getElementById(`prayer-${nextPrayer}`);
        if (el) el.classList.add('next-prayer');

        // بدء العداد التنازلي
        const countdownCard = document.getElementById('prayer-countdown-card');
        const nextPrayerNameEl = document.getElementById('next-prayer-name');
        const countdownTimerEl = document.getElementById('countdown-timer');

        if (countdownCard && nextPrayerNameEl && countdownTimerEl) {
            countdownCard.style.display = 'flex';
            nextPrayerNameEl.textContent = t(prayerNamesAr[nextPrayer]);

            const [nextH, nextM] = timings[nextPrayer].split(':').map(Number);
            const targetDate = new Date();
            targetDate.setHours(nextH, nextM, 0, 0);
            if (isTomorrow) targetDate.setDate(targetDate.getDate() + 1);

            const updateCountdown = () => {
                const nowMs = new Date().getTime();
                const dist = targetDate.getTime() - nowMs;

                if (dist < 0) {
                    clearInterval(prayerCountdownInterval);
                    countdownTimerEl.textContent = "00:00:00";
                    fetchPrayerTimes(true); // إعادة التحديث لجلب الصلاة التالية
                    return;
                }

                const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((dist % (1000 * 60)) / 1000);

                countdownTimerEl.textContent =
                    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };

            updateCountdown();
            prayerCountdownInterval = setInterval(updateCountdown, 1000);
        }
    }


    function getDuaOfTheDay() {
        if (typeof duasData === 'undefined' || duasData.length === 0) return "اللهم بارك لنا في يومنا هذا";
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const index = seed % duasData.length;
        return duasData[index];
    }

    //
    async function showTafsir(surahNum, ayahNum) {
        activeTafsirSurah = surahNum;
        activeTafsirAyah = ayahNum;

        const surah = surahs.find(s => s.number == surahNum);
        const sName = window.currentUiLang === 'en' ? (surah ? surah.englishName : '') : (surah ? surah.name : '');
        const tafsirT = window.currentUiLang === 'en' ? `Ayah Tafsir ${ayahNum} - ${sName}` : `تفسير الآية ${ayahNum} - ${sName}`;
        tafsirTitle.textContent = tafsirT;
        showTafsirSkeletons();
        tafsirModal.style.display = 'flex';

        const tafsirText = await fetchTafsir(surahNum, ayahNum);
        if (tafsirText) {
            tafsirBody.innerHTML = `<div>${tafsirText}</div>`;
        } else {
            const errDesc = window.currentUiLang === 'en' ? 'Sorry, Tafsir could not be loaded currently.' : 'عذراً، تعذر تحميل التفسير حالياً.';
            tafsirBody.innerHTML = `<p class="error">${errDesc}</p>`;
        }
    }

    async function fetchTafsir(surah, ayah) {
        try {
            const tsfEd = window.currentQuranLang === 'en' ? 'en.asad' : currentTafsirEdition;
            const response = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/${tsfEd}`);
            const data = await response.json();
            return data.data.text;
        } catch (error) {
            console.error('Error fetching tafsir:', error);
            return null;
        }
    }

    // 
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    // 
    function savePlaybackState() {
        if (curIdx === -1) return;
        const state = {
            reciterId: reciter.id,
            surahIndex: curIdx,
            currentTime: playerAudio.currentTime
        };
        localStorage.setItem('quran_last_play', JSON.stringify(state));
    }

    // 
    async function checkDownloadStatus(url) {
        if (!downloadBtn) return;

        // نرجع شكل الزرار لأصله قبل ما نشيك على الحالة بتاعته دلوقتى
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = '<i class="fas fa-cloud-download-alt"></i>';
        downloadBtn.title = t('تحميل السورة');
        downloadBtn.onclick = null; // نضف أي كليك قديمة كانت عليه عشان الحسابات ما تخلفش معانا

        try {
            const cache = await caches.open('quran-audio-v1');
            const match = await cache.match(url);

            if (match) {
                downloadBtn.classList.add('downloaded');
                downloadBtn.innerHTML = '<i class="fas fa-check"></i>';
                downloadBtn.title = t('تم التحميل (متاح بدون انترنت)');
                // لو السورة متحملة أصلاً، خليه يمسحها لو داس على الزرار تاني ونبهه بـ Confirm
                downloadBtn.onclick = async () => {
                    if (confirm(t('هل تريد حذف السورة من التحميلات؟'))) {
                        await cache.delete(url);
                        checkDownloadStatus(url);
                    }
                };
            } else {
                downloadBtn.onclick = () => downloadSurah(url);
            }
        } catch (e) {
            console.error('Cache check failed:', e);
        }
    }

    async function downloadSurah(url) {
        if (!downloadBtn || curIdx === -1) return;

        // تنبيه لو مفيش نت أصلاً
        if (!navigator.onLine) {
            alert(t('لا يوجد اتصال بالإنترنت. يرجى التأكد من الاتصال لتحميل السور لأول مرة.'));
            return;
        }

        const surah = surahs[curIdx];
        const surahNumber = surah.number;

        // أظهر علامة التحميل (بتلف) واحنا بننزل الملف في الكاش
        downloadBtn.className = 'download-btn downloading';
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

        try {
            const audioCache = await caches.open('quran-audio-v1');
            const apiCache = await caches.open('quran-app-v11');

            // نحمل ملف الصوت ونحطه في الكاش
            // لازم نستخدم fetch عادي (مش no-cors) عشان الـ opaque response مش بيشتغل مع الـ audio player
            console.log('[Download] بدء تحميل:', url);
            const audioResponse = await fetch(url);
            if (!audioResponse.ok) {
                throw new Error(`Audio fetch failed: ${audioResponse.status}`);
            }
            await audioCache.put(url, audioResponse.clone());
            console.log('[Download] تم حفظ الصوت في الكاش بنجاح');

            // وكمان هنحمل النص عشان يشتغل بدون انترنت في "وضع القراءة"
            try {
                const textUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}`;
                const textResponse = await fetch(textUrl);
                if (textResponse.ok) {
                    await apiCache.put(textUrl, textResponse.clone());
                }
            } catch (textErr) {
                console.warn('[Download] فشل تحميل النص (الصوت تم بنجاح):', textErr);
            }

            // نحدث شكل الزرار لما نخلص التحميل بنجاح ونظهر علامة الصح الشيك
            checkDownloadStatus(url);

        } catch (error) {
            console.error('[Download] فشل التحميل:', error);
            downloadBtn.className = 'download-btn';
            downloadBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
            downloadBtn.title = t('فشل التحميل');
            setTimeout(() => checkDownloadStatus(url), 3000);
        }
    }

    function loadLastPlayback() {
        const lastPlay = JSON.parse(localStorage.getItem('quran_last_play'));
        if (lastPlay && surahs.length > 0) {
            const r = recitersData.find(res => res.id === lastPlay.reciterId);
            if (r) {
                reciter = r;
                curIdx = lastPlay.surahIndex;
                const surah = surahs[curIdx];
                if (surah) {
                    playerSurah.textContent = window.currentUiLang === 'en' ? surah.englishName : surah.name;
                    playerReciter.textContent = window.currentUiLang === 'en' ? t(reciter.name) : reciter.name;
                    playerImg.src = reciter.img;
                    if (miniPlayerImg) miniPlayerImg.src = reciter.img;


                    const formattedNumber = String(surah.number).padStart(3, '0');
                    playerAudio.src = `${reciter.server}${formattedNumber}.mp3`;

                    // يرجع يشتغل بالظبط من الثانية اللي وقفت عندها آخر مرة ما قفلت التطبيق
                    playerAudio.addEventListener('loadedmetadata', () => {
                        playerAudio.currentTime = lastPlay.currentTime || 0;
                    }, { once: true });

                    // اتأكد إن زرار التحميل وكل حاجة تانية ماشية مع السورة اللي شغالة دلوقتى
                    checkDownloadStatus(playerAudio.src);
                    renderReciters();
                    renderSurahs(surahs);

                    // أظهر المشغل لو فيه سورة مسجلة من أخر مرة
                    if (playerBar) playerBar.style.display = 'flex';
                }
            }
        }
    }

    // 
    async function generateAyahCard(data) {
        shareModal.style.display = 'flex';
        sharePreview.innerHTML = `
            <div class="tafsir-skeleton" style="padding: 20px;">
                <div class="skeleton-line skeleton"></div>
                <div class="skeleton-line skeleton"></div>
                <div class="skeleton-line skeleton"></div>
            </div>
        `;

        const ctx = shareCanvas.getContext('2d', { alpha: false });
        const W = shareCanvas.width;
        const H = shareCanvas.height;

        // تحميل اللوجو
        const logo = new Image();
        logo.src = 'images/icon-512x512.jpg';
        await new Promise(resolve => {
            logo.onload = resolve;
            logo.onerror = resolve;
        });

        // 1. خلفية متدرجة عصرية (Mesh-like Gradient)
        ctx.fillStyle = '#f8fafc'; // لون أساسي فاتح
        ctx.fillRect(0, 0, W, H);

        // إضافة فقاعات ملونة ناعمة في الزوايا (زي ستايل الموقع الجديد)
        const drawBlob = (x, y, radius, color) => {
            const blobGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
            blobGrad.addColorStop(0, color);
            blobGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = blobGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        drawBlob(W * 0.9, 0, 800, 'rgba(26, 188, 156, 0.15)'); // Primary
        drawBlob(0, H * 0.9, 800, 'rgba(72, 201, 176, 0.12)'); // Primary Light
        drawBlob(W * 0.2, H * 0.3, 600, 'rgba(241, 196, 15, 0.08)'); // Gold

        // 2. رسم الكارت الزجاجي (The Glass Card) في المنتصف
        const cardPadding = 80;
        const cardX = cardPadding;
        const cardY = 120;
        const cardW = W - (cardPadding * 2);
        const cardH = H - 350;
        const cornerRadius = 60;

        // ظل الكارت
        ctx.shadowColor = 'rgba(0, 0, 0, 0.06)';
        ctx.shadowBlur = 40;
        ctx.shadowOffsetY = 20;

        // جسم الكارت (شبه شفاف)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(cardX, cardY, cardW, cardH, cornerRadius);
        } else {
            // fallback for older environments
            ctx.moveTo(cardX + cornerRadius, cardY);
            ctx.arcTo(cardX + cardW, cardY, cardX + cardW, cardY + cardH, cornerRadius);
            ctx.arcTo(cardX + cardW, cardY + cardH, cardX, cardY + cardH, cornerRadius);
            ctx.arcTo(cardX, cardY + cardH, cardX, cardY, cornerRadius);
            ctx.arcTo(cardX, cardY, cardX + cardW, cardY, cornerRadius);
        }
        ctx.fill();

        // إطار الكارت (Inner Glow effect)
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 3. وضع اللوجو وشعار التطبيق (Branding)
        const logoSize = 100;
        const brandY = cardY + 120;

        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, brandY, logoSize / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(logo, W / 2 - logoSize / 2, brandY - logoSize / 2, logoSize, logoSize);
        ctx.restore();

        ctx.fillStyle = '#2c3e50';
        ctx.textAlign = 'center';
        ctx.font = '700 45px Amiri, serif';
        ctx.fillText('تطبيق قرآني', W / 2, brandY + 110);

        let fontSize = 70;
        const textMaxWidth = cardW - 120;
        const ayahSpaceTop = brandY + 160;
        const ayahSpaceBottom = cardY + cardH - 180;
        const textMaxHeight = ayahSpaceBottom - ayahSpaceTop;

        ctx.fillStyle = '#1e293b';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        let lines = [];
        while (fontSize >= 28) {
            // استخدام خط Amiri المخصص للقرآن لإعطاء الطابع الشرعي الراقي
            ctx.font = `700 ${fontSize}px 'Amiri', serif`;
            lines = getWrappedLines(ctx, data.text, textMaxWidth);
            const totalH = lines.length * (fontSize * 2.2); // تباعد أوسع للتشكيل
            if (totalH <= textMaxHeight || fontSize <= 28) break;
            fontSize -= 4;
        }

        const lineHeight = fontSize * 2.2;
        const totalTextHeight = lines.length * lineHeight;

        // حساب نقطة البداية بحيث يتوسط النص المسافة المتاحة بالظبط
        let startLineY = ayahSpaceTop + (textMaxHeight / 2) - (totalTextHeight / 2) + (lineHeight / 2);

        ctx.direction = 'rtl';
        lines.forEach((line, i) => {
            // إضافة ظل خفيف جداً للنص لإعطائه عمق
            ctx.shadowColor = 'rgba(0,0,0,0.05)';
            ctx.shadowBlur = 10;
            ctx.fillText(line.trim(), W / 2, startLineY + (i * lineHeight));
        });
        ctx.shadowBlur = 0;
        ctx.direction = 'inherit';

        // 5. اسم السورة والآية (Metadata)
        ctx.fillStyle = 'rgba(26, 188, 156, 1)';
        ctx.font = '800 42px Amiri, serif';
        let cleanSurah = data.surah.replace(/سورة|سُورَةُ|سُورَةِ|سُورَةَ/g, '').trim();
        ctx.fillText(`سورة ${cleanSurah} • آية ${data.ayah}`, W / 2, cardY + cardH - 120);

        // 6. الحقوق في الأسفل (Footer)
        // ctx.fillStyle = '#64748b';
        // ctx.font = '700 32px Tajawal, sans-serif';
        // ctx.fillText('جميع الحقوق محفوظة لشركة تدفق © 2026', W / 2, H - 120);

        ctx.fillStyle = 'rgba(26, 188, 156, 0.7)';
        ctx.font = '600 32px Outfit, sans-serif';
        ctx.fillText('ralball74.github.io/qurany.assem', W / 2, H - 100);

        // تحديث المعاينة بصورة عالية الجودة
        const image = new Image();
        image.src = shareCanvas.toDataURL('image/png', 1.0);
        image.onload = () => {
            sharePreview.innerHTML = '';
            sharePreview.appendChild(image);
        };
    }

    // دالة مساعدة لتقسيم النص لأسطر بشكل صحيح يدعم العربية
    function getWrappedLines(ctx, text, maxWidth) {
        const words = text.trim().split(/\s+/);
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let width = ctx.measureText(currentLine + ' ' + word).width;
            if (width < maxWidth) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }

    function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    // وظائف الـ Hero Card والتحية المتغيرة آلياً
    function updateHeroCard() {
        const greetingText = document.getElementById('greeting-text');
        const ayahText = document.getElementById('hero-ayah-text');
        const ayahRef = document.getElementById('hero-ayah-ref');
        if (!greetingText || !ayahText) return;

        // 1. تحديد التحية بناءً على ساعة الجهاز
        const hour = new Date().getHours();
        let greeting = "";
        const uName = "عاصم"; // اسم المستخدم الافتراضي
        if (hour >= 5 && hour < 12) greeting = `صباح الخير والبركة يا ${uName} ☀️`;
        else if (hour >= 12 && hour < 17) greeting = `يومك مبارك وسعيد يا ${uName} 🌤️`;
        else if (hour >= 17 && hour < 21) greeting = `مساء الطمأنينة والسكينة يا ${uName} 🌙`;
        else greeting = `طابت ليلتك بذكر الله يا ${uName} ✨`;
        greetingText.textContent = greeting;

        // 2. مجموعة آيات ملهمة تتغير في كل مرة
        const heroAyahs = [
            { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "سورة الرعد - 28" },
            { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "سورة الشرح - 6" },
            { text: "وَقُل رَّبِّ زِدْنِي عِلْمًا", ref: "سورة طه - 114" },
            { text: "فَإِنَّكَ بِأَعْيُنِنَا", ref: "سورة الطور - 48" },
            { text: "وَتَوَكَّلْ عَلَى الْحَيِّ الَّذِي لَا يَمُوتُ", ref: "سورة الفرقان - 58" },
            { text: "إِنَّ رَبِّي قَرِيبٌ مُّجِيبٌ", ref: "سورة هود - 61" }
        ];
        const picked = heroAyahs[Math.floor(Math.random() * heroAyahs.length)];
        ayahText.textContent = `"${picked.text}"`;
        ayahRef.textContent = picked.ref;
    }

    // (Focus Mode)
    const focusModeBtn = document.getElementById('focus-mode-btn');
    const focusOverlay = document.getElementById('focus-overlay');
    const exitFocusBtn = document.getElementById('exit-focus-btn');
    const focusTitle = document.getElementById('focus-title');
    const focusArtist = document.getElementById('focus-artist');
    const focusArtwork = document.getElementById('focus-artwork');

    if (focusModeBtn) {
        focusModeBtn.addEventListener('click', () => {
            if (curIdx === -1) {
                playSurah(surahs[0], 0); // لو مفيش تشغيل، ابدأ بالفاتحة
            }
            // تحديث بيانات مود التركيز
            focusTitle.textContent = playerSurah.textContent;
            focusArtist.textContent = playerReciter.textContent;
            focusArtwork.src = playerImg.src;
            
            focusOverlay.style.display = 'flex';
            setTimeout(() => focusOverlay.classList.add('active'), 50);
            isFocusMode = true;
        });
    }

    if (exitFocusBtn) {
        exitFocusBtn.addEventListener('click', () => {
            focusOverlay.classList.remove('active');
            setTimeout(() => focusOverlay.style.display = 'none', 500);
            isFocusMode = false;
        });
    }

    // (Modern Audio Visualizer)
    function initAudioVisualizer() {
        if (audioContext) {
            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }
            return;
        }

        try {
            const visualizerCanvas = document.getElementById('audio-visualizer');
            if (!visualizerCanvas) return;
            const ctx = visualizerCanvas.getContext('2d');

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            
            audioSource = audioContext.createMediaElementSource(playerAudio);
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination);

            analyser.fftSize = 128;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            function draw() {
                visualizerAnimationId = requestAnimationFrame(draw);
                analyser.getByteFrequencyData(dataArray);

                visualizerCanvas.width = visualizerCanvas.offsetWidth;
                visualizerCanvas.height = visualizerCanvas.offsetHeight;

                ctx.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

                const barWidth = (visualizerCanvas.width / bufferLength) * 2;
                let x = 0;

                for (let i = 0; i < bufferLength; i++) {
                    const barHeight = (dataArray[i] / 255) * visualizerCanvas.height * 0.45; // تقليل الارتفاع ليكون مريحاً مظهر هادئ
                    const opacity = (dataArray[i] / 255) * 0.25; // شفافية أقل
                    ctx.fillStyle = `rgba(26, 188, 156, ${opacity})`;
                    ctx.fillRect(x, visualizerCanvas.height - barHeight, barWidth - 1, barHeight);

                    // التفاعل مع الـ Blobs في الخلفية
                    if (i === 5) {
                        const scale = 1 + (dataArray[i] / 255) * 0.15; // نبض أهدأ
                        document.querySelectorAll('.blob').forEach(blob => {
                            blob.style.transform = `scale(${scale})`;
                        });
                    }
                    x += barWidth;
                }
            }
            draw();
        } catch (e) {
            console.warn('Visualizer interaction or CORS error:', e);
        }
    }
});
