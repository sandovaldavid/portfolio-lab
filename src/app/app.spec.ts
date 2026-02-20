import { render } from '@testing-library/angular';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

import { App } from './app';

describe('App', () => {
	it('should render the app', async () => {
		const { container } = await render(App, {
			providers: [provideRouter([]), provideLocationMocks()],
		});

		expect(container.querySelector('router-outlet')).toBeTruthy();
	});
});
