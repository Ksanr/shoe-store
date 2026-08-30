import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/shoe-store/',
  server: {
    proxy: {
      '/api': {
        target: 'https://ra16-diploma-1.onrender.com',
        changeOrigin: true,
      },
    },
  },
});