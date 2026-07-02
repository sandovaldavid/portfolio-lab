# Task 08 — Tests de server routes + subir cobertura (P2 · Testing)

> **Branch:** `test/server-routes-coverage` · **Esfuerzo:** M (~medio día) · **Ref:** [review § testing T2, T5, T6](../review-2026-07/04-testing.md)
> **Depende de:** Task 01 (el spec de obsidian-sync valida el fix del fail-open).

## Problema

Los 5 handlers de `src/server/routes/` tienen **cero cobertura** — incluido `og-image.ts` (200 líneas, el más complejo) y `github-contributions.ts` (llamada a servicio externo sin tests de error). El threshold de cobertura (50%) probablemente ya no protege nada tras los specs añadidos en #94/#97.

## Checklist

### Specs de server routes (h3 handlers — testear con `unenv`/mocks de `defineEventHandler` o extrayendo la lógica pura)
- [ ] `api/v1/og-image.ts`: genera SVG/PNG con params válidos; maneja params faltantes; escapa contenido del título.
- [ ] `api/v1/github-contributions.ts`: happy path (mock del fetch); upstream caído → respuesta de error controlada (no 500 crudo); shape del payload.
- [ ] `obsidian-sync.ts`: ver Task 01 (si ya se hizo allí, solo verificar).
- [ ] `diagnostics.ts`: shape del reporte; el delay artificial solo aplica con el query param.
- [ ] `api/v1/hello.ts`: smoke test (o eliminar la ruta si es scaffolding sin uso — decidir).

> Tip: si el handler mezcla I/O y lógica, extraer la lógica a funciones puras exportadas y testear esas — mismo patrón que el resto del codebase.

### Cobertura y axe
- [ ] Medir cobertura real: `pnpm test:coverage` — anotar el número.
- [ ] Subir thresholds en `vite.config.ts:152-155` de 50 → 70 (o al número real menos margen).
- [ ] `e2e/navigation.spec.ts:50-53`: re-habilitar la regla `color-contrast` de axe — la justificación del comentario ("NES/pixel dark theme uses low-contrast as a design aesthetic") describe un diseño **que ya no existe** y el contraste se corrigió en #97. Si pasa, eliminar el disable; mantener solo `nested-interactive` (skill-graph SVG) con comentario actualizado.

## Criterios de aceptación

- 5 specs de server routes en verde (o 4 + `hello.ts` eliminado).
- `pnpm test:coverage` pasa con threshold ≥ 70.
- E2E en verde con `color-contrast` activo (o un issue documentando qué elemento falla y por qué se mantiene el disable).
