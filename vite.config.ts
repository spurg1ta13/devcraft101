import path from "path";
import fs from "fs";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";
import { componentTagger } from "lovable-tagger";

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
        // 1. Inline the entry CSS bundle
        html = html.replace(
          /<link[^>]*rel="stylesheet"[^>]*href="([^"]+\/assets\/[^"]+\.css)"[^>]*>/g,
          (match, href: string) => {
            try {
              const filePath = path.join(outDir, href.replace(/^\//, ""));
              if (!fs.existsSync(filePath)) return match;
              const css = fs.readFileSync(filePath, "utf-8");
              return `<style>${css}</style>`;
            } catch {
              return match;
            }
          }
        );
        // 2. Remove vendor modulepreload hints
        html = html.replace(/\s*<link rel="modulepreload"[^>]*>\s*/g, "\n    ");
        return html;
      },
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
