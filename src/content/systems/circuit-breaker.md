---
title: "Distributed Systems: Circuit Breaker Pattern"
description: "How to prevent cascading service failure in microservice architectures."
date: "2026-06-17"
category: "systems"
tags: ["system-design", "fault-tolerance", "microservices"]
---

# The Circuit Breaker Pattern in Distributed Systems

In distributed environments, calls to remote resources can fail due to transient network issues or slow downstream service crashes. To prevent cascading failures, we employ the **Circuit Breaker** pattern.

## State Machine Transitions

A Circuit Breaker operates as a state machine with three main states:

1. **Closed**: Requests flow normally. If the failure rate exceeds a threshold, the circuit trips to **Open**.
2. **Open**: Requests fail immediately without hitting the downstream service (fail-fast). A cooldown timer starts.
3. **Half-Open**: A limited number of trial requests are sent. If they succeed, the circuit closes. If they fail, it re-opens.

```csharp
// Polly Resilience Policy example in .NET 8
var circuitBreakerPolicy = Policy
    .Handle<HttpRequestException>()
    .CircuitBreakerAsync(
        exceptionsAllowedBeforeBreaking: 5,
        durationOfBreak: TimeSpan.FromSeconds(30),
        onBreak: (ex, breakDelay) => LogFault(ex, breakDelay),
        onReset: () => LogReset()
    );
```
