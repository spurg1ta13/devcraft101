import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-32 md:py-44 overflow-hidden">
      {/* Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] animate-morph blur-[100px]" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Big CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-8">
              Next step
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-10">
              Got a project?
              <br />
              <span className="text-gradient">Let's talk.</span>
            </h2>
          </motion.div>

          {/* Contact form — minimal, wide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-card border border-border/30 rounded-2xl px-6 py-5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-card border border-border/30 rounded-2xl px-6 py-5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors"
              />
            </div>
            <textarea
              placeholder="Tell us about your project..."
              rows={4}
              className="w-full bg-card border border-border/30 rounded-2xl px-6 py-5 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/30 transition-colors resize-none"
            />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider uppercase">
                We respond within 24 hours
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full shadow-glow flex items-center gap-3 hover:brightness-110 transition-all"
              >
                Send message
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
