import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let recaptchaSiteKey: string | null = null;
let scriptLoaded = false;

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
    document.head.appendChild(script);
  });
}

export function useRecaptcha() {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (!recaptchaSiteKey) {
          const { data, error: fetchError } = await supabase.functions.invoke("get-recaptcha-config");
          if (fetchError) throw fetchError;
          recaptchaSiteKey = data.siteKey;
        }
        if (!recaptchaSiteKey) throw new Error("No site key");
        await loadRecaptchaScript(recaptchaSiteKey);
        if (!cancelled) setReady(true);
      } catch (err) {
        console.error("reCAPTCHA init error:", err);
        if (!cancelled) setError("reCAPTCHA failed to load");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const getToken = useCallback(async (action: string = "contact_form"): Promise<string | null> => {
    if (!recaptchaSiteKey || !ready) return null;
    try {
      return await window.grecaptcha.execute(recaptchaSiteKey, { action });
    } catch {
      return null;
    }
  }, [ready]);

  return { ready, error, getToken };
}
