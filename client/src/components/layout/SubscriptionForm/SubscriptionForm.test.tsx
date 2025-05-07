import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { SubscriptionForm } from './SubscriptionForm';
import i18n from '../../../config/tests/i18nTestConfig'; // adjust path to your i18n config


describe('SubscriptionForm tests', () => {
  it('renders input and button', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SubscriptionForm />
      </I18nextProvider>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('allows user to type in the input', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SubscriptionForm />
      </I18nextProvider>
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test@example.com');

    expect(input).toHaveValue('test@example.com');
  });
});