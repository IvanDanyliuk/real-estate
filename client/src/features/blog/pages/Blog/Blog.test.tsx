import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import BlogPage from './Blog';


vi.mock('../../../../components/layout/Container/Container', () => ({
  Container: ({ children }: any) => <div data-testid="container">{children}</div>,
}));

vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock('../../../../components/layout/ListPagination/ListPagination', () => ({
  ListPagination: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('../../components/MaterialsList/MaterialsList', () => ({
  MaterialsList: ({ data }: any) => (
    <div data-testid="materials-list">
      {data.map((item: any) => (
        <div key={item._id}>{item.title}</div>
      ))}
    </div>
  ),
}));

let mockGetPosts = vi.fn();
let mockQueryState: any = {
  data: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

vi.mock('../../state/blogApi', () => ({
  useLazyGetPostsQuery: () => [mockGetPosts, mockQueryState],
}));


describe('Blog page tests', () => {
  afterEach(() => {
    vi.clearAllMocks();
    mockGetPosts = vi.fn();
    mockQueryState = {
      data: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    };
  });

  it('renders loader while loading', () => {
    mockQueryState.isLoading = true;

    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders content when successful', () => {
    mockQueryState = {
      data: {
        articles: [
          { _id: '1', title: 'Test Article 1', content: 'Content 1', images: ['img1.jpg'] },
        ],
        count: 10,
      },
      isLoading: false,
      isSuccess: true,
      isError: false,
    };

    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('materials-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
  });

  it('renders error message when request fails', () => {
    mockQueryState.isError = true;

    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Materials not found/i)).toBeInTheDocument();
  });

  it('calls getPosts on mount with default pagination', async () => {
    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockGetPosts).toHaveBeenCalledWith({ page: 1, itemsPerPage: 8 });
    });
  });
});