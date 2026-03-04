import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import heroBanner from "@/assets/hero-banner.jpg";
import showcase3 from "@/assets/showcase-3.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse-follow parallax for 3D element
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section ref={ref} className="relative h-[100dvh] flex flex-col overflow-hidden noise">
      {/* Background image */}
      <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
        <img src={heroBanner} alt="" className="w-full h-full object-cover opacity-20" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />

      {/* Floating 3D object with mouse parallax */}
      <motion.div
        className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[320px] h-[320px] md:w-[520px] md:h-[520px] lg:w-[600px] lg:h-[600px] hidden md:block"
        style={{ x: springX, y: springY }}
        animate={{ rotate: [0, 3, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <img
            src={showcase3}
            alt=""
            className="w-full h-full object-cover rounded-[40%] opacity-70"
            style={{ mixBlendMode: "screen" }}
          />
          <div className="absolute inset-0 rounded-[40%] bg-gradient-to-br from-primary/10 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="container relative z-10 flex-1 flex flex-col justify-center"
      >

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
          <p className="text-foreground/70 text-sm md:text-base max-w-sm leading-relaxed">
            AI-driven web development, bespoke interfaces, and ISTQB-certified quality
            assurance — crafted for brands that refuse to blend in.
          </p>

          <motion.a
            href="#work"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-primary text-primary-foreground font-bold text-sm px-8 py-4 rounded-full shadow-glow tracking-[-0.01em] font-mono uppercase tracking-[0.1em]"
          >
            Explore ↓
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
