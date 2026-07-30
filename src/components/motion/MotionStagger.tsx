import { LazyMotion, m, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion's DOM features are fetched asynchronously, so only the ~5 KB
 * `m` runtime ships with the chunk that imports this file. Combined with the
 * fact that every consumer lives in a `React.lazy` below-the-fold section,
 * nothing here touches the critical path.
 */
const loadFeatures = () => import("framer-motion").then((mod) => mod.domAnimation);

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
export const MotionStagger = ({ children, className, amount = 0.15 }: StaggerProps) => (
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

interface ItemProps {
  children: ReactNode;
  className?: string;
  /** Adds a lift + glow on hover (pointer devices only, via CSS). */
  hover?: boolean;
}

export const MotionItem = ({ children, className, hover = false }: ItemProps) => (
  <m.div
    variants={item}
    className={`${hover ? "hover-lift-glow" : ""} ${className ?? ""}`}
    style={{ willChange: "transform, opacity" }}
  >
    {children}
  </m.div>
);

export default MotionStagger;
