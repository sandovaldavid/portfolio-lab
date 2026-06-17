import { render, screen } from '@testing-library/angular';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  it('should render label', async () => {
    await render(BadgeComponent, {
      inputs: {
        label: 'My Badge',
      },
    });

    expect(screen.getByText('My Badge')).toBeTruthy();
  });

  it('should render icon when icon is provided', async () => {
    const { container } = await render(BadgeComponent, {
      inputs: {
        label: 'My Badge',
        icon: 'assets/icon.svg',
      },
    });

    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('assets/icon.svg');
  });
});
