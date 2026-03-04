import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "glass border-b border-border/30" : ""
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-mono text-sm font-bold">&lt;/&gt;</span>
          </div>
          <span className="text-xl font-bold tracking-[-0.04em]">
            dev<span className="text-primary">craft</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-12">
          <nav className="flex items-center gap-8">
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
        <button onClick={() => setOpen(!open)} className="md:hidden relative z-10 text-foreground">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-background/98 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
      >
        <motion.a
          key="about"
          href="/about"
          onClick={() => setOpen(false)}
          initial={{ opacity: 0, y: 20 }}
          animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0 }}
          className="text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors"
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
            className="text-3xl font-bold tracking-[-0.03em] text-foreground hover:text-primary transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </motion.div>
    </motion.header>
  );
};

export default Navbar;
