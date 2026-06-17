import { render, screen } from '@testing-library/angular';
import { TechPillComponent } from './tech-pill.component';

describe('TechPillComponent', () => {
	it('should render label', async () => {
		await render(TechPillComponent, {
			inputs: {
				label: 'Angular',
			},
		});

		expect(screen.getByText('Angular')).toBeTruthy();
	});

	it('should render image when iconPath is provided', async () => {
		const { container } = await render(TechPillComponent, {
			inputs: {
				label: 'Angular',
				iconPath: 'assets/angular.svg',
			},
		});

		const img = container.querySelector('img');
		expect(img).toBeTruthy();
		expect(img?.getAttribute('src')).toBe('assets/angular.svg');
	});
});
