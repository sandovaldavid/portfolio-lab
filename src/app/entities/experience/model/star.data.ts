import type { StarEntry } from './star.model';

export const starEntries: StarEntry[] = [
  {
    id: 'change-detection',
    title: 'Change Detection Overhaul → Signals',
    metric: 'Memory −34%',
    metricValue: '−34%',
    pattern: 'Signals + OnPush',
    stack: ['Angular 21', 'TypeScript'],
    category: 'memory',
    detail:
      'Replaced Zone.js-based change detection in the salary advance dashboard with Angular signals and ChangeDetectionStrategy.OnPush across 18 components. Eliminated unnecessary re-renders triggered by HTTP interceptors, reducing heap allocations by 34% measured via Chrome DevTools memory profiler.',
    codeSnippet: `// Before: mutable property + markForCheck()
@Component({ changeDetection: ChangeDetectionStrategy.Default })
export class AdvanceListComponent {
  advances: Advance[] = [];
  ngOnInit() { this.svc.getAll().subscribe(d => this.advances = d); }
}

// After: signal + OnPush
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class AdvanceListComponent {
  readonly advances = signal<Advance[]>([]);
  ngOnInit() { this.svc.getAll().subscribe(d => this.advances.set(d)); }
}`,
  },
  {
    id: 'api-batching',
    title: 'Salary Advance API — Batch + Cache Layer',
    metric: 'Throughput +60%',
    metricValue: '+60%',
    pattern: 'HTTP Batching + IMemoryCache',
    stack: ['.NET 8', 'C#', 'SQL Server'],
    category: 'throughput',
    detail:
      'Identified N+1 query pattern in the advance eligibility endpoint that fired one SQL query per employee during bulk payroll processing. Implemented request batching with IMemoryCache (5-min sliding window) and rewrote the LINQ query with a JOIN + projection. Throughput went from ~420 req/min to ~675 req/min on load tests.',
    codeSnippet: `// Before: N+1 — one query per employee
foreach (var emp in employees)
    eligibility[emp.Id] = await _db.CheckEligibilityAsync(emp.Id);

// After: batched JOIN + cache
var ids = employees.Select(e => e.Id).ToList();
var cached = _cache.TryGetValue("elig:" + hash, out var r);
if (!cached)
{
    r = await _db.Employees
        .Where(e => ids.Contains(e.Id))
        .Select(e => new { e.Id, e.IsEligible })
        .ToListAsync();
    _cache.Set("elig:" + hash, r, TimeSpan.FromMinutes(5));
}`,
  },
  {
    id: 'fsd-migration',
    title: 'Monolith → FSD Architecture',
    metric: 'Bundle −28%',
    metricValue: '−28%',
    pattern: 'Feature-Sliced Design + @defer',
    stack: ['Angular 21', 'Vite', 'TypeScript'],
    category: 'scalability',
    detail:
      "Reorganized the Angular frontend from a flat feature-module structure to Feature-Sliced Design (FSD), enabling tree-shaking of unused slices per route. Added Angular @defer blocks for admin panels and reporting widgets that are never shown to standard employees. Initial bundle dropped from 1.4 MB to ~1.0 MB (gzip: 380 kB → 270 kB).",
    codeSnippet: `// Deferred admin panel — not loaded unless user has ADMIN role
@defer (when isAdmin()) {
  <app-admin-reports />
} @placeholder {
  <div class="h-40 bg-surface animate-pulse"></div>
}`,
  },
  {
    id: 'lcp-optimization',
    title: 'Platform LCP — Critical Path Audit',
    metric: 'LCP −45%',
    metricValue: '−45%',
    pattern: 'SSR + Preconnect + Font subsetting',
    stack: ['Analog', 'Nitro', 'Vite'],
    category: 'latency',
    detail:
      "Audited the portfolio platform's Largest Contentful Paint using Lighthouse and WebPageTest. Root causes: render-blocking Google Fonts, unoptimized hero image (PNG 1.2 MB), no SSR. Fixes: migrated to Analog SSR, switched to self-hosted WOFF2 subsets, replaced hero PNG with WebP + `fetchpriority=\"high\"`. LCP went from 4.2s to 2.3s on 4G mobile.",
    codeSnippet: `<!-- Before: render-blocking CDN font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/...">

<!-- After: preconnect + self-hosted WOFF2 -->
<link rel="preconnect" href="/" crossorigin>
<style>
  @font-face {
    font-family: 'JetBrains Mono';
    src: url('/fonts/jb-mono-400.woff2') format('woff2');
    font-display: swap;
  }
</style>`,
  },
  {
    id: 'clean-arch-dotnet',
    title: 'Clean Architecture Migration (.NET 8)',
    metric: 'Test Coverage +55 pp',
    metricValue: '+55 pp',
    pattern: 'Clean Architecture + CQRS',
    stack: ['.NET 8', 'C#', 'xUnit', 'MediatR'],
    category: 'quality',
    detail:
      'Restructured the Atena backend from a service-repository pattern (with business logic leaking into controllers) to Clean Architecture with CQRS via MediatR. Domain logic became unit-testable without a database. Line coverage went from 18% to 73% in 3 sprints. Added integration tests with TestContainers for SQL Server.',
    codeSnippet: `// Command handler — fully unit-testable, no DB dependency
public class RequestAdvanceHandler
    : IRequestHandler<RequestAdvanceCommand, Result<AdvanceId>>
{
    public async Task<Result<AdvanceId>> Handle(
        RequestAdvanceCommand cmd, CancellationToken ct)
    {
        var employee = await _repo.GetAsync(cmd.EmployeeId, ct);
        if (employee is null) return Result.Fail("Not found");

        var advance = employee.RequestAdvance(cmd.Amount);
        await _repo.SaveAsync(advance, ct);
        return Result.Ok(advance.Id);
    }
}`,
  },
  {
    id: 'rxjs-to-signals',
    title: 'RxJS Subscriptions → Signal Graph',
    metric: 'Memory −22%',
    metricValue: '−22%',
    pattern: 'toSignal() + takeUntilDestroyed()',
    stack: ['Angular 21', 'RxJS', 'TypeScript'],
    category: 'memory',
    detail:
      'Audited 32 components in the salary advance dashboard that used manual `subscribe()` + `unsubscribe()` patterns, many with missing unsubscriptions causing memory leaks in long-running sessions. Replaced with `toSignal()` and `takeUntilDestroyed()`. Chrome heap snapshots confirmed a 22% reduction in detached DOM tree count after navigating between routes 20+ times.',
    codeSnippet: `// Before: manual subscription — leak risk
ngOnInit() {
  this.sub = this.svc.advances$.subscribe(d => this.data = d);
}
ngOnDestroy() { this.sub?.unsubscribe(); }

// After: toSignal — auto-cleaned on component destroy
readonly data = toSignal(this.svc.advances$, {
  initialValue: [],
  injector: this.injector,
});`,
  },
];
