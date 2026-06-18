# Contributing to devsandoval-portfolio

[info] Thanks for your interest in contributing! This document provides guidelines for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Code Standards](#code-standards)
- [Testing](#testing)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person

## Getting Started

### Prerequisites

- Node.js >= 20.19.1
- pnpm >= 11.7.0
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/sandovaldavid/portfolio.git
   ```

4. Install dependencies:
   ```bash
   pnpm install
   ```

5. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

## Development Workflow

### Local Development

1. Start the dev server:
   ```bash
   pnpm dev
   ```

2. Open http://localhost:5173 in your browser

3. Code with HMR (Hot Module Replacement) enabled

### Before Committing

Run the following checks locally:

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Check formatting
pnpm format:check

# Fix formatting
pnpm format

# Run tests
pnpm test

# Type check
npx tsc --noEmit -p tsconfig.app.json
```

[warning] All checks must pass before committing (enforced by Husky pre-commit hooks).

### Building

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Commit Conventions

[info] This project uses [Conventional Commits](https://www.conventionalcommits.org/) format.

### Format

```
<type>(<scope>): <subject>
```

### Types

- **feat** - New feature
- **fix** - Bug fix
- **docs** - Documentation changes
- **style** - Code style changes (formatting, missing semicolons, etc.)
- **refactor** - Code refactoring without feature/fix changes
- **perf** - Performance improvements
- **test** - Adding or updating tests
- **build** - Build system, dependencies changes
- **ci** - CI/CD configuration changes
- **chore** - Other changes (deps update, package.json, etc.)
- **arch** - Architecture changes
- **config** - Configuration changes
- **lint** - Linting changes

### Examples

```
feat(auth): add email verification
fix(routes): resolve navigation issue on mobile
docs(readme): update setup instructions
style(components): format button styles
refactor(services): simplify api client
perf(bundle): reduce main.ts chunk size
test(auth): add login flow tests
build: upgrade vite to v7
ci: add lighthouse check
chore(deps): update dependencies
arch(fsd): restructure features folder
config(eslint): add new rules
lint: fix eslint warnings
```

### Subject Line Rules

- Use lowercase (except acronyms)
- No period (.) at the end
- Max 50 characters
- Imperative mood ("add" not "added" or "adds")

## Pull Request Process

### Before Opening a PR

1. [info] **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/develop
   ```

2. [info] **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

### PR Guidelines

1. [warning] **Target the right branch**: Always PR to `develop` (not `main`)

2. [info] **Clear description**:
   ```markdown
   ## Description
   Brief explanation of changes

   ## Type of Change
   - [ ] New feature
   - [ ] Bug fix
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Unit tests added/updated
   - [ ] Manual testing done
   - [ ] No test coverage issues

   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Commit messages follow conventions
   - [ ] Self-reviewed my changes
   - [ ] No unnecessary console logs
   ```

3. [info] **Keep it focused**: One feature or fix per PR

4. [warning] **Tests required**:
   - Minimum 50% code coverage
   - All existing tests must pass
   - New features should have tests

5. [warning] **CI must pass**:
   - ESLint check
   - Prettier format check
   - TypeScript type check
   - Unit tests
   - Build successful

### Merging

- PRs are squashed into a single commit
- Merge only through GitHub (requires CI to pass)
- Only `develop` → `main` allowed via workflow

## Code Standards

### General Principles

- [info] **DRY**: Don't Repeat Yourself
- [info] **SOLID**: Apply SOLID principles
- [info] **KISS**: Keep It Simple, Stupid
- [info] **Readability**: Code is read more than written

### TypeScript

- Always use strict mode (enforced)
- Explicit types over `any`
- Use meaningful variable names
- Avoid index signatures when possible

```typescript
// [error] Bad
const data: any = fetchData();

// [success] Good
interface User {
  id: string;
  name: string;
  email: string;
}
const user: User = await fetchUser(id);
```

### Angular Components

- Use standalone components (Angular 14+)
- Signal-based reactivity over BehaviorSubject
- OnPush change detection strategy
- Proper component naming (PascalCase for components)

```typescript
// [success] Good
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div>{{ user().name }}</div>`,
})
export class UserCardComponent {
  user = input.required<User>();
}
```

### File Organization

```
src/app/
├── shared/         # Shared across features
│   ├── pipes/      # Custom pipes
│   ├── directives/ # Custom directives
│   └── types/      # Shared types
├── entities/       # Domain entities
├── features/       # Feature modules
│   └── auth/
│       ├── login/
│       ├── signup/
│       └── services/
└── widgets/        # Presentational components
```

### Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase + Component | `UserCardComponent` |
| Services | PascalCase + Service | `AuthService` |
| Interfaces | PascalCase with I prefix | `IUser`, `IAuthResponse` |
| Variables | camelCase | `userName`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_TIMEOUT`, `API_KEY` |
| Files | kebab-case | `user-card.component.ts` |

### HTML/Templates

- Use semantic HTML
- Accessible form elements
- Proper ARIA labels
- Avoid inline styles (use Tailwind)

## Testing

### Unit Tests

```typescript
// [success] Good
describe('LoginComponent', () => {
  it('should submit form with valid credentials', () => {
    // Arrange
    const component = TestBed.createComponent(LoginComponent);

    // Act
    component.component.emailInput.setValue('test@example.com');
    component.component.submit();

    // Assert
    expect(component.component.isLoading()).toBe(false);
  });
});
```

### Coverage Requirements

- [info] Minimum 50% overall coverage
- [warning] 80% for critical paths (auth, payments, etc.)
- [warning] 100% for utility functions

```bash
# Check coverage
pnpm test:coverage

# View HTML report
open coverage/index.html
```

### Running Tests

```bash
# Run once
pnpm test -- --run

# Watch mode
pnpm test

# UI dashboard
pnpm test:ui

# Coverage
pnpm test:coverage
```

## Review Process

### For Contributors

- Address all feedback promptly
- Don't force-push after review starts (makes tracking hard)
- Keep discussions professional and technical

### For Reviewers

- Be constructive and specific
- Suggest improvements, don't demand
- Approve only when confident
- Remember: perfect is enemy of good

## Questions?

- Email: hello@sandovaldavid.com
- Issues: [GitHub Issues](https://github.com/devsandoval/portfolio/issues)

---

[success] Thank you for contributing!
