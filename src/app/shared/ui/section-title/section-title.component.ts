import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-section-title',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './section-title.component.html',
	styleUrl: './section-title.component.css',
})
export class SectionTitleComponent {
	readonly prefix = input('//');
}
