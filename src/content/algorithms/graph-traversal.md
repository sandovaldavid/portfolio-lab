---
title: "Graph Traversal: BFS, DFS, and Shortest Paths"
description: "Systematic exploration of graph traversal algorithms with comparison of BFS vs DFS and Dijkstra's shortest path."
date: "2026-06-28"
category: "algorithms"
tags: ["graphs", "bfs", "dfs", "dijkstra", "traversal"]
---

# Graph Traversal Algorithms

Graph traversal is the systematic exploration of vertices and edges. The two fundamental strategies are **Breadth-First Search (BFS)** and **Depth-First Search (DFS)**.

---

## Graph Representation

```typescript
// Adjacency list — most common for sparse graphs
type Graph = Map<number, number[]>;  // vertex → neighbors

// Edge list — useful for Kruskal's algorithm
type Edge = [number, number, number]; // u, v, weight
```

---

## Depth-First Search (DFS)

Explores as far as possible along each branch before backtracking.

### Iterative (Stack)

```typescript
function dfsIterative(graph: Graph, start: number): number[] {
  const visited = new Set<number>();
  const stack = [start];
  const order: number[] = [];

  while (stack.length > 0) {
    const v = stack.pop()!;
    if (visited.has(v)) continue;
    visited.add(v);
    order.push(v);
    for (const neighbor of (graph.get(v) || []).reverse())
      if (!visited.has(neighbor)) stack.push(neighbor);
  }
  return order;
}
```

### Recursive

```typescript
function dfsRecursive(graph: Graph, v: number, visited = new Set<number>(), order: number[] = []): number[] {
  visited.add(v);
  order.push(v);
  for (const neighbor of graph.get(v) || [])
    if (!visited.has(neighbor)) dfsRecursive(graph, neighbor, visited, order);
  return order;
}
```

**Time:** $O(V + E)$ · **Space:** $O(V)$

---

## Breadth-First Search (BFS)

Explores all neighbors at the current depth before moving deeper.

```typescript
function bfs(graph: Graph, start: number): number[] {
  const visited = new Set<number>([start]);
  const queue = [start];
  const order: number[] = [];

  while (queue.length > 0) {
    const v = queue.shift()!;
    order.push(v);
    for (const neighbor of graph.get(v) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}
```

**Time:** $O(V + E)$ · **Space:** $O(V)$

---

## BFS vs DFS

| Aspect | BFS | DFS |
|--------|-----|-----|
| Data structure | Queue | Stack |
| Space complexity | $O(V)$ (wide graphs) | $O(V)$ (deep graphs) |
| Shortest path (unweighted) | ✅ Yes | ❌ No |
| Cycle detection | Yes | Yes |
| Topological sort | Kahn's algorithm | Post-order DFS |
| Connected components | Yes | Yes |
| Best for | Shortest paths, level-order | Maze solving, topological sort |

---

## Dijkstra's Shortest Path (Weighted)

For graphs with **non-negative** edge weights, Dijkstra yields the shortest path from a source to all vertices.

```typescript
type WeightedGraph = Map<number, [number, number][]>; // vertex → [neighbor, weight]

function dijkstra(graph: WeightedGraph, start: number): Map<number, number> {
  const dist = new Map<number, number>();
  const pq: [number, number][] = []; // [distance, vertex]

  for (const v of graph.keys()) dist.set(v, Infinity);
  dist.set(start, 0);
  pq.push([0, start]);

  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]); // min-heap simulation
    const [d, v] = pq.shift()!;
    if (d > (dist.get(v) ?? Infinity)) continue;
    for (const [neighbor, weight] of graph.get(v) || []) {
      const nd = d + weight;
      if (nd < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, nd);
        pq.push([nd, neighbor]);
      }
    }
  }
  return dist;
}
```

**Time:** $O((V + E) \log V)$ with binary heap · **Space:** $O(V)$

> **Note:** For negative weights, use Bellman-Ford ($O(VE)$). For all-pairs, use Floyd-Warshall ($O(V^3)$).

---

## Complexity Comparison

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| DFS | $O(V + E)$ | $O(V)$ | Maze solving, topological sort |
| BFS | $O(V + E)$ | $O(V)$ | Shortest path (unweighted) |
| Dijkstra | $O((V+E)\log V)$ | $O(V)$ | Shortest path (non-negative weights) |
| Bellman-Ford | $O(VE)$ | $O(V)$ | Negative weights, cycle detection |
| Floyd-Warshall | $O(V^3)$ | $O(V^2)$ | All-pairs shortest paths (dense graphs) |
