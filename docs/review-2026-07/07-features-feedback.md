# Revisión 2026-07 — Feedback e ideas por feature

> Opinión de producto/ingeniería sobre cada feature implementada: qué funciona, y 2-4 ideas concretas para llevarla más lejos. Complementa los hallazgos técnicos de los docs 01-06 (esto no son bugs, son oportunidades).

## Hero con métricas (`widgets/hero`)

**Bien:** el cambio de typewriter genérico a métricas reales (#83) fue el fix de mayor ROI de la revisión de junio — el primer viewport ahora dice "ingeniero de rendimiento con números", no "otro dev Angular". OSS card + LinkedIn CTA (#105) cierran el loop de contacto.

**Ideas:**
1. Cada métrica del typewriter podría ser **clickeable** → scroll/link a la entrada del STAR ledger que la respalda. Métrica → evidencia en un clic es narrativa senior.
2. El typewriter aún usa `ngOnInit` y no reacciona al idioma (task 07); al migrarlo a `effect()`, considerar pausarlo tras 2 ciclos completos — el movimiento perpetuo compite con los CTAs.
3. A/B mental: probar la variante estática (las 3 métricas visibles a la vez, sin animación) — los reclutadores escanean, no esperan.

## STAR Ledger (`widgets/star-ledger`)

**Bien:** protagonista en el home architect (#102), 6 logros cuantificados con snippets — sigue siendo el activo más valioso del portafolio para Big Tech.

**Ideas:**
1. Añadir **enlace por entrada al case study o PR/repo** que la respalda (cuando exista) — cerrar el ciclo afirmación → evidencia.
2. Un filtro por competencia (performance / arquitectura / testing) mapearía las entradas a los ejes típicos de un loop de entrevistas.
3. Exportar las entradas STAR al resume builder (formato Harvard las pide tal cual) — hoy son dos fuentes de datos separadas; unificar en `entities/experience`.

## Chaos Playground (`widgets/chaos-playground`)

**Bien:** demuestra diseño tolerante a fallos con narrativa real (Polly, circuit breaker, Redis, DLQ de Azure Service Bus). Es lo que un reviewer senior recuerda.

**Ideas:**
1. **Modo "guided tour"**: un botón "run scenario" que inyecte la secuencia completa (healthy → degraded → circuit open → recovery) narrada paso a paso — hoy requiere que el visitante sepa qué tocar.
2. Mostrar un **log de eventos** estilo terminal (timestamps + acción del breaker) durante la simulación: refuerza la sensación de sistema real y es contenido copy-pasteable en entrevistas.
3. Un permalink con estado (`?fail=redis`) para compartir un escenario específico en conversaciones/posts.

## LSTM Playground (`widgets/lstm-playground`) + MEXT pitch (`/research`)

**Bien:** matemática correcta, diagnóstico de gradiente, y la decisión de moverlo a `/research` (#104) mantiene el home 100% SWE sin sacrificar el track académico.

**Ideas:**
1. Un **preset de secuencia** (p. ej. "recordar el token 20 pasos atrás") con animación de los gates en el tiempo mostraría *por qué* la celda evita el vanishing gradient, no solo que lo evita.
2. Enlazar cada slider a la ecuación correspondiente resaltada en KaTeX (hover → highlight) — conecta lo interactivo con lo formal, exactamente lo que evalúa un comité académico.
3. `/research` merece su propia OG image (académica, estilo paper) si no la tiene ya — la audiencia MEXT llegará por link directo.

## Resume Builder (`widgets/resume`, `/resume`)

**Bien:** 3 estilos (Modern/Harvard/ATS), toggles persistidos, print A4 con estilos completos (#92, #100) — feature única entre portafolios.

**Ideas:**
1. **Botón "Download PDF"** explícito (invoca `window.print()` con hint del nombre de archivo) — hoy el visitante tiene que saber imprimir; un reclutador quiere el PDF en un clic.
2. Sincronizar contenido con `entities/experience` + STAR ledger (ver ídem arriba) para que el resume nunca se desactualice respecto al sitio.
3. Query param de estado (`/resume?style=ats&lang=en`) para enviar un link que abra la variante exacta que quieres que vean.
4. El widget ya carga con `@defer (on viewport)` (1.8.1) ✅ — verificar que el print no dependa de que el defer haya disparado (imprimir sin scroll previo).

## Notas / TIL (`/notes`, `src/content/`)

**Bien:** de 2 a 12 notas (#124), KaTeX (#87), reading time (#126), estado de error en `[slug]` (#82), OG por nota. El sistema pasó de "plantilla" a "producción".

**Ideas:**
1. **Notas relacionadas** al pie (por tags compartidos) — con 12 notas ya hay grafo suficiente y retiene al visitante técnico.
2. Feed RSS/Atom (`/notes/feed.xml` generado en build) — la audiencia de TIL técnicos vive en lectores RSS.
3. Serie "system design en producción" conectando notas con el chaos playground (la nota de circuit-breaker ya existe: enlazarla desde el playground y viceversa).

## Case Studies (`/projects/[slug]`, `content/case-studies/`)

**Bien:** 4 estudios con páginas de detalle (#113) + métricas y Lighthouse scores en las cards (#106).

**Ideas:**
1. Son el contenido SEO más valioso y hoy están **fuera del sitemap** — task 03 es prioritaria por esto.
2. Estructura consistente tipo STAR en los 4 (Contexto → Problema → Decisiones → Resultados con números) si aún no la tienen; el skill `portfolio-case-study-writer` está pensado para esto.
3. Añadir un diagrama de arquitectura estático (SVG limpio) por case study — la idea 7 de la revisión de junio sigue abierta y encaja aquí.

## GitHub Contributions (`widgets/github-contributions` + `api/v1/github-contributions`)

**Bien:** señal de actividad continua en el home (#107) con proxy propio (sin exponer tokens).

**Ideas:**
1. Cachear la respuesta del proxy (1-6 h) — hoy cada visita paga la llamada al upstream; con Vercel basta `Cache-Control: s-maxage`.
2. Estado de fallback elegante si GitHub no responde (skeleton → ocultar sección, nunca un hueco roto).
3. Tooltip con el detalle del día (n contribuciones) si no lo tiene — es lo primero que la gente intenta hacer con un heatmap.

## Modo dual Architect/Research + CRT curtain (`shared/lib/mode`, `features/utility-panel`)

**Bien:** la decisión architect-primary quedó bien ejecutada — home multiplexado (#112), curtain CRT implementada de verdad (#111), académico opt-in en `/research`.

**Ideas:**
1. Persistir el modo elegido ya ocurre; considerar **deep-link** (`?mode=research`) para compartir la vista académica directamente con el comité MEXT.
2. Medir (analytics de privacidad amigable, p. ej. contador propio) cuánta gente descubre el modo research — dato para decidir cuánto invertir ahí.
3. El terminal switcher es memorable; un hint sutil de descubrimiento la primera visita (pulso en el icono, una vez) aumentaría su descubribilidad sin ser intrusivo.

## i18n ES/EN (`shared/lib/i18n`)

**Bien:** diccionarios completos, pipe + servicio con signals, hreflang.

**Ideas:**
1. El bug de SEO no reactivo al idioma es task 07 — es la mejora principal de esta capa.
2. Test de paridad de diccionarios: un spec que falle si `en.ts` y `es.ts` divergen en claves — barato y evita traducciones olvidadas.
3. Detectar idioma preferido del navegador en primera visita (`navigator.language`) como default, con el picker como override persistido.

## Keyboard shortcuts / Easter eggs (`shared/lib/keyboard-shortcuts`)

**Bien:** navegación Vim completa, modal `?`, `runDiagnostics()` con boot message — cleanup vía DestroyRef arreglado (#129).

**Ideas:**
1. Corregir los datos falsos del diagnostics (task 06) — el easter egg pierde su gracia si el reviewer nota que la versión de Angular es inventada.
2. La lista de rutas para `h/l` sigue hardcodeada (`keyboard-shortcuts.ts:179`, hallazgo E1 de junio aún abierto): derivarla del router o de una constante compartida con navbar.
3. Un easter egg más orientado a reclutadores: `hire` escrito en cualquier parte → abre el mail/LinkedIn con un mensaje pre-armado. Bajo esfuerzo, alta memorabilidad.
