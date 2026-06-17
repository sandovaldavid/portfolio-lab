import { render, screen } from '@testing-library/angular';
import { PixelButtonComponent } from './pixel-button.component';

describe('PixelButtonComponent', () => {
  it('should render projection content', async () => {
    await render('<app-pixel-button>Click me</app-pixel-button>', {
      imports: [PixelButtonComponent],
    });

    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('should apply primary styles by default', async () => {
    const { fixture } = await render(PixelButtonComponent);
    const element = fixture.nativeElement as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.className).toContain('bg-[--color-primary]');
  });

  it('should apply disabled styles when disabled input is true', async () => {
    const { fixture } = await render(PixelButtonComponent, {
      inputs: {
        disabled: true,
      },
    });
    const element = fixture.nativeElement as HTMLElement;
    expect(element).toBeTruthy();
    expect(element.className).toContain('opacity-50');
  });
});
