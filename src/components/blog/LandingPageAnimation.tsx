import { useEffect, useState } from "react";

const LandingPageAnimation = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 900),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => setStep(4), 1900),
      setTimeout(() => setStep(5), 2400),
      setTimeout(() => setStep(6), 2900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="my-12 flex justify-center" aria-hidden="true">
      <div className="w-full max-w-md rounded-xl border border-border/40 bg-card overflow-hidden shadow-[0_0_40px_-12px_hsl(var(--primary)/0.15)]">
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border/30 bg-muted/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <div className="flex-1 mx-2 h-4 rounded bg-muted/50 flex items-center px-2">
            <span className="text-[8px] font-mono text-muted-foreground/50 truncate">https://yourbrand.com</span>
          </div>
        </div>

        <div className="p-4 space-y-3 min-h-[260px]">
          {/* Navbar */}
          <div
            className="flex items-center justify-between transition-all duration-700 ease-out"
            style={{
              opacity: step >= 1 ? 1 : 0,
              transform: step >= 1 ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            <div className="w-16 h-3 rounded bg-primary/70" />
            <div className="flex gap-2">
              <div className="w-8 h-2 rounded bg-muted-foreground/20" />
              <div className="w-8 h-2 rounded bg-muted-foreground/20" />
              <div className="w-8 h-2 rounded bg-muted-foreground/20" />
            </div>
          </div>

          {/* Hero */}
          <div
            className="pt-4 pb-2 transition-all duration-700 ease-out"
            style={{
              opacity: step >= 2 ? 1 : 0,
              transform: step >= 2 ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <div className="w-3/4 h-4 rounded bg-foreground/80 mb-2" />
            <div className="w-1/2 h-4 rounded bg-foreground/50 mb-3" />
            <div className="w-full h-2 rounded bg-muted-foreground/15 mb-1" />
            <div className="w-5/6 h-2 rounded bg-muted-foreground/15" />
          </div>

          {/* CTA Button */}
          <div
            className="transition-all duration-500 ease-out"
            style={{
              opacity: step >= 3 ? 1 : 0,
              transform: step >= 3 ? "scale(1)" : "scale(0.8)",
            }}
          >
            <div className="w-24 h-6 rounded-md bg-primary flex items-center justify-center">
              <span className="text-[7px] font-bold text-primary-foreground tracking-wide">GET STARTED</span>
            </div>
          </div>

          {/* Feature cards */}
          <div
            className="flex gap-2 pt-2 transition-all duration-700 ease-out"
            style={{
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? "translateY(0)" : "translateY(16px)",
            }}
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex-1 rounded-lg border border-border/30 p-2 bg-muted/20">
                <div className="w-5 h-5 rounded bg-primary/20 mb-1.5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-primary/50" />
                </div>
                <div className="w-full h-1.5 rounded bg-muted-foreground/15 mb-1" />
                <div className="w-3/4 h-1.5 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div
            className="rounded-lg border border-primary/20 p-2 bg-primary/5 transition-all duration-700 ease-out"
            style={{
              opacity: step >= 5 ? 1 : 0,
              transform: step >= 5 ? "translateX(0)" : "translateX(-16px)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-4 h-4 rounded-full bg-primary/30" />
              <div className="w-16 h-1.5 rounded bg-muted-foreground/20" />
            </div>
            <div className="w-full h-1.5 rounded bg-muted-foreground/10 mb-0.5" />
            <div className="w-2/3 h-1.5 rounded bg-muted-foreground/10" />
          </div>

          {/* Conversion meter */}
          <div
            className="transition-all duration-1000 ease-out"
            style={{
              opacity: step >= 6 ? 1 : 0,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] font-mono text-muted-foreground/60 uppercase tracking-wider">Conversion Rate</span>
              <span className="text-[8px] font-mono font-bold text-primary">+340%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-muted/40 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-1000 ease-out"
                style={{ width: step >= 6 ? "85%" : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageAnimation;
