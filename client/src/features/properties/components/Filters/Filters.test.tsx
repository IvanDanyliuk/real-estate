import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Filters } from './Filters';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import * as reactRouterDom from 'react-router-dom';
import * as mui from '@mui/material';
import * as i18n from 'react-i18next';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockSetSearchParams = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams(), mockSetSearchParams],
  };
});

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof import('@mui/material')>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn().mockReturnValue(false),
  };
});

describe('Filters Component', () => {
  const initialValues = {
    price: { min: 0, max: 200000 },
    area: { min: 0, max: 1000 }
  };

  const renderComponent = () => render(
    <BrowserRouter>
      <Filters initialValues={initialValues} />
    </BrowserRouter>
  );

  it('renders all filter sections', () => {
    renderComponent();
    expect(screen.getByText('pages.properties.filters.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.location.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.propertyType.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.marketType.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.adType.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.price.title')).toBeInTheDocument();
    expect(screen.getByText('pages.properties.filters.sections.area.title')).toBeInTheDocument();
  });

  it('calls setSearchParams when a checkbox is toggled', async () => {
    renderComponent();

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalled();
    });
  });

  it('resets filters on clear button click', async () => {
    renderComponent();

    const clearButton = screen.getByText(/Clear filters/i);
    fireEvent.click(clearButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(new URLSearchParams());
    });
  });
});