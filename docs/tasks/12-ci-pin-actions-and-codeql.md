# Task 12 — Pin de GitHub Actions por SHA + decisión sobre CodeQL (P2 · CI/CD)

> **Branch:** `ci/pin-actions-sha` · **Esfuerzo:** S · **Ref:** [00-resumen § roadmap P2.15](../review-2026-07/00-resumen.md)

## Problema

Todas las Actions de terceros se referencian por tag mutable (`@v7`, `@v6`, `@v9`...), lo que permite que un tag sea reescrito (supply-chain risk) sin que el repo lo note. Además, el workflow de CodeQL fue eliminado (commit `c8fc00f5`) y CLAUDE.md ya documenta el porqué, pero no hay ningún escaneo estático de seguridad en CI actualmente.

## Checklist

- [x] Pinnear cada Action de terceros a su SHA de commit exacto (con el tag como comentario al lado, para poder actualizar manualmente):
  - `actions/checkout@v7` → `9c091bb21b7c1c1d1991bb908d89e4e9dddfe3e0`
  - `actions/setup-node@v6` → `48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e`
  - `actions/cache@v4` → `0057852bfaa89a56745cba8c7296529d2fc39830`
  - `actions/upload-artifact@v7` → `043fb46d1a93c77aae656e7c1c64a875d1fc6a0a`
  - `actions/github-script@v9` → `373c709c69115d41ff229c7e5df9f8788daa9553`
  - `codecov/codecov-action@v7` → `a99c28d3f0da835de33ff2feb2e15691c7b9641f`
  - `pnpm/action-setup@v6` → `b0f76dfb45f55f8421693e4803ac7bb65143bd34`
  - `googleapis/release-please-action@v5` → `0dfd8538845b8e92600d271a895a5372865d4062`
- [x] Decidir CodeQL: dado que este repo es privado, de un solo desarrollador, y sin secretos de terceros expuestos en el análisis (bajo riesgo/beneficio vs. minutos de CI), **no restaurarlo** — documentar la decisión explícitamente en `SECURITY.md` en vez de dejarlo como una omisión silenciosa.

## Criterios de aceptación

- [x] `grep -rn "uses: .*@v[0-9]" .github/workflows/*.yml` → 0 resultados (todas pinneadas por SHA, con el tag legible como comentario).
- [x] CI sigue en verde tras el cambio (mismo comportamiento, solo referencia distinta).
- [x] `SECURITY.md` explica la decisión sobre CodeQL con una razón, no solo la ausencia.

## Hallazgo posterior y corrección

Task 10 (`ci/share-build-artifact`, PR #150) se mergeó **después** de este PR y añadió 3 usos nuevos de `actions/cache`/`actions/cache/restore` en `ci.yml`, `e2e.yml` y `lighthouse.yml` sin pinnear (`@v4` mutable), rompiendo silenciosamente el criterio de aceptación de esta tarea. Detectado y corregido en un pase de verificación posterior (pinneados al mismo SHA `0057852bfaa89a56745cba8c7296529d2fc39830`).

**PR:** [#149](https://github.com/sandovaldavid/portfolio/pull/149)
