---
title: "Database Indexing: B-Trees, Hash Indexes, and Query Optimization"
description: "How database indexes work internally — B-tree vs hash index, composite indexes, EXPLAIN plans, and common anti-patterns."
date: "2026-06-28"
category: "systems"
tags: ["databases", "indexing", "sql", "performance", "b-tree"]
---

# Database Indexing Internals

An index is a data structure that speeds up data retrieval at the cost of additional writes and storage. Understanding index internals is critical for backend performance.

---

## B-Tree Index (Default in Most Databases)

The **B-Tree** is a self-balancing tree data structure that maintains sorted data for efficient insert, delete, and search.

### Structure
```
                [50, 90]
               /    |    \
         [10, 30]  [60]  [100, 120]
        /    |    \   |    /    |    \
```

### Complexity
| Operation | B-Tree | No Index (Full Scan) |
|-----------|--------|----------------------|
| Point lookup | $O(\log n)$ | $O(n)$ |
| Range query | $O(\log n + k)$ | $O(n)$ |
| Insert | $O(\log n)$ | $O(1)$ append |
| Delete | $O(\log n)$ | $O(n)$ |

**Key property:** A B-Tree with branching factor $m$ and $n$ entries has height $\log_m n$. For a typical database with $m \approx 500$, a table of 125M entries has height $\leq 3$.

---

## Hash Index

Uses a hash function to map keys directly to disk locations. Optimal for **exact-match lookups**.

```sql
CREATE INDEX idx_user_email ON users USING HASH (email);
-- Best for: WHERE email = 'user@example.com'
-- Terrible for: WHERE email LIKE '%example.com'
```

| Aspect | B-Tree | Hash |
|--------|--------|------|
| Point lookup | $O(\log n)$ | $O(1)$ |
| Range queries | ✅ Excellent | ❌ Not supported |
| ORDER BY | ✅ Already sorted | ❌ Not sorted |
| LIKE / prefix | ✅ Works | ❌ No |
| Composite keys | ✅ Supports | ❌ Full key only |

---

## Composite (Multi-Column) Indexes

When you index multiple columns, **column order matters**.

```sql
CREATE INDEX idx_user_status_date ON users (status, created_at);
```

This index supports:
- ✅ `WHERE status = 'active'`
- ✅ `WHERE status = 'active' AND created_at > '2024-01-01'`
- ✅ `ORDER BY status, created_at`
- ❌ `WHERE created_at > '2024-01-01'` (status not included — full scan)

**The Rule of First Columns:** The leftmost column must be used in the WHERE clause for the index to apply.

---

## EXPLAIN Plans

Learn to read query plans. This is the single most valuable skill for query optimization.

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 42;
```

```
Index Scan using idx_orders_user_id on orders
  (cost=0.29..8.31 rows=1 width=24)
  Index Cond: (user_id = 42)
  Execution Time: 0.045 ms
```

**What to look for:**
- `Seq Scan` (sequential scan) — probably missing an index
- `Index Scan` — good, using an index
- `Index Only Scan` — excellent, all data in the index
- `Bitmap Heap Scan` — combination of index + heap access
- `Sort` — may indicate missing sort column in index
- `Nested Loop` vs `Hash Join` vs `Merge Join` — join strategies

---

## Common Indexing Anti-Patterns

### 1. Over-Indexing
Each index slows down **writes** (INSERT/UPDATE/DELETE must update all indexes). Don't index columns you never query.

### 2. Indexing Low-Cardinality Columns
A boolean column (`is_active`) has only 2 values — a full scan is often faster than an index lookup.

### 3. Function Wrappers in WHERE
```sql
-- ❌ Index on created_at won't be used
SELECT * FROM orders WHERE DATE(created_at) = '2024-01-01';

-- ✅ Use range query instead
SELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2024-01-02';
```

### 4. SELECT * When You Only Need Indexed Columns
If all required columns are in the index, the DB can do an **Index Only Scan** — much faster than reading the heap.

---

## Practical Tips

- **Start with a covering index** for your most frequent query pattern
- **Monitor `pg_stat_user_indexes`** (PostgreSQL) to find unused indexes
- **Partial indexes** (PostgreSQL) index only a subset of rows:
  ```sql
  CREATE INDEX idx_active_orders ON orders (created_at) WHERE status = 'active';
  ```
- **Use `EXPLAIN ANALYZE`** not just `EXPLAIN` — actual execution times reveal real bottlenecks
