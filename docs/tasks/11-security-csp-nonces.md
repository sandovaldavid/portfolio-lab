# Task 11 — CSP: reemplazar 'unsafe-inline' por hashes por página (P2 · Seguridad)

> **Branch:** `security/csp-nonces` (nombre original conservado; el enfoque final no usa nonces — ver abajo) · **Esfuerzo:** M · **Ref:** [00-resumen § roadmap P2.13](../review-2026-07/00-resumen.md)

## Problema

`vercel.json`'s CSP tenía `script-src 'self' 'unsafe-inline'`. El hallazgo original de la revisión sugería reemplazarlo por un hash sha256 del script anti-FOUC de `index.html`. Verificado contra el HTML real generado, esto no alcanza tal cual: el documento final tiene **más de un** script inline, y no todos son estáticos entre sí (título/JSON-LD varían por página, TransferState varía por página y por datos de API cacheados) — aunque cada uno **sí es fijo una vez generado ese archivo HTML concreto**.

## Corrección de enfoque (importante)

El plan original de esta tarea proponía usar **nonces por request** (`CSP_NONCE` de Angular), asumiendo que había un servidor generando cada página en vivo. Al empezar a implementarlo se descubrió que **eso no aplica a este sitio**: 10 de 11 rutas + todos los slugs de contenido están prerenderizados — Vercel los sirve como HTML estático directo desde su CDN, sin invocar el servidor Nitro. Un nonce por request nunca se ejecutaría para ese tráfico. La única ruta genuinamente dinámica es el catch-all 404 (`[...].page.ts`), servido en vivo por Nitro para cualquier URL que no matchee un archivo estático.

Dado que casi todo el sitio es estático, el enfoque correcto es **hashes calculados en build time, por página**, no nonces:

1. Un script post-build (`scripts/inject-csp-hashes.mjs`) escanea cada `dist/analog/public/**/index.html` generado, extrae el contenido de cada `<script>` inline (sin `src`), calcula su sha256, e inyecta un `<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'sha256-...' ...">` en el `<head>` de **esa página específica** con los hashes exactos de sus propios scripts.
2. `vercel.json` deja de declarar `script-src` en el header global — la meta-tag de cada página pasa a ser la única fuente de esa directiva (los headers y `<meta>` de CSP se combinan por intersección; al no estar `script-src` en el header, la meta-tag por página gobierna esa directiva sola, sin heredar `'unsafe-inline'`).

## Checklist

- [x] `scripts/inject-csp-hashes.mjs`: extrae todo `<script>` sin atributo `src`, calcula `sha256` en base64, e inyecta la meta-tag con todos los hashes de esa página.
- [x] `package.json`: `"build": "vite build && node scripts/inject-csp-hashes.mjs"` — corre automáticamente en cada build.
- [x] `vercel.json`: quitado `script-src 'self' 'unsafe-inline'` del header `Content-Security-Policy` (el resto de directivas — `default-src`, `style-src`, `frame-ancestors`, etc. — no se tocaron; `style-src 'unsafe-inline'` sigue igual, fuera de alcance de esta tarea).
- [x] **Hallazgo documentado, no arreglado:** la página 404 catch-all (única ruta sin prerenderizar) no pasa por este script post-build, así que no tiene meta-tag de hashes ni `'unsafe-inline'` en el header — sus scripts inline (anti-FOUC, hydration) quedarán bloqueados por CSP. Degradación aceptada: el contenido HTML de la página (mensaje de error, link de vuelta) sigue funcionando vía SSR plano; solo se pierde la hidratación/interactividad JS en esa página específica. Justificación: bajo tráfico real a 404s, y arreglarlo requeriría duplicar la misma lógica de hash como middleware de servidor en tiempo de request — fuera de alcance de este PR.

## Verificación realizada

- `pnpm build` → `[csp] injected script-src hashes into 20/20 prerendered pages`.
- Servidor local + Playwright: cargadas `/`, `/about`, `/notes/binary-search` (contenido async), `/projects/auctions` (case study) — cero errores de consola, contenido completo renderizado.
- **Prueba adversarial:** se inyectó un `<script>` arbitrario no incluido en los hashes vía `page.evaluate()` — el navegador lo bloqueó y emitió la violación de CSP esperada (`Refused to execute inline script... Either the 'unsafe-inline' keyword, a hash..., or a nonce... is required`), confirmando que la política se aplica de verdad y no es un no-op.
- `pnpm test -- --run` (179/179), `pnpm format:check`, `pnpm lint`, `tsc --noEmit` en verde.
- `pnpm exec playwright test e2e/navigation.spec.ts` — 16/16 en verde contra el build con hashes inyectados.

## Criterios de aceptación

- [x] Cada página prerenderizada tiene su propia meta-tag CSP con los hashes exactos de sus scripts inline.
- [x] `vercel.json` ya no declara `'unsafe-inline'` en `script-src`.
- [x] Cargar `/`, `/about`, y una página con contenido async (`/notes/binary-search`) en un navegador real sin violaciones de CSP para los scripts legítimos.
- [x] Un script inline no autorizado (inyectado manualmente) es bloqueado por el navegador — confirma que la política se aplica de verdad.
- [x] Gap conocido y documentado: la página 404 catch-all no está cubierta (ver arriba).
