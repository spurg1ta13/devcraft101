import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "Deep dive into your vision. We map goals, users, and tech requirements into a clear roadmap.",
    duration: "1-2 weeks",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Design",
    description: "From wireframes to polished prototypes. Every interaction designed with purpose and precision.",
    duration: "2-3 weeks",
  },
  {
    icon: Code,
    number: "03",
    title: "Develop",
    description: "Clean, modular code in agile sprints. Full transparency with demos at every milestone.",
    duration: "4-8 weeks",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Test & Launch",
    description: "ISTQB-certified QA, performance audits, and a flawless launch. Zero surprises guaranteed.",
    duration: "1-2 weeks",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-24 md:py-36 overflow-hidden">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-24">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-wider uppercase block mb-4"
            >
              [02] — Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl md:text-6xl font-extrabold tracking-[-0.02em] leading-[1]"
            >
              From idea
              <br />
              <span className="text-gradient-cool">to launch</span>
            </motion.h2>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-border to-transparent origin-top"
          />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative md:grid md:grid-cols-2 md:gap-16 md:py-12 ${isLeft ? "" : ""}`}
                >
                  {/* Content */}
                  <div className={`${isLeft ? "md:text-right md:pr-16" : "md:col-start-2 md:pl-16"}`}>
                    <div className={`bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:border-primary/15 transition-all duration-500 group`}>
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center border border-border/50 group-hover:border-primary/20 transition-colors">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className={isLeft ? "md:text-right" : ""}>
                          <span className="font-mono text-[10px] text-primary/70 tracking-wider">{step.number}</span>
                          <h3 className="font-display text-xl font-bold tracking-tight">{step.title}</h3>
                        </div>
                      </div>
                      <p className={`text-muted-foreground text-sm leading-relaxed mb-3 ${isLeft ? "md:text-right" : ""}`}>
                        {step.description}
                      </p>
                      <span className={`font-mono text-[10px] text-muted-foreground/50 tracking-wider ${isLeft ? "md:text-right block" : ""}`}>
                        ~ {step.duration}
                      </span>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-background border-2 border-primary/40 relative">
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
