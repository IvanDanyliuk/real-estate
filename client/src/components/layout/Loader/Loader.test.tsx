import { render, screen } from '@testing-library/react'
import { Loader } from './Loader'


describe('Loader tests', () => {
  it('should render the component', () => {
    render(<Loader />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});