import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-lg">DevCraft</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {["Services", "Process", "About", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="text-sm font-display font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Let's Talk →
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
