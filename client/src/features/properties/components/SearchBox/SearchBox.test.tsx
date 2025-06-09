import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { SearchBox } from './SearchBox';
import { REGIONS } from '../../../../constants/geoData';
import { AD_TYPE } from '../../../../constants/main';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const setup = () => {
  return render(
    <BrowserRouter>
      <SearchBox />
    </BrowserRouter>
  );
};


describe('SearchBox tests', () => {
  it('renders form with default values', () => {
    setup();

    expect(screen.getByLabelText(/region/i)).toHaveTextContent(REGIONS[2].value);
    expect(screen.getByLabelText(/city/i)).toHaveValue('Lutsk');
    expect(screen.getByLabelText(/price from/i)).toHaveValue(0);
    expect(screen.getByLabelText(/price to/i)).toHaveValue(0);
  });

  it('toggles search mode buttons correctly', () => {
    setup();

    const saleBtn = screen.getByRole('button', { name: /sale/i });
    const rentBtn = screen.getByRole('button', { name: /rent/i });

    expect(saleBtn).toBeDisabled();
    expect(rentBtn).not.toBeDisabled();

    fireEvent.click(rentBtn);
    expect(saleBtn).not.toBeDisabled();
    expect(rentBtn).toBeDisabled();
  });

  it('submits form and navigates with correct query params', async () => {
    setup();

    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Kyiv' },
    });
    fireEvent.change(screen.getByLabelText(/price from/i), {
      target: { value: '1000' },
    });
    fireEvent.change(screen.getByLabelText(/price to/i), {
      target: { value: '5000' },
    });

    fireEvent.click(screen.getByTestId('submit-search'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(expect.stringContaining('/property?'));
      const query = mockNavigate.mock.calls[0][0];
      expect(query).toContain('city=Kyiv');
      expect(query).toContain('priceFrom=1000');
      expect(query).toContain('priceTo=5000');
      expect(query).toContain(`region=${REGIONS[2].value}`);
      expect(query).toContain(`adType=${AD_TYPE.Sale}`);
    });
  });
});