const recitersData = [
    {
        id: "maher",
        name: "ماهر المعيقلي",
        img: "images/1.jpg",
        server: "https://server12.mp3quran.net/maher/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "afasy",
        name: "مشاري راشد العفاسي",
        img: "images/3.jpg",
        server: "https://server8.mp3quran.net/afs/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "dosari",
        name: "ياسر الدوسري",
        img: "images/2.jpg",
        server: "https://server11.mp3quran.net/yasser/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "souilass",
        name: "يونس اسويلص",
        img: "images/4.jpg",
        server: "https://server16.mp3quran.net/souilass/Rewayat-Warsh-A-n-Nafi/",
        rewayah: "ورش عن نافع"
    },
    {
        id: "wdee3",
        name: "وديع اليمنى",
        img: "images/5.jpg",
        server: "https://server6.mp3quran.net/wdee3/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "minsh",
        name: "محمد صديق المنشاوي",
        img: "images/6.jpg",
        server: "https://server10.mp3quran.net/minsh/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "islam",
        name: "إسلام صبحي",
        img: "images/7.jpg",
        server: "https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "nafis",
        name: "أحمد النفيس",
        img: "images/8.jpg",
        server: "https://server16.mp3quran.net/nufais/Rewayat-Hafs-A-n-Assem/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "s_gmd",
        name: "سعد الغامدي",
        img: "images/9.jpg",
        server: "https://server7.mp3quran.net/s_gmd/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "ajm",
        name: "أحمد العجمي",
        img: "images/10.jpg",
        server: "https://server10.mp3quran.net/ajm/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "qtm",
        name: "ناصر القطامي",
        img: "images/11.jpg",
        server: "https://server6.mp3quran.net/qtm/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "frs_a",
        name: "فارس عباد",
        img: "images/12.jpg",
        server: "https://server8.mp3quran.net/frs_a/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "sds",
        name: "عبد الرحمن السديس",
        img: "images/13.jpg",
        server: "https://server11.mp3quran.net/sds/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "husr",
        name: "محمود خليل الحصري",
        img: "images/14.jpg",
        server: "https://server13.mp3quran.net/husr/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "lhdan",
        name: "محمد اللحيدان",
        img: "images/15.jpg",
        server: "https://server8.mp3quran.net/lhdan/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "bna",
        name: "محمود علي البنا",
        img: "images/16.jpg",
        server: "https://server8.mp3quran.net/bna/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "hazza",
        name: "هزاع البلوشي",
        img: "images/17.jpg",
        server: "https://server11.mp3quran.net/hazza/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "basit",
        name: "عبد الباسط عبد الصمد",
        img: "images/18.jpg",
        server: "https://server7.mp3quran.net/basit/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "jleel",
        name: "خالد الجليل",
        img: "images/19.jpg",
        server: "https://server10.mp3quran.net/jleel/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "a_majed",
        name: "عبدالرحمن الماجد",
        img: "images/20.jpg",
        server: "https://server10.mp3quran.net/a_majed/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "kurdi",
        name: "رعد الكردي",
        img: "images/21.jpg",
        server: "https://server6.mp3quran.net/kurdi/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "jhn",
        name: "عبد الله عواد الجهني",
        img: "images/22.jpg",
        server: "https://server13.mp3quran.net/jhn/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "shur",
        name: "سعود الشريم",
        img: "images/23.jpg",
        server: "https://server7.mp3quran.net/shur/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "huzaifi",
        name: "علي الحذيفي",
        img: "images/24.jpg",
        server: "https://server9.mp3quran.net/huzaifi/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "abkr",
        name: "إدريس أبكر",
        img: "images/25.jpg",
        server: "https://server6.mp3quran.net/abkr/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "s_bud",
        name: "صلاح البدير",
        img: "images/26.jpg",
        server: "https://server6.mp3quran.net/s_bud/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "noah",
        name: "يوسف بن نوح أحمد",
        img: "images/27.jpg",
        server: "https://server8.mp3quran.net/noah/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "shereef",
        name: "شريف مصطفى",
        img: "images/28.jpg",
        server: "https://server16.mp3quran.net/shereef/Rewayat-Hafs-A-n-Assem/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "balilah",
        name: "بندر بليلة",
        img: "images/29.jpg",
        server: "https://server6.mp3quran.net/balilah/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "ra3ad",
        name: "مصطفى رعد العزاوي",
        img: "images/30.jpg",
        server: "https://server8.mp3quran.net/ra3ad/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "mousa",
        name: "عبد الله الموسى",
        img: "images/31.jpg",
        server: "https://server14.mp3quran.net/mousa/Rewayat-Hafs-A-n-Assem/",
        rewayah: "حفص عن عاصم"
    },
    {
        id: "bader",
        name: "بدر التركي",
        img: "images/32.jpg",
        server: "https://server10.mp3quran.net/bader/Rewayat-Hafs-A-n-Assem/",
        rewayah: "حفص عن عاصم"
    }
];

const surahListMeta = [
    { id: 1, name: "الفاتحة", englishName: "Al-Fatihah" },
    { id: 2, name: "البقرة", englishName: "Al-Baqarah" },
];
