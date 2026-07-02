# Task 08 — Tests de server routes + subir cobertura (P2 · Testing)

> **Branch:** `test/server-routes-coverage` · **Esfuerzo:** M (~medio día) · **Ref:** [review § testing T2, T5, T6](../review-2026-07/04-testing.md)
> **Depende de:** Task 01 (el spec de obsidian-sync valida el fix del fail-open).

## Problema

Los 5 handlers de `src/server/routes/` tienen **cero cobertura** — incluido `og-image.ts` (200 líneas, el más complejo) y `github-contributions.ts` (llamada a servicio externo sin tests de error). El threshold de cobertura (50%) probablemente ya no protege nada tras los specs añadidos en #94/#97.

## Checklist

### Specs de server routes (h3 handlers — testear con `unenv`/mocks de `defineEventHandler` o extrayendo la lógica pura)
- [x] `api/v1/og-image.ts`: `truncate`/`buildElement`/`loadFont` exportados como funciones puras y testeados directo; handler completo con `satori`/`@resvg/resvg-js`/`fs` mockeados (params válidos, params faltantes, headers). También corrigió `noPropertyAccessFromIndexSignature` en el objeto `query` (mismo patrón que Task 01).
- [x] `api/v1/github-contributions.ts`: happy path (mock del fetch), cache-hit sin re-fetch, upstream caído → error controlado. Requirió agregar el import explícito de `createError` desde `h3` — el archivo dependía del auto-import de Nitro en build, que no existe al cargar el módulo directo en Vitest.
- [x] `obsidian-sync.ts`: ya cubierto por Task 01, verificado en verde.
- [x] `diagnostics.ts`: shape del reporte; delay solo con el query param (fake timers, sin esperar 1.5s reales).
- [x] `api/v1/hello.ts`: eliminado — scaffolding sin ninguna referencia en el resto de la app.

### Cobertura y axe
- [x] Cobertura medida: 81.35% statements / 62.67% branches / 82.88% functions / 81.76% lines.
- [x] Thresholds subidos en `vite.config.ts` a 75/60/75/75 (branches quedó en 60, no 70, porque el número real medido es 62.67% — el resto sí superan 70 con margen).
- [x] `color-contrast` re-evaluado: sigue fallando de forma amplia (ratios ~1.05:1 en varias tarjetas/CTAs de `/projects`, `/skills`, `/experience`) — el comentario que decía que se arregló en #97 estaba desactualizado. Se mantiene el disable, con el comentario reescrito para documentar el estado real en vez de un falso "ya arreglado".

## Criterios de aceptación

- [x] 5 specs de server routes en verde (4 + `hello.ts` eliminado).
- [x] `pnpm test:coverage` pasa con los thresholds ajustados (75/60/75/75).
- [x] E2E en verde con `color-contrast` documentado (no reactivado — sigue fallando, ver arriba).

## Hallazgo no relacionado (arreglado en este mismo PR)

`github-contributions.spec.ts` usaba `vi.resetModules()` para aislar la caché en memoria entre sus propios tests. Bajo poca concurrencia de CI (reproducido localmente fijando el proceso a 2 CPUs) esto corrompía el estado compartido del compilador JIT de Angular para **otros** archivos de spec que compartían el mismo worker, causando fallos masivos no relacionados (`TestBed.initTestEnvironment() first`, `Cannot read properties of null (reading 'ngModule')`). Arreglado reemplazándolo por un specifier de import con cache-busting, que da una instancia de módulo fresca sin tocar el registro de módulos compartido.

**PR:** [#143](https://github.com/sandovaldavid/portfolio/pull/143)
