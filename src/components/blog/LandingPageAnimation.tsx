import { useEffect, useRef } from "react";

const LandingPageAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Restart animations when scrolled into view
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("lp-anim-active");
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="my-14 flex justify-center" aria-hidden="true">
      <style>{`
        .lp-anim-active .lp-float-1 { animation: lpFloat 6s ease-in-out infinite; }
        .lp-anim-active .lp-float-2 { animation: lpFloat 5s ease-in-out 0.5s infinite; }
        .lp-anim-active .lp-float-3 { animation: lpFloat 7s ease-in-out 1s infinite; }
        .lp-anim-active .lp-pulse { animation: lpPulse 2s ease-in-out infinite; }
        .lp-anim-active .lp-shimmer { animation: lpShimmer 3s linear infinite; }
        .lp-anim-active .lp-wave { animation: lpWave 8s linear infinite; }
        .lp-anim-active .lp-slide-up { animation: lpSlideUp 0.8s ease-out both; }
        .lp-anim-active .lp-slide-up-2 { animation: lpSlideUp 0.8s 0.2s ease-out both; }
        .lp-anim-active .lp-slide-up-3 { animation: lpSlideUp 0.8s 0.4s ease-out both; }
        .lp-anim-active .lp-slide-up-4 { animation: lpSlideUp 0.8s 0.6s ease-out both; }
        .lp-anim-active .lp-slide-up-5 { animation: lpSlideUp 0.8s 0.8s ease-out both; }
        .lp-anim-active .lp-cursor { animation: lpCursor 4s ease-in-out infinite; }
        .lp-anim-active .lp-click { animation: lpClick 4s ease-in-out infinite; }
        .lp-anim-active .lp-bar-fill { animation: lpBarFill 2s 1.2s ease-out both; }
        .lp-anim-active .lp-counter { animation: lpCounter 2s 1.4s ease-out both; }
        .lp-anim-active .lp-glow { animation: lpGlow 3s ease-in-out infinite; }

        @keyframes lpFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes lpPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        @keyframes lpShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes lpWave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes lpSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lpCursor {
          0%, 20% { transform: translate(0, 0); }
          40%, 50% { transform: translate(60px, 80px); }
          55% { transform: translate(60px, 78px); }
          60%, 80% { transform: translate(60px, 80px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes lpClick {
          0%, 49% { transform: scale(0); opacity: 0; }
          52% { transform: scale(1.5); opacity: 0.6; }
          60% { transform: scale(2.5); opacity: 0; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes lpBarFill {
          from { width: 12%; }
          to { width: 87%; }
        }
        @keyframes lpCounter {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lpGlow {
          0%, 100% { box-shadow: 0 0 15px 2px hsl(var(--primary) / 0.15); }
          50% { box-shadow: 0 0 30px 6px hsl(var(--primary) / 0.3); }
        }
      `}</style>

      <div
        ref={containerRef}
        className="w-full max-w-lg rounded-2xl border border-border/40 bg-card overflow-hidden lp-glow"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-border/30 bg-muted/30">
          <div className="w-2.5 h-2.5 rounded-full bg-destructive/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
          <div className="flex-1 mx-3 h-5 rounded-md bg-muted/50 flex items-center px-2.5 overflow-hidden relative">
            <span className="text-[9px] font-mono text-muted-foreground/50">yourbrand.com</span>
            {/* Shimmer across URL bar */}
            <div
              className="lp-shimmer absolute inset-0 opacity-30"
              style={{
                background: "linear-gradient(90deg, transparent 30%, hsl(var(--primary) / 0.15) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </div>

        <div className="relative p-5 space-y-3.5 min-h-[320px] overflow-hidden">
          {/* Moving wave background */}
          <div className="absolute inset-0 opacity-[0.04] overflow-hidden pointer-events-none">
            <div className="lp-wave flex whitespace-nowrap" style={{ width: "200%" }}>
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i} className="text-primary text-6xl font-bold mx-4 select-none">
                  {"</>"}
                </span>
              ))}
            </div>
          </div>

          {/* Navbar */}
          <div className="lp-slide-up flex items-center justify-between opacity-0 relative z-10">
            <div className="w-20 h-3.5 rounded bg-primary/70 lp-shimmer"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary) / 0.7) 30%, hsl(var(--primary)) 50%, hsl(var(--primary) / 0.7) 70%)",
                backgroundSize: "200% 100%",
              }}
            />
            <div className="flex gap-3">
              <div className="w-10 h-2 rounded bg-muted-foreground/20" />
              <div className="w-10 h-2 rounded bg-muted-foreground/20" />
              <div className="w-10 h-2 rounded bg-muted-foreground/20" />
            </div>
          </div>

          {/* Hero section */}
          <div className="lp-slide-up-2 pt-3 pb-1 opacity-0 relative z-10">
            <div className="lp-float-1 w-4/5 h-5 rounded bg-foreground/80 mb-2.5" />
            <div className="lp-float-2 w-3/5 h-5 rounded bg-foreground/50 mb-4" />
            <div className="w-full h-2 rounded bg-muted-foreground/12 mb-1.5" />
            <div className="w-11/12 h-2 rounded bg-muted-foreground/12 mb-1.5" />
            <div className="w-4/5 h-2 rounded bg-muted-foreground/10" />
          </div>

          {/* CTA Button - pulsing */}
          <div className="lp-slide-up-3 opacity-0 relative z-10">
            <div className="lp-pulse w-28 h-8 rounded-lg bg-primary flex items-center justify-center cursor-pointer relative overflow-hidden">
              <span className="text-[8px] font-bold text-primary-foreground tracking-widest uppercase">Get Started</span>
              <div
                className="lp-shimmer absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 20%, hsl(var(--primary-foreground) / 0.12) 50%, transparent 80%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
          </div>

          {/* Feature cards - floating */}
          <div className="lp-slide-up-4 flex gap-2.5 pt-1 opacity-0 relative z-10">
            {[
              { delay: "lp-float-1", icon: "⚡" },
              { delay: "lp-float-2", icon: "🎨" },
              { delay: "lp-float-3", icon: "📱" },
            ].map((card, n) => (
              <div
                key={n}
                className={`${card.delay} flex-1 rounded-xl border border-border/30 p-2.5 bg-muted/15 hover:bg-muted/30 transition-colors`}
              >
                <div className="text-sm mb-1.5">{card.icon}</div>
                <div className="w-full h-1.5 rounded bg-muted-foreground/15 mb-1" />
                <div className="w-3/4 h-1.5 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="lp-slide-up-5 opacity-0 relative z-10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] font-mono text-muted-foreground/50 uppercase tracking-wider">Conversion Rate</span>
              <span className="lp-counter text-[9px] font-mono font-bold text-primary opacity-0">+340%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="lp-bar-fill h-full rounded-full"
                style={{
                  width: "12%",
                  background: "linear-gradient(90deg, hsl(var(--primary) / 0.7), hsl(var(--primary)))",
                }}
              />
            </div>
          </div>

          {/* Animated cursor */}
          <div className="lp-cursor absolute top-8 left-12 z-20 pointer-events-none">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" className="drop-shadow-md">
              <path d="M1 1L1 15L5 11L9 19L12 17.5L8 10L13 9L1 1Z" fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth="1" />
            </svg>
            <div className="lp-click absolute top-0 left-0 w-3 h-3 rounded-full border-2 border-primary/60 -translate-x-1 -translate-y-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageAnimation;
