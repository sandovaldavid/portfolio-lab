---
name: convencional-commiter
description: Enforces DevSandoval V4.0 Elite Edition commit protocol combining Conventional Commits 1.0.0 with Gitmoji visual system. Use when creating Git commits to ensure proper format with emoji, type, scope, optional BREAKING CHANGE (! suffix or footer), and imperative description (max 72 chars). Prevents generic commits and enforces professional commit standards for .NET/Angular/AnalogJS/LSTM projects.
---

# Convencional Commiter

## Overview

This skill enforces the **DevSandoval V4.0 (Elite Edition)** commit protocol, combining **[Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)** with **[Gitmoji](https://gitmoji.dev/)** for high-resolution version history. Every commit becomes technical evidence of professionalism and discipline.

## The Golden Rule

Every commit MUST follow this exact pattern:

```
[gitmoji] [type]([scope])[!]: [imperative description]

[optional body]

[optional footer(s)]
```

**Components:**
- **Gitmoji**: Visual emoji (e.g., ✨ `:sparkles:`) — placed before the type
- **Type**: Semantic category (e.g., `feat`, `fix`, `docs`) — must be lowercase
- **Scope**: Affected module in lowercase, wrapped in parentheses (optional but recommended)
- **`!`**: Append immediately before `:` to signal a BREAKING CHANGE (optional)
- **Description**: Imperative mood, starts lowercase, no period, max 72 chars total header
- **Body**: Free-form explanation of WHY (not WHAT); starts one blank line after description
- **Footers**: Token: value pairs after blank line; `BREAKING CHANGE:` is a special footer

**Standard examples:**
```
✨ feat(api): add LSTM prediction endpoint
🐛 fix(auth): resolve token expiration edge case
💥 feat(api)!: remove v1 users endpoint

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

**Extended types** (DevSandoval project-specific, not in spec but valid):

| Type | Purpose |
|------|--------|
| `arch` | Structural/architectural changes |
| `config` | Configuration file changes |
| `lint` | Fix linter warnings/errors |

> Any type can carry a BREAKING CHANGE by appending `!` or adding a `BREAKING CHANGE:` footer → triggers a SemVer MAJOR bump.

## Quick Start: Common Patterns

### Development
- ✨ `feat` — New feature: `✨ feat(signals): add computed state`
- 🐛 `fix` — Bug fix: `🐛 fix(auth): resolve token expiration`
- 🚑️ `fix` — Critical hotfix: `🚑️ fix(api): patch null reference crash`
- 🩹 `fix` — Minor non-critical fix: `🩹 fix(ui): correct button label typo`
- ⚡️ `perf` — Performance: `⚡️ perf(db): optimize queries`
- 💥 `feat!` — Breaking change: `💥 feat(api)!: drop v1 endpoint`

### Quality
- ♻️ `refactor` — Refactor: `♻️ refactor(services): extract utilities`
- 🎨 `style` — Formatting: `🎨 style(theme): adjust mobile padding`
- 💄 `style` — UI/CSS: `💄 style(layout): redesign hero section`
- 📝 `docs` — Documentation: `📝 docs(readme): update setup`
- 🧪 `test` — Add failing test: `🧪 test(lstm): add failing gate test`
- ✅ `test` — Add/update/pass tests: `✅ test(api): add endpoint coverage`

### Infrastructure
- 🔧 `config` — Configuration: `🔧 config(husky): add validation`
- 👷 `ci` — CI/CD: `👷 ci(github): add build pipeline`
- 🧱 `ci` — Infrastructure: `🧱 ci(docker): add production image`
- ⬆️ `chore` — Dep upgrade: `⬆️ chore(deps): upgrade to .NET 8`
- ⬇️ `chore` — Dep downgrade: `⬇️ chore(deps): pin rxjs to 7.5`
- ⏪️ `revert` — Revert: `⏪️ revert(auth): undo session refactor`

### Special Cases
- 🎉 `chore` — Init project: `🎉 chore: initial project scaffold`
- 🚀 `ci` — Deploy: `🚀 ci(azure): deploy to production`
- 🔖 `chore` — Release tag: `🔖 chore(release): v2.1.0`
- 🚧 `wip` — Work in progress: `🚧 wip(lstm): partial gate refactor`

For the complete mapping dictionary, see [references/api_reference.md](references/api_reference.md).

## BREAKING CHANGE Syntax

Two equivalent ways to signal a breaking change:

**Option A — `!` suffix (preferred for visibility):**
```
💥 feat(api)!: remove deprecated /v1/users endpoint
```

**Option B — `BREAKING CHANGE:` footer:**
```
💥 feat(api): remove deprecated /v1/users endpoint

BREAKING CHANGE: The /v1/users endpoint has been removed.
Migrate to /v2/users which supports pagination.
Refs: #42
```

**Both together (explicit):**
```
💥 feat(api)!: remove deprecated /v1/users endpoint

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

### 2. Select Gitmoji + Type
Use the quick reference above or consult [api_reference.md](references/api_reference.md):

| Intent | Gitmoji | Type |
|--------|---------|------|
| New functionality | ✨ | `feat` |
| Critical hotfix | 🚑️ | `fix` |
| Bug fix | 🐛 | `fix` |
| Minor/typo fix | 🩹 | `fix` |
| Refactoring | ♻️ | `refactor` |
| Documentation | 📝 | `docs` |
| Comments in code | 💡 | `docs` |
| Performance | ⚡️ | `perf` |
| Add failing test | 🧪 | `test` |
| Add/pass tests | ✅ | `test` |
| Configuration | 🔧 | `config` |
| CI/CD pipeline | 👷 | `ci` |
| Deploy | 🚀 | `ci` |
| Architecture | 🏗️ | `arch` |
| Breaking change | 💥 | any type + `!` |
| Revert | ⏪️ | `revert` |

### 3. Determine Scope
Choose the most specific applicable scope:

**Backend (.NET):** `api`, `auth`, `core`, `services`, `models`, `db`

**Frontend (Angular / AnalogJS):** `signals`, `components`, `pages`, `services`, `guards`, `interceptors`, `theme`, `ssg`

**Research (LSTM):** `lstm`, `dataset`, `preprocessing`, `model`, `training`, `evaluation`

**Tooling/Docs:** `readme`, `docs`, `thesis`, `husky`, `github`, `deps`, `docker`

### 4. Craft Description
- Use imperative mood: "add", "fix", "update" (not "added", "fixes", "updating")
- Start with lowercase letter
- Be specific and meaningful
- Keep total header (gitmoji + type + scope + `:` + description) ≤ 72 characters
- **NO period at the end**

### 5. Add Body (Optional)
For complex changes, add a body explaining **WHY**, not **WHAT**:
- Architectural reasoning
- Performance considerations
- Research citations
- Non-obvious implications

**Example with body:**
```
✨ feat(lstm): implement forget gate initialization

Physical intuition: Initializing forget gate weights to 1.0
prevents vanishing gradient in long sequences, as suggested
in Gers et al. (2000).
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

- ✅ Gitmoji is present and matches change type
- ✅ Type is from approved list (conventional or project-extended)
- ✅ Scope is lowercase and relevant
- ✅ Description starts with lowercase
- ✅ Description is imperative mood
- ✅ Total header ≤ 72 characters
- ✅ No period at end of description
- ✅ Message is specific (not "update" or "fix bug")
- ✅ Body added for complex changes (blank line separating it)
- ✅ Breaking changes use `!` and/or `BREAKING CHANGE:` footer
- ✅ `BREAKING CHANGE` footer is UPPERCASE

## NEVER Allow

❌ Generic messages:
```
git commit -m "update"
git commit -m "fix bug"
git commit -m "changes"
```

❌ Capitalization errors:
```
git commit -m "✨ feat: Added New Feature."
git commit -m "🐛 Fix: bug in auth"
```

❌ Missing components:
```
git commit -m "add feature"        # Missing gitmoji and type
git commit -m "✨ add feature"      # Missing type
```

❌ Silent breaking changes (no `!` or footer):
```
git commit -m "✨ feat(api): redesign users endpoint"  # Breaking but not marked
```

## The Commit Mental Model

Every commit is **technical evidence**:
- Messy commits = messy engineer
- Protocol-compliant commits = reliable engineer

When examining changes, think like a senior engineer:
- What problem does this solve?
- How does this fit the architecture?
- Does this break any existing API or behavior?
- How will future maintainers understand this?

## Resources

This skill includes bundled resources:

### [references/api_reference.md](references/api_reference.md)
Complete gitmoji mapping dictionary with:
- All official gitmojis from gitmoji.dev with their conventional commit type mapping
- Context-specific scope examples
- Extended usage examples
- Quick reference table

**When to use:** Consult when unsure about gitmoji selection or need specific examples.

### [assets/commitlint.config.json](assets/commitlint.config.json)
Commitlint configuration file with:
- All approved type enums (spec + project extensions)
- Subject case validation (lowercase)
- Header max length (72 chars — accommodates gitmoji prefix)
- Full stop prevention

**When to use:** Recommend this configuration when user wants to enforce commit standards with commitlint.

### [assets/commit-template.txt](assets/commit-template.txt)
Git commit message template with format reminder and examples.

**When to use:** Recommend setting as Git commit template:
```bash
git config commit.template .agent/skills/convencional-commiter/assets/commit-template.txt
```

## Integration Notes

This skill is designed for DevSandoval's tech stack:
- **.NET 8** backend with API-first architecture
- **Angular 19** frontend with signals
- **AnalogJS** SSG/SSR portfolio
- **LSTM research** for thesis work
- **Modern DevOps** with Husky, commitlint, GitHub Actions

Scope conventions align with this stack, but can be adapted for other contexts.
