import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="glow-line w-full mb-24" />
      
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center max-w-3xl mx-auto"
        >
          {/* Decorative background */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-primary font-display text-xs font-medium tracking-widest uppercase">Free Consultation</span>
          </motion.div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 relative">
            Ready to Build
            <br />
            <span className="text-gradient-gold">Something Great?</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Let's turn your vision into reality. Get in touch and we'll scope your 
            project with a free consultation.
          </p>
          
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base px-12 py-6 shadow-gold-lg group">
              <span className="flex items-center gap-2">
                Get in Touch
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
