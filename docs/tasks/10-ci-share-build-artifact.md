# Task 10 — Compartir el build entre workflows como artifact (P2 · CI/CD)

> **Branch:** `ci/share-build-artifact` · **Esfuerzo:** M · **Ref:** [00-resumen § roadmap P2.12](../review-2026-07/00-resumen.md)

## Problema

`pnpm build` corre de forma independiente y completa en 3 workflows disparados por el mismo evento `pull_request` (`ci.yml`'s `build` job, `e2e.yml`, `lighthouse.yml`), además de una 4ª vez en `deploy.yml` tras el merge. Cada build tarda ~1-1.5 min — tiempo y minutos de CI duplicados sin necesidad, ya que las 3 corridas por PR compilan exactamente el mismo commit.

## Checklist

- [ ] En `ci.yml`'s job `build`: después de `pnpm build`, subir `dist/` completo como artifact (`actions/upload-artifact`), con un nombre determinístico que incluya el SHA del commit (p. ej. `build-${{ github.sha }}`) para que `e2e.yml`/`lighthouse.yml` puedan encontrarlo sin ambigüedad.
- [ ] En `e2e.yml` y `lighthouse.yml`: reemplazar su propio `pnpm build` por una descarga del artifact vía `actions/download-artifact` con `run-id`/`github-token` apuntando al run de `ci.yml` para el mismo `github.sha` (usar la API de Actions para resolver el run ID del workflow `CI` para ese SHA, similar a como `deploy.yml` ya usa `github.event.workflow_run.head_sha`).
- [ ] Evaluar el trade-off de latencia: si `e2e.yml`/`lighthouse.yml` dependen del artifact de `ci.yml`, ya no pueden arrancar en paralelo con él — considerar si conviene mantenerlos con trigger `pull_request` (esperando activamente a que el artifact exista, con reintentos/polling acotado) en vez de moverlos a `workflow_run` (que los serializaría completamente detrás de CI, aumentando el tiempo total de feedback del PR).
- [ ] `deploy.yml` ya corre después de CI vía `workflow_run` — puede reusar el mismo artifact en vez de repetir `pnpm build`.
- [ ] Actualizar `retention-days` del artifact de build a un valor corto (1-2 días; solo se necesita durante la vida del run, no como el resto de reportes que se guardan 14 días).

## Criterios de aceptación

- `pnpm build` corre **una sola vez** por commit en un PR normal (verificable contando invocaciones en los logs de Actions del mismo run group).
- `e2e.yml`, `lighthouse.yml` y `deploy.yml` usan el mismo `dist/` sin reconstruir.
- Tiempo total de CI del PR no empeora significativamente respecto al baseline actual (medir antes/después en un PR de prueba).
- Si algún job no encuentra el artifact (build falló o expiró), falla con un mensaje claro en vez de un error críptico de `download-artifact`.
