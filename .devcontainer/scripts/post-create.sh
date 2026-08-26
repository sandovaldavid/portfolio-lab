#!/usr/bin/env bash
set -euo pipefail

REPOSITORY_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$REPOSITORY_ROOT"

expected_pnpm_version="$(node -p "require('./package.json').packageManager.match(/^pnpm@([^+]+)/)[1]")"
actual_pnpm_version="$(pnpm --version)"
if [[ "$actual_pnpm_version" != "$expected_pnpm_version" ]]; then
  echo "Unsupported pnpm version: ${actual_pnpm_version}. Expected ${expected_pnpm_version}." >&2
  exit 1
fi

pnpm install --frozen-lockfile
pnpm exec ng version

printf '\nPortfolio Lab development container ready with pnpm %s.\n' "$actual_pnpm_version"
