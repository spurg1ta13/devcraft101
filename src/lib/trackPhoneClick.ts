// Backend client is imported lazily so it stays out of the entry bundle.

const STORAGE_KEY = "dv_visitor_id";

const getVisitorId = (): string | null => {
  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(STORAGE_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
};

export const trackPhoneClick = (source: string) => {
  // Fire and forget — never block the tel: navigation
  try {
    void import("@/integrations/supabase/client").then(({ supabase }) =>
      supabase.from("phone_clicks").insert({
        visitor_id: getVisitorId(),
        page_path: typeof window !== "undefined" ? window.location.pathname : null,
        source,
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 2000) : null,
      })
    );
  } catch {
    // ignore
  }
};
