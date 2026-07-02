# Task 04 — Enforcement de convenciones en ESLint (P1 · Calidad)

> **Branch:** `chore/eslint-conventions` · **Esfuerzo:** S (~2-3 h) · **Ref:** [review § calidad C6](../review-2026-07/02-calidad-codigo.md) y [§ seguridad](../review-2026-07/01-seguridad.md)
> **Depende de:** Task 06 (borrar `analog-welcome.ts` primero evita falsos errores masivos).

## Problema

Las reglas de CLAUDE.md ("no `any`", "no `console.log`", fronteras FSD) se cumplen hoy por disciplina, no por tooling: `eslint.config.js:16-42` solo valida selectores. La única red para FSD es `fsd.spec.ts`.

## Checklist

- [ ] Añadir a `eslint.config.js` (bloque `**/*.ts`):
  ```js
  'no-console': ['error', { allow: ['warn', 'error'] }],
  '@typescript-eslint/no-explicit-any': 'error',
  ```
- [ ] Excepción consciente para el easter egg: `// eslint-disable-next-line no-console` en las 5 llamadas de `keyboard-shortcuts.ts:65-75` (son intencionales), o permitir `console.log` solo en ese archivo vía override.
- [ ] Fronteras FSD como lint (además del spec). Opción ligera con `no-restricted-imports` por capa (overrides por glob):
  - `src/app/shared/**` no puede importar `@entities/*`, `@features/*`, `@widgets/*`
  - `src/app/entities/**` no puede importar `@features/*`, `@widgets/*`
  - `src/app/features/**` no puede importar `@widgets/*`
  (Alternativa más completa: `eslint-plugin-boundaries`.)
- [ ] Ampliar el scope del lint: `package.json:19` `"lint": "eslint src"` → incluir `e2e`, `vite.config.ts`, `playwright.config.ts` (añadir tsconfig/parserOptions según haga falta).
- [ ] `.husky/pre-commit`: cambiar `pnpm test` → `pnpm test -- --run` (hoy arranca vitest en watch mode dentro del hook; CLAUDE.md y `.release-it.json` ya asumen `--run`).

## Criterios de aceptación

- `pnpm lint` en verde tras los ajustes (con las excepciones documentadas).
- Prueba negativa: un `console.log` o un import de `@widgets` dentro de `shared/` hace fallar el lint.
- `git commit` de prueba: el hook termina solo (sin quedarse en watch).
