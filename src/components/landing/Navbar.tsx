import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t, type Lang } from "@/i18n/translations";
import SocialLinks from "@/components/SocialLinks";
import ObfuscatedEmail from "@/components/ObfuscatedEmail";
import { trackPhoneClick } from "@/lib/trackPhoneClick";
import { usePhoneNumber } from "@/lib/phone";

const PlanBookingDialog = lazy(() => import("./PlanBookingDialog"));
const ContactChoiceDialog = lazy(() => import("./ContactChoiceDialog"));

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

import { preloadUpTo } from "@/lib/lazyLanding";


const NAV_OFFSET = 80;

const smoothScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  return true;
};

const scrollToHash = (hash: string) => {
  // 1. Kick off preloading of all chunks up to (and including) the target.
  //    This is non-blocking for the rest of the page and only triggered
  //    on user intent — initial load performance is unaffected.
  const preload = preloadUpTo(hash);

  // 2. If already mounted, scroll immediately for snappy UX.
  if (smoothScrollTo(hash)) {
    // After lazy chunks finish + layout settles, re-correct position once.
    preload.finally(() => {
      requestAnimationFrame(() => {
        setTimeout(() => smoothScrollTo(hash), 80);
      });
    });
    return;
  }

  // 3. Not mounted yet — wait for chunks, then scroll once it appears.
  preload.finally(() => {
    const tryScroll = (attempts = 0) => {
      if (smoothScrollTo(hash)) {
        // Re-correct after any post-mount layout shift.
        setTimeout(() => smoothScrollTo(hash), 200);
        return;
      }
      if (attempts < 30) {
        requestAnimationFrame(() => setTimeout(() => tryScroll(attempts + 1), 50));
      }
    };
    tryScroll();
  });
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactDialog, setContactDialog] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang } = useLang();
  const phone = usePhoneNumber();
  const nav = translations.nav;

  const openContactChoice = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setContactDialog(true);
  }, []);

  const openLetsTalk = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    setBookingLoaded(true);
    setBookingOpen(true);
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const menuItems = [
    { label: t(nav.services, lang), href: "services", type: "section" as const },
    { label: t(nav.work, lang), href: "projects", type: "section" as const },
    { label: t(nav.pricing, lang), href: "pricing", type: "section" as const },
    { label: t(nav.blog, lang), href: "/blog", type: "page" as const },
    { label: t(nav.contact, lang), href: "contact", type: "section" as const },
  ];

  return (
    <>
      {/* Mobile top contact bar — fixed height to prevent CLS */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-primary text-primary-foreground h-11">
        <div className="container flex items-center justify-between h-11 text-xs font-mono font-bold px-4">
          <button onClick={openContactChoice} className="flex items-center gap-2.5 min-h-[44px]" aria-label={`Call ${phone.display}`}>
            <span className="flex items-center gap-1.5">
              <Phone className="h-4 w-4" />
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            </span>
            <span className="text-xs">{phone.display}</span>
          </button>
          {isHome ? (
            <a href="#contact" onClick={openLetsTalk} className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </a>
          ) : (
            <a href="/#contact" onClick={openLetsTalk} className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </a>
          )}
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-[55] transition-all duration-500 top-11 lg:top-0 ${
          scrolled ? "glass border-b border-border/30" : ""
        }`}
      >
        <nav className="container flex items-center justify-between h-16 lg:h-20 px-4 sm:px-6" aria-label="Main navigation">
          <Link
            to="/"
            onClick={() => {
              if (open) setOpen(false);
              if (isHome) window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative z-[60] flex items-center gap-2 group/logo min-h-[44px]"
            aria-label="DevCraft home"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover/logo:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.5)] transition-shadow duration-300">
              <span className="text-primary-foreground font-mono text-sm font-bold">&lt;/&gt;</span>
            </div>
            <span className="text-xl font-bold tracking-[-0.04em]">
              dev<span className="text-gradient">craft</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-8 ml-auto pl-8 xl:pl-12 2xl:pl-16">
            <div className="flex items-center gap-4 xl:gap-6 2xl:gap-7">
              {menuItems.map((item) =>
                item.href === "contact" ? (
                  <a
                    key={item.href}
                    href="#contact"
                    onClick={openLetsTalk}
                    className="font-mono text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ) : item.type === "page" ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="font-mono text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : isHome ? (
                  <a
                    key={item.href}
                    href={`#${item.href}`}
                    onClick={(e) => { e.preventDefault(); scrollToHash(item.href); }}
                    className="font-mono text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center whitespace-nowrap"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={`/#${item.href}`}
                    className="font-mono text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
            <div className="flex items-center gap-3 border-l border-border/30 pl-4 xl:pl-6">
              <a href={`tel:${phone.tel}`} onClick={() => trackPhoneClick("navbar-desktop")} className="flex items-center gap-1.5 font-mono text-[11px] xl:text-xs 2xl:text-sm text-foreground hover:text-primary transition-colors duration-300 group/phone min-h-[44px] whitespace-nowrap" aria-label={`Call ${phone.display}`}>
                <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
                  <Phone className="relative h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                </span>
                <span className="font-bold hidden xl:inline">{phone.display}</span>
              </a>
              <ObfuscatedEmail user="contact" domain="devcraft.gr" className="flex items-center gap-1.5 font-mono text-[11px] xl:text-xs 2xl:text-sm text-foreground hover:text-primary transition-colors duration-300 min-h-[44px] whitespace-nowrap" ariaLabel="Email {email}">
                {(email) => (
                  <>
                    <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
                      <Mail className="relative h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                    </span>
                    <span className="font-bold hidden xl:inline">{email}</span>
                  </>
                )}
              </ObfuscatedEmail>
            </div>
            <SocialLinks />
            <LanguageSelector />
            {isHome ? (
              <a
                href="#contact"
                onClick={openLetsTalk}
                className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.15em] text-primary-foreground bg-primary px-3 xl:px-5 py-2.5 xl:py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold flex items-center whitespace-nowrap shrink-0"
              >
                {t(nav.letsTalk, lang)}
              </a>
            ) : (
              <a
                href="/#contact"
                onClick={openLetsTalk}
                className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.15em] text-primary-foreground bg-primary px-3 xl:px-5 py-2.5 xl:py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold flex items-center whitespace-nowrap shrink-0"
              >
                {t(nav.letsTalk, lang)}
              </a>
            )}
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-3 relative z-[60]">
            <LanguageSelector />
            <button
              onClick={() => setOpen(!open)}
              className="text-foreground min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile fullscreen menu — CSS transitions only */}
      <div
        className={`fixed inset-0 z-[52] bg-background lg:hidden flex flex-col items-center gap-3 px-6 pt-32 pb-8 overflow-y-auto transition-opacity duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        {menuItems.map((item, i) =>
          item.href === "contact" ? (
            <a
              key={item.href}
              href="#contact"
              onClick={(e) => { openLetsTalk(e); }}
              className={`text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-all duration-300 min-h-[48px] flex items-center ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${(i + 1) * 100 + 50}ms` : "0ms" }}
            >
              {item.label}
            </a>
          ) : item.type === "page" ? (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-all duration-300 min-h-[48px] flex items-center ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${(i + 1) * 100 + 50}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.href}
              href={isHome ? `#${item.href}` : `/#${item.href}`}
              onClick={(e) => {
                if (isHome) { e.preventDefault(); scrollToHash(item.href); }
                setOpen(false);
              }}
              className={`text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-all duration-300 min-h-[48px] flex items-center ${
                open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: open ? `${(i + 1) * 100 + 50}ms` : "0ms" }}
            >
              {item.label}
            </a>
          )
        )}

        {/* Contact info */}
        <div
          className={`flex flex-col items-center gap-4 mt-4 pt-8 border-t border-border/30 w-full max-w-xs transition-all duration-300 ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: open ? "550ms" : "0ms" }}
        >
          <button onClick={(e) => { openContactChoice(e); setOpen(false); }} className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors min-h-[48px]" aria-label="Contact us">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <WhatsAppIcon className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-bold">{phone.display}</span>
          </button>
          <ObfuscatedEmail user="contact" domain="devcraft.gr" className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors min-h-[48px]" ariaLabel="Email {email}">
            {(email) => (
              <>
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <Mail className="relative h-4 w-4 text-primary" />
                </span>
                <span className="font-bold">{email}</span>
              </>
            )}
          </ObfuscatedEmail>
          <SocialLinks />
        </div>
      </div>

      {/* Mobile floating WhatsApp button — currently disabled in favor of AI chat launcher */}

      <ContactChoiceDialog isOpen={contactDialog} onClose={() => setContactDialog(false)} lang={lang} phone={phone} />
      {bookingLoaded && (
        <Suspense fallback={null}>
          <PlanBookingDialog open={bookingOpen} onOpenChange={setBookingOpen} />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;