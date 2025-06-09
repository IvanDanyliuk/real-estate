import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyTypesList } from './PropertyTypesList';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { PROPERTY_TYPES } from '../../../../constants/main';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
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


describe('PropertyTypesList component', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  it('renders all property type cards', () => {
    renderWithRouter(<PropertyTypesList />);
    const cards = screen.getAllByRole('listitem'); // Cards are clickable
    expect(cards.length).toBe(PROPERTY_TYPES.length);
  });

  it('displays translated labels for each property type', () => {
    renderWithRouter(<PropertyTypesList />);
    PROPERTY_TYPES.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('calls navigate with correct query param on card click', () => {
    renderWithRouter(<PropertyTypesList />);
    const firstType = PROPERTY_TYPES[0];

    const card = screen.getByText(firstType.label).closest('div'); // Card is the clickable div
    expect(card).toBeTruthy();

    fireEvent.click(card!);
    expect(mockedNavigate).toHaveBeenCalledWith(`/property?propertyType=${firstType.value}`);
  });
});