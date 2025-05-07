import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';
import { Navbar } from './Navbar';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../../constants/navLinks', () => ({
  NAV_LINKS: [
    { href: '/home', label: 'nav.home' },
    { href: '/about', label: 'nav.about' },
    { href: '/contact', label: 'nav.contact' },
  ],
}));


describe('Navbar component', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('nav.home')).toBeInTheDocument();
    expect(screen.getByText('nav.about')).toBeInTheDocument();
    expect(screen.getByText('nav.contact')).toBeInTheDocument();
  });

  it('has correct hrefs in NavLink', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('nav.home').closest('a')).toHaveAttribute('href', '/home');
    expect(screen.getByText('nav.about').closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText('nav.contact').closest('a')).toHaveAttribute('href', '/contact');
  });
});