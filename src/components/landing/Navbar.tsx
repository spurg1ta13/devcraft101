import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LanguageSelector from "@/components/LanguageSelector";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

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
    { label: t(nav.services, lang), href: "services" },
    { label: t(nav.work, lang), href: "work" },
    { label: t(nav.process, lang), href: "process" },
    { label: t(nav.contact, lang), href: "contact" },
  ];

  return (
    <>
      {/* Mobile top contact bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 lg:hidden bg-primary text-primary-foreground transition-transform duration-500 ${scrolled ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="container flex items-center justify-between h-11 text-xs font-mono font-bold px-4">
          <a href="tel:+306974159157" className="flex items-center gap-2 min-h-[44px]" aria-label="Call us">
            <Phone className="h-4 w-4" />
            <span className="text-xs">+30 697 415 9157</span>
          </a>
          {isHome ? (
            <a href="#contact" onClick={() => setOpen(false)} className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </a>
          ) : (
            <Link to="/#contact" className="flex items-center gap-2 min-h-[44px] uppercase tracking-[0.1em]">
              {t(nav.letsTalk, lang)}
            </Link>
          )}
        </div>
      </div>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed left-0 right-0 z-[55] transition-all duration-500 ${
          scrolled ? "glass border-b border-border/30 top-0" : "top-11 lg:top-0"
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
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                to="/about"
                className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center"
              >
                {t(nav.aboutUs, lang)}
              </Link>
              {menuItems.map((item) => (
                isHome ? (
                  <a
                    key={item.href}
                    href={`#${item.href}`}
                    className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    to={`/#${item.href}`}
                    className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300 min-h-[44px] flex items-center"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
            <div className="flex items-center gap-4 border-l border-border/30 pl-6">
              <a href="tel:+306974159157" className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors duration-300 group/phone min-h-[44px]" aria-label="Call +30 697 415 9157">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                  <Phone className="relative h-4 w-4 text-primary" />
                </span>
                <span className="font-bold text-sm">+30 697 415 9157</span>
              </a>
            </div>
            <LanguageSelector />
            {isHome ? (
              <a
                href="#contact"
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold flex items-center"
              >
                {t(nav.letsTalk, lang)}
              </a>
            ) : (
              <Link
                to="/#contact"
                className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-3 min-h-[44px] rounded-full hover:brightness-110 transition-all font-bold flex items-center"
              >
                {t(nav.letsTalk, lang)}
              </Link>
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
      </motion.header>

      {/* Mobile fullscreen menu */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[52] bg-background lg:hidden flex flex-col items-center justify-center gap-6 px-6"
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <motion.a
          key="about"
          href="/about"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.05 }}
          className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors min-h-[48px] flex items-center"
        >
          {t(nav.aboutUs, lang)}
        </motion.a>
        {menuItems.map((item, i) => (
          <motion.a
            key={item.href}
            href={isHome ? `#${item.href}` : `/#${item.href}`}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: (i + 1) * 0.1 + 0.05 }}
            className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors min-h-[48px] flex items-center"
          >
            {item.label}
          </motion.a>
        ))}

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col items-center gap-4 mt-4 pt-8 border-t border-border/30 w-full max-w-xs"
        >
          <a href="tel:+306974159157" onClick={() => setOpen(false)} className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors min-h-[48px]" aria-label="Call us">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
              <Phone className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-bold">+30 697 415 9157</span>
          </a>
        </motion.div>
      </motion.div>

      {/* Mobile floating Call Us button */}
      <motion.a
        href="tel:+306974159157"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={scrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 lg:hidden bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_4px_hsl(38_100%_55%/0.4)] active:scale-95 transition-transform"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </>
  );
};

export default Navbar;
