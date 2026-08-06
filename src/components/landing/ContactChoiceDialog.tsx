import { Phone } from "lucide-react";
import { t, type Lang } from "@/i18n/translations";
import { trackPhoneClick } from "@/lib/trackPhoneClick";

type PhoneInfo = {
  display: string;
  tel: string;
  wa: string;
  secondary?: { display: string; tel: string; wa: string };
};

const contactLabels = {
  title: { en: "How would you like to reach us?", el: "Πώς θέλετε να επικοινωνήσετε;" },
  whatsapp: { en: "WhatsApp", el: "WhatsApp" },
  phoneCall: { en: "Phone Call", el: "Τηλεφωνική Κλήση" },
  cancel: { en: "Cancel", el: "Ακύρωση" },
};

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const ContactChoiceDialog = ({ onClose, lang, phone }: { onClose: () => void; lang: Lang; phone: PhoneInfo }) => {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center px-4 pb-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" style={{ animation: "contactFadeIn 0.2s ease-out" }} />
      <div
        className="relative w-full max-w-xs rounded-2xl bg-card border border-border/40 overflow-hidden shadow-[0_16px_60px_-12px_hsl(var(--primary)/0.2)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "contactSlideUp 0.3s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <p className="text-center text-sm font-semibold text-foreground px-4 pt-5 pb-3">
          {t(contactLabels.title, lang)}
        </p>
        <div className="px-4 pb-3 space-y-2">
          <a
            href={`https://wa.me/${phone.wa}`}
            onClick={() => { trackPhoneClick("contact-modal-whatsapp-primary"); onClose(); }}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-foreground hover:bg-[#25D366]/20 active:scale-[0.97] transition-all min-h-[48px]"
          >
            <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
            <span className="font-semibold text-sm">{t(contactLabels.whatsapp, lang)} — {phone.display}</span>
          </a>
          {phone.secondary && (
            <a
              href={`https://wa.me/${phone.secondary.wa}`}
              onClick={() => { trackPhoneClick("contact-modal-whatsapp-secondary"); onClose(); }}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-foreground hover:bg-[#25D366]/20 active:scale-[0.97] transition-all min-h-[48px]"
            >
              <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
              <span className="font-semibold text-sm">{t(contactLabels.whatsapp, lang)} — {phone.secondary.display}</span>
            </a>
          )}
          <a
            href={`tel:${phone.tel}`}
            onClick={() => { trackPhoneClick("contact-modal-call-primary"); onClose(); }}
            className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 active:scale-[0.97] transition-all min-h-[48px]"
          >
            <Phone className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">{t(contactLabels.phoneCall, lang)} — {phone.display}</span>
          </a>
          {phone.secondary && (
            <a
              href={`tel:${phone.secondary.tel}`}
              onClick={() => { trackPhoneClick("contact-modal-call-secondary"); onClose(); }}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 active:scale-[0.97] transition-all min-h-[48px]"
            >
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-semibold text-sm">{t(contactLabels.phoneCall, lang)} — {phone.secondary.display}</span>
            </a>
          )}
        </div>
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-muted/50 text-muted-foreground text-sm font-medium hover:bg-muted active:scale-[0.97] transition-all min-h-[44px]"
          >
            {t(contactLabels.cancel, lang)}
          </button>
        </div>
      </div>
      <style>{`
        @keyframes contactFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes contactSlideUp { from { opacity: 0; transform: translateY(24px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>
    </div>
  );
};

export default ContactChoiceDialog;
