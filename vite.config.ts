import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Optimize build for Netlify
    target: "es2015",
    outDir: "dist",
    assetsDir: "assets",
    // Memory optimization
    minify: "esbuild",
    sourcemap: false,
    // Avoid the Rollup native module issue
    rollupOptions: {
      external: ["@rollup/rollup-linux-x64-gnu"],
      // Optimize chunks
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "pinia"],
          ui: ["lucide-vue-next"],
        },
      },
    },
  },
});
