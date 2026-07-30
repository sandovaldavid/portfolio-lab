import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, type Observable } from 'rxjs';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { OWNER } from '@shared/config/contact.config';

interface ContributionDay {
	date: string;
	level: number;
}

interface ContributionWeek {
	days: ContributionDay[];
}

interface ContributionData {
	total: number;
	weeks: ContributionWeek[];
}

type RequestState =
	{ status: 'loading' } | { status: 'success'; data: ContributionData } | { status: 'error' };

@Component({
	selector: 'app-github-contributions',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './github-contributions.component.html',
	styleUrl: './github-contributions.component.css',
})
export class GithubContributionsComponent {
	readonly i18n = inject(I18nService);
	readonly githubHref = OWNER.github;

	private readonly http = inject(HttpClient);
	private readonly contributions$ = this.http
		.get<ContributionData>('/api/v1/github-contributions')
		.pipe(
			map((data): RequestState => ({ status: 'success', data })),
			catchError((): Observable<RequestState> => of({ status: 'error' }))
		);

	readonly state = toSignal(this.contributions$, {
		initialValue: { status: 'loading' } as RequestState,
	});
	readonly isLoading = computed(() => this.state().status === 'loading');
	readonly isError = computed(() => this.state().status === 'error');
	readonly data = computed(() => {
		const state = this.state();
		return state.status === 'success' ? state.data : null;
	});
	readonly weeks = computed(() => this.data()?.weeks ?? []);
	readonly total = computed(() => this.data()?.total ?? 0);
}
