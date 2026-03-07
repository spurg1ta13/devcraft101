const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DevCraft",
    url: "https://devcraft.gr",
    logo: "https://devcraft.gr/devcraft-logo.svg",
    description:
      "AI-driven web development, bespoke UI/UX design, and ISTQB-certified quality assurance.",
    email: "contact@devcraft.gr",
    telephone: "+306974159157",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GR",
    },
    sameAs: ["https://facebook.com", "https://instagram.com"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+306974159157",
      contactType: "customer service",
      email: "contact@devcraft.gr",
      availableLanguage: ["English", "Greek"],
    },
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
      "Custom web development, UI/UX design, and ISTQB-certified QA services.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DevCraft",
    url: "https://devcraft.gr",
    telephone: "+306974159157",
    email: "contact@devcraft.gr",
    description:
      "Custom web development, UI/UX design, and ISTQB-certified quality assurance services for brands that refuse to blend in.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GR",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full-Stack Web Development",
            description: "React, TypeScript, Node.js, cloud-native architecture.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom UI/UX Design",
            description: "Research-driven bespoke digital experiences.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "ISTQB-Certified QA Testing",
            description: "Certified engineers ensuring zero-defect launches.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export { OrganizationSchema, WebSiteSchema, LocalBusinessSchema };
