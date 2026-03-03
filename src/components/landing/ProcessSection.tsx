import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  { number: "01", title: "Discover", description: "We learn your goals, audience, and technical requirements through deep-dive sessions.", icon: Search },
  { number: "02", title: "Design", description: "Custom UI/UX designs crafted for your brand — wireframes to high-fidelity prototypes.", icon: PenTool },
  { number: "03", title: "Develop", description: "Clean, scalable code built with modern tech stacks. Iterative sprints with full transparency.", icon: Code },
  { number: "04", title: "Test & Deploy", description: "ISTQB-certified QA ensures zero surprises. We test, optimize, and launch with confidence.", icon: Rocket },
];

const ProcessSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="glow-line w-full mb-24" />
      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-px bg-primary"
            />
            <span className="text-primary font-display text-sm font-medium tracking-widest uppercase">
              Process
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            How We Work.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 origin-left"
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Step circle with icon */}
              <div className="relative mb-8">
                <motion.div
                  className="w-16 h-16 rounded-2xl bg-gradient-card border border-border flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-gold transition-all duration-500"
                  whileHover={{ y: -4, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <step.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-display font-bold text-primary">{step.number}</span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold mb-3 group-hover:text-gradient-gold transition-all duration-300">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
