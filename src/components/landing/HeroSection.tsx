import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { preloadUpTo } from "@/lib/lazyLanding";

const HeroSection = () => {
  const ref = useRef(null);
  const { lang } = useLang();
  const hero = translations.hero;

  return (
    <section ref={ref} className="relative min-h-[85dvh] md:h-[100dvh] md:min-h-[600px] flex flex-col overflow-hidden noise pt-28 md:pt-0" aria-label="Hero">
      {/* LCP image — standard <img>, eager, high priority, no animation */}
      <div className="absolute inset-0">
        <picture>
          <source media="(max-width: 768px)" srcSet="/hero-banner-mobile.webp" type="image/webp" />
          <img
            src="/hero-banner.webp"
            alt="DevCraft web development studio hero banner"
            width={1920}
            height={1080}
            fetchPriority="high"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover opacity-20"
          />
        </picture>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="container relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-6">
        {/* Static text — zero animations on initial load */}
        <div className="mb-2 md:mb-3">
          <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
            {t(hero.line1, lang)}
          </h1>
        </div>
        <div className="mb-3 md:mb-4">
          <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
            <span className="text-gradient italic">{t(hero.line2, lang)}</span>
            <span className="text-gradient">.</span>
          </h1>
        </div>
        <div className="mb-6 md:mb-8">
          <p className="text-[clamp(1.5rem,5vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-foreground/90">
            {t(hero.line3, lang)}
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 pt-6 md:pt-8 border-t border-border/30">
            <p className="text-foreground text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-medium whitespace-pre-line">
              {t(hero.description, lang)}
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                const offset = window.innerWidth < 1024 ? 80 : 60;
                const scrollTo = () => {
                  const el = document.getElementById("contact");
                  if (!el) return false;
                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: "smooth" });
                  return true;
                };

                // Preload all lazy chunks above + including #contact, then scroll precisely.
                const preload = preloadUpTo("contact");

                // Try immediately for snappy UX if already mounted.
                if (scrollTo()) {
                  preload.finally(() => {
                    requestAnimationFrame(() => setTimeout(scrollTo, 80));
                  });
                  return;
                }

                preload.finally(() => {
                  let attempts = 0;
                  const tryScroll = () => {
                    if (scrollTo()) {
                      setTimeout(scrollTo, 200);
                      return;
                    }
                    if (attempts++ < 30) {
                      requestAnimationFrame(() => setTimeout(tryScroll, 50));
                    }
                  };
                  tryScroll();
                });
              }}
              className="relative self-start sm:self-auto bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-6 sm:px-8 py-3 sm:py-4 min-h-[44px] sm:min-h-[48px] rounded-full shadow-glow font-mono uppercase tracking-[0.1em] text-center inline-flex items-center justify-center hover:brightness-110 active:scale-[0.98] transition-all animate-cta-pulse"
            >
              <span className="absolute inset-0 rounded-full bg-primary/60 animate-cta-ring -z-10" aria-hidden="true" />
              {t(hero.explore, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;