const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "DevCraft",
    url: "https://devcraft.gr",
    logo: "https://devcraft.gr/favicon.ico",
    image: "https://devcraft.gr/og-image.jpg",
    description:
      "Bespoke digital products: Custom Software Development, UI/UX Design, and ISTQB certified Quality Assurance.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GR",
    },
    serviceType: [
      "Custom Software Development",
      "UI/UX Design",
      "Quality Assurance",
      "Web Development",
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
      "AI-driven web development, bespoke interfaces, and quality assurance services.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export { OrganizationSchema, WebSiteSchema };
