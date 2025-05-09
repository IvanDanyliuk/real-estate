import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { UserMenu } from './UserMenu';
import { User } from '../../../features/users/state/types';
import { USER_ROLES } from '../../../constants/main';


const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  role: USER_ROLES.Admin,
  profilePhoto: '',
};

const mockDispatch = vi.fn();
vi.mock('../../../hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

const mockLogout = vi.fn();
vi.mock('../../../features/auth/state/authApi', () => ({
  useLogoutMutation: () => [mockLogout, { isLoading: false, isSuccess: false }],
}));

const mockSetUser = vi.fn();
vi.mock('../../../features/users/state/userSlice', () => ({
  setUser: (val: any) => mockSetUser(val),
}));


describe('UserMenu tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders user name and email', () => {
    render(
      <BrowserRouter>
        <UserMenu user={mockUser as User} />
      </BrowserRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('opens menu on button click', () => {
    render(
      <BrowserRouter>
        <UserMenu user={mockUser as User} />
      </BrowserRouter>
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(screen.getByRole('menu')).toBeVisible();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout and dispatch on logout click', async () => {
    render(
      <BrowserRouter>
        <UserMenu user={mockUser as User} />
      </BrowserRouter>
    );
  
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Logout'));
  
    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockSetUser).toHaveBeenCalledWith(null);
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});