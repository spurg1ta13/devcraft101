/**
 * Auto-generates public/sitemap.xml from routes + blog slugs.
 * Run: npx tsx scripts/generate-sitemap.ts
 * Also runs automatically before each build via vite config.
 */

import fs from "fs";
import path from "path";

const BASE_URL = "https://devcraft.gr";
const TODAY = new Date().toISOString().split("T")[0];

// Static routes: [path, changefreq, priority]
const staticRoutes: [string, string, string][] = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/blog", "weekly", "0.9"],
  ["/privacy-policy", "yearly", "0.3"],
  ["/terms-of-service", "yearly", "0.3"],
];

// Extract blog slugs from blogTranslations.ts
function getBlogSlugs(): string[] {
  const filePath = path.resolve(__dirname, "../src/i18n/blogTranslations.ts");
  const content = fs.readFileSync(filePath, "utf-8");
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap(): string {
  const blogSlugs = getBlogSlugs();

  const urls = [
    ...staticRoutes.map(([path, changefreq, priority]) => ({
      loc: `${BASE_URL}${path}`,
      lastmod: TODAY,
      changefreq,
      priority,
    })),
    ...blogSlugs.map((slug) => ({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return xml;
}

// Write sitemap
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap, "utf-8");
console.log(`✅ sitemap.xml generated with ${sitemap.match(/<url>/g)?.length ?? 0} URLs`);
