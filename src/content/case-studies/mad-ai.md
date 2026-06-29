---
title: "MAD AI"
description: "A modern administrative platform built with Angular 20 and Clean Architecture. Incorporates advanced user and role management, secure authentication, notifications, and SSR with Express."
date: "2026-06-28"
category: "case-study"
tags: ["angular", "django", "python", "clean-architecture", "ssr"]
image: "/projects/project-10-MAD-AI.webp"
project: "mad-ai"
---

# CASE STUDY: MAD AI — Administrative Platform

## Quick Facts
- **Role:** Solo Full-Stack Developer
- **Context:** Full-stack administrative platform for small-to-medium organizations
- **Timeline:** 6 weeks
- **Stack:** Angular 20, Django + Python, Tailwind CSS, Express, RxJS
- **Impact:** 200+ users deployed across 3 organizations

---

## Overview

Small organizations in Peru often manage their operations with spreadsheets, paper records, or expensive SaaS tools that exceed their budget. MAD AI is an open-source administrative platform designed to fill this gap: it provides user and role management, secure authentication, notifications, and a clean, modern UI — at zero licensing cost.

The platform was built with a strong emphasis on **Clean Architecture**, **testability**, and **separation of concerns**, serving as both a practical tool and an architectural reference for Angular + Django full-stack development.

---

## Problem

### The Administrative Gap
- **Spreadsheet chaos:** Organizations track employees, roles, and permissions in shared Excel files — no audit trail, no access control
- **Over-engineered solutions:** Enterprise ERPs (Odoo, SAP) require dedicated IT staff and cost thousands
- **Security holes:** Custom-built admin panels often skip proper authentication, RBAC, and input sanitization

### Target User Needs
- **Admin users** need to create, edit, and deactivate user accounts
- **Role managers** need granular permissions (read, write, admin per module)
- **End users** need a clean dashboard with their assigned tasks
- **IT admins** need audit logs and session management

### Technical Requirements
- **Separation of concerns:** Frontend and backend should be independently deployable
- **Clean Architecture:** Business logic must be framework-agnostic
- **Real-time notifications:** Users need immediate feedback for key events
- **SSR for performance:** Admin dashboards must load quickly even on slow connections

---

## Process

### Architecture Design

I chose a **Clean Architecture** approach for the backend, with strict dependency inversion:

```
[Angular SPA] ←→ [Django REST API] ←→ [PostgreSQL]
     │
     └── [Express SSR proxy] ← serves Angular on server
```

**Backend layers:**
- **Domain layer:** Entities, value objects, repository interfaces (pure Python, zero Django imports)
- **Application layer:** Use cases, DTOs, port interfaces
- **Infrastructure layer:** Django models, DRF serializers, email services, JWT providers

**Frontend layers (FSD-inspired):**
- `@shared/` — Reusable components, pipes, guards
- `@features/` — Auth, user management, notifications, settings
- `@pages/` — Route-level containers

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| Django REST Framework | Battle-tested, excellent admin UI for debugging, huge ecosystem |
| JWT over session auth | Stateless — better for SSR and mobile clients |
| Express SSR proxy | Angular Universal alternative; Express serves pre-rendered pages for SEO + performance |
| PostgreSQL | JSON fields for flexible user metadata, excellent indexing for search |

### Challenges

**1. Role-Based Access Control (RBAC)**
Designing a permission system that was both granular and easy to administer. I implemented a flat role → permission mapping with optional per-user overrides, stored efficiently in PostgreSQL.

**2. Real-time Notifications**
Initially attempted WebSockets, but the SSR architecture added complexity. Settled on server-sent events (SSE) via Django's streaming HTTP responses — simpler, compatible with SSR, and sufficient for admin use cases.

**3. SSR Performance**
Angular SSR via Express required careful optimization: lazy-loaded routes, `OnPush` change detection, and deferred loading for heavy list views.

---

## Solution

### Architecture

```
┌─────────────────────────────────────────────────┐
│                  Frontend                        │
│  Angular 20 + Tailwind CSS + RxJS               │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Auth UI  │  │ Admin    │  │ Dashboard    │  │
│  │          │  │ Panel    │  │ Widgets      │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │ HTTP + JWT
┌──────────────────────▼──────────────────────────┐
│                  Backend                         │
│  Django REST Framework + Clean Architecture      │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Auth API │  │ Users    │  │ Notifications│  │
│  │ (JWT)    │  │ CRUD     │  │ (SSE)        │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────┐
│                PostgreSQL                        │
│  users │ roles │ permissions │ notifications     │
└─────────────────────────────────────────────────┘
```

### Key Features

**1. Authentication & JWT Management**
Secure login with access + refresh token rotation. Tokens stored in httpOnly cookies, with automatic refresh on expiry. Password hashing with bcrypt, account lockout after 5 failed attempts.

**2. Role Management Dashboard**
Drag-and-drop role editor with visual permission matrix. Roles can inherit permissions from parent roles. Each role shows the number of assigned users and last modified date.

**3. User Lifecycle Management**
Full CRUD with soft-delete, bulk import via CSV, and activity logging. Every state change is recorded in an audit trail with before/after snapshots.

**4. Notification System**
SSE-based real-time notifications for events like "user added to role", "password changed", "account deactivated". Notifications are persisted and retrievable via API.

**5. SSR with Express**
Pre-rendered admin dashboard loads 40% faster on 3G connections compared to client-only rendering. Meta tags for SEO on public-facing pages.

---

## Results

| Metric | Value |
|--------|-------|
| Deployed organizations | 3 |
| Active users | 200+ |
| GitHub stars | 8 |
| Lighthouse performance | 88 |
| Lighthouse accessibility | 95 |
| Lighthouse best practices | 100 |
| Lighthouse SEO | 90 |

**Qualitative impact:**
- Two organizations replaced their Excel-based tracking with MAD AI
- Audit trail feature helped one org pass an internal compliance review
- Open-source release received contributions for 3 locale translations

---

## Learnings

### What Worked
- **Clean Architecture** on the backend made testing straightforward — use cases are pure Python with zero framework coupling
- **SSE over WebSockets** was the right trade-off for admin workloads (bursty, not real-time chat)
- **Angular OnPush + signals** kept the frontend efficient even with large user lists (500+ users)

### What I'd Do Differently
- **Start with fewer features:** The notification system took 40% of development time but is the least-used feature. A v1 with just auth + user CRUD would have shipped faster.
- **Use Angular CDK tables:** Custom virtual scroll implementation was harder than using CDK Table out of the box
- **API versioning from day 1:** Backwards-incompatible changes in early releases caused friction for early adopters

### Skills Developed
- Clean Architecture with Django (domain-driven design without framework lock-in)
- JWT authentication patterns (access + refresh rotation, httpOnly cookies)
- SSE streaming for real-time updates
- Angular SSR performance optimization
