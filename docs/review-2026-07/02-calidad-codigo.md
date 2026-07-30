# Revisión 2026-07 — Calidad de código y convenciones

> Auditoría de `src/app/` y `src/server/` contra las convenciones de `CLAUDE.md`, en `1.8.2-beta.0`.

## Cumplimiento por convención

| Convención | Estado |
|---|---|
| `input()`/`output()` (sin `@Input`/`@Output`) | ✅ 100% — cero decoradores legacy |
| `inject()` (sin DI en constructor) | ✅ 100% — los 3 constructores existentes solo montan `effect()`/cleanup |
| Sin `any` | ✅ 100% — asserts usan `unknown` + narrowing |
| Fronteras FSD (pages→widgets→features→entities→shared) | ✅ 100% — cero imports hacia arriba; `fsd.spec.ts` lo valida como test |
| Accesibilidad de imágenes (`alt`, `aria-hidden` decorativos) | ✅ sin violaciones |
| `OnPush` siempre | ⚠️ 1 excepción: `analog-welcome.ts` (código muerto) |
| Regla de 4 archivos (sin template/styles inline) | ❌ 9 archivos la violan (ver abajo) |
| Sin `console.log` en producción | ❌ 5 llamadas en `keyboard-shortcuts.ts:65-75` |
| Sin `ngOnInit` cuando signals bastan | ⚠️ patrón SEO repetido en 11 páginas + typewriter del hero |

## Hallazgos

### C1 — Regla de 4 archivos violada por las páginas (decisión pendiente)

Con template inline (`template:` en el decorador, sin `.html`/`.css`):

- `src/app/app.ts:17` (también `styles:` inline en `:26`)
- `pages/index.page.ts:39` — 269 líneas, el template inline más grande
- `pages/about.page.ts:13`, `resume.page.ts:12`, `research.page.ts:20`, `experience.page.ts:20`, `projects.page.ts:21`, `skills.page.ts:12`
- `pages/analog-welcome.ts:5,220`

En cambio, `notes/index`, `notes/[slug]`, `[...]` y `projects/[slug]` **sí** cumplen la regla (4 archivos). Todos los componentes de `entities/`, `features/`, `widgets/` y `shared/ui/` cumplen.

**Decisión a tomar:** o se extraen los templates de las 7 páginas (empezando por `index.page.ts`), o se **exime explícitamente a `pages/` en CLAUDE.md** (es un patrón común en Analog para páginas que solo componen widgets). Lo insostenible es la regla escrita diciendo "no exceptions" con 9 violaciones.

### C2 — `analog-welcome.ts` es scaffolding muerto → borrar

`src/app/pages/analog-welcome.ts` (271 líneas): contenido de marketing de Analog, contador demo, sin `OnPush`, template+styles inline, sin spec, **cero referencias** en el código y no es ruta (no es `*.page.ts` válido para el router... es archivo suelto sin uso). Eliminar.

### C3 — `console.log` + datos falsos en `runDiagnostics()`

`shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts:65-75`: 5 `console.log`. Es un easter egg intencional (aceptable), **pero** el reporte hardcodea valores falsos/desactualizados:

- `:58` → `angularVersion: '19.0.0'` (el proyecto usa Angular **22.0.2**) — justo el reviewer técnico que abre F12 es quien verá el dato incorrecto
- `estimatedBundleSize: '45.8 KB'`, `apiResponseTime: '14ms'` — inventados

**Fix:** importar `VERSION` de `@angular/core` y medir o eliminar las métricas falsas. Si el `console.log` es intencional, añadir `// eslint-disable-next-line no-console` cuando se active la regla (ver C6).

### C4 — Patrón SEO duplicado en 11 páginas y no reactivo al idioma

Las 11 páginas repiten el mismo bloque: `ngOnInit` → `i18n.t()` una vez → `seo.updatePage(...)`. Dos problemas:

1. **Duplicación**: candidato claro a un helper `setupPageSeo(keys)` en `shared/lib/seo`.
2. **Bug funcional**: al leer `i18n.t()` fuera de un `effect()`, los meta tags **no se actualizan al cambiar de idioma**. Un `effect()` resuelve ambos y elimina el `ngOnInit`.

Mismo problema en `hero.component.ts:35-40`: el typewriter lee las frases de `i18n.t()` una sola vez en `ngOnInit` (pendiente A2 de la revisión de junio, sigue abierto).

### C5 — SSR safety: un patrón inconsistente

La base es sólida (`isPlatformBrowser` en app, mode, theme, i18n, seo, font-scale, keyboard-shortcuts…). Excepciones:

- `widgets/resume/resume.component.ts:63,72,146` — `localStorage` protegido solo con try/catch en `ngOnInit` (que sí corre en SSR); inconsistente con el patrón del resto del codebase.
- ~9 servicios re-declaran `private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID))` — candidato a token compartido (`IS_BROWSER`).
- `navbar.component.ts:46` (`window.scrollY` en HostListener) y `resume-controls.component.ts:47` (`window.print()` en click) son seguros en la práctica por el timing de eventos, sin cambio necesario.

### C6 — Las convenciones no están enforzadas por tooling

`eslint.config.js` solo configura selectores de componentes/directivas. Faltan las reglas que respaldan CLAUDE.md:

```js
rules: {
  'no-console': ['error', { allow: ['warn', 'error'] }],
  '@typescript-eslint/no-explicit-any': 'error',
  // FSD: eslint-plugin-boundaries o no-restricted-imports por capa
}
```

Además `pnpm lint` solo cubre `src` — `e2e/`, `vite.config.ts` y configs quedan sin lint.

### C7 — Archivos más grandes (vigilar)

| Archivo | Líneas | Nota |
|---|---|---|
| `pages/index.page.ts` | 269 | template inline gigante → extraer (C1) |
| `shared/config/i18n/{es,en}.ts` | 281/279 | OK — son diccionarios |
| `keyboard-shortcuts.ts` | 212 | OK, cohesionado |
| `lstm-playground.component.html` | 293 | el HTML más grande; aceptable (SVG+controles) |
| `utility-panel.component.html` | 231 | considerar sub-componentes si crece |

## Lo que está bien ✅

- Adopción de signals ~total: `signal`/`computed`/`effect` en ~35 archivos; cleanup del keydown via `DestroyRef` (arreglado en #129).
- FSD impecable con test de arquitectura (`src/app/fsd.spec.ts`) — sigue siendo el diferenciador para entrevistas.
- i18n disciplinado: templates usan `i18n.t()`, sin strings de usuario hardcodeados detectados.
- tsconfig estricto; cero `TODO/FIXME`; cero dead code en lógica (salvo C2).
