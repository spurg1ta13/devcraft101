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
      className="mt-16 md:mt-24 flex flex-col gap-2.5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-4"
      aria-label={t(steps.title, lang)}
    >
      {labels.map((label, i) => {
        const Icon = ICONS[i];
        const last = i === 3;
        return (
          <li key={i} className="flex w-full sm:w-auto items-center gap-2 sm:gap-3">
            {i > 0 && (
              <span
                aria-hidden="true"
                className="hidden sm:inline-block h-0.5 w-5 sm:w-10 bg-gradient-to-r from-primary/80 to-primary/60 opacity-0 animate-step-in"
                style={{ animationDelay: `${i * 0.55 - 0.25}s` }}
              />
            )}
            <div
              className={[
                "group w-full sm:w-auto justify-center sm:justify-start inline-flex items-center gap-2 sm:gap-2.5 rounded-full border px-3.5 sm:px-5 py-2 sm:py-2.5 backdrop-blur-md opacity-0 animate-step-in transition-all duration-300 hover:-translate-y-1",
                last
                  ? "border-primary/80 bg-gradient-to-r from-primary/35 to-primary/15 shadow-glow ring-1 ring-primary/70 hover:border-primary hover:ring-primary"
                  : "border-border/80 bg-secondary/70 text-foreground/90 hover:border-primary/80 hover:bg-primary/15 hover:text-foreground",
              ].join(" ")}
              style={{ animationDelay: `${i * 0.55}s` }}
            >
              <Icon
                className={`h-5 w-5 sm:h-5 sm:w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                  last ? "text-primary animate-step-glow" : "text-primary"
                }`}
                aria-hidden="true"
                strokeWidth={last ? 2.5 : 2}
              />
              <span
                className={`font-mono uppercase tracking-[0.06em] sm:tracking-[0.08em] text-[11px] sm:text-sm text-center leading-tight break-words sm:whitespace-nowrap ${
                  last ? "text-foreground font-black" : "font-semibold"
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
