import { useEffect, useRef } from "react";

const SECTION_IDS = ["services", "showcase", "projects", "process", "faq", "contact"];

export function useScrollSpy() {
  const activeRef = useRef("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 120;
      let current = "";

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            current = id;
          }
        }
      }

      if (current && current !== activeRef.current) {
        activeRef.current = current;
        window.history.replaceState(null, "", `/#${current}`);
      } else if (!current && window.scrollY < 300 && activeRef.current !== "") {
        activeRef.current = "";
        window.history.replaceState(null, "", "/");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
