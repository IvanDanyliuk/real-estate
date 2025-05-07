import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { SocialMediaLinks } from './SocialMediaLinks'
import { SOCIAL_MEDIA_LINKS } from '../../../constants/socialMediaLinks'


describe('SocialMediaLinks tests', () => {
  it('should render nav links', () => {
    render(
      <MemoryRouter>
        <SocialMediaLinks />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('link')).toHaveLength(SOCIAL_MEDIA_LINKS.length);
  });
}); 