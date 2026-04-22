import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";
import { Cloud, CalendarCheck, Rocket, Building2, LayoutDashboard, Hotel, Anchor } from "lucide-react";

const buildIcons = [Cloud, CalendarCheck, Rocket, Building2, LayoutDashboard, Hotel, Anchor];

const ServicesSection = () => {
  const { lang } = useLang();
  const s = translations.services;
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative section-rhythm scroll-mt-28 lg:scroll-mt-20" aria-label={t(s.label, lang)}>
      <div className="container px-4 sm:px-6" ref={ref}>
        <header
          className={`mb-12 md:mb-28 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(s.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(s.heading1, lang)}
            <br />
            <span className="text-gradient">{t(s.heading2, lang)}</span>
          </h2>
        </header>

        <div className="border-t border-border/30" role="list">
          {s.items.map((service, i) => (
            <div
              key={i}
              className={`transition-all duration-700 ${
                inView ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
              role="listitem"
            >
              <div className="service-row relative border-b border-border/30 py-6 md:py-10 flex items-center gap-4 md:gap-12 cursor-pointer group hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] rounded-2xl min-h-[72px]">
                <span className="service-number font-mono text-xs text-muted-foreground/60 transition-colors duration-500 w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl sm:text-2xl md:text-5xl font-black tracking-[-0.04em] group-hover:text-gradient transition-all duration-500">
                    {t(service.title, "en")}
                  </h3>
                  <p className="font-mono text-[10px] md:text-xs text-muted-foreground mt-1 uppercase tracking-[0.1em]">
                    {t(service.scope, "en")}
                  </p>
                </div>
                <p className="hidden lg:block text-sm text-foreground/70 max-w-xs leading-relaxed">
                  {t(service.description, lang)}
                </p>
                
              </div>
            </div>
          ))}
        </div>

        {/* What we can build — solution cards */}
        <div className="mt-20 md:mt-32">
          <header
            className={`mb-10 md:mb-16 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
              {t(s.buildLabel, lang)}
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.95]">
              {t(s.buildHeading1, lang)}{" "}
              <span className="text-gradient">{t(s.buildHeading2, lang)}</span>
            </h3>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {s.builds.map((item, i) => {
              const Icon = buildIcons[i] ?? Rocket;
              return (
                <article
                  key={i}
                  className={`group relative overflow-hidden rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 hover:border-primary/40 hover:bg-card/60 hover:-translate-y-1 hover:shadow-[0_20px_60px_-20px_hsl(38_100%_55%/0.35)] ${
                    inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
                >
                  <div className="relative flex flex-col gap-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold tracking-tight mb-2 group-hover:text-gradient transition-all duration-500">
                        {t(item.title, lang)}
                      </h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {t(item.description, lang)}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
