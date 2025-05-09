import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { AdminPageContainer } from './AdminPageContainer';



describe('AdminPageContainer', () => {
  it('renders heading and children', () => {
    render(
      <AdminPageContainer heading="Test Heading">
        <div>Test Content</div>
      </AdminPageContainer>
    );

    expect(screen.getByRole('heading', { name: /test heading/i })).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it('does not render action button when no action is provided', () => {
    render(<AdminPageContainer heading="Heading">Children</AdminPageContainer>);

    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });

  it('renders action button and triggers callback when clicked', () => {
    const mockAction = vi.fn();

    render(
      <AdminPageContainer heading="Heading" action={mockAction}>
        Children
      </AdminPageContainer>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  it('displays custom tooltip text when provided', async () => {
    render(
      <AdminPageContainer
        heading="Heading"
        action={() => {}}
        actionBtnTooltipText="Custom Tooltip"
      >
        Children
      </AdminPageContainer>
    );

    fireEvent.mouseOver(screen.getByRole('button'));
    expect(await screen.findByText(/custom tooltip/i)).toBeInTheDocument();
  });
});