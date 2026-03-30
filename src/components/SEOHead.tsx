import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/LanguageContext";
import { BreadcrumbSchema } from "@/components/StructuredData";

interface SEOHeadProps {
  title?: { en: string; el: string } | string;
  description?: { en: string; el: string } | string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
  articleMeta?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
}

const SITE_NAME = "DevCraft";
const BASE_URL = "https://devcraft.gr";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const DEFAULT_TITLE = {
  en: "DevCraft | AI-Powered Web Development",
  el: "DevCraft | Κατασκευή Ιστοσελίδων & Διασφάλιση Ποιότητας (QA)",
};
const DEFAULT_DESC = {
  en: "Bespoke AI-driven web development, UI/UX design, and ISTQB-certified testing services. We build scalable, high-performance digital solutions for brands globally.",
  el: "DevCraft: Επαγγελματική κατασκευή ιστοσελίδων στη Θεσσαλονίκη και πιστοποιημένος έλεγχος λογισμικού ISTQB. Δημιουργούμε custom λύσεις που φέρνουν αποτελέσματα.",
};

const resolve = (val: { en: string; el: string } | string, lang: string): string =>
  typeof val === "string" ? val : (val as Record<string, string>)[lang] || (val as Record<string, string>).en;

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical = "/",
  type = "website",
  noindex = false,
  articleMeta,
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
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon-v2.png" />
      <link rel="apple-touch-icon" href="/favicon-v2.png" />
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
      {articleMeta?.publishedTime && <meta property="article:published_time" content={articleMeta.publishedTime} />}
      {articleMeta?.modifiedTime && <meta property="article:modified_time" content={articleMeta.modifiedTime} />}
      {articleMeta?.author && <meta property="article:author" content={articleMeta.author} />}
      {articleMeta?.section && <meta property="article:section" content={articleMeta.section} />}
      {articleMeta?.tags?.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      <link rel="alternate" hrefLang="en" href={fullUrl} />
      <link rel="alternate" hrefLang="el" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEOHead;
