---
title: "Understanding Binary Search Complexity"
description: "Analysis of binary search partition bounds and O(log n) efficiency."
date: "2026-06-17"
category: "algorithms"
tags: ["binary-search", "complexity", "algorithms"]
---

# Complexity Analysis of Binary Search

Binary search is a fundamental search algorithm that operates on sorted arrays. It repeatedly divides the search interval in half.

## Numerical Recurrence Relation

The time complexity recurrence relation of binary search is given by:

$$T(n) = T\left(\frac{n}{2}\right) + O(1)$$

Applying the **Master Theorem**, where:
- $a = 1$
- $b = 2$
- $f(n) = O(1)$

We compute $\log_b a = \log_2 1 = 0$. Since $f(n) = \Theta(n^{\log_b a}) = \Theta(1)$, we fall under Case 2 of the Master Theorem:

$$T(n) = \Theta(n^{\log_b a} \log n) = \Theta(\log n)$$

This represents an asymptotic time complexity of $O(\log n)$.

```typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```
