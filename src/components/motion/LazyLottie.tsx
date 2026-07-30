import { useEffect, useRef, useState, type ReactNode } from "react";
import { canAffordHeavyMotion } from "@/lib/motionPrefs";

interface LazyLottieProps {
  /** URL of a .json / .lottie animation (CDN asset or /public path). */
  src: string;
  className?: string;
  loop?: boolean;
  ariaLabel?: string;
  /** Rendered while the player loads, or permanently on low-end devices. */
  fallback?: ReactNode;
}

/**
 * Lottie, but never on the critical path.
 *
 * - The player (`lottie-react` + the JSON) is imported only once the element
 *   scrolls into view, so it lands in its own async chunk.
 * - Skipped entirely on reduced-motion, save-data, 2G, low memory or low core
 *   count devices — those get the static `fallback` instead.
 * - Playback pauses when scrolled out of view so it can't burn mobile CPU.
 */
const LazyLottie = ({ src, className = "", loop = true, ariaLabel, fallback = null }: LazyLottieProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [Player, setPlayer] = useState<null | React.ComponentType<Record<string, unknown>>>(null);
  const [data, setData] = useState<unknown>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    if (!canAffordHeavyMotion()) return;

    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (!entry.isIntersecting || Player) return;

        Promise.all([import("lottie-react"), fetch(src).then((r) => r.json())])
          .then(([mod, json]) => {
            if (cancelled) return;
            setPlayer(() => mod.default as never);
            setData(json);
          })
          .catch(() => {
            /* keep the static fallback */
          });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [src, Player]);

  return (
    <div ref={hostRef} className={className} aria-label={ariaLabel} role={ariaLabel ? "img" : undefined}>
      {Player && data ? (
        <Player animationData={data} loop={loop} autoplay={active} rendererSettings={{ progressiveLoad: true }} />
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyLottie;
