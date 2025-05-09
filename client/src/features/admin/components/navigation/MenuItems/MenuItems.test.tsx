import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MenuItems } from './MenuItems';
import { MemoryRouter } from 'react-router-dom';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../../../constants/navLinks', () => ({
  ADMIN_DASHBOARD_NAV_LINKS: [
    { href: '/dashboard', label: 'dashboard.label', icon: () => <svg data-testid="icon-dashboard" /> },
    { href: '/analytics', label: 'analytics.label', icon: () => <svg data-testid="icon-analytics" /> },
  ],
}));

describe('MenuItems component', () => {
  it('renders all navigation links with translated labels', () => {
    render(
      <MemoryRouter>
        <MenuItems />
      </MemoryRouter>
    );

    expect(screen.getByText('dashboard.label')).toBeInTheDocument();
    expect(screen.getByText('analytics.label')).toBeInTheDocument();

    expect(screen.getByTestId('icon-dashboard')).toBeInTheDocument();
    expect(screen.getByTestId('icon-analytics')).toBeInTheDocument();
  });

  it('calls onClose when a link is clicked', () => {
    const handleClose = vi.fn();

    render(
      <MemoryRouter>
        <MenuItems onClose={handleClose} />
      </MemoryRouter>
    );

    const link = screen.getByText('dashboard.label');
    link.click();

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});