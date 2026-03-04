import { useLang } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";

const flags: Record<Lang, string> = {
  en: "🇬🇧",
  el: "🇬🇷",
};

const LanguageSelector = () => {
  const { lang, setLang } = useLang();
  const next: Lang = lang === "en" ? "el" : "en";

  return (
    <button
      onClick={() => setLang(next)}
      className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 bg-secondary border border-border/50 rounded-full px-3 py-1.5 hover:border-primary/40"
      aria-label={`Switch to ${next === "el" ? "Greek" : "English"}`}
    >
      <span className="text-sm">{flags[lang]}</span>
      <span className="font-bold">{lang === "en" ? "EN" : "ΕΛ"}</span>
    </button>
  );
};

export default LanguageSelector;
