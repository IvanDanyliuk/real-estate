import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ContactPage from './Contact';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../../components/layout/SocialMediaLinks/SocialMediaLinks', () => ({
  SocialMediaLinks: () => <div data-testid="social-media-links" />,
}));


describe('ContactPage', () => {
  it('renders main heading and subheading from translations', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'pages.contacts.mainHeading' })).toBeInTheDocument();
    expect(screen.getByText('pages.contacts.subHeading')).toBeInTheDocument();
  });

  it('renders the SocialMediaLinks component', () => {
    render(<ContactPage />);
    expect(screen.getByTestId('social-media-links')).toBeInTheDocument();
  });
});