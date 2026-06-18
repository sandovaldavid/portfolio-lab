---
description: Create a new technical note/blog post in the notes section
---

Create a new markdown note for the portfolio's `/notes` section.

Ask the user for:
1. Title of the note
2. Slug (kebab-case URL, e.g. `binary-search`)
3. Category (algorithm | pattern | concept | tool | other)
4. Language (es | en | both)
5. Brief description

## Steps

1. Create the markdown file at `src/content/notes/<slug>.md` (or `<slug>.en.md` / `<slug>.es.md` for both)

2. Use this frontmatter structure:
```markdown
---
title: "<title>"
slug: "<slug>"
description: "<brief description>"
category: "<category>"
date: "<YYYY-MM-DD>"
tags: []
---

# <title>

<!-- content here -->
```

3. Add the new route to `vite.config.ts` in the `prerender.routes` array:
```typescript
'/notes/<slug>',
```

4. Verify the note renders by running `pnpm dev` and navigating to `/notes/<slug>`.

5. If adding E2E coverage, add a test to `e2e/navigation.spec.ts` for the new route.

## Notes

- Content is rendered with `marked` + `prismjs` for syntax highlighting
- Supported code languages: JS, TS, C#, HTML, CSS, bash, and standard prism langs
- Images go in `public/notes/<slug>/`
- Keep notes focused: one concept per post
