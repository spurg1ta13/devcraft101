import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/LanguageContext";

interface SEOHeadProps {
  title?: { en: string; el: string } | string;
  description?: { en: string; el: string } | string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
}

const SITE_NAME = "DevCraft";
const BASE_URL = "https://devcraft.gr";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const DEFAULT_TITLE = {
  en: "DevCraft | Custom Web Development & QA Services",
  el: "DevCraft | Προσαρμοσμένη Ανάπτυξη Ιστοσελίδων & Υπηρεσίες QA",
};
const DEFAULT_DESC = {
  en: "AI-driven web development, bespoke interfaces, and quality assurance — crafted for brands that refuse to blend in.",
  el: "Ανάπτυξη ιστοσελίδων με τεχνητή νοημοσύνη, εξατομικευμένος σχεδιασμός UI/UX και πιστοποιημένη διασφάλιση ποιότητας ISTQB — σχεδιασμένα για brands που αρνούνται να περάσουν απαρατήρητα.",
};

const resolve = (val: { en: string; el: string } | string, lang: string): string =>
  typeof val === "string" ? val : (val as Record<string, string>)[lang] || (val as Record<string, string>).en;

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical = "/",
  type = "website",
  noindex = false,
}: SEOHeadProps) => {
  const fullUrl = `${BASE_URL}${canonical}`;
  const { lang } = useLang();
  const resolvedTitle = resolve(title, lang);
  const resolvedDesc = resolve(description, lang);

  // Block indexing on any non-production domain (e.g. lovable.app)
  const isStaging = typeof window !== "undefined" && !window.location.hostname.endsWith("devcraft.gr");
  const shouldNoindex = noindex || isStaging;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <link rel="canonical" href={fullUrl} />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />
      {!shouldNoindex && <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />}
      {shouldNoindex && <meta name="robots" content="noindex, nofollow" />}
      <meta name="googlebot" content={shouldNoindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <meta name="google" content="notranslate" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="theme-color" content="#050505" />
      <meta name="format-detection" content="telephone=no" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "el" ? "el_GR" : "en_US"} />
      <meta property="og:locale:alternate" content={lang === "el" ? "en_US" : "el_GR"} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="DevCraft - Web Development, UI/UX Design, QA Testing" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content="DevCraft - Web Development, UI/UX Design, QA Testing" />
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="el" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;
