# Task 13 — Convención de páginas: extraer template inline (P2 · Convención)

> **Branch:** `chore/page-template-convention` · **Esfuerzo:** XS · **Ref:** [00-resumen § roadmap P2.16](../review-2026-07/00-resumen.md)

## Problema

CLAUDE.md prohíbe `template:`/`styles:` inline en el decorador `@Component` — "cada componente vive en su propio directorio con cuatro archivos separados". 7 páginas violan esto:

```
src/app/pages/about.page.ts
src/app/pages/experience.page.ts
src/app/pages/index.page.ts
src/app/pages/projects.page.ts
src/app/pages/research.page.ts
src/app/pages/resume.page.ts
src/app/pages/skills.page.ts
```

Todas ya tienen su `.page.spec.ts`; ninguna tiene `styles:` inline (solo Tailwind utility classes), así que solo hace falta extraer el `template`.

## Checklist

- [x] Para cada una de las 7 páginas: mover el contenido de `template: \`...\`` a un archivo `<nombre>.page.html` nuevo, y cambiar `template: ...` por `templateUrl: './<nombre>.page.html'` en el decorador.
- [x] No crear `.page.css` vacíos — ninguna de las 7 tiene `styles:` hoy, así que no hace falta `styleUrl`.
- [x] Verificar que ninguna referencia relativa dentro del template (rutas de imágenes, etc.) se rompió al mover el archivo (no debería, ya que Vite resuelve `templateUrl` relativo al mismo directorio).

## Criterios de aceptación

- [x] `grep -rn "template: \`" src/app/pages` → 0 resultados.
- [x] `pnpm build` en verde; las 11 páginas renderizan igual (verificado por specs existentes, sin cambios de comportamiento).
- [x] `pnpm test -- --run` en verde sin tocar ningún spec (los specs no dependen del origen del template).

**PR:** [#148](https://github.com/sandovaldavid/portfolio/pull/148)
