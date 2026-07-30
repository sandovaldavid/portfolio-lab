import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import type { StarEntry, StarMetricCategory } from '@entities/experience/model/star.model';
import { starEntries } from '@entities/experience/model/star.data';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { TranslationKey } from '@shared/config/i18n/en';

type FilterKey = 'all' | StarMetricCategory;
interface Filter {
	key: FilterKey;
	labelKey: TranslationKey;
}

@Component({
	selector: 'app-star-ledger',
	imports: [],
	templateUrl: './star-ledger.component.html',
	styleUrl: './star-ledger.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StarLedgerComponent {
	readonly i18n = inject(I18nService);
	readonly prominent = input(false);

	readonly filters: Filter[] = [
		{ key: 'all', labelKey: 'star.filter.all' },
		{ key: 'latency', labelKey: 'star.filter.latency' },
		{ key: 'throughput', labelKey: 'star.filter.throughput' },
		{ key: 'scalability', labelKey: 'star.filter.scalability' },
		{ key: 'memory', labelKey: 'star.filter.memory' },
		{ key: 'quality', labelKey: 'star.filter.quality' },
	];
	readonly activeFilter = signal<FilterKey>('all');
	readonly expandedId = signal<string | null>(null);

	readonly entries = computed<StarEntry[]>(() => {
		const f = this.activeFilter();
		return f === 'all' ? starEntries : starEntries.filter((e) => e.category === f);
	});

	readonly metricCards = computed(() =>
		starEntries.map((e) => ({
			id: e.id,
			value: e.metricValue,
			label: e.metric,
			category: e.category,
		}))
	);

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
