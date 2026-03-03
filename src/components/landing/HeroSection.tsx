import { motion } from "framer-motion";
import { ArrowRight, Code2, Palette, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/3 blur-[100px]" />

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-8"
          >
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
              Development Services
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8"
          >
            We Build
            <br />
            <span className="text-gradient-gold">Digital Products</span>
            <br />
            That Perform.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl max-w-xl mb-10 leading-relaxed font-body"
          >
            From custom web development to pixel-perfect UI/UX design and 
            ISTQB-certified quality assurance — we deliver software that's 
            built right, looks stunning, and works flawlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base px-8 shadow-gold">
              Start Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary font-display font-medium text-base px-8">
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8 md:gap-12"
          >
            {[
              { icon: Code2, label: "Web Development" },
              { icon: Palette, label: "UI/UX Design" },
              { icon: ShieldCheck, label: "ISTQB Certified Testing" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-muted-foreground">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium font-display">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
