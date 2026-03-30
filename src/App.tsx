import { useEffect, useMemo, useRef, useState } from "react";

type FlowMode = "day" | "export" | "evening" | "backup";

type HeroSlide = {
  mode: FlowMode;
  label: string;
};

type ServiceCard = {
  no: string;
  title: string;
  desc: string;
};

const heroSlides: HeroSlide[] = [
  { mode: "day", label: "Daytime Use" },
  { mode: "export", label: "Solar Export" },
  { mode: "evening", label: "Evening Battery" },
  { mode: "backup", label: "Backup Power" },
];

const serviceCards: ServiceCard[] = [
  {
    no: "01",
    title: "Solar Systems",
    desc: "Tailored solar system design, supply and installation for homes and small businesses, based on your usage profile and roof conditions.",
  },
  {
    no: "02",
    title: "Battery Storage",
    desc: "Smart battery solutions designed to increase self-consumption, reduce grid reliance and support reliable day-to-night energy use.",
  },
  {
    no: "03",
    title: "Heat Pump & Water Filtration",
    desc: "High-efficiency heat pump hot water systems and whole-home water filtration solutions for better comfort, water quality and daily living.",
  },
];

const benefits: string[] = [
  "Over 10 years of solar and renewable energy experience",
  "Specialists in solar, battery, heat pump and water filtration systems",
  "Retail supply and professional installation",
  "Solutions designed to reduce electricity bills and increase energy independence",
  "Helping families create more sustainable homes",
];

const process: string[] = [
  "Order confirmed and scheduled",
  "System design and site coordination",
  "Installation planning and delivery tracking",
  "Installation completed within 30 days in standard cases",
];

const heroImages = [
  `${import.meta.env.BASE_URL}hero-installation-1.jpg`,
  `${import.meta.env.BASE_URL}hero-installation-2.jpg`,
  `${import.meta.env.BASE_URL}hero-installation-3.jpg`,
];

function LogoMark() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={`${import.meta.env.BASE_URL}alpha-logo-horizontal.png`}
        alt="Alpha Ecotech"
        className="h-14 w-auto object-contain md:h-16"
      />
    </div>
  );
}

function FlowScreen({ mode }: { mode: FlowMode }) {
  const isDay = mode === "day";
  const isExport = mode === "export";
  const isEvening = mode === "evening";
  const isBackup = mode === "backup";

  const solarTitle = isEvening ? "Solar Idle" : "Solar Active";
  const gridTitle = isBackup ? "Grid Offline" : isExport ? "Export to Grid" : "Grid Support";
  const loadTitle = isBackup ? "Critical Loads" : isEvening ? "Night Supply" : "Home Powered";
  const batteryTitle = isDay
    ? "Charging"
    : isExport
      ? "Battery Full"
      : isEvening
        ? "Discharging"
        : "Reserve Power";

  const solarActive = !isEvening;
  const gridExporting = isExport;
  const batteryDischarging = isEvening || isBackup;

  const leftCardClass = "rounded-2xl border p-4 flex flex-1 flex-col justify-between";
  const rightCardClass = "rounded-2xl border p-4 flex flex-1 flex-col justify-between";

  return (
    <div className="w-full px-1">
      <div className="relative h-[460px] overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-4 shadow-2xl md:h-[500px] md:p-5">
        <style>{`
          @keyframes charge {
            0% { width: 20%; opacity: 0.85; }
            50% { width: 58%; opacity: 1; }
            100% { width: 88%; opacity: 0.95; }
          }
          @keyframes discharge {
            0% { width: 88%; opacity: 1; }
            50% { width: 56%; opacity: 0.95; }
            100% { width: 24%; opacity: 0.85; }
          }
          @keyframes backupdrain {
            0% { width: 72%; opacity: 1; }
            50% { width: 46%; opacity: 0.95; }
            100% { width: 18%; opacity: 0.8; }
          }
          @keyframes loadpulse {
            0% { opacity: 0.65; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.72; transform: scale(0.99); }
          }
        `}</style>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_24%),radial-gradient(circle_at_left,rgba(59,130,246,0.16),transparent_28%)]" />

        <div className="relative flex h-full flex-col">
          <div className="mb-3 shrink-0 md:mb-4">
            <div className="text-[11px] uppercase tracking-[0.16em] text-sky-300 md:text-xs md:tracking-[0.18em]">
              HOW SOLAR + BATTERY WORKS
            </div>
            <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400 md:text-sm">
              This diagram shows how solar panels, the grid, battery storage and your home work together throughout the day, at night and during power outages.
            </p>
          </div>

          <div className="hidden flex-1 gap-4 xl:grid xl:grid-cols-[minmax(0,1fr)_56px_minmax(0,1.15fr)_56px_minmax(0,1fr)] xl:items-stretch">
            <div className="grid h-full grid-rows-2 gap-4">
              <div
                className={`${leftCardClass} ${
                  solarActive ? "border-yellow-300/20 bg-yellow-400/10" : "border-slate-700/30 bg-slate-800/10"
                }`}
              >
                <div>
                  <div className={`text-sm ${solarActive ? "text-yellow-200" : "text-slate-500"}`}>Solar Panels</div>
                  <div className="mt-1.5 text-lg font-semibold text-white">{solarTitle}</div>
                </div>
                <div className="mt-3 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className={`h-9 flex-1 rounded-md transition-all duration-700 ${
                        solarActive ? "bg-yellow-300/80 animate-pulse" : "bg-slate-700/40"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div
                className={`${leftCardClass} ${
                  isBackup ? "border-red-400/10 bg-red-400/5" : "border-violet-300/20 bg-violet-400/10"
                }`}
              >
                <div>
                  <div className={`text-sm ${isBackup ? "text-red-300" : "text-violet-200"}`}>Grid</div>
                  <div className="mt-1.5 text-lg font-semibold text-white">{gridTitle}</div>
                </div>
                <div className="mt-3 h-14 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 p-3">
                  <div
                    className={`h-full rounded-md transition-all duration-1000 ${
                      isBackup
                        ? "w-0"
                        : gridExporting
                          ? "ml-auto w-3/4 bg-violet-400 animate-pulse"
                          : isDay
                            ? "w-1/4 bg-violet-300/40"
                            : "w-1/2 bg-violet-300/70 animate-pulse"
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex h-full flex-col items-center justify-center gap-16 text-2xl">
              <span className={`transition-opacity duration-500 ${solarActive ? "animate-bounce text-yellow-300" : "opacity-0"}`}>
                →
              </span>
              <span className={`transition-all duration-500 ${isBackup ? "opacity-0" : "animate-bounce text-violet-300"}`}>
                {gridExporting ? "←" : "→"}
              </span>
            </div>

            <div className="flex h-full min-h-0 flex-col justify-between rounded-[1.75rem] border border-sky-300/20 bg-sky-400/10 p-4">
              <div>
                <div className="text-sm text-sky-200">Inverter</div>
                <div className="mt-1.5 text-lg font-semibold text-white">Hybrid Inverter Controller</div>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
                The inverter manages energy flow between solar panels, the grid, battery storage and household loads.
              </div>
            </div>

            <div className="flex h-full flex-col items-center justify-center gap-16 text-2xl">
              <span className="animate-bounce text-orange-300">→</span>
              <span className={`animate-bounce text-emerald-300 transition-transform duration-500 ${batteryDischarging ? "rotate-180" : ""}`}>
                →
              </span>
            </div>

            <div className="grid h-full grid-rows-2 gap-4">
              <div className={`${rightCardClass} border-orange-300/20 bg-orange-400/10`}>
                <div>
                  <div className="text-sm text-orange-200">Home / Loads</div>
                  <div className="mt-1.5 text-lg font-semibold text-white">{loadTitle}</div>
                </div>
                <div className="mt-3 flex h-14 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60 px-3 text-center text-sm text-slate-300 animate-[loadpulse_2.6s_ease-in-out_infinite]">
                  Household Energy Use
                </div>
              </div>

              <div className={`${rightCardClass} border-emerald-300/20 bg-emerald-400/10`}>
                <div>
                  <div className="text-sm text-emerald-200">Battery Storage</div>
                  <div className="mt-1.5 text-lg font-semibold text-white">{batteryTitle}</div>
                </div>
                <div className="mt-3 h-14 rounded-xl border border-white/10 bg-slate-950/60 p-2">
                  <div
                    className={`h-full rounded-md transition-all duration-1000 ${
                      isDay
                        ? "bg-emerald-300 animate-[charge_2.8s_ease-in-out_infinite]"
                        : isEvening
                          ? "bg-emerald-300 animate-[discharge_2.8s_ease-in-out_infinite]"
                          : isExport
                            ? "w-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                            : "bg-emerald-200 animate-[backupdrain_3.2s_ease-in-out_infinite]"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid flex-1 content-start gap-2.5 xl:hidden">
            <div className="grid grid-cols-2 gap-2">
              <div className={`rounded-xl border p-3 ${solarActive ? "border-yellow-300/20 bg-yellow-400/10" : "border-slate-700/30 bg-slate-800/10"}`}>
                <div className={`text-xs ${solarActive ? "text-yellow-200" : "text-slate-500"}`}>Solar</div>
                <div className="mt-1 text-sm font-semibold text-white">{solarTitle}</div>
              </div>
              <div className={`rounded-xl border p-3 ${isBackup ? "border-red-400/10 bg-red-400/5" : "border-violet-300/20 bg-violet-400/10"}`}>
                <div className={`text-xs ${isBackup ? "text-red-300" : "text-violet-200"}`}>Grid</div>
                <div className="mt-1 text-sm font-semibold text-white">{gridTitle}</div>
              </div>
            </div>

            <div className="flex justify-around text-sm leading-none text-slate-500">
              <span>{solarActive ? "↓" : " "}</span>
              <span>{isBackup ? " " : gridExporting ? "↑" : "↓"}</span>
            </div>

            <div className="rounded-xl border border-sky-300/20 bg-sky-400/10 p-3">
              <div className="text-xs text-sky-200">Inverter</div>
              <div className="mt-1 text-sm font-semibold text-white">Energy Controller</div>
              <div className="mt-2 text-xs leading-5 text-slate-300">
                Directs energy between solar, battery, grid and home usage.
              </div>
            </div>

            <div className="flex justify-around text-sm leading-none text-slate-500">
              <span>↓</span>
              <span>{batteryDischarging ? "↑" : "↓"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-orange-300/20 bg-orange-400/10 p-3">
                <div className="text-xs text-orange-200">Home</div>
                <div className="mt-1 text-sm font-semibold text-white">{loadTitle}</div>
              </div>
              <div className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3">
                <div className="text-xs text-emerald-200">Battery</div>
                <div className="mt-1 text-sm font-semibold text-white">{batteryTitle}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnergyFlowCarousel({
  activeIndex,
  onActiveIndexChange,
}: {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
}) {
  const touchStartX = useRef<number | null>(null);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-slate-100 p-4 md:p-6">
      <div className="mb-4 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="inline-flex min-w-max items-center gap-2">
          {heroSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={slide.mode}
                type="button"
                onClick={() => onActiveIndexChange(index)}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition md:px-5 ${
                  isActive
                    ? "bg-yellow-400 text-slate-950 shadow-sm"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {slide.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="overflow-hidden"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const startX = touchStartX.current;
          const endX = e.changedTouches[0]?.clientX ?? null;
          touchStartX.current = null;
          if (startX === null || endX === null) return;
          const deltaX = endX - startX;
          if (Math.abs(deltaX) < 40) return;
          if (deltaX < 0) {
            onActiveIndexChange((activeIndex + 1) % heroSlides.length);
          } else {
            onActiveIndexChange((activeIndex - 1 + heroSlides.length) % heroSlides.length);
          }
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {heroSlides.map((slide) => (
            <div key={slide.mode} className="min-w-full">
              <FlowScreen mode={slide.mode} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SolarOnePageHomepage() {
  const [heroImageIndex, setHeroImageIndex] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isFlowAutoPlaying, setIsFlowAutoPlaying] = useState<boolean>(true);

  const hero = useMemo(
    () => ({
      eyebrow: "Perth Solar • Battery • Heat Pump Solutions",
      title: "Smarter Energy Solutions for Perth Homes",
      subtitle:
        "We design and install solar, battery and heat pump systems that make homes more efficient, more comfortable and better prepared for rising energy costs.",
    }),
    [],
  );

  useEffect(() => {
    if (!isFlowAutoPlaying) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [isFlowAutoPlaying]);

  useEffect(() => {
    const heroTimer = window.setInterval(() => {
      setHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 4200);

    return () => window.clearInterval(heroTimer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <LogoMark />
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="tel:0861509588"
              className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              08 6150 9588
            </a>
            <a
              href="#contact"
              className="rounded-2xl bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:translate-y-[-1px]"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(250,204,21,0.18),transparent_24%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="mb-4 inline-flex rounded-full border border-white/15 px-4 py-1 text-sm text-slate-200">
                {hero.eyebrow}
              </p>

              <h1 className="max-w-2xl text-4xl font-semibold leading-tight md:text-6xl">
                Smarter Solar &amp; Battery
                <br />
                Solutions for Perth Homes
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
                Professional design and installation of solar panels, battery storage, heat pump systems and whole-home water filtration solutions. Helping Perth families build more efficient, comfortable and healthier homes.
              </p>

              <div className="mt-6 grid gap-2 text-sm text-slate-300">
                <div>✔ Solar Panel Installation</div>
                <div>✔ Battery Storage Systems</div>
                <div>✔ Heat Pump Hot Water</div>
                <div>✔ Whole-Home Water Filtration</div>
                <div>✔ Professional Installation Team</div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg transition hover:translate-y-[-1px]"
                >
                  Request a Quote
                </a>

                <a
                  href="tel:0861509588"
                  className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Call 08 6150 9588
                </a>
              </div>
            </div>

            <div>
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
                <div className="relative h-[420px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#0f172a,#1e293b)]">
                  {heroImages.map((image, index) => (
                    <div
                      key={image}
                      className={`absolute inset-0 transition-opacity duration-700 ${heroImageIndex === index ? "opacity-100" : "opacity-0"}`}
                    >
                      <img
                        src={image}
                        alt={`Alpha Ecotech installation ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/80 to-transparent p-5">
                    <div>
                      <div className="text-xs uppercase tracking-[0.18em] text-slate-300">Installation Showcase</div>
                      <div className="mt-1 text-sm text-white">Real Alpha Ecotech project photography</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {heroImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setHeroImageIndex(index)}
                          className={`h-2.5 rounded-full transition-all ${heroImageIndex === index ? "w-8 bg-yellow-400" : "w-2.5 bg-white/40"}`}
                          aria-label={`Show installation image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-16">
        <EnergyFlowCarousel
          activeIndex={activeSlide}
          onActiveIndexChange={(index) => {
            setActiveSlide(index);
            setIsFlowAutoPlaying(false);
          }}
        />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">What We Offer</p>
          <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Complete home energy upgrade solutions</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Whether you are installing your first solar system, adding a battery, or replacing an old hot water unit with an efficient heat pump, we provide practical advice, reliable products and professional installation.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {serviceCards.map((item) => (
            <div key={item.no} className="rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-sm">
              <div className="text-sm font-medium text-slate-400">{item.no}</div>
              <h3 className="mt-3 text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 md:px-10 md:py-24">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-sky-700">Project Delivery</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Solar Installation Completed in Around 30 Days</h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              We run a highly organised installation process designed to move projects from contract to installation as efficiently as possible. Our team coordinates system design, scheduling, product delivery and installation through a structured workflow.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              In most standard residential cases, installation can be completed within approximately <strong>30 days after signing</strong>. This means you can start generating solar power and reducing electricity costs much sooner.
            </p>
          </div>
          <div className="grid gap-4">
            {process.map((item) => (
              <div key={item} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                <div className="text-base font-medium">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="rounded-[2rem] bg-slate-950 px-8 py-10 text-white md:px-12 md:py-14">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Why Choose Us</p>
              <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Reliable Local Solar Installation Team</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Alpha Ecotech provides complete solar, battery, heat pump and water filtration installation services across Perth. Our team focuses on practical system design, reliable equipment and professional installation.
              </p>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                We help homeowners reduce electricity costs, improve energy independence and upgrade their homes with modern renewable energy systems.
              </p>
            </div>
            <div className="grid gap-3">
              {benefits.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                  <span className="mr-3 text-slate-400">0{index + 1}</span>
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-yellow-50 to-sky-50 p-8 md:p-12">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Contact</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Ready to upgrade your energy system?</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Call or email us today to discuss solar, battery, heat pump and water filtration options for your property. We will help you find a solution that suits your usage, budget and installation needs.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <a href="tel:0861509588" className="rounded-2xl bg-slate-950 px-6 py-5 text-white shadow-sm">
                <div className="text-sm text-slate-400">Phone</div>
                <div className="mt-1 text-xl font-semibold">08 6150 9588</div>
              </a>
              <a
                href="mailto:info@alphaecotech.com.au"
                className="rounded-2xl bg-white px-6 py-5 text-slate-900 shadow-sm ring-1 ring-slate-200"
              >
                <div className="text-sm text-slate-400">Email</div>
                <div className="mt-1 text-xl font-semibold">info@alphaecotech.com.au</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <img src={`${import.meta.env.BASE_URL}alpha-logo-horizontal.png`} alt="Alpha Ecotech" className="h-14 w-auto object-contain md:h-16" />
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Alpha Ecotech provides solar, battery storage, heat pump hot water and whole-home water filtration systems for Perth homes. Our goal is to help families reduce electricity costs and build more energy-efficient homes.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Contact</div>
              <div className="mt-4 space-y-2 text-sm">
                <div>Phone: 08 6150 9588</div>
                <div>Email: info@alphaecotech.com.au</div>
                <div>Address: Perth, Western Australia</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Services</div>
              <div className="mt-4 space-y-2 text-sm">
                <div>Solar Panel Installation</div>
                <div>Battery Storage Systems</div>
                <div>Heat Pump Hot Water</div>
                <div>Whole-Home Water Filtration</div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
            © {new Date().getFullYear()} Alpha Ecotech Pty Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export const smokeTests = [
  {
    name: "hero has 3 images",
    pass: heroImages.length === 3,
  },
  {
    name: "flow has 4 states",
    pass: heroSlides.length === 4,
  },
  {
    name: "flow labels are unique",
    pass: new Set(heroSlides.map((slide) => slide.label)).size === heroSlides.length,
  },
  {
    name: "flow modes are expected",
    pass: heroSlides.map((slide) => slide.mode).join(",") === "day,export,evening,backup",
  },
  {
    name: "contact email is updated",
    pass: "info@alphaecotech.com.au".includes("@alphaecotech.com.au"),
  },
  {
    name: "contact phone is updated",
    pass: "0861509588".length === 10,
  },
];
