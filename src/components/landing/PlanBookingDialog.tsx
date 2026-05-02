import { lazy, Suspense, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, MessageSquare, Calendar as CalendarLucide } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import { cn } from "@/lib/utils";

// Lazy-load to avoid pulling Calendar/date-fns into landing bundle until opened
const BookingForm = lazy(() => import("./BookingForm"));
const ContactMessageForm = lazy(() => import("./ContactMessageForm"));

interface PlanBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName?: string;
  planTagline?: string;
}

type Mode = "message" | "booking";

const PlanBookingDialog = ({ open, onOpenChange, planName, planTagline }: PlanBookingDialogProps) => {
  const { lang } = useLang();
  const c = translations.cta;
  const b = c.booking;
  const [mode, setMode] = useState<Mode>("message");

  // Reset to message tab whenever dialog re-opens
  useEffect(() => {
    if (open) setMode("message");
  }, [open]);

  // Prefill message so the team knows which plan the visitor is interested in
  const planLabel = planName
    ? planTagline
      ? `${planName} — ${planTagline}`
      : planName
    : "";

  const initialMessage = planLabel
    ? lang === "el"
      ? `Ενδιαφέρομαι για το πακέτο: ${planLabel}.\n\n`
      : `I'm interested in the plan: ${planLabel}.\n\n`
    : "";

  const title = planLabel
    ? lang === "el"
      ? `${planLabel}`
      : `${planLabel}`
    : lang === "el" ? "Ας μιλήσουμε" : "Let's talk";

  const description = mode === "booking"
    ? (lang === "el"
        ? "Επιλέξτε ημερομηνία και ώρα. Θα επιβεβαιώσουμε σύντομα μέσω email."
        : "Pick a date and time. We'll confirm shortly via email.")
    : (lang === "el"
        ? "Στείλτε μας μήνυμα και θα απαντήσουμε σύντομα."
        : "Send us a message and we'll get back to you shortly.");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-black tracking-[-0.03em]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>

        {/* Mode toggle: Send a message / Book a meeting */}
        <div
          className="inline-flex p-1 rounded-full bg-secondary border border-border self-start"
          role="tablist"
          aria-label={lang === "el" ? "Τρόπος επικοινωνίας" : "Contact mode"}
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "message"}
            onClick={() => setMode("message")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all min-h-[40px]",
              mode === "message"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <MessageSquare className="h-4 w-4" />
            {t(b.toggleMessage, lang)}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "booking"}
            onClick={() => setMode("booking")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all min-h-[40px]",
              mode === "booking"
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarLucide className="h-4 w-4" />
            {t(b.toggleBooking, lang)}
          </button>
        </div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          }
        >
          {open && mode === "booking" && (
            <BookingForm
              initialMessage={initialMessage}
              onSuccess={() => {
                setTimeout(() => onOpenChange(false), 3000);
              }}
            />
          )}
          {open && mode === "message" && (
            <ContactMessageForm
              initialMessage={initialMessage}
              onSuccess={() => {
                setTimeout(() => onOpenChange(false), 3000);
              }}
            />
          )}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default PlanBookingDialog;
