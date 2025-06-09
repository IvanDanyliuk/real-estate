import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useMediaQuery } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import { ProfileNavMenu } from './ProfileNavMenu';
import i18n from '../../../../config/tests/i18nTestConfig';
import { PROFILE_NAV_LINKS } from '../../../../constants/navLinks';


vi.mock('react-router', async () => {
  const actual = await vi.importActual<any>('react-router');
  return {
    ...actual,
    NavLink: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<any>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

vi.mock('@mui/icons-material/AssignmentInd', () => ({
  default: () => <svg data-testid="AssignmentInd" />,
}));
vi.mock('@mui/icons-material/HomeWork', () => ({
  default: () => <svg data-testid="HomeWork" />,
}));
vi.mock('@mui/icons-material/FavoriteBorder', () => ({
  default: () => <svg data-testid="FavoriteBorder" />,
}));


describe('ProfileNavMenu', () => {
  const userId = '123';

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <ProfileNavMenu userId={userId} />
        </I18nextProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    (useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(false);
  });

  it('renders correct number of links', () => {
    renderComponent();
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(PROFILE_NAV_LINKS.length);
  });

  it('generates correct "to" links by replacing :id with userId', () => {
    renderComponent();
    PROFILE_NAV_LINKS.forEach(({ value }, i) => {
      const expectedPath = value.replace(':id', userId);
      expect(screen.getAllByRole('link', { hidden: true })[i]).toHaveAttribute('href', expectedPath);
    });
  });

  it('renders translated labels when not mobile', () => {
    renderComponent();
    PROFILE_NAV_LINKS.forEach(({ label }) => {
      const translation = i18n.t(label);
      expect(screen.getByText(translation)).toBeInTheDocument();
    });
  });

  it('does not render labels when isMobile is true', () => {
    (useMediaQuery as unknown as ReturnType<typeof vi.fn>).mockReturnValue(true);
    renderComponent();
    PROFILE_NAV_LINKS.forEach(({ label }) => {
      const translation = i18n.t(label);
      expect(screen.queryByText(translation)).not.toBeInTheDocument();
    });
  });

  it('renders an icon for each item', () => {
    renderComponent();
    expect(screen.getByTestId('AssignmentInd')).toBeInTheDocument();
    expect(screen.getByTestId('HomeWork')).toBeInTheDocument();
    expect(screen.getByTestId('FavoriteBorder')).toBeInTheDocument();
  });
});