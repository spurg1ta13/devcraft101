import { useRef, useMemo, useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const codeLines = [
  { indent: 0, tokens: [{ t: "import", c: "keyword" }, { t: " { ", c: "punct" }, { t: "createApp", c: "func" }, { t: " } ", c: "punct" }, { t: "from", c: "keyword" }, { t: " 'react'", c: "string" }] },
  { indent: 0, tokens: [{ t: "import", c: "keyword" }, { t: " { ", c: "punct" }, { t: "motion", c: "func" }, { t: " } ", c: "punct" }, { t: "from", c: "keyword" }, { t: " 'framer-motion'", c: "string" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "const", c: "keyword" }, { t: " App ", c: "var" }, { t: "= ", c: "punct" }, { t: "() ", c: "punct" }, { t: "=> ", c: "keyword" }, { t: "{", c: "punct" }] },
  { indent: 1, tokens: [{ t: "const", c: "keyword" }, { t: " [state, setState] ", c: "var" }, { t: "= ", c: "punct" }, { t: "useState", c: "func" }, { t: "(", c: "punct" }, { t: "null", c: "keyword" }, { t: ")", c: "punct" }] },
  { indent: 1, tokens: [{ t: "const", c: "keyword" }, { t: " config ", c: "var" }, { t: "= ", c: "punct" }, { t: "useConfig", c: "func" }, { t: "()", c: "punct" }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [{ t: "// Initialize cloud services", c: "comment" }] },
  { indent: 1, tokens: [{ t: "useEffect", c: "func" }, { t: "(() => {", c: "punct" }] },
  { indent: 2, tokens: [{ t: "const", c: "keyword" }, { t: " client ", c: "var" }, { t: "= ", c: "punct" }, { t: "createClient", c: "func" }, { t: "(config)", c: "punct" }] },
  { indent: 2, tokens: [{ t: "client", c: "var" }, { t: ".", c: "punct" }, { t: "connect", c: "func" }, { t: "()", c: "punct" }] },
  { indent: 2, tokens: [{ t: "return", c: "keyword" }, { t: " () => ", c: "punct" }, { t: "client", c: "var" }, { t: ".", c: "punct" }, { t: "disconnect", c: "func" }, { t: "()", c: "punct" }] },
  { indent: 1, tokens: [{ t: "}, [config])", c: "punct" }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [{ t: "return", c: "keyword" }, { t: " (", c: "punct" }] },
  { indent: 2, tokens: [{ t: "<", c: "punct" }, { t: "motion.div", c: "tag" }, { t: " className=", c: "punct" }, { t: "'app-container'", c: "string" }, { t: ">", c: "punct" }] },
  { indent: 3, tokens: [{ t: "<", c: "punct" }, { t: "Header", c: "tag" }, { t: " />", c: "punct" }] },
  { indent: 3, tokens: [{ t: "<", c: "punct" }, { t: "Dashboard", c: "tag" }, { t: " data=", c: "punct" }, { t: "{state}", c: "var" }, { t: " />", c: "punct" }] },
  { indent: 3, tokens: [{ t: "<", c: "punct" }, { t: "Analytics", c: "tag" }, { t: " />", c: "punct" }] },
  { indent: 2, tokens: [{ t: "</", c: "punct" }, { t: "motion.div", c: "tag" }, { t: ">", c: "punct" }] },
  { indent: 1, tokens: [{ t: ")", c: "punct" }] },
  { indent: 0, tokens: [{ t: "}", c: "punct" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "export", c: "keyword" }, { t: " default ", c: "punct" }, { t: "App", c: "func" }] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [{ t: "// API service layer", c: "comment" }] },
  { indent: 0, tokens: [{ t: "async", c: "keyword" }, { t: " function ", c: "punct" }, { t: "fetchData", c: "func" }, { t: "(endpoint) {", c: "punct" }] },
  { indent: 1, tokens: [{ t: "const", c: "keyword" }, { t: " res ", c: "var" }, { t: "= ", c: "punct" }, { t: "await", c: "keyword" }, { t: " fetch", c: "func" }, { t: "(endpoint)", c: "punct" }] },
  { indent: 1, tokens: [{ t: "if", c: "keyword" }, { t: " (!res.ok) ", c: "punct" }, { t: "throw", c: "keyword" }, { t: " new ", c: "punct" }, { t: "Error", c: "func" }, { t: "(res.statusText)", c: "punct" }] },
  { indent: 1, tokens: [{ t: "return", c: "keyword" }, { t: " res.", c: "punct" }, { t: "json", c: "func" }, { t: "()", c: "punct" }] },
  { indent: 0, tokens: [{ t: "}", c: "punct" }] },
];

const tokenColors: Record<string, string> = {
  keyword: "text-primary",
  func: "text-blue-400",
  string: "text-emerald-400",
  comment: "text-muted-foreground/50 italic",
  var: "text-foreground/80",
  punct: "text-muted-foreground/60",
  tag: "text-red-400",
};

const CodeRain = () => {
  const doubled = useMemo(() => [...codeLines, ...codeLines], []);

  return (
    <div className="relative w-full h-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      <div
        className="px-4 md:px-6 py-4 columns-1 md:columns-2 lg:columns-3 gap-8 md:gap-16 animate-code-rain"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((line, i) => (
          <div key={i} className="h-6 flex items-center gap-0 font-mono text-[10px] md:text-[12px] leading-6 whitespace-nowrap">
            <span className="w-6 md:w-7 shrink-0 text-right mr-2 md:mr-3 text-muted-foreground/15 select-none text-[9px] md:text-[10px]">
              {(i % codeLines.length) + 1}
            </span>
            <span style={{ paddingLeft: `${line.indent * 14}px` }}>
              {line.tokens.map((token, j) => (
                <span key={j} className={tokenColors[token.c] || "text-foreground/60"}>
                  {token.t}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const ref = useRef(null);
  const { lang } = useLang();
  const hero = translations.hero;
  // Use CSS media query to avoid forced reflow from JS width checks
  const [showCodeRain, setShowCodeRain] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    setShowCodeRain(mql.matches);
    const onChange = () => setShowCodeRain(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return (
    <section ref={ref} className="relative h-[70dvh] md:h-[100dvh] min-h-[450px] md:min-h-[600px] flex flex-col overflow-hidden noise" aria-label="Hero">
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(/hero-banner.jpg)` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      {showCodeRain && (
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
          <div className="w-full h-[100dvh] overflow-hidden">
            <CodeRain />
          </div>
        </div>
      )}

      <div
        className="container relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-6"
      >
        <div className="overflow-hidden mb-3 md:mb-4">
          <div className="animate-hero-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              {t(hero.line1, lang)}
            </h1>
          </div>
        </div>
        <div className="overflow-hidden mb-6 md:mb-8">
          <div className="animate-hero-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <h1 className="text-[clamp(2.25rem,8vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              <span className="text-gradient italic">{t(hero.line2, lang)}</span>
              <span className="text-gradient">.</span>
            </h1>
          </div>
        </div>

        <div className="animate-hero-fade-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 pt-6 md:pt-8 border-t border-border/30">
            <p className="text-foreground text-sm sm:text-base md:text-lg max-w-md leading-relaxed font-medium">
              {t(hero.description, lang)}
            </p>
            <a
              href="#services"
              className="bg-primary text-primary-foreground font-bold text-sm px-8 py-4 min-h-[48px] rounded-full shadow-glow font-mono uppercase tracking-[0.1em] text-center flex items-center justify-center hover:brightness-110 active:scale-[0.98] transition-all"
            >
              {t(hero.explore, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
