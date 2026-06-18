import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { tap } from 'rxjs';
import { NoteAttributes } from './index.page';

@Component({
	selector: 'app-note-detail',
	standalone: true,
	imports: [AsyncPipe, DatePipe, RouterLink, MarkdownComponent],
	templateUrl: './[slug].page.html',
	styleUrl: './[slug].page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoteDetailPage implements OnInit {
	readonly i18n = inject(I18nService);
	private readonly seo = inject(SeoService);

	readonly note$ = injectContent<NoteAttributes>().pipe(
		tap((note) => {
			if (note) {
				this.seo.updatePage({
					title: `${note.attributes.title} | TIL Vault`,
					description: note.attributes.description,
				});
			}
		})
	);

	ngOnInit(): void {}
}
