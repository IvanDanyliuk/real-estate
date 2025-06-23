import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ArticlePage from './Article';


vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '123' }),
}));

vi.mock('../../state/blogApi', () => ({
  useGetPostQuery: vi.fn(),
}));

vi.mock('../../../../hooks/useFormatDate', () => ({
  default: () => vi.fn((date) => `Formatted: ${date}`),
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' },
  }),
}));

vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../../../../components/layout/Container/Container', () => ({
  Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../../../components/ImageList/ImageList', () => ({
  ImageList: ({ imageUrls }: { imageUrls: string[] }) => (
    <div data-testid="image-list">Images: {imageUrls.length}</div>
  ),
}));

import { useGetPostQuery } from '../../state/blogApi';

describe('ArticlePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loader while loading', () => {
    (useGetPostQuery as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<ArticlePage />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render error message if there is an error', () => {
    (useGetPostQuery as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<ArticlePage />);
    expect(screen.getByText('pages.article.notFound')).toBeInTheDocument();
  });

  it('should render ImageList when multiple images are provided', () => {
    (useGetPostQuery as any).mockReturnValue({
      data: {
        images: ['img1.jpg', 'img2.jpg', 'img3.jpg'],
        title: 'Test Title',
        createdAt: '2025-06-23T10:00:00Z',
        content: 'Test content',
        _id: 'abc123',
      },
      isLoading: false,
      isError: false,
    });

    render(<ArticlePage />);
    expect(screen.getByTestId('image-list')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2025-06-23T10:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render single image when only one image is provided', () => {
    (useGetPostQuery as any).mockReturnValue({
      data: {
        images: ['single-image.jpg'],
        title: 'Single Image Title',
        createdAt: '2025-06-20T08:00:00Z',
        content: 'Single image content',
        _id: 'xyz789',
      },
      isLoading: false,
      isError: false,
    });

    render(<ArticlePage />);
    expect(screen.getByAltText('xyz789')).toHaveAttribute('src', 'single-image.jpg');
    expect(screen.getByText('Single Image Title')).toBeInTheDocument();
    expect(screen.getByText('Formatted: 2025-06-20T08:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('Single image content')).toBeInTheDocument();
  });
});