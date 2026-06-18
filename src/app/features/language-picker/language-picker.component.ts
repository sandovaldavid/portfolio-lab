import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '@shared/lib/i18n/i18n.service';

@Component({
	selector: 'app-language-picker',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [],
	templateUrl: './language-picker.component.html',
	styleUrl: './language-picker.component.css',
})
export class LanguagePickerComponent {
	readonly i18n = inject(I18nService);
}
