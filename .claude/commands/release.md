---
description: Create a new release with changelog and version bump
---

Create a new release for the portfolio following the project's semantic versioning setup.

## Pre-release checklist (verify before proceeding)

1. Current branch is `main` — if not, stop and tell the user
2. Working tree is clean (`git status`)
3. All CI checks are passing (ask user to confirm or check `gh run list`)

## Steps

1. Show recent commits since last tag:
   ```bash
   git log $(git describe --tags --abbrev=0)..HEAD --oneline
   ```

2. Suggest version bump based on commit types:
   - Has `feat` commits → minor bump (e.g. 1.0.0 → 1.1.0)
   - Only `fix`/`perf` commits → patch bump (e.g. 1.0.0 → 1.0.1)
   - Has `BREAKING CHANGE` → major bump (e.g. 1.0.0 → 2.0.0)

3. Show the user what CHANGELOG.md will contain and ask for confirmation

4. Run dry-run first:
   ```bash
   pnpm release:dry
   ```

5. If dry-run looks correct, run:
   ```bash
   pnpm release
   ```
   This will: bump version in package.json, update CHANGELOG.md, create git tag, push, create GitHub release.

## Post-release

- Report the new version and GitHub release URL
- Confirm the deploy workflow triggered on `main`

## Notes

- Release only runs from `main` branch (enforced by `.release-it.json`)
- GitHub token needs `repo` scope for creating releases
- Set `GITHUB_TOKEN` in environment or use `gh auth token`
