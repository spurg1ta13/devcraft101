import { Code2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-primary" />
          <span className="font-display font-bold">DevCraft</span>
        </div>
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} DevCraft. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
