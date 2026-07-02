# Task 06 — Dead code y diagnostics honestos (P1 · Limpieza)

> **Branch:** `refactor/cleanup-dead-code` · **Esfuerzo:** S (~2 h) · **Ref:** [review § calidad C2, C3](../review-2026-07/02-calidad-codigo.md)

## Checklist

### Borrar scaffolding muerto
- [ ] Eliminar `src/app/pages/analog-welcome.ts` (271 líneas del starter de Analog: contenido de marketing, contador demo, sin OnPush, template/styles inline, sin spec, **cero referencias** en el código).
- [ ] `pnpm build && pnpm test -- --run` para confirmar que nada lo referenciaba.

### `runDiagnostics()` con datos reales
El easter egg de consola (`shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts`) reporta valores falsos — y su audiencia es exactamente el reviewer técnico que abre F12:

- [ ] `:58` `angularVersion: '19.0.0'` → usar `VERSION.full` de `@angular/core` (el proyecto está en Angular 22).
- [ ] `estimatedBundleSize: '45.8 KB'` y `apiResponseTime: '14ms'` → medir de verdad (p. ej. `performance.getEntriesByType('navigation')` para timing real) o eliminar esas claves del reporte. Un dato inventado resta credibilidad al conjunto.

### Specs faltantes en shared/lib
- [ ] `shared/lib/i18n/translate.pipe.ts` → spec (transform con key existente + key faltante).
- [ ] `shared/lib/font-scale/font-scale.ts` → spec (increase/decrease/reset + límites 13-19px + persistencia).
- [ ] `shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts` → spec (registro solo en browser, navegación por teclas, cleanup vía DestroyRef).

## Criterios de aceptación

- `analog-welcome.ts` no existe; build y tests en verde.
- `window.runDiagnostics()` en el navegador reporta la versión real de Angular y sin métricas inventadas.
- 3 specs nuevos en verde; ningún archivo de `shared/lib` sin spec (salvo barrels/types).
