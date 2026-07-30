---
description: Review and merge the pending release-please PR
---

Releases in this repo are fully automated via [release-please](https://github.com/googleapis/release-please) — there is no manual release command. release-please watches conventional commits on `develop` (beta) and `main` (stable) and keeps an up-to-date release PR open per branch with the version bump and generated `CHANGELOG.md` entries. Merging that PR is what cuts the release (git tag + GitHub release + changelog).

## Steps

1. Confirm the current branch (`develop` for a beta release, `main` for a stable release) and that the working tree is clean.

2. Find the open release-please PR targeting that branch:
   ```bash
   gh pr list --base <develop-or-main> --search "in:title release" --state open
   ```

3. Show the user the PR title (contains the version bump) and its diff (mainly `CHANGELOG.md` and the manifest file) so they can review what's being released.

4. Confirm all required CI checks pass on that PR:
   ```bash
   gh pr checks <number>
   ```

5. Ask the user to confirm before merging — merging is the action that actually creates the tag and GitHub release.

6. If confirmed, merge the PR (respect this repo's merge conventions, typically squash):
   ```bash
   gh pr merge <number> --squash
   ```

## Post-release

- Report the new version and GitHub release URL (`gh release view <tag>`)
- Confirm the deploy workflow triggered on the target branch

## Notes

- release-please is the only release system here — never bump `version` in `package.json`, hand-edit `CHANGELOG.md`, or create `v*` tags manually (see `docs/tasks/05-chore-release-and-deps.md` for why `release-it` was removed).
- Beta config: `release-please-config.beta.json` / `.release-please-manifest.beta.json` (branch `develop`).
- Stable config: `release-please-config.stable.json` / `.release-please-manifest.stable.json` (branch `main`).
- GitHub token needs `repo` scope; use `gh auth token` or ensure `gh` is already authenticated.
