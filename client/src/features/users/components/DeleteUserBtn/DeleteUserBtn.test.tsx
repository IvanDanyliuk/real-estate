import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import { DeleteUserBtn } from './DeleteUserBtn';
import i18n from '../../../../config/tests/i18nTestConfig';


vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />
}));


describe('DeleteUserBtn', () => {
  const onSubmit = vi.fn();
  const onHandleOpen = vi.fn();

  const renderComponent = (props = {}) => {
    return render(
      <I18nextProvider i18n={i18n}>
        <DeleteUserBtn
          open={false}
          isLoading={false}
          onSubmit={onSubmit}
          onHandleOpen={onHandleOpen}
          {...props}
        />
      </I18nextProvider>
    );
  };

  it('renders trigger button', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument();
  });

  it('opens dialog on button click', () => {
    renderComponent();
    const triggerBtn = screen.getByRole('button', { name: /delete account/i });
    fireEvent.click(triggerBtn);
    expect(onHandleOpen).toHaveBeenCalled();
  });

  it('renders dialog with translated texts when open', () => {
    renderComponent({ open: true });
    expect(screen.getByText(/are you sure you want to delete your account/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
  });

  it('calls onSubmit when confirm button is clicked', () => {
    renderComponent({ open: true });
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    fireEvent.click(confirmBtn);
    expect(onSubmit).toHaveBeenCalled();
  });

  it('calls onHandleOpen when cancel button is clicked', () => {
    renderComponent({ open: true });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelBtn);
    expect(onHandleOpen).toHaveBeenCalled();
  });

  it('shows loader when isLoading is true', () => {
    renderComponent({ open: true, isLoading: true });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('disables buttons when isLoading is true', () => {
    renderComponent({ open: true, isLoading: true });
    const confirmBtn = screen.getByRole('button', { name: /cancel/i });
    expect(confirmBtn).toBeDisabled();
  });
});