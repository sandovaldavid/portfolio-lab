# Revisión 2026-07 — CI/CD y releases

> Estado real: **6 workflows** en `.github/workflows/`: `ci.yml`, `quality-checks.yml`, `e2e.yml`, `lighthouse.yml`, `deploy.yml`, `release-please.yml`. (CodeQL y publish-reports/cleanup-reports fueron eliminados; los reportes ahora van como artifacts — #120.)

## Hallazgos

### CI1 — Deploy no gateado por CI (Alta — ver también [01-seguridad § S2](01-seguridad.md))

`deploy.yml` corre en push a `main`/`develop` en paralelo con los checks. Fix: `workflow_run` sobre CI o GitHub Environment con required checks.

### CI2 — 4× `pnpm build` por PR/push (Media)

`ci.yml:40`, `e2e.yml:53`, `lighthouse.yml:32` y `deploy.yml:40` construyen cada uno desde cero, más `pnpm install` repetido en los 3 jobs de `quality-checks.yml`. Ningún artifact compartido. Para un PR a `main` son ~4 builds completos. Fix: un job `build` que suba `dist/` como artifact y los demás lo descarguen.

### CI3 — Dos sistemas de release en conflicto (Media)

- **release-please** (activo, automatizado): `release-please.yml` + configs beta/stable + manifests. Es el que genera los PRs `chore(develop): release X.Y.Z-beta.0`.
- **release-it** (vestigial, manual): `.release-it.json` + scripts `release`/`release:dry` en `package.json:28-29`.

Ambos escriben `CHANGELOG.md` y crean tags `v${version}` — si alguien corre `pnpm release` colisionará con release-please. **Fix:** eliminar release-it (config + scripts + devDependency) o documentar que está prohibido usarlo.

### CI4 — Bundle check que nunca falla (Media)

`ci.yml:45`: el check de tamaño (`du -s dist` > 700 KB) solo emite warning. El presupuesto real del proyecto es 500 KB (`chunkSizeWarningLimit`). Fix: fallar el job al superar el umbral, y alinear el número con el budget.

### CI5 — URL de producción vacía en deployment status (Baja)

`deploy.yml:65` extrae la URL con `grep 'https://[a-z0-9-]+\.vercel\.app'`. En producción la URL final es `devsandoval.me`, así que el `environment_url` del deployment de GitHub queda con la URL interna de Vercel o vacío. Cosmético pero visible en la pestaña Environments.

### CI6 — Pre-commit hook en watch mode (Baja pero molesto)

`.husky/pre-commit` ejecuta:

```
pnpm lint
pnpm test        # ← vitest SIN --run → watch mode
```

`CLAUDE.md` y `.release-it.json` dicen `pnpm test -- --run`. En un hook no interactivo esto puede colgarse o comportarse distinto según el entorno. Fix: `pnpm test -- --run` (o `vitest run`).

### CI7 — Permisos y pinning (Baja)

- `e2e.yml:12` pide `contents: write` sin necesitarlo (ver S8).
- Actions pinneadas por tag mayor; SHA-pinning recomendado (ver S7).

## Discrepancias docs ↔ realidad

| Afirmación | Realidad |
|---|---|
| `CLAUDE.md`: "CodeQL security scan" en PR a main | `codeql.yml` no existe (eliminado en `c8fc00f5`) |
| `CLAUDE.md`: re-habilitar Pages en `publish-reports.yml` | ese workflow ya no existe (reportes → artifacts, #120) |
| `CLAUDE.md`: Lighthouse/E2E "additional on PR to main" | ambos corren también en PR a develop (`lighthouse.yml:5-7`, `e2e.yml:5-7`) |
| `README.md`: badge de CodeQL | roto |
| Revisión jun-2026 §2: "9 workflows" | hoy son 6 |

## Lo que está bien ✅

- `quality-checks.yml` reusable con lint/format/typecheck/tests/audit — buen diseño.
- `pnpm audit` activado en CI (#109) — pendiente de junio cerrado.
- Concurrencia y permisos declarados por workflow; sin `pull_request_target`.
- release-please con canales beta (develop) y stable (main) bien configurado — el flujo de releases automatizado funciona (30+ releases sin fricción visible en el historial).
- Playwright solo chromium en CI (rápido) con weekly full run.
