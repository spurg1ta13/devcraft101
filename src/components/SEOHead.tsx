import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  noindex?: boolean;
}

const SITE_NAME = "DevCraft";
const BASE_URL = "https://devcraft101.lovable.app";
const DEFAULT_TITLE = "DevCraft | Custom Web Development & QA Services";
const DEFAULT_DESC = "AI-driven web development, bespoke UI/UX design, and ISTQB-certified quality assurance — crafted for brands that refuse to blend in.";

const SEOHead = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical = "/",
  type = "website",
  noindex = false,
}: SEOHeadProps) => {
  const fullUrl = `${BASE_URL}${canonical}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEOHead;
