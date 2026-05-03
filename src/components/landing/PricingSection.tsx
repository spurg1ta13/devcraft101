import { useState } from "react";
import { Check, Zap, Shield, Globe, Sparkles, Gift } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";
import PlanBookingDialog from "./PlanBookingDialog";

const planIcons = [Zap, Shield, Globe, Sparkles];

const PricingSection = () => {
  const { lang } = useLang();
  const p = translations.pricing;
  const { ref, inView } = useInView();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; tagline: string } | null>(null);

  const openBookingFor = (plan: typeof p.plans[number]) => {
    setSelectedPlan({ name: t(plan.name, lang), tagline: t(plan.tagline, lang) });
    setBookingOpen(true);
  };

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
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-primary">
            <Gift className="h-4 w-4" strokeWidth={2} />
            <span className="text-xs md:text-sm font-medium">
              {t(p.giftNote, lang)}
            </span>
          </div>
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
                tabIndex={0}
                onClick={() => openBookingFor(plan)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openBookingFor(plan);
                  }
                }}
                aria-label={`${t(plan.name, lang)} — ${lang === "el" ? "Επικοινωνήστε για τιμή" : lang === "de" ? "Preis auf Anfrage" : "Contact for pricing"}`}
                className={`group relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:-translate-y-1 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${
                  isElite
                    ? "border-primary/40 bg-primary/[0.03] shadow-[0_0_40px_-12px_hsl(var(--primary)/0.2)] hover:shadow-[0_0_60px_-12px_hsl(var(--primary)/0.35)]"
                    : "border-border/30 bg-card/50 hover:border-primary/40"
                }`}
                style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
              >
                {isElite && (
                  <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 text-[10px] font-mono uppercase tracking-widest text-primary-foreground">
                    {lang === "el" ? "Δημοφιλές" : lang === "de" ? "Am beliebtesten" : "Most Popular"}
                  </div>
                )}

                {/* duplicate removed */}

                <div className="flex items-center gap-3 mb-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isElite ? "bg-primary/20 text-primary" : "bg-secondary text-foreground/70"}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
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
                  <span className="text-base md:text-lg font-black tracking-tight text-gradient group-hover:opacity-80 transition-opacity">
                    {lang === "el" ? "Επικοινωνήστε για τιμή →" : lang === "de" ? "Preis auf Anfrage →" : "Contact for pricing →"}
                  </span>
                  <p className="text-[11px] font-mono text-muted-foreground mt-2">
                    {lang === "el" ? "Παράδοση:" : lang === "de" ? "Lieferung:" : "Delivery:"}{" "}
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
        <p
          className={`mt-1 text-xs md:text-sm text-primary font-medium transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: inView ? "450ms" : "0ms" }}
        >
          {t(p.hostingDetail, lang)}
        </p>
        <div
          className={`mt-6 flex flex-col sm:flex-row sm:items-center gap-4 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: inView ? "500ms" : "0ms" }}
        >
          <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
            {lang === "el"
              ? "Δυνατότητα προσθήκης επιπλέον λειτουργιών (add-ons) προσαρμοσμένων στις ανάγκες σας."
              : "Additional functionalities and custom add-ons can be tailored to your specific needs."}
          </p>
          <button
            type="button"
            onClick={() => { setSelectedPlan(null); setBookingOpen(true); }}
            className="shrink-0 self-start sm:self-auto inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-6 py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold"
          >
            {t(translations.nav.letsTalk, lang)}
          </button>
        </div>
      </div>

      <PlanBookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        planName={selectedPlan?.name}
        planTagline={selectedPlan?.tagline}
      />
    </section>
  );
};

export default PricingSection;
