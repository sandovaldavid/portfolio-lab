# Task 07 — SEO reactivo al idioma + helper compartido (P2 · Refactor)

> **Branch:** `refactor/seo-effect-helper` · **Esfuerzo:** M (~medio día) · **Ref:** [review § calidad C4, C5](../review-2026-07/02-calidad-codigo.md)

## Problema

Las 11 páginas repiten el mismo bloque: `ngOnInit` → leer `i18n.t()` **una vez** → `seo.updatePage(...)`. Consecuencias:

1. **Bug funcional:** los meta tags (title, description, OG) **no se actualizan al cambiar de idioma** — se quedan en el idioma con el que cargó la página.
2. Duplicación de ~15 líneas × 11 páginas, y `ngOnInit` donde la convención pide signals.

Mismo patrón en `hero.component.ts:35-40`: el typewriter toma las frases de `i18n.t()` una sola vez (pendiente A2 de la revisión de junio).

## Checklist

- [x] Crear helper en `shared/lib/seo/` (`page-seo.ts`), con `build` pudiendo devolver `null` para saltar la actualización mientras un contenido async no resuelve.
- [x] Migrar las 11 páginas (`index`, `about`, `experience`, `projects`, `projects/[slug]`, `skills`, `resume`, `research`, `notes/index`, `notes/[slug]`, `[...]`) a `setupPageSeo(...)`; eliminados todos los `ngOnInit`.
- [x] `hero.component.ts`: `phrases` ahora es un `computed()` sobre i18n; un `effect()` reinicia el typewriter al cambiar idioma. Cleanup migrado de `OnDestroy` a `DestroyRef`.
- [ ] Opcional: token compartido `IS_BROWSER` — no hecho, fuera de alcance de este PR.
- [ ] Opcional: `resume.component.ts` guard de `localStorage` — no hecho, fuera de alcance de este PR.
- [x] Specs: helper cubre "cambia el idioma → `updatePage` se re-ejecuta", más regresión del typewriter y de `projects/[slug]` (ver hallazgo abajo).

## Criterios de aceptación

- [x] Cambiar de idioma con el toggle del panel de utilidades actualiza `<title>` y meta description sin recargar (verificado en navegador real, no solo specs).
- [x] `grep -rn "ngOnInit" src/app/pages` → 0 resultados.
- [x] Todas las specs de páginas en verde (168/168 en la rama).

## Hallazgo no relacionado (arreglado en este mismo PR, no reportado aparte)

Al migrar `projects/[slug].page.ts` se encontró el mismo bug que Task 09 arregló en `notes/[slug]`: `injectContent()` resuelve async y el `ngOnInit` original leía la signal sincrónicamente, dejando las páginas de case study (`/projects/auctions`, etc.) mostrando permanentemente "Case_Study_Not_Found" en vez del contenido real. Arreglado con el mismo patrón (`computed()` + `setupPageSeo`); test de regresión confirma que falla contra el código viejo.

## Hallazgo no relacionado (reportado aparte, no arreglado en este PR)

Las páginas de case study prerenderizadas (`dist/analog/public/projects/*/index.html`) mantienen el `<title>` estático de la página padre `/projects`, aunque el contenido del body sí resuelve correctamente. Confirmado que es preexistente en `develop` (reproducido con el código viejo antes de este PR) — parece un artefacto del crawler de prerender de Analog, no relacionado con la reactividad a nivel de componente. Pendiente de triage como tarea propia.

**PR:** [#144](https://github.com/sandovaldavid/portfolio/pull/144)
