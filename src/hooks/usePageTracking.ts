import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.hash;

    supabase
      .from("page_views")
      .insert({
        page_path: pagePath,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
      })
      .then(({ error }) => {
        if (error) console.error("Page view tracking error:", error);
      });
  }, [location.pathname, location.hash]);
}
