/**
 * Single source of truth for per-route head metadata.
 *
 * Consumed twice:
 *   1. At runtime by each page via <SEOHead {...routeMeta["/prices"]} /> so
 *      JS-executing crawlers and language switching stay accurate.
 *   2. At build time by the `prerender-heads` Vite plugin, which bakes these
 *      values into a static HTML file per route so social-preview crawlers
 *      (LinkedIn, Slack, Facebook, WhatsApp) — which never run JS — read the
 *      correct title/description/og:* for the page they actually fetched.
 *
 * Keep this file free of React and browser APIs: it is imported by the Vite
 * config during the build.
 */

export type LocalizedString = { en: string; el: string; de?: string };

export interface RouteMeta {
  /** Canonical path, exactly as it appears in the router and sitemap. */
  path: string;
  title: LocalizedString;
  description: LocalizedString;
  keywords: LocalizedString;
  /** Open Graph object type. */
  type: string;
}

export const routeMeta: Record<string, RouteMeta> = {
  "/": {
    path: "/",
    type: "website",
    title: {
      en: "Custom Web Development & AI Solutions | DevCraft",
      el: "Κατασκευή Ιστοσελίδων & Λύσεις AI | DevCraft",
      de: "Individuelle Webentwicklung & KI-Lösungen | DevCraft",
    },
    description: {
      en: "Bespoke websites, web apps and AI tools with ISTQB-certified QA. Human strategy plus AI efficiency — your project delivered fast, worldwide.",
      el: "Custom ιστοσελίδες, web εφαρμογές και AI εργαλεία με πιστοποιημένο ISTQB QA. Ανθρώπινη στρατηγική και ταχύτητα AI, για πελάτες παγκοσμίως.",
      de: "Maßgeschneiderte Websites, Web-Apps und KI-Tools mit ISTQB-zertifizierter QA. Menschliche Strategie plus KI-Effizienz — schnell und weltweit.",
    },
    keywords: {
      en: "custom web development, web app development, AI solutions, ISTQB QA testing, React developer, TypeScript developer, bespoke website design, personal portfolio website",
      el: "κατασκευή ιστοσελίδων, ανάπτυξη web εφαρμογών, λύσεις AI, ISTQB QA, React developer, custom σχεδιασμός ιστοσελίδων, ιστοσελίδα portfolio",
      de: "individuelle webentwicklung, web-app entwicklung, KI-Lösungen, ISTQB QA testing, React entwickler, maßgeschneidertes webdesign, portfolio website",
    },
  },
  "/prices": {
    path: "/prices",
    type: "website",
    title: {
      en: "Plans & Packages | DevCraft Web Development",
      el: "Πακέτα & Υπηρεσίες | DevCraft Κατασκευή Ιστοσελίδων",
      de: "Pakete & Leistungen | DevCraft Webentwicklung",
    },
    description: {
      en: "Compare DevCraft plans for websites, web apps and AI tools — MINI to ELITE, each with ISTQB-certified QA, responsive design and multilingual support.",
      el: "Συγκρίνετε τα πακέτα DevCraft για ιστοσελίδες, web εφαρμογές και AI εργαλεία — MINI έως ELITE, με ISTQB QA και responsive πολύγλωσσο σχεδιασμό.",
      de: "DevCraft-Pakete für Websites, Web-Apps und KI-Tools im Vergleich — MINI bis ELITE, mit ISTQB-zertifizierter QA und mehrsprachigem Responsive-Design.",
    },
    keywords: {
      en: "web development plans, website packages, custom web app development, ISTQB QA testing, multilingual website, web development quote",
      el: "πακέτα κατασκευής ιστοσελίδων, υπηρεσίες web development, custom web εφαρμογές, ISTQB QA, πολύγλωσση ιστοσελίδα",
      de: "webentwicklung pakete, website leistungen, individuelle web-app entwicklung, ISTQB QA testing, mehrsprachige website",
    },
  },
  "/about": {
    path: "/about",
    type: "profile",
    title: {
      en: "About Us | DevCraft Team & Expertise",
      el: "Σχετικά με εμάς | Η Ομάδα DevCraft",
      de: "Über uns | Das DevCraft-Team",
    },
    description: {
      en: "Meet DevCraft: 10+ years building web apps, with ISTQB-certified quality assurance, AI engineering and digital marketing under one small senior team.",
      el: "Γνωρίστε την DevCraft: 10+ χρόνια σε web εφαρμογές, με πιστοποιημένο ISTQB QA, AI engineering και ψηφιακό μάρκετινγκ από μια μικρή έμπειρη ομάδα.",
      de: "DevCraft kennenlernen: über 10 Jahre Web-Apps, mit ISTQB-zertifizierter QA, KI-Engineering und digitalem Marketing aus einem kleinen Senior-Team.",
    },
    keywords: {
      en: "about DevCraft, web development team, ISTQB certified tester, AI engineering team, senior React developers, digital marketing team",
      el: "σχετικά με DevCraft, ομάδα κατασκευής ιστοσελίδων, πιστοποιημένος ISTQB tester, ομάδα AI, React developers",
      de: "über DevCraft, webentwicklung team, ISTQB zertifizierter tester, KI engineering team, React entwickler",
    },
  },
  "/blog": {
    path: "/blog",
    type: "website",
    title: {
      en: "Blog | Web Development, AI & QA Insights",
      el: "Ιστολόγιο | Ανάπτυξη Ιστοσελίδων, AI & QA",
      de: "Blog | Webentwicklung, KI & QA Einblicke",
    },
    description: {
      en: "Practical articles on custom web development, AI-driven builds, ISTQB quality assurance, performance and green code from the DevCraft team.",
      el: "Πρακτικά άρθρα για custom ανάπτυξη ιστοσελίδων, AI, διασφάλιση ποιότητας ISTQB, ταχύτητα και green code από την ομάδα DevCraft.",
      de: "Praxisnahe Artikel zu individueller Webentwicklung, KI-gestützter Umsetzung, ISTQB-Qualitätssicherung, Performance und Green Code von DevCraft.",
    },
    keywords: {
      en: "web development blog, AI development articles, ISTQB QA testing blog, website performance, green code, CSRD, SEO for websites",
      el: "blog κατασκευής ιστοσελίδων, άρθρα AI, ISTQB QA, ταχύτητα ιστοσελίδας, green code, SEO",
      de: "webentwicklung blog, KI artikel, ISTQB QA testing, website performance, green code, CSRD, SEO",
    },
  },
};
