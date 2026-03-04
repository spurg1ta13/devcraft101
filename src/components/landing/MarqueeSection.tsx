import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const MarqueeSection = () => {
  const { lang } = useLang();
  const words = translations.marquee.words[lang];
  const track = [...words, ...words, ...words];

  return (
    <section className="py-6 border-y border-border/20 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {track.map((word, i) => (
          <span key={i} className="mx-6 md:mx-10 text-sm md:text-base font-medium tracking-[-0.01em] text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors duration-700 cursor-default select-none">
            {word}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;
