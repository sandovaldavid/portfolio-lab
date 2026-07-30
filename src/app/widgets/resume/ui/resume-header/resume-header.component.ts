import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OWNER } from '@shared/config/contact.config';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
	selector: 'app-resume-header',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './resume-header.component.html',
	styleUrl: './resume-header.component.css',
})
export class ResumeHeaderComponent {
	readonly i18n = inject(I18nService);
	readonly owner = OWNER;
}
