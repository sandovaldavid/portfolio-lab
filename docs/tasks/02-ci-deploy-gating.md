# Task 02 — Gate del deploy + fixes de workflows (P0/P1 · CI/CD)

> **Branch:** `ci/gate-deploy-and-fix-reports` · **Esfuerzo:** M (~medio día) · **Ref:** [review § ci-cd](../review-2026-07/03-ci-cd.md) y [§ seguridad S2](../review-2026-07/01-seguridad.md)

## Problema principal (P0)

`deploy.yml:3-7` se dispara en `push` a `main`/`develop` **en paralelo** al CI, sin `needs:` ni `workflow_run`. Un push a `main` con lint/tests rotos se despliega a producción igual. Contradice CLAUDE.md ("all checks pass") y SECURITY.md.

## Checklist

### Gate del deploy (P0)
- [x] Cambiar el trigger de `deploy.yml` a `workflow_run` sobre el workflow `CI`:
  ```yaml
  on:
    workflow_run:
      workflows: [CI]
      types: [completed]
      branches: [main, develop]
  jobs:
    deploy:
      if: github.event.workflow_run.conclusion == 'success'
  ```
  (Ojo: con `workflow_run`, `github.ref` cambia — usar `github.event.workflow_run.head_branch` para decidir `--prod` y el environment.)
- [ ] Alternativa/complemento: GitHub Environment `production` con required reviewers o branch protection con required status checks en `main` — diferido, requiere configuración manual en GitHub (Settings → Environments/Rulesets), fuera de lo que un PR de código puede aplicar.

### Bugs de reporte en comentarios de PR (P1)
- [x] `e2e.yml:87` — ternario invertido: con 0 fallos el comentario dice "Passed: 0".
  Cambiar `const passed = stats.unexpected ? stats.expected - stats.unexpected : 0;` por `const passed = stats.expected || 0;` (en el JSON de Playwright, `expected` = pasados, `unexpected` = fallados).
- [x] `lighthouse.yml:55-58` — el comentario lee solo `files[0]` (1 de las 3 URLs auditadas, orden arbitrario). Iterar todos los JSON y mostrar una tabla por URL, o el promedio/mínimo por categoría.
- [x] Dedupe de comentarios: `quality-checks.yml:34-44`, `e2e.yml:77-97` y `lighthouse.yml:45-88` crean un comentario NUEVO en cada run. Aplicar el patrón marker + update que ya usa `deploy.yml:118-143` (`<!-- e2e-report -->`, `<!-- lighthouse-report -->`, etc.).

### Bundle check real (P1)
- [x] `ci.yml:41-47`: hoy mide `du -s dist` completo (incluye server, HTML prerenderizado y `stats.html`) contra 700 KB y **solo warnea**. Cambiar a medir el JS del cliente (p. ej. `du -sk dist/analog/public/*.js` o suma de chunks) contra el budget real de 500 KB (`chunkSizeWarningLimit`) y **fallar** el job si lo supera.

### Higiene (P1)
- [x] `e2e.yml:12`: `contents: write` → `contents: read` (mínimo privilegio; solo necesita checkout + artifact + comment).
- [x] `deploy.yml:65`: el grep `https://[a-z0-9-]+\.vercel\.app` no representa la URL de producción. Para `main`, setear `environment_url: https://devsandoval.me`.
- [ ] Opcional: compartir el build entre workflows (job `build` sube `dist/` como artifact; e2e/lighthouse lo descargan) — hoy hay 4× `pnpm build` por PR a main. Diferido: requeriría reestructurar cómo se disparan `e2e.yml`/`lighthouse.yml` (hoy triggers independientes en `pull_request`), mayor riesgo/alcance que el resto de este PR.
- [ ] Opcional: pin de actions por SHA (supply chain). Diferido a un PR propio de hardening.

## Criterios de aceptación

- [ ] Push a `main` con un test roto → el deploy **no** corre. No verificable localmente (requiere un push real post-merge); revisar en el primer push a `develop`/`main` tras mergear este PR.
- [x] PR de prueba: comentario de Playwright muestra el número real de tests pasados; comentario de Lighthouse refleja las 3 URLs; los comentarios se actualizan en vez de duplicarse (verificado por lectura del código — se probará en runtime en este mismo PR).
- [x] Bundle check falla si el JS cliente supera 500 KB (verificado localmente contra un `pnpm build` real: total 1076 KB, chunk más grande 320 KB, bajo el budget).

**PR:** [#135](https://github.com/sandovaldavid/portfolio/pull/135)
