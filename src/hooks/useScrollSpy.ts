import { useEffect, useRef } from "react";

const SECTION_IDS = ["services", "showcase", "projects", "process", "faq", "contact"];

export function useScrollSpy() {
  const activeRef = useRef("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          if (id && id !== activeRef.current) {
            activeRef.current = id;
            window.history.replaceState(null, "", `/#${id}`);
          }
        } else {
          // Check if we're at the top (no section visible = hero)
          if (window.scrollY < 300 && activeRef.current !== "") {
            activeRef.current = "";
            window.history.replaceState(null, "", "/");
          }
        }
      },
      { threshold: [0.2, 0.5], rootMargin: "-80px 0px -40% 0px" }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
