import { Sparkles, Cpu, Rocket, TrendingUp } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const ICONS = [Sparkles, Cpu, Rocket, TrendingUp];

/**
 * CSS-only staggered stepper (no JS animation runtime) so it costs nothing
 * on the mobile main thread during LCP.
 */
const HeroSteps = () => {
  const { lang } = useLang();
  const steps = translations.hero.steps;
  const labels = [steps.s1, steps.s2, steps.s3, steps.s4];

  return (
    <ol
      className="mb-6 md:mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-3"
      aria-label={t(steps.title, lang)}
    >
      {labels.map((label, i) => {
        const Icon = ICONS[i];
        const last = i === 3;
        return (
          <li key={i} className="flex items-center gap-2 sm:gap-3">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="h-px w-3 sm:w-8 bg-gradient-to-r from-border/40 to-primary/50 opacity-0 animate-step-in"
                style={{ animationDelay: `${i * 0.55 - 0.25}s` }}
              />
            )}
            <div
              className={[
                "group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm opacity-0 animate-step-in transition-all duration-300 hover:-translate-y-0.5",
                last
                  ? "border-primary/50 bg-gradient-to-r from-primary/20 to-primary/5 shadow-glow hover:border-primary"
                  : "border-border/40 bg-background/40 hover:border-primary/50 hover:bg-primary/10",
              ].join(" ")}
              style={{ animationDelay: `${i * 0.55}s` }}
            >
              <Icon
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  last ? "text-primary animate-step-glow" : "text-primary/70"
                }`}
                aria-hidden="true"
              />
              <span
                className={`font-mono uppercase tracking-[0.08em] text-[10px] sm:text-xs whitespace-nowrap ${
                  last ? "text-foreground font-bold" : "text-foreground/80 font-medium"
                }`}
              >
                {t(label, lang)}
              </span>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default HeroSteps;
