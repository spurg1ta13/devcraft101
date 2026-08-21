import { useEffect, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { getCountryCode } from "@/lib/geo";

const DE_COUNTRIES = ["DE", "AT", "CH", "LI", "LU", "BE"];

export const PHONE_GR = {
  display: "+30 697 583 5277",
  tel: "+306975835277",
  wa: "306975835277",
};

export const PHONE_DE = {
  display: "+49 152 52343208",
  tel: "+4915252343208",
  wa: "4915252343208",
  secondary: {
    display: "+30 697 583 5277",
    tel: "+306975835277",
    wa: "306975835277",
  },
};

export function usePhoneNumber() {
  const { lang } = useLang();
  const [country, setCountry] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("geo_country");
    return cached && cached !== "UNKNOWN" ? cached : null;
  });

  useEffect(() => {
    let cancelled = false;
    getCountryCode().then((c) => {
      if (!cancelled) setCountry(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const isDE = lang === "de" || (country ? DE_COUNTRIES.includes(country) : false);
  return isDE ? PHONE_DE : PHONE_GR;
}
