import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Discover", desc: "Goals, users, constraints. We go deep before we go wide." },
  { num: "02", title: "Design", desc: "Wireframes → prototypes → pixel-perfect UI. You approve every step." },
  { num: "03", title: "Build", desc: "Agile sprints, clean code, weekly demos. Full transparency." },
  { num: "04", title: "Ship", desc: "ISTQB-certified QA, performance tuning, and a flawless launch." },
];

const ProcessSection = () => {
  return (
    <section id="process" className="relative py-32 md:py-44 bg-dot-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-6">
            How it works
          </span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.85]">
            Four steps.
            <br />
            <span className="text-gradient">Zero surprises.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-card/60 glass border border-border/30 rounded-3xl p-8 md:p-10 hover:border-primary/15 transition-all duration-700"
            >
              {/* Number bg */}
              <span className="absolute top-6 right-8 text-[80px] md:text-[100px] font-black text-foreground/[0.02] leading-none select-none pointer-events-none">
                {step.num}
              </span>

              <div className="relative z-10">
                <span className="font-mono text-[10px] text-primary tracking-[0.2em] uppercase block mb-4">{step.num}</span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
