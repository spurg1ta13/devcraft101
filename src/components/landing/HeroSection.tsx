import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 15);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 8);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden noise-overlay pb-16 md:pb-24">
      {/* Banner image as full background */}
      <motion.div className="absolute inset-0" style={{ y: bannerY, x: springX }}>
        <motion.img
          src={heroBanner}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 0.3 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
      
      {/* Animated blob */}
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-primary/[0.04] animate-morph blur-[80px]" />
      <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-ember/[0.03] animate-morph blur-[60px]" style={{ animationDelay: "-4s" }} />

      {/* Content */}
      <motion.div style={{ y: contentY, opacity }} className="container relative z-10">
        {/* Status line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground tracking-wide">AVAILABLE FOR PROJECTS</span>
          </div>
          <div className="h-px flex-1 max-w-[100px] bg-border" />
        </motion.div>

        {/* Main title - editorial style */}
        <div className="max-w-6xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
            >
              We craft digital
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 120 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(2.8rem,8vw,7rem)] font-extrabold leading-[0.9] tracking-[-0.03em]"
            >
              experiences that{" "}
              <span className="text-gradient-gold italic">perform</span>
            </motion.h1>
          </div>
        </div>

        {/* Bottom row - asymmetric info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="text-muted-foreground text-base md:text-lg max-w-md leading-relaxed font-body">
            Full-stack development, bespoke UI/UX, and ISTQB-certified QA — 
            from concept to launch, we obsess over every pixel and every line of code.
          </p>

          <div className="flex items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 rounded-2xl font-display font-bold text-sm shadow-glow group"
            >
              Start a Project
              <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </motion.a>
            <motion.a
              href="#work"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-glass border border-glass text-foreground font-display font-medium text-sm"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              Our Work
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
