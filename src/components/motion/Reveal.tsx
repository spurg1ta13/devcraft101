import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Rendered element. Keeps semantics intact (section, article, li, ...). */
  as?: ElementType;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  direction?: Direction;
  /** Distance travelled, in px. Kept small so it never causes layout shift. */
  distance?: number;
  /** Animate every time it enters the viewport instead of only once. */
  repeat?: boolean;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
}

const axis: Record<Direction, (d: number) => string> = {
  up: (d) => `translate3d(0, ${d}px, 0)`,
  down: (d) => `translate3d(0, -${d}px, 0)`,
  left: (d) => `translate3d(${d}px, 0, 0)`,
  right: (d) => `translate3d(-${d}px, 0, 0)`,
  none: () => "none",
};

/**
 * Scroll-triggered fade + slide.
 *
 * Zero-dependency and compositor-only (opacity + transform), so it costs no
 * JS on the critical path and never triggers layout or paint on scroll.
 * IntersectionObserver disconnects after the first reveal unless `repeat`.
 */
const Reveal = ({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  direction = "up",
  distance = 24,
  repeat = false,
  threshold = 0.12,
  style,
  ...rest
}: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: show immediately, skip the observer entirely.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (!repeat) observer.disconnect();
        } else if (repeat) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [repeat, threshold]);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : axis[direction](distance),
        transitionDelay: visible ? `${delay}ms` : "0ms",
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
