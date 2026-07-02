# Task 11 — CSP: reemplazar 'unsafe-inline' por hashes por página (P2 · Seguridad)

> **Branch:** `security/csp-nonces` (nombre original conservado; el enfoque final no usa nonces — ver abajo) · **Esfuerzo:** M · **Ref:** [00-resumen § roadmap P2.13](../review-2026-07/00-resumen.md)

## Problema

`vercel.json`'s CSP tenía `script-src 'self' 'unsafe-inline'`. El hallazgo original de la revisión sugería reemplazarlo por un hash sha256 del script anti-FOUC de `index.html`. Verificado contra el HTML real generado, esto no alcanza tal cual: el documento final tiene **más de un** script inline, y no todos son estáticos entre sí (título/JSON-LD varían por página, TransferState varía por página y por datos de API cacheados) — aunque cada uno **sí es fijo una vez generado ese archivo HTML concreto**.

## Corrección de enfoque (importante)

El plan original de esta tarea proponía usar **nonces por request** (`CSP_NONCE` de Angular), asumiendo que había un servidor generando cada página en vivo. Al empezar a implementarlo se descubrió que **eso no aplica a este sitio**: 10 de 11 rutas + todos los slugs de contenido están prerenderizados — Vercel los sirve como HTML estático directo desde su CDN, sin invocar el servidor Nitro. Un nonce por request nunca se ejecutaría para ese tráfico. La única ruta genuinamente dinámica es el catch-all 404 (`[...].page.ts`), servido en vivo por Nitro para cualquier URL que no matchee un archivo estático.

Dado que casi todo el sitio es estático, el enfoque correcto es **hashes calculados en build time, por página**, no nonces.

## Segunda corrección: dónde inyectar los hashes (bug real encontrado en CI)

La primera implementación usó un script post-build independiente (`scripts/inject-csp-hashes.mjs`, corriendo como `vite build && node scripts/inject-csp-hashes.mjs`). Esto pasó todo localmente (specs, E2E, hasta una prueba adversarial de CSP en navegador real) pero **rompió Lighthouse en CI con un CLS catastrófico (~0.6-0.78, requerido <0.1)** en las 6 URLs auditadas — reproducido también en local, no era flakiness de CI.

Root cause: Nitro (el server de Analog) hornea un **manifest de archivos estáticos** (tamaño en bytes + etag) dentro del bundle compilado del servidor (`dist/analog/server/chunks/nitro/nitro.mjs`) durante la fase "Building Server..." de `vite build`. El script post-build modificaba el HTML en disco **después** de que ese manifest ya había sido calculado y horneado, así que el servidor seguía anunciando el `Content-Length` viejo (más chico) en cada respuesta. El navegador trunca el body a ese tamaño declarado, cortando el final de la página a mitad del script de TransferState (`#ng-state`) — hydration fallaba con `SyntaxError: Unterminated string in JSON`, y el `<app-footer>` colapsaba a 0×0 antes de reflow. Confirmado con una prueba de control: insertar CUALQUIER contenido (no solo CSP) cerca del `<head>` después del build reproducía el mismo truncamiento en un punto distinto — el bug no era específico de CSP, afecta a cualquier edición post-build del HTML.

**Fix:** mover la inyección de hashes a un hook `rollup:before` de Nitro (vía `analog({ nitro: { hooks: { 'rollup:before': ... } } })` en `vite.config.ts`), que corre **después** del prerenderizado (los archivos ya existen) pero **antes** de que Nitro compile su manifest de archivos estáticos. Se eliminó el script standalone; la lógica ahora vive inline en `vite.config.ts`.

## Checklist

- [x] Lógica de hashing en `vite.config.ts` (función `injectCspHashes`): extrae todo `<script>` sin atributo `src`, calcula `sha256` en base64, e inyecta la meta-tag con todos los hashes de esa página.
- [x] Enganchado vía `analog({ nitro: { hooks: { 'rollup:before': (nitro) => injectCspHashes(nitro.options.output.publicDir) } } })` — corre en el punto correcto del ciclo de build de Nitro, no como script post-build separado.
- [x] `vercel.json`: quitado `script-src 'self' 'unsafe-inline'` del header `Content-Security-Policy` (el resto de directivas — `default-src`, `style-src`, `frame-ancestors`, etc. — no se tocaron; `style-src 'unsafe-inline'` sigue igual, fuera de alcance de esta tarea).
- [x] **Hallazgo documentado, no arreglado:** la página 404 catch-all (única ruta sin prerenderizar) no pasa por esta inyección, así que no tiene meta-tag de hashes ni `'unsafe-inline'` en el header — sus scripts inline (anti-FOUC, hydration) quedarán bloqueados por CSP. Degradación aceptada: el contenido HTML de la página (mensaje de error, link de vuelta) sigue funcionando vía SSR plano; solo se pierde la hidratación/interactividad JS en esa página específica. Justificación: bajo tráfico real a 404s, y arreglarlo requeriría duplicar la misma lógica de hash como middleware de servidor en tiempo de request — fuera de alcance de este PR.

## Verificación realizada

- `pnpm build` → `[csp] injected script-src hashes into 20 prerendered pages`, corriendo entre "Building Server..." y "Building Sitemap...".
- `curl -sI` `Content-Length` == tamaño real del archivo en disco (120134 bytes en ambos) — confirma que el manifest de Nitro ya refleja el HTML final, no uno viejo.
- Servidor local + Playwright: cargadas `/`, `/about`, `/notes/binary-search` (contenido async), `/projects/auctions` (case study) — cero errores de consola, `#ng-state` parsea correctamente (`JSON.parse` OK, longitud completa de 3034 caracteres).
- **Prueba adversarial:** se inyectó un `<script>` arbitrario no incluido en los hashes vía `page.evaluate()` — el navegador lo bloqueó y emitió la violación de CSP esperada, confirmando que la política se aplica de verdad y no es un no-op.
- `pnpm lighthouse` completo (6 URLs, 12 corridas) → "All results processed!" sin fallos de `minScore`, tras haber reproducido el fallo real primero (no solo confiar en que "no rompió nada obvio").
- `pnpm test -- --run` (179/179), `pnpm format:check`, `pnpm lint` (incluye `vite.config.ts`), `tsc --noEmit` en verde.
- `pnpm exec playwright test e2e/navigation.spec.ts` — 16/16 en verde contra el build final con hashes inyectados en el punto correcto del pipeline.

## Criterios de aceptación

- [x] Cada página prerenderizada tiene su propia meta-tag CSP con los hashes exactos de sus scripts inline.
- [x] `vercel.json` ya no declara `'unsafe-inline'` en `script-src`.
- [x] Cargar `/`, `/about`, y una página con contenido async (`/notes/binary-search`) en un navegador real sin violaciones de CSP para los scripts legítimos.
- [x] Un script inline no autorizado (inyectado manualmente) es bloqueado por el navegador — confirma que la política se aplica de verdad.
- [x] Gap conocido y documentado: la página 404 catch-all no está cubierta (ver arriba).
