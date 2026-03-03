import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100dvh] flex flex-col overflow-hidden noise">
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={heroBanner} alt="" className="w-full h-full object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      {/* Floating 3D object */}
      <motion.div
        className="absolute top-1/2 right-[8%] -translate-y-1/2 w-[280px] h-[280px] md:w-[400px] md:h-[400px] hidden md:block"
        animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={showcase3} alt="" className="w-full h-full object-cover rounded-[40%] opacity-60" style={{ mixBlendMode: "screen" }} />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 flex-1 flex flex-col justify-end pb-16 md:pb-24"
      >
        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Open for Q2 2026
          </span>
        </motion.div>

        {/* Title - oversized, cinematic */}
        <div className="overflow-hidden mb-4">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.85] tracking-[-0.05em]">
              We don't do
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
              <span className="text-gradient italic">ordinary</span>
              <span className="text-primary">.</span>
            </h1>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-8 border-t border-border/30"
        >
          <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
            Web development, bespoke interfaces, and ISTQB-certified quality
            assurance — crafted for brands that refuse to blend in.
          </p>

          <div className="flex items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full shadow-glow tracking-[-0.01em]"
            >
              Start a project →
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-4 font-mono text-[11px] uppercase tracking-[0.1em]"
            >
              Explore ↓
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
