import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Crystal Platform",
    tag: "Web App · React",
    description: "Complete platform rebuild with modern stack. Migrated legacy codebase to React + TypeScript with cloud-native architecture.",
    techs: ["React", "TypeScript", "AWS"],
  },
  {
    title: "Neural Architecture",
    tag: "Design System · Figma",
    description: "Enterprise design system powering 12 product teams. Unified brand language across web, mobile, and internal tools.",
    techs: ["Figma", "Storybook", "Tokens"],
  },
  {
    title: "Fluid Commerce",
    tag: "E-Commerce · Full Stack",
    description: "High-performance storefront with custom checkout flow. ISTQB-certified QA ensured zero-defect launch across 8 markets.",
    techs: ["Next.js", "Stripe", "Node"],
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
              transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.4 } }}
              className="group cursor-pointer relative bg-card/60 glass border border-border/30 rounded-3xl p-8 md:p-10 hover:border-primary/20 transition-colors duration-700 flex flex-col justify-between min-h-[320px]"
            >
              <div>
                {/* Top: tag + arrow */}
                <div className="flex items-center justify-between mb-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {project.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 group-hover:text-foreground transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border/40 rounded-full px-3 py-1 group-hover:border-primary/20 group-hover:text-foreground/60 transition-all duration-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
