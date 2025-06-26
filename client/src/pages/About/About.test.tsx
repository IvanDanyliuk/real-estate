import { render, screen } from '@testing-library/react';
import AboutPage from './About';
import { vi } from 'vitest';
import * as useMediaQueryModule from '@mui/material/useMediaQuery';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock MUI's useMediaQuery
const mockUseMediaQuery = vi.spyOn(useMediaQueryModule, 'default');

describe('AboutPage', () => {
  beforeEach(() => {
    mockUseMediaQuery.mockReturnValue(false); // Default to desktop
  });

  it('renders main heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'pages.about.mainHeading' })).toBeInTheDocument();
  });

  it('renders history section with years and descriptions', () => {
    render(<AboutPage />);
    expect(screen.getByText('2016')).toBeInTheDocument();
    expect(screen.getByText('pages.about.history.first')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('pages.about.history.second')).toBeInTheDocument();
  });

  it('renders services section', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'pages.about.services.heading' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'pages.about.services.consultation.heading' })).toBeInTheDocument();
    expect(screen.getByText('pages.about.services.consultation.description')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'pages.about.services.spacePlanning.heading' })).toBeInTheDocument();
    expect(screen.getByText('pages.about.services.spacePlanning.description')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'pages.about.services.projectManagement.heading' })).toBeInTheDocument();
    expect(screen.getByText('pages.about.services.projectManagement.description')).toBeInTheDocument();
  });

  it('renders the logo image with alt text', () => {
    render(<AboutPage />);
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toBe('IMG');
  });

  it('renders correctly in mobile layout', () => {
    mockUseMediaQuery.mockReturnValue(true); // Simulate mobile
    render(<AboutPage />);
    // Just ensure rendering works without crashing
    expect(screen.getByText('pages.about.history.first')).toBeInTheDocument();
  });
});