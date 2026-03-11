import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeSection from "@/components/landing/MarqueeSection";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const ServicesSection = lazy(() => import("@/components/landing/ServicesSection"));
const ShowcaseSection = lazy(() => import("@/components/landing/ShowcaseSection"));
const PortfolioSection = lazy(() => import("@/components/landing/PortfolioSection"));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const FAQPageSchema = () => {
  const { lang } = useLang();
  const f = translations.faq;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: f.items.map((faq) => ({
            "@type": "Question",
            name: t(faq.question, lang),
            acceptedAnswer: {
              "@type": "Answer",
              text: t(faq.answer, lang),
            },
          })),
        }),
      }}
    />
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead canonical="/" />
      <OrganizationSchema />
      <WebSiteSchema />
      <FAQPageSchema />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <MarqueeSection />
        <Suspense fallback={null}>
          <ServicesSection />
          <ShowcaseSection />
        </Suspense>
        <Suspense fallback={null}>
          <PortfolioSection />
          <ProcessSection />
        </Suspense>
        <Suspense fallback={null}>
          <FAQSection />
          <CTASection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
