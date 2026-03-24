import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { lazy, Suspense } from "react";
import { usePageTracking } from "@/hooks/usePageTracking";
import Index from "./pages/Index";

const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Prices = lazy(() => import("./pages/Prices"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CookieConsent = lazy(() => import("./components/CookieConsent"));
const BackToTop = lazy(() => import("./components/BackToTop"));
const AIChatLauncher = lazy(() => import("./components/AIChatLauncher"));

const PageTracker = () => {
  usePageTracking();
  return null;
};

const ScrollToHash = () => {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [hash]);
  return null;
};

/**
 * InteractionGate — renders children only after user interacts with the page
 * OR after a generous timeout. This keeps ALL non-critical JS off the main
 * thread during the critical first 2 seconds.
 */
const InteractionGate = ({ children }: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const events = ["click", "scroll", "touchstart", "keydown"] as const;
    const fallback = setTimeout(() => activate(), 5000);

    function activate() {
      clearTimeout(fallback);
      events.forEach(e => document.removeEventListener(e, activate));
      setReady(true);
    }

    events.forEach(e =>
      document.addEventListener(e, activate, { once: true, passive: true })
    );

    return () => {
      clearTimeout(fallback);
      events.forEach(e => document.removeEventListener(e, activate));
    };
  }, []);

  if (!ready) return null;
  return <>{children}</>;
};

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
        <TooltipProvider>
          <BrowserRouter>
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:font-mono focus:text-sm">
              Skip to main content
            </a>
            <ScrollToHash />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />
                <Route path="/prices" element={<Prices />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {/* Non-critical UI: only loads after first user interaction or 5s */}
            <InteractionGate>
              <Suspense fallback={null}>
                <Toaster />
                <Sonner />
                <CookieConsent />
                <BackToTop />
                <AIChatLauncher />
              </Suspense>
            </InteractionGate>
          </BrowserRouter>
        </TooltipProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;