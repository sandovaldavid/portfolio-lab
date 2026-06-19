# devsandoval-portfolio

[![CI](https://github.com/sandovaldavid/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/sandovaldavid/portfolio/actions/workflows/ci.yml)
[![Deploy](https://github.com/sandovaldavid/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/sandovaldavid/portfolio/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/sandovaldavid/portfolio/actions/workflows/codeql.yml/badge.svg)](https://github.com/sandovaldavid/portfolio/actions/workflows/codeql.yml)
[![Angular](https://img.shields.io/badge/Angular-22-red?logo=angular)](https://angular.io)
[![Built with Analog](https://img.shields.io/badge/Built%20with-Analog-blue)](https://analogjs.org)
[![License](https://img.shields.io/github/license/sandovaldavid/portfolio)](LICENSE)

Portfolio website built with [Analog](https://analogjs.org), the fullstack meta-framework for Angular 22+. Features include bilingual content (ES/EN), feature-sliced design architecture, and pixel NES aesthetics.

## Prerequisites

- Node.js >= 22.13.0
- pnpm >= 11.7.0 ([install pnpm](https://pnpm.io/installation))

## Quick Start

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev
# Navigate to http://localhost:5173/

# Build for production
pnpm build

# Run tests
pnpm test

# Check code quality
pnpm lint
pnpm format:check
```

## Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with HMR |
| `pnpm build` | Build for production (client + server) |
| `pnpm preview` | Preview production build locally |

### Testing

| Command | Description |
|---------|-------------|
| `pnpm test` | Run unit tests (watch mode) |
| `pnpm test:ui` | Run tests with visual UI dashboard |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm test:e2e` | Run E2E tests with Playwright |
| `pnpm test:e2e:ui` | Run E2E tests in interactive mode |

### Quality & Performance

| Command | Description |
|---------|-------------|
| `pnpm lint` | Run ESLint checks |
| `pnpm lint:fix` | Fix linting issues automatically |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check code formatting |
| `pnpm audit` | Check for dependency vulnerabilities |
| `pnpm lighthouse` | Run Lighthouse CI audit |

## Project Structure

Uses **Feature-Sliced Design (FSD)** architecture:

```
src/
├── app/
│   ├── shared/      # Shared utilities, types, pipes
│   ├── entities/    # Domain entities
│   ├── features/    # Feature modules
│   └── widgets/     # Presentational components
├── main.ts          # Client entry point
├── main.server.ts   # Server entry point
└── test-setup.ts    # Test configuration
```

## Development Workflow

### Before Committing

Code quality is enforced via pre-commit hooks:
- ESLint check
- Unit tests

Commits follow [Conventional Commits](./CONTRIBUTING.md#commit-conventions) with type prefixes.

### Pull Requests & Branch Protection

- Enforced via **GitHub Rulesets** (direct commits to `main` and `develop` are blocked)
- Only `develop` → `main` PRs are allowed
- All CI checks must pass (lint, format, typecheck, tests)
- Create PRs with clear descriptions

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Deployment

Auto-deploys to [Vercel](https://vercel.com):
- `develop` branch → Preview URL
- `main` branch → Production (devsandoval.me)

## Technology Stack

- **Framework**: Angular 22, Analog (SSR/SSG)
- **Build Tool**: Vite 7
- **Testing**: Vitest, Testing Library
- **Styling**: Tailwind CSS 4
- **Linting**: ESLint 9, TypeScript ESLint
- **Formatting**: Prettier
- **Commit Validation**: Commitlint, Husky
- **Deployment**: Vercel

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines on:
- Development setup
- Commit conventions
- PR requirements
- Code standards

## Testing & Quality

### Unit Tests

Run with Vitest. Coverage reports generated automatically.

```bash
pnpm test:coverage
open coverage/index.html
```

See [coverage reports](https://github.com/sandovaldavid/portfolio/actions) in GitHub Actions.

### End-to-End Tests

Run with Playwright. Tests all major user flows.

```bash
pnpm test:e2e
```

See [E2E_TESTING.md](./E2E_TESTING.md) for detailed guide.

### Performance Audits

Automatic Lighthouse CI audits on every push:

- Performance (target: 90+)
- Accessibility (target: 95+)
- Best Practices (target: 90+)
- SEO (target: 95+)

See [LIGHTHOUSE_CI.md](./LIGHTHOUSE_CI.md) for details.

### Reports Dashboard

Reports are generated on every push and available as artifacts in GitHub Actions:

- **Actions tab** → select any run → **Artifacts** section → download `reports-*`
- Includes: bundle analysis, test coverage
- Lighthouse reports are artifacts in the Lighthouse CI workflow runs

## Security

Please report security vulnerabilities to [dev@sandovaldavid.com](mailto:dev@sandovaldavid.com) instead of using the issue tracker.

See [SECURITY.md](./SECURITY.md) for more details.

## Resources

- [Analog Documentation](https://analogjs.org)
- [Angular Documentation](https://angular.io)
- [Vite Documentation](https://vitejs.dev)

