import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Crystal Platform",
    tag: "Web App · React",
    result: "3x faster load times",
    metric: "98",
    metricLabel: "Lighthouse score",
    description: "Complete platform rebuild with modern stack. Migrated legacy codebase to React + TypeScript with cloud-native architecture.",
  },
  {
    title: "Neural Architecture",
    tag: "Design System · Figma",
    result: "40% fewer support tickets",
    metric: "200+",
    metricLabel: "Components shipped",
    description: "Enterprise design system powering 12 product teams. Unified brand language across web, mobile, and internal tools.",
  },
  {
    title: "Fluid Commerce",
    tag: "E-Commerce · Full Stack",
    result: "2.4x conversion lift",
    metric: "€12M",
    metricLabel: "Revenue processed",
    description: "High-performance storefront with custom checkout flow. ISTQB-certified QA ensured zero-defect launch across 8 markets.",
  },
];

const ShowcaseSection = () => {
  return (
    <section id="work" className="relative py-32 md:py-44">
      <div className="container">

        {/* Showcase heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-6">
            Selected work
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Built to
            <br />
            <span className="text-muted-foreground">stand out.</span>
          </h2>
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer relative bg-card/60 glass border border-border/30 rounded-3xl p-8 md:p-10 hover:border-primary/20 transition-all duration-700"
            >
              {/* Top: tag + arrow */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {project.tag}
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
              </div>

              {/* Big metric */}
              <div className="mb-6">
                <div className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-gradient leading-none mb-1">
                  {project.metric}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  {project.metricLabel}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold tracking-[-0.02em] mb-3 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Result badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary">
                  {project.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
