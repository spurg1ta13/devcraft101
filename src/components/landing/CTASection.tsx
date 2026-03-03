import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="glow-line w-full mb-24" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to Build
            <br />
            <span className="text-gradient-gold">Something Great?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Let's turn your vision into reality. Get in touch and we'll scope your 
            project with a free consultation.
          </p>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-semibold text-base px-10 shadow-gold">
            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
