import { render, screen, fireEvent } from '@testing-library/react';
import { vi, beforeEach, describe, expect, it } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import { LanguageSelect } from './LanguageSelect';
import i18n from '../../../config/tests/i18nTestConfig';


beforeEach(() => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'lang') return 'en';
    return null;
  });

  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

describe('LanguageSelect', () => {
  it('renders both language buttons', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelect />
      </I18nextProvider>
    );

    expect(screen.getByAltText('en-icon')).toBeInTheDocument();
    expect(screen.getByAltText('ua-icon')).toBeInTheDocument();
  });

  it('disables the English button when language is en', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelect />
      </I18nextProvider>
    );

    const enButton = screen.getByRole('button', { name: /english/i });
    const uaButton = screen.getByRole('button', { name: /українська/i });

    expect(enButton).toBeDisabled();
    expect(uaButton).not.toBeDisabled();
  });

  it('calls changeLanguage when clicking Ukrainian button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <LanguageSelect />
      </I18nextProvider>
    );

    const uaButton = screen.getByAltText(/ua-icon/i);
    fireEvent.click(uaButton);

    expect(i18n.language).toBe('ua');
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'ua');
  });
});