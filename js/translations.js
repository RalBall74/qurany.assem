const translationMap = {
    "قرآني": "Qurany",
    "القراء": "Reciters",
    "السور": "Surahs",
    "مساعدك الذكي": "Smart Assistant",
    "اسألني عن أي شيء في القرآن أو الدين": "Ask me anything about Quran or Religion",
    "اكتب سؤالك هنا...": "Type your question here...",
    "أهلاً، كيف يمكنني إعانتك اليوم؟.🤍": "Hello, how can I help you today? 🤍",
    "أخرى": "Others",
    "عن المطور": "About Developer",
    "معلومات عن مبرمج التطبيق": "Information about the developer",
    "دعاء اليوم": "Dua of the Day",
    "دعاء متجدد كل يوم": "A new Dua every day",
    "السبحة الإلكترونية": "Digital Rosary",
    "المسبحة الإلكترونية": "Digital Rosary",
    "عداد تسبيح": "Tasbeeh Counter",
    "مواقيت الصلاة": "Prayer Times",
    "مواعيد الصلاة اليومية": "Daily Prayer Times",
    "فيديوهات دينية": "Islamic Videos",
    "شاهد فيديوهات وقوائم تشغيل دينية": "Watch videos and playlists",
    "إذاعات القرآن": "Quran Radio",
    "استمع للقرآن مباشرة على مدار الساعة": "Listen to Quran live 24/7",
    "بث مباشر": "LIVE",
    "ابحث عن إذاعة أو قارئ...": "Search for a station or reciter...",
    "جاري تحميل الإذاعات...": "Loading radio stations...",
    "لا توجد إذاعات مطابقة": "No matching stations found",
    "تعذر تحميل الإذاعات. تحقق من الاتصال وحاول مجدداً.": "Failed to load stations. Check connection and try again.",
    "عاصم م ابو النصر": "Assem M Abu Alnasr",
    "مطور برمجيات وصانع تجارب رقمية": "Software Developer & Digital Experience Creator",
    "\"الحمد لله الذي سخر لنا هذا لخدمة كتابه الكريم. أسعى لتقديم تجربة تقنية هادئة تعينكم على ذكر الله.\"": "\"Praise be to Allah who enabled us to serve His Holy Book. I strive to provide a calm technical experience that helps you in the remembrance of Allah.\"",
    "الموقع الشخصي": "Personal Website",
    "معرض الأعمال": "Portfolio",
    "خدمة العملاء": "Customer Service",
    "بصمة تدفق للبرمجيات © 2026": "Tadfuq Software © 2026",
    "صدقة جارية": "Ongoing Charity",
    "باقي أعمالي": "Other Projects",
    "جاري جلب القِبلة والمواقيت...": "Fetching Qibla & Times...",
    "فيديوهات": "Videos",
    "قوائم التشغيل": "Playlists",
    "مشاهدة الفيديو": "Watch Video",
    "إنه ربي": "Innahu Rabbi",
    "مجالس القرآن": "Majalis Quran",
    "تذوق العبادات": "Tadawuq Ibadat",
    "وعي - الأخلاق": "Waey - Ethics",
    "اختر حلقة من القائمة": "Select episode from list",
    "سورة الفاتحة": "Surah Al-Fatihah",
    "اختر سورة": "Select Surah",
    "ماهر المعيقلي": "Maher Al-Muaiqly",
    "الرئيسية": "Home",
    "المفضلة": "Favorites",
    "المساعد": "Assistant",
    "ثبّت تطبيق قرآني": "Install Qurany App",
    "استمتع بتجربة أفضل واستمع للقرآن حتى بدون إنترنت": "Enjoy a better experience and listen without internet",
    "تثبيت": "Install",
    "لاحقاً": "Later",
    "🤍صلى على اشرف الخلق🤍": "🤍 Send Blessings on the Prophet 🤍",
    "صلى عليه وخد حسنات وادعيلي": "Pray upon him and gain rewards",
    "عليه الصلاة والسلام": "Peace be upon him",
    "شارك الخير والدال على الخير كفاعله": "Share Goodness",
    "بمشاركتك لهذا التطبيق، تكون سبباً في نشر كتاب الله ولك أجر كل من قرأ أو استمع.. مليارات الحسنات في انتظارنا جميعاً!": "By sharing this app, you participate in spreading the Quran. Billions of good deeds await!",
    "فلنشارك الخير معاً": "Let's share goodness",
    "تجاهل الأجر": "Ignore Reward",
    "تفسير الآية": "Ayah Tafsir",
    "تفسير الميسر": "Al-Muyassar Tafsir",
    "تفسير الجلالين": "Al-Jalalayn Tafsir",
    "تفسير القرطبي": "Al-Qurtubi Tafsir",
    "تفسير البغوي": "Al-Baghawi Tafsir",
    "تفسير الوسيط": "Al-Waseet Tafsir",
    "تنوير المقباس": "Tanweer Al-Miqbas",
    "جاري تحميل التفسير...": "Loading Tafsir...",
    "مشاركة الآية": "Share Ayah",
    "جاري تجهيز الكارت...": "Preparing card...",
    "حفظ الصورة": "Save Image",
    "مشاركة مباشرة": "Share directly",
    "اختر حلقة": "Select Episode",
    "لا يوجد اتصال بالإنترنت - تعمل فقط السور المحملة": "No Internet Connection - Only downloaded Surahs work",
    "ابحث عن سورة أو آية...": "Search for Surah or Ayah...",
    "ابحث عن كلمة في القرآن...": "Search for a word in Quran...",
    "سورة": "Surah",
    "آية": "Ayah",
    "الفجر": "Fajr",
    "الشروق": "Sunrise",
    "الظهر": "Dhuhr",
    "العصر": "Asr",
    "المغرب": "Maghrib",
    "العشاء": "Isha",
    "لا توجد نتائج مطابقة": "No results matched",
    "مكية": "Meccan",
    "مدنية": "Medinan",
    "لم يتم العثور على نتائج في الآيات": "No results found in Ayahs",
    "إغلاق": "Close",
    "اختر اللغة / Language": "اختر اللغة / Choose Language",
    "English (التطبيق فقط)": "English (UI Only)",
    "English (القراءة والتفسير)": "English (Quran & Tafseer)",
    "English (تطبيق شامل)": "English (Full App)",
    "العربية (الوضع الافتراضي)": "Arabic (Default)",
    "لا يوجد اتصال بالإنترنت. يرجى التأكد من الاتصال لتحميل السور لأول مرة.": "No internet connection. Please make sure to connect to download Surahs for the first time.",
    "عذراً، المتصفح لا يدعم تحديد الموقع.": "Sorry, browser doesn't support geolocation.",
    "حدث خطأ في جلب البيانات.": "Error fetching data.",
    "تعذر الاتصال بالخادم.": "Could not connect to server.",
    "تعذر تحديد الموقع.": "Could not detect location.",
    "يرجى السماح بتحديد الموقع لعرض المواقيت.": "Please allow location access to display prayer times.",
    "إعادة المحاولة": "Retry",
    "هل تريد तصغير العداد؟": "Do you want to reset the counter?",
    "هل تريد تصفير العداد؟": "Do you want to reset the counter?",
    "تحميل السورة": "Download Surah",
    "تم التحميل (متاح بدون انترنت)": "Downloaded (available offline)",
    "هل تريد حذف السورة من التحميلات؟": "Do you want to delete the Surah from downloads?",
    "عذراً، تعذر تحميل التفسير حالياً.": "Sorry, Tafsir could not be loaded currently.",
    "غير معروف": "Unknown",
    "حدث خطأ أثناء البحث.": "An error occurred during search.",
    "ماهر المعيقلي": "Maher Al-Muaiqly",
    "مشاري راشد العفاسي": "Mishary Rashid Alafasy",
    "ياسر الدوسري": "Yasser Al-Dosari",
    "يونس اسويلص": "Younes Assewailes",
    "وديع اليمنى": "Wadih Al-Yamani",
    "محمد صديق المنشاوي": "Mohamed Siddiq El-Minshawi",
    "إسلام صبحي": "Islam Sobhi",
    "أحمد النفيس": "Ahmed Al-Nufais",
    "سعد الغامدي": "Saad Al-Ghamdi",
    "أحمد العجمي": "Ahmed Al-Ajmi",
    "ناصر القطامي": "Nasser Al-Qatami",
    "فارس عباد": "Fares Abbad",
    "عبد الرحمن السديس": "Abdul Rahman Al-Sudais",
    "محمود خليل الحصري": "Mahmoud Khalil Al-Hussary",
    "محمد اللحيدان": "Mohammed Al-Luhaidan",
    "محمود علي البنا": "Mahmoud Ali Al-Banna",
    "هزاع البلوشي": "Hazza Al-Balushi",
    "عبد الباسط عبد الصمد": "Abdul Basit Abdul Samad",
    "خالد الجليل": "Khalid Al-Jalil",
    "عبدالرحمن الماجد": "Abdul Rahman Al-Majed",
    "رعد الكردي": "Raad Al-Kurdi",
    "عبد الله عواد الجهني": "Abdullah Awad Al-Juhany",
    "سعود الشريم": "Saad Al-Shuraim",
    "علي الحذيفي": "Ali Al-Hudhaifi",
    "إدريس أبكر": "Idris Abkar",
    "صلاح البدير": "Salah Al-Budair",
    "يوسف بن نوح أحمد": "Youssef Bin Noah Ahmed",
    "شريف مصطفى": "Sherif Mostafa",
    "بندر بليلة": "Bandar Balila",
    "مصطفى رعد العزاوي": "Mustafa Raad Al-Azzawi",
    "عبد الله الموسى": "Abdullah Al-Mousa",
    "بدر التركي": "Bader Al-Turki",
    "حفص عن عاصم": "Hafs from Asim",
    "ورش عن نافع": "Warsh from Nafi",
    "صلي علي محمد": "Blessings on Muhammad",
    "تفسير السورة": "Surah Tafsir",
    "تفسير": "Tafsir",
    "استماع": "Listen",
    "قراءة": "Read",
    "إيقاف المؤقت": "Stop Timer",
    "تفعيل": "Enable",
    "تعطيل": "Disable",
    "تم النسخ!": "Copied!",
    "لم يتم العثور على أي نتائج": "No results found",
    "بحث في الآيات": "Search in Ayahs",
    "بحث في السور": "Search in Surahs",
    "الآيات": "Ayahs",
    "رجوع": "Back",
    "تحميل": "Download",
    "حذف": "Delete",
    "الفجر": "Fajr",
    "الشروق": "Sunrise",
    "الظهر": "Dhuhr",
    "العصر": "Asr",
    "المغرب": "Maghrib",
    "العشاء": "Isha",
    "ابحث عن سورة...": "Search for Surah...",
    "جاري التحديد...": "Locating...",
    "جاري التجهيز...": "Preparing...",
    "جاري التحديث...": "Updating...",
    "نسخ النص": "Copy Text",
    "تم النسخ بنجاح": "Copied successfully",
    "اللهم بارك لنا في يومنا هذا": "O Allah, bless us in this day of ours",
    "إنه الله": "Indeed He is Allah",
    "جاري التحديد...": "Detecting...",
    "حدث خطأ في جلب البيانات.": "Error fetching data.",
    "تعذر الاتصال بالخادم.": "Connection error.",
    "عذراً، المتصفح لا يدعم تحديد الموقع.": "Browser doesn't support geolocation.",
    "تطبيق قرآني - تجربة إيمانية متكاملة": "Qurany App - An integrated faith experience",
    "آية من القرآن الكريم": "Ayah from the Holy Quran",
    "فشل التحميل": "Download failed",
    "المشاركة غير مدعومة في متصفحك، يمكنك حفظ الصورة بدلاً من ذلك.": "Sharing not supported in your browser, you can save the image instead."
};

window.currentUiLang = localStorage.getItem('quran_ui_lang');
if (!window.currentUiLang) {
    window.currentUiLang = 'ar';
    localStorage.setItem('quran_ui_lang', 'ar');
}

window.currentQuranLang = localStorage.getItem('quran_quran_lang');
if (!window.currentQuranLang) {
    window.currentQuranLang = 'ar';
    localStorage.setItem('quran_quran_lang', 'ar');
}

function getTranslatedText(arText) {
    if (window.currentUiLang !== 'en') return arText;
    return translationMap[arText] || arText;
}

function t(arText) {
    return getTranslatedText(arText);
}

function processNodeForTranslation(node) {
    if (!node) return;
    if (node.nodeType === 1) {
        if (["SCRIPT", "STYLE", "IFRAME", "CANVAS"].includes(node.nodeName)) return;
        if (node.placeholder) {
            let pText = node.placeholder.trim();
            if (translationMap[pText] || node.hasAttribute('data-original-placeholder')) {
                if (!node.hasAttribute('data-original-placeholder')) {
                    node.setAttribute('data-original-placeholder', pText);
                }
                let originalP = node.getAttribute('data-original-placeholder');
                node.placeholder = window.currentUiLang === 'en' ? (translationMap[originalP] || originalP) : originalP;
            }
        }
        
        if (node.id === "surah-search") {
             if (window.currentUiLang === 'en') {
                 node.placeholder = node.placeholder.includes("آية") || node.placeholder.includes("كلمة") 
                   ? (translationMap["ابحث عن كلمة في القرآن..."] || "Search for word in Quran...") 
                   : (translationMap["ابحث عن سورة أو آية..."] || "Search for Surah or Ayah...");
             } else {
                 let orig = node.getAttribute('data-original-placeholder') || "ابحث عن سورة أو آية...";
                 node.placeholder = node.placeholder.includes("Quran") || node.placeholder.includes("word") 
                   ? "ابحث عن كلمة في القرآن..." 
                   : "ابحث عن سورة أو آية...";
             }
        }

        for (let child of node.childNodes) {
            processNodeForTranslation(child);
        }
    } else if (node.nodeType === 3) {
        let text = node.nodeValue.trim();
        if (!text || text.length < 2) return;
        if (translationMap[text] && !node.parentElement.hasAttribute('data-original-text')) {
             node.parentElement.setAttribute('data-original-text', text);
        }

        if (node.parentElement && node.parentElement.hasAttribute('data-original-text')) {
             let original = node.parentElement.getAttribute('data-original-text');
             let translated = translationMap[original] || original;
             let currentText = node.nodeValue.trim();

             if (currentText !== original && currentText !== translated) {
                 if (translationMap[currentText]) {
                    node.parentElement.setAttribute('data-original-text', currentText);
                    original = currentText;
                 } else {
                    node.parentElement.removeAttribute('data-original-text');
                    return;
                 }
             }

             if (window.currentUiLang === 'ar') {
                 if (node.nodeValue.trim() !== original) {
                    node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), original);
                 }
             } else {
                 let tVal = translationMap[original] || original;
                 if (node.nodeValue.trim() !== tVal) {
                    node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), tVal);
                 }
             }
        } else if (window.currentUiLang === 'en' && translationMap[text]) {
             node.nodeValue = node.nodeValue.replace(text, translationMap[text]);
        }
    }
}

function applyUiTranslations() {
    processNodeForTranslation(document.body);
    document.documentElement.dir = window.currentUiLang === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = window.currentUiLang;
    
    if (window.renderSurahs && typeof window.surahs !== 'undefined') {
       const elCat = document.getElementById('current-category');
       if (elCat) {
           elCat.textContent = elCat.textContent === t('السور') || elCat.textContent === 'السور' || elCat.textContent === 'Surahs' 
              ? getTranslatedText('السور') 
              : getTranslatedText('المفضلة');
       }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyUiTranslations();
    
    const observer = new MutationObserver((mutations) => {
        if (window.currentUiLang === 'en') {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => processNodeForTranslation(node));
                if (mutation.type === 'characterData') {
                    processNodeForTranslation(mutation.target);
                }
            });
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });
});

