import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, ShoppingCart } from "lucide-react";

const projects = [
  {
    title: "Crystal Platform",
    tag: "Web App · React",
    description: "Complete platform rebuild with modern stack. Migrated legacy codebase to React + TypeScript with cloud-native architecture.",
    techs: ["React", "TypeScript", "AWS"],
    icon: Code2,
    accent: "from-primary/20 to-primary/5",
    borderAccent: "group-hover:border-primary/40",
    stat: "98",
    statLabel: "Lighthouse",
  },
  {
    title: "Neural Architecture",
    tag: "Design System · Figma",
    description: "Enterprise design system powering 12 product teams. Unified brand language across web, mobile, and internal tools.",
    techs: ["Figma", "Storybook", "Tokens"],
    icon: Palette,
    accent: "from-blue-500/20 to-blue-500/5",
    borderAccent: "group-hover:border-blue-500/40",
    stat: "200+",
    statLabel: "Components",
  },
  {
    title: "Fluid Commerce",
    tag: "E-Commerce · Full Stack",
    description: "High-performance storefront with custom checkout flow. ISTQB-certified QA ensured zero-defect launch across 8 markets.",
    techs: ["Next.js", "Stripe", "Node"],
    icon: ShoppingCart,
    accent: "from-emerald-500/20 to-emerald-500/5",
    borderAccent: "group-hover:border-emerald-500/40",
    stat: "€12M",
    statLabel: "Revenue",
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
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary block mb-6">
            Selected work
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Built to
            <br />
            <span className="text-primary">stand out.</span>
          </h2>
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
                className={`group cursor-pointer relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-8 md:p-10 ${project.borderAccent} transition-all duration-700 flex flex-col justify-between min-h-[420px]`}
              >
                {/* Background gradient glow */}
                <div className={`absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-radial ${project.accent} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3`} />

                <div className="relative z-10">
                  {/* Top row: icon + tag + arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        {project.tag}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground/30 group-hover:text-foreground group-hover:rotate-[-10deg] transition-all duration-500" />
                  </div>

                  {/* Stat */}
                  <div className="mb-6">
                    <span className="text-5xl md:text-6xl font-black tracking-[-0.04em] text-primary leading-none">
                      {project.stat}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground ml-3">
                      {project.statLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 text-foreground">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech pills */}
                <div className="relative z-10 flex flex-wrap gap-2 mt-8">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-foreground/70 bg-card border border-border/50 rounded-full px-4 py-1.5 group-hover:border-primary/30 transition-all duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
