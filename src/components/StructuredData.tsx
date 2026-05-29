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
      "Custom software solutions — websites, web apps & AI tools with bespoke UI/UX design and ISTQB-certified Quality Assurance. Your 1-month project, delivered in 1 week. Serving clients worldwide.",
    slogan:
      "Combine Human Strategy with AI Efficiency to deliver bespoke, ISTQB-certified digital experiences.",
    alternateName: ["DevCraft", "DevCraft Thessaloniki", "DevCraft Θεσσαλονίκη", "Κατασκευή Ιστοσελίδων Θεσσαλονίκη"],
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
    areaServed: [
      { "@type": "Place", name: "Worldwide" },
      { "@type": "City", name: "Thessaloniki" },
      { "@type": "City", name: "Θεσσαλονίκη" },
      { "@type": "AdministrativeArea", name: "Central Macedonia" },
      { "@type": "Country", name: "Greece" },
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
      "Custom Web Development",
      "Bespoke Software Solutions",
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
                  "Complete single-page website with all essential sections (Home, About, Services, Contact). Mobile-ready, SEO visibility, social media integration, direct contact tools, GDPR & cookie compliance, privacy policy & terms auto-generated, fast loading on mobile & desktop, SSL certificate. 1 language. Delivered in 2 working days.",
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
                  "Up to 5 pages with gallery/portfolio, direct contact tools, sitemap & robots.txt, privacy policy & terms auto-generated, GDPR & cookie compliance, Google Maps, Viber/WhatsApp floating button on mobile, schema markup for local business, fast loading on mobile & desktop, and SSL certificate. 1 language. Delivered in 4–5 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "1000",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "1000",
                maxPrice: "1200",
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
                  "Multilingual website (2–3 languages) with up to 7 pages, language switcher, localized SEO, lead capture form with spam protection, custom error & loading pages, admin dashboard for messages, GDPR compliance, Google Maps, Viber/WhatsApp floating button on mobile, schema markup for local business, accessibility (WCAG) compliance, fast loading on mobile & desktop, and SSL certificate. Delivered in 6–8 working days.",
                termsOfService: "https://devcraft.gr/terms",
              },
              priceCurrency: "EUR",
              price: "1450",
              priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "EUR",
                minPrice: "1450",
                maxPrice: "1700",
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
                  "Up to 10 pages + interactive tools with unlimited languages. AI assistant, lead & booking form with spam protection, custom animations, automatic image optimization, SEO-optimized URLs, admin dashboard, GDPR compliance, Google Maps, Viber/WhatsApp floating button on mobile, schema markup for local business, accessibility (WCAG) compliance, fast loading on mobile & desktop, ISTQB-certified QA, and SSL certificate. Delivered in 10–11 working days.",
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
    telephone: "+306974776057",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+306974776057",
        email: "contact@devcraft.gr",
        contactType: "customer service",
        availableLanguage: ["English", "Greek", "German"],
        areaServed: ["Worldwide", "GR"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+306974776057",
        email: "contact@devcraft.gr",
        contactType: "sales",
        availableLanguage: ["Greek", "English"],
        areaServed: ["GR", "Thessaloniki"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+4915252343208",
        email: "contact@devcraft.gr",
        contactType: "customer service",
        availableLanguage: ["German", "English"],
        areaServed: ["DE", "AT", "CH", "LI", "LU", "BE"],
      },
    ],
    sameAs: ["https://www.linkedin.com/company/devcraft-gr"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "12",
      reviewCount: "12",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const ServicesSchema = () => {
  const services = [
    {
      name: "Custom Web Development",
      alternateName: "Κατασκευή Ιστοσελίδων",
      description:
        "Bespoke websites and web applications built with React, TypeScript, and modern cloud-native architecture. Performance-first, SEO-ready, and fully responsive.",
      serviceType: "Web Development",
    },
    {
      name: "AI Integration & Solutions",
      alternateName: "Λύσεις Τεχνητής Νοημοσύνης",
      description:
        "AI chatbots, automation, and intelligent assistants integrated into your website. Multilingual, GDPR-compliant, and trained on your business context.",
      serviceType: "AI Solutions",
    },
    {
      name: "ISTQB-Certified Quality Assurance",
      alternateName: "Πιστοποιημένος Έλεγχος Ποιότητας ISTQB",
      description:
        "Certified QA engineers test every feature on desktop and mobile across Windows, macOS, iOS, and Android. Zero-defect launch policy.",
      serviceType: "Software Testing",
    },
    {
      name: "UI/UX Design",
      alternateName: "Σχεδιασμός UI/UX",
      description:
        "Research-driven, conversion-focused interfaces. Custom design systems — never templates — that align with your brand and convert visitors into customers.",
      serviceType: "UI/UX Design",
    },
    {
      name: "Digital Marketing",
      alternateName: "Ψηφιακό Marketing",
      description:
        "SEO, SEM, social media, and content marketing. Data-driven strategies that amplify brand reach and convert leads into loyal customers.",
      serviceType: "Digital Marketing",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.name,
      alternateName: s.alternateName,
      description: s.description,
      serviceType: s.serviceType,
      provider: { "@id": "https://devcraft.gr/#organization" },
      areaServed: [
        { "@type": "Place", name: "Worldwide" },
      ],
      availableLanguage: ["en", "el", "de"],
    })),
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
      "Custom software solutions — websites, web apps & AI tools with ISTQB-certified quality assurance. Serving clients worldwide.",
    publisher: { "@id": "https://devcraft.gr/#organization" },
    inLanguage: ["en", "el", "de"],
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

export { OrganizationSchema, WebSiteSchema, FAQPageSchema, BreadcrumbSchema, ServicesSchema };
