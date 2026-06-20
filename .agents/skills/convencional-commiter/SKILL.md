---
name: convencional-commiter
description: Enforces Conventional Commits 1.0.0 — no emojis, semantic and imperative descriptions. Use when creating Git commits to ensure proper format with type, scope, optional BREAKING CHANGE (! suffix or footer), and a meaningful description (max 72 chars header). Prevents generic commits and enforces professional semantic standards.
---

# Convencional Commiter

## Overview

This skill enforces **Conventional Commits 1.0.0** — clean, semantic, emoji-free commit messages that form a high-resolution version history. Every commit is technical evidence of what changed, why it matters, and what version impact it carries.

## The Golden Rule

Every commit MUST follow this exact pattern:

```
type(scope)!: imperative description

[optional body]

[optional footer(s)]
```

**Components:**
- **Type**: Semantic category (e.g., `feat`, `fix`, `docs`) — must be lowercase
- **Scope**: Affected module in lowercase, wrapped in parentheses (optional but strongly recommended)
- **`!`**: Append immediately before `:` to signal a BREAKING CHANGE (optional)
- **Description**: Imperative mood, starts lowercase, no period, max 50 chars (header total ≤ 72)
- **Body**: Free-form explanation of WHY (not WHAT); starts one blank line after description
- **Footers**: Token: value pairs after blank line; `BREAKING CHANGE:` is a special footer

**Standard examples:**
```
feat(api): add LSTM prediction endpoint
fix(auth): resolve token expiration edge case
feat(api)!: remove v1 users endpoint

BREAKING CHANGE: /v1/users has been removed. Migrate to /v2/users.
```

## Core Types (Conventional Commits 1.0.0 + Angular convention)

These are the canonical types. The first two have SemVer implications:

| Type | SemVer | Purpose |
|------|--------|---------|
| `feat` | MINOR | Introduce a new feature |
| `fix` | PATCH | Patch a bug |
| `docs` | — | Documentation only |
| `style` | — | Formatting, whitespace (no logic change) |
| `refactor` | — | Restructure code without changing behavior |
| `perf` | — | Performance improvements |
| `test` | — | Add or update tests |
| `build` | — | Build system or external dependency changes |
| `ci` | — | CI/CD pipeline changes |
| `chore` | — | Maintenance tasks, tooling, miscellaneous |
| `revert` | — | Revert a previous commit |

**Extended types** (project-specific, not in spec but valid):

| Type | Purpose |
|------|--------|
| `arch` | Structural/architectural changes |
| `config` | Configuration file changes |
| `lint` | Fix linter warnings/errors |

> Any type can carry a BREAKING CHANGE by appending `!` or adding a `BREAKING CHANGE:` footer → triggers a SemVer MAJOR bump.

## Quick Reference: Common Patterns

### Development
- `feat` — New feature: `feat(hero): add animated typing effect`
- `feat` — New feature: `feat(language-picker): add Portuguese locale`
- `fix` — Bug fix: `fix(navbar): resolve mobile menu overflow`
- `fix` — Minor fix: `fix(tech-pill): correct border radius on safari`
- `perf` — Performance: `perf(projects-grid): lazy load project images`
- `feat!` — Breaking change: `feat(i18n)!: replace i18n keys structure`

### Quality
- `refactor` — Refactor: `refactor(mode-switcher): migrate to signals`
- `style` — Formatting: `style(hero): align spacing with design tokens`
- `docs` — Documentation: `docs(readme): update dev setup instructions`
- `test` — Add test: `test(experience-timeline): add render spec`
- `test` — Update tests: `test(project): verify model shape on missing fields`

### Infrastructure
- `config` — Configuration: `config(husky): add pre-push lint validation`
- `ci` — CI/CD: `ci(github): add Playwright e2e workflow`
- `build` — Build: `build(vite): increase chunk size warning limit`
- `chore` — Dep upgrade: `chore(deps): upgrade to angular 21`
- `chore` — Dep downgrade: `chore(deps): pin rxjs to 7.5`
- `revert` — Revert: `revert(mode-switcher): undo terminal toggle refactor`

### Special Cases
- `chore` — Init project: `chore: initial project scaffold`
- `ci` — Deploy: `ci(vercel): configure preview deployments`
- `chore` — Release tag: `chore(release): v2.1.0`

For the complete type and scope reference, see [references/api_reference.md](references/api_reference.md).

## BREAKING CHANGE Syntax

Two equivalent ways to signal a breaking change:

**Option A — `!` suffix (preferred for visibility):**
```
feat(api)!: remove deprecated /v1/users endpoint
```

**Option B — `BREAKING CHANGE:` footer:**
```
feat(api): remove deprecated /v1/users endpoint

BREAKING CHANGE: The /v1/users endpoint has been removed.
Migrate to /v2/users which supports pagination.
Refs: #42
```

**Both together (explicit):**
```
feat(api)!: remove deprecated /v1/users endpoint

Removes the legacy endpoint that was deprecated in v1.8.0.

BREAKING CHANGE: /v1/users is no longer available.
Use /v2/users with { page, limit } query params instead.
```

> `BREAKING CHANGE` in footers MUST be uppercase. It maps to a SemVer MAJOR bump.

## Commit Creation Workflow

When creating commits for the user, follow this process:

### 1. Analyze Changes
- Review staged files to understand the change type
- Identify the primary module/component affected
- Determine the core purpose and impact
- Check if any public API is changed (→ BREAKING CHANGE candidate)

### 2. Select Type
Choose the most specific applicable type from the table above:

| Intent | Type |
|--------|------|
| New functionality | `feat` |
| Bug fix (any severity) | `fix` |
| Refactoring | `refactor` |
| Documentation | `docs` |
| Comments in code | `docs` |
| Performance | `perf` |
| Tests | `test` |
| Configuration | `config` |
| CI/CD pipeline | `ci` |
| Architecture | `arch` |
| Breaking change | any type + `!` |
| Revert | `revert` |

### 3. Determine Scope

**Scope is required.** Use the most specific name that matches the changed module.

**Rule:** use the component/module name for single-area changes; use the FSD layer only when the change spans the entire layer.

---

**Widgets** (`src/app/widgets/`)

| Scope | Module |
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

---

**Features** (`src/app/features/`)

| Scope | Module |
|-------|--------|
| `language-picker` | Language switcher |
| `mode-switcher` | Terminal/visual mode toggle |
| `utility-panel` | Utility panel + shortcuts modal |

---

**Entities** (`src/app/entities/`)

| Scope | Module |
|-------|--------|
| `technology` | Technology entity (model + UI) |
| `experience` | Experience entity (model + UI) |
| `project` | Project entity (model + UI) |

---

**Shared** (`src/app/shared/`)

| Scope | Module |
|-------|--------|
| `i18n` | Internationalization (ES/EN) |
| `theme` | Theme system / design tokens |
| `seo` | SEO metadata |
| `mode` | Dark/light mode |
| `animation` | Shared animations |
| `font-scale` | Font scaling |
| `keyboard-shortcuts` | Keyboard shortcut bindings |
| `badge` | Badge UI primitive |
| `pixel-button` | Pixel-button UI primitive |
| `pixel-card` | Pixel-card UI primitive |
| `section-title` | Section-title UI primitive |
| `tech-pill` | Tech-pill UI primitive |
| `theme-switcher` | Theme-switcher UI component |

---

**Pages** (`src/app/pages/`)

| Scope | Route |
|-------|-------|
| `index` | Home page (`/`) |
| `about` | About page |
| `experience` | Experience page |
| `projects` | Projects page |
| `skills` | Skills page |
| `notes` | Notes (dynamic route) |

---

**Infrastructure**

| Scope | Area |
|-------|------|
| `ci` | GitHub Actions workflows |
| `config` | Project config files (vite, tsconfig, eslint…) |
| `build` | Build tooling (Vite, Analog SSG) |
| `deps` | Dependencies (package.json) |
| `vercel` | Vercel config / deployment |
| `ssg` | Static site generation |
| `server` | Analog SSR server logic |
| `content` | Static content (`src/content/`) |

---

**FSD layer** (only when change spans the entire layer)

`shared` · `entities` · `features` · `widgets` · `pages`

```
# Single component — use component scope:
refactor(hero): migrate to signals-based state

# Entire layer — use layer scope:
refactor(widgets): apply OnPush to all section components
```

### 4. Craft Description
- Use imperative mood: "add", "fix", "update" (not "added", "fixes", "updating")
- Start with lowercase letter
- Be specific and meaningful — describe the actual change, not "update file"
- Keep description ≤ 50 chars; total header ≤ 72 characters
- **NO period at the end**

### 5. Add Body (Optional)
For complex changes, add a body explaining **WHY**, not **WHAT**:
- Architectural reasoning
- Performance considerations
- Non-obvious implications
- Context a future maintainer would need

**Example with body:**
```
feat(lstm): implement forget gate initialization

Initializing forget gate weights to 1.0 prevents vanishing
gradient in long sequences (Gers et al. 2000).
```

### 6. Add Footers (Optional)
Use footers for metadata and breaking change descriptions:
```
Reviewed-by: Z
Refs: #123
BREAKING CHANGE: <description>
```

## Quality Validation Checklist

Before proposing any commit, verify:

- ✅ Type is from approved list (conventional or project-extended)
- ✅ Scope is lowercase and relevant
- ✅ Description starts with lowercase
- ✅ Description is imperative mood
- ✅ Description is specific (not "update", "fix bug", "changes")
- ✅ Total header ≤ 72 characters; description ≤ 50 chars
- ✅ No period at end of description
- ✅ No emojis anywhere in the header
- ✅ Body added for complex changes (blank line separating it)
- ✅ Breaking changes use `!` and/or `BREAKING CHANGE:` footer
- ✅ `BREAKING CHANGE` footer is UPPERCASE

## NEVER Allow

❌ Generic, non-semantic messages:
```
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
git commit -m "wip"
```

❌ Capitalization errors:
```
git commit -m "feat: Added New Feature."
git commit -m "Fix: bug in auth"
```

❌ Emojis in any position:
```
git commit -m "✨ feat: add new feature"
git commit -m "feat: add sparkle ✨ effect"
```

❌ Missing type:
```
git commit -m "add feature"
git commit -m "(signals): add computed state"
```

❌ Silent breaking changes (no `!` or footer):
```
git commit -m "feat(api): redesign users endpoint"  # Breaking but not marked
```

## The Commit Mental Model

Every commit is **technical evidence**:
- Messy commits = messy engineer
- Semantic commits = reliable engineer

When examining changes, think like a senior engineer:
- What problem does this solve?
- How does this fit the architecture?
- Does this break any existing API or behavior?
- How will future maintainers understand this?

A good commit subject answers: "If applied, this commit will **[description]**."

## Resources

### [references/api_reference.md](references/api_reference.md)
Type and scope reference with:
- Detailed explanation of each type and when to use it
- Scope conventions by project area
- Semantic quality guide — good vs. bad descriptions

### [assets/commitlint.config.json](assets/commitlint.config.json)
Commitlint configuration with all approved types, lowercase enforcement, header max length (72), and full-stop prevention.

### [assets/commit-template.txt](assets/commit-template.txt)
Git commit message template with format reminder and examples.

```bash
git config commit.template .agents/skills/convencional-commiter/assets/commit-template.txt
```
