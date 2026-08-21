import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeSection from "@/components/landing/MarqueeSection";
import SEOHead from "@/components/SEOHead";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { loadAbout, loadServices, loadPricing, loadShowcase, loadPortfolio, loadProcess, loadFAQ, loadCTA, loadFooter } from "@/lib/lazyLanding";

// Defer schema JSON-LD (~400 lines) out of the critical bundle. Googlebot
// waits for client-rendered scripts, so paint LCP first then attach schemas.
const StructuredDataBundle = lazy(() =>
  import("@/components/StructuredData").then((m) => ({
    default: () => (
      <>
        <m.OrganizationSchema />
        <m.WebSiteSchema />
        <m.ServicesSchema />
        <m.FAQPageSchema />
      </>
    ),
  }))
);

const AboutSection = lazy(loadAbout);
const ServicesSection = lazy(loadServices);
const PricingSection = lazy(loadPricing);
const ShowcaseSection = lazy(loadShowcase);
const PortfolioSection = lazy(loadPortfolio);
const ProcessSection = lazy(loadProcess);
const FAQSection = lazy(loadFAQ);
const CTASection = lazy(loadCTA);
const Footer = lazy(loadFooter);


const Index = () => {
  useScrollSpy();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        canonical="/"
        type="website"
        title={{
          en: "Custom Web Development & AI Solutions | DevCraft",
          el: "Κατασκευή Ιστοσελίδων & Λύσεις AI | DevCraft",
          de: "Individuelle Webentwicklung & KI-Lösungen | DevCraft",
        }}
        description={{
          en: "Bespoke websites, web apps and AI tools with ISTQB-certified QA. Human strategy plus AI efficiency — your project delivered fast, worldwide.",
          el: "Custom ιστοσελίδες, web εφαρμογές και AI εργαλεία με πιστοποιημένο ISTQB QA. Ανθρώπινη στρατηγική και ταχύτητα AI, για πελάτες παγκοσμίως.",
          de: "Maßgeschneiderte Websites, Web-Apps und KI-Tools mit ISTQB-zertifizierter QA. Menschliche Strategie plus KI-Effizienz — schnell und weltweit.",
        }}
      />

      <Suspense fallback={null}>
        <StructuredDataBundle />
      </Suspense>

      <Navbar />
      <main id="main-content">
        <HeroSection />
        <MarqueeSection />
        <Suspense fallback={null}>
          <div className="cv-auto">
            <AboutSection />
          </div>
          <div className="cv-auto">
            <ServicesSection />
          </div>
          <div className="cv-auto">
            <ShowcaseSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-auto">
            <PortfolioSection />
          </div>
          <div className="cv-auto">
            <ProcessSection />
          </div>
        </Suspense>
        <Suspense fallback={null}>
          <div className="cv-auto">
            <PricingSection />
          </div>
          <div className="cv-auto">
            <FAQSection />
          </div>
          <div className="cv-auto">
            <CTASection />
          </div>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
