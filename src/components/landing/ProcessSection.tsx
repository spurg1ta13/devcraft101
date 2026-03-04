import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  { num: "01", title: "Discover", desc: "Goals, users, constraints. We go deep before we go wide.", icon: Search },
  { num: "02", title: "Design", desc: "Wireframes → prototypes → pixel-perfect UI. You approve every step.", icon: PenTool },
  { num: "03", title: "Build", desc: "Agile sprints, clean code, weekly demos. Full transparency.", icon: Code2 },
  { num: "04", title: "Ship", desc: "ISTQB-certified QA, performance tuning, and a flawless launch.", icon: Rocket },
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
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-6">
            How it works
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Four steps.
            <br />
            <span className="text-gradient">Zero surprises.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="group relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-10 md:p-12 hover:border-primary/30 hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] transition-all duration-700 min-h-[280px]"
              >
                {/* Background number */}
                <span className="absolute bottom-4 right-6 text-[120px] md:text-[160px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-700">
                  {step.num}
                </span>

                {/* Hover glow */}
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-1/3 -translate-y-1/3" />

                <div className="relative z-10">
                  {/* Icon + number row */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-500">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">{step.num}</span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-4 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">{step.desc}</p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
