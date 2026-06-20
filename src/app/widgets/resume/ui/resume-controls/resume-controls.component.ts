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
import type { TranslationKey } from '@shared/config/i18n/en';
import type { ResumeSection, ResumeStyle } from '../../resume.types';
import { ALL_SECTIONS } from '../../resume.types';

@Component({
	selector: 'app-resume-controls',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-controls.component.html',
	styleUrl: './resume-controls.component.css',
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

	sectionLabel(section: ResumeSection): string {
		return this.i18n.t()(`resume.section.${section}` as TranslationKey);
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
