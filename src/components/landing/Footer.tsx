const Footer = () => {
  return (
    <footer className="border-t border-border/20 py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="text-sm font-bold tracking-[-0.03em]">
          dev<span className="text-primary">craft</span>
        </span>

        <div className="flex items-center gap-8">
          {["Twitter", "GitHub", "LinkedIn", "Dribbble"].map((s) => (
            <a key={s} href="#" className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
              {s}
            </a>
          ))}
        </div>

        <span className="font-mono text-[10px] text-muted-foreground/30 tracking-[0.1em] uppercase">
          © {new Date().getFullYear()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
