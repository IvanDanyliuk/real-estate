import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MyPropertiesPage from './MyProperties'; // adjust path if default export
import * as redux from '../../../../hooks/useAppSelector';
import * as i18n from 'react-i18next';
import { setupStore } from '../../../../state/store'; // Adjust to your store setup
import * as propertyApi from '../../../properties/state/propertyApi';
import { renderWithProviders } from '../../../../config/tests/renderWithProvider';


vi.mock('react-i18next', async () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('../../../../hooks/useAppSelector', async () => ({
  useAppSelector: vi.fn(),
}));


vi.mock('../../../properties/state/propertyApi', async () => {
  return {
    useLazyGetPropertiesQuery: () => [
      vi.fn(),
      {
        data: {
          properties: [
            {
              _id: '1',
              title: 'Nice flat',
              price: 1000,
              images: ['image.jpg'],
              type: 'rent',
              market: 'Secondary',
              likes: [],
              location: {
                address: 'Kyiv',
              },
              overview: {
                roomsNumber: 2,
                area: 70,
                yearBuilt: 2020,
                propertyType: 'flat',
              },
            },
          ],
          count: 1,
        },
        isSuccess: true,
        isLoading: false,
      },
    ],
    useCreatePropertyMutation: () => [vi.fn(), { isSuccess: false }],
  };
});

describe('MyPropertiesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders skeleton if no user', () => {
    (redux.useAppSelector as any).mockReturnValue({ user: null });

    render(
      <MemoryRouter>
        <MyPropertiesPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  it('renders PropertyList and ListPagination when data is loaded', () => {
    (redux.useAppSelector as any).mockReturnValue({ user: { _id: 'user123' } });

    render(
      <MemoryRouter>
        <MyPropertiesPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Nice flat')).toBeInTheDocument();
    expect(screen.getByText('$1000')).toBeInTheDocument();
  });
});