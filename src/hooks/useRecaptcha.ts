import { useState, useEffect, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = "6LcDHpYsAAAAADcQGSRHw2ZuRd-hzK7ghSUElUBc";
let scriptLoaded = false;

function loadRecaptchaScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
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
    loadRecaptchaScript()
      .then(() => { if (!cancelled) setReady(true); })
      .catch((err) => {
        console.error("reCAPTCHA init error:", err);
        if (!cancelled) setError("reCAPTCHA failed to load");
      });
    return () => { cancelled = true; };
  }, []);

  const getToken = useCallback(async (action: string = "contact_form"): Promise<string | null> => {
    if (!ready) return null;
    try {
      return await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    } catch {
      return null;
    }
  }, [ready]);

  return { ready, error, getToken };
}
