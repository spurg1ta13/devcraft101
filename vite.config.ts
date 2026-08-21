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
  ].filter(Boolean),
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
