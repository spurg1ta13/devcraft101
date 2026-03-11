import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useInView } from "@/hooks/useInView";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const f = translations.faq;
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
  const { ref, inView } = useInView();

  return (
    <section className="relative section-rhythm overflow-hidden" aria-label="Frequently asked questions">
      <div className="container relative z-10 px-4 sm:px-6" ref={ref}>
        <div className="max-w-3xl mx-auto">
          <div
            className={`mb-10 md:mb-12 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-4 md:mb-6">
              {t(f.label, lang)}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
              {t(f.heading1, lang)} <span className="text-gradient">{t(f.heading2, lang)}</span>
            </h2>
          </div>

          <div className="space-y-0">
            {f.items.map((faq, i) => (
              <div
                key={i}
                className={`border-b border-border/30 transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 md:py-7 text-left group cursor-pointer min-h-[56px]"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-sm sm:text-base md:text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors duration-300 pr-4">
                    {t(faq.question, lang)}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                      openIndex === i ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    openIndex === i ? "max-h-60 opacity-100 pb-5 md:pb-6" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-10">
                    {t(faq.answer, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
