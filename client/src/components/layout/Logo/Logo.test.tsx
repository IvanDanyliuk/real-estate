import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'
import { MemoryRouter } from 'react-router';


describe('Logo tests', () => {
  it('should render the component', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});