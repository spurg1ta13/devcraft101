import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";

const labels = {
  bad: { en: "Without a Professional Landing Page", el: "Χωρίς Επαγγελματική Landing Page" },
  good: { en: "With a Professional Landing Page", el: "Με Επαγγελματική Landing Page" },
  bounce: { en: "Bounce Rate", el: "Ποσοστό Αποχώρησης" },
  conversion: { en: "Conversions", el: "Μετατροπές" },
  visitors: { en: "visitors leave", el: "επισκέπτες φεύγουν" },
  visitorsStay: { en: "visitors convert", el: "επισκέπτες μετατρέπονται" },
  slow: { en: "7.2s load", el: "7.2δ φόρτωση" },
  fast: { en: "0.8s load", el: "0.8δ φόρτωση" },
  noSeo: { en: "Invisible on Google", el: "Αόρατη στο Google" },
  seo: { en: "Page 1 on Google", el: "Σελίδα 1 στο Google" },
  noCta: { en: "No clear action", el: "Καμία σαφής ενέργεια" },
  cta: { en: "Clear call-to-action", el: "Σαφής πρόσκληση δράσης" },
  noTrust: { en: "Looks outdated", el: "Φαίνεται ξεπερασμένη" },
  trust: { en: "Builds instant trust", el: "Χτίζει άμεση εμπιστοσύνη" },
};

const t = (obj: { en: string; el: string }, lang: string) =>
  (obj as Record<string, string>)[lang] || obj.en;

const LandingPageAnimation = () => {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"bad" | "good">("bad");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-toggle between bad and good every 4s
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPhase((p) => (p === "bad" ? "good" : "bad"));
    }, 4000);
    return () => clearInterval(interval);
  }, [active]);

  const isBad = phase === "bad";

  return (
    <div ref={ref} className="my-14 select-none" aria-hidden="true">
      {/* Toggle label */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <button
          onClick={() => setPhase("bad")}
          className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-500 ${
            isBad
              ? "border-destructive/50 text-destructive bg-destructive/10"
              : "border-border/30 text-muted-foreground/40"
          }`}
        >
          ✗ {t(labels.bad, lang)}
        </button>
        <button
          onClick={() => setPhase("good")}
          className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-500 ${
            !isBad
              ? "border-primary/50 text-primary bg-primary/10"
              : "border-border/30 text-muted-foreground/40"
          }`}
        >
          ✓ {t(labels.good, lang)}
        </button>
      </div>

      <div className="relative w-full max-w-lg mx-auto">
        {/* Browser frame */}
        <div
          className="rounded-2xl border overflow-hidden transition-all duration-1000"
          style={{
            borderColor: isBad ? "hsl(var(--destructive) / 0.3)" : "hsl(var(--primary) / 0.3)",
            boxShadow: isBad
              ? "0 0 30px -8px hsl(var(--destructive) / 0.15)"
              : "0 0 30px -8px hsl(var(--primary) / 0.25)",
          }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/30">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
            <div className="flex-1 mx-2 h-5 rounded-md bg-muted/50 flex items-center px-2">
              <span className="text-[9px] font-mono text-muted-foreground/50">yourbrand.com</span>
            </div>
          </div>

          <div className="relative min-h-[300px] sm:min-h-[340px] bg-card overflow-hidden">
            {/* ===== BAD VERSION ===== */}
            <div
              className="absolute inset-0 p-5 transition-all duration-700 flex flex-col"
              style={{
                opacity: isBad ? 1 : 0,
                transform: isBad ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              {/* Ugly navbar */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-24 h-4 rounded-sm bg-muted-foreground/15 skew-x-3" />
                <div className="flex gap-1">
                  <div className="w-8 h-2.5 rounded-sm bg-muted-foreground/10" />
                  <div className="w-8 h-2.5 rounded-sm bg-muted-foreground/10" />
                </div>
              </div>
              {/* Messy hero - misaligned, ugly */}
              <div className="mb-3">
                <div className="w-full h-4 rounded-sm bg-muted-foreground/12 mb-1" />
                <div className="w-[95%] h-4 rounded-sm bg-muted-foreground/10 mb-1" />
                <div className="w-[80%] h-4 rounded-sm bg-muted-foreground/8" />
              </div>
              <div className="w-full h-3 rounded-sm bg-muted-foreground/6 mb-1" />
              <div className="w-3/4 h-3 rounded-sm bg-muted-foreground/5 mb-4" />
              {/* No real CTA */}
              <div className="w-16 h-5 rounded-sm bg-muted-foreground/10 mb-4 border border-muted-foreground/10" />
              {/* Broken image placeholder */}
              <div className="flex-1 rounded border border-dashed border-destructive/20 bg-destructive/5 flex items-center justify-center min-h-[60px]">
                <span className="text-destructive/30 text-lg">✕</span>
              </div>
              {/* Speed indicator */}
              <div className="mt-3 flex items-center gap-2">
                <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div className="h-full rounded-full bg-destructive/50 transition-all duration-1000" style={{ width: isBad ? "90%" : "0%" }} />
                </div>
                <span className="text-[8px] font-mono text-destructive/60 whitespace-nowrap">{t(labels.slow, lang)}</span>
              </div>
            </div>

            {/* ===== GOOD VERSION ===== */}
            <div
              className="absolute inset-0 p-5 transition-all duration-700 flex flex-col"
              style={{
                opacity: isBad ? 0 : 1,
                transform: isBad ? "translateX(100%)" : "translateX(0)",
              }}
            >
              {/* Clean navbar */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-20 h-3.5 rounded bg-primary/70" />
                <div className="flex gap-3">
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                </div>
              </div>
              {/* Clean hero */}
              <div className="mb-3">
                <div className="w-4/5 h-5 rounded bg-foreground/80 mb-2" />
                <div className="w-3/5 h-5 rounded bg-foreground/50 mb-3" />
              </div>
              <div className="w-full h-2 rounded bg-muted-foreground/12 mb-1.5" />
              <div className="w-5/6 h-2 rounded bg-muted-foreground/10 mb-4" />
              {/* Beautiful CTA */}
              <div className="w-28 h-8 rounded-lg bg-primary flex items-center justify-center mb-4 relative overflow-hidden">
                <span className="text-[8px] font-bold text-primary-foreground tracking-widest uppercase">Get Started</span>
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 20%, hsl(var(--primary-foreground) / 0.1) 50%, transparent 80%)",
                    backgroundSize: "200% 100%",
                    animation: !isBad ? "lpShimmer 2.5s linear infinite" : "none",
                  }}
                />
              </div>
              {/* Feature cards */}
              <div className="flex gap-2 mb-3">
                {["⚡", "🎨", "📱"].map((icon, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl border border-border/30 p-2 bg-muted/10"
                    style={{
                      animation: !isBad ? `lpFloat ${5 + i}s ease-in-out ${i * 0.3}s infinite` : "none",
                    }}
                  >
                    <div className="text-xs mb-1">{icon}</div>
                    <div className="w-full h-1.5 rounded bg-muted-foreground/12 mb-0.5" />
                    <div className="w-3/4 h-1.5 rounded bg-muted-foreground/8" />
                  </div>
                ))}
              </div>
              {/* Speed indicator */}
              <div className="mt-auto flex items-center gap-2">
                <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
                  <div className="h-full rounded-full bg-primary/70 transition-all duration-1000" style={{ width: isBad ? "0%" : "15%" }} />
                </div>
                <span className="text-[8px] font-mono text-primary/70 whitespace-nowrap">{t(labels.fast, lang)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact metrics below */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { bad: labels.noSeo, good: labels.seo, icon: "🔍" },
            { bad: labels.noCta, good: labels.cta, icon: "🎯" },
            { bad: labels.noTrust, good: labels.trust, icon: "🛡️" },
            { bad: labels.bounce, good: labels.conversion, icon: "📈" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-2.5 text-center transition-all duration-700"
              style={{
                borderColor: isBad ? "hsl(var(--destructive) / 0.2)" : "hsl(var(--primary) / 0.2)",
                backgroundColor: isBad ? "hsl(var(--destructive) / 0.03)" : "hsl(var(--primary) / 0.03)",
              }}
            >
              <div className="text-base mb-1">{item.icon}</div>
              <div
                className="text-[9px] sm:text-[10px] font-mono leading-tight transition-colors duration-500"
                style={{ color: isBad ? "hsl(var(--destructive) / 0.7)" : "hsl(var(--primary) / 0.9)" }}
              >
                {isBad ? t(item.bad, lang) : t(item.good, lang)}
              </div>
            </div>
          ))}
        </div>

        {/* Visitor flow indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono transition-all duration-700"
            style={{
              backgroundColor: isBad ? "hsl(var(--destructive) / 0.1)" : "hsl(var(--primary) / 0.1)",
              color: isBad ? "hsl(var(--destructive) / 0.8)" : "hsl(var(--primary))",
            }}
          >
            <span className="text-sm">{isBad ? "👋" : "🤝"}</span>
            <span>
              87% {isBad ? t(labels.visitors, lang) : t(labels.visitorsStay, lang)}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes lpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes lpShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default LandingPageAnimation;
