import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";
import SocialLinks from "@/components/SocialLinks";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const scrollToHash = (hash: string) => {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  // Element may be lazy-loaded — retry after a short delay
  const observer = new MutationObserver(() => {
    const target = document.getElementById(hash);
    if (target) {
      observer.disconnect();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
  // Force scroll down to trigger lazy load
  window.scrollBy({ top: 300, behavior: "smooth" });
  setTimeout(() => observer.disconnect(), 3000);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { lang } = useLang();
  const nav = translations.nav;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const menuItems = [
    { label: t(nav.services, lang), href: "services", type: "section" as const },
    { label: t(nav.work, lang), href: "projects", type: "section" as const },
    { label: t(nav.process, lang), href: "process", type: "section" as const },
    { label: t(nav.blog, lang), href: "/blog", type: "page" as const },
    { label: t(nav.contact, lang), href: "contact", type: "section" as const },
  ];

  return (
    <>
      {/* Mobile top contact bar — fixed height to prevent CLS */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden bg-primary text-primary-foreground h-11">
        <div className="container flex items-center justify-between h-11 text-xs font-mono font-bold px-4">
          <a href="https://wa.me/306974159157" className="flex items-center gap-2 min-h-[44px]" aria-label="WhatsApp call">
            <WhatsAppIcon className="h-4 w-4" />
            <span className="text-xs">+30 697 415 9157</span>
          </a>
          {isHome ? (
            <a href="#contact" onClick={() => setOpen(false)} className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </a>
          ) : (
            <a href="/#contact" className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </a>
          )}
        </div>
      </div>

      <header
        className={`fixed left-0 right-0 z-[55] transition-all duration-500 ${
          scrolled ? "glass border-b border-border/30 top-0 lg:top-0" : "top-11 lg:top-0"
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
          <div className="hidden lg:flex items-center gap-3 xl:gap-5 2xl:gap-8">
            <div className="flex items-center gap-2 xl:gap-4 2xl:gap-6">
              <Link
                to="/about"
                className="font-mono text-[10px] xl:text-[11px] 2xl:text-xs uppercase tracking-[0.06em] xl:tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center whitespace-nowrap"
              >
                {t(nav.aboutUs, lang)}
              </Link>
              {menuItems.map((item) =>
                item.type === "page" ? (
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
              <a href="tel:+306974159157" className="flex items-center gap-1.5 font-mono text-[11px] xl:text-xs 2xl:text-sm text-foreground hover:text-primary transition-colors duration-300 group/phone min-h-[44px] whitespace-nowrap" aria-label="Call +30 697 415 9157">
                <span className="relative flex h-5 w-5 items-center justify-center shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                  <Phone className="relative h-3.5 w-3.5 xl:h-4 xl:w-4 text-primary" />
                </span>
                <span className="font-bold hidden xl:inline">+30 697 415 9157</span>
              </a>
            </div>
            <SocialLinks iconSize={16} className="hidden xl:flex" />
            <LanguageSelector />
            {isHome ? (
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToHash("contact"); }}
                className="font-mono text-[10px] xl:text-[11px] uppercase tracking-[0.12em] xl:tracking-[0.15em] text-primary-foreground bg-primary px-3 xl:px-5 py-2.5 xl:py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold flex items-center whitespace-nowrap shrink-0"
              >
                {t(nav.letsTalk, lang)}
              </a>
            ) : (
              <a
                href="/#contact"
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
        className={`fixed inset-0 z-[52] bg-background lg:hidden flex flex-col items-center justify-center gap-3 px-6 transition-opacity duration-400 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <Link
          to="/about"
          onClick={() => setOpen(false)}
          className={`text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-all duration-300 min-h-[48px] flex items-center ${
            open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: open ? "50ms" : "0ms" }}
        >
          {t(nav.aboutUs, lang)}
        </Link>
        {menuItems.map((item, i) =>
          item.type === "page" ? (
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
          <a href="https://wa.me/306974159157" onClick={() => setOpen(false)} className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors min-h-[48px]" aria-label="WhatsApp call">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
              <WhatsAppIcon className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-bold">+30 697 415 9157</span>
          </a>
          <SocialLinks className="mt-2" />
        </div>
      </div>

      {/* Mobile floating WhatsApp button — CSS only */}
      <a
        href="https://wa.me/306974159157"
        className={`fixed bottom-6 right-6 z-50 lg:hidden bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_4px_rgba(37,211,102,0.4)] active:scale-95 transition-all duration-300 ${
          scrolled ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-80 pointer-events-none"
        }`}
        aria-label="WhatsApp call"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </>
  );
};

export default Navbar;