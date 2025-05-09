import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { NavMenuMobile } from './NavMenuMobile';


vi.mock('../MenuItems/MenuItems', () => ({
  MenuItems: ({ onClose }: { onClose?: () => void }) => (
    <button onClick={onClose} data-testid="mock-menu-items">MenuItems</button>
  ),
}));


describe('NavMenuMobile component', () => {
  it('renders menu icon button', () => {
    render(<NavMenuMobile />);
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
  });

  it('opens the drawer when menu button is clicked', () => {
    render(<NavMenuMobile />);
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    expect(screen.getByTestId('mock-menu-items')).toBeInTheDocument();
  });

  it('closes the drawer when MenuItems calls onClose', async () => {
    render(<NavMenuMobile />);
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);

    const closeButton = screen.getByTestId('mock-menu-items');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('mock-menu-items')).not.toBeInTheDocument();
    })
  });
});