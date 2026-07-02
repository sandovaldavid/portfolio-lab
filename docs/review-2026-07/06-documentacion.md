# Revisión 2026-07 — Documentación

> Veredicto: **ninguno de los 5 docs de `docs/` describía el sistema real** a fecha de esta revisión. Cuatro eran artefactos de diseño/planificación previos a la implementación y la revisión de junio quedó resuelta al 100%. Resolución (decisión del autor, limpieza 2026-07): los 6 archivos fueron **eliminados** — el historial de git es el archivo; los reemplazan `arquitectura_actual.md`, este directorio `review-2026-07/` y `tasks/`.

## Estado por documento (los 6 eliminados en la limpieza 2026-07)

| Doc | Tipo | Estado al eliminarse |
|---|---|---|
| `arquitectura.md` | Diseño (17-jun) | **Superseded** — proponía `app/core/`, `shared/components/`, clases `academic-mode`/`system-mode` y un `<app-obsidian-reader>` que nunca existieron; decía "Angular 19". Reemplazado por `arquitectura_actual.md` |
| `estrategia_portafolio.md` | Estrategia (17-jun) | Visión cumplida — todas sus ideas (STAR ledger, playground, TIL, LSTM) implementadas |
| `planning_doble_agente.md` | Plan de migración (17-jun) | **Completado al 100%** — las 6 fases ejecutadas; "27 tests" → hoy 50 specs |
| `portfolio_specs.md` | Specs de diseño (17-jun) | Parcialmente obsoleto — "Angular 19", notas en `/public/notes/` (real: `@analogjs/content` + `src/content/`), emulador 3G nunca implementado |
| `revision_portafolio_2026.md` | Review (27-jun) | Roadmap P0/P1/P2 **100% completo** (ver detalle abajo) |
| `llms-full.txt` | Docs vendorizadas de Analog | Material de terceros regenerable; su propósito (guiar la implementación de OG images) ya se cumplió |

## Roadmap de junio: verificación ítem por ítem

**P0 — 6/6 hechos:** 404 (#82) · hero con métricas (#83) · skip link + aria (#84, verificado en `app.ts:18`) · Press Start 2P + webp (#85) · CSP/manifest/theme-color (#86) · KaTeX (#87).

**P1 — 100% hecho:** @defer (#89) · preload fuentes (#98) · tokens (#91) · tokenizar resume (#96) · specs servicios/páginas (#94, #97) · carrusel focus (#95) · print A4 (#92) · pnpm audit CI (#109) · CRT curtain implementada (#111) · `width/height` en foto de perfil (`about-section.component.html:24-25`) ✅ · `fluentreads.webp` 912 KB → 80 KB ✅ (ambos verificados en esta revisión).

**P2 — hecho:** /research (#104) · STAR ledger protagonista (#102) · case studies (#113) · métricas en cards (#106) · reencuadre Programador-TI (#108) · OSS+LinkedIn en hero (#105) · contributions graph (#107) · OG por página (#122) · 12 notas (#124).

## Documentación raíz con afirmaciones falsas (corregir)

| Archivo | Problema |
|---|---|
| `CLAUDE.md` | Decía Angular 21 / TS ~5.9 (real: **Angular 22.0.2 / TS ~6.0.3**); listaba CodeQL y `publish-reports.yml` (eliminados); decía que E2E/Lighthouse solo corren hacia main → **corregido en esta revisión** |
| `README.md` | Badge de CodeQL roto (workflow eliminado en `c8fc00f5`) |
| `SECURITY.md` | Afirma `audit-level=moderate` (real: high/critical), "ESLint with security plugins" (no instalados), "manual approval + auto-rollback" en deploys (no implementado) |
| `LIGHTHOUSE_CI.md` | Ejemplo de config obsoleto (`localhost:5173`, 3 runs, preset `lighthouse:recommended`) vs real (`:3000`, 2 runs, preset `desktop`, 3 URLs) |
| `E2E_TESTING.md` | Revisar tras actualizar las rutas del suite (T1) |

## Gaps de documentación detectados (cubiertos por `arquitectura_actual.md`)

Features sin documentación previa: FSD real + `fsd.spec.ts` · case studies + `projects/[slug]` · `/research` · resume builder + pipeline print/PDF · github-contributions (widget + API) · OG images con satori · pipeline de contenido (`src/content/` + frontmatter + webhook obsidian-sync) · `diagnostics.ts` · sistema i18n EN/ES · distinción **mode** (architect/research) vs **theme** vs **font-scale** · página 404 · keyboard shortcuts/easter eggs as-built.

## Recomendación de mantenimiento

1. Tratar `arquitectura_actual.md` como **doc vivo**: actualizarlo en el mismo PR que cambie rutas, widgets o server routes (regla para CLAUDE.md).
2. Los docs obsoletos se eliminan (decisión de la limpieza 2026-07) — el historial de git es el archivo; `docs/README.md` registra qué se eliminó y por qué.
3. Los hallazgos accionables viven en `docs/tasks/` (1 archivo = 1 branch = 1 PR); al completarse, se marca el checklist con el número de PR.
4. Próxima revisión integral: repetir este formato (`docs/review-YYYY-MM/`) cuando el delta de versiones lo amerite, no por calendario.
