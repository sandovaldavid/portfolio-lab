# devsandoval-portfolio

Portfolio website built with [Analog](https://analogjs.org), the fullstack meta-framework for Angular 21+. Features include bilingual content (ES/EN), feature-sliced design architecture, and pixel NES aesthetics.

## Prerequisites

- Node.js >= 20.19.1
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

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with HMR |
| `pnpm build` | Build for production (client + server) |
| `pnpm test` | Run tests once |
| `pnpm test:ui` | Run tests with UI dashboard |
| `pnpm test:coverage` | Generate coverage report |
| `pnpm lint` | Run ESLint checks |
| `pnpm lint:fix` | Fix linting issues |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting |
| `pnpm audit` | Check for vulnerabilities |
| `pnpm preview` | Preview production build locally |

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

### Pull Requests

- Only `develop` → `main` PRs are allowed
- All CI checks must pass (lint, format, typecheck, tests)
- Create PRs with clear descriptions

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Deployment

Auto-deploys to [Vercel](https://vercel.com):
- `develop` branch → Preview URL
- `main` branch → Production (devsandoval.me)

## Technology Stack

- **Framework**: Angular 21, Analog (SSR/SSG)
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

## Security

Please report security vulnerabilities to [dev@sandovaldavid.com](mailto:dev@sandovaldavid.com) instead of using the issue tracker.

See [SECURITY.md](./SECURITY.md) for more details.

## Resources

- [Analog Documentation](https://analogjs.org)
- [Angular Documentation](https://angular.io)
- [Vite Documentation](https://vitejs.dev)
