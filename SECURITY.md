# Security Policy

[info] This document outlines security practices for this project.

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email [dev@sandovaldavid.com](mailto:dev@sandovaldavid.com) instead of using the public issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge receipt within 24 hours and provide a target date for resolution.

## Supported Versions

Security updates are provided for the latest version only.

| Version | Supported |
|---------|-----------|
| Latest | [info] Yes |
| Previous | [warning] No |

## Security Measures

### Dependency Management

[info] Dependencies are automatically scanned for vulnerabilities:

- Weekly dependency updates via Dependabot
- Automatic security audits in CI/CD and locally, both at `pnpm audit --audit-level=high`
- Lockfile integrity validation (`pnpm install --frozen-lockfile`)

### Code Quality

[info] Security-focused code quality checks:

- TypeScript strict mode enabled
- ESLint + angular-eslint (including template accessibility rules)
- No hardcoded secrets (pre-commit hooks)
- Code review required for all changes

### CI/CD Security

[info] GitHub Actions security practices:

- Minimal workflow permissions (least privilege principle)
- Secrets encrypted and scoped to environments
- No shell injection risks (proper input handling)
- Build artifacts scanned before deployment

### Best Practices for Contributors

1. [info] Never commit sensitive data (API keys, tokens, passwords)
2. [info] Use environment variables for configuration
3. [info] Keep dependencies up-to-date
4. [warning] Don't disable security checks (no `--audit-level=off`)
5. [warning] Don't bypass pre-commit hooks (`--no-verify`)

## Compliance

[info] This project maintains:

- Secure dependency supply chain
- Regular security audits
- Prompt vulnerability responses
- Transparent security practices

## Security Tools

The following tools are integrated:

| Tool | Purpose | Frequency |
|------|---------|-----------|
| Dependabot | Dependency scanning | Weekly |
| pnpm audit | Vulnerability detection | Every CI run |
| GitHub Secret Scanning | Accidental secret detection | Real-time |
| Type checking (TypeScript) | Reduce runtime errors | Every build |
| ESLint | Code quality & security | Every PR |

## Deployment Security

[warning] Production deployments:

- Automated via GitHub Actions + Vercel on push to `main` (only `develop` → `main` PRs are allowed, so changes pass PR checks first)
- Security headers (CSP, HSTS, Permissions-Policy) enforced via `vercel.json`
- Known gap: the deploy workflow does not yet block on CI status — hardening tracked in `docs/tasks/02-ci-deploy-gating.md`

---

[info] Thank you for helping keep this project secure!
