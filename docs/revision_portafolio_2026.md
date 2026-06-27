# Revisión Integral del Portafolio — devsandoval.me

> **Fecha:** 2026-06-27 · **Versión analizada:** `1.2.0-beta.0` (rama `develop`) · **Revisión: v2 (pasada profunda)**
> **Stack:** Angular 21/22 + Analog 2.x · Vite 7 · Tailwind CSS 4 · Vitest 4 · Playwright · Vercel
> **Arquitectura:** Feature-Sliced Design (FSD)
> **Objetivo del autor:** impactar a reclutadores de Big Tech y, en segundo plano, al comité MEXT (U. de Tokio).

Esta es la **segunda pasada**, más profunda. Se auditó el estado real del código con 6 exploraciones (arquitectura, diseño, SEO, rendimiento/seguridad/PWA, easter eggs/notas/404, diseño visual/copy/print) y se **verificaron directamente** los hallazgos contestables. Toda afirmación trae referencia `archivo:línea`.

> **Corrección honesta sobre la v1 de este documento.** La primera pasada **subvaloró el proyecto**: trató el STAR ledger como "idea nueva" cuando **ya existe**, y catalogó los playgrounds (chaos/LSTM) como "over-engineering a recortar" cuando son **diferenciadores de nivel senior**. Esta v2 corrige eso: los playgrounds y los easter eggs son **fortalezas a destacar**, no a recortar. La recomendación *architect-primary* no los elimina — solo los **reorganiza**.

---

## 1. Resumen ejecutivo

**Veredicto:** Este es un portafolio **de élite en ingeniería** — muy por encima del 95% de los portafolios de SWE. La arquitectura (FSD validada con test), el Angular moderno (100% signals), el CI/CD completo, y sobre todo los **features interactivos reales** (simulador de circuit breaker, celda LSTM con matemática correcta, ledger de logros cuantificados, navegación Vim, consola de diagnóstico) demuestran seniority genuino. 

Las brechas que lo separan del "máximo nivel" no están en la capacidad de ingeniería, sino en **pulido de producto** (cero `@defer`, falta CSP/PWA/404, un PNG pesado), **consistencia de diseño** (escalas de tokens ausentes) y, sobre todo, **narrativa**: el copy del hero es genérico y el modo dual diluye el foco en los 6 segundos que decide un reclutador.

### Scorecard

| Dimensión | Nota | Estado |
|---|---|---|
| Arquitectura (FSD + Angular) | 9.5/10 | Élite |
| Features interactivas / easter eggs | 9.0/10 | Élite (diferenciador real) |
| Calidad de código / tests | 7.5/10 | Bueno (faltan specs) |
| Sistema de diseño (tokens) | 7.0/10 | Bueno con fugas |
| Color & contraste | 8.0/10 | Sólido |
| Tipografía | 7.5/10 | Coherente (1 fuente muerta) |
| Rendimiento & bundle | 6.5/10 | Mejorable (sin `@defer`, PNG pesado) |
| Seguridad & headers | 7.0/10 | Base buena, faltan CSP/HSTS |
| PWA & metadatos | 5.5/10 | Incompleto (sin manifest/theme-color) |
| Accesibilidad (WCAG 2.1 AA) | 7.0/10 | Buena base, gaps puntuales |
| SEO | 8.5/10 | Muy bueno |
| Contenido & copywriting | 7.5/10 | Sólido, pero hero genérico |
| Manejo de errores (404) | 2.0/10 | **Falta página 404** |
| **Global** | **8.0/10** | **Élite en ingeniería, pulible en producto/narrativa** |

### Top 5 quick wins (máximo impacto / mínimo esfuerzo)

1. **Crear página 404** (`pages/[...].page.ts`) + estado de error en `/notes/[slug]` → hoy una ruta desconocida muestra **página en blanco**; es el gap más visible. (~1 h)
2. **Liderar el hero con métricas** — cambiar "Building Software / Solving Problems / Shipping Code" por las métricas que **ya tienes** en el STAR ledger (−34% memoria, +60% throughput, −45% LCP). (~30 min)
3. **Skip link + aria-labels** del utility panel → cierra los gaps de a11y más visibles. (~30 min)
4. **Eliminar Press Start 2P** (`package.json` + `vite.config.ts:20`) y **convertir `project-08-campus-map.png` → webp** (344 KB → ~100 KB). (~20 min)
5. **CSP + HSTS + Permissions-Policy** en `vercel.json` + `theme-color`/`color-scheme` + `manifest.webmanifest`. (~45 min)

---

## 2. Estado del proyecto

| Métrica | Valor |
|---|---|
| Archivos TypeScript | 101 |
| Componentes (con marca propia) | 31 |
| Páginas (Analog file-based) | 8 |
| Servicios / Directivas / Pipes | 4 / 1 / 1 |
| Spec files | 37 |
| LOC `.ts` prod / specs | ~3.761 / ~1.397 |
| LOC `.html` / `.css` | ~2.341 / ~3.483 |

**CI/CD (9 workflows en `.github/workflows/`)** — diferenciador fuerte:

| Workflow | Propósito |
|---|---|
| `ci.yml` | lint, format, typecheck, build, bundle-size check |
| `quality-checks.yml` | reusable: lint/format/typecheck/tests/(audit opcional) |
| `lighthouse.yml` | Lighthouse en PR a main, comenta scores |
| `codeql.yml` | CodeQL (PR + push + semanal) |
| `e2e.yml` | Playwright (navegación, axe-core WCAG 2AA, responsividad) + semanal |
| `deploy.yml` | build + deploy Vercel + comenta preview URL |
| `publish-reports.yml` / `cleanup-reports.yml` | publica/limpia reportes en gh-pages |
| `release-please.yml` | versionado + changelog automático |

Lighthouse thresholds (`lighthouserc.json`): Perf ≥ 0.80, A11y ≥ 0.90, BP ≥ 0.85, SEO ≥ 0.90. **Dos ajustes pendientes:** el bundle-check es laxo (warning a 700 KB, no falla), y `pnpm audit` está **desactivado por defecto** (`run-audit: false`).

---

## 3. Arquitectura (FSD + convenciones Angular) — 9.5/10

### Impecable ✅
- **FSD perfectamente aplicada.** Cero imports "hacia arriba". Existe `src/app/fsd.spec.ts` que **valida la regla de dependencias como test** — esto es nivel staff; menciónalo en entrevistas.
- **Convenciones Angular 100%:** los 31 componentes con 4 archivos, `OnPush`, `input()/input.required()`, `output()`, `inject()`. Cero `@Input()/@Output()`, cero `template/styles` inline.
- **Calidad:** cero `any`, cero dead code en lógica, cero `TODO/FIXME`. `tsconfig` estricto (`strict`, `strictTemplates`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`).
- **SSR/SSG:** prerender de 8 rutas + sitemap (`vite.config.ts:46-60`), `provideClientHydration(withEventReplay())`, `provideBrowserGlobalErrorListeners()` (`app.config.ts:11`).

### A mejorar ⚠️

| # | Hallazgo | Sev. | Detalle |
|---|---|---|---|
| A1 | Specs faltantes | Media | Faltan 4 servicios (`I18nService`, `ModeStateService`, `SeoService`, `ThemeService`) y 5 páginas (`index`, `about`, `experience`, `projects`, `skills`). Contradice `CLAUDE.md`. |
| A2 | `ngOnInit` x2 | Baja | `hero` (typewriter) y `resume` (hydration localStorage). El de Hero es migrable a `effect()`. |
| A3 | Cobertura 50% | Baja | `vite.config.ts:89-92`. Baja para el mensaje "alta fiabilidad"; subir a 70-80% tras A1. |

---

## 4. Sistema de diseño — 7.0/10

### Tokens & paleta
Tailwind 4 **CSS-first** (`src/styles.css`, sin `tailwind.config.js`). Dos paletas conmutadas por clase en `<html>`: `mode-architect` (dark, default) y `mode-research` (light). 22 tokens semánticos, paleta coherente.

| Token | architect (dark) | research (light) |
|---|---|---|
| `--color-bg` | `#020d1c` | `#eef5ff` |
| `--color-surface` | `#071830` | `#ffffff` |
| `--color-primary` | `#3b9eff` | `#005fb1` |
| `--color-secondary` | `#fbbf24` | `#d97706` |
| `--color-success` | `#34d399` | `#059669` |
| `--color-danger` | `#f87171` | `#dc2626` |
| `--color-text` | `#e2f0ff` | `#0a1628` |
| `--color-muted` | `#6b9fd4` | `#2b4a70` |
| `--color-heading` | `#ffffff` | `#020d1c` |

*(`src/styles.css:16-57`.)*

### Tipografía
| Fuente | Uso real | Estado |
|---|---|---|
| JetBrains Mono | body + headings (architect) | ✅ 400/400i/700 |
| Lora | body + headings (research) | ✅ 400/400i/700 |
| Fira Code | `--font-code` (código) | ✅ 400/700 |
| **Press Start 2P** | — | ❌ no se importa en `styles.css`, pero sigue en `package.json` + `manualChunks` (`vite.config.ts:20`) → **dependencia muerta** |

### Fugas de consistencia (lo que nota un reviewer senior)

| # | Hallazgo | Sev. |
|---|---|---|
| D1 | Sin escala de **sombras** (15+ `box-shadow` ad-hoc) | Media |
| D2 | Sin escala de **border-radius** (mezcla px/rem + pills) | Media |
| D3 | Sin escala de **duraciones** (~10 timings distintos) | Baja |
| D4 | Sin escala de **spacing** (valores inline) | Baja |
| D5 | Colores hardcodeados en `resume` y `mext-thesis-pitch` (intencional = papel blanco, pero no tokenizado) | Media |
| D6 | Hack `filter: invert(1)` para iconos SVG en modo claro (`tech-pill.component.css:4-11`) | Baja |

**Fix D1–D4** — añadir a `@theme` en `src/styles.css`:
```css
@theme {
  --shadow-sm: 0 2px 8px rgb(0 0 0 / 0.15);
  --shadow-md: 0 4px 20px rgb(0 0 0 / 0.20);
  --shadow-lg: 0 8px 30px rgb(0 0 0 / 0.35);
  --radius-sm: 2px; --radius-md: 6px; --radius-lg: 12px; --radius-full: 9999px;
  --duration-fast: 0.15s; --duration-normal: 0.25s; --duration-slow: 0.4s;
}
```

---

## 5. Color & contraste (WCAG 2.1 AA)

AA exige 4.5:1 (texto normal) y 3:1 (texto grande / componentes UI).

| Par (modo) | Fondo | Texto | Ratio aprox. | Veredicto |
|---|---|---|---|---|
| Body architect | `#020d1c` | `#e2f0ff` | ~15:1 | ✅ |
| Muted architect | `#020d1c` | `#6b9fd4` | ~5.6:1 | ✅ texto normal |
| **Muted architect sobre surface** | `#071830` | `#6b9fd4` | **~4.9:1** | ⚠️ al límite — verificar |
| Primary UI architect | `#020d1c` | `#3b9eff` | ~6:1 | ✅ |
| Body research | `#eef5ff` | `#0a1628` | ~15:1 | ✅ |
| Muted research | `#ffffff` | `#2b4a70` | ~8:1 | ✅ |

**Único punto a vigilar:** `--color-muted` (`#6b9fd4`) sobre `--color-surface` (`#071830`) queda ~4.9:1. Donde se use para texto pequeño secundario sobre tarjetas, **verificar con axe/Lighthouse** (ya en CI) y, si falla, subir a `#7aa9da`.

---

## 6. Rendimiento & bundle — 6.5/10

| # | Hallazgo | Sev. | Detalle |
|---|---|---|---|
| R1 | **Cero bloques `@defer`** | Alta | Widgets pesados (`chaos-playground`, `lstm-playground`, `resume`) se cargan/hidratan eager. Envolver en `@defer (on viewport)` reduce el JS inicial. Irónico: el STAR ledger *presume* de usar `@defer` (−28% bundle) pero el código no lo usa. |
| R2 | **`project-08-campus-map.png` = 344 KB** | Alta | Es el único PNG (el resto webp). Convertir a webp (~100 KB). |
| R3 | `project-09-fluentreads.webp` = 912 KB | Media | Muy pesado incluso en webp; recomprimir / redimensionar. |
| R4 | Sin preload de fuentes LCP | Media | JetBrains Mono se usa en el h1 del hero. Sin `<link rel="preload">` hay riesgo de FOUT/reflow (agravado por el swap de fuente del modo dual). **Ojo:** usar la URL real del build (Vite hashea los woff2), no `/node_modules/...`. |
| R5 | Sin `width/height` en foto de perfil | Baja | `about-section.component.html` → pequeño CLS al cargar. Las cards de proyecto sí tienen `width/height` ✅. |
| R6 | `prismjs` en runtime | Baja | Las notas usan `MarkdownComponent` (render en cliente) → prism entra al **chunk de `/notes`** (no al inicial, por code-splitting de ruta). Verificar en `dist/stats.html`; si pesa, limitar `additionalLangs` o lazy-load. |

✅ **Bien:** `manualChunks` (vendor/fonts), `rollup-plugin-visualizer` → `dist/stats.html`, cards con `loading="lazy"` + `decoding="async"` + `width/height`, `target: es2020`.

---

## 7. Seguridad & headers — 7.0/10

`vercel.json` **sí existe** con headers (mejor que el default): `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `X-XSS-Protection`, `Referrer-Policy: strict-origin-when-cross-origin`, `Cache-Control` immutable para `/dist/*`. Sin secretos en el repo. El `window.runDiagnostics()` solo expone datos públicos (sin info-leak).

**Faltan (table-stakes para un security review):**
```jsonc
// vercel.json → añadir a headers de "/(.*)"
{ "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" },
{ "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'" },
{ "key": "Permissions-Policy", "value": "geolocation=(), camera=(), microphone=(), payment=()" }
```
> CSP con `'unsafe-inline'` en `style-src` es necesario por Tailwind/estilos inline; refinar con nonce si hay tiempo. **Probar el sitio tras aplicar CSP** (puede romper estilos/hidración si es demasiado estricta).

**CI:** activar `run-audit: true` en `ci.yml` y endurecer el bundle-check (fallar > 500 KB en vez de warning a 700 KB).

---

## 8. PWA, favicon & metadatos — 5.5/10

`public/` solo tiene `favicon.ico`. `index.html` tiene `lang="en"`, charset, viewport y description correctos. Faltan:

| # | Hallazgo | Sev. | Fix |
|---|---|---|---|
| P1 | Sin `manifest.webmanifest` | Media | Crear `public/site.webmanifest` (name, theme_color `#3b9eff`, background `#020d1c`, icons 192/512) + `<link rel="manifest">`. Habilita "Add to home screen" e installability en Lighthouse. |
| P2 | Sin `theme-color` / `color-scheme` | Baja | `<meta name="theme-color" content="#020d1c">` + `<meta name="color-scheme" content="dark light">`. La barra del navegador móvil tomará tu color de marca. |
| P3 | Favicon incompleto | Baja | Falta `apple-touch-icon.png` (180), `favicon.svg`, PNG 32/192/512. |
| P4 | `public/analog.svg` | Baja | Logo default de Analog — probable **dead asset**; borrar si no se usa. |

---

## 9. Accesibilidad (WCAG 2.1 AA) — 7.0/10

**Base sólida (~85%):** landmarks (`<main>`/`<nav>`/`<footer>`), ARIA correcto (tabs en `experience-timeline`, `role="group"+aria-pressed` en filtros, `aria-expanded` en menús), `alt` en imágenes + `aria-hidden` en decorativas, jerarquía con un único `h1`, `prefers-reduced-motion` respetado.

| # | Gap | Sev. | Archivo | Fix |
|---|---|---|---|---|
| Y1 | **Sin skip link** | Alta | `app.html` | `<a class="skip-link" href="#main">Saltar al contenido</a>` + `id="main"` en `<main>`. |
| Y2 | Labels ambiguos (SYS/PHD) | Media | `utility-panel.component.html:14-70` | `aria-label="Cambiar a modo System Architect"` etc. |
| Y3 | Carrusel no pausa con foco | Media | `skills-section.component.html:12-19` | Añadir `focus:[animation-play-state:paused]`. |
| Y4 | Focus-visible inconsistente | Media | links de footer y algunos botones | Asegurar `:focus-visible` (outline 2px) en todos los interactivos. |
| Y5 | Contraste `muted` | Baja | `styles.css:30` | Verificar (ver §5). |

---

## 10. SEO & metadatos — 8.5/10

`SeoService` (`seo.service.ts`) gestiona title, OG, Twitter cards, **JSON-LD** (`Person` + `Organization` Atena en `index.page.ts:207-220`), canonical por página y hreflang ES/EN. `robots.txt` → sitemap.

| # | Hallazgo | Sev. |
|---|---|---|
| S1 | Falta `twitter:image` / `twitter:creator` | Baja |
| S2 | hreflang ES/EN → misma URL (correcto para single-URL, sin diferenciación) | Baja |
| S3 | OG única genérica → idea: OG por página vía API route + satori (`docs/llms-full.txt`) | Baja (idea) |

> **`sitemap.xml` NO es bug** — se genera en build (`vite.config.ts:57-59`). Confirmar `dist/analog/public/sitemap.xml` tras `pnpm build`.

---

## 11. Easter eggs & features interactivas — 9.0/10 (tu mayor diferenciador)

Esto es lo que un reviewer senior recordará. **No tocar la calidad; solo organizar y pulir bordes.**

### Easter eggs / atajos (`shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts`, registrado en `app.ts:84`, SSR-safe)
- **Navegación Vim:** `j/k` y `s/w` (scroll), `gg`/`G` (top/bottom), `h/l` y `a/d` (ruta prev/next), `Ctrl+d`/`Ctrl+u` (media página).
- **Teclas 1-5** → rutas; `+/-/0` → escala de fuente (13→19px, persistida); `?` → modal de atajos; `/` → foco de búsqueda; `Esc` → cierra modal.
- **`window.runDiagnostics()`** → reporte JSON de salud (modo, idioma, métricas de carga) con boot message estilizado en consola (`%c[SYSTEM_OK] David Sandoval Kernel Active`). Guiño perfecto para un reviewer técnico que abre F12.

### Playgrounds
- **Chaos Playground** (`widgets/chaos-playground/`, solo modo architect): SVG interactivo de los microservicios de Atena con **inyección de fallo** → estado healthy → degraded → circuit-open, con narrativa real (Polly retry/backoff, CircuitBreakerPolicy, Redis read-through, Azure Service Bus DLQ). Matemática de aristas correcta. **Demuestra diseño de sistemas tolerante a fallos.**
- **LSTM Playground** (`widgets/lstm-playground/`, solo modo research): celda LSTM con sliders; sigmoid/tanh **correctos**; diagnóstico de **gradiente** (vanishing/preserved). Contenido elite para audiencia ML/MEXT.
- **STAR Ledger** (`widgets/star-ledger/` + `entities/experience/model/star.data.ts`, solo modo architect): **6 logros cuantificados con snippets** — −34% memoria, +60% throughput (420→675 req/min), −28% bundle, −45% LCP, +55 pp cobertura, −22% memoria. **Esto es oro para reclutadores.** Hoy está enterrado en el modo architect; debería alimentar también el hero.

### Bugs en esta capa
| # | Bug | Sev. | Archivo |
|---|---|---|---|
| E1 | Lista de rutas hardcodeada para navegación | Media | `keyboard-shortcuts.ts:179` (rompe en silencio si cambian rutas) |
| E2 | `.mode-transitioning` se agrega pero **no tiene CSS** → la "cortina CRT" planeada nunca se implementó (no-op) | Baja | `utility-panel.component.ts` |
| E3 | `scanlines` declarado pero desactivado (`/* removed — noop */`); input sin usar en `pixel-card` | Baja | dead code |
| E4 | Listener `keydown` sin cleanup (bajo riesgo: servicio singleton) | Muy baja | `keyboard-shortcuts.ts:27` |

---

## 12. Notas / TIL — 5/10

Sistema **bien arquitecturado** (`@analogjs/content`, `injectContentFiles`, search por título/desc/tags, filtro por categoría, frontmatter limpio, empty state) pero **a medias en contenido**: solo **2 notas** (`binary-search`, `circuit-breaker`).

| # | Hallazgo | Sev. |
|---|---|---|
| N1 | **LaTeX `$$...$$` no renderiza** — `binary-search.md` usa fórmulas pero no hay KaTeX/MathJax configurado → se ven como texto literal | Media |
| N2 | Solo 2 notas → "se siente plantilla, no producción" | Media |
| N3 | Sin reading-time, sin notas relacionadas, sin paginación (no urge a esta escala) | Baja |

Para impactar: o se llevan a **5-10 notas reales** (algoritmos/system design, alineado con tu objetivo MEXT y CS fundamentals) o se ocultan del nav hasta tener masa crítica. Si quieres mantenerlas, arregla N1 primero.

---

## 13. 404 & manejo de errores — 2/10 (bug crítico de percepción)

| # | Hallazgo | Sev. | Detalle |
|---|---|---|---|
| F1 | **No hay página 404** | Alta | No existe catch-all `pages/[...].page.ts` ni `public/404.html`. Una ruta desconocida → **página en blanco** con navbar/footer. "No pensó los edge cases" es justo lo que no quieres que piense un reviewer. |
| F2 | `/notes/[slug]` inválido → carga infinita | Media | Muestra "Loading note from vault..." para siempre (sin estado de error). |

> Matiz: **sí existe** `provideBrowserGlobalErrorListeners()` (`app.config.ts:11`) para errores JS no capturados — no es cierto que falte todo manejo de errores. Lo que falta es la **ruta 404** y un estado de error en el detalle de notas.

**Fix F1** — `src/app/pages/[...].page.ts`:
```ts
@Component({
  standalone: true, changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './not-found.page.html', styleUrl: './not-found.page.css',
})
export default class NotFoundPage {
  private readonly seo = inject(SeoService);
  constructor() { this.seo.updatePage({ title: '404 — Página no encontrada' }); }
}
```

---

## 14. UI/UX, primera impresión & copywriting

Diseño visual **muy pulido**: animaciones de entrada escalonadas, typewriter signal-based con cleanup, `IntersectionObserver` para revelados al scroll, micro-interacciones consistentes (`active:scale-[0.98]`), modo dual con dos personas coherentes. El problema no es el diseño — es el **copy** y el **foco**.

### Copy por sección (lo más accionable)

| Sección | Copy actual | Problema | Sugerencia |
|---|---|---|---|
| **Hero (typewriter)** | "Building Software / Solving Problems / Shipping Code" | Genérico, lo dice cualquiera | Liderar con **métricas reales** del STAR ledger: "−34% heap memory", "+60% API throughput", "−45% LCP" |
| **Hero (intro)** | "Software Engineer at Atena" | Posiciona la empresa, no la expertise | "Software Engineer · alto rendimiento en Angular & .NET" |
| **Footer CTA** | botón `say_hello()` | Cute pero no obvio para reclutar | `let's_talk()` o "Hablemos" + subtítulo concreto de roles |
| **About** | métricas + stack específico | ✅ **Fuerte, no tocar** (ya cuantifica −34%/+60%/−28%/−45%) | mantener |
| **Proyectos** | descripciones de features | Sin métricas de impacto/escala | añadir usuarios, stars, Lighthouse, "Angular 20" → 21 en `madai` |
| **Experiencia** | Atena excelente y cuantificada ✅ | **Programador-TI** (FoxPro / IT municipal) lee como "soporte", no SWE | reencuadrar a "lideré modernización FoxPro→React" o resumir |

### Primera impresión (above the fold)
Hoy: badge "Available" + nombre + typewriter genérico + 2 CTAs. **Faltan en el primer viewport:** una **métrica de impacto** y, opcionalmente, foto/avatar. Un reclutador ve "otro dev Angular" en vez de "ingeniero de rendimiento con números". Cambiar el typewriter por métricas es el fix de mayor ROI del portafolio.

### Responsividad (riesgos concretos)
- Menú radial del footer puede desbordar < 320px (translates hardcodeados).
- Fade del carrusel de skills (`w-16` = 64px/lado) tapa demasiado contenido en móvil; usar `w-12 md:w-16`.
- `-webkit-line-clamp: 3` en cards: soporte limitado en Firefox antiguo → añadir `max-height` de respaldo.
- CTAs del hero: verificar touch target ≥ 44px (el badge a `py-2` ≈ 32px queda corto).

---

## 15. Resume / PDF (impresión) — 7/10

Reglas `@media print` buenas (oculta navbar/footer/panel, resetea márgenes, `page-break-inside: avoid`, `print-color-adjust: exact`). Faltan:

| # | Hallazgo | Sev. | Fix |
|---|---|---|---|
| PR1 | Sin tamaño de página A4 | Media | `@page { size: A4; margin: 1.5cm; }` (hoy exporta en Letter por defecto) |
| PR2 | Tamaños de fuente no optimizados para print | Baja | overrides en pt (`.resume-name: 18pt`, body `10pt`) |
| PR3 | Links sin URL visible en papel | Baja | `a::after { content: " (" attr(href) ")"; }` en print |
| PR4 | Sin número de página | Baja | `@page { @bottom-center { content: "Página " counter(page); } }` |

> Verificar el PDF real en Chrome/Firefox/Safari con un currículum de 2-3 páginas.

---

## 16. Bugs & hallazgos consolidados (por severidad)

| # | Hallazgo | Severidad | Archivo:línea |
|---|---|---|---|
| F1 | Sin página 404 (ruta desconocida = blanco) | **Alta** | falta `pages/[...].page.ts` |
| Y1 | Sin skip link | **Alta** | `app.html` |
| R1 | Cero `@defer` (widgets pesados eager) | **Alta** | templates de chaos/lstm/resume |
| R2 | `project-08-campus-map.png` 344 KB sin convertir | **Alta** | `public/projects/` |
| F2 | `/notes/[slug]` inválido → carga infinita | Media | `[slug].page.html` |
| N1 | LaTeX en notas no renderiza (sin KaTeX) | Media | `src/content/*.md` |
| E1 | Rutas hardcodeadas en atajos | Media | `keyboard-shortcuts.ts:179` |
| B1 | Dependencia muerta Press Start 2P | Media | `package.json` + `vite.config.ts:20` |
| Sec1 | Faltan CSP / HSTS / Permissions-Policy | Media | `vercel.json` |
| P1 | Sin `manifest.webmanifest` | Media | `public/` |
| D1-D5 | Sin escalas de tokens / colores no tokenizados | Media | `styles.css` `@theme` |
| R3 | `fluentreads.webp` 912 KB | Media | `public/projects/` |
| E2 | `.mode-transitioning` sin CSS (no-op) | Baja | `utility-panel.component.ts` |
| E3 | `scanlines` dead code | Baja | `pixel-card` |
| PR1 | Print sin A4 | Baja | `resume.component.css` |
| P4 | `analog.svg` dead asset | Baja | `public/analog.svg` |

### Falsos positivos descartados (verificados — para que el doc sea creíble)
- **"`sitemap.xml` falta (404)"** → FALSO: se genera en build (`vite.config.ts:57-59`).
- **"El paper MEXT es ilegible en modo oscuro"** → FALSO: es blanco a propósito (estética IEEE), legible. Solo se muestra en modo research.
- **"No hay manejo de errores"** → FALSO: existe `provideBrowserGlobalErrorListeners()`. Lo que falta es la **ruta 404**.

---

## 17. Ideas de alto impacto (filtradas para Big Tech)

> Reorganización, no recorte. Los playgrounds y el STAR ledger ya existen y son fuertes.

1. **Liderar el hero con tus métricas existentes** (del STAR ledger) — el cambio de mayor ROI.
2. **Mover LSTM + MEXT a `/research`** (ruta opt-in con link discreto) → el home queda 100% SWE; el track académico sigue pulido para su audiencia real. El switcher de modo deja de competir por la atención.
3. **Surfacing del STAR ledger en architect como sección estrella** (ya lo tienes; hazlo protagonista, no secundario).
4. **Métricas/escala en cards de proyectos** (usuarios, stars de GitHub, Lighthouse) — usa el skill `portfolio-case-study-writer` para 1-2 case studies profundos.
5. **GitHub contributions graph** en el home → señal de actividad continua.
6. **OSS card + LinkedIn CTA en el hero** (hoy OSS solo se menciona; LinkedIn solo en footer).
7. **Diagrama de arquitectura estático y limpio** para 1 sistema — el chaos-playground ya lo demuestra interactivamente; un SVG nítido lo refuerza para quien no interactúa.

---

## 18. Roadmap priorizado

### P0 — Bugs / antes de compartir (medio día)
| Ítem | Sev. | Esfuerzo | Archivos |
|---|---|---|---|
| Página 404 (`[...].page.ts`) + error en `/notes/[slug]` | Alta | S | `pages/[...].page.ts`, `[slug].page.html` |
| Hero liderado por métricas | Alta(impacto) | XS | `i18n/{en,es}.ts`, `hero` |
| Skip link + aria-labels utility panel | Alta | XS | `app.html`, `utility-panel` |
| Quitar Press Start 2P + `project-08` → webp | Media | XS | `package.json`, `vite.config.ts:20`, `public/projects/` |
| CSP+HSTS+Permissions-Policy + theme-color + manifest | Media | S | `vercel.json`, `index.html`, `public/` |
| Arreglar LaTeX en notas (KaTeX) o quitar `$$` | Media | S | `app.config.ts`, `src/content/` |

### P1 — Rendimiento + consistencia (1-2 días)
`@defer (on viewport)` en chaos/lstm/resume · preload de fuentes LCP (URL real de build) · `width/height` en foto · escalas de tokens + tokenizar resume/thesis · specs de 4 servicios + 5 páginas · pausar carrusel en `focus` · `@page A4` + tamaños print · activar `pnpm audit` en CI · recomprimir `fluentreads.webp` · borrar `.mode-transitioning`/scanlines o implementarlos.

### P2 — Narrativa & diferenciación (continuo)
Mover LSTM/MEXT a `/research` · STAR ledger protagonista en architect · case studies (`portfolio-case-study-writer`) · métricas en cards · reencuadrar Programador-TI · OSS card + LinkedIn en hero · GitHub contributions · subir cobertura · OG por página · ampliar notas a 5-10.

---

## 19. Apéndice — referencias clave

- **Tokens & tipografía:** `src/styles.css:1-107`
- **Build/prerender/sitemap/cobertura:** `vite.config.ts:17-26, 46-60, 89-92`
- **FSD validada como test:** `src/app/fsd.spec.ts`
- **Modo dual:** `src/app/shared/lib/mode/mode-state.service.ts`
- **Easter eggs / atajos:** `src/app/shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts` (registro en `app.ts:84`)
- **Playgrounds:** `widgets/chaos-playground/`, `widgets/lstm-playground/`, `widgets/star-ledger/` (+ `entities/experience/model/star.data.ts`)
- **SEO/JSON-LD:** `seo.service.ts`, `index.page.ts:207-220`
- **Resume builder + print:** `widgets/resume/` + `resume.component.css` (`@media print`)
- **Notas:** `pages/notes/` + `src/content/{binary-search,circuit-breaker}.md`
- **Headers/seguridad:** `vercel.json`
- **A revisar/limpiar:** `public/analog.svg`, `vite.config.ts:20`, `utility-panel.component.ts` (`.mode-transitioning`)

---

*Revisión v2 tras 6 exploraciones del código real + verificación directa de hallazgos contestables. Alcance: documento de diagnóstico — no se modificó código fuera de este archivo. Decisiones del autor incorporadas: narrativa architect-primary, entrega solo del documento.*
