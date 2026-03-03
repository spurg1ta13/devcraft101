import { Code2, Github, Twitter, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const links = [
    { title: "Services", items: ["Web Development", "UI/UX Design", "Quality Assurance", "Consulting"] },
    { title: "Company", items: ["About Us", "Our Work", "Careers", "Blog"] },
    { title: "Support", items: ["Contact", "FAQ", "Privacy Policy", "Terms of Service"] },
  ];

  return (
    <footer className="relative border-t border-border">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-5 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">DevCraft</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Building digital products that perform. Web development, design, and ISTQB-certified quality assurance.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-lg bg-secondary/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {links.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-sm mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-muted-foreground text-sm hover:text-foreground transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} DevCraft. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Crafted with precision and care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
