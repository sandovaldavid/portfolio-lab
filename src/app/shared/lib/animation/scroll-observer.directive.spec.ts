import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { ScrollObserverDirective } from './scroll-observer.directive';

@Component({
  template: `<div data-testid="target" appScrollObserver>Test Content</div>`,
  standalone: true,
  imports: [ScrollObserverDirective],
})
class TestComponent {}

describe('ScrollObserverDirective', () => {
  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    } as any;
  });

  it('should apply will-animate class', async () => {
    await render(TestComponent);
    const element = screen.getByTestId('target');
    expect(element.className).toContain('will-animate');
  });
});
