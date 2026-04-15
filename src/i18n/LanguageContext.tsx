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

    // Defer geo-detection until after main rendering
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(detect, { timeout: 3000 });
    } else {
      setTimeout(detect, 1500);
    }
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
