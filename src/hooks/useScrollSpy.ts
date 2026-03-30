import { useEffect, useRef } from "react";

const SECTION_IDS = ["services", "showcase", "projects", "process", "faq", "contact"];

export function useScrollSpy() {
  const activeRef = useRef("");

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      // Find the most visible section among intersecting entries
      let best = "";
      let bestRatio = 0;

      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          best = entry.target.id;
        }
      }

      // If we found a visible section, update
      if (best && best !== activeRef.current) {
        activeRef.current = best;
        window.history.replaceState(null, "", `/#${best}`);
      }
    };

    // Use rootMargin to offset for navbar height (~120px)
    const observer = new IntersectionObserver(callback, {
      rootMargin: "-120px 0px -40% 0px",
      threshold: [0, 0.1, 0.25, 0.5],
    });

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Handle scroll to very top → clear hash
    const handleScrollTop = () => {
      if (window.scrollY < 300 && activeRef.current !== "") {
        activeRef.current = "";
        window.history.replaceState(null, "", "/");
      }
    };

    window.addEventListener("scroll", handleScrollTop, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);
}
