import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/use-mobile";

const projectUrls = [
  "https://www.cleanupskg.gr",
  "https://luxe-ellada-page.lovable.app/",
  "https://dental-care-greek.lovable.app/gallery",
  "https://premium-realestate-suite.lovable.app/",
];

const PortfolioSection = () => {
  const { lang } = useLang();
  const s = translations.portfolio;
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.05 });
  const effectiveViewMode = isMobile ? "mobile" : viewMode;

  return (
    <section id="portfolio" className="relative section-rhythm" aria-label="Portfolio">
      <div className="container px-4 sm:px-6" ref={ref}>
        {/* Header */}
        <div
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(s.label, lang)}{" "}
            <span className="text-gradient">{t(s.label2, lang)}</span>
          </h2>
        </div>

        {/* Project tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          {s.projects.map((project, i) => (
            <button
              key={i}
              onClick={() => { setActiveProject(i); setIframeLoaded(true); }}
              className={`font-mono text-[10px] sm:text-xs uppercase tracking-[0.1em] px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-500 ${
                activeProject === i
                  ? "bg-primary text-primary-foreground border-primary shadow-glow"
                  : "bg-secondary border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {t(project.title, lang)}
            </button>
          ))}
        </div>

        {/* View mode toggle — hidden on mobile */}
        <div className="hidden md:flex items-center gap-2 mb-6">
          <button
            onClick={() => setViewMode("desktop")}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              viewMode === "desktop"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary border-border/50 text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Desktop view"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              viewMode === "mobile"
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary border-border/50 text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Mobile view"
          >
            <Smartphone className="h-4 w-4" />
          </button>
        </div>

        {/* Preview area */}
        <div className="relative">
          <div className="flex justify-center">
            <div
              className={`relative overflow-hidden rounded-2xl md:rounded-3xl border border-border/50 bg-background transition-all duration-500 ${
                viewMode === "mobile"
                  ? "w-[280px] sm:w-[375px] h-[500px] sm:h-[667px]"
                  : "w-full h-[350px] sm:h-[450px] md:h-[600px] lg:h-[700px]"
              }`}
            >
              {(inView || iframeLoaded) ? (
                <iframe
                  src={projectUrls[activeProject]}
                  title={t(s.projects[activeProject].title, lang)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                  Loading preview…
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-24 h-24 z-10" style={{ pointerEvents: 'auto' }} />
              <div className="absolute top-1/4 left-0 w-16 h-1/2 z-10" style={{ pointerEvents: 'auto' }} />
              <div className="absolute top-1/4 right-0 w-16 h-[30%] z-10" style={{ pointerEvents: 'auto' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
