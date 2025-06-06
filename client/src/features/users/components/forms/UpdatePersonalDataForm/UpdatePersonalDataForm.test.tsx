import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UpdatePersonalDataForm } from './UpdatePersonalDataForm';
import { vi } from 'vitest';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../../config/tests/i18nTestConfig';
import userEvent from '@testing-library/user-event';
import { User } from '../../../state/types';

// Mock icon
vi.mock('@mui/icons-material', async () => {
  const actual = await vi.importActual('@mui/icons-material');
  return {
    ...actual,
    EditNote: () => <svg data-testid="EditNoteIcon" />,
  };
});

describe('UpdatePersonalDataForm', () => {
  const mockUser = {
    _id: 'u1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    location: 'Kyiv',
  } as User;

  const renderComponent = (props = {}) => {
    const defaultProps = {
      open: true,
      user: mockUser,
      onSubmit: vi.fn().mockResolvedValue({}),
      onHandleOpen: vi.fn(),
    };

    return render(
      <I18nextProvider i18n={i18n}>
        <UpdatePersonalDataForm {...defaultProps} {...props} />
      </I18nextProvider>
    );
  };

  it('renders the dialog with user data when open', () => {
    renderComponent();
    expect(screen.getByLabelText(/name/i)).toHaveValue(mockUser.name);
    expect(screen.getByLabelText(/email/i)).toHaveValue(mockUser.email);
    expect(screen.getByLabelText(/phone/i)).toHaveValue(mockUser.phone);
    expect(screen.getByLabelText(/location/i)).toHaveValue(mockUser.location);
  });

  it('calls onHandleOpen when edit icon is clicked', () => {
    const onHandleOpen = vi.fn();
    renderComponent({ open: false, onHandleOpen });
    fireEvent.click(screen.getByRole('button'));
    expect(onHandleOpen).toHaveBeenCalled();
  });

  it('shows validation errors on invalid submit', async () => {
    renderComponent();
    const nameInput = screen.getByLabelText(/name/i);
    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    });
  });

  it('calls onSubmit with FormData on valid submit', async () => {
    const onSubmit = vi.fn().mockResolvedValue({});
    renderComponent({ onSubmit });

    const newName = 'Jane Doe';
    const nameInput = screen.getByLabelText(/name/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: newName } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

    const formDataArg = onSubmit.mock.calls[0][0];
    expect(formDataArg instanceof FormData).toBe(true);
    expect(formDataArg.get('name')).toBe(newName);
    expect(formDataArg.get('_id')).toBe(mockUser._id);
  });
});