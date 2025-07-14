import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/amylumiere4/', // 這是你 GitHub Pages 或 Railway 的公開 base path
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
