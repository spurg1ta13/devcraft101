import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking for admin pages
    if (location.pathname.startsWith("/admin")) return;

    const pagePath = location.pathname + location.hash;

    const getVisitorId = () => {
      const key = "dv_visitor_id";
      let id = localStorage.getItem(key);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key, id);
      }
      return id;
    };

    const track = async () => {
      // Try to get country from a free geo API
      let country: string | null = null;
      try {
        const res = await fetch("https://ip-api.io/json", { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const geo = await res.json();
          country = geo.country_code || null;
        }
      } catch {
        // Silently fail — country will be null
      }

      const { error } = await supabase
        .from("page_views")
        .insert({
          page_path: pagePath,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          visitor_id: getVisitorId(),
          country,
        } as any);

      if (error) console.error("Page view tracking error:", error);
    };

    // Defer tracking out of the critical path
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(track, { timeout: 5000 });
    } else {
      setTimeout(track, 2000);
    }
  }, [location.pathname, location.hash]);
}
