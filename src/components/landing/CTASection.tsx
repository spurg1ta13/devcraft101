import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const CTASection = () => {
  return (
    <section id="contact" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.03] animate-morph blur-[100px]" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left - Editorial text */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-wider uppercase block mb-4"
            >
              [03] — Contact
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.02em] leading-[0.95] mb-6"
            >
              Let's build
              <br />
              something{" "}
              <span className="text-gradient-gold italic">great</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-base leading-relaxed max-w-md mb-10"
            >
              Have a project in mind? We'd love to hear about it. 
              Drop us a line and we'll get back within 24 hours with a free consultation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              {[
                { icon: Mail, text: "hello@devcraft.studio" },
                { icon: Phone, text: "+1 (555) 123-4567" },
                { icon: MapPin, text: "Remote-first, worldwide" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-muted-foreground group">
                  <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
                    <item.icon className="h-4 w-4 text-primary/70" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Card glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/[0.05] blur-3xl rounded-full" />
              
              <h3 className="font-display text-xl font-bold mb-6">Start your project</h3>
              
              <div className="space-y-4 mb-6">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors font-body"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors font-body"
                />
                <textarea
                  placeholder="Tell us about your project..."
                  rows={4}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/30 transition-colors resize-none font-body"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full bg-primary text-primary-foreground font-display font-bold text-sm py-4 rounded-xl shadow-glow flex items-center justify-center gap-2 hover:brightness-110 transition-all"
              >
                Send Message
                <ArrowRight className="h-4 w-4" />
              </motion.button>

              <p className="text-center text-muted-foreground/40 text-xs mt-4 font-mono">
                We respond within 24 hours
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
