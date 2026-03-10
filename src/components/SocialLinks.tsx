import { Facebook, Instagram } from "lucide-react";

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/devcraftgr", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/devcraft.gr", icon: Instagram },
];

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

const SocialLinks = ({ className = "", iconSize = 18 }: SocialLinksProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    {socials.map(({ label, href, icon: Icon }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-10 h-10 rounded-lg bg-secondary border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
      >
        <Icon size={iconSize} />
      </a>
    ))}
  </div>
);

export default SocialLinks;
