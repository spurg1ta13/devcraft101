import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();
  const c = translations.cookie;

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't block initial render
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    window.dispatchEvent(new Event("cookie-consent:accepted"));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    window.dispatchEvent(new Event("cookie-consent:declined"));
    setVisible(false);
  };


  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-6 md:right-6 md:bottom-6 z-50 glass border border-border/40 rounded-2xl p-5 shadow-glow transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 md:items-center">
        <div className="w-9 h-9 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 md:mt-0">
          <Cookie className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 md:flex md:items-center md:gap-6">
          <div className="md:flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1 md:mb-0.5">
              {lang === "el" ? "Χρησιμοποιούμε cookies" : "We use cookies"}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed mb-4 md:mb-0">
              {t(c.message, lang)}{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                {t(c.privacyPolicy, lang)}
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-2 md:shrink-0">
            <button
              onClick={accept}
              className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:brightness-110 hover:shadow-[0_0_16px_hsl(38_100%_55%/0.3)] transition-all"
            >
              {t(c.accept, lang)}
            </button>
            <button
              onClick={decline}
              className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary/80 transition-all border border-border/50"
            >
              {t(c.decline, lang)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
