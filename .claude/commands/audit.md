---
description: Run full quality audit — lint, tests, build, bundle size check
---

Run a complete quality audit of the project and report what passes and what fails.

## Steps

1. **Lint**: Run `pnpm lint` and capture output
2. **Format**: Run `pnpm format:check` and capture output
3. **Typecheck**: Run `npx tsc --noEmit -p tsconfig.app.json`
4. **Unit tests**: Run `pnpm test -- --run` and report pass/fail + count
5. **Build**: Run `pnpm build` and capture any warnings
6. **Bundle size**: After build, check `dist/` size:
   - Report total size
   - Warn if any chunk > 500KB
   - Report gzip estimates if available
7. **Security**: Run `pnpm audit --audit-level=moderate`

## Report format

After running all steps, output a summary table:

```
Audit Results — <timestamp>
─────────────────────────────────────
[pass/fail] Lint
[pass/fail] Format
[pass/fail] TypeScript
[pass/fail] Unit Tests (X/Y passed)
[pass/fail] Build
[info]      Bundle size: Xmb total
[pass/fail] Security audit
─────────────────────────────────────
Overall: PASS / FAIL
```

If anything fails, list the specific errors and suggest fixes.

Do NOT stop on first failure — run all steps and report everything at the end.
