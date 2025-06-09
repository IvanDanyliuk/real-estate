import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyLocations } from './PropertyLocations';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Just return the key
  }),
}));


const mockedNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('PropertyLocations component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders all location cards', () => {
    renderWithRouter(<PropertyLocations />);
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(8);
  });

  it('displays translated labels', () => {
    renderWithRouter(<PropertyLocations />);
    expect(screen.getByText('constants.cities.kyiv')).toBeInTheDocument();
    expect(screen.getByText('constants.cities.lviv')).toBeInTheDocument();
  });

  it('calls navigate with correct city on card click', () => {
    renderWithRouter(<PropertyLocations />);
    const kyivCard = screen.getByText('constants.cities.kyiv').closest('li');
    expect(kyivCard).toBeTruthy();

    fireEvent.click(kyivCard!);
    expect(mockedNavigate).toHaveBeenCalledWith('/property?city=Kyiv');
  });
});