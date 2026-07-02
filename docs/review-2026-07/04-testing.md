# Revisión 2026-07 — Testing

> Estado: **50 archivos `*.spec.ts`** vs 32 componentes. Todas las páginas y componentes tienen spec (gran avance desde junio: se cerraron los specs de los 4 servicios y 5 páginas pendientes). Coverage thresholds al 50% (`vite.config.ts:152-155`).

## Hallazgos

### T1 — E2E desactualizado: faltan las rutas nuevas (Alta)

`e2e/navigation.spec.ts:4-11` solo cubre `/`, `/about`, `/projects`, `/experience`, `/skills`, `/notes`. Faltan:

- `/research` (añadida en #104)
- `/resume` (añadida en 1.1.0)
- `/projects/[slug]` — al menos 1 case study (p. ej. `/projects/auctions`)
- `/notes/[slug]` — al menos 1 nota (valida KaTeX + prism en runtime)

`CLAUDE.md` exige explícitamente añadir rutas nuevas a `navigation.spec.ts`; se incumplió en #104 y siguientes. Esto significa que **las rutas nuevas no pasan por axe-core (WCAG 2AA) ni por el check de responsividad** en CI.

Nota: el check de responsividad (375/768/1280) solo evalúa `/` — considerar iterar sobre todas las rutas.

### T2 — Server routes sin ningún test (Media)

Cero cobertura para los 5 handlers de `src/server/routes/`:

- `api/v1/og-image.ts` (200 líneas — el más complejo, genera OG con satori)
- `api/v1/github-contributions.ts` (proxy externo — merece test de error handling)
- `obsidian-sync.ts` (**crítico**: el test de "rechaza sin secret" habría atrapado el fail-open S1)
- `diagnostics.ts`, `api/v1/hello.ts`

### T3 — Specs faltantes en src/app (Baja)

- `shared/lib/i18n/translate.pipe.ts` (pipe sin spec)
- `shared/lib/keyboard-shortcuts/keyboard-shortcuts.ts` (el servicio más grande del shared, 212 líneas, sin spec)
- `shared/lib/font-scale/font-scale.ts`
- `pages/analog-welcome.ts` (mejor: borrarlo — ver [02-calidad-codigo § C2](02-calidad-codigo.md))

### T4 — Pre-commit hook corre vitest en watch mode (Baja)

Ver [03-ci-cd § CI6](03-ci-cd.md): `.husky/pre-commit` usa `pnpm test` sin `--run`.

### T5 — Coverage threshold en 50% (Baja)

Con los specs nuevos, probablemente la cobertura real ya supera el umbral con margen. Medir (`pnpm test -- --run --coverage`) y subir a 70% para que el threshold vuelva a proteger algo — era la recomendación A3 de junio, aún aplicable.

### T6 — Reglas de axe deshabilitadas con comentario obsoleto (Baja)

`e2e/navigation.spec.ts:50-53` deshabilita `color-contrast` con la justificación "NES/pixel dark theme uses low-contrast as a design aesthetic" — **ese diseño ya no existe** (el tema NES fue reemplazado por el Double Agent hace meses) y el contraste se corrigió en #97. Probar a re-habilitar `color-contrast`; mantener `nested-interactive` solo si el skill-graph SVG sigue sin rediseñarse.

## Lo que está bien ✅

- FSD validada como test (`src/app/fsd.spec.ts`).
- Specs de páginas y servicios completos (#94, #97) — el gap principal de junio, cerrado.
- `src/test-setup.ts` con Analog testbed + ng-mocks/vitest bien cableado.
- E2E con axe-core WCAG 2A/2AA + navegación + links rotos + teclado — la estructura es buena; solo está desactualizada la lista de rutas.
