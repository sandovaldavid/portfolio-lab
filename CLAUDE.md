# CLAUDE.md — Project Context for Claude Code

This file gives Claude Code context about this project so future sessions start with full awareness of conventions, architecture, and workflows.

## Project Overview

Personal portfolio of David Sandoval (sandovaldavid), Software Engineer.

- **URL**: https://devsandoval.me
- **Repo**: https://github.com/sandovaldavid/portfolio
- **Framework**: Angular 22 + Analog (SSR/SSG meta-framework)
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
| Angular | 22 | Framework |
| Analog | 2.x | SSR/SSG + file-based routing |
| Vite | 7 | Build tool |
| Tailwind CSS | 4 | Styling |
| TypeScript | ~6.0 | Language |
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

Every component must live in its own directory with four separate files — never inline template or styles in the decorator:

```
widgets/my-widget/
├── my-widget.component.ts      # Class + @Component metadata only
├── my-widget.component.html    # Template
├── my-widget.component.css     # Styles
└── my-widget.component.spec.ts # Unit tests
```

Generate with Angular CLI (always from the project root):

```bash
ng generate component widgets/my-widget --standalone --change-detection OnPush
# or the shorthand:
ng g c widgets/my-widget --standalone --change-detection OnPush
```

The `.ts` file must use `templateUrl` and `styleUrl` — never `template` or `styles`:

```typescript
@Component({
  selector: 'app-my-widget',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './my-widget.component.html',
  styleUrl: './my-widget.component.css',
})
export class MyWidgetComponent {
  title = input.required<string>();
  clicked = output<void>();
}
```

Additional rules:
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

Every component produces exactly four files — no exceptions:

| File | Purpose |
|------|---------|
| `name.component.ts` | Class declaration, `@Component` metadata (`templateUrl`, `styleUrl`) |
| `name.component.html` | Template markup |
| `name.component.css` | Component styles |
| `name.component.spec.ts` | Unit tests |

Other conventions:
- Services: `name.service.ts` + `name.service.spec.ts`
- Selectors: `app-name` (kebab-case with `app` prefix)
- Inline `template:` or `styles:` in `@Component` are **not allowed**

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

## Branch Strategy

**Always branch from `develop`. Never from `main`.**

### Branch naming

```
feat/<short-description>     New feature
fix/<short-description>      Bug fix
refactor/<description>       Refactoring without behavior change
docs/<description>           Documentation only
ci/<description>             CI/CD or tooling changes
chore/<description>          Dependencies, config, housekeeping
```

Examples:
```
feat/dark-mode-toggle
fix/navbar-overflow-mobile
refactor/hero-component-signals
docs/update-readme-scripts
ci/add-codeql-workflow
```

### Flow

```
develop  →  feat/your-feature  →  PR to develop  →  merge  →  PR to main  →  production
```

Rules enforced by GitHub Rulesets and CI:
- All PRs (features, fixes, etc.) target `develop`
- Only `develop` → `main` PRs are allowed
- `develop` push → Vercel preview URL
- `main` push → Vercel production (devsandoval.me)
- Never commit directly to `main` or `develop` (protected via branch rulesets)

### Starting a new task

```bash
git checkout develop
git pull origin develop
git checkout -b feat/your-feature-name
# ... work ...
git push origin feat/your-feature-name
# Open PR → develop on GitHub
```

## Workflows

### Development

```bash
pnpm dev          # start dev server on :5173
pnpm test         # unit tests (watch)
pnpm test:e2e     # E2E tests (needs server running separately)
pnpm lint         # ESLint
pnpm format       # Prettier
```

### Before every commit (enforced by Husky)

1. `pnpm lint` — must pass
2. `pnpm test -- --run` — all unit tests must pass

### CI pipeline on PR (develop and main)

1. quality-checks (lint, format, typecheck, unit tests, security audit)
2. build check + bundle size report
3. E2E tests — Playwright chromium only, runs against production build on :3000
   - Navigation: all routes load without errors
   - Accessibility: axe-core WCAG 2AA on every page
   - Responsiveness: no horizontal overflow at 375/768/1280px
4. Lighthouse audit (Performance ≥ 80%, A11y ≥ 90%, SEO ≥ 90%, BP ≥ 85%)

Note: the CodeQL workflow was removed (commit `c8fc00f5`); there is currently no static security scan in CI.

### Deploying

- Push to `develop` → Vercel preview URL (automated via deploy.yml)
- PR from `develop` → `main` only
- Push to `main` → Vercel production (automated via deploy.yml)

## Documentation

- `docs/README.md` — index of all docs and folder conventions.
- `docs/arquitectura_actual.md` — **living reference** of the implemented system; update it in the same PR that adds/removes pages, widgets, or server routes.
- `docs/review-2026-07/` — latest full review (findings per characteristic + feature feedback).
- `docs/tasks/` — actionable task breakdown from the review: 1 file = 1 branch = 1 PR to develop; check off items and note the PR number when done.
- Obsolete docs get deleted (git history is the archive), not kept with banners.

## Content & i18n

Content lives in `src/content/` as markdown files.
The site is bilingual (ES/EN). When adding text content, always add both language versions.

## Performance Budgets

Vite is configured with `chunkSizeWarningLimit: 500` (KB).
Manual chunks split: `vendor` (Angular core) and `fonts`.
Lighthouse CI thresholds: Performance ≥ 80%, A11y ≥ 90%, SEO ≥ 90%, BP ≥ 85%.

## Reports Dashboard

Reports (coverage, E2E, Lighthouse) are stored as GitHub Actions artifacts.
Access: Actions tab → select any run → Artifacts → download `reports-<branch>-<run>`.
(The old `publish-reports.yml` GitHub Pages workflow was removed in #120.)

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
