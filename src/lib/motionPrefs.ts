/**
 * Central motion budget helpers.
 *
 * The landing page is tuned for a green mobile PSI score, so anything heavier
 * than a compositor-only transform (Lottie, Framer Motion orchestration,
 * long-running SVG loops) has to pass through here first.
 */

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type NavigatorWithHints = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

/**
 * True only when the device can comfortably afford a JS-driven animation
 * (Lottie player, Framer Motion layout work). Falls back to `false` on
 * save-data, low memory, few cores, slow networks or reduced-motion.
 */
export function canAffordHeavyMotion(): boolean {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;

  const nav = navigator as NavigatorWithHints;
  if (nav.connection?.saveData) return false;

  const effectiveType = nav.connection?.effectiveType;
  if (effectiveType && /(^|-)2g$/.test(effectiveType)) return false;

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false;

  return true;
}
