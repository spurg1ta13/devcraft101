import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Cookie } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const { lang } = useLang();
  const c = translations.cookie;

  useEffect(() => {
    const dismissed = sessionStorage.getItem("cookie-consent");
    if (!dismissed) setVisible(true);
  }, []);

  const accept = () => {
    sessionStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    sessionStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 25 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-sm z-50 glass border border-border/40 rounded-2xl p-5 shadow-glow"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mt-0.5">
              <Cookie className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {lang === "el" ? "Χρησιμοποιούμε cookies" : "We use cookies"}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {t(c.message, lang)}{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  {t(c.privacyPolicy, lang)}
                </Link>
                .
              </p>
              <div className="flex gap-2">
                <button
                  onClick={accept}
                  className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold bg-primary text-primary-foreground px-4 py-2 rounded-full hover:brightness-110 hover:shadow-[0_0_16px_hsl(38_100%_55%/0.3)] transition-all"
                >
                  {lang === "el" ? "Αποδοχή" : "Accept"}
                </button>
                <button
                  onClick={decline}
                  className="font-mono text-[10px] uppercase tracking-[0.15em] font-bold bg-secondary text-secondary-foreground px-4 py-2 rounded-full hover:bg-secondary/80 transition-all border border-border/50"
                >
                  {lang === "el" ? "Απόρριψη" : "Decline"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
