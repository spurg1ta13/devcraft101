import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What technologies do you use for web development?",
    answer:
      "We specialize in modern technologies including React, TypeScript, Next.js, Node.js, and cloud-native architectures. Our stack is chosen to ensure scalability, performance, and maintainability for every project.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Timelines vary based on scope. A landing page can be delivered in 1–2 weeks, while a full web application typically takes 4–12 weeks. We provide a detailed timeline estimate after the initial consultation.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Absolutely. We offer maintenance packages that include bug fixes, performance monitoring, security updates, and feature enhancements. We treat every project as a long-term partnership.",
  },
  {
    question: "What does ISTQB-certified testing mean for my project?",
    answer:
      "ISTQB (International Software Testing Qualifications Board) certification means our QA engineers follow globally recognized testing standards. This ensures systematic test coverage, fewer defects, and a more reliable product at launch.",
  },
  {
    question: "Can you redesign or improve an existing website?",
    answer:
      "Yes. We regularly work on redesigns, performance optimizations, and UX improvements for existing websites. We start with an audit of your current site and propose targeted improvements.",
  },
  {
    question: "How do you handle communication during a project?",
    answer:
      "We use a transparent workflow with weekly progress updates, shared project boards, and direct access to your dedicated project lead. You'll always know what's happening and what's next.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      {/* JSON-LD for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
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
                FAQ
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-[-0.04em] leading-[0.9]">
                Common <span className="text-gradient">questions</span>
              </h2>
            </motion.div>

            <div className="space-y-0">
              {faqs.map((faq, i) => (
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
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        openIndex === i ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {/* Content always in DOM for SEO, visually collapsed */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      openIndex === i ? "max-h-60 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed pr-10">
                      {faq.answer}
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
