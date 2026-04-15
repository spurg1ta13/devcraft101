// Shared geo-detection — single request, cached in sessionStorage
let promise: Promise<string | null> | null = null;

export function getCountryCode(): Promise<string | null> {
  if (promise) return promise;

  const cached = sessionStorage.getItem("geo_country");
  if (cached) {
    promise = Promise.resolve(cached === "UNKNOWN" ? null : cached);
    return promise;
  }

  promise = fetch("https://ipapi.co/country_code/", {
    signal: AbortSignal.timeout(3000),
  })
    .then((res) => {
      if (!res.ok) throw new Error(String(res.status));
      return res.text();
    })
    .then((code) => {
      const country = code.trim().toUpperCase();
      sessionStorage.setItem("geo_country", country);
      return country;
    })
    .catch(() => {
      sessionStorage.setItem("geo_country", "UNKNOWN");
      return null;
    });

  return promise;
}
