import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Shield, Globe, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";
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
    itemListElement: plans.map((plan, i) => ({
      "@type": "Offer",
      name: `${t(plan.name, "en")}: ${t(plan.tagline, "en")}`,
      description: t(plan.description, "en"),
      price: t(plan.price, "en"),
      priceCurrency: "EUR",
      url: "https://devcraft.gr/prices",
      availability: "https://schema.org/InStock",
      itemOffered: {
        "@type": "Service",
        name: t(plan.name, "en"),
        description: t(plan.description, "en"),
        provider: { "@id": "https://devcraft.gr/#organization" },
      },
    })),
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mostPopularIndex = 2; // MAXI

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title={{ en: "Prices & Plans | DevCraft — Web Development Thessaloniki", el: "Τιμές & Πακέτα | DevCraft — Κατασκευή Ιστοσελίδων Θεσσαλονίκη" }}
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
            </motion.div>

            {/* Plans grid */}
            <div className="grid gap-8 md:gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-12 md:mt-20" role="list">
              {p.plans.map((plan, i) => {
                const Icon = planIcons[i];
                const tier = tierStyles[i];
                const isPopular = tier.label === "popular";

                return (
                  <motion.article
                    key={i}
                    role="listitem"
                    itemScope
                    itemType="https://schema.org/Offer"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`group relative rounded-2xl border p-6 md:p-8 transition-all duration-300 ${tier.border} ${
                      isPopular
                        ? "border-primary/40 bg-primary/[0.04] shadow-[0_0_50px_-12px_hsl(var(--primary)/0.25)] scale-[1.02] lg:scale-105"
                        : "border-border/30 bg-card/60 hover:border-border/60 hover:bg-card/80"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3.5 left-6 rounded-full bg-primary px-4 py-1 text-[10px] font-mono uppercase tracking-widest text-primary-foreground flex items-center gap-1.5 shadow-[0_0_20px_4px_hsl(var(--primary)/0.3)]">
                        <Star className="h-3 w-3 fill-current" />
                        {lang === "el" ? "Δημοφιλέστερο" : "Most Popular"}
                      </div>
                    )}

                    {/* Tier number label */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tier.iconBg}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-black tracking-tight" itemProp="name">
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

                    <p className="text-sm text-foreground/60 leading-relaxed mb-6" itemProp="description">
                      {t(plan.description, lang)}
                    </p>

                    {/* Price block with subtle background */}
                    <div className="mb-6 rounded-xl bg-secondary/50 p-4 border border-border/20">
                      <span className="text-2xl md:text-3xl font-black tracking-tight text-foreground" itemProp="price">
                        {t(plan.price, lang)}
                      </span>
                      <meta itemProp="priceCurrency" content="EUR" />
                      <p className="text-[11px] font-mono text-muted-foreground mt-1.5">
                        {lang === "el" ? "Παράδοση:" : "Delivery:"}{" "}
                        {t(plan.delivery, lang)}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border/30 mb-5" />

                    <ul className="space-y-2.5" aria-label={`${t(plan.name, lang)} features`}>
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

            {/* Bottom notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 md:mt-16 space-y-4 max-w-3xl"
            >
              <div className="glow-line w-full mb-6" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "el"
                  ? "Διαθέσιμα εξατομικευμένα προγράμματα Ετήσιας Συντήρησης & Διασφάλισης Ποιότητας (QA)."
                  : "Custom Annual Maintenance & Quality Assurance plans are available upon request."}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {lang === "el"
                  ? "Δυνατότητα προσθήκης επιπλέον λειτουργιών (add-ons) προσαρμοσμένων στις ανάγκες σας."
                  : "Additional functionalities and custom add-ons can be tailored to your specific needs."}
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-6 py-3 min-h-[44px] rounded-full hover:brightness-110 hover:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.3)] transition-all font-bold mt-4"
              >
                {t(translations.nav.letsTalk, lang)}
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Prices;
