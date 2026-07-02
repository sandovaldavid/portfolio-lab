# Revisión 2026-07 — SEO y rendimiento

## Hallazgos

### R1 — 6 rutas fuera del prerender → fuera del sitemap (Alta)

`vite.config.ts:103-119` prerenderiza `/`, `/about`, `/projects`, `/experience`, `/skills`, `/notes` + las 8 notas. **Faltan:**

- `/research` — la página que concentra LSTM + MEXT (audiencia académica que llega por búsqueda)
- `/resume`
- `/projects/auctions`, `/projects/fluentreads`, `/projects/mad-ai`, `/projects/unp-campus-map` — los 4 case studies (#113), contenido SEO de alto valor

Consecuencias: esas rutas se sirven por SSR on-demand (más lento el primer byte) y **no aparecen en el sitemap generado** (`sitemap.host: devsandoval.me`), así que los buscadores no las descubren por esa vía. Los case studies son exactamente el contenido que quieres indexado.

**Fix (P0):** añadirlas al array `prerender.routes`. Idea robusta: generar los slugs de case studies leyendo `src/content/case-studies/` (los de notas también), para que no vuelva a pasar — el mismo desfase ya ocurrió una vez con las notas.

### R2 — Lighthouse CI audita solo 3 URLs (Media)

`lighthouserc.json:7-11`: `/`, `/about`, `/projects`. Añadir al menos `/research`, `/resume`, un case study y una nota. Los thresholds (perf 0.80, a11y 0.90, BP 0.85, SEO 0.90) coinciden con lo documentado ✅.

### R3 — `katex` en devDependencies pero se usa en build/SSR (Baja)

`package.json:89` clasifica `katex` como devDependency, pero `vite.config.ts:9` lo importa para renderizar math en el contenido. Funciona porque Nitro lo bundlea, pero es frágil ante un install con `--prod`. Mover a `dependencies`. Simétricamente, `tailwindcss`, `@tailwindcss/vite` y `postcss` (`package.json:51,57,61`) son build-time puro y deberían estar en `devDependencies` (regla explícita de CLAUDE.md).

### R4 — Verificaciones pendientes de junio: ✅ ambas cerradas

Verificado directamente en esta revisión:

- Foto de perfil con `width="176" height="176"` (`about-section.component.html:24-25`) ✅
- `project-09-fluentreads.webp`: 912 KB → **80 KB** ✅ (todas las imágenes de proyectos ≤ 184 KB)

## Lo que está bien ✅ (junio → julio)

- `@defer (on viewport)` en widgets pesados del home, research y resume (#89, #104, 1.8.1) — cerrado R1 de junio.
- Preload de fuentes LCP (#98) — cerrado R4 de junio.
- Imágenes optimizadas + dead assets eliminados (#90, #85) — cerrados R2/B1/P4.
- OG image **por página** generada con satori (`api/v1/og-image.ts`, #122) + `twitter:image` (#126) — cerró S1/S3 de junio e implementó la "idea" de OG dinámica.
- Manifest, theme-color, color-scheme (#86).
- KaTeX para LaTeX en notas (#87) con `throwOnError: false` ✅.
- Escalas de tokens (sombras/radius/duraciones) en `@theme` (#91) — cerrado D1-D4.
- `chunkSizeWarningLimit: 500` + manualChunks vendor/fonts + visualizer.
