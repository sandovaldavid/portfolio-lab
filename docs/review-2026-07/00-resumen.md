# Revisión del Portafolio — Julio 2026 (Resumen Ejecutivo)

> **Fecha:** 2026-07-01 · **Versión analizada:** `1.8.2-beta.0` (rama `develop`)
> **Método:** indexado con codebase-memory MCP (1028 nodos / 1565 aristas) + 3 auditorías paralelas (calidad de código, CI/infra, docs) + verificación directa de todos los hallazgos de severidad alta.
> **Revisión anterior:** `docs/revision_portafolio_2026.md` (2026-06-27, v1.2.0-beta.0) — roadmap 100% completado; el archivo fue eliminado en la limpieza de docs 2026-07 (disponible en el historial de git).

## Veredicto

**El roadmap completo de la revisión de junio (P0 + P1 + P2) está implementado.** En ~6 releases (1.2.0 → 1.8.2) se cerraron: página 404, skip link, hero con métricas, `@defer`, CSP/HSTS/manifest, KaTeX, specs de servicios y páginas, ruta `/research`, STAR ledger protagonista, case studies con páginas de detalle, gráfico de contribuciones de GitHub, OG images por página con satori, y 12 notas de contenido. Eso es una velocidad de ejecución excepcional.

La revisión fresca encuentra que **la calidad del código de aplicación sigue siendo de élite** (FSD sin violaciones, cero `any`, cero decoradores legacy, signals en todo). Los problemas nuevos están en la **capa de infraestructura**, que no siguió el ritmo de las features:

## Top 5 hallazgos (2026-07)

| # | Hallazgo | Sev. | Doc | 
|---|---|---|---|
| 1 | `obsidian-sync.ts` **falla abierto**: si `OBSIDIAN_SYNC_SECRET` no está configurado, cualquiera puede escribir archivos vía POST (`obsidian-sync.ts:20`) | **Alta** | [01-seguridad](01-seguridad.md) |
| 2 | **El deploy a producción no depende del CI**: `deploy.yml` corre en push a `main` en paralelo a los tests — un push con tests rotos se despliega igual | **Alta** | [01-seguridad](01-seguridad.md) / [03-ci-cd](03-ci-cd.md) |
| 3 | **Rutas nuevas invisibles para SSG/E2E/Lighthouse**: `/research`, `/resume` y los 4 case studies `/projects/[slug]` no están en el prerender (→ fuera del sitemap), ni en `e2e/navigation.spec.ts`, ni en `lighthouserc.json` | **Alta** | [05-seo-rendimiento](05-seo-rendimiento.md) / [04-testing](04-testing.md) |
| 4 | **Las convenciones del proyecto no están enforzadas por ESLint**: sin regla FSD boundaries, sin `no-console`, sin `no-explicit-any` (`eslint.config.js` solo valida selectores) | Media | [02-calidad-codigo](02-calidad-codigo.md) |
| 5 | **Dos sistemas de release compitiendo**: release-please (automatizado) y release-it (manual) — ambos escriben CHANGELOG y crean tags `v*` | Media | [03-ci-cd](03-ci-cd.md) |

## Scorecard actualizado

| Dimensión | Jun-2026 | Jul-2026 | Comentario |
|---|---|---|---|
| Arquitectura (FSD + Angular) | 9.5 | 9.5 | Sigue impecable; `fsd.spec.ts` valida la regla como test |
| Features interactivas | 9.0 | 9.5 | /research, case studies y contributions graph suman |
| Calidad de código / tests | 7.5 | 8.5 | Specs de servicios/páginas añadidos; quedan server routes sin test |
| Rendimiento & bundle | 6.5 | 8.5 | `@defer`, preload de fuentes, imágenes optimizadas — todo cerrado |
| Seguridad & headers | 7.0 | 6.5 | Headers ✅ pero **fail-open en obsidian-sync** y deploy sin gate bajan la nota |
| SEO | 8.5 | 8.0 | OG por página ✅ pero 6 rutas fuera de sitemap/prerender |
| CI/CD | 8.0 | 7.5 | Sólido pero: deploy ungated, 4× builds duplicados, CodeQL eliminado |
| Manejo de errores (404) | 2.0 | 9.0 | 404 + estado de error en notas — resuelto |
| Accesibilidad | 7.0 | 8.5 | Skip link, aria-labels, pausa de carrusel — resuelto |
| Documentación (docs/) | — | 4.0 | Los 5 docs son artefactos históricos; ninguno describe el sistema real (esta revisión lo corrige) |
| **Global** | **8.0** | **8.6** | La app subió; la infraestructura es ahora el eslabón débil |

## Roadmap priorizado

### P0 — Seguridad y visibilidad (medio día)
1. **Cerrar el fail-open** de `obsidian-sync.ts` — rechazar si el secret no está configurado. (XS)
2. **Gatear el deploy**: `deploy.yml` debe depender de quality-checks (via `workflow_run` o job `needs`). (S)
3. **Añadir `/research`, `/resume` y los 4 case-study slugs** a `vite.config.ts` (prerender+sitemap), `e2e/navigation.spec.ts` y `lighthouserc.json`. (S)
4. **Arreglar `.husky/pre-commit`**: `pnpm test` sin `--run` arranca watch mode. (XS)

### P1 — Enforcement y limpieza (1 día)
5. ESLint: `no-console`, `@typescript-eslint/no-explicit-any`, `no-restricted-imports` para FSD. (S)
6. Elegir **un** sistema de release (release-please) y eliminar release-it. (S)
7. Borrar `pages/analog-welcome.ts` (scaffolding muerto, viola 4 convenciones). (XS)
8. Corregir datos falsos de `runDiagnostics()` (`angularVersion: '19.0.0'` → real). (XS)
9. Unificar `pnpm audit` level (hoy: high en package.json, critical en CI, moderate en SECURITY.md). (XS)
10. `katex` → `dependencies`; `tailwindcss`/`postcss`/`@tailwindcss/vite` → `devDependencies`. (XS)

### P2 — Refactors y endurecimiento (continuo)
11. Helper compartido de SEO con `effect()` — hoy el bloque `ngOnInit` + `seo.updatePage` está copiado en 11 páginas y **no reacciona al cambio de idioma**.
12. Compartir el build entre workflows como artifact (hoy 4× `pnpm build` por PR).
13. CSP: reemplazar `'unsafe-inline'` en `script-src` por hash sha256 del script anti-FOUC.
14. Specs para los 5 server routes (`og-image`, `github-contributions`, `obsidian-sync`, `diagnostics`, `hello`).
15. Pin de actions por SHA; restaurar CodeQL o documentar por qué se eliminó.
16. Decidir la convención de páginas: 7 páginas usan template inline (viola la regla de 4 archivos de CLAUDE.md) — o se extraen o se exime a `pages/` explícitamente.

## Índice de esta revisión

| Doc | Característica |
|---|---|
| [01-seguridad.md](01-seguridad.md) | Endpoints, headers, deploy gating, supply chain |
| [02-calidad-codigo.md](02-calidad-codigo.md) | Convenciones Angular/FSD, smells, SSR safety |
| [03-ci-cd.md](03-ci-cd.md) | Workflows, releases, duplicación |
| [04-testing.md](04-testing.md) | Specs faltantes, E2E, coverage, hooks |
| [05-seo-rendimiento.md](05-seo-rendimiento.md) | Prerender, sitemap, Lighthouse |
| [06-documentacion.md](06-documentacion.md) | Estado de docs/, CLAUDE.md, README, SECURITY.md |
| [07-features-feedback.md](07-features-feedback.md) | Feedback e ideas de mejora por feature implementada |

> Desglose accionable de los hallazgos: [`docs/tasks/`](../tasks/README.md) (1 archivo = 1 branch = 1 PR).
