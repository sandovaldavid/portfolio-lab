# Gitmoji Mapping Reference

Complete reference of approved gitmojis, types, and usage examples for the DevSandoval V4.0 Elite Edition commit protocol.

## Development & Logic

### ✨ `:sparkles:` - New Features
- **Type:** `feat`
- **Usage:** Adding new functionality, features, or capabilities
- **Examples:**
  ```
  ✨ feat(api): add LSTM prediction endpoint
  ✨ feat(auth): implement JWT token refresh
  ✨ feat(signals): add computed signals for state
  ```

### 🐛 `:bug:` - Bug Fixes
- **Type:** `fix`
- **Usage:** Fixing bugs, errors, or incorrect behavior
- **Examples:**
  ```
  🐛 fix(signals): prevent memory leak on destroy
  🐛 fix(auth): resolve token expiration edge case
  🐛 fix(lstm): correct gradient calculation
  ```

### 🧪 `:test_tube:` - Tests
- **Type:** `test`
- **Usage:** Adding or updating tests
- **Examples:**
  ```
  🧪 test(core): add unit tests for gate activation
  🧪 test(api): add integration tests for endpoints
  🧪 test(signals): add component lifecycle tests
  ```

### 🏗️ `:building_construction:` - Architecture
- **Type:** `arch`
- **Usage:** Structural or architectural changes
- **Examples:**
  ```
  🏗️ arch(shared): migrate to standalone components
  🏗️ arch(core): restructure module hierarchy
  🏗️ arch(api): implement layered architecture
  ```

### ⚡ `:zap:` - Performance
- **Type:** `perf`
- **Usage:** Performance improvements and optimizations
- **Examples:**
  ```
  ⚡ perf(db): optimize query for high-frequency logs
  ⚡ perf(lstm): reduce batch processing time
  ⚡ perf(signals): memoize computed values
  ```

---

## Maintenance & Quality

### 🎨 `:art:` - Code Style/Format
- **Type:** `style`
- **Usage:** Code formatting, structure, visual improvements
- **Examples:**
  ```
  🎨 style(theme): adjust padding for mobile layout
  🎨 style(components): align button spacing
  🎨 style(api): reformat controller methods
  ```

### ♻️ `:recycle:` - Refactoring
- **Type:** `refactor`
- **Usage:** Code refactoring without changing functionality
- **Examples:**
  ```
  ♻️ refactor(auth): simplify JWT validation logic
  ♻️ refactor(services): extract common utilities
  ♻️ refactor(lstm): reorganize model layers
  ```

### 📝 `:memo:` - Documentation
- **Type:** `docs`
- **Usage:** Documentation changes, updates, or additions
- **Examples:**
  ```
  📝 docs(readme): update MEXT research background
  📝 docs(api): add endpoint documentation
  📝 docs(thesis): update methodology section
  ```

### 🚨 `:rotating_light:` - Linter Fixes
- **Type:** `lint`
- **Usage:** Fixing linter warnings or errors
- **Examples:**
  ```
  🚨 lint(api): fix naming convention warnings
  🚨 lint(components): resolve unused imports
  🚨 lint(core): fix accessibility warnings
  ```

### 🗑️ `:wastebasket:` - Code Removal
- **Type:** `chore`
- **Usage:** Removing deprecated code or unused files
- **Examples:**
  ```
  🗑️ chore(legacy): remove deprecated RxJS services
  🗑️ chore(api): delete unused endpoints
  🗑️ chore(models): remove obsolete data structures
  ```

---

## DevOps & Infrastructure

### 🔧 `:wrench:` - Configuration
- **Type:** `config`
- **Usage:** Configuration file changes
- **Examples:**
  ```
  🔧 config(husky): add commitlint validation
  🔧 config(tsconfig): enable strict mode
  🔧 config(env): add production variables
  ```

### 👷 `:construction_worker:` - CI/CD
- **Type:** `ci`
- **Usage:** CI/CD pipeline changes
- **Examples:**
  ```
  👷 ci(github): add build pipeline for Angular 19
  👷 ci(azure): configure deployment workflow
  👷 ci(tests): add automated test runs
  ```

### ⬆️ `:arrow_up:` - Dependency Upgrades
- **Type:** `chore`
- **Usage:** Upgrading dependencies or versions
- **Examples:**
  ```
  ⬆️ chore(deps): upgrade to .NET 8.0.2
  ⬆️ chore(npm): update Angular to v19
  ⬆️ chore(python): upgrade tensorflow to 2.15
  ```

---

## Context-Specific Scopes

### .NET Backend
- `(api)` - API endpoints, controllers
- `(auth)` - Authentication, authorization
- `(core)` - Core business logic
- `(services)` - Service layer
- `(models)` - Data models, entities
- `(db)` - Database operations

### Angular Frontend
- `(signals)` - Angular signals
- `(components)` - UI components
- `(services)` - Frontend services
- `(guards)` - Route guards
- `(interceptors)` - HTTP interceptors
- `(theme)` - Theming, styling

### LSTM/ML Research
- `(lstm)` - LSTM model
- `(dataset)` - Dataset management
- `(preprocessing)` - Data preprocessing
- `(model)` - Model architecture
- `(training)` - Training logic
- `(evaluation)` - Model evaluation

### Documentation & Tooling
- `(readme)` - README files
- `(docs)` - Documentation
- `(thesis)` - Thesis work
- `(husky)` - Git hooks
- `(github)` - GitHub workflows
- `(deps)` - Dependencies

---

## Additional Valid Types

These types are valid but less commonly used:

- `build` - Build system changes
- `revert` - Reverting previous commits

---

## Quick Reference: Type Selection

| Change Type | Gitmoji | Type |
|-------------|---------|------|
| New feature | ✨ | `feat` |
| Bug fix | 🐛 | `fix` |
| Documentation | 📝 | `docs` |
| Code style | 🎨 | `style` |
| Refactoring | ♻️ | `refactor` |
| Performance | ⚡ | `perf` |
| Tests | 🧪 | `test` |
| CI/CD | 👷 | `ci` |
| Configuration | 🔧 | `config` |
| Architecture | 🏗️ | `arch` |
| Linter fixes | 🚨 | `lint` |
| Remove code | 🗑️ | `chore` |
| Upgrade deps | ⬆️ | `chore` |
