# Arquitectura Actual — devsandoval.me

> **Doc vivo** — describe el sistema **tal como está implementado** (verificado contra `1.8.2-beta.0`, 2026-07-01).
> Reemplaza a la propuesta de diseño `arquitectura.md` de junio 2026 (eliminada en la limpieza de docs 2026-07; disponible en el historial de git — nunca se construyó tal cual).
> Mantenimiento: actualizar este archivo en el mismo PR que añada/quite páginas, widgets o server routes.

## Stack

Angular **22** + Analog **2.6** (SSR/SSG, file-based routing) · Vite **7.3** · Tailwind CSS **4** (CSS-first, sin config JS) · TypeScript **~6.0** · Vitest **4** + Playwright · pnpm · Vercel.

## Feature-Sliced Design (real)

```
src/app/
├── shared/     config/ (contact, i18n EN+ES) · lib/ (animation, font-scale, i18n,
│               keyboard-shortcuts, mode, seo, theme) · ui/ (badge, pixel-button,
│               pixel-card, section-title, tech-pill, theme-switcher)
├── entities/   education · experience (incluye star.data.ts) · project · technology
├── features/   language-picker · mode-switcher · utility-panel
├── widgets/    about-section · chaos-playground · experience-timeline · footer ·
│               github-contributions · hero · lstm-playground · mext-thesis-pitch ·
│               navbar · projects-grid · resume · skills-section · star-ledger
└── pages/      (rutas Analog, ver tabla)
```

Regla de dependencias `pages → widgets → features → entities → shared`, **validada como test** en `src/app/fsd.spec.ts`. Aliases: `@shared`, `@entities`, `@features`, `@widgets`.

## Rutas (11 páginas)

| Ruta | Archivo | Prerender | Notas |
|---|---|---|---|
| `/` | `index.page.ts` | ✅ | Home multiplexado por modo (architect/research); STAR ledger, contributions, playgrounds con `@defer` |
| `/about` | `about.page.ts` | ✅ | |
| `/experience` | `experience.page.ts` | ✅ | Timeline con tabs ARIA |
| `/projects` | `projects.page.ts` | ✅ | Cards con métricas y scores Lighthouse |
| `/projects/:slug` | `projects/[slug].page.ts` | ❌ (gap R1) | 4 case studies desde `content/case-studies/` |
| `/skills` | `skills.page.ts` | ✅ | |
| `/resume` | `resume.page.ts` | ❌ (gap R1) | Resume builder: 3 estilos (Modern/Harvard/ATS), toggles con signals, localStorage, `@media print` A4 |
| `/research` | `research.page.ts` | ❌ (gap R1) | LSTM playground + MEXT thesis pitch (track académico) |
| `/notes` | `notes/index.page.ts` | ✅ | Búsqueda + filtro por categoría |
| `/notes/:slug` | `notes/[slug].page.ts` | ✅ (8 slugs) | KaTeX + prism (csharp extra); estado 404 propio |
| `*` (404) | `[...].page.ts` | — | Catch-all con SEO propio |

## Contenido (`src/content/`, vía `@analogjs/content`)

- `algorithms/` (4) y `systems/` (4) — notas TIL, frontmatter con título/descr/tags/categoría.
- `case-studies/` (4) — auctions, fluentreads, mad-ai, unp-campus-map.
- Render markdown con extensión KaTeX custom (`vite.config.ts:12-63`) y prism.
- Ingesta remota: webhook `POST /obsidian-sync` (auth por `OBSIDIAN_SYNC_SECRET`, solo `algorithms/`/`systems/`, guard de path traversal).

## Server routes (Nitro, `src/server/routes/`)

| Ruta | Propósito |
|---|---|
| `api/v1/og-image.ts` | OG images por página con satori (~200 líneas) |
| `api/v1/github-contributions.ts` | Proxy del gráfico de contribuciones para el widget del home |
| `api/v1/hello.ts` | Ejemplo/healthcheck |
| `obsidian-sync.ts` | Webhook de sincronización de notas (ver arriba) |
| `diagnostics.ts` | Info de runtime + delay artificial opcional (dev tooling) |

## Estado global (shared/lib) — tres ejes independientes

1. **Mode** (`mode/mode-state.service.ts`): `mode-architect` (dark, default) vs `mode-research` (light) en `<html>`; conmuta paleta, fuente (JetBrains Mono ↔ Lora), y qué widgets muestra el home. Con transición "CRT curtain" + terminal switcher.
2. **Theme** (`theme/theme.service.ts` + `shared/ui/theme-switcher`): claro/oscuro dentro del modo.
3. **Font scale** (`font-scale/`): 13→19px con teclas `+/-/0`, persistido.

Todos: signals + `isPlatformBrowser` guards + persistencia en storage.

## i18n

Bilingüe ES/EN: diccionarios en `shared/config/i18n/{es,en}.ts` (~280 líneas c/u), servicio `i18n.service.ts` con signal de idioma, `translate.pipe.ts`, selector `features/language-picker`, hreflang en SEO. Regla: todo texto de usuario entra en ambos diccionarios.

## SEO

`shared/lib/seo/seo.service.ts` (`updatePage` — el hotspot con más fan-in del grafo): title, OG/Twitter cards (+`twitter:image`), JSON-LD Person/Organization, canonical, hreflang. OG image por página vía `api/v1/og-image`. Sitemap generado en build (`vite.config.ts` → `dist/analog/public/sitemap.xml`).

## Easter eggs / interactividad (diferenciador)

- **Keyboard shortcuts** (`shared/lib/keyboard-shortcuts/`): navegación Vim (j/k, gg/G, h/l, Ctrl+d/u), teclas 1-5 → rutas, `?` modal de atajos, `/` búsqueda, escala de fuente. Registrado en `app.ts`, SSR-safe, cleanup vía `DestroyRef`.
- **`window.runDiagnostics()`**: reporte de salud en consola con boot message estilizado.
- **Chaos playground** (modo architect): grafo SVG de microservicios con inyección de fallos (circuit breaker, retry, DLQ).
- **LSTM playground** (modo research/`/research`): celda LSTM interactiva con matemática real y diagnóstico de gradiente.
- **STAR ledger** (home architect): 6 logros cuantificados con snippets.

## Build & deploy

- Vite: `chunkSizeWarningLimit: 500`, manualChunks `vendor`/`fonts`, visualizer → `dist/stats.html`, target es2020.
- Prerender + sitemap en `vite.config.ts:103-123`.
- CI: 6 workflows (ci, quality-checks reusable, e2e con axe-core, lighthouse, deploy Vercel, release-please beta/stable). Reportes como artifacts de Actions.
- Flujo git: `feat/* → develop (preview) → main (producción)`, releases automatizados con release-please.

## Convenciones (resumen — la fuente es CLAUDE.md)

Componentes standalone OnPush con 4 archivos (`entities/features/widgets/shared` lo cumplen al 100%; las páginas usan template inline — decisión pendiente, ver `review-2026-07/02-calidad-codigo.md` C1), `input()/output()`, `inject()`, signals-first, cero `any`.

## Deudas conocidas

Ver [`review-2026-07/00-resumen.md`](review-2026-07/00-resumen.md) — en particular: fail-open de obsidian-sync, deploy sin gate de CI, rutas nuevas fuera de prerender/E2E/Lighthouse, convenciones sin enforcement en ESLint.
