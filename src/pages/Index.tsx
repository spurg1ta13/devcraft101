import { lazy, Suspense } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import MarqueeSection from "@/components/landing/MarqueeSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SEOHead from "@/components/SEOHead";
import { OrganizationSchema, WebSiteSchema, LocalBusinessSchema } from "@/components/StructuredData";

const ShowcaseSection = lazy(() => import("@/components/landing/ShowcaseSection"));
const ProcessSection = lazy(() => import("@/components/landing/ProcessSection"));
const FAQSection = lazy(() => import("@/components/landing/FAQSection"));
const CTASection = lazy(() => import("@/components/landing/CTASection"));
const Footer = lazy(() => import("@/components/landing/Footer"));

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead canonical="/" />
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <MarqueeSection />
        <ServicesSection />
        <Suspense fallback={null}>
          <ShowcaseSection />
          <ProcessSection />
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
