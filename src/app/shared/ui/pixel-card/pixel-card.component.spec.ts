import { render, screen } from '@testing-library/angular';
import { PixelCardComponent } from './pixel-card.component';

describe('PixelCardComponent', () => {
	it('should render content projection', async () => {
		await render('<app-pixel-card>Card content</app-pixel-card>', {
			imports: [PixelCardComponent],
		});

		expect(screen.getByText('Card content')).toBeTruthy();
	});
});
