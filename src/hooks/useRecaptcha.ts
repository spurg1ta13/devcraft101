import { useState, useCallback } from "react";

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = "6LcDHpYsAAAAADcQGSRHw2ZuRd-hzK7ghSUElUBc";
let scriptPromise: Promise<void> | null = null;

function loadRecaptchaScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    if (window.grecaptcha) { resolve(); return; }
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { scriptPromise = null; reject(new Error("Failed to load reCAPTCHA")); };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

export function useRecaptcha() {
  const [error, setError] = useState<string | null>(null);

  // Load reCAPTCHA on-demand (only when token is needed, i.e. form submit)
  const getToken = useCallback(async (action: string = "contact_form"): Promise<string | null> => {
    try {
      await loadRecaptchaScript();
      return await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
            resolve(token);
          } catch (e) {
            reject(e);
          }
        });
      });
    } catch (e) {
      console.error("reCAPTCHA error:", e);
      setError("reCAPTCHA failed to load");
      return null;
    }
  }, []);

  return { error, getToken };
}
