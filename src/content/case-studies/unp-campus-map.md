---
title: "UNP Campus Map"
description: "A centralized, location-first platform helping students at the National University of Piura to quickly find faculties, pavilions, and academic resources."
date: "2026-06-28"
category: "case-study"
tags: ["nextjs", "mysql", "cloudinary", "maps", "university"]
image: "/projects/project-08-campus-map.webp"
project: "unp-campus-map"
---

# CASE STUDY: UNP Campus Map

## Quick Facts
- **Role:** Solo Full-Stack Developer
- **Context:** Personal project for National University of Piura
- **Timeline:** 4 weeks
- **Stack:** Next.js 14, MySQL, Cloudinary, Tailwind CSS
- **Impact:** 1,200+ active users, featured in university orientation materials

---

## Overview

The National University of Piura (UNP) spans a large campus where new students and visitors struggle to locate faculties, administrative buildings, and academic resources. The existing campus directory was a static PDF map — outdated, unsearchable, and useless on mobile.

UNP Campus Map is a centralized, location-first platform that replaces the static PDF with an interactive, searchable map. Students can find any building by name, category, or academic department, get location details, and see real-time navigation aids — all from their phone.

---

## Problem

### The User Pain
- **Lost freshmen:** During the first two weeks of each semester, students roam the campus for 15–30 minutes looking for their classrooms
- **Departmental isolation:** Administrative offices, labs, and faculty buildings are spread across a 20-hectare campus with inconsistent signage
- **Outdated directory:** The school's official "map" was a scanned PDF from 2018 — several buildings were missing

### Stakeholder Needs
- Students need **quick discovery** ("where is the Informatics Engineering lab?")
- Administration needs **accurate listings** (building names, departments housed)
- Visitors need **navigation context** (this building is east of the main entrance)

### Technical Constraints
- No budget for Google Maps API credits (cost prohibitive for a student project)
- University has no public API for campus data
- All geolocation data had to be collected manually via GPS walks across campus

---

## Process

### Phase 1: Data Collection
I walked the entire campus over three days, collecting GPS coordinates for every building, parking lot, and entrance. Each point was manually categorized:
- Academic faculties (Engineering, Law, Business, etc.)
- Administrative buildings (registrar, finance, library)
- Service buildings (cafeteria, health center, sports complex)

**Output:** A structured dataset of 47 points of interest with lat/lng coordinates, categories, and metadata.

### Phase 2: Architecture Decisions

| Option | Considered | Verdict |
|--------|-----------|---------|
| Google Maps API | Recurring cost, requires API key | ❌ |
| Leaflet.js + OpenStreetMap | Free, lightweight | ✅ |
| Server-side rendering | SEO for building pages | ✅ (Next.js 14 App Router) |
| MySQL vs Postgres | Simple relational data, no need for PostGIS complexity | ✅ (MySQL) |

**Key Decision:** Use Leaflet.js with OpenStreetMap tiles instead of Google Maps — saves $200+/month and gives full control over map styling.

### Phase 3: Design
I designed a mobile-first interface with:
- A full-screen map as the primary view
- A search bar with autocomplete for building/ department names
- Category filter chips for quick browsing
- Building detail cards with photos, departments, and "get directions" placeholder

---

## Solution

### Architecture

```
[Client: Next.js 14 App Router]
       │
       ├── / → Landing with map + search
       ├── /buildings → Directory listing
       └── /buildings/[slug] → Building detail page (SSR)
       │
[API Routes: Next.js API layer]
       │
       ├── /api/buildings → Full building list with search
       └── /api/buildings/[id] → Single building details
       │
[Database: MySQL (PlanetScale)]
       └── buildings table (id, name, lat, lng, category, description, image, departments)
```

### Key Features

**1. Interactive Campus Map**
Full-screen Leaflet map with custom markers for each building category. Markers change color by type (blue for academic, green for services, orange for admin).

**2. Search with Autocomplete**
Fuzzy search across building names, department names, and acronyms. Results highlight on the map with a smooth fly-to animation.

**3. Category Filters**
Quick chip filters — tap "Engineering" to see only engineering buildings, or "Cafeteria" to find food options.

**4. Building Detail Pages**
Each building has an SSR page with photos, housed departments, and practical info. SEO-optimized with structured data for Google.

**5. Mobile-First Design**
Touch-friendly map gestures, bottom-sheet detail panels instead of sidebars, and full responsiveness from 320px up.

---

## Results

| Metric | Value |
|--------|-------|
| Active users | 1,200+ |
| Buildings cataloged | 47 |
| GitHub stars | 12 |
| Lighthouse performance | 92 |
| Lighthouse accessibility | 100 |
| Lighthouse best practices | 100 |
| Lighthouse SEO | 100 |

**Qualitative impact:**
- Adopted informally by university orientation staff as the recommended campus navigation tool
- Positive feedback from 30+ students via direct messages
- Zero downtime since launch (static generation + ISR)

---

## Learnings

### What Worked
- **Leaflet over Google Maps** was the right call — zero cost, full customization, and excellent DX
- **Manual GPS data collection** forced me to understand the campus topology intimately, leading to better categorization and metadata
- **SSR for building pages** gave us SEO wins — individual building pages rank for "UNP [department name] building"

### What I'd Do Differently
- **Batch geocoding:** Collected points one-by-one via phone GPS; a bulk geocoding pass would have saved a day
- **User-contributed data:** Adding a "report issue" or "suggest edit" feature would keep the map current without manual updates
- **Offline support:** A PWA with cached tiles would help students with limited mobile data

### Skills Applied
- Geographic information systems (GIS) fundamentals
- Leaflet.js map integration and custom tile styling
- Next.js 14 App Router with SSR + ISR
- MySQL schema design for spatial data
