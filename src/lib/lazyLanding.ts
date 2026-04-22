// Centralized lazy loaders for landing sections.
// Re-using the same import promise everywhere lets React reuse the chunk
// (no double-fetch) and lets us preload chunks on user intent (hover/click)
// before the placeholders intersect the viewport — fixing the "scroll to
// pricing on the way down" issue without hurting initial-load performance.

export const loadAbout = () => import("@/components/landing/AboutSection");
export const loadServices = () => import("@/components/landing/ServicesSection");
export const loadPricing = () => import("@/components/landing/PricingSection");
export const loadShowcase = () => import("@/components/landing/ShowcaseSection");
export const loadPortfolio = () => import("@/components/landing/PortfolioSection");
export const loadProcess = () => import("@/components/landing/ProcessSection");
export const loadFAQ = () => import("@/components/landing/FAQSection");
export const loadCTA = () => import("@/components/landing/CTASection");
export const loadFooter = () => import("@/components/landing/Footer");

// Map section ids → loaders that must resolve before scrolling.
// For a target near the bottom, also load everything above it so the
// final scroll position is accurate (no layout shift after arrival).
const order: Array<{ id: string; load: () => Promise<unknown> }> = [
  { id: "about", load: loadAbout },
  { id: "services", load: loadServices },
  { id: "showcase", load: loadShowcase },
  { id: "projects", load: loadPortfolio },
  { id: "process", load: loadProcess },
  { id: "pricing", load: loadPricing },
  { id: "faq", load: loadFAQ },
  { id: "contact", load: loadCTA },
];

export const preloadUpTo = (sectionId: string): Promise<unknown> => {
  const idx = order.findIndex((s) => s.id === sectionId);
  if (idx === -1) return Promise.resolve();
  return Promise.all(order.slice(0, idx + 1).map((s) => s.load()));
};
