import { Check, Zap, Shield, Globe, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";

const planIcons = [Zap, Shield, Globe, Sparkles];

const PricingSection = () => {
  const { lang } = useLang();
  const p = translations.pricing;
  const { ref, inView } = useInView();

  return (
    <section
      id="pricing"
      className="relative section-rhythm scroll-mt-28 lg:scroll-mt-20"
      aria-label={t(p.label, lang)}
    >
      <div className="container px-4 sm:px-6" ref={ref}>
        <header
          className={`mb-12 md:mb-20 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(p.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.95]">
            {t(p.heading1, lang)}
            <br />
            <span className="text-gradient">{t(p.heading2, lang)}</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            {t(p.subtitle, lang)}
          </p>
        </header>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {p.plans.map((plan, i) => {
            const Icon = planIcons[i];
            const isElite = i === 2; // MAXI is most popular

            return (
              <article
                key={i}
                role="listitem"
                itemScope
                itemType="https://schema.org/Offer"
                className={`group relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-700 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  isElite
                    ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_40px_-12px_hsl(var(--primary)/0.2)]"
                    : "border-border/30 bg-card/50 hover:border-border/60"
                }`}
                style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
              >
                {isElite && (
                  <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary-foreground">
                    {lang === "el" ? "Δημοφιλές" : "Most Popular"}
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isElite ? "bg-primary/20 text-primary" : "bg-secondary text-foreground/70"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3
                      className="text-lg md:text-xl font-black tracking-tight"
                      itemProp="name"
                    >
                      {t(plan.name, lang)}
                    </h3>
                    <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      {t(plan.tagline, lang)}
                    </p>
                  </div>
                </div>

                <p className="text-[11px] text-primary/80 italic leading-relaxed mb-3 lg:min-h-[2rem]">
                  {t(plan.bestFor, lang)}
                </p>

                <p
                  className="text-sm text-foreground/70 leading-relaxed mb-5 lg:min-h-[5rem]"
                  itemProp="description"
                >
                  {t(plan.description, lang)}
                </p>

                <div className="mb-5">
                  <span
                    className="text-2xl md:text-3xl font-black tracking-tight text-foreground"
                    itemProp="price"
                  >
                    {t(plan.price, lang)}
                  </span>
                  <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">
                    {t(p.vatNote, lang)}
                  </p>
                  <meta itemProp="priceCurrency" content="EUR" />
                  <p className="text-[11px] font-mono text-muted-foreground mt-1">
                    {lang === "el" ? "Παράδοση:" : "Delivery:"}{" "}
                    {t(plan.delivery, lang)}
                  </p>
                  <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">
                    {t(p.deliveryNote, lang)}
                  </p>
                </div>

                <ul className="space-y-2 flex-1" aria-label={`${t(plan.name, lang)} features`}>
                  {plan.features[lang].map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-sm text-foreground/80">
                      <Check className={`h-4 w-4 mt-0.5 shrink-0 ${isElite ? "text-primary" : "text-muted-foreground/60"}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <p
          className={`mt-8 text-xs md:text-sm text-primary font-medium transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: inView ? "400ms" : "0ms" }}
        >
          {t(p.hostingNote, lang)}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
