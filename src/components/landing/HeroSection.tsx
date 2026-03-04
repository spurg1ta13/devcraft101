import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
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
  { indent: 2, tokens: [{ t: "<", c: "punct" }, { t: "motion.div", c: "tag" }, { t: " className=", c: "punct" }, { t: '"app-container"', c: "string" }, { t: ">", c: "punct" }] },
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
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      <div
        className="px-6 py-4 columns-1 md:columns-2 lg:columns-3 gap-16 animate-code-rain"
        style={{ willChange: 'transform' }}
      >
        {doubled.map((line, i) => (
          <div key={i} className="h-6 flex items-center gap-0 font-mono text-[11px] md:text-[12px] leading-6 whitespace-nowrap">
            <span className="w-7 shrink-0 text-right mr-3 text-muted-foreground/15 select-none text-[10px]">
              {(i % codeLines.length) + 1}
            </span>
            <span style={{ paddingLeft: `${line.indent * 18}px` }}>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const { lang } = useLang();
  const hero = translations.hero;

  return (
    <section ref={ref} className="relative h-[100dvh] min-h-[600px] flex flex-col overflow-hidden noise">
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale: imgScale }}>
        <img src={heroBanner} alt="" loading="eager" decoding="async" fetchPriority="high" className="w-full h-full object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
        <div className="w-full h-[100dvh] overflow-hidden">
          <CodeRain />
        </div>
      </div>

      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 flex-1 flex flex-col justify-center"
      >
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              {t(hero.line1, lang)}
            </h1>
          </motion.div>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              <span className="text-gradient italic">{t(hero.line2, lang)}</span>
              <span className="text-gradient">.</span>
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 pt-8 border-t border-border/30"
        >
          <p className="text-foreground text-base md:text-lg max-w-md leading-relaxed font-medium">
            {t(hero.description, lang)}
          </p>
          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full shadow-glow font-mono uppercase tracking-[0.1em]"
          >
            {t(hero.explore, lang)}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
