import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Code2, Menu, X, ArrowUpRight } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "bg-glass-strong border-b border-glass" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="font-display font-extrabold text-primary-foreground text-sm">DC</span>
            </div>
          </div>
          <span className="font-display font-bold text-base tracking-tight hidden sm:block">
            DevCraft<span className="text-primary">.</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {["Work", "Services", "Process", "Contact"].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 font-medium group"
            >
              <span className="relative z-10">{item}</span>
              <div className="absolute inset-0 rounded-lg bg-secondary/0 group-hover:bg-secondary/80 transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:flex items-center gap-1.5 text-sm font-display font-semibold bg-primary text-primary-foreground px-5 py-2.5 rounded-xl hover:brightness-110 transition-all duration-300"
          >
            Start a Project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden bg-glass-strong"
      >
        <div className="container py-6 flex flex-col gap-1">
          {["Work", "Services", "Process", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3.5 text-base text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-secondary/50 transition-all"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 text-center text-sm font-display font-semibold text-primary-foreground bg-primary px-5 py-3.5 rounded-xl"
          >
            Start a Project →
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
