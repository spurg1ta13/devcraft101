import { useEffect, useRef, useState, useCallback } from "react";
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
  noMobile: { en: "Broken on mobile", el: "Σπασμένη στο κινητό" },
  mobile: { en: "Perfect on every device", el: "Τέλεια σε κάθε συσκευή" },
  revenue: { en: "Revenue", el: "Έσοδα" },
  lost: { en: "Lost", el: "Χαμένα" },
  growing: { en: "Growing", el: "Αυξανόμενα" },
  dragHint: { en: "← Drag to compare →", el: "← Σύρετε για σύγκριση →" },
};

const t = (obj: { en: string; el: string }, lang: string) =>
  (obj as Record<string, string>)[lang] || obj.en;

/* ---- Animated visitor dots ---- */
const VisitorDots = ({ isBad }: { isBad: boolean }) => (
  <div className="absolute top-3 right-3 flex flex-col gap-0.5 items-end">
    {[0, 1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="flex gap-0.5"
        style={{
          animation: `lpDotFlow ${2 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
        }}
      >
        {[0, 1, 2].map((j) => (
          <div
            key={j}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-700"
            style={{
              backgroundColor: isBad
                ? `hsl(var(--destructive) / ${0.15 + j * 0.08})`
                : `hsl(var(--primary) / ${0.2 + j * 0.15})`,
            }}
          />
        ))}
      </div>
    ))}
  </div>
);

/* ---- Animated cursor that clicks the CTA ---- */
const AnimatedCursor = ({ isBad }: { isBad: boolean }) => {
  if (isBad) return null;
  return (
    <div className="absolute z-20 pointer-events-none" style={{ animation: "lpCursorMove 5s ease-in-out infinite" }}>
      <svg width="14" height="18" viewBox="0 0 16 20" fill="none" className="drop-shadow-md">
        <path
          d="M1 1L1 15L5 11L9 19L12 17.5L8 10L13 9L1 1Z"
          fill="hsl(var(--foreground))"
          stroke="hsl(var(--background))"
          strokeWidth="1.2"
        />
      </svg>
      <div
        className="absolute top-0 left-0 w-4 h-4 rounded-full -translate-x-1.5 -translate-y-1.5"
        style={{
          border: "2px solid hsl(var(--primary) / 0.5)",
          animation: "lpClickRipple 5s ease-in-out infinite",
        }}
      />
    </div>
  );
};

/* ---- Revenue chart ---- */
const MiniChart = ({ isBad }: { isBad: boolean }) => {
  const badBars = [35, 30, 25, 20, 15, 12, 10];
  const goodBars = [20, 30, 38, 50, 58, 70, 85];
  const bars = isBad ? badBars : goodBars;

  return (
    <div className="flex items-end gap-[3px] h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-[6px] rounded-t transition-all duration-700 ease-out"
          style={{
            height: `${h}%`,
            backgroundColor: isBad
              ? `hsl(var(--destructive) / ${0.25 + i * 0.05})`
              : `hsl(var(--primary) / ${0.3 + i * 0.08})`,
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
};

/* ---- Notification popup ---- */
const NotificationPopup = ({ isBad, lang }: { isBad: boolean; lang: string }) => (
  <div
    className="absolute bottom-14 right-3 rounded-lg border p-2 transition-all duration-700 max-w-[140px]"
    style={{
      opacity: isBad ? 0 : 1,
      transform: isBad ? "translateY(10px) scale(0.9)" : "translateY(0) scale(1)",
      borderColor: "hsl(var(--primary) / 0.3)",
      backgroundColor: "hsl(var(--primary) / 0.08)",
      animation: !isBad ? "lpNotifBounce 3s ease-in-out 1s infinite" : "none",
    }}
  >
    <div className="flex items-center gap-1.5">
      <span className="text-xs">🎉</span>
      <span className="text-[7px] font-mono text-primary leading-tight">
        {lang === "el" ? "Νέος πελάτης!" : "New lead captured!"}
      </span>
    </div>
  </div>
);

/* ---- Error popup for bad version ---- */
const ErrorPopup = ({ isBad, lang }: { isBad: boolean; lang: string }) => (
  <div
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 transition-all duration-500 text-center"
    style={{
      opacity: isBad ? 1 : 0,
      transform: isBad ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.8)",
      pointerEvents: "none",
      animation: isBad ? "lpErrorShake 4s ease-in-out infinite" : "none",
    }}
  >
    <span className="text-destructive text-xl block mb-1">⚠️</span>
    <span className="text-[8px] font-mono text-destructive/70 block">
      {lang === "el" ? "Ο επισκέπτης έφυγε μετά από 2δ" : "Visitor left after 2s"}
    </span>
  </div>
);

const LandingPageAnimation = () => {
  const { lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState<"bad" | "good">("bad");
  const [sliderPos, setSliderPos] = useState(0); // 0 = fully bad, 100 = fully good
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Auto-toggle every 5s unless user is dragging
  useEffect(() => {
    if (!active || isDragging) return;
    autoRef.current = setInterval(() => {
      setPhase((p) => (p === "bad" ? "good" : "bad"));
    }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [active, isDragging]);

  // Sync slider with phase
  useEffect(() => {
    if (!isDragging) {
      setSliderPos(phase === "bad" ? 0 : 100);
    }
  }, [phase, isDragging]);

  const isBad = isDragging ? sliderPos < 50 : phase === "bad";

  // Slider drag logic
  const handleSliderMove = useCallback((clientX: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onPointerDown = useCallback(() => {
    setIsDragging(true);
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  const onPointerUp = useCallback(() => {
    setIsDragging(false);
    setPhase(sliderPos >= 50 ? "good" : "bad");
  }, [sliderPos]);

  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: PointerEvent) => handleSliderMove(e.clientX);
    const onUp = () => onPointerUp();
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [isDragging, handleSliderMove, onPointerUp]);

  return (
    <div ref={ref} className="my-14 select-none" aria-hidden="true">
      <style>{`
        @keyframes lpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes lpShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes lpDotFlow {
          0%, 100% { opacity: 0.4; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(-3px); }
        }
        @keyframes lpCursorMove {
          0%, 15% { top: 30px; left: 40px; }
          35%, 45% { top: 155px; left: 75px; }
          48% { top: 153px; left: 75px; }
          52%, 65% { top: 155px; left: 75px; }
          85%, 100% { top: 30px; left: 40px; }
        }
        @keyframes lpClickRipple {
          0%, 44% { transform: translate(-6px, -6px) scale(0); opacity: 0; }
          48% { transform: translate(-6px, -6px) scale(1.8); opacity: 0.6; }
          55% { transform: translate(-6px, -6px) scale(3); opacity: 0; }
          100% { transform: translate(-6px, -6px) scale(0); opacity: 0; }
        }
        @keyframes lpNotifBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          15% { transform: translateY(-4px) scale(1.03); }
          30% { transform: translateY(0) scale(1); }
        }
        @keyframes lpErrorShake {
          0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
          5% { transform: translate(-50%, -50%) rotate(-2deg); }
          10% { transform: translate(-50%, -50%) rotate(2deg); }
          15% { transform: translate(-50%, -50%) rotate(0deg); }
        }
        @keyframes lpPulseGlow {
          0%, 100% { box-shadow: 0 0 15px 2px hsl(var(--primary) / 0.1); }
          50% { box-shadow: 0 0 35px 8px hsl(var(--primary) / 0.25); }
        }
        @keyframes lpSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lpStarFloat {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

      {/* Toggle buttons */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-5 flex-wrap px-2">
        <button
          onClick={() => { setPhase("bad"); setIsDragging(false); }}
          className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-500 ${
            isBad
              ? "border-destructive/50 text-destructive bg-destructive/10"
              : "border-border/30 text-muted-foreground/40"
          }`}
        >
          ✗ {t(labels.bad, lang)}
        </button>
        <button
          onClick={() => { setPhase("good"); setIsDragging(false); }}
          className={`text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 sm:px-3 py-1.5 rounded-full border transition-all duration-500 ${
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
              : "none",
            animation: !isBad ? "lpPulseGlow 3s ease-in-out infinite" : "none",
          }}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/30">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
            <div className="flex-1 mx-2 h-5 rounded-md bg-muted/50 flex items-center px-2 overflow-hidden relative">
              <span className="text-[9px] font-mono text-muted-foreground/50">yourbrand.com</span>
              {/* SSL indicator */}
              <div className="ml-auto flex items-center gap-1">
                <span className="text-[8px] transition-colors duration-500" style={{ color: isBad ? "hsl(var(--destructive) / 0.5)" : "hsl(var(--primary) / 0.6)" }}>
                  {isBad ? "⚠" : "🔒"}
                </span>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] sm:min-h-[370px] bg-card overflow-hidden">
            {/* ===== BAD VERSION ===== */}
            <div
              className="absolute inset-0 p-5 transition-all duration-700 flex flex-col"
              style={{
                opacity: isBad ? 1 : 0,
                transform: isBad ? "translateX(0)" : "translateX(-100%)",
              }}
            >
              <VisitorDots isBad />

              {/* Ugly misaligned navbar */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-24 h-4 rounded-sm bg-muted-foreground/15 skew-x-3" />
                <div className="flex gap-1">
                  <div className="w-8 h-2.5 rounded-sm bg-muted-foreground/10" />
                  <div className="w-8 h-2.5 rounded-sm bg-muted-foreground/10" />
                </div>
              </div>

              {/* Messy hero */}
              <div className="mb-3">
                <div className="w-full h-4 rounded-sm bg-muted-foreground/12 mb-1" />
                <div className="w-[95%] h-4 rounded-sm bg-muted-foreground/10 mb-1 ml-1" />
                <div className="w-[80%] h-4 rounded-sm bg-muted-foreground/8" />
              </div>
              <div className="w-full h-3 rounded-sm bg-muted-foreground/6 mb-1" />
              <div className="w-3/4 h-3 rounded-sm bg-muted-foreground/5 mb-4" />

              {/* Tiny ugly CTA */}
              <div className="w-16 h-5 rounded-sm bg-muted-foreground/10 mb-4 border border-muted-foreground/10" />

              {/* Broken image */}
              <div className="flex-1 rounded border border-dashed border-destructive/20 bg-destructive/5 flex items-center justify-center min-h-[60px] relative">
                <span className="text-destructive/30 text-lg">✕</span>
                <span className="absolute bottom-1 text-[6px] font-mono text-destructive/25">404 image not found</span>
              </div>

              {/* Error popup */}
              <ErrorPopup isBad={isBad} lang={lang} />

              {/* Speed bar */}
              <div className="mt-3 flex items-center gap-2">
                <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: isBad ? "90%" : "0%",
                      background: "linear-gradient(90deg, hsl(var(--destructive) / 0.4), hsl(var(--destructive) / 0.7))",
                    }}
                  />
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
              <VisitorDots isBad={false} />
              <AnimatedCursor isBad={isBad} />
              <NotificationPopup isBad={isBad} lang={lang} />

              {/* Clean navbar with shimmer logo */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-20 h-3.5 rounded"
                  style={{
                    background: "linear-gradient(90deg, hsl(var(--primary) / 0.6) 30%, hsl(var(--primary)) 50%, hsl(var(--primary) / 0.6) 70%)",
                    backgroundSize: "200% 100%",
                    animation: !isBad ? "lpShimmer 3s linear infinite" : "none",
                  }}
                />
                <div className="flex gap-3">
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                  <div className="w-10 h-2 rounded bg-muted-foreground/20" />
                </div>
              </div>

              {/* Clean hero with floating */}
              <div className="mb-3">
                <div className="w-4/5 h-5 rounded bg-foreground/80 mb-2" style={{ animation: !isBad ? "lpFloat 6s ease-in-out infinite" : "none" }} />
                <div className="w-3/5 h-5 rounded bg-foreground/50 mb-3" style={{ animation: !isBad ? "lpFloat 5s ease-in-out 0.3s infinite" : "none" }} />
              </div>
              <div className="w-full h-2 rounded bg-muted-foreground/12 mb-1.5" />
              <div className="w-5/6 h-2 rounded bg-muted-foreground/10 mb-4" />

              {/* Beautiful pulsing CTA */}
              <div
                className="w-28 h-8 rounded-lg bg-primary flex items-center justify-center mb-4 relative overflow-hidden"
                style={{
                  animation: !isBad ? "lpFloat 3s ease-in-out infinite" : "none",
                }}
              >
                <span className="text-[8px] font-bold text-primary-foreground tracking-widest uppercase">Get Started</span>
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(90deg, transparent 20%, hsl(var(--primary-foreground) / 0.15) 50%, transparent 80%)",
                    backgroundSize: "200% 100%",
                    animation: !isBad ? "lpShimmer 2s linear infinite" : "none",
                  }}
                />
              </div>

              {/* Feature cards floating at different rates */}
              <div className="flex gap-2 mb-3">
                {[
                  { icon: "⚡", label: lang === "el" ? "Γρήγορη" : "Fast" },
                  { icon: "🎨", label: lang === "el" ? "Όμορφη" : "Beautiful" },
                  { icon: "📱", label: lang === "el" ? "Responsive" : "Responsive" },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl border border-border/30 p-2 bg-muted/10"
                    style={{
                      animation: !isBad ? `lpFloat ${5 + i}s ease-in-out ${i * 0.4}s infinite` : "none",
                    }}
                  >
                    <div className="text-xs mb-1">{card.icon}</div>
                    <div className="text-[7px] font-mono text-muted-foreground/50 mb-0.5">{card.label}</div>
                    <div className="w-full h-1.5 rounded bg-muted-foreground/12" />
                  </div>
                ))}
              </div>

              {/* Star ratings */}
              <div className="flex items-center gap-1 mb-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    className="text-[10px]"
                    style={{
                      animation: !isBad ? `lpStarFloat 2s ease-in-out ${i * 0.2}s infinite` : "none",
                      color: "hsl(var(--primary))",
                    }}
                  >
                    ★
                  </span>
                ))}
                <span className="text-[7px] font-mono text-muted-foreground/40 ml-1">5.0 (128 reviews)</span>
              </div>

              {/* Speed bar */}
              <div className="mt-auto flex items-center gap-2">
                <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: isBad ? "0%" : "12%",
                      background: "linear-gradient(90deg, hsl(var(--primary) / 0.5), hsl(var(--primary)))",
                    }}
                  />
                </div>
                <span className="text-[8px] font-mono text-primary/70 whitespace-nowrap">{t(labels.fast, lang)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Interactive comparison slider ===== */}
        <div className="mt-5">
          <div className="text-center mb-2">
            <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">
              {t(labels.dragHint, lang)}
            </span>
          </div>
          <div
            ref={sliderRef}
            className="relative h-3 rounded-full bg-muted/30 cursor-pointer touch-none"
            onPointerDown={(e) => {
              onPointerDown();
              handleSliderMove(e.clientX);
            }}
          >
            {/* Track fill */}
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${isDragging ? sliderPos : (isBad ? 0 : 100)}%`,
                background: "linear-gradient(90deg, hsl(var(--destructive) / 0.3), hsl(var(--primary) / 0.5))",
                transitionDuration: isDragging ? "0ms" : "700ms",
              }}
            />
            {/* Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 bg-card shadow-md transition-all"
              style={{
                left: `${isDragging ? sliderPos : (isBad ? 0 : 100)}%`,
                transform: `translate(-50%, -50%)`,
                borderColor: (isDragging ? sliderPos < 50 : isBad) ? "hsl(var(--destructive) / 0.5)" : "hsl(var(--primary) / 0.6)",
                transitionDuration: isDragging ? "0ms" : "700ms",
              }}
            />
          </div>
        </div>

        {/* Impact metrics */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
          {[
            { bad: labels.noSeo, good: labels.seo, icon: "🔍" },
            { bad: labels.noCta, good: labels.cta, icon: "🎯" },
            { bad: labels.noTrust, good: labels.trust, icon: "🛡️" },
            { bad: labels.noMobile, good: labels.mobile, icon: "📱" },
            { bad: labels.bounce, good: labels.conversion, icon: "📈" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-xl border p-2 sm:p-2.5 text-center transition-all duration-700"
              style={{
                borderColor: isBad ? "hsl(var(--destructive) / 0.2)" : "hsl(var(--primary) / 0.2)",
                backgroundColor: isBad ? "hsl(var(--destructive) / 0.03)" : "hsl(var(--primary) / 0.03)",
                animation: active ? `lpSlideIn 0.5s ${i * 0.1}s ease-out both` : "none",
              }}
            >
              <div className="text-sm sm:text-base mb-1">{item.icon}</div>
              <div
                className="text-[8px] sm:text-[9px] font-mono leading-tight transition-colors duration-500"
                style={{ color: isBad ? "hsl(var(--destructive) / 0.7)" : "hsl(var(--primary) / 0.9)" }}
              >
                {isBad ? t(item.bad, lang) : t(item.good, lang)}
              </div>
            </div>
          ))}
        </div>

        {/* Revenue chart + visitor indicator */}
        <div className="mt-5 flex items-end justify-between gap-4 rounded-xl border border-border/20 p-3 bg-muted/5">
          <div className="flex-1">
            <div className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider mb-1">
              {t(labels.revenue, lang)}
            </div>
            <MiniChart isBad={isBad} />
            <div
              className="text-[10px] font-mono mt-1 font-bold transition-colors duration-500"
              style={{ color: isBad ? "hsl(var(--destructive) / 0.7)" : "hsl(var(--primary))" }}
            >
              {isBad ? `↓ ${t(labels.lost, lang)}` : `↑ ${t(labels.growing, lang)}`}
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-mono transition-all duration-700 shrink-0"
            style={{
              backgroundColor: isBad ? "hsl(var(--destructive) / 0.1)" : "hsl(var(--primary) / 0.1)",
              color: isBad ? "hsl(var(--destructive) / 0.8)" : "hsl(var(--primary))",
            }}
          >
            <span className="text-sm">{isBad ? "👋" : "🤝"}</span>
            <span>87% {isBad ? t(labels.visitors, lang) : t(labels.visitorsStay, lang)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageAnimation;
