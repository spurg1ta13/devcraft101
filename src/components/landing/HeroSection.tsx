import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Code2, Palette, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpg";

const FloatingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={className}
    animate={{
      y: [0, -20, 10, -5, 0],
      x: [0, 10, -5, 8, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-primary"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 0.8, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse parallax for banner
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.6, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    }),
  };

  const titleWords = ["We", "Build"];
  const titleWords2 = ["Digital", "Products"];
  const titleWords3 = ["That", "Perform."];

  const particles = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.5,
    x: `${10 + Math.random() * 80}%`,
    y: `${20 + Math.random() * 60}%`,
    size: 2 + Math.random() * 3,
  }));

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden noise-overlay">
      {/* === HERO BANNER IMAGE === */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bannerY, scale: bannerScale, x: springX, rotateY: springX }}
      >
        <motion.img
          src={heroBanner}
          alt="Digital innovation banner"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        {/* Overlay gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </motion.div>

      {/* Animated grid background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Floating orbs */}
      <FloatingOrb className="absolute top-[15%] left-[20%] w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />
      <FloatingOrb className="absolute bottom-[20%] right-[15%] w-96 h-96 rounded-full bg-primary/3 blur-[120px]" delay={2} />
      <FloatingOrb className="absolute top-[50%] right-[40%] w-48 h-48 rounded-full bg-primary/4 blur-[80px]" delay={4} />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Orbiting dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
        <div className="animate-orbit">
          <div className="glow-dot" />
        </div>
      </div>

      {/* === BANNER GLOW RING (decorative) === */}
      <motion.div
        className="absolute top-[30%] right-[5%] md:right-[10%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-primary/10"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 glow-dot" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-primary/40" />
      </motion.div>

      <motion.div
        className="absolute top-[30%] right-[5%] md:right-[10%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-primary/5"
        style={{ top: "calc(30% + 75px)", right: "calc(10% + 75px)" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/60" />
      </motion.div>

      {/* === CONTENT === */}
      <motion.div style={{ y, opacity }} className="container relative z-10 py-20 md:py-32">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="flex items-center gap-3 mb-10"
          >
            <motion.div
              animate={{ width: [0, 48] }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="h-px bg-primary"
            />
            <motion.div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
              animate={{ boxShadow: ["0 0 0px hsl(42 100% 56% / 0)", "0 0 20px hsl(42 100% 56% / 0.15)", "0 0 0px hsl(42 100% 56% / 0)"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary font-display text-xs font-medium tracking-widest uppercase">
                Development Services
              </span>
            </motion.div>
          </motion.div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tight mb-8" style={{ perspective: "1000px" }}>
            <div className="overflow-hidden">
              {titleWords.map((word, i) => (
                <motion.span key={word} custom={i} initial="hidden" animate="visible" variants={letterVariants} className="inline-block mr-[0.3em]">
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden">
              {titleWords2.map((word, i) => (
                <motion.span key={word} custom={i + 3} initial="hidden" animate="visible" variants={letterVariants} className="inline-block mr-[0.3em] text-gradient-gold">
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden">
              {titleWords3.map((word, i) => (
                <motion.span key={word} custom={i + 6} initial="hidden" animate="visible" variants={letterVariants} className="inline-block mr-[0.3em]">
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-body"
          >
            From custom web development to pixel-perfect UI/UX design and 
            ISTQB-certified quality assurance — we deliver software that's 
            built right, looks stunning, and works flawlessly.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base px-8 shadow-gold group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Your Project
                  <motion.span className="ml-2 inline-block" animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary hover:border-primary/30 font-display font-medium text-base px-8 transition-all duration-300 backdrop-blur-sm">
                View Our Work
              </Button>
            </motion.div>
          </motion.div>

          {/* Service chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap gap-6 md:gap-10"
          >
            {[
              { icon: Code2, label: "Web Development" },
              { icon: Palette, label: "UI/UX Design" },
              { icon: ShieldCheck, label: "ISTQB Certified Testing" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + i * 0.15 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-muted-foreground group cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-gold transition-all duration-300">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium font-display group-hover:text-foreground transition-colors duration-300">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent" />
    </section>
  );
};

export default HeroSection;
