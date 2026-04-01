import { useLocation } from "react-router-dom";
import { useLang } from "@/i18n/LanguageContext";
import { translations, t } from "@/i18n/translations";

const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://devcraft.gr/#organization",
    name: "DevCraft",
    url: "https://devcraft.gr",
    logo: {
      "@type": "ImageObject",
      url: "https://devcraft.gr/devcraft-logo.svg",
      width: 512,
      height: 512,
    },
    image: "https://devcraft.gr/og-image.jpg",
    description:
      "AI-driven web development agency in Thessaloniki, Greece. Custom website development (κατασκευή ιστοσελίδων Θεσσαλονίκη), bespoke UI/UX design, and ISTQB-certified Quality Assurance. Plans from €600 to €2,500.",
    slogan:
      "AI-driven web development, bespoke interfaces, and quality assurance — crafted for brands that refuse to blend in.",
    alternateName: ["DevCraft Greece", "DevCraft Thessaloniki", "DevCraft Θεσσαλονίκη"],
    foundingLocation: {
      "@type": "Place",
      name: "Thessaloniki, Greece",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Thessaloniki",
      addressRegion: "Central Macedonia",
      addressCountry: "GR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.6401,
      longitude: 22.9444,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Thessaloniki",
        containedInPlace: { "@type": "Country", name: "Greece" },
      },
      { "@type": "Country", name: "Greece" },
      { "@type": "Place", name: "Worldwide" },
    ],
    serviceType: [
      "Custom Web Development",
      "Κατασκευή Ιστοσελίδων",
      "Landing Page Design",
      "Δημιουργία Ιστοσελίδων",
      "UI/UX Design",
      "Σχεδιασμός UI/UX",
      "ISTQB Certified Quality Assurance",
      "Technical SEO",
      "Multilingual Website Development",
      "AI Chatbot Integration",
      "GDPR Compliance",
      "Core Web Vitals Optimization",
      "Website Maintenance",
      "Συντήρηση Ιστοσελίδων",
    ],
    knowsAbout: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Web Design",
      "Google PageSpeed Optimization",
      "ISTQB Software Testing",
      "AI Assistant Integration",
      "Structured Data & Schema Markup",
      "Multilingual SEO",
      "Κατασκευή Ιστοσελίδων Θεσσαλονίκη",
      "Web Development Greece",
    ],
    knowsLanguage: ["en", "el"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Service Plans",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "MINI – The Clean Start",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "MINI: The Clean Start",
                description:
                  "Complete single-page website with all essential sections (Home, About, Services, Contact). Mobile-ready, SEO visibility, social media integration, direct contact tools, GDPR & cookie compliance, privacy policy & terms auto-generated, SSL certificate. 1 language (Greek). Delivered in 2 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "600",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "600",
                maxPrice: "700",
                unitText: "project",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "MIDI – The Corporate Standard",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "MIDI: The Corporate Standard",
                description:
                  "Up to 5 pages (Home, Services, About, etc.) with lead form, gallery/portfolio, sitemap & robots.txt, GDPR/cookie compliance, Google Maps integration, and technical SEO. 1 language. Delivered in 4–5 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "900",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "900",
                maxPrice: "1000",
                unitText: "project",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "MAXI – The International Presence",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "MAXI: The International Presence",
                description:
                  "Multilingual website (2–3 languages) with up to 7 pages, language switcher, localized SEO, lead capture form with spam protection, custom error & loading pages, admin dashboard for messages, GDPR compliance, Google Maps, and SSL certificate. Delivered in 6–8 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "1300",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "1300",
                maxPrice: "1500",
                unitText: "project",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "ELITE – The Elite Performance",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "ELITE: The Elite Performance",
                description:
                  "Up to 10 pages + interactive tools with unlimited languages. AI assistant, lead & booking form with spam protection, custom animations, automatic image optimization, SEO-optimized URLs, admin dashboard, GDPR compliance, Google Maps, ISTQB-certified QA, and SSL certificate. Delivered in 10–11 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "1950",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "1950",
                maxPrice: "2500",
                unitText: "project",
              },
            },
          ],
        },
      ],
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional Certification",
      name: "ISTQB Certified Tester",
      recognizedBy: {
        "@type": "Organization",
        name: "International Software Testing Qualifications Board",
        url: "https://www.istqb.org",
      },
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Quality Assurance Standard",
        value: "ISTQB Certified",
        description:
          "All projects undergo ISTQB-certified quality assurance testing on desktop and mobile across multiple OS and browsers.",
      },
    ],
    email: "contact@devcraft.gr",
    telephone: "+306974159157",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+306974159157",
      email: "contact@devcraft.gr",
      contactType: "customer service",
      availableLanguage: ["English", "Greek"],
    },
    sameAs: ["https://www.linkedin.com/company/devcraft-gr"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "DevCraft",
    url: "https://devcraft.gr",
    description:
      "AI-driven web development, bespoke interfaces, and ISTQB-certified quality assurance services in Thessaloniki, Greece. Service plans from €500 to €2,500.",
    publisher: { "@id": "https://devcraft.gr/#organization" },
    inLanguage: ["en", "el"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const FAQPageSchema = () => {
  const { lang } = useLang();
  const faqItems = translations.faq.items;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: t(item.question, lang),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.answer, lang),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const BREADCRUMB_NAMES: Record<string, { en: string; el: string }> = {
  "/": { en: "Home", el: "Αρχική" },
  "/about": { en: "About Us", el: "Σχετικά" },
  "/prices": { en: "Prices", el: "Τιμές" },
  "/blog": { en: "Blog", el: "Blog" },
  "/privacy-policy": { en: "Privacy Policy", el: "Πολιτική Απορρήτου" },
  "/terms-of-service": { en: "Terms of Service", el: "Όροι Χρήσης" },
};

const BreadcrumbSchema = () => {
  const { lang } = useLang();
  const { pathname } = useLocation();

  const BASE = "https://devcraft.gr";
  const items: { name: string; url: string }[] = [
    { name: BREADCRUMB_NAMES["/"][lang], url: BASE + "/" },
  ];

  if (pathname !== "/") {
    // Handle blog articles: /blog/some-slug
    const isBlogArticle = pathname.startsWith("/blog/") && pathname !== "/blog";
    if (isBlogArticle) {
      items.push({ name: BREADCRUMB_NAMES["/blog"][lang], url: BASE + "/blog" });
      const slug = pathname.split("/").pop() || "";
      const prettyName = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
      items.push({ name: prettyName, url: BASE + pathname });
    } else {
      const label = BREADCRUMB_NAMES[pathname];
      if (label) {
        items.push({ name: label[lang], url: BASE + pathname });
      }
    }
  }

  if (items.length < 2) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export { OrganizationSchema, WebSiteSchema, FAQPageSchema, BreadcrumbSchema };
