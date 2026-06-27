import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { NoteAttributes } from './index.page';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	imports: [DatePipe, RouterLink, MarkdownComponent],
	templateUrl: './[slug].page.html',
	styleUrl: './[slug].page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoteDetailPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	readonly note = toSignal(injectContent<NoteAttributes>(), { initialValue: null });
	readonly isNotFound = signal(false);

	ngOnInit(): void {
		const note = this.note();
		if (!note || !note.attributes?.title) {
			this.isNotFound.set(true);
			this.seo.updatePage({
				title: this.i18n.t()('seo.404.title'),
				description: this.i18n.t()('seo.404.description'),
			});
		} else {
			this.seo.updatePage({
				title: `${note.attributes.title} | TIL Vault`,
				description: note.attributes.description,
			});
		}
	}
}
