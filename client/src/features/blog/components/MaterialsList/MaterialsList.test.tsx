import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MaterialsList } from './MaterialsList';
import { PostType } from '../../state/types';


vi.mock('react-router', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: () => false,
  };
});

const mockData: PostType[] = [
  {
    _id: '1',
    title: 'First Post',
    content: 'This is the first post',
    images: ['img1.jpg'],
    createdAt: '',
    updatedAt: ''
  },
  {
    _id: '2',
    title: 'Second Post',
    content: 'This is the second post',
    images: ['img2.jpg'],
    createdAt: '',
    updatedAt: ''
  },
];


describe('MaterialsList', () => {
  it('renders all articles from data', () => {
    render(<MaterialsList data={mockData} />);

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();

    expect(screen.getByAltText('First Post')).toHaveAttribute('src', 'img1.jpg');
    expect(screen.getByAltText('Second Post')).toHaveAttribute('src', 'img2.jpg');

    expect(screen.getByText('This is the first post')).toBeInTheDocument();
    expect(screen.getByText('This is the second post')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /first post/i })).toHaveAttribute('href', '/blog/1');
    expect(screen.getByRole('link', { name: /second post/i })).toHaveAttribute('href', '/blog/2');
  });

  it('renders no articles if data is empty', () => {
    render(<MaterialsList data={[]} />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});