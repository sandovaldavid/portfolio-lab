---
title: "Caching Strategies: From Browser Cache to Distributed Redis"
description: "Cache placement, eviction policies, write strategies (write-through, write-behind, write-around), and CDN architecture."
date: "2026-06-28"
category: "systems"
tags: ["caching", "redis", "cdn", "performance", "system-design"]
---

# Caching Strategies in Distributed Systems

Caching is the single highest-ROI performance optimization in most systems. A well-placed cache reduces latency, offloads databases, and absorbs traffic spikes.

---

## Where to Cache

```
[Client] → [CDN] → [Load Balancer] → [App Server] → [Cache Layer] → [Database]
                 │                       │               │
            Static assets           Session data    Query results
            (images, JS, CSS)       (Redis)         (Redis / Memcached)
```

---

## Eviction Policies

When the cache is full, something must be removed:

| Policy | Behavior | Use Case |
|--------|----------|----------|
| **LRU** | Removes least recently used | General-purpose, most common |
| **LFU** | Removes least frequently used | Content distribution |
| **FIFO** | Removes oldest entry | Simple, predictable |
| **TTL** | Removes entries after a fixed time | Time-sensitive data |
| **Random** | Removes random entry | Simplicity over accuracy |

> **Most systems should start with LRU + TTL.** Redis uses a variant of LRU by default.

---

## Write Strategies

### Write-Through

Data is written to both cache and database simultaneously.

```
Client → Cache (write) → Database (write) → Ack
```

**Pros:** Cache is always consistent with DB.  
**Cons:** Higher write latency (two writes). Every write must hit both layers.

### Write-Behind (Write-Back)

Data is written to cache immediately; the cache asynchronously writes to DB.

```
Client → Cache (write, fast ack) → (async) → Database (write)
```

**Pros:** Very fast writes, batches DB operations.  
**Cons:** Risk of data loss if cache fails before flush. Not suitable for critical data.

### Write-Around

Data is written directly to DB. Cache is populated only on read miss.

```
Client → Database (write) → ... later, on read: Cache ← Database
```

**Pros:** Cache isn't polluted with write-only data.  
**Cons:** Recent writes cause a cache miss on first read.

### Hybrid Pattern

Most production systems use **write-through for critical data** (user profiles, transactions) and **write-behind for non-critical** (analytics, logs, session data).

---

## Cache Penetration, Breakdown, and Avalanche

Three failure modes unique to caching layers:

### 1. Cache Penetration
Requesting a key that **does not exist** anywhere (cache + DB). Every request hits the DB directly.

**Fix:** Cache the "null" result with a short TTL (30-60s). Or use a Bloom filter to reject non-existent keys before reaching DB.

### 2. Cache Breakdown (Hotkey)
A single key is accessed extremely frequently (e.g., a celebrity's profile). When it expires, thousands of requests hit DB simultaneously.

**Fix:** No-expiry for hot keys with background refresh, or mutex lock on cache rebuild.

### 3. Cache Avalanche
A large batch of keys expires simultaneously (e.g., all entries with the same TTL). DB is flooded.

**Fix:** Randomize TTLs within a range (e.g., 3600 ± 300s), or use a distributed lock to serialize rebuilds.

---

## CDN Caching

CDNs cache **static assets** at edge locations close to users.

```typescript
// Setting cache headers in a Next.js / Analog API route
event.node.res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
```

**Cache hierarchy:**
1. Browser cache (`private` or `public`)
2. CDN edge cache (shared)
3. Origin shield (a dedicated cache layer before your origin server)

---

## Practical Redis Patterns

```typescript
// Cache-aside (lazy loading): read from cache, fall back to DB
async function getUser(id: string) {
  const cached = await redis.get(`user:${id}`);
  if (cached) return JSON.parse(cached);

  const user = await db.users.findUnique({ where: { id } });
  if (user) await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
  return user;
}
```

```typescript
// Rate limiting with Redis sorted sets
async function checkRateLimit(userId: string, limit = 100, window = 60) {
  const key = `ratelimit:${userId}:${Math.floor(Date.now() / 1000 / window)}`;
  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, window);
  return count <= limit;
}
```

---

## When Not to Cache

- **Fast-changing data** with low read frequency (cache overhead > benefit)
- **Per-user unique data** (low cache hit rate)
- **Write-heavy workloads** where stale reads are unacceptable
- **Small datasets** where a query is already fast (< 1ms)
