import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import * as reactRedux from '../../../hooks/useAppSelector';
import * as mui from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { vi } from 'vitest';
import i18n from '../../../config/tests/i18nTestConfig'; // assuming you have a test i18n config
import { renderWithProviders } from '../../../config/tests/renderWithProvider';


vi.mock('../../../hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@mui/material', async () => {
  const actualMUI = await vi.importActual('@mui/material');
  return {
    ...actualMUI,
    useMediaQuery: vi.fn(),
  };
});


describe('Header tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    renderWithProviders(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <Header />
        </I18nextProvider>
      </MemoryRouter>
    );

  it('renders Navbar and UserMenu when user is logged in (desktop)', () => {
    (reactRedux.useAppSelector as any).mockReturnValue({ user: { name: 'Test User' } });
    (mui.useMediaQuery as any).mockReturnValue(false);

    renderComponent();

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('renders Sign in link when user is not logged in (desktop)', () => {
    (reactRedux.useAppSelector as any).mockReturnValue({ user: null });
    (mui.useMediaQuery as any).mockReturnValue(false);

    renderComponent();

    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('renders NavbarMobile on mobile', () => {
    (reactRedux.useAppSelector as any).mockReturnValue({ user: null });
    (mui.useMediaQuery as any).mockReturnValue(true);

    renderComponent();

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});