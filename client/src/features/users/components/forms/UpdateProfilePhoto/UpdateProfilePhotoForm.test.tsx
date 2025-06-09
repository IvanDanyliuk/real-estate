import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import { UpdateProfilePhotoForm } from './UpdateProfilePhotoForm';
import i18n from '../../../../../config/tests/i18nTestConfig'; // Create a simple i18n mock config


vi.mock('./styles', () => ({
  styles: {
    triggerBtn: {},
    form: {},
  },
}));


const mockFile = new File(['avatar'], 'avatar.png', { type: 'image/png' });

describe('UpdateProfilePhotoForm', () => {
  const onSubmit = vi.fn();
  const onHandleOpen = vi.fn();

  const setup = (open = false, isLoading = false) => {
    render(
      <I18nextProvider i18n={i18n}>
        <UpdateProfilePhotoForm
          open={open}
          userId="123"
          isLoading={isLoading}
          onSubmit={onSubmit}
          onHandleOpen={onHandleOpen}
        />
      </I18nextProvider>
    );
  };

  it('renders trigger button', () => {
    setup();
    expect(screen.getByRole('button', { name: /open/i })).toBeInTheDocument();
  });

  it('opens dialog when trigger button is clicked', async () => {
    setup();
    const trigger = screen.getByRole('button', { name: /open/i });
    fireEvent.click(trigger);
    expect(onHandleOpen).toHaveBeenCalled();
  });

  it('renders dialog content when open', () => {
    setup(true);
    expect(screen.getByText(/Update Profile Photo/i)).toBeInTheDocument();
  });

  it('disables submit button when loading', () => {
    setup(true, true);
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
  });

  it('submits form with FormData when file is selected', async () => {
    setup(true);

    const input = screen.getByTestId('file-input');
    await waitFor(() => userEvent.upload(input, mockFile));

    const submitBtn = screen.getByRole('button', { name: /submit/i });
    await userEvent.click(submitBtn);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      const formDataArg = onSubmit.mock.calls[0][0];
      expect(formDataArg instanceof FormData).toBe(true);
      expect(formDataArg.get('_id')).toBe('123');
      expect(formDataArg.getAll('profilePhoto')).toHaveLength(1);
    });
  });
});