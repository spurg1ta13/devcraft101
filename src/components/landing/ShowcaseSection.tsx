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

const ease = [0.16, 1, 0.3, 1] as const;

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: ease as unknown as [number, number, number, number],
      staggerChildren: 0.08,
      delayChildren: i * 0.15 + 0.3,
    },
  }),
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: "easeOut" as const },
  }),
};

const ShowcaseSection = () => {
  return (
    <section id="work" className="relative py-32 md:py-44" style={{ perspective: "1200px" }}>
      <div className="container">
        {/* Showcase heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-6"
          >
            Selected work
          </motion.span>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]"
            >
              Built to
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9] text-muted-foreground"
            >
              stand out.
            </motion.h2>
          </div>
        </motion.div>

        {/* Case study cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className="group cursor-pointer relative bg-card/60 glass border border-border/30 rounded-3xl p-8 md:p-10 hover:border-primary/20 transition-colors duration-700 flex flex-col justify-between min-h-[320px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(var(--primary) / 0.06), transparent 40%)" }}
              />

              <div>
                {/* Top: tag + arrow */}
                <motion.div variants={childVariants} className="flex items-center justify-between mb-10">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {project.tag}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500" />
                </motion.div>

                {/* Title */}
                <motion.h3
                  variants={childVariants}
                  className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-4 group-hover:text-foreground transition-colors duration-300"
                >
                  {project.title}
                </motion.h3>

                {/* Description */}
                <motion.p variants={childVariants} className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </motion.p>
              </div>

              {/* Tech pills */}
              <motion.div variants={childVariants} className="flex flex-wrap gap-2 mt-8">
                {project.techs.map((tech, ti) => (
                  <motion.span
                    key={tech}
                    custom={ti}
                    variants={pillVariants}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border/40 rounded-full px-3 py-1 group-hover:border-primary/20 group-hover:text-foreground/60 transition-all duration-500"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
