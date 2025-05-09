import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { NavbarMobile } from './NavbarMobile';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../constants/navLinks', () => ({
  NAV_LINKS: [
    { href: '/home', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
  ],
}));

vi.mock('../UserMenu/UserMenu', () => ({
  UserMenu: ({ user }: any) => <div>UserMenu for {user.name}</div>,
}));


describe('NavbarMobile component', () => {
  it('should render sign-in link when user is null', () => {
    render(
      <MemoryRouter>
        <NavbarMobile user={null} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('should render UserMenu when user is present', () => {
    render(
      <MemoryRouter>
        <NavbarMobile user={{ name: 'Alice' } as any} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('menu-btn'));

    expect(screen.getByText(/UserMenu for Alice/)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(
      <MemoryRouter>
        <NavbarMobile user={null} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('menu-btn'));

    expect(screen.getByText('nav.home')).toBeInTheDocument();
    expect(screen.getByText('nav.about')).toBeInTheDocument();
  });

  it('should toggle drawer on menu icon click', async () => {
    render(
      <MemoryRouter>
        <NavbarMobile user={null} />
      </MemoryRouter>
    );

    expect(screen.queryByText('nav.home')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('menu-btn'));
    expect(screen.getByText('nav.home')).toBeVisible();

    fireEvent.click(screen.getByTestId('menu-btn'));
    await waitFor(() => {
      expect(screen.queryByText('nav.home')).not.toBeInTheDocument();
    });
  });
});