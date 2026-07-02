# Task 03 — Rutas nuevas en prerender, E2E y Lighthouse (P0 · SEO/Testing)

> **Branch:** `fix/prerender-new-routes` · **Esfuerzo:** S (~2 h) · **Ref:** [review § seo-rendimiento R1-R2](../review-2026-07/05-seo-rendimiento.md) y [§ testing T1](../review-2026-07/04-testing.md)

## Problema

`/research`, `/resume` y los 4 case studies `/projects/[slug]` no están en:

1. `vite.config.ts:104-119` (prerender) → se sirven por SSR on-demand y **no aparecen en el sitemap** — los case studies son justo el contenido que quieres indexado.
2. `e2e/navigation.spec.ts:4-11` → **no pasan por axe-core (WCAG 2AA)** ni por los checks de navegación en CI.
3. `lighthouserc.json:7-11` → sin presupuesto de rendimiento.

Este desfase ya ocurrió dos veces (notas primero, case studies después): la lista hardcodeada es el problema de fondo.

## Checklist

- [ ] `vite.config.ts`: añadir `/research`, `/resume`, `/projects/auctions`, `/projects/fluentreads`, `/projects/mad-ai`, `/projects/unp-campus-map` al array `prerender.routes`.
- [ ] Mejor aún (previene la recurrencia): generar los slugs dinámicamente leyendo `src/content/`:
  ```ts
  import { readdirSync } from 'fs';
  const contentSlugs = (dir: string, prefix: string) =>
    readdirSync(resolve(__dirname, `src/content/${dir}`))
      .filter(f => f.endsWith('.md'))
      .map(f => `${prefix}/${f.replace('.md', '')}`);
  // ...routes: [...static, ...contentSlugs('algorithms', '/notes'), ...contentSlugs('systems', '/notes'), ...contentSlugs('case-studies', '/projects')]
  ```
- [ ] `e2e/navigation.spec.ts`: añadir a `routes`: `/research`, `/resume`, `/projects/auctions` (1 case study), `/notes/binary-search` (1 nota — valida KaTeX/prism renderizados).
- [ ] `lighthouserc.json`: añadir `/research`, `/resume` y un case study a las URLs auditadas.
- [ ] Considerar iterar el check de responsividad E2E sobre todas las rutas (hoy solo `/`).

## Criterios de aceptación

- `pnpm build` → `dist/analog/public/sitemap.xml` contiene las 6 rutas nuevas.
- `dist/analog/public/research/index.html` y `projects/auctions/index.html` existen (prerenderizados).
- `pnpm test:e2e` en verde con las rutas nuevas (atención a violaciones axe nuevas en research/resume — arreglarlas si salen).
- Añadir una nota en CLAUDE.md si se adopta la generación dinámica de slugs ("las rutas de contenido se prerenderizan automáticamente").
