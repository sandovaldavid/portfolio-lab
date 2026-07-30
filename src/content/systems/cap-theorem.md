---
title: "The CAP Theorem: Consistency, Availability, and Partition Tolerance"
description: "Understanding the fundamental trade-off in distributed systems — why you can only pick two out of three guarantees."
date: "2026-06-28"
category: "systems"
tags: ["distributed-systems", "cap-theorem", "consistency", "availability", "system-design"]
---

# The CAP Theorem

The CAP Theorem (Brewer's conjecture, proven by Gilbert and Lynch) states that a distributed data store can provide **at most two** of three guarantees simultaneously:

| Guarantee | Meaning |
|-----------|---------|
| **C**onsistency | Every read receives the most recent write or an error |
| **A**vailability | Every request receives a (non-error) response — without guarantee it contains the latest write |
| **P**artition Tolerance | The system continues to operate despite arbitrary message loss or network failure |

---

## The Trade-off

```
        Consistency
            │
            │
   CP ──────┼────── CA
            │
            │
        ┌───┴───┐
      Partition
      Tolerance
```

**When a network partition occurs, you must choose:**

- **CP (Consistency + Partition Tolerance):** Stop accepting writes on one side until partition heals. Examples: HBase, MongoDB (default), Zookeeper.
- **AP (Availability + Partition Tolerance):** Accept writes on both sides; clients may read stale data until the partition resolves. Examples: Cassandra, DynamoDB, Riak.
- **CA (Consistency + Availability):** Not possible in practice — network partitions are inevitable in distributed systems. A "CA" system is effectively a single-node database.

---

## Why You Can't Have All Three

During a network partition:

```
[Node A] ←—— network down ——→ [Node B]
```

A client writes `x = 42` to Node A. Another client reads from Node B.

- **For Consistency**, Node B must return an error (or wait) — it doesn't have the latest value. This sacrifices **Availability**.
- **For Availability**, Node B must respond. It might return `x = 0` (stale). This sacrifices **Consistency**.

---

## Real-World Systems

| System | Category | Trade-off | Use Case |
|--------|----------|-----------|----------|
| PostgreSQL (single) | CA | Single-node, no partition tolerance | Relational data, transactions |
| Cassandra | AP | Eventual consistency, always writable | Time-series, IoT, high write throughput |
| MongoDB | CP (default) | Reads may fail during partition | Document stores, moderate consistency |
| DynamoDB | AP | Eventually consistent reads (optional strong) | Serverless, high-scale |
| Zookeeper | CP | Leader election, quorum reads | Coordination, service discovery |
| Redis Cluster | AP | Best-effort consistency | Caching, session store |

---

## Beyond CAP: The PACELC Trade-off

CAP only describes behavior **during a partition**. PACELC extends this:

> **P**artition → **A**vailability or **C**onsistency
> **E**lse (no partition) → **L**atency or **C**onsistency

- **Cassandra:** PA/EL — prefers availability and low latency, sacrifices consistency.
- **DynamoDB:** PA/EC (strongly consistent reads) — AP during partition, but can opt for consistency at higher latency otherwise.
- **MongoDB:** PC/EC — prefers consistency during partition and high consistency at rest, sacrificing availability and latency.

---

## Practical Guidance

1. **Start with a single-node database** (PostgreSQL) for most applications. CAP trade-offs only matter at scale.
2. **Choose AP** when availability is critical and stale reads are acceptable (caching, analytics, logging).
3. **Choose CP** when consistency is non-negotiable (financial transactions, inventory, user authentication).
4. **Use hybrid approaches:** Strong consistency for critical data, eventual consistency for the rest.
5. **Understand your real partition tolerance** — if your system runs in one data center, partitions are rare. At multi-region scale, they're inevitable.

> **Key insight:** CAP doesn't tell you which system to use — it forces you to think about what happens when things go wrong.
