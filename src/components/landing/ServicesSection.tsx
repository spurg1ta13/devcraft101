import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";

const ServicesSection = () => {
  const { lang } = useLang();
  const s = translations.services;
  const { ref, inView } = useInView();

  return (
    <section id="services" className="relative section-rhythm" aria-label="Services">
      <div className="container px-4 sm:px-6" ref={ref}>
        <div
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
        </div>

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
                <ArrowUpRight className="service-arrow h-5 w-5 text-muted-foreground/50 transition-all duration-500 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
