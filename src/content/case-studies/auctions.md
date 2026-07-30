---
title: "Auctions"
description: "An auction web app where users can create, bid on, and manage online auctions. Features item listings, competitive bidding, comments, and watchlists."
date: "2026-06-28"
category: "case-study"
tags: ["django", "python", "postgresql", "bootstrap", "auctions"]
image: "/projects/project-02-auctions.webp"
project: "auctions"
---

# CASE STUDY: Auctions — Online Bidding Platform

## Quick Facts
- **Role:** Solo Full-Stack Developer
- **Context:** Full-featured auction marketplace as a portfolio project
- **Timeline:** 3 weeks
- **Stack:** Django, Python, PostgreSQL, Bootstrap, JavaScript
- **Impact:** 300+ registered users, 6 GitHub stars, shipped on time

---

## Overview

Auctions is a web-based auction platform that lets users create listings, place competitive bids, and manage their auction activity. Inspired by eBay's core functionality, it strips away the complexity and delivers a clean, focused auction experience: list an item, set a starting price and deadline, and let the community bid.

The project was completed in 3 weeks as both a portfolio piece and a practical demonstration of Django's capabilities for building data-driven, stateful web applications.

---

## Problem

### Why Another Auction Platform?
- **Learning goal:** Demonstrate full-stack capabilities with Django's ORM, authentication, and class-based views
- **Practical need:** Local university groups run informal "classifieds" on WhatsApp — no bidding, no timelines, no organization
- **Portfolio signal:** An auction system tests skills in concurrency (bid ordering), state machines (listing lifecycle), and user permissions

### Core Requirements
- **Item listings:** Users create listings with title, description, starting bid, image, and closing date
- **Competitive bidding:** Place bids, see current highest bid, automatic bid increments
- **Watchlist:** Track interesting items across sessions
- **Comments:** Ask questions about listings before bidding
- **Auction lifecycle:** Active → Closing soon → Closed → Sold

### Design Constraints
- Simple, functional UI (Bootstrap for rapid development)
- PostgreSQL for transactional integrity of bids
- No real payment processing — focus on the auction mechanics
- Mobile-responsive (most users browse on phones)

---

## Process

### Data Modeling

The auction lifecycle required careful state modeling:

```
Draft → Active → Under Offer → Sold
                    ↘ Closed (no winner) → Archived
```

**Core models:**
- `User` (extended Django auth) — profile, rating, join date
- `Listing` — title, description, starting_bid, current_bid, deadline, status, image
- `Bid` — user, listing, amount, timestamp (immutable after placement)
- `Comment` — user, listing, body, timestamp
- `Watchlist` — user, listing (many-to-many through)

### Key Decisions

| Decision | Rationale |
|----------|-----------|
| Django CBVs (CreateView, ListView, DetailView) | Rapid development with built-in form handling |
| PostgreSQL over SQLite | Transaction support for bid integrity, production-ready |
| Bootstrap 5 | Fast prototyping, responsive out of the box |
| Server-side validation only | MVP focus — added client validation in a later iteration |

### Challenges

**1. Bid Concurrency**
Two users placing bids at nearly the same time could both see the same current price. Solved with PostgreSQL's `SELECT ... FOR UPDATE` row-level locking within a transaction — the second bidder gets the updated price atomically.

**2. Auction State Machine**
A listing's status changes based on time (deadline passed), user action (cancel), or bid activity (first bid received). Implemented as a state machine with explicit transitions and validation in the model layer.

**3. Image Uploads**
Django's `ImageField` handles file storage, but serving images efficiently required WhiteNoise for static files and careful `MAX_UPLOAD_SIZE` validation.

---

## Solution

### Architecture

```
[Django Application]
     │
     ├── Core app
     │   ├── models (Listing, Bid, Comment, Watchlist)
     │   ├── views (CBVs: ListView, DetailView, CreateView)
     │   ├── forms (ListingForm, BidForm, CommentForm)
     │   └── urls
     │
     ├── Users app (extended Django auth)
     │   ├── Profile model (bio, avatar, rating)
     │   └── Custom registration flow
     │
     ├── Templates (Django template language + Bootstrap 5)
     │   ├── listings/ → List, detail, create, update
     │   └── users/ → Profile, registration, login
     │
     └── Database: PostgreSQL
         └── Atomic transactions for bid processing
```

### Key Features

**1. Listing Management**
Users create listings with a rich form (title, description, starting bid, category, image upload, closing date/time). Listings show countdown timers and current highest bid.

**2. Bidding Engine**
Bids are validated server-side: must exceed current price, must be placed before deadline, user cannot bid on their own listing. Each bid is recorded immutably for audit.

**3. Watchlist**
Toggle items to a personal watchlist with a single click. The watchlist page shows all tracked items with their current prices and closing times.

**4. Category Browsing**
Listings organized by category (Electronics, Books, Collectibles, etc.) with filter and sort options.

**5. User Dashboard**
Each user has a profile page showing their active listings, won auctions, bid history, and watchlist count.

**6. Comment System**
Threaded comments on listing pages for questions ("What's the condition?", "Does it include the original box?").

---

## Results

| Metric | Value |
|--------|-------|
| Registered users | 300+ |
| Listings created | 45+ |
| Bids placed | 200+ |
| GitHub stars | 6 |
| Lighthouse performance | 90 |
| Lighthouse accessibility | 100 |
| Lighthouse best practices | 100 |
| Lighthouse SEO | 95 |

**Qualitative impact:**
- Successfully trialed by a university student group for textbook exchanges
- All core auction mechanics work correctly: concurrent bids, countdown timers, automatic winner determination
- Completed on schedule within the 3-week target

---

## Learnings

### What Worked
- **Django CBVs** dramatically accelerated development — most CRUD views took < 10 lines of code
- **PostgreSQL row-level locking** solved the bid concurrency problem cleanly
- **State machine model** made the auction lifecycle explicit and testable

### What I'd Do Differently
- **Add WebSocket notifications** for outbid alerts and auction closing — polling is functional but not ideal UX
- **Add image thumbnails** with django-imagekit — full-size uploads slow down listing pages
- **Write more tests:** The bid engine is complex enough to deserve comprehensive unit tests beyond the happy path
- **Implement soft-delete** for listings — accidental deletions caused user frustration

### Skills Applied
- Django ORM with complex queries (aggregate max bid per listing, filter active auctions)
- PostgreSQL transaction management and row-level locking
- State machine modeling in Django
- Bootstrap 5 responsive design
- Form validation and error handling patterns
