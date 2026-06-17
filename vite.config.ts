/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
  },
  resolve: {
    mainFields: ['module'],
    alias: {
      '@shared': resolve(__dirname, 'src/app/shared'),
      '@entities': resolve(__dirname, 'src/app/entities'),
      '@features': resolve(__dirname, 'src/app/features'),
      '@widgets': resolve(__dirname, 'src/app/widgets'),
    },
  },
  plugins: [
    analog({
      content: {
        highlighter: 'prism',
      },
      prerender: {
        routes: [
          '/',
          '/about',
          '/projects',
          '/experience',
          '/skills',
          '/notes',
          '/notes/binary-search',
          '/notes/circuit-breaker',
        ],
        sitemap: {
          host: 'https://devsandoval.me',
        },
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default'],
  },
}));
