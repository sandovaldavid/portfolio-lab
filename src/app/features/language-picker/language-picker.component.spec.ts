import { render, screen, fireEvent } from '@testing-library/angular';
import { LanguagePickerComponent } from './language-picker.component';
import { I18nService } from '@shared/lib/i18n/i18n.service';
import { signal } from '@angular/core';

describe('LanguagePickerComponent', () => {
  it('should toggle language when clicked', async () => {
    const mockLangSignal = signal<'en' | 'es'>('en');
    const mockI18nService = {
      lang: mockLangSignal,
      toggleLang: vi.fn(() => {
        mockLangSignal.set(mockLangSignal() === 'en' ? 'es' : 'en');
      }),
    };

    await render(LanguagePickerComponent, {
      providers: [
        { provide: I18nService, useValue: mockI18nService },
      ],
    });

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('EN');

    fireEvent.click(button);
    expect(mockI18nService.toggleLang).toHaveBeenCalled();
    expect(button.textContent).toContain('ES');
  });
});
