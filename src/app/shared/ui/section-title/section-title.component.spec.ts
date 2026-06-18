import { render, screen } from '@testing-library/angular';
import { SectionTitleComponent } from './section-title.component';

describe('SectionTitleComponent', () => {
	it('should render content projection and default prefix', async () => {
		await render('<app-section-title>Projects</app-section-title>', {
			imports: [SectionTitleComponent],
		});

		expect(screen.getByText('Projects')).toBeTruthy();
		expect(screen.getByText('//')).toBeTruthy();
	});

	it('should render custom prefix', async () => {
		await render('<app-section-title [prefix]="prefix">Projects</app-section-title>', {
			imports: [SectionTitleComponent],
			componentProperties: {
				prefix: '/*',
			},
		});

		expect(screen.getByText('Projects')).toBeTruthy();
		expect(screen.getByText('/*')).toBeTruthy();
	});
});
