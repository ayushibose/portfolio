import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // ✅ ensures assets load correctly in production
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html', // ensures correct entry file
    },
  },
});
