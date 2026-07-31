import { LazyMotion, m, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { canAffordHeavyMotion } from "@/lib/motionPrefs";

/**
 * Framer Motion's DOM features are fetched asynchronously, so only the ~5 KB
 * `m` runtime ships with the chunk that imports this file. Combined with the
 * fact that every consumer lives in a `React.lazy` below-the-fold section,
 * nothing here touches the critical path.
 *
 * On phones/tablets and low-end devices the JS runtime is skipped entirely —
 * children render through a compositor-only CSS reveal instead, so no extra
 * main-thread work lands in the PSI/LCP measurement window.
 */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

/** True only after mount, and only where JS-driven motion is affordable. */
function useHeavyMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(canAffordHeavyMotion());
  }, []);
  return enabled;
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the group that must be visible before the stagger fires. */
  amount?: number;
}

/** Wraps a group of `<MotionItem>` children and reveals them in sequence. */
export const MotionStagger = ({ children, className, amount = 0.15 }: StaggerProps) => {
  const heavy = useHeavyMotion();

  if (!heavy) return <div className={className}>{children}</div>;

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={className}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

interface ItemProps {
  children: ReactNode;
  className?: string;
  /** Adds a lift + glow on hover (pointer devices only, via CSS). */
  hover?: boolean;
}

export const MotionItem = ({ children, className, hover = false }: ItemProps) => {
  const heavy = useHeavyMotion();
  const cls = `${hover ? "hover-lift-glow" : ""} ${className ?? ""}`;

  if (!heavy) return <div className={cls}>{children}</div>;

  return (
    <m.div variants={item} className={cls} style={{ willChange: "transform, opacity" }}>
      {children}
    </m.div>
  );
};

export default MotionStagger;
