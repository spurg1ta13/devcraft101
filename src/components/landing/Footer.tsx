import { Phone, Mail, ArrowUpRight, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const Footer = () => {
  const { lang } = useLang();
  const f = translations.footer;
  const nav = translations.nav;

  return (
    <footer className="border-t border-border/20 py-16 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4 group/logo">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center group-hover/logo:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.5)] transition-shadow duration-300">
                <span className="text-primary-foreground font-mono text-xs font-bold">&lt;/&gt;</span>
              </div>
              <span className="text-lg font-bold tracking-[-0.03em]">
                dev<span className="text-gradient">craft</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {t(f.brand, lang)}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-6">{t(f.navigation, lang)}</h4>
            <nav aria-label="Footer navigation" className="flex flex-col gap-3">
              {[
                { label: t(nav.aboutUs, lang), href: "/about" },
                { label: t(nav.services, lang), href: "/#services" },
                { label: t(f.ourWork, lang), href: "/#work" },
                { label: t(nav.process, lang), href: "/#process" },
                { label: t(nav.contact, lang), href: "/#contact" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="group/link flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item.label}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 text-primary" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-gradient mb-6">{t(f.getInTouch, lang)}</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+306974776057" className="group/contact flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-secondary border border-border/50 flex items-center justify-center group-hover/contact:border-primary/40 transition-all duration-300">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                +30 697 477 6057
              </a>
              <a href="mailto:contact@devcraft.gr" className="group/contact flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                <div className="w-8 h-8 rounded-lg bg-secondary border border-border/50 flex items-center justify-center group-hover/contact:border-primary/40 transition-all duration-300">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                contact@devcraft.gr
              </a>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/40 hover:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.3)] transition-all duration-300">
                  <Facebook className="h-3.5 w-3.5 text-primary" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/40 hover:shadow-[0_0_12px_-4px_hsl(38_100%_55%/0.3)] transition-all duration-300">
                  <Instagram className="h-3.5 w-3.5 text-primary" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="glow-line w-full mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] text-muted-foreground/60 tracking-[0.1em] uppercase">
              © {new Date().getFullYear()} devcraft. {t(f.rights, lang)}
            </span>
            <Link
              to="/privacy-policy"
              className="font-mono text-[10px] text-muted-foreground/60 tracking-[0.1em] uppercase hover:text-primary transition-colors"
            >
              {t(f.privacyPolicy, lang)}
            </Link>
          </div>
          <Link
            to="/#contact"
            className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-2.5 rounded-full hover:brightness-110 hover:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.3)] transition-all font-bold"
          >
            {t(nav.letsTalk, lang)}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
