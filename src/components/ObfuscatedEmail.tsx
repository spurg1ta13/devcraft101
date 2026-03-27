import { useEffect, useRef, type ReactNode } from "react";

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
  ariaLabel?: string;
  children?: (email: string) => ReactNode;
}

/**
 * Renders a mailto link where the address is assembled via JS at runtime,
 * preventing spam-harvester bots from scraping plaintext emails from HTML.
 */
const ObfuscatedEmail = ({ user, domain, className, ariaLabel, children }: ObfuscatedEmailProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (ref.current) {
      const addr = `${user}@${domain}`;
      ref.current.href = `mailto:${addr}`;
      if (!children) {
        ref.current.textContent = addr;
      }
      if (ariaLabel) {
        ref.current.setAttribute("aria-label", ariaLabel.replace("{email}", addr));
      }
    }
  }, [user, domain, ariaLabel, children]);

  const addr = `${user}@${domain}`;

  return (
    <a ref={ref} href="#" className={className} aria-label={ariaLabel?.replace("{email}", "")}>
      {children ? children(addr) : null}
    </a>
  );
};

export default ObfuscatedEmail;
