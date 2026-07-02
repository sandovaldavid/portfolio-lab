import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { injectContent, injectContentFiles, MarkdownComponent } from '@analogjs/content';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
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
export default class NoteDetailPage {
	readonly i18n = inject(I18nService);

	// Notes live under src/content/{algorithms,systems}/ — injectContent() needs an explicit
	// subdirectory to build the right file path, and a bare slug doesn't say which one it's
	// in. Querying both and keeping whichever one actually resolves handles either category
	// without the caller needing to know it upfront.
	//
	// injectContent() also resolves asynchronously (content is loaded via a Promise even when
	// the file exists), so `note` stays null for at least one tick after construction.
	// isNotFound and the SEO update must react to that resolution — not read it once —
	// or a real note ends up permanently stuck on the not-found state.
	readonly note = toSignal(
		combineLatest([
			injectContent<NoteAttributes>({ param: 'slug', subdirectory: 'algorithms' }),
			injectContent<NoteAttributes>({ param: 'slug', subdirectory: 'systems' }),
		]).pipe(map(([algorithms, systems]) => (algorithms.attributes?.title ? algorithms : systems))),
		{ initialValue: null }
	);
	readonly isNotFound = computed(() => {
		const note = this.note();
		return note !== null && !note.attributes?.title;
	});
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

	constructor() {
		setupPageSeo((t) => {
			const note = this.note();
			if (note === null) return null;

			if (!note.attributes?.title) {
				return { title: t('seo.404.title'), description: t('seo.404.description') };
			}

			const title = `${note.attributes.title} | TIL Vault`;
			const description = note.attributes.description;
			return { title, description, ogImage: ogImageUrl(title, description, 'note') };
		});
	}
}
