import { motion } from "framer-motion";

const words = [
  "Web Development",
  "●",
  "UI/UX Design",
  "●", 
  "ISTQB Testing",
  "●",
  "React & Next.js",
  "●",
  "API Architecture",
  "●",
  "Performance Audits",
  "●",
  "Design Systems",
  "●",
  "Quality Assurance",
  "●",
];

const MarqueeSection = () => {
  const doubled = [...words, ...words];

  return (
    <section className="relative py-8 overflow-hidden border-y border-border/50">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex items-center">
          {doubled.map((word, i) => (
            <span
              key={i}
              className={`mx-4 md:mx-6 font-display text-lg md:text-2xl font-bold tracking-tight ${
                word === "●"
                  ? "text-primary text-xs"
                  : "text-muted-foreground/40 hover:text-foreground transition-colors duration-500"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex items-center" aria-hidden>
          {doubled.map((word, i) => (
            <span
              key={`dup-${i}`}
              className={`mx-4 md:mx-6 font-display text-lg md:text-2xl font-bold tracking-tight ${
                word === "●"
                  ? "text-primary text-xs"
                  : "text-muted-foreground/40"
              }`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;
