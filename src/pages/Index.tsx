import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeSection from "@/components/landing/MarqueeSection";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebSiteSchema, FAQPageSchema } from "@/components/StructuredData";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const ServicesSection = lazy(() => import("@/components/landing/ServicesSection"));
const PricingSection = lazy(() => import("@/components/landing/PricingSection"));
const ShowcaseSection = lazy(() => import("@/components/landing/ShowcaseSection"));
const PortfolioSection = lazy(() => import("@/components/landing/PortfolioSection"));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Index = () => {
  useScrollSpy();

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
          <PricingSection />
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
