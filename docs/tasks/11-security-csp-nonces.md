# Task 11 — CSP: reemplazar 'unsafe-inline' por nonces (P2 · Seguridad)

> **Branch:** `security/csp-nonces` · **Esfuerzo:** M · **Ref:** [00-resumen § roadmap P2.13](../review-2026-07/00-resumen.md)

## Problema

`vercel.json`'s CSP tiene `script-src 'self' 'unsafe-inline'`. El hallazgo original de la revisión sugería reemplazarlo por un hash sha256 del script anti-FOUC de `index.html`. Verificado contra el HTML real generado (SSR/prerender), esto no alcanza: el documento final tiene **más de un** script inline, y no todos son estáticos:

1. El anti-FOUC de `index.html` (estático, mismo contenido siempre).
2. JSON-LD de `SeoService._injectJsonLd()` — varía por página y por idioma.
3. El bootstrap de event-replay de Angular (`window.__jsaction_bootstrap(...)`) y su librería inline — inyectados por el propio renderer SSR de Angular.
4. TransferState (datos de hydration, incluida la respuesta cacheada de `github-contributions`) — varía por página y por respuesta de API en el momento del build/request.

Un hash estático cubre (1) pero no (2)/(3)/(4), porque su contenido cambia. La forma soportada por Angular para este caso es un **nonce por request** (`CSP_NONCE`), no un hash fijo.

## Checklist

- [ ] Mover el header `Content-Security-Policy` de `vercel.json` (estático) a un middleware del servidor Nitro (`src/server/middleware/`), generado dinámicamente por request — `vercel.json`'s `headers` no puede variar por request, así que el nonce tiene que salir del propio servidor.
- [ ] Generar un nonce aleatorio criptográficamente seguro por request (`crypto.randomUUID()` o `randomBytes` de Node) y setearlo en el header CSP (`script-src 'self' 'nonce-<valor>'`).
- [ ] Proveer el nonce a Angular vía el token `CSP_NONCE` (`@angular/core`) en `app.config.server.ts`, para que el propio renderer SSR lo aplique a los scripts que genera (TransferState, event-replay).
- [ ] Aplicar el mismo nonce al script anti-FOUC de `index.html` — como es un archivo estático hoy, esto requiere servirlo vía una plantilla (o inyectar el atributo `nonce` en el HTML ya renderizado, antes de enviarlo, desde el middleware del servidor).
- [ ] Aplicar el mismo nonce al `<script type="application/ld+json">` que arma `SeoService._injectJsonLd()` (pasar el nonce al servicio o leerlo del documento vía un `<meta>`/atributo que el servidor ya haya inyectado).
- [ ] Quitar `'unsafe-inline'` de `script-src` una vez que los 3 puntos anteriores tengan nonce.

## Criterios de aceptación

- `curl -sI https://<preview-url>/` (o el server local en modo build) muestra un `Content-Security-Policy` con `'nonce-...'` y sin `'unsafe-inline'` en `script-src`.
- Cargar cualquier página en un navegador real (Chrome DevTools → Console) sin violaciones de CSP — verificado en al menos `/`, `/about` y una página con contenido async (`/notes/binary-search`) para cubrir TransferState con datos reales.
- El nonce cambia entre requests distintos (no es el mismo valor cacheado/estático).
- Hydration sigue funcionando (sin re-render completo del lado cliente, sin errores de consola de Angular sobre hydration mismatch).
