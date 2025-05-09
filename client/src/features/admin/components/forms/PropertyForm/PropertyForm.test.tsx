import { screen, fireEvent, waitFor } from '@testing-library/react';
import { PropertyForm } from './PropertyForm';
import { vi } from 'vitest';
import { renderWithProviders } from '../../../../../config/tests/renderWithProvider';
import { MARKET_TYPE } from '../../../../../constants/main';


const initialData = {
  title: '',
  price: 0,
  market: MARKET_TYPE.Primary,
  description: '',
  location: { 
    region: '', 
    city: '', 
    address: '', 
    mapCoords: { 
      lat: 0, 
      lng: 0 
    }, 
  },
  type: '',
  overview: {
    roomsNumber: 0,
    propertyType: '',
    yearBuilt: 0,
    floor: 0,
    numberOfFloors: 0,
    area: 0,
    withRenovation: 'yes',
  },
  nearbyAmenities: [],
  images: [],
};


describe('PropertyForm', () => {
  it('renders the form fields when open is true', () => {
    renderWithProviders(
      <PropertyForm
        open={true}
        title="Add Property"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={initialData}
      />
    );

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByText(/admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.addBtnLabel/i)).toBeInTheDocument(); // Add amenity button
  });

  it('allows user to type into the title and price fields', () => {
    renderWithProviders(
      <PropertyForm
        open={true}
        title="Add Property"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={initialData}
      />
    );

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: 'New Home' } });
    expect((titleInput as HTMLInputElement).value).toBe('New Home');
  });

  it('adds an amenity and displays it', async () => {
    renderWithProviders(
      <PropertyForm
        open={true}
        title="Add Property"
        onClose={vi.fn()}
        onSubmit={vi.fn()}
        initialData={initialData}
      />
    );

    fireEvent.change(screen.getByLabelText(/admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.label1/i), { target: { value: 'School' } });
    fireEvent.change(screen.getByLabelText(/admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.label2/i), { target: { value: 500 } });

    fireEvent.click(screen.getByText(/admin_dashboard.properties_page.propertyForm.fields.nearbyAmenities.addBtnLabel/i));

    await waitFor(() => {
      expect(screen.getByText(/School - 500m/)).toBeInTheDocument();
    });
  });
});