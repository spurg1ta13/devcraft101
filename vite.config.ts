import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type Plugin } from "vite";
import { componentTagger } from "lovable-tagger";

/**
 * Transform the production index.html so the entry CSS bundle is loaded
 * non-render-blocking (media=print swap) and the entry JS gets a
 * modulepreload hint at the very top of <head>. Inlined critical CSS in
 * index.html already paints the hero/shell, so deferring the bundle CSS
 * is safe and removes a render-blocking request.
 */
const nonBlockingAssets = (): Plugin => ({
  name: "non-blocking-assets",
  apply: "build",
  enforce: "post",
  transformIndexHtml: {
    order: "post",
    handler(html) {
      // 1. Make the entry CSS link non-render-blocking (handle any attribute order)
      html = html.replace(
        /<link([^>]*?)rel="stylesheet"([^>]*?)>/g,
        (match, before, after) => {
          const attrs = (before + after).trim();
          // Only transform entry CSS in /assets/
          if (!/href="[^"]*\/assets\/[^"]+\.css"/.test(attrs)) return match;
          const preloadAttrs = attrs.replace(/\s*rel="stylesheet"\s*/g, " ");
          return (
            `<link rel="preload" as="style" ${preloadAttrs} onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet" ${preloadAttrs}></noscript>`
          );
        }
      );
      // 2. Append entry JS modulepreload AFTER the LCP image/font preloads
      const moduleMatch = html.match(
        /<script type="module"(?:\s+crossorigin)?\s+src="([^"]+\/assets\/index-[^"]+\.js)"><\/script>/
      );
      if (moduleMatch) {
        const preloadTag = `<link rel="modulepreload" href="${moduleMatch[1]}">\n    `;
        html = html.replace(/(<title>)/, `${preloadTag}$1`);
      }
      return html;
    },
  },
});


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
    nonBlockingAssets(),
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
          "vendor-markdown": ["react-markdown"],
          "vendor-motion": ["framer-motion"],
        },
      },
    },
  },
}));
