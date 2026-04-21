import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { el as elLocale, enUS } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const HOURS = [10, 11, 12, 13, 14, 15, 16, 17, 18]; // 10:00–19:00 = 9 one-hour slots

const formatDateLocal = (date: Date) => {
  // YYYY-MM-DD in local time (avoid UTC shift from toISOString)
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const BookingForm = () => {
  const { lang } = useLang();
  const c = translations.cta;
  const b = c.booking;
  const { getToken } = useRecaptcha();

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<number | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [takenSlots, setTakenSlots] = useState<Record<string, number[]>>({});

  // Min date = today + 2 days
  const minDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 2);
    return d;
  }, []);

  const maxDate = useMemo(() => {
    const d = new Date(minDate);
    d.setDate(d.getDate() + 90);
    return d;
  }, [minDate]);

  // Fetch taken slots for the next ~90 days
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.rpc("get_taken_slots", {
        _from: formatDateLocal(minDate),
        _to: formatDateLocal(maxDate),
      });
      if (cancelled || error || !data) return;
      const map: Record<string, number[]> = {};
      for (const row of data as { booking_date: string; booking_hour: number }[]) {
        if (!map[row.booking_date]) map[row.booking_date] = [];
        map[row.booking_date].push(row.booking_hour);
      }
      setTakenSlots(map);
    })();
    return () => { cancelled = true; };
  }, [minDate, maxDate]);

  const dateKey = date ? formatDateLocal(date) : null;
  const takenForDate = dateKey ? takenSlots[dateKey] || [] : [];

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = t(c.errors.nameRequired, lang);
    else if (form.name.trim().length > 100) errs.name = t(c.errors.nameMax, lang);
    if (!form.email.trim()) errs.email = t(c.errors.invalidEmail, lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = t(c.errors.invalidEmail, lang);
    if (form.phone.trim() && !/^\+?\d{7,15}$/.test(form.phone.trim())) errs.phone = t(c.errors.invalidPhone, lang);
    if (!date) errs.date = t(b.errors.dateRequired, lang);
    if (hour === null) errs.hour = t(b.errors.hourRequired, lang);
    if (!agreed) errs.privacy = t(c.errors.privacyRequired, lang);
    return errs;
  }, [form, date, hour, agreed, lang, c, b]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const recaptchaToken = await getToken("booking_form");
      if (!recaptchaToken) {
        setErrors({ submit: lang === "el" ? "Αποτυχία επαλήθευσης. Δοκιμάστε ξανά." : "Verification failed. Please try again." });
        setSending(false);
        return;
      }

      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error } = await supabase.functions.invoke("send-booking-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          message: form.message.trim() || undefined,
          bookingDate: formatDateLocal(date!),
          bookingHour: hour!,
          language: lang,
          recaptchaToken,
        },
      });

      if (error) throw error;
      if (data && !data.success) {
        if (data.error === "slot_taken") {
          setErrors({ submit: t(b.errors.slotTaken, lang) });
          // Refresh taken slots
          setTakenSlots((prev) => ({
            ...prev,
            [formatDateLocal(date!)]: [...(prev[formatDateLocal(date!)] || []), hour!],
          }));
          setHour(null);
          setSending(false);
          return;
        }
        throw new Error(data.error || "Failed to book");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Booking error:", err);
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
        setDate(undefined);
        setHour(null);
        setAgreed(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  const dateLocale = lang === "el" ? elLocale : enUS;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <div>
            <label htmlFor="booking-name" className="sr-only">{t(c.name, lang)}</label>
            <input
              id="booking-name"
              type="text"
              placeholder={t(c.name, lang)}
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
              className={`w-full bg-secondary border rounded-2xl px-5 py-4 md:px-6 md:py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 min-h-[48px] ${errors.name ? "border-destructive" : "border-border"}`}
            />
            {errors.name && <p className="text-destructive text-xs mt-2 ml-2" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="booking-email" className="sr-only">{t(c.email, lang)}</label>
            <input
              id="booking-email"
              type="email"
              placeholder={t(c.email, lang)}
              value={form.email}
              onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
              className={`w-full bg-secondary border rounded-2xl px-5 py-4 md:px-6 md:py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 min-h-[48px] ${errors.email ? "border-destructive" : "border-border"}`}
            />
            {errors.email && <p className="text-destructive text-xs mt-2 ml-2" role="alert">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="booking-phone" className="sr-only">{t(c.phone, lang)}</label>
            <input
              id="booking-phone"
              type="tel"
              placeholder={t(c.phone, lang)}
              value={form.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/[^\d+]/g, "");
                setForm({ ...form, phone: val });
                setErrors({ ...errors, phone: "" });
              }}
              className={`w-full bg-secondary border rounded-2xl px-5 py-4 md:px-6 md:py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 min-h-[48px] ${errors.phone ? "border-destructive" : "border-border"}`}
            />
            {errors.phone && <p className="text-destructive text-xs mt-2 ml-2" role="alert">{errors.phone}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-5">
          {/* Date picker */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-secondary border-border rounded-2xl px-5 py-4 md:px-6 md:py-5 min-h-[48px] text-base text-foreground hover:bg-secondary hover:text-foreground focus-visible:text-foreground",
                    !date && "text-muted-foreground hover:text-muted-foreground focus-visible:text-muted-foreground",
                    errors.date && "border-destructive"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: dateLocale }) : t(b.pickDate, lang)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-popover" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => { setDate(d); setHour(null); setErrors({ ...errors, date: "", hour: "" }); }}
                  disabled={(d) => d < minDate || d > maxDate}
                  defaultMonth={minDate}
                  initialFocus
                  locale={dateLocale}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
            {errors.date && <p className="text-destructive text-xs mt-2 ml-2" role="alert">{errors.date}</p>}
          </div>

          {/* Time slots */}
          <div>
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 ml-1">
              {t(b.pickTime, lang)}
            </p>
            {!date ? (
              <p className="text-sm text-muted-foreground/70 italic px-2 py-3">{t(b.noSlots, lang)}</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                {HOURS.map((h) => {
                  const taken = takenForDate.includes(h);
                  const selected = hour === h;
                  return (
                    <button
                      key={h}
                      type="button"
                      disabled={taken}
                      onClick={() => { setHour(h); setErrors({ ...errors, hour: "" }); }}
                      className={cn(
                        "py-2.5 px-2 rounded-xl text-sm font-mono border transition-all min-h-[44px]",
                        taken && "bg-muted/30 text-muted-foreground/40 border-border/30 line-through cursor-not-allowed",
                        !taken && !selected && "bg-secondary border-border text-foreground hover:border-primary/60 hover:bg-secondary/70",
                        selected && "bg-primary text-primary-foreground border-primary shadow-glow"
                      )}
                      aria-label={taken ? `${h}:00 ${t(b.slotTaken, lang)}` : `${h}:00`}
                    >
                      {String(h).padStart(2, "0")}:00
                    </button>
                  );
                })}
              </div>
            )}
            {errors.hour && <p className="text-destructive text-xs mt-2 ml-2" role="alert">{errors.hour}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="booking-message" className="sr-only">{t(b.messageOptional, lang)}</label>
          <textarea
            id="booking-message"
            placeholder={t(b.messageOptional, lang)}
            rows={3}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-secondary border border-border rounded-2xl px-5 py-4 md:px-6 md:py-5 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.4)] transition-all duration-300 resize-none min-h-[100px]"
          />
        </div>

        <div className="flex items-start gap-3 mt-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => { setAgreed(e.target.checked); setErrors({ ...errors, privacy: "" }); }}
            className="mt-0.5 h-5 w-5 rounded border-border accent-primary cursor-pointer shrink-0"
            id="booking-privacy-agree"
          />
          <label htmlFor="booking-privacy-agree" className="text-sm text-muted-foreground cursor-pointer select-none leading-relaxed">
            {t(c.agree, lang)}{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline transition-colors" target="_blank">
              {t(c.privacyPolicy, lang)}
            </Link>
          </label>
        </div>
        {errors.privacy && <p className="text-destructive text-xs mt-1 ml-8" role="alert">{errors.privacy}</p>}
        {errors.submit && <p className="text-destructive text-sm font-medium" role="alert">{errors.submit}</p>}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase">
            {date && hour !== null
              ? `${format(date, "PPP", { locale: dateLocale })} • ${String(hour).padStart(2, "0")}:00 – ${String(hour + 1).padStart(2, "0")}:00`
              : t(b.pickTime, lang)}
          </p>
          <button
            type="submit"
            disabled={sending}
            className="group/btn bg-primary text-primary-foreground font-bold text-sm px-8 sm:px-10 py-4 min-h-[48px] rounded-full shadow-glow flex items-center justify-center gap-3 hover:brightness-110 hover:scale-105 active:scale-[0.98] transition-all w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {sending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t(b.booking, lang)}
              </>
            ) : (
              <>
                {t(b.confirm, lang)}
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1.5 group-hover/btn:scale-110 transition-transform duration-300" />
              </>
            )}
          </button>
        </div>
        <p className="text-[11px] text-muted-foreground/50 text-center sm:text-right mt-2">
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
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.04em] mb-4">
              {t(b.successTitle1, lang)} <span className="text-gradient">{t(b.successTitle2, lang)}</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-6">
              {t(b.successDesc, lang)}
            </p>
            <div
              className="h-1 w-48 mx-auto rounded-full bg-gradient-to-r from-primary to-orange-500 origin-left"
              style={{ animation: "expand-line 2.9s linear forwards" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
