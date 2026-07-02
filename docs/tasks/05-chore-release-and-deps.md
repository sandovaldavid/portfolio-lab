# Task 05 — Un solo sistema de release + higiene de dependencias (P1 · Tooling)

> **Branch:** `chore/single-release-system` · **Esfuerzo:** S (~1-2 h) · **Ref:** [review § ci-cd CI3](../review-2026-07/03-ci-cd.md), [§ seo-rendimiento R3](../review-2026-07/05-seo-rendimiento.md)

## Problema 1: release-it y release-please conviven

- **release-please** (activo): `release-please.yml` + configs beta/stable + manifests — genera los PRs de release automáticos. Es el sistema real.
- **release-it** (vestigial): `.release-it.json` + scripts `release`/`release:dry` (`package.json:28-29`). Ambos escriben `CHANGELOG.md` y crean tags `v*` — correr `pnpm release` manual colisionaría con release-please.

## Problema 2: clasificación de dependencias (viola regla de CLAUDE.md)

- `katex` está en **devDependencies** (`package.json:89`) pero se importa en `vite.config.ts:9` para renderizar math del contenido (necesario en build/SSR).
- `tailwindcss`, `@tailwindcss/vite`, `postcss` (`package.json:51,57,61`) son build-time puro y están en **dependencies**.

## Problema 3: tres umbrales de `pnpm audit`

`package.json:24` → `high` · `quality-checks.yml:88` → `critical` · `SECURITY.md` → decía `moderate`.

## Checklist

- [x] Eliminar `.release-it.json`, los scripts `release`/`release:dry` y la devDependency `release-it` (+ plugins asociados si los hay). También se actualizó el skill `/release` (`.claude/commands/release.md`, corría `pnpm release`/`pnpm release:dry`) y `.vscode/settings.json` (referenciaba `.release-it.json` en file nesting).
- [x] Documentar en CLAUDE.md que el versionado es 100% release-please (beta en develop, stable en main).
- [x] Mover `katex` a `dependencies`.
- [x] Mover `tailwindcss`, `@tailwindcss/vite`, `postcss` a `devDependencies`.
- [x] Unificar audit level a `high` en `package.json` y `quality-checks.yml:88` (y verificar que SECURITY.md diga lo mismo).
- [x] `pnpm install` para regenerar lockfile; verificar `pnpm build` y `pnpm dev`. (Hallazgo no planeado: quitar `release-it` rompió `pnpm build` — `@analogjs/vite-plugin-nitro` usa `tinyglobby` sin declararlo como dependencia propia y dependía de que quedara hoisted por casualidad vía el árbol de `release-it`. Fix: `tinyglobby` como devDependency explícita, mismo patrón que `h3` en la task 01.)

## Criterios de aceptación

- [x] `pnpm build` en verde con las deps reclasificadas.
- [x] `grep -r release-it` → 0 resultados (fuera del CHANGELOG histórico y de esta misma carpeta `docs/`).
- [x] `pnpm audit --audit-level=high` es el único umbral en repo y CI.

## Hallazgo no relacionado (reportado aparte, no arreglado en este PR)

Al verificar "KaTeX renderiza en las notas prerenderizadas" se descubrió que **las páginas de detalle de notas (`/notes/:slug`) renderizan un estado 404** en vez del contenido real, tanto en el HTML prerenderizado estático como en el servidor SSR en vivo (reproducido también con `BUILD_PRESET=vercel`, igual que producción). Es preexistente en `develop` (verificado con un checkout limpio antes de los cambios de este PR) y no tiene relación con el alcance de esta tarea. Causa probable: `notes/[slug].page.ts` lee `toSignal(injectContent(...), { initialValue: null })` en `ngOnInit()` antes de que el contenido asíncrono resuelva, dejando `isNotFound` en `true` permanentemente. Pendiente de triage como tarea propia.

**PR:** [#138](https://github.com/sandovaldavid/portfolio/pull/138)
