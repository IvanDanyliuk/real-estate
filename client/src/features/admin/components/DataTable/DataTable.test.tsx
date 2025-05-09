import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';
import { DataTable } from './DataTable';


type TestItem = {
  _id: string;
  name: string;
  price: number;
};

const mockData: TestItem[] = [
  { _id: '1', name: 'Item A', price: 100 },
  { _id: '2', name: 'Item B', price: 200 },
];

const columns = [
  { key: 'name', header: 'Name', isSortable: true },
  { key: 'price', header: 'Price', isSortable: true },
];

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


describe('DataTable', () => {
  it('renders table headers and rows', () => {
    render(
      <MemoryRouter>
        <DataTable 
          data={mockData} 
          count={2} 
          columns={columns as any} 
          onDeleteItem={vi.fn()} 
        />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Item A')).toBeInTheDocument();
    expect(screen.getByText('Item B')).toBeInTheDocument();
  });

  it('calls onDeleteItem when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(
      <MemoryRouter>
        <DataTable 
          data={mockData} 
          count={2} 
          columns={columns as any} 
          onDeleteItem={onDelete} 
        />
      </MemoryRouter>
    );
    
    const deleteButton = screen.getByTestId('delete-button-1');
    await userEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith('1');
  });

  it('changes rows per page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <DataTable 
          data={mockData} 
          count={20} 
          columns={columns as any} 
          onDeleteItem={vi.fn()} 
        />
      </MemoryRouter>
    );
    
    const dropdownToggle = screen.getByLabelText(/rows per page/i);
    await user.click(dropdownToggle);

    const option = await screen.findByRole('option', { name: '15' }).catch(() => screen.findByText('15'));
    await user.click(option);

    expect(screen.getAllByText(/15/i)).toHaveLength(2);
  });

  it('handles sorting when sortable column header is clicked', () => {
    render(
      <MemoryRouter>
        <DataTable 
          data={mockData} 
          count={2} 
          columns={columns as any} 
          onDeleteItem={vi.fn()} 
        />
      </MemoryRouter>
    );
    
    const sortButton = screen.getByText('Name');
    fireEvent.click(sortButton);
    
    expect(sortButton.closest('span')).toHaveAttribute('aria-sort', 'ascending');
  });
});