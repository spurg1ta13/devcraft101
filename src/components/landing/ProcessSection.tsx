import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import Reveal from "@/components/motion/Reveal";
import { MotionStagger, MotionItem } from "@/components/motion/MotionStagger";

const icons = [Search, PenTool, Code2, Rocket];

const ProcessSection = () => {
  const { lang } = useLang();
  const p = translations.process;

  return (
    <section id="process" className="relative section-rhythm bg-dot-grid scroll-mt-28 lg:scroll-mt-20" aria-label="Our process">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="container relative z-10 px-4 sm:px-6">
        <Reveal as="header" className="mb-12 md:mb-28">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(p.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(p.heading1, lang)}
            <br />
            <span className="text-gradient">{t(p.heading2, lang)}</span>
          </h2>
        </Reveal>

        <MotionStagger className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {p.steps.map((step, i) => {
            const Icon = icons[i];
            const num = String(i + 1).padStart(2, "0");
            return (
              <MotionItem key={i} hover className="h-full">
                <article className="group relative h-full overflow-hidden bg-secondary border border-border/50 rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 hover:border-primary/30 transition-colors duration-500 min-h-[240px] md:min-h-[280px]">
                  <span className="absolute bottom-2 right-4 md:bottom-4 md:right-6 text-[80px] sm:text-[120px] md:text-[160px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-700" aria-hidden="true">
                    {num}
                  </span>
                  <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-1/3 -translate-y-1/3" aria-hidden="true" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">{num}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-[-0.03em] mb-3 md:mb-4 text-foreground">{t(step.title, lang)}</h3>
                    <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-md">{t(step.desc, lang)}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" aria-hidden="true" />
                </article>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
};

export default ProcessSection;
