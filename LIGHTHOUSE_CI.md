# Lighthouse CI Configuration

[info] This document explains the Lighthouse CI setup and how to use it.

## Overview

[info] Lighthouse CI automatically audits your application for:

- **Performance**: Load times, rendering, interactions
- **Accessibility**: ARIA, semantic HTML, color contrast
- **Best Practices**: Security, code quality, browser features
- **SEO**: Mobile-friendly, structured data, indexing

## Configuration

### Settings (`lighthouserc.json`)

```json
{
  "ci": {
    "collect": {
      "startServerCommand": "node dist/analog/server/index.mjs",
      "url": [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/projects"
      ],
      "numberOfRuns": 2,
      "settings": {
        "chromeFlags": "--no-sandbox --disable-dev-shm-usage",
        "preset": "desktop",
        "onlyCategories": ["performance", "accessibility", "best-practices", "seo"]
      }
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.8 }],
        "categories:accessibility": ["error", { "minScore": 0.9 }],
        "categories:best-practices": ["error", { "minScore": 0.85 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

The audit runs against the **production build** served on `:3000` (started automatically via `startServerCommand`), auditing 3 URLs with 2 runs each.

### Thresholds

Current minimum scores:

| Category | Threshold | Type |
|----------|-----------|------|
| Performance | 80% | Error |
| Accessibility | 90% | Error |
| Best Practices | 85% | Error |
| SEO | 90% | Error |

[warning] Failed thresholds block PRs.

## Running Locally

### Generate Report

```bash
# Build first
pnpm build

# Run Lighthouse CI
pnpm lighthouse
```

Reports are saved to `./lighthouse-results/`

### View Results

```bash
# Open in browser (macOS)
open lighthouse-results/index.html

# Open in browser (Linux)
xdg-open lighthouse-results/index.html
```

## CI/CD Integration

### Automatic Audits

[info] Lighthouse CI runs automatically on:

- **Pull Requests**: to main/develop branches (`.github/workflows/lighthouse.yml`)

### Viewing Results

1. **In Pull Request**: Comment shows score summary
2. **In Workflow Artifacts**: Full reports uploaded to GitHub Actions (`lighthouse-reports`)

## Understanding Scores

### Performance (Threshold: 80+)

Focus areas:

- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### Accessibility (Threshold: 90+)

Focus areas:

- Proper heading hierarchy
- Color contrast > 4.5:1
- Form labels and descriptions
- ARIA attributes

### Best Practices (Threshold: 85+)

Focus areas:

- No deprecation warnings
- HTTPS enabled
- No console errors
- Modern browser APIs

### SEO (Threshold: 90+)

Focus areas:

- Mobile friendly
- Proper meta tags
- Structured data
- Robots.txt present

## Improving Scores

### Performance Improvements

```typescript
// Bad: No image optimization
<img src="large-image.jpg" />

// Good: Optimized with Vercel Image Optimization
<img src="image.jpg" loading="lazy" />
```

### Accessibility Improvements

```html
<!-- Bad: No label -->
<input type="email" />

<!-- Good: With label -->
<label for="email">Email:</label>
<input id="email" type="email" />
```

### Best Practices

```typescript
// Bad: HTTP
<link rel="stylesheet" href="http://cdn.example.com/style.css">

// Good: HTTPS
<link rel="stylesheet" href="https://cdn.example.com/style.css">
```

## Handling Failures

### When Tests Fail

1. [info] Check the Lighthouse report in workflow artifacts
2. [info] Review specific failing audit
3. [warning] If temporary, can suppress with:

```json
{
  "assert": {
    "assertions": {
      "categories:performance": "off"
    }
  }
}
```

[warning] **Warning**: Only suppress with good reason!

### Common Issues

#### High First Contentful Paint (FCP)

```typescript
// Solution: Lazy load heavy components
import { lazy } from 'angular';

const HeavyComponent = lazy(() => import('./heavy.component'));
```

#### Layout Shifts

```css
/* Reserve space for dynamic content */
.image-container {
  aspect-ratio: 16 / 9;
  background: #f0f0f0;
}
```

#### Accessibility Issues

```html
<!-- Add alt text -->
<img src="photo.jpg" alt="David Sandoval at conference" />

<!-- Add ARIA labels -->
<button aria-label="Close menu">×</button>
```

## Testing Locally

### Mobile Simulation

Lighthouse simulates mobile by default (Moto G4):

```bash
# Desktop simulation
LIGHTHOUSE_CI=1 lhci autorun --config=lighthouserc-desktop.json
```

### Network Throttling

Tests use "Slow 4G" network simulation. To test fast:

```json
{
  "ci": {
    "collect": {
      "settings": {
        "throttle": false
      }
    }
  }
}
```

## Reports as Artifacts

[info] All reports are uploaded as GitHub Actions artifacts (the old GitHub Pages dashboard was removed in #120):

- [success] Bundle analysis (`bundle-stats`, Rollup visualizer)
- [success] Lighthouse audit scores (`lighthouse-reports`)
- [success] Test coverage reports (`coverage-report`)

Access: Actions tab → select a run → Artifacts section.

## Best Practices

### 1. Monitor Trends

[info] Run weekly to track improvements over time

### 2. Optimize for Real Users

Focus on metrics that matter:

- Actual users' experience
- Network conditions
- Device capabilities

### 3. Test on Different Devices

Tests cover:

- Desktop Chrome
- Mobile Chrome
- Firefox
- Safari

### 4. Automate Regularly

[info] Weekly schedule catches regressions early

### 5. Address Warnings

[warning] Don't ignore warnings - they may become errors

## Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Web Vitals](https://web.dev/vitals/)
- [Web Accessibility](https://www.w3.org/WAI/)

## Troubleshooting

### Tests pass locally but fail in CI

[warning] Possible causes:

- Different network conditions in CI
- Chrome flags differences
- Timeout issues

Solution: Add more runs and increase timeouts in CI

### Scores fluctuate

[info] Expected - adjust thresholds to account for variation:

```json
{
  "categories:performance": ["error", { "minScore": 0.75 }]
}
```

### Timeouts

Increase timeout in `lighthouserc.json`:

```json
{
  "ci": {
    "collect": {
      "settings": {
        "maxWaitForLoad": 45000
      }
    }
  }
}
```
