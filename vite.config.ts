/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';
import { resolve } from 'path';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { createHash } from 'crypto';
import { globSync } from 'tinyglobby';
import katex from 'katex';

// Reads content slugs directly from src/content/ so new notes/case studies
// are automatically prerendered (and land in the sitemap) without a manual step.
function contentSlugs(dir: string, prefix: string): string[] {
  return readdirSync(resolve(__dirname, `src/content/${dir}`))
    .filter((f) => f.endsWith('.md'))
    .map((f) => `${prefix}/${f.replace(/\.md$/, '')}`);
}

// Custom marked extension for KaTeX math rendering
function markedKatexExtension() {
  return {
    extensions: [
      {
        name: 'blockMath',
        level: 'block',
        start(src: string) {
          return src.match(/\$\$/)?.index;
        },
        tokenizer(src: string) {
          const match = src.match(/^\$\$([\s\S]+?)\$\$/);
          if (match) {
            return {
              type: 'blockMath',
              raw: match[0],
              text: match[1].trim(),
            };
          }
        },
        renderer(token: { text: string }) {
          return `<div class="katex-block">${katex.renderToString(token.text, {
            displayMode: true,
            throwOnError: false,
          })}</div>`;
        },
      },
      {
        name: 'inlineMath',
        level: 'inline',
        start(src: string) {
          return src.match(/\$/)?.index;
        },
        tokenizer(src: string) {
          const match = src.match(/^\$([\s\S]+?)\$/);
          if (match) {
            return {
              type: 'inlineMath',
              raw: match[0],
              text: match[1].trim(),
            };
          }
        },
        renderer(token: { text: string }) {
          return katex.renderToString(token.text, {
            displayMode: false,
            throwOnError: false,
          });
        },
      },
    ],
  };
}

const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;

// Must run via the rollup:before hook, before Nitro bakes a static-asset
// manifest with stale sizes into the server bundle if run any later.
function injectCspHashes(publicDir: string): void {
  const files = globSync(`${publicDir}/**/index.html`);
  for (const file of files) {
    const html = readFileSync(file, 'utf-8');
    const hashes = new Set<string>();
    for (const match of html.matchAll(INLINE_SCRIPT)) {
      const content = match[1];
      if (!content.trim()) continue;
      const hash = createHash('sha256').update(content, 'utf-8').digest('base64');
      hashes.add(`'sha256-${hash}'`);
    }
    if (hashes.size === 0) continue;
    const meta = `<meta http-equiv="Content-Security-Policy" content="script-src 'self' ${[...hashes].join(' ')}">`;
    writeFileSync(file, html.replace('<head>', `<head>\n  ${meta}`), 'utf-8');
  }
  console.warn(`[csp] injected script-src hashes into ${files.length} prerendered pages`);
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020'],
    chunkSizeWarningLimit: 500,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor',
              test: /node_modules[\\/]@angular[\\/](?:core|common|router)(?:[\\/]|$)/,
            },
            {
              name: 'fonts',
              test: /node_modules[\\/]@fontsource[\\/](?:fira-code|jetbrains-mono|lora)(?:[\\/]|$)/,
            },
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
      nitro: {
        hooks: {
          'rollup:before': (nitro: { options: { output: { publicDir: string } } }) => {
            injectCspHashes(nitro.options.output.publicDir);
          },
        },
      },
      content: {
        highlighter: 'prism',
        prismOptions: {
          additionalLangs: ['csharp'],
        },
        markedOptions: {
          extensions: [markedKatexExtension()],
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
          '/research',
          '/resume',
          ...contentSlugs('algorithms', '/notes'),
          ...contentSlugs('systems', '/notes'),
          ...contentSlugs('case-studies', '/projects'),
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
    include: ['src/**/*.spec.ts'],
    exclude: ['node_modules', 'dist', 'e2e'],
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
      lines: 75,
      functions: 75,
      branches: 60,
      statements: 75,
    },
  },
}));
