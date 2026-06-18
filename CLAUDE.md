# CLAUDE.md — Project Context for Claude Code

This file gives Claude Code context about this project so future sessions start with full awareness of conventions, architecture, and workflows.

## Project Overview

Personal portfolio of David Sandoval (sandovaldavid), Software Engineer.

- **URL**: https://devsandoval.me
- **Repo**: https://github.com/sandovaldavid/portfolio
- **Framework**: Angular 21 + Analog (SSR/SSG meta-framework)
- **Build**: Vite 7
- **Deployment**: Vercel (preview on develop, production on main)

## Architecture: Feature-Sliced Design (FSD)

```
src/app/
├── shared/       # Cross-cutting: pipes, directives, types, ui primitives
├── entities/     # Domain models + their UI: project, experience, technology
├── features/     # User interactions: language-picker, mode-switcher, utility-panel
├── widgets/      # Page sections (composed of entities + features): navbar, hero, footer
└── pages/        # Route-level components (Analog file-based routing)
```

**FSD dependency rule**: layers can only import from layers below them.
```
pages → widgets → features → entities → shared
```

Never import "upward" (e.g. shared must not import from features).

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Angular | 21 | Framework |
| Analog | 2.x | SSR/SSG + file-based routing |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Styling |
| TypeScript | ~5.9 | Language |
| Vitest | 4 | Unit tests |
| Playwright | 1.x | E2E tests |
| Lighthouse CI | 1.x | Performance audits |
| pnpm | 11.7.0 | Package manager |
| Husky | 9 | Git hooks |
| Commitlint | 20 | Commit validation |

## Path Aliases

```typescript
@shared/*   → src/app/shared/*
@entities/* → src/app/entities/*
@features/* → src/app/features/*
@widgets/*  → src/app/widgets/*
```

## Coding Conventions

### Angular Components

Always use standalone components with signals:

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `...`,
})
export class ExampleComponent {
  title = input.required<string>();
  clicked = output<void>();
}
```

- `input()` / `input.required()` over `@Input()`
- `output()` over `@Output()`
- `OnPush` change detection always
- No constructor DI — use `inject()` function
- No `ngOnInit` when signals cover reactivity

### Commit Format

```
<type>(<scope>): <subject under 50 chars>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `arch`, `config`, `lint`

Example: `feat(hero): add animated typing effect`

### File Naming

- Components: `name.component.ts`
- Services: `name.service.ts`
- Specs: `name.component.spec.ts`
- Selectors: `app-name` (kebab-case with `app` prefix)

## Testing Requirements

Every new piece of code must have a corresponding test. Requirements by type:

### New Component (entity/feature/widget)

Required spec file at `*.component.spec.ts`:

```typescript
describe('ComponentName', () => {
  it('should render [key visual element]', ...)
  it('should emit [event] when [action]', ...)   // if has outputs
  it('should apply [class] when [input] is [value]', ...) // if has conditional styles
})
```

Minimum: 1 render test + 1 test per `output()`.

### New Service / Lib function

Required spec file at `*.spec.ts`:

```typescript
describe('ServiceName', () => {
  it('should [main behavior]', ...)
  it('should handle [edge case]', ...)
})
```

Minimum: 1 happy-path + 1 edge case.

### New Page

Required spec at `*.page.spec.ts`:

```typescript
describe('PageName', () => {
  it('should render [main content area]', ...)
  it('should [key interaction]', ...)
})
```

### E2E Coverage (Playwright)

New routes must be added to `e2e/navigation.spec.ts`.
New interactive features (forms, modals, etc.) need their own `e2e/*.spec.ts`.

## Workflows

### Development

```bash
pnpm dev          # start dev server on :5173
pnpm test         # unit tests (watch)
pnpm test:e2e     # E2E tests
pnpm lint         # ESLint
pnpm format       # Prettier
```

### Before every commit (enforced by Husky)

1. `pnpm lint` — must pass
2. `pnpm test -- --run` — all unit tests must pass

### CI pipeline on PR

1. quality-checks (lint, format, typecheck, test, security audit)
2. build check + bundle size report
3. E2E tests (Playwright, 5 platforms)
4. Lighthouse audit (Performance ≥ 80%, A11y ≥ 90%)
5. CodeQL security scan

### Deploying

- Push to `develop` → Vercel preview URL (automated)
- PR from `develop` → `main` only (branch-guard enforced)
- Push to `main` → Vercel production (automated)

## Content & i18n

Content lives in `src/content/` as markdown files.
The site is bilingual (ES/EN). When adding text content, always add both language versions.

## Performance Budgets

Vite is configured with `chunkSizeWarningLimit: 500` (KB).
Manual chunks split: `vendor` (Angular core) and `fonts`.
Lighthouse CI thresholds: Performance ≥ 80%, A11y ≥ 90%, SEO ≥ 90%, BP ≥ 85%.

## Reports Dashboard

Auto-published to GitHub Pages on every push to main/develop:
- https://sandovaldavid.github.io/portfolio/

## Secrets Required (GitHub)

| Secret | Purpose |
|--------|---------|
| `VERCEL_TOKEN` | Vercel deploy |
| `VERCEL_ORG_ID` | Vercel org |
| `VERCEL_PROJECT_ID` | Vercel project |
| `CODECOV_TOKEN` | Coverage upload (optional) |

## Known Issues / Constraints

- `window.scrollTo` is not implemented in jsdom — expected warning in unit tests
- Angular animations deprecation warning from v22 — tracking upstream
- Pre-commit hook runs full test suite, can be slow (~15s)

## What NOT to do

- Do not import from a higher FSD layer (e.g. shared importing from features)
- Do not use `any` type — use `unknown` and narrow
- Do not add `console.log` in production code
- Do not skip pre-commit hooks with `--no-verify` without good reason
- Do not commit directly to `main`
- Do not add dependencies to `dependencies` if they are only used at build/test time
