---
title: "Dynamic Programming: From Fibonacci to Optimal Substructure"
description: "Core DP concepts: memoization vs tabulation, optimal substructure, overlapping subproblems, and classic patterns."
date: "2026-06-28"
category: "algorithms"
tags: ["dynamic-programming", "memoization", "recursion", "optimization"]
---

# Dynamic Programming Fundamentals

Dynamic Programming (DP) is a method for solving complex problems by breaking them into overlapping subproblems, solving each once, and storing the result.

---

## When to Use DP

Two necessary conditions:

1. **Optimal Substructure**: The optimal solution can be built from optimal solutions of subproblems.
2. **Overlapping Subproblems**: The same subproblems are solved multiple times (if not, use Divide and Conquer instead).

---

## Fibonacci: The Classic Example

Plain recursion is exponential — $O(2^n)$ — because it recomputes the same values repeatedly.

```typescript
// Without DP — O(2^n)
function fibNaive(n: number): number {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}
```

### Approach 1: Memoization (Top-Down)

Cache results as you compute them. The recursion stays but each subproblem runs once.

```typescript
function fibMemo(n: number, memo = new Map<number, number>()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  const result = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  memo.set(n, result);
  return result;
}
```

**Time:** $O(n)$ · **Space:** $O(n)$

### Approach 2: Tabulation (Bottom-Up)

Build the solution iteratively from the base case upward. No recursion stack overhead.

```typescript
function fibTab(n: number): number {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) dp[i] = dp[i - 1] + dp[i - 2];
  return dp[n];
}
```

**Space-optimized** (only last two values needed):

```typescript
function fibOpt(n: number): number {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) [a, b] = [b, a + b];
  return b;
}
```

**Time:** $O(n)$ · **Space:** $O(1)$

---

## Recurrence Relation for DP

A DP solution is defined by:

$$dp[i] = \text{operation}(dp[i-1], dp[i-2], \dots)$$

For Fibonacci: $dp[i] = dp[i-1] + dp[i-2]$

For a **knapsack** variant: $dp[i][w] = \max(dp[i-1][w], dp[i-1][w-w_i] + v_i)$

---

## Common DP Patterns

| Pattern | Example | State Definition |
|---------|---------|-----------------|
| Linear DP | Fibonacci, Climbing Stairs | $dp[i]$ = best at position $i$ |
| Knapsack | 0/1 Knapsack | $dp[i][w]$ = max value using first $i$ items with weight $w$ |
| LIS | Longest Increasing Subsequence | $dp[i]$ = LIS ending at index $i$ |
| LCS | Longest Common Subsequence | $dp[i][j]$ = LCS of $A[0..i]$ and $B[0..j]$ |
| Interval DP | Matrix Chain Multiplication | $dp[i][j]$ = best for interval $[i, j]$ |
| Grid DP | Unique Paths | $dp[i][j]$ = ways to reach cell $(i, j)$ |

---

## Key Insight: State Transition

Every DP problem reduces to:
1. **Define the state** ($dp[i]$ or $dp[i][j]$)
2. **Write the transition** (how to compute $dp[i]$ from previous states)
3. **Identify base cases** (smallest subproblem solved directly)

If you can write a correct recurrence relation, you can implement DP.
