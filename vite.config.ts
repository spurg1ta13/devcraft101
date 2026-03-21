import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { execSync } from "child_process";

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
          execSync("npx tsx scripts/generate-sitemap.ts", { stdio: "inherit" });
        } catch (e) {
          console.warn("⚠️ Sitemap generation failed:", e);
        }
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
