import { vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PostForm } from './PostForm';
import { PostDataType } from '../validationSchemas/post.schema';
import '@testing-library/jest-dom';


describe('PostForm Component', () => {
  const mockOnClose = vi.fn();
  const mockOnSubmit = vi.fn().mockResolvedValue(undefined);

  const initialData: PostDataType = {
    title: 'Test title',
    content: 'Test content',
    images: []
  };

  const setup = () =>
    render(
      <PostForm
        open={true}
        title="Test Form"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={initialData}
      />
    );

  it('renders with initial data', () => {
    setup();
    expect(screen.getByLabelText('Title')).toHaveValue('Test title');
    expect(screen.getByLabelText('Content')).toHaveValue('Test content');
    expect(screen.getByText('Test Form')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    setup();
    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'New Title' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'New content' },
    });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    const formDataArg = mockOnSubmit.mock.calls[0][0];
    expect(formDataArg.get('title')).toBe('New Title');
    expect(formDataArg.get('content')).toBe('New content');
  });

  it('shows validation errors on empty submission', async () => {
    const emptyData = { title: '', content: '', images: [] };
    render(
      <PostForm
        open={true}
        title="Empty Submit"
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        initialData={emptyData}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(await screen.findByText(/content is required/i)).toBeInTheDocument();
  });

  it('calls onClose when dialog is closed', () => {
    setup();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});