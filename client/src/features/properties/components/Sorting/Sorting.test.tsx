import { render, screen, fireEvent } from '@testing-library/react';
import { Sorting } from './Sorting';
import { vi } from 'vitest';
import '@testing-library/jest-dom';


const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams('sort=price'), mockSetSearchParams],
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Sorting component', () => {
  it('renders all sorting options', () => {
    render(<Sorting />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(4);

    expect(options.map(o => o.textContent)).toEqual([
      'pages.properties.sortingMenu.default',
      'pages.properties.sortingMenu.price',
      'pages.properties.sortingMenu.area',
      'pages.properties.sortingMenu.roomsNumber',
    ]);
  });

  it('selects the correct default value from search params', () => {
    render(<Sorting />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveTextContent('pages.properties.sortingMenu.price');
  });

  it('updates searchParams when selecting a new value', () => {
    render(<Sorting />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const areaOption = screen.getByText('pages.properties.sortingMenu.area');
    fireEvent.click(areaOption);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('sort=price&orderBy=area')
    );
  });

  it('removes orderBy from params when selecting "default"', () => {
    render(<Sorting />);

    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    const defaultOption = screen.getByText('pages.properties.sortingMenu.default');
    fireEvent.click(defaultOption);

    expect(mockSetSearchParams).toHaveBeenCalledWith(
      new URLSearchParams('sort=price')
    );
  });
});