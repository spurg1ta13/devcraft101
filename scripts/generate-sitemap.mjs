import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = "https://devcraft.gr";
const TODAY = new Date().toISOString().slice(0, 10);
const appRoutesPath = path.resolve(__dirname, "../src/App.tsx");
const blogTranslationsPath = path.resolve(__dirname, "../src/i18n/blogTranslations.ts");
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
const tempOutputPath = `${outputPath}.tmp`;

const routeMetadata = new Map([
  ["/", { changefreq: "weekly", priority: "1.0" }],
  ["/about", { changefreq: "monthly", priority: "0.8" }],
  ["/blog", { changefreq: "weekly", priority: "0.9" }],
  ["/privacy-policy", { changefreq: "yearly", priority: "0.3" }],
  ["/terms-of-service", { changefreq: "yearly", priority: "0.3" }],
]);

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function extractStaticRoutes() {
  const content = readFile(appRoutesPath);
  const routeRegex = /<Route\s+path="([^"]+)"/g;
  const routes = [];
  const seen = new Set();
  let match;

  while ((match = routeRegex.exec(content)) !== null) {
    const routePath = match[1];

    if (routePath === "*" || routePath.includes(":")) {
      continue;
    }

    if (!seen.has(routePath)) {
      seen.add(routePath);
      routes.push(routePath);
    }
  }

  return routes;
}

function extractBlogSlugs() {
  const content = readFile(blogTranslationsPath);
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs = new Set();
  let match;

  while ((match = slugRegex.exec(content)) !== null) {
    slugs.add(match[1]);
  }

  return [...slugs];
}

function buildUrlEntry(loc, meta) {
  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${TODAY}</lastmod>`,
    `    <changefreq>${meta.changefreq}</changefreq>`,
    `    <priority>${meta.priority}</priority>`,
    "  </url>",
  ].join("\n");
}

function generateSitemapXml() {
  const staticRoutes = extractStaticRoutes();
  const blogSlugs = extractBlogSlugs();

  const staticEntries = staticRoutes.map((routePath) => {
    const meta = routeMetadata.get(routePath) ?? { changefreq: "monthly", priority: "0.5" };
    return buildUrlEntry(`${BASE_URL}${routePath}`, meta);
  });

  const blogEntries = blogSlugs.map((slug) =>
    buildUrlEntry(`${BASE_URL}/blog/${slug}`, { changefreq: "monthly", priority: "0.8" })
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...staticEntries,
    ...blogEntries,
    '</urlset>',
  ].join("\n");

  const forbiddenPatterns = [/<html/i, /<body/i, /<style/i, /class=/i, /tailwind/i];
  const matchedForbiddenPattern = forbiddenPatterns.find((pattern) => pattern.test(xml));

  if (matchedForbiddenPattern) {
    throw new Error(`Invalid sitemap content detected: ${matchedForbiddenPattern}`);
  }

  if (!xml.endsWith("</urlset>")) {
    throw new Error("Invalid sitemap output: missing closing </urlset> tag");
  }

  return xml;
}

function writeSitemapAtomically(xml) {
  fs.writeFileSync(tempOutputPath, xml, "utf8");
  fs.renameSync(tempOutputPath, outputPath);
}

const xml = generateSitemapXml();
writeSitemapAtomically(xml);

const urlCount = (xml.match(/<url>/g) ?? []).length;
const fileSizeBytes = Buffer.byteLength(xml, "utf8");
console.log(`✅ sitemap.xml generated with ${urlCount} URLs (${fileSizeBytes} bytes)`);
