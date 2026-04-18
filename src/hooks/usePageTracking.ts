import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const BOT_PATTERN = /bot|crawl|spider|slurp|bingpreview|mediapartners|google|facebookexternalhit|semrush|ahrefs|mj12bot|dotbot|petalbot|yandex|baidu|duckduckbot|ia_archiver|archive\.org|headlesschrome|puppeteer|playwright|lighthouse|pagespeed/i;

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Skip tracking for admin pages
    if (location.pathname.startsWith("/admin")) return;

    // Skip tracking for known bots/crawlers
    if (BOT_PATTERN.test(navigator.userAgent)) return;

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
      // Read country from sessionStorage WITHOUT triggering ipapi.co fetch.
      // LanguageContext warms this cache on user interaction; if not yet
      // available, we log the page view with country=null rather than
      // blocking on a 9s third-party request.
      let country: string | null = null;
      try {
        const cached = sessionStorage.getItem("geo_country");
        if (cached && cached !== "UNKNOWN") country = cached;
      } catch {
        // ignore storage errors
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

    // Defer tracking well out of the critical path — wait for full load
    // + idle, so it never competes with LCP/hydration on mobile.
    const schedule = () => {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(track, { timeout: 10000 });
      } else {
        setTimeout(track, 4000);
      }
    };

    if (document.readyState === "complete") {
      setTimeout(schedule, 2500);
    } else {
      window.addEventListener("load", () => setTimeout(schedule, 2500), { once: true });
    }
  }, [location.pathname, location.hash]);
}
