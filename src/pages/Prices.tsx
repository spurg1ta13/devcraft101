import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Shield, Globe, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";
import PlanBookingDialog from "@/components/landing/PlanBookingDialog";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const planIcons = [Zap, Shield, Globe, Sparkles];

/* Tier visual weight increases progressively */
const tierStyles = [
  { intensity: "border-border/20 bg-card/40", iconBg: "bg-secondary text-foreground/50", check: "text-muted-foreground/50" },
  { intensity: "border-border/30 bg-card/50", iconBg: "bg-secondary text-foreground/60", check: "text-muted-foreground/60" },
  { intensity: "border-primary/40 bg-primary/[0.04]", iconBg: "bg-primary/20 text-primary", check: "text-primary", popular: true },
  { intensity: "border-border/40 bg-card/60", iconBg: "bg-secondary text-foreground/70", check: "text-foreground/50" },
];

const OfferCatalogSchema = () => {
  const plans = translations.pricing.plans;
  const schema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "DevCraft Web Development Service Plans",
    description: "ISTQB-certified web development plans from €600 to €2,500. Responsive design, SEO, multilingual support.",
    url: "https://devcraft.gr/prices",
    provider: { "@id": "https://devcraft.gr/#organization" },
    numberOfItems: plans.length,
    itemListElement: plans.map((plan, i) => {
      const features = plan.features.en.join(", ");
      const fullDescription = `${t(plan.description, "en")} Includes: ${features}. Delivery: ${t(plan.delivery, "en")}.`;
      return {
        "@type": "Offer",
        name: `${t(plan.name, "en")}: ${t(plan.tagline, "en")}`,
        description: fullDescription,
        price: t(plan.price, "en"),
        priceCurrency: "EUR",
        url: "https://devcraft.gr/prices",
        availability: "https://schema.org/InStock",
        itemOffered: {
          "@type": "Service",
          name: t(plan.name, "en"),
          description: fullDescription,
          provider: { "@id": "https://devcraft.gr/#organization" },
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const Prices = () => {
  const { lang } = useLang();
  const p = translations.pricing;
  const a = translations.about;

  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; tagline: string } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openBookingFor = (plan: typeof p.plans[number]) => {
    setSelectedPlan({ name: t(plan.name, lang), tagline: t(plan.tagline, lang) });
    setBookingOpen(true);
  };

  const mostPopularIndex = 2; // MAXI

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title={{ en: "Prices & Plans | DevCraft — Global Web Development", el: "Τιμές & Πακέτα | DevCraft — Παγκόσμια Ανάπτυξη Ιστοσελίδων", de: "Preise & Pakete | DevCraft — Globale Webentwicklung" }}
        description={{ en: "DevCraft web development pricing: MINI, MIDI, MAXI & ELITE plans from €600. ISTQB-certified QA, responsive design, multilingual support.", el: "Τιμοκατάλογος DevCraft: πακέτα MINI, MIDI, MAXI & ELITE από €600. Πιστοποιημένο QA ISTQB, responsive design, πολύγλωσση υποστήριξη." }}
        canonical="/prices"
      />
      <OfferCatalogSchema />
      <Navbar />
      <main>
        <section className="relative pt-40 pb-16 md:pt-52 md:pb-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] amber-drift" />
          <div className="container relative z-10 px-4 sm:px-6">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-10 hover:opacity-80 transition-opacity">
                <ArrowLeft className="h-4 w-4" />
                {t(a.backToHome, lang)}
              </Link>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-6">
                {t(p.heading1, lang)}
                <br />
                <span className="text-gradient">{t(p.heading2, lang)}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(p.subtitle, lang)}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive/30 bg-destructive/10 px-4 py-2 text-destructive/90">
                <Shield className="h-4 w-4" strokeWidth={2} />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wide">
                  {t(p.salesNote, lang)}
                </span>
              </div>
            </motion.div>

            {/* Plans grid */}
            <div className="grid gap-0 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:items-start mt-12 md:mt-20 divide-y sm:divide-y-0 divide-border/20">
              {p.plans.map((plan, i) => {
                const Icon = planIcons[i];
                const tier = tierStyles[i];
                const isPopular = !!(tier as any).popular;

                return (
                  <motion.article
                    key={i}
                    itemScope
                    itemType="https://schema.org/Offer"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    tabIndex={0}
                    onClick={() => openBookingFor(plan)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openBookingFor(plan);
                      }
                    }}
                    aria-label={`${t(plan.name, lang)} — ${lang === "el" ? "Επικοινωνήστε για τιμή" : "Contact for pricing"}`}
                    className={`group relative flex flex-col rounded-2xl border p-6 md:p-8 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:-translate-y-1 ${
                      isPopular
                        ? `${tier.intensity} shadow-[0_0_60px_-10px_hsl(var(--primary)/0.3)] lg:-mt-4 lg:mb-4 ring-1 ring-primary/30 hover:shadow-[0_0_80px_-10px_hsl(var(--primary)/0.45)]`
                        : `${tier.intensity} hover:border-primary/40 hover:bg-card/80`
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 rounded-full bg-primary px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-primary-foreground flex items-center gap-1.5 shadow-[0_0_20px_4px_hsl(var(--primary)/0.3)] whitespace-nowrap">
                        <Star className="h-3 w-3 fill-current" />
                        {lang === "el" ? "Δημοφιλέστερο" : "Most Popular"}
                      </div>
                    )}

                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tier.iconBg}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-black tracking-[-0.03em] text-gradient" itemProp="name">
                            {t(plan.name, lang)}
                          </h2>
                          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.15em]">
                            {t(plan.tagline, lang)}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-wider">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Best for subtitle */}
                    <p className="text-[11px] text-primary/80 italic leading-relaxed mb-4">
                      {t(plan.bestFor, lang)}
                    </p>

                    {/* Description — fixed height on lg so prices align */}
                    <p className="text-sm text-foreground/60 leading-relaxed mb-6 lg:min-h-[5.5rem]" itemProp="description">
                      {t(plan.description, lang)}
                    </p>

                    {/* Price block */}
                    <div className={`mb-6 rounded-xl p-4 border ${
                      isPopular
                        ? "bg-primary/[0.08] border-primary/30"
                        : "bg-secondary/50 border-border/20"
                    }`}>
                      <span className="hidden text-base md:text-lg font-black tracking-tight text-gradient group-hover:opacity-80 transition-opacity">
                        {lang === "el" ? "Επικοινωνήστε για τιμή →" : "Contact for pricing →"}
                      </span>
                      <p className="text-[11px] font-mono text-muted-foreground mt-2">
                        {lang === "el" ? "Παράδοση:" : "Delivery:"}{" "}
                        {t(plan.delivery, lang)}
                      </p>
                      <p className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">
                        {t(p.deliveryNote, lang)}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className={`h-px mb-5 ${isPopular ? "bg-primary/20" : "bg-border/30"}`} />

                    {/* Features */}
                    <ul className="space-y-2.5 flex-1" aria-label={`${t(plan.name, lang)} features`}>
                      {plan.features[lang].map((feature, fi) => (
                        <li key={fi} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <Check className={`h-4 w-4 mt-0.5 shrink-0 ${tier.check}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.article>
                );
              })}
            </div>

            {/* Hosting note */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 text-xs md:text-sm text-primary font-medium"
            >
              {t(p.hostingNote, lang)}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-1 text-xs md:text-sm text-primary font-medium"
            >
              {t(p.hostingDetail, lang)}
            </motion.p>

            {/* Bottom notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 md:mt-12 space-y-4 max-w-3xl"
            >
              <div className="glow-line w-full mb-6" />
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-medium">
                  {lang === "el"
                    ? "Δυνατότητα προσθήκης επιπλέον λειτουργιών (add-ons) προσαρμοσμένων στις ανάγκες σας."
                    : "Additional functionalities and custom add-ons can be tailored to your specific needs."}
                </p>
                <button
                  type="button"
                  onClick={() => { setSelectedPlan(null); setBookingOpen(true); }}
                  className="shrink-0 self-start sm:self-auto inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-6 py-3 min-h-[44px] rounded-full hover:brightness-110 hover:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.3)] transition-all font-bold"
                >
                  {t(translations.nav.letsTalk, lang)}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <PlanBookingDialog
        open={bookingOpen}
        onOpenChange={setBookingOpen}
        planName={selectedPlan?.name}
        planTagline={selectedPlan?.tagline}
      />
    </div>
  );
};

export default Prices;
