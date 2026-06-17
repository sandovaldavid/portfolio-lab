import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { TranslatePipe } from '@shared/lib/i18n/translate.pipe';
import { ScrollObserverDirective } from '@shared/lib/animation/scroll-observer.directive';
import { ModeStateService } from '@shared/lib/mode/mode-state.service';
import type { TranslationKey } from '@shared/config/i18n/en';

const FOCUS_KEYS: TranslationKey[] = [
	'about-me.focus1',
	'about-me.focus2',
	'about-me.focus3',
	'about-me.focus4',
	'about-me.focus5',
	'about-me.focus6',
];

@Component({
	selector: 'app-about-section',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TranslatePipe, ScrollObserverDirective, DecimalPipe],
	templateUrl: './about-section.component.html',
	styleUrl: './about-section.component.css',
})
export class AboutSectionComponent {
	readonly compact = input(false);
	readonly focusKeys = FOCUS_KEYS;
	readonly i18n = inject(I18nService);
	readonly dummyCompileTrigger = true;
	readonly state = inject(ModeStateService);
}
