import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@shared/lib/seo/seo.service';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { ResumeComponent } from '@widgets/resume/resume.component';

@Component({
	selector: 'app-resume-page',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [ResumeComponent],
	template: `<app-resume />`,
})
export default class ResumePage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	ngOnInit(): void {
		this.seo.updatePage({
			title: this.i18n.t()('seo.resume.title'),
			description: this.i18n.t()('seo.resume.description'),
			canonical: 'https://devsandoval.me/resume',
		});
	}
}
