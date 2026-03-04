import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      {/* Mobile top contact bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 md:hidden bg-primary text-primary-foreground transition-transform duration-500 ${scrolled ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="container flex items-center justify-between h-10 text-xs font-mono font-bold">
          <a href="tel:+306974776057" className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            +30 697 477 6057
          </a>
          <a href="mailto:contact@devcraft.gr" className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" />
            contact@devcraft.gr
          </a>
        </div>
      </div>

      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className={`fixed left-0 right-0 z-50 transition-all duration-500 md:top-0 ${
          scrolled && !open ? "glass border-b border-border/30 top-0 md:top-0 -translate-y-full md:translate-y-0" : scrolled ? "glass border-b border-border/30 top-0 md:top-0" : "top-10 md:top-0"
        }`}
      >
      <div className="container flex items-center justify-between h-20">
        <Link
          to="/"
          onClick={() => {
            if (isHome) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="relative z-10 flex items-center gap-2 group/logo"
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center group-hover/logo:shadow-[0_0_20px_4px_hsl(38_100%_55%/0.5)] transition-shadow duration-300">
            <span className="text-primary-foreground font-mono text-sm font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold tracking-[-0.04em]">
            dev<span className="text-gradient">craft</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-6">
            <Link
              to="/about"
              className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              About Us
            </Link>
            {["Services", "Work", "Process", "Contact"].map((item) => (
              isHome ? (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item}
                </a>
              ) : (
                <Link
                  key={item}
                  to={`/#${item.toLowerCase()}`}
                  className="font-mono text-sm uppercase tracking-[0.12em] text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {item}
                </Link>
              )
            ))}
          </nav>
          <div className="flex items-center gap-4 border-l border-border/30 pl-6">
            <a href="tel:+306974776057" className="flex items-center gap-2 font-mono text-xs text-foreground hover:text-primary transition-colors duration-300 group/phone">
              <span className="relative flex h-4 w-4 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
                <Phone className="relative h-3.5 w-3.5 text-primary" />
              </span>
              <span className="font-bold">+30 697 477 6057</span>
            </a>
            <a href="mailto:contact@devcraft.gr" className="flex items-center gap-2 font-mono text-xs text-foreground hover:text-primary transition-colors duration-300">
              <Mail className="h-4 w-4 text-primary" />
              <span className="font-bold">contact@devcraft.gr</span>
            </a>
          </div>
          {isHome ? (
            <a
              href="#contact"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-2.5 rounded-full hover:brightness-110 transition-all font-bold"
            >
              Let's talk
            </a>
          ) : (
            <Link
              to="/#contact"
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary-foreground bg-primary px-5 py-2.5 rounded-full hover:brightness-110 transition-all font-bold"
            >
              Let's talk
            </Link>
          )}
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden relative z-[60] text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
    </motion.header>

      {/* Mobile fullscreen menu - outside header so it's not affected by translate */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[52] bg-background md:hidden flex flex-col items-center justify-center gap-6 px-6"
      >
        <motion.a
          key="about"
          href="/about"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0 }}
          className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors"
        >
          About Us
        </motion.a>
        {["Services", "Work", "Process", "Contact"].map((item, i) => (
          <motion.a
            key={item}
            href={isHome ? `#${item.toLowerCase()}` : `/#${item.toLowerCase()}`}
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors"
          >
            {item}
          </motion.a>
        ))}

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-4 mt-4 pt-8 border-t border-border/30 w-full max-w-xs"
        >
          <a href="tel:+306974776057" onClick={() => setOpen(false)} className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors">
            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/40" />
              <Phone className="relative h-4 w-4 text-primary" />
            </span>
            <span className="font-bold">+30 697 477 6057</span>
          </a>
          <a href="mailto:contact@devcraft.gr" onClick={() => setOpen(false)} className="flex items-center gap-2 font-mono text-sm text-foreground hover:text-primary transition-colors">
            <Mail className="h-4 w-4 text-primary" />
            <span className="font-bold">contact@devcraft.gr</span>
          </a>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/40 transition-all">
              <Facebook className="h-5 w-5 text-primary" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary border border-border/50 flex items-center justify-center hover:border-primary/40 transition-all">
              <Instagram className="h-5 w-5 text-primary" />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile floating Call Us button */}
      <motion.a
        href="tel:+306974776057"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={scrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50 md:hidden bg-primary text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_4px_hsl(38_100%_55%/0.4)] active:scale-95 transition-transform"
      >
        <Phone className="h-6 w-6" />
      </motion.a>
    </>
  );
};

export default Navbar;
