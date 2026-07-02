# Revisión 2026-07 — Seguridad

> Todos los hallazgos verificados directamente contra el código en `1.8.2-beta.0`.

## Alta severidad

### S1 — `obsidian-sync.ts` falla abierto (escritura sin autenticación)

`src/server/routes/obsidian-sync.ts:16-23`:

```ts
const secret = process.env.OBSIDIAN_SYNC_SECRET || '';
// ...
if (secret && token !== secret) {   // ← si secret === '' el check se SALTA
```

Si `OBSIDIAN_SYNC_SECRET` no está configurado en el entorno, **cualquier POST anónimo escribe archivos** en `src/content/{algorithms,systems}/*.md` vía `writeFileSync` (`:53`). Mitigantes reales: el guard de path traversal (`:34-46`) es correcto, y en Vercel el filesystem es de solo lectura (el write fallaría en producción). Pero el patrón es inseguro: en dev/self-hosted es una escritura arbitraria de contenido, y no hay rate limiting.

**Fix (P0):**

```ts
if (!secret) {
  event.node.res.statusCode = 503;
  return { status: 'error', message: 'Sync disabled: secret not configured.' };
}
if (token !== secret) { /* 401 */ }
```

### S2 — Deploy a producción sin gate de CI

`.github/workflows/deploy.yml:3-7` se dispara en `push` a `main`/`develop` como workflow independiente, **sin `needs:` ni `workflow_run`** sobre quality-checks/CI. Un push a `main` con lint/tests/build rotos se despliega a producción en paralelo con los checks que fallan.

Esto contradice lo que afirman `CLAUDE.md` ("all checks pass") y `SECURITY.md` ("Require all security checks to pass", "Manual approval"). Ninguna de esas protecciones existe hoy.

**Fix (P0):** convertir el trigger a `workflow_run` (deploy solo cuando CI concluye en success), o proteger `main` con un GitHub Environment `production` con required checks.

## Media severidad

### S3 — CSP con `'unsafe-inline'` en `script-src`

`vercel.json` incluye `script-src 'self' 'unsafe-inline'`. El único script inline es el bloque anti-FOUC de `index.html`; reemplazarlo por su hash (`'sha256-…'`) elimina la superficie XSS. Inconsistencia adicional: `connect-src` permite `www.google-analytics.com` pero `script-src` no incluye orígenes GA — si algún día se carga GA por script externo, la CSP lo bloqueará.

### S4 — Tres umbrales distintos de `pnpm audit`

- `package.json:24` → `--audit-level=high`
- `quality-checks.yml:88` → `--audit-level=critical`
- `SECURITY.md` → afirma `--audit-level=moderate`

Elegir uno (recomendado: `high` en ambos ejecutables, corregir SECURITY.md).

### S5 — CodeQL eliminado sin reemplazo

Commit `c8fc00f5` eliminó `codeql.yml`. `README.md` conserva el badge de CodeQL (roto) y `CLAUDE.md` aún lo lista como paso del pipeline a `main`. O se restaura (es gratis en repos públicos) o se documenta la decisión y se limpian las referencias.

## Baja severidad

### S6 — `diagnostics.ts` expone info del runtime sin auth

`src/server/routes/diagnostics.ts` devuelve `process.platform`, `arch`, `process.version`, `uptime`, y acepta un query param que inyecta 1.5s de delay artificial. Sensibilidad baja, pero es un endpoint de producción sin gate — considerar restringirlo a non-prod o tras un header.

### S7 — Actions pinneadas por tag mayor, no por SHA

`actions/checkout@v7`, `setup-node@v6`, `github-script@v9`, etc. Buenas prácticas de supply chain recomiendan SHA-pinning. Nota menor: `cache@v4` desentona con el resto de majors.

### S8 — `e2e.yml` pide `contents: write` innecesariamente

Solo hace checkout, corre tests, sube artifact y comenta el PR. Con `contents: read` + `pull-requests: write` + `checks: write` basta (mínimo privilegio).

## Lo que está bien ✅

- `vercel.json` con CSP + HSTS + Permissions-Policy + nosniff + X-Frame-Options (cerrado desde la revisión de junio).
- Guard de path traversal correcto en `obsidian-sync.ts:34-46`.
- Sin `pull_request_target` en ningún workflow (sin superficie de inyección por esa vía).
- Sin secretos en el repo; `HUSKY: 0` en CI; permisos declarados por workflow.
- `pnpm audit` activo en CI (era un pendiente de junio).
