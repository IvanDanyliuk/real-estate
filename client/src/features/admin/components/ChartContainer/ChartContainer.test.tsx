import { render, screen, fireEvent } from '@testing-library/react';
import { ChartContainer } from './ChartContainer';
import '@testing-library/jest-dom';
import { SelectChangeEvent } from '@mui/material';
import { vi } from 'vitest';


vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));


describe('ChartContainer', () => {
  const mockOptions = [
    { label: 'option1.label', value: 'option1' },
    { label: 'option2.label', value: 'option2' },
  ];

  it('renders the title and children', () => {
    render(
      <ChartContainer
        title="Test Chart"
        controlOptions={mockOptions}
        defaultValue="option1"
        onChange={() => {}}
      >
        <div>Child Content</div>
      </ChartContainer>
    );

    expect(screen.getByRole('heading', { name: /test chart/i })).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders all select options', () => {
    render(
      <ChartContainer
        title="Chart"
        controlOptions={mockOptions}
        defaultValue="option1"
        onChange={() => {}}
      >
        <div />
      </ChartContainer>
    );

    fireEvent.mouseDown(screen.getByRole('combobox'));
    expect(screen.getAllByText('option1.label')).toHaveLength(2);
    expect(screen.getByText('option2.label')).toBeInTheDocument();
  });
});