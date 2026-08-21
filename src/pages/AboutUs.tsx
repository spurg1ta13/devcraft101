import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Users, Code2, Palette, ShieldCheck, Megaphone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const teamIcons = [Code2, ShieldCheck, Megaphone];

const CounterStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => {
  const isNumber = /^\d+/.test(value);
  const numericPart = parseInt(value) || 0;
  const suffix = value.replace(/^\d+/, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isNumber) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate(count, numericPart, { duration: 1.5, delay, ease: "easeOut" });
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, numericPart, delay, isNumber]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ scale: 1.12, transition: { type: "spring", stiffness: 300, damping: 15 } }}
      className="text-center cursor-default group"
    >
      <span ref={ref} className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-gradient group-hover:drop-shadow-[0_0_20px_hsl(38_100%_55%/0.5)] transition-all duration-500">
        {isNumber ? (
          <>
            <motion.span>{rounded}</motion.span>
            {suffix}
          </>
        ) : (
          value
        )}
      </span>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 group-hover:text-foreground/90 mt-3 transition-colors duration-500">
        {label}
      </p>
    </motion.div>
  );
};

const AboutUs = () => {
  const { lang } = useLang();
  const a = translations.about;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamData = [
    { roleKey: "webDev" as const, descKey: "webDevDesc" as const },
    { roleKey: "qa" as const, descKey: "qaDesc" as const },
    { roleKey: "marketer" as const, descKey: "marketerDesc" as const },
  ];

  const stats = [
    { value: "10+", label: t(a.stats.years, lang) },
    { value: lang === "el" ? "Μηδέν" : lang === "de" ? "Null" : "Zero", label: t(a.stats.defect, lang) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title={{
          en: "About Us | DevCraft Team & Expertise",
          el: "Σχετικά με εμάς | Η Ομάδα DevCraft",
          de: "Über uns | Das DevCraft-Team",
        }}
        description={{
          en: "Meet DevCraft: 10+ years building web apps, with ISTQB-certified quality assurance, AI engineering and digital marketing under one small senior team.",
          el: "Γνωρίστε την DevCraft: 10+ χρόνια σε web εφαρμογές, με πιστοποιημένο ISTQB QA, AI engineering και ψηφιακό μάρκετινγκ από μια μικρή έμπειρη ομάδα.",
          de: "DevCraft kennenlernen: über 10 Jahre Web-Apps, mit ISTQB-zertifizierter QA, KI-Engineering und digitalem Marketing aus einem kleinen Senior-Team.",
        }}
        keywords={{
          en: "about DevCraft, web development team, ISTQB certified tester, AI engineering team, senior React developers, digital marketing team",
          el: "σχετικά με DevCraft, ομάδα κατασκευής ιστοσελίδων, πιστοποιημένος ISTQB tester, ομάδα AI, React developers",
          de: "über DevCraft, webentwicklung team, ISTQB zertifizierter tester, KI engineering team, React entwickler",
        }}
        canonical="/about"
        type="profile"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://devcraft.gr/" },
              { "@type": "ListItem", position: 2, name: lang === "el" ? "Σχετικά με εμάς" : "About Us", item: "https://devcraft.gr/about" },
            ],
          }),
        }}
      />
      <Navbar />
      <main>
      <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] amber-drift" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-10 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-4 w-4" />
              {t(a.backToHome, lang)}
            </Link>
            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-8">
              {t(a.heading1, lang)}
              <br />
              <span className="text-gradient">{t(a.heading2, lang)}</span>
            </h1>
            <div className="max-w-3xl">
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-6">{t(a.intro1, lang)}</p>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                {t(a.intro2Prefix, lang)}
                <strong className="font-semibold text-foreground">{t(a.intro2Bold, lang)}</strong>
                {t(a.intro2Suffix, lang)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border/30">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <CounterStat key={stat.label} value={stat.value} label={stat.label} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6">{t(a.teamLabel, lang)}</span>
            <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
              {t(a.teamHeading1, lang)}
              <br />
              <span className="text-gradient">{t(a.teamHeading2, lang)}</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamData.map((member, i) => {
              const Icon = teamIcons[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4 } }}
                  className="group relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-8 md:p-10 hover:border-primary/40 hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] transition-all duration-700"
                >
                  <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-gradient-radial from-primary/15 to-transparent rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-8 group-hover:border-primary/40 transition-all duration-500">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 text-foreground">
                      {t(a.roles[member.roleKey], lang)}
                    </h3>
                    <p className="text-muted-foreground text-base leading-relaxed">
                      {t(a.roles[member.descKey], lang)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 border-t border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.04em] mb-6">
              {t(a.valuesHeading1, lang)} <span className="text-gradient">{t(a.valuesHeading2, lang)}</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">{t(a.valuesDesc, lang)}</p>
          </motion.div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
