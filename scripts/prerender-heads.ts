/**
 * Build-time head prerendering.
 *
 * This app is a client-rendered SPA, so react-helmet-async only rewrites the
 * <head> after JavaScript runs. Social-preview crawlers (LinkedIn, Slack,
 * Facebook, WhatsApp, Discord) never run JavaScript — they read whatever HTML
 * the server hands them, which for an SPA is always the same index.html. The
 * result is that every shared URL shows the homepage preview.
 *
 * This module writes one static HTML file per route (dist/prices/index.html,
 * dist/blog/<slug>/index.html, ...) containing the exact same app shell but
 * with that route's title, description, keywords, canonical, hreflang and
 * Open Graph tags baked in. Crawlers get accurate per-page previews; browsers
 * hydrate into the normal SPA because the body and script tags are untouched.
 *
 * English is baked in as the static language (matching x-default), with
 * hreflang alternates advertising the Greek and German variants. Helmet still
 * overrides the head at runtime, so a visitor in German sees German tags.
 */

import fs from "node:fs";
import path from "node:path";
import { routeMeta, type LocalizedString } from "../src/seo/routeMeta";
import { blogArticles } from "../src/i18n/blogTranslations";

const BASE_URL = "https://devcraft.gr";
const SITE_NAME = "DevCraft";
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Hard cap on generated files. Publishing is rejected above 50,000 files, and
 * blog articles grow over time, so keep the emitted page count bounded.
 */
const MAX_PRERENDER_PAGES = Number(process.env.MAX_PRERENDER_PAGES ?? 300);

interface PageHead {
  /** Route path, e.g. "/" or "/blog/my-post". */
  path: string;
  title: string;
  description: string;
  keywords: string;
  type: string;
  /** Optional Open Graph article metadata. */
  article?: { publishedTime: string; section: string; tags: string[] };
  /** Optional extra JSON-LD injected into the static head. */
  jsonLd?: Record<string, unknown>;
}

const en = (value: LocalizedString | string): string =>
  typeof value === "string" ? value : value.en;

const escapeAttr = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escapeHtml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Collects every route that should get its own static HTML file. */
export function collectPages(): PageHead[] {
  const pages: PageHead[] = Object.values(routeMeta).map((route) => ({
    path: route.path,
    title: en(route.title),
    description: en(route.description),
    keywords: en(route.keywords),
    type: route.type,
  }));

  for (const article of blogArticles) {
    const title = en(article.title);
    const description = en(article.metaDescription);
    pages.push({
      path: `/blog/${article.slug}`,
      title,
      description,
      keywords: article.keywords.join(", "),
      type: "article",
      article: {
        publishedTime: article.date,
        section: en(article.category),
        tags: article.keywords,
      },
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished: article.date,
        dateModified: article.date,
        image: { "@type": "ImageObject", url: OG_IMAGE, width: 1920, height: 1080 },
        author: { "@type": "Organization", name: SITE_NAME, url: BASE_URL },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${BASE_URL}/devcraft-logo.svg` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/blog/${article.slug}` },
        keywords: article.keywords.join(", "),
        inLanguage: "en-US",
        articleSection: en(article.category),
      },
    });
  }

  return pages.slice(0, MAX_PRERENDER_PAGES);
}

/**
 * Removes the head tags this script owns so the static fallback tags in
 * index.html cannot compete with the per-route ones we are about to inject.
 */
function stripManagedTags(html: string): string {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(/\s*<meta[^>]+name="description"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+name="keywords"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]+property="og:[^"]*"[^>]*>/gi, "")
    .replace(/\s*<link[^>]+rel="canonical"[^>]*>/gi, "");
}

function buildHeadBlock(page: PageHead): string {
  const url = `${BASE_URL}${page.path === "/" ? "/" : page.path}`;
  const title = escapeAttr(page.title);
  const description = escapeAttr(page.description);
  const hreflang = ["en", "el", "de"]
    .map(
      (code) =>
        `    <link rel="alternate" hreflang="${code}" href="${escapeAttr(`${url}?lang=${code}`)}" />`,
    )
    .join("\n");

  const articleTags = page.article
    ? [
        `    <meta property="article:published_time" content="${escapeAttr(page.article.publishedTime)}" />`,
        `    <meta property="article:modified_time" content="${escapeAttr(page.article.publishedTime)}" />`,
        `    <meta property="article:author" content="${SITE_NAME}" />`,
        `    <meta property="article:section" content="${escapeAttr(page.article.section)}" />`,
        ...page.article.tags.map(
          (tag) => `    <meta property="article:tag" content="${escapeAttr(tag)}" />`,
        ),
      ].join("\n")
    : "";

  const jsonLd = page.jsonLd
    ? `    <script type="application/ld+json" data-prerendered="true">${escapeHtml(JSON.stringify(page.jsonLd))}</script>`
    : "";

  return [
    `    <title>${escapeHtml(page.title)}</title>`,
    `    <meta data-rh="true" name="description" content="${description}" />`,
    `    <meta data-rh="true" name="keywords" content="${escapeAttr(page.keywords)}" />`,
    `    <link data-rh="true" rel="canonical" href="${escapeAttr(url)}" />`,
    `    <meta data-rh="true" property="og:type" content="${escapeAttr(page.type)}" />`,
    `    <meta data-rh="true" property="og:site_name" content="${SITE_NAME}" />`,
    `    <meta data-rh="true" property="og:url" content="${escapeAttr(url)}" />`,
    `    <meta data-rh="true" property="og:title" content="${title}" />`,
    `    <meta data-rh="true" property="og:description" content="${description}" />`,
    `    <meta data-rh="true" property="og:image" content="${OG_IMAGE}" />`,
    `    <meta data-rh="true" property="og:image:width" content="1920" />`,
    `    <meta data-rh="true" property="og:image:height" content="1080" />`,
    `    <meta data-rh="true" property="og:image:type" content="image/jpeg" />`,
    `    <meta data-rh="true" property="og:locale" content="en_US" />`,
    `    <meta data-rh="true" property="og:locale:alternate" content="el_GR" />`,
    `    <meta data-rh="true" property="og:locale:alternate" content="de_DE" />`,
    articleTags,
    hreflang,
    `    <link rel="alternate" hreflang="x-default" href="${escapeAttr(url)}" />`,
    jsonLd,
  ]
    .filter(Boolean)
    .join("\n");
}

export function renderPageHtml(shell: string, page: PageHead): string {
  const html = stripManagedTags(shell);
  return html.replace(/<\/head>/i, `${buildHeadBlock(page)}\n  </head>`);
}

/** Writes one static HTML file per route into the build output directory. */
export function writePrerenderedPages(outDir: string): { written: number; skipped: string[] } {
  const shellPath = path.join(outDir, "index.html");
  if (!fs.existsSync(shellPath)) {
    return { written: 0, skipped: ["index.html missing — nothing to prerender"] };
  }

  const shell = fs.readFileSync(shellPath, "utf8");
  const skipped: string[] = [];
  let written = 0;

  for (const page of collectPages()) {
    const html = renderPageHtml(shell, page);
    const relative = page.path.replace(/^\//, "");

    // Static hosts resolve extension-less URLs differently: some map /prices to
    // prices/index.html, others to prices.html. Emit both so the crawler gets
    // the per-route head regardless of which convention the host uses.
    const targets =
      page.path === "/"
        ? [shellPath]
        : [
            path.join(outDir, relative, "index.html"),
            path.join(outDir, `${relative}.html`),
          ];

    for (const target of targets) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, html);
      written += 1;
    }
  }

  return { written, skipped };
}
