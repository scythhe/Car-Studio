import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ka" | "en" | "ru";

const ka = {
  nav: { home: "მთავარი", services: "სერვისები", work: "ნამუშევრები", pricing: "ფასები", reviews: "შეფასებები", contact: "კონტაქტი", book: "დაჯავშნა" },
  hero: {
    tagline: "პრემიუმ ავტო დეტეილინგი · თბილისი",
    titleLine1: "სრულყოფილება",
    titleHighlight: "ყველა",
    titleLine2: "დეტალში",
    subtitle: "პროფესიონალური პოლირება, კერამიკული დაფარვა და სალონის დეტეილინგი — შედეგი, რომელიც ჩანს.",
    bookCta: "დაჯავშნე ვიზიტი",
    call: "დარეკე",
    ratingSuffix: "შეფასება Google-ზე",
  },
  services: {
    kicker: "01 · სერვისები",
    title: "ჩვენი სერვისები",
    book: "დაჯავშნა",
    items: [
      { title: "ლაქის კორექცია და პოლირება", desc: "ვაშორებთ ნაკაწრებს, ჰოლოგრამებსა და ოქსიდაციას და აღვადგენთ ლაქის ღრმა ბზინვარებას." },
      { title: "კერამიკული დაფარვა", desc: "გრძელვადიანი დაცვა, ჰიდროფობული ეფექტი და ბრჭყვიალა ზედაპირი წლების განმავლობაში." },
      { title: "სალონის დეტეილინგი", desc: "ღრმა ქიმწმენდა, ტყავის მოვლა და სრული დეზინფექცია — სალონი, როგორც ახალი." },
      { title: "მინების ტონირება", desc: "ხარისხიანი ტონირება კომფორტისა და დაცვისთვის, ზუსტი მორგებით." },
    ],
  },
  work: {
    kicker: "02 · ნამუშევრები",
    title: "ნახე განსხვავება",
    subtitle: "გადაათრიე სახელური და ნახე ტრანსფორმაცია.",
    before: "მანამდე",
    after: "შემდეგ",
  },
  why: {
    kicker: "03 · უპირატესობა",
    title: "რატომ Car Studio",
    items: [
      "5.0 რეიტინგი Google-ზე, 25 რეალურ შეფასებაზე დაფუძნებული — ნდობა, რომელსაც ყოველ ვიზიტზე ვამართლებთ.",
      "სრული გამჭვირვალობა და ხარისხის გარანტია — გაჩვენებთ ლაქის რეალურ მდგომარეობას და ვასრულებთ ზუსტად შეთანხმებულ დროს.",
    ],
  },
  reviews: {
    kicker: "04 · შეფასებები",
    title: "რას ამბობენ კლიენტები",
    countSuffix: "შეფასება",
    items: [
      { name: "ალექსი", text: "სრული ლაქის კორექცია და კერამიკული დაფარვა გავიკეთე, პლუს სალონის დეტეილინგი. გუნდმა ყველაფერი ახსნა და ლაქის რეალური მდგომარეობა დეტალურად მაჩვენა." },
      { name: "ვახო მელაია", text: "პოლირების შემდეგ მანქანა ახალივით გამოიყურება — ბრჭყვიალა, სუფთა და უნაკლო. პროფესიონალი და ყურადღებიანი გუნდი." },
      { name: "თამო", text: "ძალიან კმაყოფილი ვარ! პროფესიონალები არიან — მანქანა სრულყოფილად გამიპოლირეს და კერამიკა დამადეს. ქუჩაში რომ გავყავარ, ბრჭყვიალებს!" },
      { name: "კოტე ქარუმიძე", text: "ძალიან კარგი სტუდიაა, ყურადღებიანი მენეჯერი და მაღალხარისხიანი მომსახურება." },
    ],
  },
  pricing: {
    kicker: "05 · პაკეტები",
    title: "პაკეტები",
    popular: "პოპულარული",
    book: "დაჯავშნა",
    items: [
      { name: "ესენში", desc: "გარე რეცხვა, პოლირება, ცვილი." },
      { name: "სტანდარტი", desc: "ლაქის კორექცია, სალონის დეტეილინგი, დაცვა." },
      { name: "პრემიუმ", desc: "სრული კორექცია, კერამიკული დაფარვა, სრული სალონი." },
    ],
  },
  booking: {
    kicker: "06 · დაჯავშნა",
    title: "დაჯავშნე ვიზიტი",
    specialistRole: "დეტეილინგის სპეციალისტი",
    visitDuration: "60 წუთიანი ვიზიტი",
    chooseDate: "აირჩიე თარიღი",
    chooseTime: "აირჩიე დრო",
    book: "დაჯავშნა",
    dayAbbr: ["კვ", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ"],
    address: "მისამართი",
    addressValue: "შროშის ქუჩა 6, თბილისი 0144",
    phone: "ტელეფონი",
    whatsapp: "WhatsApp",
    whatsappCta: "დაწერე შეტყობინება",
    hours: "სამუშაო საათები",
    hoursValue: "10:00 — 20:00-მდე",
  },
  footer: {
    tagline: "პრემიუმ ავტო დეტეილინგი თბილისში.",
    navTitle: "ნავიგაცია",
    contactTitle: "კონტაქტი",
    addressShort: "შროშის ქუჩა 6, თბილისი",
    copyright: "© Car Studio Detailing",
  },
  mobileBar: { call: "დარეკვა", book: "დაჯავშნა" },
};

type Content = typeof ka;

const en: Content = {
  nav: { home: "Home", services: "Services", work: "Our Work", pricing: "Pricing", reviews: "Reviews", contact: "Contact", book: "Book Now" },
  hero: {
    tagline: "Premium Car Detailing · Tbilisi",
    titleLine1: "Perfection in",
    titleHighlight: "Every",
    titleLine2: "Detail",
    subtitle: "Professional paint correction, ceramic coating, and interior detailing — results you can see.",
    bookCta: "Book a Visit",
    call: "Call",
    ratingSuffix: "reviews on Google",
  },
  services: {
    kicker: "01 · Services",
    title: "Our Services",
    book: "Book Now",
    items: [
      { title: "Paint Correction & Polishing", desc: "We remove scratches, holograms, and oxidation, restoring the paint's deep gloss." },
      { title: "Ceramic Coating", desc: "Long-term protection, a hydrophobic effect, and a glossy finish that lasts for years." },
      { title: "Interior Detailing", desc: "Deep dry cleaning, leather care, and full disinfection — an interior like new." },
      { title: "Window Tinting", desc: "Quality tinting for comfort and protection, with a precise, clean fit." },
    ],
  },
  work: {
    kicker: "02 · Our Work",
    title: "See the Difference",
    subtitle: "Drag the handle to see the transformation.",
    before: "Before",
    after: "After",
  },
  why: {
    kicker: "03 · Why Us",
    title: "Why Car Studio",
    items: [
      "A 5.0 rating on Google, backed by 25 real reviews — trust we earn on every single visit.",
      "Full transparency and a quality guarantee — we show you your paint's real condition and finish exactly on schedule.",
    ],
  },
  reviews: {
    kicker: "04 · Reviews",
    title: "What Our Clients Say",
    countSuffix: "reviews",
    items: [
      { name: "Aleksi", text: "I got a full paint correction and ceramic coating done, plus interior detailing. The team explained everything and showed me the real condition of the paint in detail." },
      { name: "Vakho Melaia", text: "After polishing, the car looks brand new — shiny, clean, and flawless. A professional and attentive team." },
      { name: "Tamo", text: "I'm very happy! They're true professionals — they polished my car perfectly and applied a ceramic coating. It shines every time I drive down the street!" },
      { name: "Kote Karumidze", text: "A really great studio, an attentive manager, and high-quality service." },
    ],
  },
  pricing: {
    kicker: "05 · Packages",
    title: "Packages",
    popular: "Popular",
    book: "Book Now",
    items: [
      { name: "Essential", desc: "Exterior wash, polish, wax." },
      { name: "Standard", desc: "Paint correction, interior detailing, protection." },
      { name: "Premium", desc: "Full correction, ceramic coating, complete interior." },
    ],
  },
  booking: {
    kicker: "06 · Booking",
    title: "Book a Visit",
    specialistRole: "Detailing Specialist",
    visitDuration: "60-min visit",
    chooseDate: "Choose a date",
    chooseTime: "Choose a time",
    book: "Book Now",
    dayAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    address: "Address",
    addressValue: "6 Shroshi St, Tbilisi 0144",
    phone: "Phone",
    whatsapp: "WhatsApp",
    whatsappCta: "Send a message",
    hours: "Working Hours",
    hoursValue: "10:00 — 20:00",
  },
  footer: {
    tagline: "Premium car detailing in Tbilisi.",
    navTitle: "Navigation",
    contactTitle: "Contact",
    addressShort: "6 Shroshi St, Tbilisi",
    copyright: "© Car Studio Detailing",
  },
  mobileBar: { call: "Call", book: "Book Now" },
};

const ru: Content = {
  nav: { home: "Главная", services: "Услуги", work: "Наши работы", pricing: "Цены", reviews: "Отзывы", contact: "Контакты", book: "Забронировать" },
  hero: {
    tagline: "Премиальный автодетейлинг · Тбилиси",
    titleLine1: "Совершенство в",
    titleHighlight: "каждой",
    titleLine2: "детали",
    subtitle: "Профессиональная полировка, керамическое покрытие и детейлинг салона — результат, который виден.",
    bookCta: "Забронировать визит",
    call: "Позвонить",
    ratingSuffix: "отзывов в Google",
  },
  services: {
    kicker: "01 · Услуги",
    title: "Наши услуги",
    book: "Забронировать",
    items: [
      { title: "Коррекция и полировка ЛКП", desc: "Удаляем царапины, голограммы и окисление, восстанавливая глубокий блеск лакокрасочного покрытия." },
      { title: "Керамическое покрытие", desc: "Долгосрочная защита, гидрофобный эффект и блестящая поверхность на долгие годы." },
      { title: "Детейлинг салона", desc: "Глубокая химчистка, уход за кожей и полная дезинфекция — салон как новый." },
      { title: "Тонировка стёкол", desc: "Качественная тонировка для комфорта и защиты с точной, аккуратной подгонкой." },
    ],
  },
  work: {
    kicker: "02 · Наши работы",
    title: "Увидеть разницу",
    subtitle: "Перетащите ползунок, чтобы увидеть трансформацию.",
    before: "До",
    after: "После",
  },
  why: {
    kicker: "03 · Преимущества",
    title: "Почему Car Studio",
    items: [
      "Рейтинг 5.0 в Google на основе 25 реальных отзывов — доверие, которое мы оправдываем при каждом визите.",
      "Полная прозрачность и гарантия качества — показываем реальное состояние лакокрасочного покрытия и завершаем работу точно в срок.",
    ],
  },
  reviews: {
    kicker: "04 · Отзывы",
    title: "Что говорят клиенты",
    countSuffix: "отзывов",
    items: [
      { name: "Алекси", text: "Сделал полную коррекцию лакокрасочного покрытия и керамическое покрытие, плюс детейлинг салона. Команда всё объяснила и подробно показала реальное состояние покрытия." },
      { name: "Вахо Мелая", text: "После полировки машина выглядит как новая — блестящая, чистая и безупречная. Профессиональная и внимательная команда." },
      { name: "Тамо", text: "Очень довольна! Настоящие профессионалы — идеально отполировали машину и нанесли керамику. Когда еду по улице, она сияет!" },
      { name: "Коте Карумидзе", text: "Очень хорошая студия, внимательный менеджер и качественное обслуживание." },
    ],
  },
  pricing: {
    kicker: "05 · Пакеты",
    title: "Пакеты",
    popular: "Популярный",
    book: "Забронировать",
    items: [
      { name: "Базовый", desc: "Наружная мойка, полировка, воск." },
      { name: "Стандарт", desc: "Коррекция ЛКП, детейлинг салона, защита." },
      { name: "Премиум", desc: "Полная коррекция, керамическое покрытие, полный салон." },
    ],
  },
  booking: {
    kicker: "06 · Бронирование",
    title: "Забронировать визит",
    specialistRole: "Специалист по детейлингу",
    visitDuration: "Визит 60 минут",
    chooseDate: "Выберите дату",
    chooseTime: "Выберите время",
    book: "Забронировать",
    dayAbbr: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    address: "Адрес",
    addressValue: "ул. Шроши, 6, Тбилиси 0144",
    phone: "Телефон",
    whatsapp: "WhatsApp",
    whatsappCta: "Написать сообщение",
    hours: "Часы работы",
    hoursValue: "10:00 — 20:00",
  },
  footer: {
    tagline: "Премиальный автодетейлинг в Тбилиси.",
    navTitle: "Навигация",
    contactTitle: "Контакты",
    addressShort: "ул. Шроши, 6, Тбилиси",
    copyright: "© Car Studio Detailing",
  },
  mobileBar: { call: "Позвонить", book: "Забронировать" },
};

const CONTENT: Record<Lang, Content> = { ka, en, ru };

const LANGS: Lang[] = ["ka", "en", "ru"];

type LangContextValue = { lang: Lang; setLang: (l: Lang) => void };

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ka");

  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored && LANGS.includes(stored as Lang)) {
      setLangState(stored as Lang);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l;
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}

export function useContent() {
  const { lang } = useLang();
  return CONTENT[lang];
}
