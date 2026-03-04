import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Palette, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const icons = [Code2, ShieldCheck, Palette];
const techsList = [
  ["WEB", "MOBILE", "CROSS-PLATFORM", "OS AGNOSTIC"],
  ["ISTQB", "QA", "BUG-FREE", "SECURITY"],
  ["FIGMA", "CUSTOM UI", "UX AUDIT", "DESIGN SYSTEMS"],
];

const ShowcaseSection = () => {
  const { lang } = useLang();
  const s = translations.showcase;

  return (
    <section id="work" className="relative section-rhythm" aria-label="Our work">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
            {t(s.label, lang)}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(s.heading1, lang)}
            <br />
            <span className="text-gradient">{t(s.heading2, lang)}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {s.projects.map((project, i) => {
            const Icon = icons[i];
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -10, scale: 1.03, transition: { duration: 0.4 } }}
                className="group cursor-pointer relative overflow-hidden bg-secondary border border-border/50 rounded-2xl md:rounded-3xl p-5 sm:p-6 lg:p-10 group-hover:border-primary/40 transition-all duration-700 flex flex-col justify-between min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] hover:shadow-glow"
              >
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.08] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-y-1/2 translate-x-1/3" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center" aria-hidden="true" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                      </div>
                      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                        {t(project.tag, lang)}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-foreground group-hover:rotate-[-10deg] transition-all duration-500" />
                  </div>

                  <div className="mb-4 md:mb-6">
                    <span className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-[-0.04em] text-gradient leading-none">
                      {t(project.stat, lang)}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-muted-foreground ml-2 sm:ml-3">
                      {t(project.statLabel, lang)}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-3 md:mb-4 text-foreground">
                    {t(project.title, lang)}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t(project.description, lang)}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-6 md:mt-8">
                  {techsList[i].map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.1em] text-foreground/70 bg-card border border-border/50 rounded-full px-3 sm:px-4 py-1.5 group-hover:border-primary/30 transition-all duration-500"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
