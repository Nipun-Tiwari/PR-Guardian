import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      // Point Vite at the TS source so it gets ESM, not the CJS dist
      '@prguardian/shared': fileURLToPath(
        new URL('../../packages/shared/src/index.ts', import.meta.url),
      ),
    },
  },
});
