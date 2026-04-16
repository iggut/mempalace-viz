import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8767',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
