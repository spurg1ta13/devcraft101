import { Helmet } from "react-helmet-async";
import { useLang } from "@/i18n/LanguageContext";
import { BreadcrumbSchema } from "@/components/StructuredData";

interface SEOHeadProps {
  title?: { en: string; el: string; de?: string } | string;
  description?: { en: string; el: string; de?: string } | string;
  keywords?: { en: string; el: string; de?: string } | string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
  ogImage?: string;
  /**
   * For single-language pages (e.g. the Greek local landing page): emit only
   * that locale's hreflang instead of advertising en/el/de variants that do
   * not exist.
   */
  localeOnly?: "en" | "el" | "de";

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
  en: "Custom Software Solutions Worldwide | Devcraft.gr",
  el: "Προσαρμοσμένες Λύσεις Λογισμικού Παγκοσμίως | Devcraft.gr",
  de: "Maßgeschneiderte Software-Lösungen weltweit | Devcraft.gr",
};
const DEFAULT_DESC = {
  en: "Custom software solutions — websites, web apps & AI tools built with ISTQB-certified QA and bespoke UI/UX design. Based in Thessaloniki, Greece — serving clients worldwide.",
  el: "Κατασκευή ιστοσελίδων με πιστοποιημένο ISTQB QA και σχεδιασμό UI/UX. Custom sites, web εφαρμογές και AI εργαλεία από τη Θεσσαλονίκη για όλο τον κόσμο.",
  de: "Individuelle Software: Websites, Web-Apps und KI-Tools mit ISTQB-zertifizierter QA und UI/UX-Design. Aus Thessaloniki, weltweit für Kunden tätig.",
};
const DEFAULT_KEYWORDS = {
  en: "custom software development, web development Thessaloniki, web development Greece, custom website development, AI web development, ISTQB QA testing, UI/UX design, React developer, TypeScript developer, personal portfolio website, CV website design, bespoke web design",
  el: "κατασκευή ιστοσελίδων Θεσσαλονίκη, κατασκευή ιστοσελίδων Ελλάδα, δημιουργία ιστοσελίδων Θεσσαλονίκη, σχεδιασμός ιστοσελίδων Θεσσαλονίκη, web development Θεσσαλονίκη, ανάπτυξη ιστοσελίδων, custom λογισμικό, ποιοτικός έλεγχος ISTQB, UI/UX design Θεσσαλονίκη, ιστοσελίδα προσωπικού portfolio, προσωπική ιστοσελίδα βιογραφικού",
  de: "individuelle webentwicklung, maßgeschneiderte software, webentwicklung Thessaloniki Griechenland, KI webentwicklung, ISTQB QA testing, UI/UX design, React entwickler, TypeScript entwickler, persönliche portfolio website, CV website, webentwicklung weltweit",
};

const resolve = (val: { en: string; el: string; de?: string } | string, lang: string): string =>
  typeof val === "string" ? val : (val as Record<string, string>)[lang] || (val as Record<string, string>).en;

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  keywords = DEFAULT_KEYWORDS,
  canonical = "/",
  type = "website",
  noindex = false,
  ogImage,
  localeOnly,
  articleMeta,
}: SEOHeadProps) => {

  const { lang: selectedLang } = useLang();
  const lang = localeOnly ?? selectedLang;
  // Strip any ?lang param the user might have on the canonical so it stays clean.
  const cleanPath = canonical.split("?")[0];
  const fullUrl = `${BASE_URL}${cleanPath}`;
  const enUrl = `${fullUrl}?lang=en`;
  const elUrl = `${fullUrl}?lang=el`;
  const deUrl = `${fullUrl}?lang=de`;
  const currentUrl = localeOnly ? fullUrl : lang === "el" ? elUrl : lang === "de" ? deUrl : enUrl;
  const resolvedTitle = resolve(title, lang);
  const resolvedDesc = resolve(description, lang);
  const resolvedOgImage = ogImage
    ? (ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`)
    : OG_IMAGE;

  // Block indexing on any non-production domain (e.g. lovable.app)
  const isStaging = typeof window !== "undefined" && !window.location.hostname.endsWith("devcraft.gr");
  const shouldNoindex = noindex || isStaging;

  return (
    <>
    <BreadcrumbSchema />
    <Helmet>
      <html lang={lang} />
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <meta name="keywords" content={resolve(keywords, lang)} />
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
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang === "el" ? "el_GR" : lang === "de" ? "de_DE" : "en_US"} />
      {!localeOnly && lang !== "en" && <meta property="og:locale:alternate" content="en_US" />}
      {!localeOnly && lang !== "el" && <meta property="og:locale:alternate" content="el_GR" />}
      {!localeOnly && lang !== "de" && <meta property="og:locale:alternate" content="de_DE" />}
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="DevCraft - Web Development, UI/UX Design, QA Testing" />
      {articleMeta?.publishedTime && <meta property="article:published_time" content={articleMeta.publishedTime} />}
      {articleMeta?.modifiedTime && <meta property="article:modified_time" content={articleMeta.modifiedTime} />}
      {articleMeta?.author && <meta property="article:author" content={articleMeta.author} />}
      {articleMeta?.section && <meta property="article:section" content={articleMeta.section} />}
      {articleMeta?.tags?.map((tag, i) => (
        <meta key={i} property="article:tag" content={tag} />
      ))}
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="en-US" href={enUrl} />
      <link rel="alternate" hrefLang="en-GB" href={enUrl} />
      <link rel="alternate" hrefLang="el" href={elUrl} />
      <link rel="alternate" hrefLang="el-GR" href={elUrl} />
      <link rel="alternate" hrefLang="de" href={deUrl} />
      <link rel="alternate" hrefLang="de-DE" href={deUrl} />
      <link rel="alternate" hrefLang="de-AT" href={deUrl} />
      <link rel="alternate" hrefLang="de-CH" href={deUrl} />
      <link rel="alternate" hrefLang="de-LI" href={deUrl} />
      <link rel="alternate" hrefLang="de-LU" href={deUrl} />
      <link rel="alternate" hrefLang="de-BE" href={deUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
    </>
  );
};

export default SEOHead;
