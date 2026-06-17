import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import type { StarEntry, StarMetricCategory } from '@entities/experience/model/star.model';
import { starEntries } from '@entities/experience/model/star.data';

type FilterKey = 'all' | StarMetricCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'ALL' },
  { key: 'latency', label: 'LATENCY' },
  { key: 'throughput', label: 'THROUGHPUT' },
  { key: 'scalability', label: 'SCALE' },
  { key: 'memory', label: 'MEMORY' },
  { key: 'quality', label: 'QUALITY' },
];

@Component({
  selector: 'app-star-ledger',
  imports: [],
  templateUrl: './star-ledger.component.html',
  styleUrl: './star-ledger.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarLedgerComponent {
  readonly filters = FILTERS;
  readonly activeFilter = signal<FilterKey>('all');
  readonly expandedId = signal<string | null>(null);

  readonly entries = computed<StarEntry[]>(() => {
    const f = this.activeFilter();
    return f === 'all' ? starEntries : starEntries.filter((e) => e.category === f);
  });

  toggleExpand(id: string): void {
    this.expandedId.update((cur) => (cur === id ? null : id));
  }

  categoryColor(cat: StarMetricCategory): string {
    const map: Record<StarMetricCategory, string> = {
      latency: 'text-[--color-primary]',
      throughput: 'text-[--color-accent]',
      scalability: 'text-[--color-secondary]',
      memory: 'text-[--color-success]',
      quality: 'text-[color:var(--color-muted)]',
    };
    return map[cat];
  }
}
