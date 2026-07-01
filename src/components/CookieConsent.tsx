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
      className={`fixed bottom-4 left-4 right-4 md:left-6 md:right-6 md:bottom-6 z-50 glass border border-border/40 rounded-2xl p-4 md:p-8 shadow-glow transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 md:items-center">
        <div className="w-8 h-8 md:w-9 md:h-9 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5 md:mt-0">
          <Cookie className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="md:flex md:items-center md:gap-6">
            <div className="md:flex-1">
              <h4 className="text-sm md:text-xl font-bold text-foreground mb-1">
                {t(c.title, lang)}
              </h4>
              <p className="text-xs md:text-lg text-foreground/95 leading-relaxed mb-3 md:mb-0 font-medium">
                {t(c.message, lang)}{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  {t(c.privacyPolicy, lang)}
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-2 md:shrink-0 md:mr-0 mr-20">
              <button
                onClick={accept}
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold bg-primary text-primary-foreground px-3 md:px-4 py-2 rounded-full hover:brightness-110 hover:shadow-[0_0_16px_hsl(38_100%_55%/0.3)] transition-all whitespace-nowrap"
              >
                {t(c.accept, lang)}
              </button>
              <button
                onClick={decline}
                className="font-mono text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold bg-secondary text-secondary-foreground px-3 md:px-4 py-2 rounded-full hover:bg-secondary/80 transition-all border border-border/50 whitespace-nowrap"
              >
                {t(c.decline, lang)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
