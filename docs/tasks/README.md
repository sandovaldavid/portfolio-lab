# docs/tasks — Desglose de tareas de la revisión 2026-07

Origen: hallazgos de [`docs/review-2026-07/`](../review-2026-07/00-resumen.md), verificados contra `1.8.2-beta.0`.

**Convención:** 1 archivo = 1 grupo de tareas = 1 branch desde `origin/develop` = 1 PR hacia `develop`. Al completar un grupo, marcar los checkboxes y cerrar el archivo con el número de PR.

## Orden sugerido

| # | Tarea | Branch | Prioridad | Esfuerzo | Depende de |
|---|---|---|---|---|---|
| 01 | [Fix fail-open de obsidian-sync](01-fix-obsidian-sync.md) | `fix/obsidian-sync-fail-open` | **P0** | XS | — |
| 02 | [Gate del deploy + fixes de workflows](02-ci-deploy-gating.md) | `ci/gate-deploy-and-fix-reports` | **P0** | M | — |
| 03 | [Prerender/E2E/Lighthouse de rutas nuevas](03-fix-prerender-routes.md) | `fix/prerender-new-routes` | **P0** | S | — |
| 04 | [ESLint enforcement de convenciones](04-chore-eslint-enforcement.md) | `chore/eslint-conventions` | P1 | S | 06 (borra analog-welcome, evita falsos errores) |
| 05 | [Un solo sistema de release + deps](05-chore-release-and-deps.md) | `chore/single-release-system` | P1 | S | — |
| 06 | [Dead code y diagnostics](06-refactor-dead-code.md) | `refactor/cleanup-dead-code` | P1 | S | — |
| 07 | [SEO reactivo + helper i18n](07-refactor-seo-i18n.md) | `refactor/seo-effect-helper` | P2 | M | — |
| 08 | [Tests de server routes + cobertura](08-test-server-routes.md) | `test/server-routes-coverage` | P2 | M | 01 (spec de obsidian-sync valida el fix) |
| 09 | Fix notes/:slug 404 (hallazgo no planeado, ver historial de PRs) | `fix/notes-detail-not-found` | P0 | S | — |
| 10 | [Compartir build entre workflows](10-ci-share-build-artifact.md) | `ci/share-build-artifact` | P2 | M | — |
| 11 | [CSP: nonces en vez de 'unsafe-inline'](11-security-csp-nonces.md) | `security/csp-nonces` | P2 | M | — |
| 12 | [Pin de Actions por SHA + decisión CodeQL](12-ci-pin-actions-and-codeql.md) | `ci/pin-actions-sha` | P2 | S | — |
| 13 | [Convención de páginas: extraer template inline](13-chore-page-template-convention.md) | `chore/page-template-convention` | P2 | XS | — |

## Reglas al ejecutar (recordatorio de CLAUDE.md)

- Branch siempre desde `develop` actualizado; PR solo hacia `develop`.
- Commits convencionales `<type>(<scope>): <subject>`.
- Todo código nuevo lleva spec; rutas nuevas van a `e2e/navigation.spec.ts`.
- Correr `pnpm lint && pnpm test -- --run` antes de commitear.
