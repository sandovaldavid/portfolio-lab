---
title: "Divide and Conquer: QuickSort vs MergeSort"
description: "Comparative analysis of partitioning strategies, stability, worst-case guarantees, and in-place vs auxiliary space trade-offs."
date: "2026-06-28"
category: "algorithms"
tags: ["sorting", "divide-and-conquer", "complexity", "quick-sort", "merge-sort"]
---

# QuickSort vs MergeSort: A Comparative Analysis

Both QuickSort and MergeSort use the **Divide and Conquer** paradigm, but differ critically in partitioning strategy, space usage, and performance guarantees.

---

## MergeSort

### Algorithm
1. Divide the array into two halves (midpoint).
2. Recursively sort each half.
3. Merge the two sorted halves in $O(n)$ time.

### Complexity
| Case | Time | Space |
|------|------|-------|
| Best | $O(n \log n)$ | $O(n)$ auxiliary |
| Average | $O(n \log n)$ | $O(n)$ auxiliary |
| Worst | $O(n \log n)$ | $O(n)$ auxiliary |

### Key Properties
- **Stable**: equal elements retain original order.
- **Splits by position** (not value) — always divides evenly.
- Requires $O(n)$ auxiliary space for the merge step.

```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length)
    result.push(left[i] <= right[j] ? left[i++] : right[j++]);
  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

---

## QuickSort

### Algorithm
1. Pick a **pivot** element (last, first, median-of-three, or random).
2. **Partition**: reorder so elements < pivot come before, > pivot after.
3. Recursively sort the sub-arrays before and after the pivot.

### Complexity
| Case | Time | Space |
|------|------|-------|
| Best | $O(n \log n)$ | $O(\log n)$ in-place |
| Average | $O(n \log n)$ | $O(\log n)$ in-place |
| Worst | $O(n^2)$ — pivot is always min/max | $O(\log n)$ in-place |

### Key Properties
- **In-place**: no auxiliary array, but not stable.
- **Splits by value** (pivot) — can be unbalanced.
- Worst case avoided with **randomized pivot** or **median-of-three**.

```typescript
function quickSort(arr: number[], lo = 0, hi = arr.length - 1): void {
  if (lo >= hi) return;
  const pivotIdx = partition(arr, lo, hi);
  quickSort(arr, lo, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
  const pivot = arr[hi];
  let i = lo - 1;
  for (let j = lo; j < hi; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]];
  return i + 1;
}
```

---

## When to Use Which

| Requirement | Choose |
|-------------|--------|
| Guaranteed $O(n \log n)$ | MergeSort |
| Stability needed | MergeSort |
| Limited memory / embedded | QuickSort (in-place) |
| Large arrays, average perf | QuickSort (randomized) |
| Linked lists | MergeSort (no random access needed) |

> **Rule of thumb:** QuickSort for in-memory arrays where worst-case is rare; MergeSort when stability or guaranteed performance matters.
