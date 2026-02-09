---
name: convencional-commiter
description: Enforces DevSandoval V4.0 Elite Edition commit protocol combining Conventional Commits with Gitmoji visual system. Use when creating Git commits to ensure proper format with emoji, type, scope, and imperative description (max 50 chars). Prevents generic commits and enforces professional commit standards for .NET/Angular/LSTM projects.
---

# Convencional Commiter

## Overview

This skill enforces the **DevSandoval V4.0 (Elite Edition)** commit protocol, combining **Conventional Commits** with **Gitmoji** for high-resolution version history. Every commit becomes technical evidence of professionalism and discipline.

## The Golden Rule

Every commit MUST follow this exact pattern:

```
[gitmoji] [type]([scope]): [imperative description]
```

**Components:**
- **Gitmoji**: Visual emoji (e.g., ✨ `:sparkles:`)
- **Type**: Semantic category (e.g., `feat`, `fix`, `docs`)
- **Scope**: Affected module in lowercase (e.g., `api`, `auth`, `signals`, `lstm`)
- **Description**: Imperative mood, starts lowercase, max 50 chars total, no period

**Example:**
```
✨ feat(api): add LSTM prediction endpoint
```

## Quick Start: Common Patterns

### Development
- ✨ `feat` - New feature: `✨ feat(signals): add computed state`
- 🐛 `fix` - Bug fix: `🐛 fix(auth): resolve token expiration`
- ⚡ `perf` - Performance: `⚡ perf(db): optimize queries`

### Maintenance
- ♻️ `refactor` - Refactor: `♻️ refactor(services): extract utilities`
- 🎨 `style` - Styling: `🎨 style(theme): adjust mobile padding`
- 📝 `docs` - Documentation: `📝 docs(readme): update setup`

### Infrastructure
- 🔧 `config` - Configuration: `🔧 config(husky): add validation`
- 👷 `ci` - CI/CD: `👷 ci(github): add build pipeline`
- ⬆️ `chore` - Upgrades: `⬆️ chore(deps): upgrade to .NET 8`

For the complete mapping dictionary, see [references/api_reference.md](references/api_reference.md).

## Commit Creation Workflow

When creating commits for the user, follow this process:

### 1. Analyze Changes
- Review staged files to understand the change type
- Identify the primary module/component affected
- Determine the core purpose and impact

### 2. Select Gitmoji + Type
Use the quick reference above or consult [api_reference.md](references/api_reference.md):
- New functionality → ✨ `feat`
- Bug fix → 🐛 `fix`
- Refactoring → ♻️ `refactor`
- Documentation → 📝 `docs`
- Performance → ⚡ `perf`
- Tests → 🧪 `test`
- Configuration → 🔧 `config`
- CI/CD → 👷 `ci`
- Architecture → 🏗️ `arch`

### 3. Determine Scope
Choose the most specific applicable scope:

**Backend (.NET):** `api`, `auth`, `core`, `services`, `models`, `db`

**Frontend (Angular):** `signals`, `components`, `services`, `guards`, `interceptors`, `theme`

**Research (LSTM):** `lstm`, `dataset`, `preprocessing`, `model`, `training`, `evaluation`

**Tooling/Docs:** `readme`, `docs`, `thesis`, `husky`, `github`, `deps`

### 4. Craft Description
- Use imperative mood: "add", "fix", "update" (not "added", "fixes", "updating")
- Start with lowercase letter
- Be specific and meaningful
- Keep total header ≤ 50 characters
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

## Quality Validation Checklist

Before proposing any commit, verify:

- ✅ Gitmoji is present and matches change type
- ✅ Type is from approved list
- ✅ Scope is lowercase and relevant
- ✅ Description starts with lowercase
- ✅ Description is imperative mood
- ✅ Total header ≤ 50 characters
- ✅ No period at end
- ✅ Message is specific (not "update" or "fix bug")
- ✅ Body added for complex changes (when needed)

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
git commit -m "add feature"  # Missing gitmoji and type
git commit -m "✨ add feature"  # Missing type
```

## The Commit Mental Model

Every commit is **technical evidence**:
- Messy commits = messy engineer
- Protocol-compliant commits = reliable engineer

When examining changes, think like a senior engineer:
- What problem does this solve?
- How does this fit the architecture?
- What are the implications?
- How will future maintainers understand this?

## Resources

This skill includes bundled resources:

### [references/api_reference.md](references/api_reference.md)
Complete gitmoji mapping dictionary with:
- All approved gitmojis with descriptions
- Context-specific scope examples
- Extended usage examples
- Quick reference table

**When to use:** Consult when unsure about gitmoji selection or need specific examples.

### [assets/commitlint.config.json](assets/commitlint.config.json)
Commitlint configuration file with:
- All approved type enums
- Subject case validation (lowercase)
- Header max length (50 chars)
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
- **LSTM research** for thesis work
- **Modern DevOps** with Husky, commitlint, GitHub Actions

Scope conventions align with this stack, but can be adapted for other contexts.
