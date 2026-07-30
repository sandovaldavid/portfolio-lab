import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { setupPageSeo } from '@shared/lib/seo/page-seo';
import { ogImageUrl } from '@shared/config/contact.config';
import { DatePipe } from '@angular/common';

export interface NoteAttributes {
	title: string;
	description: string;
	date: string;
	category: 'algorithms' | 'systems';
	tags: string[];
}

@Component({
	selector: 'app-notes-list',
	standalone: true,
	imports: [RouterLink, DatePipe],
	templateUrl: './index.page.html',
	styleUrl: './index.page.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotesListPage {
	readonly i18n = inject(I18nService);

	// Load all markdown files from src/content/
	private readonly allNotes = injectContentFiles<NoteAttributes>();

	readonly searchTerms = signal<string>('');
	readonly activeCategory = signal<'all' | 'algorithms' | 'systems'>('all');

	// Reactively filter and sort notes
	readonly notes = computed(() => {
		const query = this.searchTerms().toLowerCase().trim();
		const cat = this.activeCategory();

		return this.allNotes
			.filter((note) => {
				const matchesCategory = cat === 'all' || note.attributes.category === cat;
				const matchesSearch =
					!query ||
					note.attributes.title.toLowerCase().includes(query) ||
					note.attributes.description.toLowerCase().includes(query) ||
					note.attributes.tags?.some((t) => t.toLowerCase().includes(query));
				return matchesCategory && matchesSearch;
			})
			.sort(
				(a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
			);
	});

	constructor() {
		setupPageSeo(() => ({
			title: 'TIL Vault | David Sandoval',
			description:
				'Today I Learned — atomic notes on Computer Science, algorithms, and distributed systems.',
			ogImage: ogImageUrl(
				'TIL Vault',
				'Today I Learned — atomic notes on Computer Science, algorithms, and distributed systems.',
				'notes'
			),
			canonical: 'https://devsandoval.me/notes',
		}));
	}

	updateSearch(val: string): void {
		this.searchTerms.set(val);
	}

	setCategory(cat: 'all' | 'algorithms' | 'systems'): void {
		this.activeCategory.set(cat);
	}
}
