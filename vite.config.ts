import fs from "node:fs";
import { execFileSync } from "child_process";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { componentTagger } from "lovable-tagger";

const generateSitemap = () => {
  execFileSync(process.execPath, [path.resolve(__dirname, "scripts/generate-sitemap.mjs")], {
    stdio: "inherit",
  });
};

const validateBuiltSitemap = () => {
  const sitemapPath = path.resolve(__dirname, "dist/sitemap.xml");

  if (!fs.existsSync(sitemapPath)) {
    throw new Error("dist/sitemap.xml was not generated");
  }

  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const invalidPatterns = [/<html/i, /<body/i, /<style/i, /class=/i, /tailwind/i];
  const invalidPattern = invalidPatterns.find((pattern) => pattern.test(sitemap));
  const fileSizeBytes = Buffer.byteLength(sitemap, "utf8");

  if (invalidPattern) {
    throw new Error(`Invalid sitemap output contains forbidden markup: ${invalidPattern}`);
  }

  if (!sitemap.trimEnd().endsWith("</urlset>")) {
    throw new Error("Invalid sitemap output: file must end with </urlset>");
  }

  if (fileSizeBytes > 50 * 1024) {
    throw new Error(`Invalid sitemap output: file is unexpectedly large (${fileSizeBytes} bytes)`);
  }
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
    {
      name: "generate-sitemap",
      buildStart() {
        try {
          generateSitemap();
        } catch (e) {
          console.warn("⚠️ Sitemap generation failed:", e);
        }
      },
      closeBundle() {
        validateBuiltSitemap();
      },
    },
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
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
