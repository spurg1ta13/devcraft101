import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";
import { componentTagger } from "lovable-tagger";
import { writePrerenderedPages } from "./scripts/prerender-heads";

/**
 * Production HTML optimizations:
 *   - Inline the entry CSS bundle (~17 KB) so there is ZERO render-blocking
 *     CSS request. The browser can paint immediately and the LCP image
 *     no longer competes with the stylesheet on the network.
 *   - Strip vendor modulepreload hints so the LCP image owns mobile
 *     bandwidth (PSI flagged ~3 s resource-load delay).
 */
const optimizeHtml = (): Plugin => {
  let outDir = "dist";
  return {
    name: "optimize-html",
    apply: "build",
    enforce: "post",
    configResolved(c) {
      outDir = c.build.outDir || "dist";
    },
    transformIndexHtml: {
      order: "post",
      handler(html) {
        // 1. Make the entry CSS bundle non-render-blocking.
        //    Critical above-the-fold CSS is already inlined in index.html,
        //    so the full stylesheet can load asynchronously and swap in.
        html = html.replace(
          /<link([^>]*)rel="stylesheet"([^>]*)href="([^"]*\/assets\/[^"]+\.css)"([^>]*)>/g,
          (_m, a: string, b: string, href: string, c: string) =>
            `<link rel="preload" as="style" href="${href}"${a}${b}${c} onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        );
        // 2. Remove vendor modulepreload hints
        html = html.replace(/\s*<link rel="modulepreload"[^>]*>\s*/g, "\n    ");
        return html;
      },
    },
  };
};


/**
 * Emit a static HTML file per route with that route's head tags baked in, so
 * non-JS social crawlers get accurate per-page Open Graph previews. See
 * scripts/prerender-heads.ts.
 */
const prerenderHeads = (): Plugin => {
  let outDir = "dist";
  return {
    name: "prerender-heads",
    apply: "build",
    enforce: "post",
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir || "dist");
    },
    closeBundle() {
      const { written, skipped } = writePrerenderedPages(outDir);
      for (const note of skipped) this.warn(note);
      this.info?.(`prerender-heads: wrote ${written} static route document(s)`);
    },
  };
};

/**
 * Fingerprint long-lived public files (fonts, hero + portfolio images) into
 * /assets/<name>.<hash>.<ext> and rewrite every reference in the built HTML,
 * CSS and JS. Hosting only serves immutable Cache-Control for hashed /assets/
 * files, so PSI flagged the /public copies with "no cache lifetime".
 * Originals stay in place as a fallback for any external/hard-coded link.
 */
const fingerprintPublicAssets = (): Plugin => {
  let outDir = "dist";
  const targets = [
    "fonts/outfit-latin.woff2",
    "fonts/outfit-latin-ext.woff2",
    "fonts/spacemono-400-latin.woff2",
    "fonts/spacemono-700-latin.woff2",
    "hero-banner.webp",
    "hero-banner-mobile.webp",
  ];
  return {
    name: "fingerprint-public-assets",
    apply: "build",
    enforce: "post",
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir || "dist");
    },
    async closeBundle() {
      const { createHash } = await import("crypto");
      const portfolioDir = path.join(outDir, "portfolio");
      if (fs.existsSync(portfolioDir)) {
        for (const f of fs.readdirSync(portfolioDir)) targets.push(`portfolio/${f}`);
      }

      const map = new Map<string, string>();
      const assetsDir = path.join(outDir, "assets");
      fs.mkdirSync(assetsDir, { recursive: true });

      for (const rel of targets) {
        const src = path.join(outDir, rel);
        if (!fs.existsSync(src)) continue;
        const buf = fs.readFileSync(src);
        const hash = createHash("sha256").update(buf).digest("hex").slice(0, 8);
        const ext = path.extname(rel);
        const base = path.basename(rel, ext);
        const hashed = `${base}.${hash}${ext}`;
        fs.writeFileSync(path.join(assetsDir, hashed), buf);
        map.set(`/${rel}`, `/assets/${hashed}`);
      }
      if (!map.size) return;

      const walk = (dir: string): string[] =>
        fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
          const p = path.join(dir, e.name);
          return e.isDirectory() ? walk(p) : [p];
        });

      for (const file of walk(outDir)) {
        if (!/\.(html|css|js)$/.test(file)) continue;
        let text = fs.readFileSync(file, "utf8");
        let changed = false;
        for (const [from, to] of map) {
          if (text.includes(from)) {
            text = text.split(from).join(to);
            changed = true;
          }
        }
        if (changed) fs.writeFileSync(file, text);
      }
      this.info?.(`fingerprint-public-assets: hashed ${map.size} file(s)`);
    },
  };
};


export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    optimizeHtml(),
    prerenderHeads(),
    fingerprintPublicAssets(),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
        },


      },
    },
  },
}));
