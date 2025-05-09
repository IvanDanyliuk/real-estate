import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { TableActionButtons } from './TableActionButtons';


describe('TableActionButtons', () => {
  const setup = () => {
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    render(<TableActionButtons onUpdate={onUpdate} onDelete={onDelete} />);
    return { onUpdate, onDelete };
  };

  it('opens menu on icon button click', () => {
    setup();
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/update/i)).toBeVisible();
    expect(screen.getByText(/delete/i)).toBeVisible();
  });

  it('calls onUpdate and closes the menu', () => {
    const { onUpdate } = setup();
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(/update/i));
    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/update/i)).not.toBeVisible();
  });

  it('calls onDelete and closes the menu', () => {
    const { onDelete } = setup();
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(/delete/i));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/delete/i)).not.toBeVisible();
  });
});