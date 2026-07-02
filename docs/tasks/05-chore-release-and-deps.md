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

- [ ] Eliminar `.release-it.json`, los scripts `release`/`release:dry` y la devDependency `release-it` (+ plugins asociados si los hay).
- [ ] Documentar en CLAUDE.md que el versionado es 100% release-please (beta en develop, stable en main).
- [ ] Mover `katex` a `dependencies`.
- [ ] Mover `tailwindcss`, `@tailwindcss/vite`, `postcss` a `devDependencies`.
- [ ] Unificar audit level a `high` en `package.json` y `quality-checks.yml:88` (y verificar que SECURITY.md diga lo mismo).
- [ ] `pnpm install` para regenerar lockfile; verificar `pnpm build` y `pnpm dev`.

## Criterios de aceptación

- `pnpm build` en verde con las deps reclasificadas (KaTeX renderiza en las notas prerenderizadas).
- `grep -r release-it` → 0 resultados (fuera del CHANGELOG histórico).
- `pnpm audit --audit-level=high` es el único umbral en repo y CI.
