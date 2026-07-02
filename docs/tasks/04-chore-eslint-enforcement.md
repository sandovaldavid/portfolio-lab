# Task 04 — Enforcement de convenciones en ESLint (P1 · Calidad)

> **Branch:** `chore/eslint-conventions` · **Esfuerzo:** S (~2-3 h) · **Ref:** [review § calidad C6](../review-2026-07/02-calidad-codigo.md) y [§ seguridad](../review-2026-07/01-seguridad.md)
> **Depende de:** Task 06 (borrar `analog-welcome.ts` primero evita falsos errores masivos).

## Problema

Las reglas de CLAUDE.md ("no `any`", "no `console.log`", fronteras FSD) se cumplen hoy por disciplina, no por tooling: `eslint.config.js:16-42` solo valida selectores. La única red para FSD es `fsd.spec.ts`.

## Checklist

- [x] Añadir a `eslint.config.js` (bloque `**/*.ts`):
  ```js
  'no-console': ['error', { allow: ['warn', 'error'] }],
  '@typescript-eslint/no-explicit-any': 'error',
  ```
- [x] Excepción consciente para el easter egg: override de `no-console` solo para `keyboard-shortcuts.ts` (más simple que 5 disables inline).
- [x] Fronteras FSD como lint (además del spec), vía `no-restricted-imports` por capa (overrides por glob):
  - `src/app/shared/**` no puede importar `@entities/*`, `@features/*`, `@widgets/*`
  - `src/app/entities/**` no puede importar `@features/*`, `@widgets/*`
  - `src/app/features/**` no puede importar `@widgets/*`
- [x] Ampliar el scope del lint: `package.json:19` `"lint": "eslint src"` → `"eslint src e2e vite.config.ts playwright.config.ts"`. Esto sacó a la luz un `mode` sin usar en `vite.config.ts` (eliminado).
- [x] `.husky/pre-commit`: cambiar `pnpm test` → `pnpm test -- --run`.

## Criterios de aceptación

- [x] `pnpm lint` en verde tras los ajustes (con las excepciones documentadas).
- [x] Prueba negativa: un archivo de prueba con `console.log`, `any`, e import de `@widgets` dentro de `shared/` — las 3 reglas lo marcaron correctamente (verificado y eliminado después).
- [x] `git commit` de prueba: el hook con `--run` corrió y terminó solo.

**PR:** [#142](https://github.com/sandovaldavid/portfolio/pull/142)
