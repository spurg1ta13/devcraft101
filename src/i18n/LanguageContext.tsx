import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

  // Auto-detect Greek visitors by IP on first visit
  useEffect(() => {
    const manuallySet = localStorage.getItem("lang-manual");
    const alreadySaved = localStorage.getItem("lang");
    if (manuallySet || alreadySaved) return;

    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code === "GR") {
          setLangState("el");
          localStorage.setItem("lang", "el");
        } else {
          localStorage.setItem("lang", "en");
        }
      })
      .catch(() => {
        // Silently fall back to English
        localStorage.setItem("lang", "en");
      });
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
