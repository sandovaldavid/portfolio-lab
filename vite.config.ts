/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    target: ['es2020'],
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['@angular/core', '@angular/common', '@angular/router'],
          fonts: [
            '@fontsource/press-start-2p',
            '@fontsource/fira-code',
            '@fontsource/jetbrains-mono',
            '@fontsource/lora',
          ],
        },
      },
    },
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
        prismOptions: {
          additionalLangs: ['csharp'],
        },
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
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/stats.html',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default', 'verbose'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.spec.ts',
        '**/test-setup.ts',
        'src/main.ts',
        'src/main.server.ts',
      ],
      lines: 50,
      functions: 50,
      branches: 50,
      statements: 50,
    },
  },
}));
