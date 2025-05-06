import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Footer } from './Footer';
import { FOOTER_LINKS } from '../../../constants/footerLinks';
import { useTranslation } from 'react-i18next';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock('../Logo/Logo', () => ({
  Logo: () => <div data-testid="logo" />,
}));

vi.mock('../SocialMediaLinks/SocialMediaLinks', () => ({
  SocialMediaLinks: () => <div data-testid="social-media-links" />,
}));

vi.mock('../SubscriptionForm/SubscriptionForm', () => ({
  SubscriptionForm: () => <form data-testid="subscription-form" />,
}));


describe('Footer tests', () => {
  it('renders static description text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText(/Lorem ipsum dolor sit amet/i)
    ).toBeInTheDocument();
  });

  it('renders footer headings from translation keys', () => {
    expect.hasAssertions();

    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(
      screen.getByText('main_layout.additionalFooterLinks.pagesSectionHeading')
    ).toBeInTheDocument();
    expect(
      screen.getByText('main_layout.additionalFooterLinks.supportSectionHeading')
    ).toBeInTheDocument();
    expect(
      screen.getByText('main_layout.additionalFooterLinks.getUpdatedForm.heading')
    ).toBeInTheDocument();
  });

  it('renders logo, social media links, and subscription form', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('social-media-links')).toBeInTheDocument();
    expect(screen.getByTestId('subscription-form')).toBeInTheDocument();
  });

  it('renders all footer links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const allLinks = [...FOOTER_LINKS.pages, ...FOOTER_LINKS.support];

    allLinks.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });
});