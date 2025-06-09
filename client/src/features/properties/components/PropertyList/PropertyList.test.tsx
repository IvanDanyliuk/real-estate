import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyList } from './PropertyList';
import { BrowserRouter } from 'react-router-dom';
import { PropertyType } from '../../state/types';
import { vi } from 'vitest';
import { MARKET_TYPE } from '../../../../constants/main';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

const mockProperties: PropertyType[] = [
  {
    _id: '1',
    title: 'Beautiful Apartment',
    price: 100000,
    type: 'sale',
    images: ['https://via.placeholder.com/150'],
    market: MARKET_TYPE.Secondary,
    author: 'user_id_1',
    description: 'Description',
    location: {
      region: 'Region',
      city: 'City',
      address: '123 Main St',
      mapCoords: {
        lat: 0,
        lng: 0,
      },
    },
    overview: {
      roomsNumber: 2,
      propertyType: 'apartment',
      yearBuilt: 2025,
      floor: 3,
      numberOfFloors: 10,
      area: 57,
      withRenovation: 'yes',
    },
    nearbyAmenities: [],
    likes: ['user123'],
    createdAt: '',
    updatedAt: '',
  },
];


describe('PropertyList component', () => {
  it('renders property details correctly', () => {
    renderWithRouter(<PropertyList data={mockProperties} />);
    
    expect(screen.getByText('$100000')).toBeInTheDocument();
    expect(screen.getByText('Beautiful Apartment')).toBeInTheDocument();
    expect(screen.getByText('123 Main St')).toBeInTheDocument();
    expect(screen.getByText('constants.adTypes.sale')).toBeInTheDocument();
    expect(screen.getByText('constants.propertyTypes.apartment')).toBeInTheDocument();
  });

  it('does not render like button if onLike is not provided', () => {
    renderWithRouter(<PropertyList data={mockProperties} />);
    const likeButtons = screen.queryAllByRole('button');
    expect(likeButtons.length).toBe(0);
  });

  it('renders like button if onLike is provided', () => {
    const handleLike = vi.fn();
    renderWithRouter(<PropertyList data={mockProperties} onLike={handleLike} userId="user123" />);
    const likeButton = screen.getByRole('button');
    expect(likeButton).toBeInTheDocument();
  });

  it('calls onLike when like button is clicked', () => {
    const handleLike = vi.fn();
    renderWithRouter(<PropertyList data={mockProperties} onLike={handleLike} userId="user123" />);
    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);
    expect(handleLike).toHaveBeenCalledWith(mockProperties[0]);
  });
});