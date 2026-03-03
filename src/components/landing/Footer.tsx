import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 pt-16 pb-8">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <span className="font-display font-extrabold text-primary-foreground text-sm">DC</span>
              </div>
              <span className="font-display font-bold text-base tracking-tight">
                DevCraft<span className="text-primary">.</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Digital products built with precision. Development, design, and certified quality assurance.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            {[
              { title: "Services", items: ["Web Development", "UI/UX Design", "QA Testing", "Consulting"] },
              { title: "Company", items: ["About", "Work", "Careers", "Blog"] },
              { title: "Connect", items: ["Twitter/X", "LinkedIn", "GitHub", "Dribbble"] },
            ].map((group) => (
              <div key={group.title}>
                <h4 className="font-mono text-[10px] text-muted-foreground/50 tracking-wider uppercase mb-4">{group.title}</h4>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                        {item}
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wider">
            © {new Date().getFullYear()} DEVCRAFT. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/30 tracking-wider">
            DESIGNED & BUILT WITH OBSESSION
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
