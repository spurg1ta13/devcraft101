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
      "AI-driven web development agency in Thessaloniki, Greece. We deliver bespoke websites with ISTQB-certified Quality Assurance and multilingual SEO. Plans from €600 to €2,500.",
    slogan:
      "AI-driven web development, bespoke interfaces, and quality assurance — crafted for brands that refuse to blend in.",
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
      "Landing Page Design",
      "UI/UX Design",
      "ISTQB Certified Quality Assurance",
      "Technical SEO",
      "Multilingual Website Development",
      "AI Chatbot Integration",
      "GDPR Compliance",
      "Core Web Vitals Optimization",
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
                  "Single landing page with mobile & desktop responsive design, social redirects, semantic HTML, alt-text for all images, and CTA integration. 1 language (Greek). Delivered in 2–3 working days.",
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
                  "Multilingual website (2–3 languages) with up to 5 pages, language switcher, localized meta tags, URL structure optimization, custom 404 & loading states, GDPR compliance, lead form, and Google Maps. Delivered in 7–10 working days.",
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
                  "Up to 10 pages with unlimited languages, custom animations, AI assistant integration, form-to-email logic, automatic image optimization, calculator functionality, SEO-friendly URLs, and ISTQB-certified QA testing. Delivered in 10–12 working days.",
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
        name: "Google PageSpeed Guarantee",
        value: "90+ Score",
        description:
          "Active optimization to maintain a 90+ Google PageSpeed Score across all ELITE plan websites.",
      },
      {
        "@type": "PropertyValue",
        name: "Quality Assurance Standard",
        value: "ISTQB Certified",
        description:
          "All projects undergo ISTQB-certified quality assurance testing on desktop and mobile across multiple OS and browsers.",
      },
    ],
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

export { OrganizationSchema, WebSiteSchema, FAQPageSchema };
