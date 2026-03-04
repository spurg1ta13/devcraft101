import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const CTASection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const { lang } = useLang();
  const c = translations.cta;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSubmitted(true);
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

  return (
    <section id="contact" className="relative section-rhythm overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.04] animate-morph amber-drift blur-[100px]" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gradient block mb-8">
              {t(c.label, lang)}
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-[-0.05em] leading-[0.85] mb-10">
              {t(c.heading1, lang)}
              <br />
              <span className="text-gradient">{t(c.heading2, lang)}</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              {t(c.description, lang)}
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-5"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <input
                  type="text"
                  placeholder={t(c.name, lang)}
                  value={form.name}
                  onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                  className={`w-full bg-secondary border rounded-2xl px-6 py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 ${errors.name ? "border-destructive" : "border-border"}`}
                />
                {errors.name && <p className="text-destructive text-xs mt-2 ml-2">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder={t(c.email, lang)}
                  value={form.email}
                  onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "", contact: "" }); }}
                  className={`w-full bg-secondary border rounded-2xl px-6 py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 ${errors.email || errors.contact ? "border-destructive" : "border-border"}`}
                />
                {errors.email && <p className="text-destructive text-xs mt-2 ml-2">{errors.email}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder={t(c.phone, lang)}
                  value={form.phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d+]/g, "");
                    setForm({ ...form, phone: val });
                    setErrors({ ...errors, phone: "", contact: "" });
                  }}
                  className={`w-full bg-secondary border rounded-2xl px-6 py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 ${errors.phone || errors.contact ? "border-destructive" : "border-border"}`}
                />
                {errors.phone && <p className="text-destructive text-xs mt-2 ml-2">{errors.phone}</p>}
              </div>
            </div>
            {errors.contact && <p className="text-destructive text-xs ml-2">{errors.contact}</p>}
            <div>
              <textarea
                placeholder={t(c.message, lang)}
                rows={4}
                value={form.message}
                onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                className={`w-full bg-secondary border rounded-2xl px-6 py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 resize-none ${errors.message ? "border-destructive" : "border-border"}`}
              />
              {errors.message && <p className="text-destructive text-xs mt-2 ml-2">{errors.message}</p>}
            </div>

            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, privacy: "" }); }}
                className="mt-1 h-4 w-4 rounded border-border accent-primary cursor-pointer"
                id="privacy-agree"
              />
              <label htmlFor="privacy-agree" className="text-sm text-muted-foreground cursor-pointer select-none">
                {t(c.agree, lang)}{" "}
                <Link to="/privacy-policy" className="text-primary hover:underline transition-colors" target="_blank">
                  {t(c.privacyPolicy, lang)}
                </Link>
              </label>
            </div>
            {errors.privacy && <p className="text-destructive text-xs mt-1 ml-7">{errors.privacy}</p>}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
              <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
                {t(c.respond, lang)}
              </p>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn bg-primary text-primary-foreground font-bold text-sm px-10 py-4 rounded-full shadow-glow flex items-center gap-3 hover:brightness-110 transition-all"
              >
                {t(c.send, lang)}
                <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 0 }}>
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
                </motion.span>
              </motion.button>
            </div>
          </motion.form>

          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl"
              >
                <div className="text-center px-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 12 }}
                    className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-4xl md:text-6xl font-black tracking-[-0.04em] mb-4"
                  >
                    {t(c.successTitle1, lang)} <span className="text-gradient">{t(c.successTitle2, lang)}</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-muted-foreground text-lg mb-6"
                  >
                    {t(c.successDesc, lang)}
                  </motion.p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 2.9, ease: "linear" }}
                    className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-primary to-orange-500 origin-left"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
