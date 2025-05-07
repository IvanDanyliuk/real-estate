import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { NotFound } from './NotFound'


describe('NotFound tests', () => {
  it('should render the component', () => {
    render(
      <MemoryRouter>
        <NotFound 
          title='Test title' 
          message='Test message' 
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/test title/i)).toBeInTheDocument();
  });
});