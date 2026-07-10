import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const BlogContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [honeypot, setHoneypot] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const { lang } = useLang();
  const c = translations.cta;
  const { getToken } = useRecaptcha();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t(c.errors.nameRequired, lang);
    else if (form.name.trim().length > 100) errs.name = t(c.errors.nameMax, lang);
    const hasEmail = form.email.trim().length > 0;
    const hasPhone = form.phone.trim().length > 0;
    if (!hasEmail && !hasPhone) errs.contact = t(c.errors.contactRequired, lang);
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = t(c.errors.invalidEmail, lang);
    if (hasPhone && !/^\+?\d{7,15}$/.test(form.phone.trim())) errs.phone = t(c.errors.invalidPhone, lang);
    if (!form.message.trim()) errs.message = t(c.errors.messageRequired, lang);
    else if (form.message.trim().length > 1000) errs.message = t(c.errors.messageMax, lang);
    if (!agreed) errs.privacy = t(c.errors.privacyRequired, lang);
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Honeypot: bots fill hidden fields; abort silently without sending.
    if (honeypot.trim() !== "") return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;


    setSending(true);
    try {
      const recaptchaToken = await getToken("contact_form");
      if (!recaptchaToken) {
        setErrors({ submit: lang === "el" ? "Αποτυχία επαλήθευσης. Δοκιμάστε ξανά." : "Verification failed. Please try again." });
        setSending(false);
        return;
      }

      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          message: form.message.trim(),
          website: honeypot, // honeypot; server aborts if non-empty
          recaptchaToken,
        },
      });

      if (error) throw error;
      if (data && !data.success) throw new Error(data.error || "Failed to send");

      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
      setErrors({ submit: lang === "el" ? "Κάτι πήγε στραβά. Δοκιμάστε ξανά." : "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", email: "", phone: "", message: "" });
        setAgreed(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const inputClass = (hasError: boolean) =>
    `w-full bg-secondary border rounded-2xl px-5 py-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 min-h-[48px] ${hasError ? "border-destructive" : "border-border"}`;

  return (
    <section className="mt-16 pt-10 border-t border-border/30" aria-label={lang === "el" ? "Φόρμα επικοινωνίας" : "Contact form"}>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-3">
        {t(c.label, lang)}
      </span>
      <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] mb-2">
        {t(c.heading1, lang)}{" "}
        <span className="text-gradient">{t(c.heading2, lang)}</span>
      </h2>
      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
        {t(c.description, lang)}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot: hidden from real users, catches bots */}
        <div style={{ position: "absolute", left: "-10000px", top: "auto", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
          <label htmlFor="blog-website">Website</label>
          <input
            id="blog-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="blog-contact-name" className="sr-only">{t(c.name, lang)}</label>
            <input
              id="blog-contact-name"
              type="text"
              placeholder={t(c.name, lang)}
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
              className={inputClass(!!errors.name)}
            />
            {errors.name && <p className="text-destructive text-xs mt-1.5 ml-2" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="blog-contact-email" className="sr-only">{t(c.email, lang)}</label>
            <input
              id="blog-contact-email"
              type="email"
              placeholder={t(c.email, lang)}
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "", contact: "" }); }}
              className={inputClass(!!errors.email || !!errors.contact)}
            />
            {(errors.email || errors.contact) && <p className="text-destructive text-xs mt-1.5 ml-2" role="alert">{errors.email || errors.contact}</p>}
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="blog-contact-phone" className="sr-only">{t(c.phone, lang)}</label>
            <input
              id="blog-contact-phone"
              type="tel"
              placeholder={t(c.phone, lang)}
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d+]/g, "");
                setForm({ ...form, phone: val });
                setErrors({ ...errors, phone: "", contact: "" });
              }}
              className={inputClass(!!errors.phone)}
            />
            {errors.phone && <p className="text-destructive text-xs mt-1.5 ml-2" role="alert">{errors.phone}</p>}
          </div>
          <div />
        </div>
        <div>
          <label htmlFor="blog-contact-message" className="sr-only">{t(c.message, lang)}</label>
          <textarea
            id="blog-contact-message"
            placeholder={t(c.message, lang)}
            rows={3}
            value={form.message}
            onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
            className={`${inputClass(!!errors.message)} resize-none min-h-[100px]`}
          />
          {errors.message && <p className="text-destructive text-xs mt-1.5 ml-2" role="alert">{errors.message}</p>}
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, privacy: "" }); }}
            className="mt-0.5 h-5 w-5 rounded border-border accent-primary cursor-pointer shrink-0"
            id="blog-privacy-agree"
          />
          <label htmlFor="blog-privacy-agree" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
            {t(c.agree, lang)}{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline transition-colors" target="_blank">
              {t(c.privacyPolicy, lang)}
            </Link>
          </label>
        </div>
        {errors.privacy && <p className="text-destructive text-xs mt-1 ml-8" role="alert">{errors.privacy}</p>}

        {errors.submit && <p className="text-destructive text-sm font-medium" role="alert">{errors.submit}</p>}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
          <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
            {t(c.respond, lang)}
          </p>
          <button
            type="submit"
            disabled={sending}
            className="group/btn bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 min-h-[44px] rounded-full shadow-glow flex items-center justify-center gap-3 hover:brightness-110 hover:scale-105 active:scale-[0.98] transition-all w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {lang === "el" ? "Αποστολή..." : "Sending..."}
              </>
            ) : (
              <>
                {t(c.send, lang)}
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground/50 text-center sm:text-right">
          Protected by reCAPTCHA –{" "}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors underline">Privacy</a>
          {" & "}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="hover:text-muted-foreground transition-colors underline">Terms</a>
        </p>
      </form>

      {submitted && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl animate-hero-fade-up"
          role="alert"
          aria-live="polite"
        >
          <div className="text-center px-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-[-0.04em] mb-4">
              {t(c.successTitle1, lang)} <span className="text-gradient">{t(c.successTitle2, lang)}</span>
            </h2>
            <p className="text-muted-foreground text-base mb-6">
              {t(c.successDesc, lang)}
            </p>
            <div
              className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-primary to-orange-500 origin-left"
              style={{ animation: "expand-line 2.9s linear forwards" }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogContactForm;
