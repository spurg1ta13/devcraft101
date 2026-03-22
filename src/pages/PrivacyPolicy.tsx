import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SEOHead from "@/components/SEOHead";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const PrivacyPolicy = () => {
  const { lang } = useLang();
  const p = translations.privacy;
  const a = translations.about;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title={{ en: "Privacy Policy | DevCraft", el: "Πολιτική Απορρήτου | DevCraft" }}
        description={{ en: "DevCraft Privacy Policy — how we collect, use, and protect your personal information. GDPR compliant.", el: "Πολιτική Απορρήτου DevCraft — πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τα προσωπικά σας δεδομένα. Συμμόρφωση με GDPR." }}
        canonical="/privacy-policy"
        noindex
      />
      <Navbar />
      <main>
      <section className="relative pt-40 pb-16 md:pt-52 md:pb-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] amber-drift" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-10 hover:opacity-80 transition-opacity">
              <ArrowLeft className="h-4 w-4" />
              {t(a.backToHome, lang)}
            </Link>
            <h1 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-6">
              {t(p.heading1, lang)}
              <br />
              <span className="text-gradient">{t(p.heading2, lang)}</span>
            </h1>
            <p className="text-muted-foreground text-sm font-mono">
              {t(p.lastUpdated, lang)} {new Date().toLocaleDateString(lang === "el" ? "el-GR" : "en-US", { month: "long", year: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container max-w-3xl">
          {p.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-foreground mb-3">
                {t(section.title, lang)}
              </h2>
              <div className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line">
                {t(section.content, lang).split(/\*\*(.*?)\*\*/g).map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-foreground/80 font-semibold">{part}</strong>
                  ) : (
                    <span key={j}>{part}</span>
                  )
                )}
              </div>
              {"contactInfo" in section && section.contactInfo && (
                <div className="mt-4 flex flex-col gap-2 text-sm md:text-base text-muted-foreground">
                  <p>• <strong className="text-foreground/80 font-semibold">{lang === "el" ? "Τηλέφωνο" : "Phone"}</strong>: <a href="tel:+306974159157" className="text-primary hover:underline transition-colors">+30 697 415 9157</a></p>
                  <p>• <strong className="text-foreground/80 font-semibold">Email</strong>: <a href="mailto:contact@devcraft.gr" className="text-primary hover:underline transition-colors">contact@devcraft.gr</a></p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
