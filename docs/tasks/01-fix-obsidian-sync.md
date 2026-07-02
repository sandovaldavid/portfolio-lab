# Task 01 — Fix fail-open en obsidian-sync (P0 · Seguridad)

> **Branch:** `fix/obsidian-sync-fail-open` · **Esfuerzo:** XS (~30 min) · **Ref:** [review § seguridad S1](../review-2026-07/01-seguridad.md)

## Problema

`src/server/routes/obsidian-sync.ts:16-23`: si `OBSIDIAN_SYNC_SECRET` no está configurado (`secret === ''`), la condición `if (secret && token !== secret)` se salta el check de auth y **cualquier POST anónimo escribe archivos markdown** en `src/content/{algorithms,systems}/` vía `writeFileSync`. En Vercel el FS es read-only (mitigado en prod), pero en dev/self-hosted es escritura arbitraria de contenido sin autenticación.

## Checklist

- [ ] En `obsidian-sync.ts`, rechazar cuando el secret no esté configurado:
  ```ts
  if (!secret) {
    event.node.res.statusCode = 503;
    return { status: 'error', message: 'Sync disabled: secret not configured.' };
  }
  if (token !== secret) {
    event.node.res.statusCode = 401;
    return { status: 'error', message: 'Unauthorized. Invalid secret.' };
  }
  ```
- [ ] Crear `src/server/routes/obsidian-sync.spec.ts` con al menos:
  - rechaza (503) cuando `OBSIDIAN_SYNC_SECRET` no está definido
  - rechaza (401) con token incorrecto
  - rechaza (400) slug fuera de `algorithms/`/`systems/` y path traversal (`../`)
  - happy path: escribe el archivo con secret válido
- [ ] Verificar que `OBSIDIAN_SYNC_SECRET` está configurado en Vercel (env de producción y preview).

## Criterios de aceptación

- `curl -X POST /obsidian-sync -d '{"slug":"algorithms/x","content":"y"}'` sin secret configurado → 503; con secret configurado y token inválido → 401.
- Specs en verde en `pnpm test -- --run`.

## Notas

- Mantener el guard de path traversal existente (`:34-46`) — está correcto.
- Opcional (no bloqueante): rate limiting básico por IP si algún día se expone fuera de uso personal.
