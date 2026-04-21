import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCountryCode } from "@/lib/geo";
import type { Lang } from "./translations";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: "en", setLang: () => {} });

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    // 1. URL ?lang=en|el wins (used by hreflang for crawlers & shareable links)
    if (typeof window !== "undefined") {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang === "en" || urlLang === "el") {
        localStorage.setItem("lang", urlLang);
        localStorage.setItem("lang-manual", "true");
        return urlLang;
      }
    }
    const saved = localStorage.getItem("lang");
    if (saved === "el" || saved === "en") return saved;
    return "en"; // default until geo-detected
  });

  const setLang = (newLang: Lang) => {
    localStorage.setItem("lang", newLang);
    localStorage.setItem("lang-manual", "true");
    setLangState(newLang);
  };

  // Auto-detect Greek visitors by IP on first visit (deferred to avoid critical path)
  useEffect(() => {
    const manuallySet = localStorage.getItem("lang-manual");
    const alreadySaved = localStorage.getItem("lang");
    if (manuallySet || alreadySaved) return;

    const detect = () => {
      getCountryCode()
        .then((country) => {
          if (country === "GR") {
            setLangState("el");
            localStorage.setItem("lang", "el");
          } else {
            localStorage.setItem("lang", "en");
          }
        })
        .catch(() => {
          localStorage.setItem("lang", "en");
        });
    };

    // Defer geo-detection until first explicit user interaction (click/touch/key)
    // OR a 15s fallback. Excluding 'scroll' is critical on mobile where the
    // address bar collapse fires a scroll event almost immediately.
    const events = ["pointerdown", "keydown", "touchstart"] as const;
    let timer: number | undefined;
    const run = () => {
      if (timer) clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, run));
      detect();
    };
    timer = window.setTimeout(run, 15000);
    events.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));

    return () => {
      if (timer) clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, run));
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
