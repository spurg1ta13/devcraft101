import { Code2, Palette, ShieldCheck, Megaphone } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";

const AboutSection = () => {
  const { lang } = useLang();
  const a = translations.about;
  const nav = translations.nav;
  const { ref, inView } = useInView({ threshold: 0.15 });

  const stats = [
    { value: "10+", label: t(a.stats.years, lang) },
    { value: lang === "el" ? "Μηδέν" : "Zero", label: t(a.stats.defect, lang) },
  ];

  // Team roles intentionally English-only (brand decision)
  const team = [
    { Icon: Code2, role: "Web Developer" },
    { Icon: Palette, role: "UI/UX Designer" },
    { Icon: ShieldCheck, role: "QA Engineer" },
    { Icon: Megaphone, role: "Digital Marketer" },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative section-rhythm overflow-hidden scroll-mt-28 lg:scroll-mt-20"
    >
      {/* AboutPage structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: lang === "el" ? "Σχετικά με την DevCraft" : "About DevCraft",
            description:
              lang === "el"
                ? "Ομάδα επαγγελματιών με 10+ χρόνια εμπειρίας σε ανάπτυξη ιστοσελίδων, σχεδιασμό UI/UX και πιστοποιημένες δοκιμές ISTQB."
                : "A team of professionals with 10+ years of experience in web development, UI/UX design, and ISTQB-certified testing.",
            url: "https://devcraft.gr/#about",
            mainEntity: {
              "@type": "Organization",
              name: "DevCraft",
              url: "https://devcraft.gr",
              foundingDate: "2015",
              numberOfEmployees: { "@type": "QuantitativeValue", value: 3 },
            },
          }),
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] blur-[120px] amber-drift rounded-full" />

      <div className="container relative z-10 px-4 sm:px-6" ref={ref}>
        <div>
          <div
            className={`transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6 md:mb-8">
              {t(nav.aboutUs, lang)}
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-5xl md:text-7xl font-black tracking-[-0.05em] leading-[0.85] mb-6 md:mb-10"
            >
              {t(a.heading1, lang)} <span className="text-gradient">{t(a.heading2, lang)}</span>
            </h2>
            <div className="max-w-3xl space-y-5 md:space-y-6">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t(a.intro1, lang)}
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                {t(a.intro2, lang)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div
            className={`grid grid-cols-2 gap-6 md:gap-12 mt-12 md:mt-16 pt-10 md:pt-14 border-t border-border/30 transition-all duration-700 delay-150 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <span className="text-4xl md:text-6xl font-black tracking-[-0.04em] text-gradient block">
                  {stat.value}
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60 mt-3">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Team roles */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-10 md:mt-14 transition-all duration-700 delay-300 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {team.map(({ Icon, role }) => (
              <div
                key={role}
                className="flex items-center gap-4 bg-secondary/60 border border-border/40 rounded-2xl p-4 md:p-5 hover:border-primary/40 transition-colors duration-500"
              >
                <div className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.12em] text-foreground/90">
                  {role}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
