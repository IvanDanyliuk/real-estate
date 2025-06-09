import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import LikedPropertiesPage from './LikedProperties';
import * as dispatchHook from '../../../../hooks/useAppDispatch';
import * as selectorHook from '../../../../hooks/useAppSelector';
import * as router from 'react-router-dom';
import * as propertyApi from '../../../properties/state/propertyApi';
import * as userApi from '../../state/userApi';
import { renderWithProviders } from '../../../../config/tests/renderWithProvider';


vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader">Loader</div>,
}));
vi.mock('../../../../components/layout/ListPagination/ListPagination', () => ({
  ListPagination: () => <div data-testid="pagination">Pagination</div>,
}));
vi.mock('../../../properties/components/PropertyList/PropertyList', () => ({
  PropertyList: ({ onLike, data }: any) => (
    <div data-testid="property-list" onClick={() => onLike(data[0])}>
      PropertyList
    </div>
  ),
}));


describe('LikedPropertiesPage', () => {
  const mockDispatch = vi.fn();

  const mockUser = {
    _id: 'user1',
    likedProperties: [],
  };

  const fakeProperty = {
    _id: '1',
    title: 'Test Property',
    images: ['img.jpg'],
    price: 1000,
    location: { address: '123 Street' },
    overview: {
      roomsNumber: 2,
      area: 100,
      yearBuilt: 2000,
      propertyType: 'apartment',
    },
    nearbyAmenities: {},
    likes: [],
    type: 'sell',
  };

  beforeEach(() => {
    vi.spyOn(dispatchHook, 'useAppDispatch').mockReturnValue(mockDispatch);

    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
      return {
        ...actual,
        useSearchParams: () => [
          new URLSearchParams(),
          vi.fn(),
        ],
      };
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loader when user is null', () => {
    vi.spyOn(selectorHook, 'useAppSelector').mockReturnValue({ user: null });

    renderWithProviders(<LikedPropertiesPage />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('fetches liked properties when user is present', async () => {
    vi.spyOn(selectorHook, 'useAppSelector').mockReturnValue({ user: mockUser });

    const getLikedProperties = vi.fn();
    vi.spyOn(propertyApi, 'useLazyGetLikedPropertiesQuery').mockReturnValue([
      getLikedProperties,
      { data: { properties: [], count: 0 }, isSuccess: true },
    ] as any);

    vi.spyOn(userApi, 'useUpdateUserMutation').mockReturnValue([
      vi.fn(),
      { isSuccess: false },
    ] as any);

    vi.spyOn(propertyApi, 'useUpdatePropertyMutation').mockReturnValue([
      vi.fn(),
      { isSuccess: false },
    ] as any);

    render(<LikedPropertiesPage />);

    await waitFor(() =>
      expect(getLikedProperties).toHaveBeenCalledWith({
        page: 1,
        itemsPerPage: 8,
        userId: 'user1',
      })
    );
  });

  it('renders PropertyList and ListPagination when data is available', () => {
    vi.spyOn(selectorHook, 'useAppSelector').mockReturnValue({ user: mockUser });

    vi.spyOn(propertyApi, 'useLazyGetLikedPropertiesQuery').mockReturnValue([
      vi.fn(),
      {
        data: { properties: [fakeProperty], count: 1 },
        isSuccess: true,
      },
    ] as any);

    vi.spyOn(userApi, 'useUpdateUserMutation').mockReturnValue([
      vi.fn(),
      { isSuccess: false },
    ] as any);

    vi.spyOn(propertyApi, 'useUpdatePropertyMutation').mockReturnValue([
      vi.fn(),
      { isSuccess: false },
    ] as any);

    render(<LikedPropertiesPage />);
    expect(screen.getByTestId('property-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('handles liking a property', async () => {
    const updateProperty = vi.fn().mockResolvedValue({});
    const updateUser = vi.fn().mockResolvedValue({
      data: { payload: { ...mockUser, likedProperties: ['1'] } },
    });

    vi.spyOn(selectorHook, 'useAppSelector').mockReturnValue({ user: mockUser });

    vi.spyOn(propertyApi, 'useLazyGetLikedPropertiesQuery').mockReturnValue([
      vi.fn(),
      { data: { properties: [fakeProperty], count: 1 }, isSuccess: true },
    ] as any);

    vi.spyOn(propertyApi, 'useUpdatePropertyMutation').mockReturnValue([
      updateProperty,
      { isSuccess: true },
    ] as any);

    vi.spyOn(userApi, 'useUpdateUserMutation').mockReturnValue([
      updateUser,
      { isSuccess: true },
    ] as any);

    render(<LikedPropertiesPage />);

    await userEvent.click(screen.getByTestId('property-list'));

    await waitFor(() => {
      expect(updateProperty).toHaveBeenCalled();
      expect(updateUser).toHaveBeenCalled();
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'user/setUser',
        payload: { ...mockUser, likedProperties: ['1'] },
      });
    });
  });
});