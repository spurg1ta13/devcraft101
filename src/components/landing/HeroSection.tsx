import { useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const HeroSection = () => {
  const ref = useRef(null);
  const { lang } = useLang();
  const hero = translations.hero;

  return (
    <section ref={ref} className="relative min-h-[85dvh] md:h-[100dvh] md:min-h-[600px] flex flex-col overflow-hidden noise pt-28 md:pt-0" aria-label="Hero">
      {/* LCP image — standard <img>, eager, high priority, no animation */}
      <div className="absolute inset-0">
        <img
          src="/hero-banner.webp"
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="sync"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="container relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-6">
        {/* Static text — zero animations on initial load */}
        <div className="mb-3 md:mb-4">
          <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
            {t(hero.line1, lang)}
          </h1>
        </div>
        <div className="mb-6 md:mb-8">
          <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
            <span className="text-gradient italic">{t(hero.line2, lang)}</span>
            <span className="text-gradient">.</span>
          </h1>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 pt-6 md:pt-8 border-t border-border/30">
            <p className="text-foreground text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-medium">
              {t(hero.description, lang)}
            </p>
            <a
              href="#services"
              className="bg-primary text-primary-foreground font-bold text-sm px-8 py-4 min-h-[48px] rounded-full shadow-glow font-mono uppercase tracking-[0.1em] text-center flex items-center justify-center hover:brightness-110 active:scale-[0.98] transition-all"
            >
              {t(hero.explore, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;