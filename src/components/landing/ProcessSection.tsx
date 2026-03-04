import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const icons = [Search, PenTool, Code2, Rocket];

const ProcessSection = () => {
  const { lang } = useLang();
  const p = translations.process;

  return (
    <section id="process" className="relative section-rhythm bg-dot-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 md:mb-28"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6">
            {t(p.label, lang)}
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-[-0.04em] leading-[0.9]">
            {t(p.heading1, lang)}
            <br />
            <span className="text-gradient">{t(p.heading2, lang)}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {p.steps.map((step, i) => {
            const Icon = icons[i];
            const num = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.4 } }}
                className="group relative overflow-hidden bg-secondary border border-border/50 rounded-3xl p-10 md:p-12 hover:border-primary/30 hover:shadow-[0_0_40px_-8px_hsl(38_100%_55%/0.25)] transition-all duration-700 min-h-[280px]"
              >
                <span className="absolute bottom-4 right-6 text-[120px] md:text-[160px] font-black text-foreground/[0.03] leading-none select-none pointer-events-none group-hover:text-primary/[0.06] transition-colors duration-700">
                  {num}
                </span>
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/[0.04] rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-1/3 -translate-y-1/3" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-card border border-border/50 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-glow transition-all duration-500">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">{num}</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-[-0.03em] mb-4 text-foreground">{t(step.title, lang)}</h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-md">{t(step.desc, lang)}</p>
                </div>
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
