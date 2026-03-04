import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLang();
  const f = translations.faq;
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: f.items.map((faq) => ({
              "@type": "Question",
              name: t(faq.question, lang),
              acceptedAnswer: {
                "@type": "Answer",
                text: t(faq.answer, lang),
              },
            })),
          }),
        }}
      />

      <section className="relative section-rhythm overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-6">
                {t(f.label, lang)}
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
                {t(f.heading1, lang)} <span className="text-gradient">{t(f.heading2, lang)}</span>
              </h2>
            </motion.div>

            <div className="space-y-0">
              {f.items.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="border-b border-border/30"
                >
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex items-center justify-between py-6 md:py-7 text-left group cursor-pointer"
                    aria-expanded={openIndex === i}
                  >
                    <span className="text-base md:text-lg font-semibold tracking-[-0.02em] text-foreground group-hover:text-primary transition-colors duration-300 pr-4">
                      {t(faq.question, lang)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        openIndex === i ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openIndex === i ? "max-h-60 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-10">
                      {t(faq.answer, lang)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQSection;
