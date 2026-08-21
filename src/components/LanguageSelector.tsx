import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import type { Lang } from "@/i18n/translations";
import { cn } from "@/lib/utils";

const LANGS: { code: Lang; flag: string; label: string; short: string }[] = [
  { code: "en", flag: "🇬🇧", label: "English", short: "EN" },
  { code: "el", flag: "🇬🇷", label: "Ελληνικά", short: "ΕΛ" },
  { code: "de", flag: "🇩🇪", label: "Deutsch", short: "DE" },
];

const LanguageSelector = () => {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className="flex items-center gap-1.5 font-mono text-sm uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 bg-secondary border border-border/50 rounded-full px-3.5 py-2 hover:border-primary/40 min-h-[40px]"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-bold">{current.short}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 z-[210] min-w-[180px] rounded-xl border border-border/60 bg-popover shadow-xl overflow-hidden"
        >
          {LANGS.map((l) => {
            const active = l.code === lang;
            return (
              <li key={l.code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 text-left text-sm font-medium transition-colors min-h-[44px]",
                    active
                      ? "bg-primary/10 text-foreground"
                      : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {active && <Check className="h-4 w-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;
