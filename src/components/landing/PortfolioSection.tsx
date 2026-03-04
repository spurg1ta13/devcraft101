import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, ExternalLink } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const projectUrls = [
  "https://www.cleanupskg.gr",
  "https://luxe-ellada-page.lovable.app/",
  "https://dental-care-greek.lovable.app/gallery",
  "https://premium-realestate-suite.lovable.app/",
];

const PortfolioSection = () => {
  const { lang } = useLang();
  const s = translations.portfolio;
  const [activeProject, setActiveProject] = useState(0);
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  return (
    <section id="portfolio" className="relative section-rhythm" aria-label="Portfolio">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(s.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-4 md:mb-6">
            {t(s.heading1, lang)}{" "}
            <span className="text-gradient">{t(s.heading2, lang)}</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl">
            {t(s.subtitle, lang)}
          </p>
        </motion.div>

        {/* Project tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
          {s.projects.map((project, i) => (
            <button
              key={i}
              onClick={() => setActiveProject(i)}
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

        {/* View mode toggle */}
        <div className="flex items-center gap-2 mb-6">
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
        <motion.div
          key={`${activeProject}-${viewMode}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Browser chrome */}
          <div className="bg-secondary border border-border/50 rounded-2xl md:rounded-3xl overflow-hidden">
            {/* Top bar */}
            <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-border/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary/40" />
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/40" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-card border border-border/50 rounded-lg px-4 py-1.5 flex items-center gap-2 max-w-xs sm:max-w-md w-full">
                  <span className="font-mono text-[10px] sm:text-xs text-muted-foreground truncate">
                    {t(s.projects[activeProject].title, lang)}
                  </span>
                </div>
              </div>
              <div className="w-12" />
            </div>

            {/* Iframe container */}
            <div className="flex justify-center bg-card/50 p-2 sm:p-4 md:p-6">
              <div
                className={`relative overflow-hidden rounded-lg md:rounded-xl border border-border/30 bg-background transition-all duration-500 ${
                  viewMode === "mobile"
                    ? "w-[320px] sm:w-[375px] h-[560px] sm:h-[667px]"
                    : "w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]"
                }`}
              >
                <iframe
                  src={projectUrls[activeProject]}
                  title={t(s.projects[activeProject].title, lang)}
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  style={{ pointerEvents: "none" }}
                />
                {/* Overlay to prevent interaction */}
                <div className="absolute inset-0 z-10" />
              </div>
            </div>
          </div>

          {/* Project info */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-primary mb-2 block">
                {t(s.projects[activeProject].category, lang)}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.03em] text-foreground mb-2">
                {t(s.projects[activeProject].title, lang)}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl leading-relaxed">
                {t(s.projects[activeProject].description, lang)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioSection;
