import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PropertyPage from './Property';
import { useGetPropertyByIdQuery } from '../../state/propertyApi';


vi.mock('../../state/propertyApi', () => ({
  useGetPropertyByIdQuery: vi.fn(),
}));

vi.mock('../../components/PropertyLocationMap/PropertyLocationMap', () => ({
  PropertyLocationMap: ({ coords }: { coords: number[] }) => (
    <div data-testid="property-map">{`Map: [${coords.join(', ')}]`}</div>
  ),
}));

vi.mock('../../components/PropertyGallery/PropertyGallery', () => ({
  PropertyGallery: ({ data }: { data: string[] }) => (
    <div data-testid="property-gallery">{`Gallery: ${data.length} images`}</div>
  ),
}));

vi.mock('../../../../components/layout/Loader/Loader', () => ({
  Loader: () => <div data-testid="loader" />,
}));

vi.mock('../../../../components/layout/NotFound/NotFound', () => ({
  NotFound: ({ title }: { title: string }) => <div data-testid="not-found">{title}</div>,
}));

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


describe('PropertyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRoute = () =>
    render(
      <MemoryRouter initialEntries={['/property/123']}>
        <Routes>
          <Route path='/property/:id' element={<PropertyPage />} />
        </Routes>
      </MemoryRouter>
    );

  it('shows loader when loading', () => {
    (useGetPropertyByIdQuery as any).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    renderWithRoute();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows not found page on error', () => {
    (useGetPropertyByIdQuery as any).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      isSuccess: false,
    });

    renderWithRoute();
    expect(screen.getByTestId('not-found')).toHaveTextContent(
      'pages.property.errors.notFound'
    );
  });

  it('renders property details correctly', () => {
    const mockData = {
      title: 'Test Property',
      createdAt: new Date().toISOString(),
      location: {
        address: '123 Test St',
        mapCoords: [50.45, 30.52],
      },
      price: 100000,
      description: 'Nice place',
      overview: {
        roomsNumber: 3,
        yearBuilt: 2000,
        propertyType: 'flat',
        area: 100,
      },
      images: ['main.jpg', 'second.jpg', 'third.jpg'],
      nearbyAmenities: [
        { object: 'school', distanceTo: 200 },
        { object: 'store', distanceTo: 100 },
      ],
      author: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+123456789',
        profilePhoto: 'avatar.jpg',
      },
    };

    (useGetPropertyByIdQuery as any).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    renderWithRoute();

    expect(screen.getByText('Test Property')).toBeInTheDocument();
    expect(screen.getByText('123 Test St')).toBeInTheDocument();
    expect(screen.getByText('$100000')).toBeInTheDocument();
    expect(screen.getByText('(1000 / m2)')).toBeInTheDocument();
    expect(screen.getByText('Nice place')).toBeInTheDocument();

    expect(screen.getByText('pages.property.overview.options.roomsNumber')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('school')).toBeInTheDocument();
    expect(screen.getByText('200 m')).toBeInTheDocument();
    expect(screen.getByText('store')).toBeInTheDocument();
    expect(screen.getByText('100 m')).toBeInTheDocument();

    expect(screen.getByTestId('property-map')).toHaveTextContent('50.45, 30.52');
    expect(screen.getByTestId('property-gallery')).toBeInTheDocument();

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('+123456789')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });
});