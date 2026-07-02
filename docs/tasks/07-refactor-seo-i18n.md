# Task 07 — SEO reactivo al idioma + helper compartido (P2 · Refactor)

> **Branch:** `refactor/seo-effect-helper` · **Esfuerzo:** M (~medio día) · **Ref:** [review § calidad C4, C5](../review-2026-07/02-calidad-codigo.md)

## Problema

Las 11 páginas repiten el mismo bloque: `ngOnInit` → leer `i18n.t()` **una vez** → `seo.updatePage(...)`. Consecuencias:

1. **Bug funcional:** los meta tags (title, description, OG) **no se actualizan al cambiar de idioma** — se quedan en el idioma con el que cargó la página.
2. Duplicación de ~15 líneas × 11 páginas, y `ngOnInit` donde la convención pide signals.

Mismo patrón en `hero.component.ts:35-40`: el typewriter toma las frases de `i18n.t()` una sola vez (pendiente A2 de la revisión de junio).

## Checklist

- [ ] Crear helper en `shared/lib/seo/` (p. ej. `page-seo.ts`):
  ```ts
  export function setupPageSeo(build: (t: TranslateFn) => SeoPageData): void {
    const seo = inject(SeoService);
    const i18n = inject(I18nService);
    effect(() => seo.updatePage(build(i18n.t())));
  }
  ```
  (ajustar a la firma real de `SeoService.updatePage` y del signal de i18n).
- [ ] Migrar las 11 páginas (`index`, `about`, `experience`, `projects`, `projects/[slug]`, `skills`, `resume`, `research`, `notes/index`, `notes/[slug]`, `[...]`) a `setupPageSeo(...)` en el constructor/inicializador de campo; eliminar sus `ngOnInit` si quedan vacíos.
- [ ] `hero.component.ts`: derivar `phrases` de un `computed()` sobre i18n y reiniciar el typewriter vía `effect()` al cambiar idioma.
- [ ] Opcional (mismo PR): token compartido `IS_BROWSER` (`InjectionToken` con `isPlatformBrowser(inject(PLATFORM_ID))`) — hoy ~9 servicios duplican ese boilerplate. Migrarlos.
- [ ] Opcional: `resume.component.ts:63,72,146` — usar el guard `isBrowser` en vez de try/catch para `localStorage` (consistencia con el resto del codebase).
- [ ] Actualizar/añadir specs: el spec del helper debe cubrir "cambia el idioma → `updatePage` se re-ejecuta con los textos nuevos".

## Criterios de aceptación

- Cambiar de idioma con el language-picker actualiza `<title>` y meta description sin recargar (verificable en DevTools).
- `grep -rn "ngOnInit" src/app/pages` → 0 resultados (o solo casos justificados documentados).
- Todas las specs de páginas siguen en verde.
