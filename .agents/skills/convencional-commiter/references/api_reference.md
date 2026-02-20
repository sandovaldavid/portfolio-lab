# Gitmoji Mapping Reference

Complete reference of all [gitmoji.dev](https://gitmoji.dev/) emojis mapped to [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) types for the DevSandoval V4.0 Elite Edition commit protocol.

---

## Features & Behavior

### ✨ `:sparkles:` — Introduce new features
- **Type:** `feat`
- **Examples:**
  ```
  ✨ feat(api): add LSTM prediction endpoint
  ✨ feat(auth): implement JWT token refresh
  ✨ feat(signals): add computed signals for state
  ```

### 💥 `:boom:` — Introduce breaking changes
- **Type:** any type + `!` (e.g., `feat!`, `fix!`)
- **Usage:** Pair with `!` suffix and/or `BREAKING CHANGE:` footer
- **Examples:**
  ```
  💥 feat(api)!: remove deprecated /v1/users endpoint

  BREAKING CHANGE: /v1/users has been removed. Use /v2/users.
  ```

### 🚀 `:rocket:` — Deploy stuff
- **Type:** `ci`
- **Examples:**
  ```
  🚀 ci(azure): deploy to production
  🚀 ci(github): trigger staging release
  ```

### 🎉 `:tada:` — Begin a project
- **Type:** `chore`
- **Examples:**
  ```
  🎉 chore: initial project scaffold
  🎉 chore: init AnalogJS portfolio
  ```

### 🔖 `:bookmark:` — Release / version tags
- **Type:** `chore`
- **Examples:**
  ```
  🔖 chore(release): v2.1.0
  🔖 chore(release): bump to v1.0.0
  ```

### 🌐 `:globe_with_meridians:` — Internationalization and localization
- **Type:** `feat`
- **Examples:**
  ```
  🌐 feat(i18n): add Spanish translations
  🌐 feat(lang): implement locale switching
  ```

### 💫 `:dizzy:` — Add or update animations and transitions
- **Type:** `feat`
- **Examples:**
  ```
  💫 feat(theme): add page transition animations
  💫 feat(ui): smooth scroll reveal effect
  ```

### 📱 `:iphone:` — Work on responsive design
- **Type:** `feat`
- **Examples:**
  ```
  📱 feat(layout): implement mobile-first hero
  📱 feat(components): make navbar responsive
  ```

### ♿️ `:wheelchair:` — Improve accessibility
- **Type:** `feat`
- **Examples:**
  ```
  ♿️ feat(nav): add aria-labels to menu items
  ♿️ feat(forms): improve screen reader support
  ```

### 🚸 `:children_crossing:` — Improve user experience / usability
- **Type:** `feat`
- **Examples:**
  ```
  🚸 feat(onboarding): simplify first-run flow
  🚸 feat(forms): add inline validation feedback
  ```

### 🔍️ `:mag:` — Improve SEO
- **Type:** `perf`
- **Examples:**
  ```
  🔍️ perf(seo): add structured data markup
  🔍️ perf(meta): optimize og:image tags
  ```

### 🏷️ `:label:` — Add or update types
- **Type:** `feat` or `refactor`
- **Examples:**
  ```
  🏷️ feat(types): add pagination response interface
  🏷️ refactor(models): tighten API response types
  ```

### 🚩 `:triangular_flag_on_post:` — Add, update, or remove feature flags
- **Type:** `feat`
- **Examples:**
  ```
  🚩 feat(flags): add dark-mode feature toggle
  🚩 feat(config): enable experimental SSR flag
  ```

### 👔 `:necktie:` — Add or update business logic
- **Type:** `feat`
- **Examples:**
  ```
  👔 feat(core): implement grant approval workflow
  👔 feat(billing): add subscription tier checks
  ```

### 🧵 `:thread:` — Add or update code related to multithreading or concurrency
- **Type:** `feat` or `perf`
- **Examples:**
  ```
  🧵 perf(api): parallelize prediction requests
  🧵 feat(workers): add background sync queue
  ```

---

## Fixes

### 🐛 `:bug:` — Fix a bug
- **Type:** `fix`
- **Examples:**
  ```
  🐛 fix(signals): prevent memory leak on destroy
  🐛 fix(auth): resolve token expiration edge case
  🐛 fix(lstm): correct gradient calculation
  ```

### 🚑️ `:ambulance:` — Critical hotfix
- **Type:** `fix`
- **Usage:** Reserve for production emergencies
- **Examples:**
  ```
  🚑️ fix(api): patch null reference crash in prod
  🚑️ fix(auth): resolve critical XSS vulnerability
  ```

### 🩹 `:adhesive_bandage:` — Simple fix for a non-critical issue
- **Type:** `fix`
- **Examples:**
  ```
  🩹 fix(ui): correct typo in submit button label
  🩹 fix(docs): fix broken internal link
  ```

### ✏️ `:pencil2:` — Fix typos
- **Type:** `fix`
- **Examples:**
  ```
  ✏️ fix(readme): correct project name spelling
  ✏️ fix(ui): fix label capitalization
  ```

### 🔒️ `:lock:` — Fix security or privacy issues
- **Type:** `fix`
- **Examples:**
  ```
  🔒️ fix(auth): sanitize user input to prevent injection
  🔒️ fix(api): enforce HTTPS redirect
  ```

### 🥅 `:goal_net:` — Catch errors
- **Type:** `fix`
- **Examples:**
  ```
  🥅 fix(api): add null check on prediction response
  🥅 fix(services): handle network timeout gracefully
  ```

### 👽️ `:alien:` — Update code due to external API changes
- **Type:** `fix`
- **Examples:**
  ```
  👽️ fix(api): adapt to GitHub REST API v4 schema
  👽️ fix(services): update Stripe webhook payload parsing
  ```

---

## Performance

### ⚡️ `:zap:` — Improve performance
- **Type:** `perf`
- **Examples:**
  ```
  ⚡️ perf(db): optimize query for high-frequency logs
  ⚡️ perf(lstm): reduce batch processing time
  ⚡️ perf(signals): memoize computed values
  ```

---

## Code Quality & Maintenance

### 🎨 `:art:` — Improve structure / format of the code
- **Type:** `style`
- **Usage:** Code structure and formatting changes; no behavior change
- **Examples:**
  ```
  🎨 style(api): reformat controller methods
  🎨 style(components): align import order
  ```

### 💄 `:lipstick:` — Add or update the UI and style files
- **Type:** `style`
- **Usage:** Visual/CSS changes, not code logic
- **Examples:**
  ```
  💄 style(layout): redesign hero section
  💄 style(theme): update color palette to v2
  ```

### ♻️ `:recycle:` — Refactor code
- **Type:** `refactor`
- **Examples:**
  ```
  ♻️ refactor(auth): simplify JWT validation logic
  ♻️ refactor(services): extract common utilities
  ♻️ refactor(lstm): reorganize model layers
  ```

### 🚚 `:truck:` — Move or rename resources (files, paths, routes)
- **Type:** `refactor`
- **Examples:**
  ```
  🚚 refactor(pages): rename /blog to /articles
  🚚 refactor(assets): reorganize image folder structure
  ```

### ⚰️ `:coffin:` — Remove dead code
- **Type:** `refactor`
- **Examples:**
  ```
  ⚰️ refactor(core): remove unused legacy RxJS helpers
  ⚰️ refactor(services): delete obsolete mock stubs
  ```

### 🗑️ `:wastebasket:` — Deprecate code that needs to be cleaned up
- **Type:** `chore`
- **Usage:** Mark code as deprecated (actual removal uses ⚰️ or 🔥)
- **Examples:**
  ```
  🗑️ chore(api): mark v1 endpoint as deprecated
  🗑️ chore(models): flag obsolete DTOs for removal
  ```

### 🔥 `:fire:` — Remove code or files
- **Type:** `chore`
- **Examples:**
  ```
  🔥 chore(legacy): delete deprecated Angular modules
  🔥 chore(api): remove unused endpoints
  ```

### 💡 `:bulb:` — Add or update comments in source code
- **Type:** `docs`
- **Examples:**
  ```
  💡 docs(lstm): document forget gate initialization
  💡 docs(api): add JSDoc to prediction service
  ```

### 💬 `:speech_balloon:` — Add or update text and literals
- **Type:** `feat` or `fix`
- **Examples:**
  ```
  💬 fix(ui): update error message for empty form
  💬 feat(i18n): add confirmation dialog texts
  ```

### 🚨 `:rotating_light:` — Fix compiler / linter warnings
- **Type:** `lint`
- **Examples:**
  ```
  🚨 lint(api): fix naming convention warnings
  🚨 lint(components): resolve unused import errors
  🚨 lint(core): fix accessibility lint warnings
  ```

---

## Documentation

### 📝 `:memo:` — Add or update documentation
- **Type:** `docs`
- **Examples:**
  ```
  📝 docs(readme): update MEXT research background
  📝 docs(api): add endpoint documentation
  📝 docs(thesis): update methodology section
  ```

### 📄 `:page_facing_up:` — Add or update license
- **Type:** `chore`
- **Examples:**
  ```
  📄 chore: add MIT license
  📄 chore: update license year to 2026
  ```

---

## Tests

### ✅ `:white_check_mark:` — Add, update, or pass tests
- **Type:** `test`
- **Usage:** Tests that pass (or are expected to pass)
- **Examples:**
  ```
  ✅ test(api): add integration tests for endpoints
  ✅ test(signals): add component lifecycle tests
  ✅ test(auth): ensure all auth flows pass
  ```

### 🧪 `:test_tube:` — Add a failing test
- **Type:** `test`
- **Usage:** Intentionally failing tests (TDD red phase)
- **Examples:**
  ```
  🧪 test(lstm): add failing gate activation test
  🧪 test(api): add failing rate-limit test
  ```

### 📸 `:camera_flash:` — Add or update snapshots
- **Type:** `test`
- **Examples:**
  ```
  📸 test(ui): update hero component snapshot
  📸 test(components): regenerate button snapshots
  ```

### 🧐 `:monocle_face:` — Data exploration / inspection
- **Type:** `chore` or `test`
- **Examples:**
  ```
  🧐 chore(dataset): inspect MEXT data distribution
  🧐 test(model): explore hyperparameter sensitivity
  ```

### ⚗️ `:alembic:` — Perform experiments
- **Type:** `chore`
- **Examples:**
  ```
  ⚗️ chore(lstm): experiment with attention mechanism
  ⚗️ chore(perf): test SSR vs SSG rendering times
  ```

---

## Architecture

### 🏗️ `:building_construction:` — Make architectural changes
- **Type:** `arch`
- **Examples:**
  ```
  🏗️ arch(shared): migrate to standalone components
  🏗️ arch(core): restructure module hierarchy
  🏗️ arch(api): implement layered architecture
  ```

### 🧱 `:bricks:` — Infrastructure related changes
- **Type:** `ci`
- **Examples:**
  ```
  🧱 ci(docker): add production multi-stage image
  🧱 ci(terraform): provision cloud resources
  ```

### 🩺 `:stethoscope:` — Add or update healthcheck
- **Type:** `feat`
- **Examples:**
  ```
  🩺 feat(api): add /health liveness endpoint
  🩺 feat(docker): configure healthcheck probe
  ```

---

## DevOps & Infrastructure

### 🔧 `:wrench:` — Add or update configuration files
- **Type:** `config`
- **Examples:**
  ```
  🔧 config(husky): add commitlint validation
  🔧 config(tsconfig): enable strict mode
  🔧 config(vite): tune build chunk splitting
  ```

### 🔨 `:hammer:` — Add or update development scripts
- **Type:** `build`
- **Examples:**
  ```
  🔨 build(scripts): add pre-release build script
  🔨 build(npm): update dev server start command
  ```

### 👷 `:construction_worker:` — Add or update CI build system
- **Type:** `ci`
- **Examples:**
  ```
  👷 ci(github): add Angular build pipeline
  👷 ci(azure): configure deployment workflow
  👷 ci(tests): add automated test matrix
  ```

### 💚 `:green_heart:` — Fix CI Build
- **Type:** `ci`
- **Examples:**
  ```
  💚 ci(github): fix failing lint step
  💚 ci(azure): resolve pipeline timeout issue
  ```

### 📈 `:chart_with_upwards_trend:` — Add or update analytics or tracking code
- **Type:** `feat`
- **Examples:**
  ```
  📈 feat(analytics): integrate Plausible tracking
  📈 feat(monitoring): add Sentry error reporting
  ```

### 🙈 `:see_no_evil:` — Add or update a .gitignore file
- **Type:** `chore`
- **Examples:**
  ```
  🙈 chore: add .gitignore for AnalogJS build outputs
  🙈 chore: ignore .env.local from git tracking
  ```

### 🔐 `:closed_lock_with_key:` — Add or update secrets
- **Type:** `config`
- **Examples:**
  ```
  🔐 config(env): add production API key variable
  🔐 config(secrets): rotate JWT signing secret
  ```

### 🛂 `:passport_control:` — Work on code related to authorization, roles, and permissions
- **Type:** `feat` or `fix`
- **Examples:**
  ```
  🛂 feat(auth): add role-based route guards
  🛂 fix(permissions): resolve admin scope leak
  ```

### 🦺 `:safety_vest:` — Add or update code related to validation
- **Type:** `feat` or `fix`
- **Examples:**
  ```
  🦺 feat(forms): add Zod schema validation
  🦺 fix(api): enforce required fields on POST
  ```

---

## Dependencies

### ⬆️ `:arrow_up:` — Upgrade dependencies
- **Type:** `chore`
- **Examples:**
  ```
  ⬆️ chore(deps): upgrade to .NET 8.0.2
  ⬆️ chore(npm): update Angular to v19
  ⬆️ chore(python): upgrade tensorflow to 2.15
  ```

### ⬇️ `:arrow_down:` — Downgrade dependencies
- **Type:** `chore`
- **Examples:**
  ```
  ⬇️ chore(deps): pin rxjs to 7.5 for compat
  ⬇️ chore(npm): downgrade vitest to stable 1.x
  ```

### 📌 `:pushpin:` — Pin dependencies to specific versions
- **Type:** `chore`
- **Examples:**
  ```
  📌 chore(deps): pin node to 20.11.0 in engines
  📌 chore(npm): lock typescript to 5.3.x
  ```

### ➕ `:heavy_plus_sign:` — Add a dependency
- **Type:** `build`
- **Examples:**
  ```
  ➕ build(deps): add zod for schema validation
  ➕ build(npm): add @analogjs/vite-plugin-angular
  ```

### ➖ `:heavy_minus_sign:` — Remove a dependency
- **Type:** `build`
- **Examples:**
  ```
  ➖ build(deps): remove unused lodash package
  ➖ build(npm): drop moment.js in favor of date-fns
  ```

### 📦️ `:package:` — Add or update compiled files or packages
- **Type:** `build`
- **Examples:**
  ```
  📦️ build(dist): update compiled output bundles
  📦️ build(npm): publish v2.1.0 to registry
  ```

---

## Git Operations

### ⏪️ `:rewind:` — Revert changes
- **Type:** `revert`
- **Examples:**
  ```
  ⏪️ revert(auth): undo session refactor from abc123
  ⏪️ revert(lstm): revert failing experiment
  ```

### 🔀 `:twisted_rightwards_arrows:` — Merge branches
- **Type:** (no type required — use as prefix for merge commits)
- **Examples:**
  ```
  🔀 merge: PR #42 feature/lstm-attention into main
  ```

---

## Assets & Media

### 🍱 `:bento:` — Add or update assets
- **Type:** `feat` or `chore`
- **Examples:**
  ```
  🍱 feat(assets): add portfolio project screenshots
  🍱 chore(public): optimize logo SVG files
  ```

---

## Work In Progress

### 🚧 `:construction:` — Work in progress
- **Type:** `wip` (non-standard; use sparingly — prefer atomic commits)
- **Examples:**
  ```
  🚧 wip(lstm): partial attention gate implementation
  🚧 wip(portfolio): rough layout for projects page
  ```

---

## Developer Experience

### 🧑‍💻 `:technologist:` — Improve developer experience
- **Type:** `chore` or `build`
- **Examples:**
  ```
  🧑‍💻 chore(dx): add VS Code debug launch config
  🧑‍💻 build(scripts): improve hot-reload dev setup
  ```

---

## Context-Specific Scopes

### .NET Backend
- `(api)` — API endpoints, controllers
- `(auth)` — Authentication, authorization
- `(core)` — Core business logic
- `(services)` — Service layer
- `(models)` — Data models, entities
- `(db)` — Database operations

### Angular / AnalogJS Frontend
- `(signals)` — Angular signals
- `(components)` — UI components
- `(pages)` — AnalogJS file-based pages
- `(services)` — Frontend services
- `(guards)` — Route guards
- `(interceptors)` — HTTP interceptors
- `(theme)` — Theming, styling
- `(ssg)` — Static site generation, prerendering

### LSTM / ML Research
- `(lstm)` — LSTM model
- `(dataset)` — Dataset management
- `(preprocessing)` — Data preprocessing
- `(model)` — Model architecture
- `(training)` — Training logic
- `(evaluation)` — Model evaluation

### Documentation & Tooling
- `(readme)` — README files
- `(docs)` — Documentation
- `(thesis)` — Thesis work
- `(husky)` — Git hooks
- `(github)` — GitHub workflows
- `(deps)` — Dependencies
- `(docker)` — Container configuration
- `(release)` — Release management

---

## Quick Reference Table

| Gitmoji | Code | Type | Purpose |
|---------|------|------|---------|
| ✨ | `:sparkles:` | `feat` | New feature |
| 💥 | `:boom:` | any`!` | Breaking change |
| 🐛 | `:bug:` | `fix` | Bug fix |
| 🚑️ | `:ambulance:` | `fix` | Critical hotfix |
| 🩹 | `:adhesive_bandage:` | `fix` | Minor non-critical fix |
| ✏️ | `:pencil2:` | `fix` | Typo fix |
| 🔒️ | `:lock:` | `fix` | Security fix |
| 🥅 | `:goal_net:` | `fix` | Catch errors |
| 👽️ | `:alien:` | `fix` | External API changes |
| ⚡️ | `:zap:` | `perf` | Performance improvement |
| 🔍️ | `:mag:` | `perf` | SEO improvement |
| 🎨 | `:art:` | `style` | Code structure/format |
| 💄 | `:lipstick:` | `style` | UI and style files |
| ♻️ | `:recycle:` | `refactor` | Refactor |
| 🚚 | `:truck:` | `refactor` | Move / rename files |
| ⚰️ | `:coffin:` | `refactor` | Remove dead code |
| 📝 | `:memo:` | `docs` | Documentation |
| 💡 | `:bulb:` | `docs` | Source code comments |
| 📄 | `:page_facing_up:` | `chore` | License |
| ✅ | `:white_check_mark:` | `test` | Add/update/pass tests |
| 🧪 | `:test_tube:` | `test` | Add failing test (TDD) |
| 📸 | `:camera_flash:` | `test` | Snapshots |
| 🧐 | `:monocle_face:` | `chore` | Data exploration |
| ⚗️ | `:alembic:` | `chore` | Experiments |
| 🏗️ | `:building_construction:` | `arch` | Architectural changes |
| 🧱 | `:bricks:` | `ci` | Infrastructure changes |
| 🩺 | `:stethoscope:` | `feat` | Healthcheck |
| 🔧 | `:wrench:` | `config` | Configuration files |
| 🔨 | `:hammer:` | `build` | Dev scripts |
| 👷 | `:construction_worker:` | `ci` | CI build system |
| 💚 | `:green_heart:` | `ci` | Fix CI build |
| 🚀 | `:rocket:` | `ci` | Deploy |
| 🎉 | `:tada:` | `chore` | Init project |
| 🔖 | `:bookmark:` | `chore` | Release / version tag |
| 🗑️ | `:wastebasket:` | `chore` | Deprecate code |
| 🔥 | `:fire:` | `chore` | Remove code/files |
| 🙈 | `:see_no_evil:` | `chore` | .gitignore |
| 🧑‍💻 | `:technologist:` | `chore` | Dev experience |
| ⬆️ | `:arrow_up:` | `chore` | Upgrade dependency |
| ⬇️ | `:arrow_down:` | `chore` | Downgrade dependency |
| 📌 | `:pushpin:` | `chore` | Pin dependency |
| ➕ | `:heavy_plus_sign:` | `build` | Add dependency |
| ➖ | `:heavy_minus_sign:` | `build` | Remove dependency |
| 📦️ | `:package:` | `build` | Compiled packages |
| ⏪️ | `:rewind:` | `revert` | Revert changes |
| 🔀 | `:twisted_rightwards_arrows:` | — | Merge branches |
| 🌐 | `:globe_with_meridians:` | `feat` | i18n / l10n |
| 💫 | `:dizzy:` | `feat` | Animations |
| 📱 | `:iphone:` | `feat` | Responsive design |
| ♿️ | `:wheelchair:` | `feat` | Accessibility |
| 🚸 | `:children_crossing:` | `feat` | UX / usability |
| 🚩 | `:triangular_flag_on_post:` | `feat` | Feature flags |
| 👔 | `:necktie:` | `feat` | Business logic |
| 🏷️ | `:label:` | `feat` | Types / interfaces |
| 🧵 | `:thread:` | `perf` | Multithreading |
| 🦺 | `:safety_vest:` | `feat` | Validation |
| 🛂 | `:passport_control:` | `feat` | Auth / roles |
| 📈 | `:chart_with_upwards_trend:` | `feat` | Analytics |
| 💬 | `:speech_balloon:` | `feat` | Text / literals |
| 🗃️ | `:card_file_box:` | `feat` | Database changes |
| 🍱 | `:bento:` | `feat` | Assets |
| 🚧 | `:construction:` | `wip` | Work in progress |
| 🔐 | `:closed_lock_with_key:` | `config` | Secrets |
| 🌱 | `:seedling:` | `chore` | Seed files |
