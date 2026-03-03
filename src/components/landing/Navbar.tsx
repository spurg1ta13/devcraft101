import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Services", "Process", "About", "Contact"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/50 bg-background/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <motion.div
          className="flex items-center gap-2.5"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Code2 className="h-4 w-4 text-primary" />
          </div>
          <span className="font-display font-bold text-lg">DevCraft</span>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="relative px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium rounded-lg hover:bg-secondary/50 group"
            >
              {item}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 text-sm font-display font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-2 rounded-lg transition-colors"
          >
            Let's Talk
          </motion.a>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-secondary/50 transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-border"
      >
        <div className="container py-4 flex flex-col gap-2">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileOpen(false)}
              className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground font-medium rounded-lg hover:bg-secondary/50 transition-colors"
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 text-center text-sm font-display font-semibold text-primary-foreground bg-primary hover:bg-primary/90 px-5 py-3 rounded-lg transition-colors"
          >
            Let's Talk
          </a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
