import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, ShieldCheck } from "lucide-react";

const projects = [
  {
    title: "Seamless Experience",
    tag: "Responsive & Cross-Platform",
    description: "We deliver products that perform flawlessly across every operating system and device. From iOS and Android to Windows and macOS, we ensure a unified user experience without compromise.",
    techs: ["WEB", "MOBILE", "CROSS-PLATFORM", "OS AGNOSTIC"],
    icon: Code2,
    accent: "from-primary/20 to-primary/5",
    borderAccent: "group-hover:border-primary/40",
    stat: "100%",
    statLabel: "Multi-Platform",
  },
  {
    title: "ISTQB Certified Quality",
    tag: "Defects Policy",
    description: "Our rigorous testing processes guarantee a bug-free product. By implementing strict quality control and ISTQB-certified standards, we achieve maximum stability and security before your first launch.",
    techs: ["ISTQB", "QA", "BUG-FREE", "SECURITY"],
    icon: ShieldCheck,
    accent: "from-primary/20 to-primary/5",
    borderAccent: "group-hover:border-primary/40",
    stat: "Zero",
    statLabel: "Defects",
  },
  {
    title: "Custom Design Solutions",
    tag: "UI/UX Excellence",
    description: "We move beyond templates. When uniqueness is key, we build tailor-made design systems that not only represent your brand but turn users into loyal customers through intuitive interfaces.",
    techs: ["FIGMA", "CUSTOM UI", "UX AUDIT", "DESIGN SYSTEMS"],
    icon: Palette,
    accent: "from-primary/20 to-primary/5",
    borderAccent: "group-hover:border-primary/40",
    stat: "Bespoke",
    statLabel: "Design",
  },
];

const ShowcaseSection = () => {
  return (
    <section id="work" className="relative section-rhythm">
      <div className="container">
        {/* Showcase heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6">
            Selected work
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            Built to
            <br />
            <span className="text-gradient">stand out.</span>
          </h2>
        </motion.div>

        {/* Case study cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.4 } }}
                className={`group cursor-pointer relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-6 sm:p-8 lg:p-10 ${project.borderAccent} transition-all duration-700 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] hover:shadow-glow`}
              >
                {/* Background gradient glow */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.08] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3" />
                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" />

                <div className="relative z-10">
                  {/* Top row: icon + tag + arrow */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        {project.tag}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground group-hover:rotate-[-10deg] transition-all duration-500" />
                  </div>

                  {/* Stat */}
                  <div className="mb-6">
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-gradient leading-none">
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
