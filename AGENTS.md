# AGENTS.md — Guide for AI Coding Agents

Instructions for any AI coding agent working on this repository. Follow these rules exactly — most of them are enforced by tests, git hooks, or CI.

> Keep this file in sync with `CLAUDE.md` when conventions change (they are maintained independently).

## Project Snapshot

Personal portfolio of David Sandoval — https://devsandoval.me

| | |
|---|---|
| Framework | Angular 22 + Analog 2.x (SSR/SSG meta-framework, file-based routing) |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 (CSS-first, tokens in `src/styles.css` — no `tailwind.config.js`) |
| Language | TypeScript ~6.0 (strict) |
| Tests | Vitest 4 (unit) + Playwright (E2E, axe-core a11y) |
| Package manager | pnpm (never npm/yarn) |
| Deploy | Vercel — `develop` = preview, `main` = production |

## Setup & Commands

```bash
pnpm install              # install deps (Node >= 22)
pnpm dev                  # dev server on http://localhost:5173
pnpm test -- --run        # unit tests, single run (plain `pnpm test` = watch mode)
pnpm test:coverage        # unit tests + coverage report
pnpm test:e2e             # Playwright E2E (needs a running server)
pnpm lint                 # ESLint
pnpm format               # Prettier write; format:check to verify
pnpm build                # production build → dist/ (client + server + prerender)
```

Pre-commit hook (Husky) runs `pnpm lint` + the full unit test suite (~15s). Do not bypass it with `--no-verify`.

## Architecture: Feature-Sliced Design (FSD)

```
src/app/
├── shared/     # config/ (contact, i18n dictionaries) · lib/ (i18n, seo, mode, theme,
│               # font-scale, keyboard-shortcuts, animation) · ui/ (primitives)
├── entities/   # domain models + their UI: education, experience, project, technology
├── features/   # user interactions: language-picker, mode-switcher, utility-panel
├── widgets/    # page sections: hero, navbar, footer, star-ledger, chaos-playground, ...
└── pages/      # route components (Analog file-based routing: name.page.ts)
src/server/routes/   # Nitro API handlers (og-image, github-contributions, ...)
src/content/         # markdown content: algorithms/, systems/, case-studies/
```

**Dependency rule** (validated as a unit test in `src/app/fsd.spec.ts` — violating it fails the suite):

```
pages → widgets → features → entities → shared
```

Never import from a higher layer (e.g. `shared` must not import from `features`). Use the path aliases:

```typescript
@shared/*   → src/app/shared/*
@entities/* → src/app/entities/*
@features/* → src/app/features/*
@widgets/*  → src/app/widgets/*
```

## Code Conventions

Every component lives in its own directory with **four files** — never inline `template:` or `styles:` in the decorator:

```
widgets/my-widget/
├── my-widget.component.ts      # class + @Component metadata only (templateUrl/styleUrl)
├── my-widget.component.html
├── my-widget.component.css
└── my-widget.component.spec.ts
```

```typescript
@Component({
  selector: 'app-my-widget',           // always app- prefix, kebab-case
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,   // always OnPush
  templateUrl: './my-widget.component.html',
  styleUrl: './my-widget.component.css',
})
export class MyWidgetComponent {
  title = input.required<string>();    // input()/input.required(), never @Input()
  clicked = output<void>();            // output(), never @Output()
  private readonly seo = inject(SeoService);  // inject(), never constructor DI
}
```

Rules:
- Signals first: `signal()`/`computed()`/`effect()` — avoid `ngOnInit` when signals cover the reactivity.
- No `any` — use `unknown` and narrow.
- No `console.log` in production code (`console.warn`/`error` acceptable).
- Guard browser APIs (`window`, `document`, `localStorage`) with `isPlatformBrowser` — this app runs SSR.
- Services: `name.service.ts` + `name.service.spec.ts`.

## Testing Requirements

Every new piece of code needs a spec:

| Type | Minimum tests |
|---|---|
| Component | 1 render test + 1 test per `output()` (+ conditional-class tests) |
| Service / lib function | 1 happy path + 1 edge case |
| Page | render main content + key interaction (`*.page.spec.ts`) |
| New route | add to `e2e/navigation.spec.ts` |
| New interactive feature | own `e2e/*.spec.ts` |

## Checklist: Adding a New Route/Page

This is the most common regression source in this repo. When adding a page:

1. Create `src/app/pages/<name>.page.ts` (+ spec).
2. Add the route to `prerender.routes` in `vite.config.ts` (otherwise it is missing from the sitemap).
3. Add the route to `e2e/navigation.spec.ts` (otherwise it skips a11y/navigation CI checks).
4. Add UI texts to **both** i18n dictionaries: `src/app/shared/config/i18n/en.ts` and `es.ts` (the site is bilingual — never hardcode user-facing strings).
5. Set page metadata via `SeoService.updatePage(...)` (`src/app/shared/lib/seo/`).
6. Update `docs/arquitectura_actual.md` (living architecture reference) in the same PR.

## Git Workflow

- **Always branch from `develop`, never from `main`.** Direct commits to `main`/`develop` are blocked by rulesets.
- Branch naming: `feat/<desc>`, `fix/<desc>`, `refactor/<desc>`, `docs/<desc>`, `ci/<desc>`, `chore/<desc>`.
- Commits: Conventional Commits, scope required, subject under 50 chars — `<type>(<scope>): <subject>`. Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `arch`, `config`, `lint`. Enforced by commitlint.
- PRs target `develop` only; `develop` → `main` is the only PR allowed into `main`.
- CI on PRs: lint, format, typecheck, unit tests, audit, build + bundle report, Playwright E2E (navigation, axe-core WCAG 2AA, responsiveness at 375/768/1280), Lighthouse (Perf ≥ 80, A11y ≥ 90, SEO ≥ 90, BP ≥ 85).
- Releases are automated with release-please (beta on `develop`, stable on `main`) — never bump versions or edit `CHANGELOG.md` manually.

## Do NOT

- Import from a higher FSD layer.
- Use `any`, add `console.log`, or inline `template:`/`styles:` in components.
- Skip pre-commit hooks (`--no-verify`) or commit directly to `main`/`develop`.
- Put build/test-only packages in `dependencies` (they belong in `devDependencies`).
- Add user-facing text in only one language.
- Create components by hand — use `ng g c <layer>/<name> --standalone --change-detection OnPush` from the project root.

## Where to Look

| Resource | Purpose |
|---|---|
| `docs/README.md` | index of all project docs |
| `docs/arquitectura_actual.md` | living reference of the implemented system (routes, widgets, server routes, state) |
| `docs/tasks/` | prioritized pending work — 1 file = 1 branch = 1 PR |
| `docs/review-2026-07/` | latest full code review (findings per characteristic) |
| `CONTRIBUTING.md` | contribution guidelines |
| `CLAUDE.md` | equivalent guide consumed by Claude Code |
