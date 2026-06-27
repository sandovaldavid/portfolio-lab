import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from './seo.service';

describe('SeoService', () => {
	let service: SeoService;
	let titleService: Title;
	let metaService: Meta;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SeoService, Title, Meta],
		});
		service = TestBed.inject(SeoService);
		titleService = TestBed.inject(Title);
		metaService = TestBed.inject(Meta);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should update page title', () => {
		const spy = vi.spyOn(titleService, 'setTitle');
		service.updatePage({
			title: 'Test Page',
			description: 'Test description',
		});
		expect(spy).toHaveBeenCalledWith('Test Page | David Sandoval');
	});

	it('should not duplicate David Sandoval in title', () => {
		const spy = vi.spyOn(titleService, 'setTitle');
		service.updatePage({
			title: 'David Sandoval | Portfolio',
			description: 'Test description',
		});
		expect(spy).toHaveBeenCalledWith('David Sandoval | Portfolio');
	});

	it('should update meta description', () => {
		const spy = vi.spyOn(metaService, 'updateTag');
		service.updatePage({
			title: 'Test',
			description: 'My description',
		});
		expect(spy).toHaveBeenCalledWith({ name: 'description', content: 'My description' });
	});

	it('should update Open Graph tags', () => {
		const spy = vi.spyOn(metaService, 'updateTag');
		service.updatePage({
			title: 'Test',
			description: 'Description',
		});
		expect(spy).toHaveBeenCalledWith({ property: 'og:title', content: expect.any(String) });
		expect(spy).toHaveBeenCalledWith({ property: 'og:description', content: 'Description' });
		expect(spy).toHaveBeenCalledWith({ property: 'og:type', content: 'website' });
	});

	it('should inject JSON-LD script', () => {
		const jsonLd = { '@type': 'Person', name: 'Test' };
		service.updatePage({
			title: 'Test',
			description: 'Desc',
			jsonLd,
		});
		const script = document.getElementById('portfolio-json-ld');
		expect(script).toBeTruthy();
		expect(script?.getAttribute('type')).toBe('application/ld+json');
	});
});
