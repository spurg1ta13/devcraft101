import { lazy, Suspense } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

// Lazy-load to avoid pulling Calendar/date-fns into landing bundle until opened
const BookingForm = lazy(() => import("./BookingForm"));

interface PlanBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName?: string;
  planTagline?: string;
}

const PlanBookingDialog = ({ open, onOpenChange, planName, planTagline }: PlanBookingDialogProps) => {
  const { lang } = useLang();
  const c = translations.cta;

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
      ? `Κλείστε ραντεβού — ${planLabel}`
      : `Book a call — ${planLabel}`
    : t(c.booking.confirm, lang);

  const description = lang === "el"
    ? "Επιλέξτε ημερομηνία και ώρα. Θα επιβεβαιώσουμε σύντομα μέσω email."
    : "Pick a date and time. We'll confirm shortly via email.";

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

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          }
        >
          {open && (
            <BookingForm
              initialMessage={initialMessage}
              onSuccess={() => {
                // Close after the in-form success screen has been visible briefly
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
