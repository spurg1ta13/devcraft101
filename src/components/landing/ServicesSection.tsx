import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import showcase1 from "@/assets/showcase-1.jpg";
import showcase2 from "@/assets/showcase-2.jpg";
import showcase3 from "@/assets/showcase-3.jpg";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const images = [showcase1, showcase2, showcase3];

const ServicesSection = () => {
  const { lang } = useLang();
  const s = translations.services;

  return (
    <section id="services" className="relative section-rhythm" aria-label="Services">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-28"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(s.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(s.heading1, lang)}
            <br />
            <span className="text-gradient">{t(s.heading2, lang)}</span>
          </h2>
        </motion.div>

        <div className="border-t border-border/30" role="list">
          {s.items.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
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
                <div className="service-image absolute right-20 top-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-3xl overflow-hidden opacity-0 scale-90 transition-all duration-700 pointer-events-none hidden lg:block z-0" aria-hidden="true">
                  <img src={images[i]} alt="" className="w-full h-full object-cover opacity-30" style={{ mixBlendMode: "screen" }} loading="lazy" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
