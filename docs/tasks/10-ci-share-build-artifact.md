# Task 10 — Compartir el build entre workflows como artifact (P2 · CI/CD)

> **Branch:** `ci/share-build-artifact` · **Esfuerzo:** M · **Ref:** [00-resumen § roadmap P2.12](../review-2026-07/00-resumen.md)

## Problema

`pnpm build` corre de forma independiente y completa en 3 workflows disparados por el mismo evento `pull_request` (`ci.yml`'s `build` job, `e2e.yml`, `lighthouse.yml`), además de una 4ª vez en `deploy.yml` tras el merge. Cada build tarda ~1-1.5 min — tiempo y minutos de CI duplicados sin necesidad, ya que las 3 corridas por PR compilan exactamente el mismo commit.

## Checklist

- [x] **Corrección al alcance original:** `deploy.yml` compila con `BUILD_PRESET: vercel`, un preset de Nitro distinto (`.vercel/output`, no el `dist/` genérico) — no es el mismo build que `ci.yml`/`e2e.yml`/`lighthouse.yml`, así que no puede reusar su artifact. Queda fuera de esta tarea.
- [x] `ci.yml`, `e2e.yml` y `lighthouse.yml` sí comparten exactamente el mismo `pnpm build` (sin preset), y los 3 corren disparados por el mismo evento `pull_request` en paralelo — sin garantía de orden entre ellos. En vez de `upload-artifact`/`download-artifact` con `run-id` (que requeriría resolver el run de `ci.yml` vía API y esperar con polling a que termine, serializando el feedback del PR), se usó `actions/cache`: `ci.yml`'s job `build` guarda `dist/` bajo la key `dist-${{ github.sha }}` después de compilar; `e2e.yml`/`lighthouse.yml` intentan un `actions/cache/restore` con la misma key **antes** de su propio `pnpm build`, y solo compilan si no hubo cache-hit.
- [x] Esto es oportunista y sin riesgo nuevo: si el caché de `ci.yml` no está listo a tiempo (miss), el comportamiento es idéntico al actual (cada job compila el suyo) — nunca bloquea ni falla por un caché ausente.
- [x] No aplica `retention-days` corto — `actions/cache` no usa ese parámetro; su propia política de expiración (7 días sin uso / cap de 10GB por repo) ya lo maneja.

## Criterios de aceptación

- `ci.yml` guarda el build bajo `dist-${{ github.sha }}` tras compilar.
- `e2e.yml`/`lighthouse.yml` restauran esa misma key antes de decidir si compilan — verificado en un PR real que al menos uno de los dos obtiene cache-hit cuando `ci.yml` termina primero.
- Ningún job falla ni se cuelga si el caché no está disponible — cae de vuelta a compilar localmente, igual que antes de este cambio.
- `deploy.yml` no se toca (compila con un preset distinto, fuera de alcance).
