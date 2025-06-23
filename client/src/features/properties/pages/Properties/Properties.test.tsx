import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import PropertiesPage from './Properties';
import { useLazyGetPropertiesQuery, useGetFiltersInitialValuesQuery } from '../../state/propertyApi';


vi.mock('../../state/propertyApi', () => ({
  useGetFiltersInitialValuesQuery: vi.fn(),
  useLazyGetPropertiesQuery: vi.fn(),
}));

vi.mock('../../components/Filters/Filters', () => ({
  Filters: () => <div data-testid="filters" />,
}));

vi.mock('../../components/Sorting/Sorting', () => ({
  Sorting: () => <div data-testid="sorting" />,
}));

vi.mock('../../components/PropertyList/PropertyList', () => ({
  PropertyList: () => <div data-testid="property-list" />,
}));

vi.mock('../../../../components/layout/ListPagination/ListPagination', () => ({
  ListPagination: () => <div data-testid="pagination" />,
}));

vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

const mockSetSearchParams = vi.fn();
vi.mock('react-router-dom', async (original) => {
  const actual = await original();
  return {
    ...actual as any,
    useSearchParams: () => [
      new URLSearchParams({
        page: '1',
        itemsPerPage: '8',
        propertyType: 'flat',
        area: '20,60',
        market: 'primary',
        location: 'kyiv',
        adType: 'rent',
        price: '10000,50000',
        orderBy: 'price',
      }),
      mockSetSearchParams,
    ],
  };
});


describe('PropertiesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loader while filters are loading', () => {
    (useGetFiltersInitialValuesQuery as any).mockReturnValue({
      data: null,
      isSuccess: false,
    });

    (useLazyGetPropertiesQuery as any).mockReturnValue([
      vi.fn(),
      { data: null, isSuccess: false },
    ]);

    render(
      <MemoryRouter>
        <PropertiesPage />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('loader').length).toBeGreaterThan(0);
  });

  it('shows Filters once filters data is loaded', async () => {
    (useGetFiltersInitialValuesQuery as any).mockReturnValue({
      data: {
        price: { min: 10000, max: 50000 },
        area: { min: 20, max: 60 },
      },
      isSuccess: true,
    });

    (useLazyGetPropertiesQuery as any).mockReturnValue([
      vi.fn(),
      { data: null, isSuccess: false },
    ]);

    render(
      <MemoryRouter>
        <PropertiesPage />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('filters')).toBeInTheDocument();
  });

  it('shows property list and pagination when data is loaded', async () => {
    (useGetFiltersInitialValuesQuery as any).mockReturnValue({
      data: {
        price: { min: 10000, max: 50000 },
        area: { min: 20, max: 60 },
      },
      isSuccess: true,
    });

    (useLazyGetPropertiesQuery as any).mockReturnValue([
      vi.fn(),
      {
        data: {
          properties: [{ id: 1 }, { id: 2 }],
          count: 2,
        },
        isSuccess: true,
      },
    ]);

    render(
      <MemoryRouter>
        <PropertiesPage />
      </MemoryRouter>
    );

    expect(await screen.findByTestId('filters')).toBeInTheDocument();
    expect(await screen.findByTestId('property-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('sorting')).toBeInTheDocument();
  });

  it('shows loader in the property list section while property data is loading', () => {
    (useGetFiltersInitialValuesQuery as any).mockReturnValue({
      data: {
        price: { min: 10000, max: 50000 },
        area: { min: 20, max: 60 },
      },
      isSuccess: true,
    });

    (useLazyGetPropertiesQuery as any).mockReturnValue([
      vi.fn(),
      { data: null, isSuccess: false },
    ]);

    render(
      <MemoryRouter>
        <PropertiesPage />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('loader').length).toBeGreaterThan(0);
  });
});