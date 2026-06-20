import {
	ChangeDetectionStrategy,
	Component,
	HostListener,
	inject,
	input,
	output,
	signal,
} from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import type { ResumeSection, ResumeStyle } from '../resume.types';
import { ALL_SECTIONS } from '../resume.types';

@Component({
	selector: 'app-resume-controls',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<aside class="resume-controls no-print" [class.controls-collapsed]="!open()">
			<button
				class="controls-toggle"
				(click)="open.set(!open())"
				[attr.aria-expanded]="open()"
				aria-label="Toggle controls"
			>
				@if (open()) {
					✕
				} @else {
					⚙
				}
			</button>

			@if (open()) {
				<div class="controls-body">
					<h3 class="controls-title">{{ i18n.t()('resume.controls.title') }}</h3>

					<div class="control-group">
						<p class="control-label">{{ i18n.t()('resume.controls.style') }}</p>
						<div class="style-switcher">
							@for (s of styles; track s.value) {
								<button
									class="style-btn"
									[class.style-btn-active]="activeStyle() === s.value"
									(click)="styleChange.emit(s.value)"
								>
									{{ s.label }}
								</button>
							}
						</div>
					</div>

					<div class="control-group">
						<p class="control-label">{{ i18n.t()('resume.controls.sections') }}</p>
						@for (section of allSections; track section) {
							<label class="section-toggle">
								<input
									type="checkbox"
									[checked]="isSectionVisible(section)"
									(change)="sectionToggle.emit(section)"
								/>
								<span>{{ i18n.t()('resume.section.' + section) }}</span>
							</label>
						}
					</div>

					<div class="control-actions">
						<button class="ctrl-btn ctrl-btn-reset" (click)="resetClick.emit()">
							{{ i18n.t()('resume.controls.reset') }}
						</button>
						<button class="ctrl-btn ctrl-btn-print" (click)="printResume()">
							{{ i18n.t()('resume.controls.print') }}
						</button>
					</div>
				</div>
			}
		</aside>
	`,
})
export class ResumeControlsComponent {
	readonly i18n = inject(I18nService);
	readonly activeStyle = input<ResumeStyle>('modern');
	readonly visibleSections = input<ResumeSection[]>([...ALL_SECTIONS]);
	readonly styleChange = output<ResumeStyle>();
	readonly sectionToggle = output<ResumeSection>();
	readonly resetClick = output<void>();

	readonly open = signal(true);
	readonly allSections = ALL_SECTIONS;
	readonly styles: { value: ResumeStyle; label: string }[] = [
		{ value: 'modern', label: 'Modern' },
		{ value: 'harvard', label: 'Harvard' },
		{ value: 'ats', label: 'ATS' },
	];

	isSectionVisible(section: ResumeSection): boolean {
		return this.visibleSections().includes(section);
	}

	printResume(): void {
		window.print();
	}

	@HostListener('window:keydown', ['$event'])
	onKeydown(event: KeyboardEvent): void {
		if (event.key === 'r' && !event.ctrlKey && !event.metaKey && !event.altKey) {
			const target = event.target as HTMLElement;
			if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
			this.open.update((v) => !v);
		}
	}
}
