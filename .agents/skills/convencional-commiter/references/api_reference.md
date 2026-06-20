# Type & Scope Reference

Complete reference for [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) types and scopes used in the DevSandoval commit protocol.

---

## Type Reference

### `feat` — New Feature
**SemVer impact:** MINOR

Introduce new functionality visible to users or consumers.

```
feat(signals): add computed state for cart total
feat(api): add LSTM prediction endpoint
feat(i18n): add Spanish translations
feat(layout): implement mobile-first hero section
feat(nav): add aria-labels to menu items
feat(forms): add inline validation feedback
```

---

### `fix` — Bug Fix
**SemVer impact:** PATCH

Correct a defect in existing behavior.

```
fix(auth): resolve token expiration edge case
fix(signals): prevent memory leak on destroy
fix(api): patch null reference crash on empty dataset
fix(ui): correct button label typo
fix(ssg): handle missing metadata in static build
```

---

### `docs` — Documentation
**SemVer impact:** none

Changes to documentation files, README, comments in code, or JSDoc/TSDoc.

```
docs(readme): update installation instructions
docs(api): add endpoint usage examples
docs(contributing): clarify branch naming rules
```

---

### `style` — Formatting / Whitespace
**SemVer impact:** none

Code formatting, whitespace, semicolons — no logic change. Does NOT mean CSS/visual styles (use `feat` or `refactor` for those).

```
style(theme): apply consistent spacing in layout
style(components): reorder imports alphabetically
```

---

### `refactor` — Code Restructure
**SemVer impact:** none

Internal restructure without changing observable behavior.

```
refactor(auth): simplify JWT validation logic
refactor(services): extract shared utility functions
refactor(components): migrate to signals-based state
```

---

### `perf` — Performance
**SemVer impact:** none (PATCH if it fixes a performance regression)

Measurable performance improvement.

```
perf(db): optimize N+1 query in user listing
perf(seo): add structured data markup
perf(images): switch to WebP with lazy loading
```

---

### `test` — Tests
**SemVer impact:** none

Add, update, or fix tests. No production code changes.

```
test(api): add endpoint integration coverage
test(lstm): add failing gate activation test
test(signals): verify computed state on input change
```

---

### `build` — Build System
**SemVer impact:** none

Changes to build tooling, Dockerfile, package scripts, or external dependencies.

```
build(docker): add production image configuration
build(vite): increase chunk size warning limit
build(deps): upgrade to angular 21
```

---

### `ci` — CI/CD
**SemVer impact:** none

Changes to CI/CD pipelines, GitHub Actions, deployment scripts.

```
ci(github): add Playwright e2e workflow
ci(vercel): configure preview deployments
ci(lighthouse): add performance audit thresholds
```

---

### `chore` — Maintenance
**SemVer impact:** none

Maintenance tasks, dependency bumps, project scaffold, release tags. Anything that doesn't fit another category.

```
chore: initial project scaffold
chore(deps): upgrade rxjs to 7.8
chore(release): v2.1.0
chore(deps): remove unused lodash dependency
```

---

### `revert` — Revert Commit
**SemVer impact:** depends on reverted commit

Revert a previous commit. Include the original commit SHA in the body.

```
revert(auth): undo session storage refactor

Reverts commit a1b2c3d. The refactor introduced a race condition
on concurrent login attempts.
```

---

### `arch` — Architecture (extended)
**SemVer impact:** none

Structural or architectural changes: new layers, module boundaries, dependency graph changes.

```
arch(core): introduce feature-sliced design layers
arch(api): separate domain logic from controllers
```

---

### `config` — Configuration (extended)
**SemVer impact:** none

Configuration file changes: ESLint, Prettier, Husky, commitlint, tsconfig, etc.

```
config(husky): add pre-push lint validation
config(eslint): enable strict no-unused-vars rule
config(tsconfig): enable strict null checks
```

---

### `lint` — Linter Fixes (extended)
**SemVer impact:** none

Fix linter warnings or errors without changing logic.

```
lint(components): resolve no-explicit-any warnings
lint(services): fix unused import warnings
```

---

## Scope Conventions

### Widgets (`src/app/widgets/`)
| Scope | Covers |
|-------|--------|
| `hero` | Hero section |
| `navbar` | Navigation bar |
| `footer` | Footer |
| `about-section` | About section |
| `experience-timeline` | Experience timeline |
| `projects-grid` | Projects grid |
| `skills-section` | Skills section |
| `star-ledger` | Star ledger widget |
| `chaos-playground` | Chaos playground |
| `lstm-playground` | LSTM playground |
| `mext-thesis-pitch` | MEXT thesis pitch |

### Features (`src/app/features/`)
| Scope | Covers |
|-------|--------|
| `language-picker` | Language switcher (ES/EN) |
| `mode-switcher` | Terminal/visual mode toggle |
| `utility-panel` | Utility panel + shortcuts modal |

### Entities (`src/app/entities/`)
| Scope | Covers |
|-------|--------|
| `technology` | Technology entity (model + UI) |
| `experience` | Experience entity (model + UI) |
| `project` | Project entity (model + UI) |

### Shared (`src/app/shared/`)
| Scope | Covers |
|-------|--------|
| `i18n` | Internationalization config (ES/EN) |
| `theme` | Theme system / design tokens |
| `seo` | SEO metadata service |
| `mode` | Dark/light mode logic |
| `animation` | Shared animation utilities |
| `font-scale` | Font scaling |
| `keyboard-shortcuts` | Keyboard shortcut bindings |
| `badge` | Badge UI primitive |
| `pixel-button` | Pixel-button UI primitive |
| `pixel-card` | Pixel-card UI primitive |
| `section-title` | Section-title UI primitive |
| `tech-pill` | Tech-pill UI primitive |
| `theme-switcher` | Theme-switcher UI component |

### Pages (`src/app/pages/`)
| Scope | Covers |
|-------|--------|
| `index` | Home page (`/`) |
| `about` | About page |
| `experience` | Experience page |
| `projects` | Projects page |
| `skills` | Skills page |
| `notes` | Notes (dynamic route) |

### Infrastructure
| Scope | Covers |
|-------|--------|
| `ci` | GitHub Actions workflows |
| `config` | Project config files (vite, tsconfig, eslint…) |
| `build` | Build tooling (Vite, Analog SSG) |
| `deps` | Dependencies (package.json) |
| `vercel` | Vercel config / deployment |
| `ssg` | Static site generation |
| `server` | Analog SSR server logic (`src/server/`) |
| `content` | Static content (`src/content/`) |

### FSD layers (use when change spans entire layer)
| Scope | Use when |
|-------|---------|
| `shared` | Change affects all/most shared utilities |
| `entities` | Change affects all/most domain entities |
| `features` | Change affects all/most features |
| `widgets` | Change affects all/most widgets |
| `pages` | Change affects all/most pages |

---

## Semantic Quality Guide

A semantic commit answers: **"If applied, this commit will [description]."**

### Good vs. Bad Descriptions

| Bad (non-semantic) | Good (semantic) |
|-------------------|----------------|
| `update code` | `refactor(auth): simplify JWT validation logic` |
| `fix bug` | `fix(signals): prevent memory leak on destroy` |
| `changes` | `feat(i18n): add Spanish translations for hero section` |
| `wip` | `test(lstm): add failing gate activation test` |
| `stuff` | `chore(deps): upgrade rxjs to 7.8` |
| `fix typo` | `fix(ui): correct "Sumbit" button label typo` |

### Specificity Rules

1. **Name the thing** — "add endpoint" → "add `/api/predict` LSTM endpoint"
2. **Name the behavior** — "fix auth" → "resolve token expiration on refresh"
3. **Name the module** — always use scope: `feat(signals)` not `feat`
4. **Be action-oriented** — "add", "remove", "update", "fix", "extract", "migrate"

### When to add a body

Add a body when:
- The WHY is non-obvious (architectural decision, trade-off)
- A behavior changes in a subtle way
- There's a known issue or workaround involved
- Future maintainers would need context to understand the change

Skip the body when the subject line is self-explanatory.
