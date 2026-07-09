import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, X, Phone, MapPin, Clock, MessageCircle, Star, ArrowRight } from "lucide-react";
import { LangProvider, useLang, useContent, type Lang } from "@/lib/i18n";

export const Route = createFileRoute("/")({ component: Index });

const PHONE_DISPLAY = "599 14 82 42";
const PHONE_TEL = "+995599148242";
const WHATSAPP = "https://wa.me/995599148242";

const NAV_HREFS = ["#hero", "#services", "#work", "#pricing", "#reviews", "#contact"] as const;
const NAV_KEYS = ["home", "services", "work", "pricing", "reviews", "contact"] as const;

const LANG_LABELS: Record<Lang, string> = { ka: "KA", en: "EN", ru: "RU" };

function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`flex items-center gap-1 text-xs tracking-wider ${className}`}>
      {(["ka", "en", "ru"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-2 py-1 transition ${l === lang ? "text-[var(--gold)]" : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"}`}
        >
          {LANG_LABELS[l]}
        </button>
      ))}
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const t = useContent();
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0A0A0B]/95 backdrop-blur-sm hairline-b py-3" : "bg-transparent py-5"}`}>
        <div className="mx-auto max-w-7xl px-5 lg:px-10 flex items-center justify-between">
          <a href="#hero" className="flex flex-col leading-none">
            <span className="text-[var(--foreground)] text-lg lg:text-xl font-medium tracking-[0.25em] uppercase">Car Studio</span>
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] mt-1">DETAILING</span>
          </a>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_HREFS.map((href, i) => (
              <a key={href} href={href} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition">{t.nav[NAV_KEYS[i]]}</a>
            ))}
            <LangSwitcher />
            <a href="#contact" className="border border-[var(--gold)] text-[var(--gold)] px-5 py-2 text-sm hover:bg-[var(--gold)] hover:text-black transition">{t.nav.book}</a>
          </nav>
          <button className="lg:hidden text-[var(--foreground)]" onClick={() => setOpen(true)} aria-label="Menu"><Menu size={26} /></button>
        </div>
      </header>
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0B] flex flex-col">
          <div className="flex items-center justify-between px-5 py-5 hairline-b">
            <span className="text-lg tracking-[0.25em] uppercase">Car Studio</span>
            <button onClick={() => setOpen(false)} aria-label="Close"><X size={26} /></button>
          </div>
          <nav className="flex flex-col p-8 gap-6">
            {NAV_HREFS.map((href, i) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="text-2xl font-serif-ge">{t.nav[NAV_KEYS[i]]}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-4 border border-[var(--gold)] text-[var(--gold)] px-5 py-3 text-center">{t.nav.book}</a>
            <LangSwitcher className="mt-4 justify-center gap-4 [&_button]:text-base" />
          </nav>
        </div>
      )}
    </>
  );
}

function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const t = useContent();
  useEffect(() => {
    const on = () => { if (bgRef.current) bgRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`; };
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <section id="hero" className="relative isolate min-h-screen flex items-center overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 -z-10 will-change-transform">
        <video
          className="h-full w-full object-cover brightness-125 contrast-105"
          poster="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=2000&q=80"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* მსუბუქი მუქი ფენა მხოლოდ ტექსტის კონტრასტისთვის — ვიდეო კარგად უნდა ჩანდეს */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/55" />
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10 pt-32 pb-20 w-full [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
        <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-6 reveal">{t.hero.tagline}</p>
        <h1 className="text-[2.5rem] sm:text-6xl lg:text-8xl leading-[1.05] max-w-4xl font-medium reveal break-words hyphens-auto">
          {t.hero.titleLine1} <br /><span className="text-[var(--gold)] italic">{t.hero.titleHighlight}</span> {t.hero.titleLine2}
        </h1>
        <p className="mt-8 max-w-xl text-lg text-[var(--muted-foreground)] leading-relaxed reveal">
          {t.hero.subtitle}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 reveal">
          <a href="#contact" className="bg-[var(--gold)] text-black px-8 py-4 text-sm tracking-wider uppercase hover:bg-[#b8955a] transition inline-flex items-center justify-center gap-2">
            {t.hero.bookCta} <ArrowRight size={16} />
          </a>
          <a href={`tel:${PHONE_TEL}`} className="border border-[var(--foreground)]/40 px-8 py-4 text-sm tracking-wider uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition inline-flex items-center justify-center gap-2">
            <Phone size={16} /> {t.hero.call}: {PHONE_DISPLAY}
          </a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-sm text-[var(--muted-foreground)] reveal">
          <div className="flex text-[var(--gold)]">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <span>5.0 · 25 {t.hero.ratingSuffix}</span>
        </div>
      </div>
    </section>
  );
}

const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1400&q=80",
  "https://images.unsplash.com/photo-1600661653561-629509216228?w=1400&q=80",
  "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=1400&q=80",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1400&q=80",
];

function Services() {
  const t = useContent();
  return (
    <section id="services" className="py-16 lg:py-24 hairline-t">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 max-w-2xl reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.services.kicker}</p>
          <h2 className="text-4xl lg:text-6xl">{t.services.title}</h2>
        </div>
        <div className="space-y-16 lg:space-y-24">
          {t.services.items.map((s, i) => (
            <div key={s.title} className={`grid lg:grid-cols-2 gap-10 lg:gap-20 items-center reveal ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={SERVICE_IMAGES[i]} alt={s.title} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition duration-700" loading="lazy" />
              </div>
              <div>
                <p className="text-[var(--gold)] text-xs tracking-[0.3em] mb-4">0{i + 1}</p>
                <h3 className="text-3xl lg:text-4xl mb-6 leading-tight">{s.title}</h3>
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-md">{s.desc}</p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--gold)] border-b border-[var(--gold)] pb-1 hover:gap-4 transition-all">
                  {t.services.book} <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSlider({ img }: { img: string }) {
  const t = useContent();
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  };

  useEffect(() => {
    const mm = (e: MouseEvent) => dragging.current && move(e.clientX);
    const tm = (e: TouchEvent) => dragging.current && move(e.touches[0].clientX);
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", mm);
    window.addEventListener("touchmove", tm);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden cursor-ew-resize select-none gold-border"
      onMouseDown={(e) => { dragging.current = true; move(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; move(e.touches[0].clientX); }}
    >
      {/* after — full color */}
      <div className="absolute inset-0">
        <img src={img} alt={t.work.after} className="w-full h-full object-cover" loading="lazy" draggable={false} />
        <span className="absolute bottom-2 right-2 bg-[var(--gold)] text-black text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-1.5 py-0.5">{t.work.after}</span>
      </div>
      {/* before — darkened/desaturated layer */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={img} alt={t.work.before} className="w-full h-full object-cover grayscale brightness-[.65] contrast-90" loading="lazy" draggable={false} />
        <span className="absolute bottom-2 left-2 bg-black/70 text-[var(--foreground)] text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-1.5 py-0.5">{t.work.before}</span>
      </div>
      <div className="absolute top-0 bottom-0 w-px bg-[var(--gold)] pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-10 sm:h-10 bg-[var(--gold)] flex items-center justify-center text-black text-xs">⇔</div>
      </div>
    </div>
  );
}

const WORK = [
  "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1000&q=80",
  "https://images.unsplash.com/photo-1600661653561-629509216228?w=1000&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000&q=80",
];

function BeforeAfter() {
  const t = useContent();
  return (
    <section id="work" className="py-16 lg:py-24 hairline-t bg-[#0c0c0d]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 max-w-2xl reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.work.kicker}</p>
          <h2 className="text-4xl lg:text-6xl">{t.work.title}</h2>
          <p className="mt-6 text-[var(--muted-foreground)] text-lg">{t.work.subtitle}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6 reveal">
          {WORK.map((img) => <BeforeAfterSlider key={img} img={img} />)}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const t = useContent();
  return (
    <section className="py-16 lg:py-24 hairline-t">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 max-w-2xl reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.why.kicker}</p>
          <h2 className="text-4xl lg:text-6xl">{t.why.title}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-[var(--hairline)] reveal">
          {t.why.items.map((text, i) => (
            <div key={i} className="bg-[var(--background)] p-10 lg:p-14">
              <div className="text-[var(--gold)] text-5xl font-serif-ge mb-6">0{i + 1}</div>
              <div className="w-10 h-px bg-[var(--gold)] mb-6" />
              <p className="text-xl lg:text-2xl leading-snug font-serif-ge">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const t = useContent();
  return (
    <section id="reviews" className="py-16 lg:py-24 hairline-t bg-[#0c0c0d]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.reviews.kicker}</p>
          <h2 className="text-4xl lg:text-6xl mb-8">{t.reviews.title}</h2>
          <div className="flex items-center gap-4">
            <span className="text-5xl font-serif-ge text-[var(--gold)]">5.0</span>
            <div>
              <div className="flex text-[var(--gold)]">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
              </div>
              <p className="text-sm text-[var(--muted-foreground)] mt-1">25 {t.reviews.countSuffix}</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-px bg-[var(--hairline)] reveal">
          {t.reviews.items.map((r) => (
            <div key={r.name} className="bg-[var(--background)] p-8 lg:p-12">
              <div className="flex text-[var(--gold)] mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <p className="text-[var(--foreground)] leading-relaxed text-lg mb-6 font-serif-ge">„{r.text}"</p>
              <p className="text-sm tracking-[0.2em] uppercase text-[var(--muted-foreground)]">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const PACKAGE_PRICES = ["500", "700", "1000"];
const FEATURED_PACKAGE_INDEX = 1;

function Pricing() {
  const t = useContent();
  return (
    <section id="pricing" className="py-16 lg:py-24 hairline-t">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 max-w-2xl reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.pricing.kicker}</p>
          <h2 className="text-4xl lg:text-6xl">{t.pricing.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 reveal">
          {t.pricing.items.map((p, i) => (
            <div key={p.name} className={`bg-[#141416] p-10 flex flex-col ${i === FEATURED_PACKAGE_INDEX ? "gold-border relative" : "border border-[var(--hairline)]"}`}>
              {i === FEATURED_PACKAGE_INDEX && (
                <span className="absolute -top-3 left-10 bg-[var(--gold)] text-black text-[10px] tracking-[0.3em] uppercase px-3 py-1">{t.pricing.popular}</span>
              )}
              <h3 className="text-2xl mb-6">{p.name}</h3>
              <div className="mb-8">
                <span className="text-6xl font-serif-ge text-[var(--foreground)]">{PACKAGE_PRICES[i]}</span>
                <span className="text-2xl text-[var(--gold)] ml-1">₾</span>
              </div>
              <div className="w-full h-px bg-[var(--hairline)] mb-6" />
              <p className="text-[var(--muted-foreground)] leading-relaxed mb-10 flex-grow">{p.desc}</p>
              <a href="#contact" className={`text-center py-3 text-sm tracking-wider uppercase transition ${i === FEATURED_PACKAGE_INDEX ? "bg-[var(--gold)] text-black hover:bg-[#b8955a]" : "border border-[var(--foreground)]/30 hover:border-[var(--gold)] hover:text-[var(--gold)]"}`}>
                {t.pricing.book}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const MOCK_TIMES = ["10:00", "11:00", "12:00", "13:30", "15:00", "16:00", "17:30", "18:30"];

function MockCalendar() {
  const t = useContent();
  const days = [...Array(6)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return { label: t.booking.dayAbbr[d.getDay()], num: d.getDate() };
  });
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(MOCK_TIMES[2]);

  return (
    <div className="gold-border p-8 lg:p-10 w-full self-start">
      <div className="flex items-center gap-4 mb-8 pb-8 hairline-b">
        <div className="w-14 h-14 rounded-full bg-[var(--gold)] text-black flex items-center justify-center text-lg font-serif-ge shrink-0">NB</div>
        <div>
          <p className="text-lg font-serif-ge leading-tight">Nika Berdznishvili</p>
          <p className="text-sm text-[var(--muted-foreground)]">{t.booking.specialistRole} · {t.booking.visitDuration}</p>
        </div>
      </div>
      <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-4">{t.booking.chooseDate}</p>
      <div className="grid grid-cols-6 gap-2 mb-8">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelectedDay(i)}
            className={`flex flex-col items-center py-3 border transition ${i === selectedDay ? "border-[var(--gold)] bg-[var(--gold)] text-black" : "border-[var(--hairline)] hover:border-[var(--gold)]"}`}
          >
            <span className="text-[10px] uppercase tracking-wider">{d.label}</span>
            <span className="text-lg font-serif-ge">{d.num}</span>
          </button>
        ))}
      </div>
      <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-4">{t.booking.chooseTime}</p>
      <div className="grid grid-cols-4 gap-2 mb-8">
        {MOCK_TIMES.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            className={`py-3 text-sm border transition ${time === selectedTime ? "border-[var(--gold)] bg-[var(--gold)] text-black" : "border-[var(--hairline)] hover:border-[var(--gold)]"}`}
          >
            {time}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="w-full bg-[var(--gold)] text-black py-4 text-sm tracking-[0.3em] uppercase hover:bg-[#b8955a] transition"
      >
        {t.booking.book}
      </button>
    </div>
  );
}

function Booking() {
  const t = useContent();
  return (
    <section id="contact" className="py-16 lg:py-24 hairline-t bg-[#0c0c0d]">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="mb-10 lg:mb-14 max-w-2xl reveal">
          <p className="text-[var(--gold)] text-xs tracking-[0.35em] uppercase mb-4">{t.booking.kicker}</p>
          <h2 className="text-4xl lg:text-6xl">{t.booking.title}</h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 reveal">
          <MockCalendar />
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-[var(--gold)] shrink-0 mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-1">{t.booking.address}</p>
                  <p className="text-lg">{t.booking.addressValue}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-[var(--gold)] shrink-0 mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-1">{t.booking.phone}</p>
                  <a href={`tel:${PHONE_TEL}`} className="text-lg hover:text-[var(--gold)]">{PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <MessageCircle className="text-[var(--gold)] shrink-0 mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-1">{t.booking.whatsapp}</p>
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="text-lg hover:text-[var(--gold)]">{t.booking.whatsappCta}</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-[var(--gold)] shrink-0 mt-1" size={20} strokeWidth={1.5} />
                <div>
                  <p className="text-xs tracking-[0.25em] uppercase text-[var(--muted-foreground)] mb-1">{t.booking.hours}</p>
                  <p className="text-lg">{t.booking.hoursValue}</p>
                </div>
              </div>
            </div>
            <div className="aspect-[4/3] gold-border overflow-hidden">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Shroshi+Street+6,+Tbilisi+0144&output=embed"
                className="w-full h-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const t = useContent();
  return (
    <footer className="hairline-t py-16 pb-28 lg:pb-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-10 grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex flex-col leading-none mb-4">
            <span className="text-xl tracking-[0.25em] uppercase">Car Studio</span>
            <span className="text-[10px] tracking-[0.4em] text-[var(--gold)] mt-1">DETAILING</span>
          </div>
          <p className="text-[var(--muted-foreground)] text-sm">{t.footer.tagline}</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">{t.footer.navTitle}</p>
          <ul className="space-y-2">
            {NAV_HREFS.map((href, i) => <li key={href}><a href={href} className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">{t.nav[NAV_KEYS[i]]}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] mb-4">{t.footer.contactTitle}</p>
          <ul className="space-y-2 text-sm text-[var(--muted-foreground)]">
            <li><a href={`tel:${PHONE_TEL}`} className="hover:text-[var(--foreground)]">{PHONE_DISPLAY}</a></li>
            <li>{t.footer.addressShort}</li>
            <li><a href={WHATSAPP} target="_blank" rel="noopener" className="hover:text-[var(--foreground)]">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 lg:px-10 mt-12 pt-8 hairline-t">
        <p className="text-xs text-[var(--muted-foreground)] tracking-wider">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}

function MobileBar() {
  const t = useContent();
  return (
    <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 hairline-t bg-[#0A0A0B]/95 backdrop-blur">
      <a href={`tel:${PHONE_TEL}`} className="py-4 text-center text-sm tracking-wider uppercase border-r border-[var(--hairline)] flex items-center justify-center gap-2">
        <Phone size={16} /> {t.mobileBar.call}
      </a>
      <a href="#contact" className="py-4 text-center text-sm tracking-wider uppercase bg-[var(--gold)] text-black">
        {t.mobileBar.book}
      </a>
    </div>
  );
}

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp"
      className="hidden lg:flex fixed bottom-8 right-8 z-40 w-14 h-14 bg-[var(--gold)] text-black items-center justify-center hover:scale-105 transition shadow-xl"
    >
      <MessageCircle size={24} strokeWidth={1.75} />
    </a>
  );
}

function Index() {
  useReveal();
  return (
    <LangProvider>
      <main className="bg-[var(--background)] text-[var(--foreground)]">
        <Nav />
        <Hero />
        <Services />
        <BeforeAfter />
        <WhyUs />
        <Reviews />
        <Pricing />
        <Booking />
        <Footer />
        <MobileBar />
        <WhatsAppFab />
      </main>
    </LangProvider>
  );
}
