// Simple Vite config for Netlify builds
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  build: {
    // Optimize build for Netlify
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    // Memory optimization
    minify: 'esbuild',
    sourcemap: false,
    // Avoid the Rollup native module issue
    rollupOptions: {
      external: ['@rollup/rollup-linux-x64-gnu'],
      // Optimize chunks
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          ui: ['lucide-vue-next']
        }
      }
    }
  }
});
