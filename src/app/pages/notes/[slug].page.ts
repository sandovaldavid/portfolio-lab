import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, injectContentFiles, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { SeoService } from '@shared/lib/seo/seo.service';
import { ogImageUrl } from '@shared/config/contact.config';
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
	private readonly allNotes = injectContentFiles<NoteAttributes>();

	readonly readingTime = computed(() => {
		const n = this.note();
		if (!n?.content) return 0;
		const words = (n.content as string).trim().split(/\s+/).length;
		return Math.max(1, Math.ceil(words / 200));
	});

	readonly relatedNotes = computed(() => {
		const current = this.note();
		if (!current?.attributes?.tags) return [];
		const currentTags = current.attributes.tags;
		return this.allNotes
			.filter((n) => n.slug !== current.slug)
			.map((n) => ({
				...n,
				sharedTags: n.attributes.tags?.filter((t) => currentTags.includes(t)).length ?? 0,
			}))
			.filter((n) => n.sharedTags > 0)
			.sort((a, b) => b.sharedTags - a.sharedTags)
			.slice(0, 3);
	});

	ngOnInit(): void {
		const note = this.note();
		if (!note || !note.attributes?.title) {
			this.isNotFound.set(true);
			this.seo.updatePage({
				title: this.i18n.t()('seo.404.title'),
				description: this.i18n.t()('seo.404.description'),
			});
		} else {
			const title = `${note.attributes.title} | TIL Vault`;
			const description = note.attributes.description;
			this.seo.updatePage({
				title,
				description,
				ogImage: ogImageUrl(title, description, 'note'),
			});
		}
	}
}
