---
title: Hero Section Design Refinement Specification
version: 1.0
date_created: 2026-06-17
owner: Juan David Sandoval
tags: [design, styling, ui, frontend]
---

# Introduction

This specification defines the design refinements and visual enhancements for the portfolio's Hero section after the removal of the redundant technology pills row (Option A). The goal is to maximize visual impact, polish micro-animations, and optimize layout breathing room.

## 1. Purpose & Scope

The purpose is to refine the `HeroComponent`'s spacing, interactive elements, typography scaling, and animation curves. This document serves as the guide for frontend styling adjustments in `hero.component.html`, `hero.component.css`, and related assets.

## 2. Definitions

- **Vignette**: A soft gradient overlay that darkens or fades edges, drawing focus to the center.
- **Stagger Delay**: The sequential delay applied to sibling entrance animations to create a cascading reveal effect.
- **CTA**: Call to Action (buttons directing the user to navigate or initiate contact).
- **Prism/AnalogJS**: The server-side rendering framework and markdown compiler tools powering the site.

## 3. Requirements, Constraints & Guidelines

- **REQ-001 (Breathing Spacing)**: With the technology stack row removed, the spacing between the CTA buttons container and the scroll indicator must be adjusted to maintain balance. The scroll indicator must have a minimum top margin of `3rem` (`mt-12`) to prevent cluttering near the buttons.
- **REQ-002 (Typewriter Polish)**: The typewriter blinking cursor (`▌`) must utilize the `--color-primary` CSS variable for color-coding, matching the active portfolio theme (green/cyan for Architect, dark blue/gold for Research).
- **REQ-003 (Hover/Micro-interaction)**: The "Available for projects" status badge at the top of the Hero must have a subtle hover animation (scale up 2%, increase indicator glow radius) to increase responsiveness.
- **REQ-004 (Responsive Text Scaling)**: The main heading (`H1`) text size must scale fluidly: `text-4xl` for mobile, `text-5xl` for tablets, and `text-6xl md:text-7xl` for desktops to avoid clipping on narrow viewports.
- **CON-001**: Must remain 100% hydration-safe and comply with Angular's `OnPush` change detection lifecycle.
- **CON-002**: Must adapt seamlessly to both theme modes (`mode-architect` and `mode-research`) using native CSS variables.

## 4. Interfaces & Data Contracts

No external API changes. CSS classes and Tailwind utility values will represent the configuration interfaces.

## 5. Acceptance Criteria

- **AC-001**: Given the home page is loaded, When it completes rendering, Then the Hero components animate sequentially from the top badge to the scroll hint without gaps in the stagger index sequence.
- **AC-002**: Given mobile viewport (320px width), When the typewriter finishes printing the longest phrase, Then the text wraps naturally within the viewport bounds without breaking layout boundaries.
- **AC-003**: The "Available" status badge glow pulse remains active continuously.

## 6. Test Automation Strategy

- **Visual Inspection**: Verified across both themes (`mode-architect` / `mode-research`) using headless Chrome DevTools screenshots.
- **Cross-device Testing**: Responsive viewport audit for sizes 360px, 768px, 1024px, 1440px.

## 7. Rationale & Context

Removing the technology pills left a larger vertical space before the scroll indicator. By adjusting the stagger delay chain and setting a cleaner `margin-top`, we preserve the alignment hierarchy. Adding micro-animations to the status indicator badge and blinking cursor reinforces the premium, interactive tech theme.

## 8. Dependencies & External Integrations

- **TailwindCSS v4**: Used for fluid spacing and transitions.
- **ModeStateService**: Provides reactive theme triggers.

## 9. Examples & Edge Cases

```css
/* Blinking terminal cursor styling */
.typewriter-cursor {
  color: var(--color-primary);
  text-shadow: 0 0 8px var(--color-primary-glow);
  animation: cursor-blink 0.8s step-end infinite;
}
```

## 10. Validation Criteria

- Zero layout errors on console.
- Perfect centering of all elements inside the container.
