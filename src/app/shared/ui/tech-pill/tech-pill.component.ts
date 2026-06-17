import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
	selector: 'app-tech-pill',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tech-pill.component.html',
	styleUrl: './tech-pill.component.css',
})
export class TechPillComponent {
	readonly label = input.required<string>();
	readonly iconPath = input<string>();
}
