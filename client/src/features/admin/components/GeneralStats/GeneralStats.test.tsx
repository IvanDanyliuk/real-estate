import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { GeneralStats } from './GeneralStats';

describe('GeneralStats Component', () => {
  const props = {
    propertiesCount: 123,
    topPropertiesCountRegion: 'Kyiv',
    averageBuyingPrices: {
      primary: 1000,
      secondary: 800,
    },
    averageRentPrice: 500,
  };

  beforeEach(() => {
    render(<GeneralStats {...props} />);
  });

  it('displays the total properties count', () => {
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.totalProperties')).toBeInTheDocument();
    expect(screen.getByText(props.propertiesCount.toString())).toBeInTheDocument();
  });

  it('displays the top region', () => {
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.topRegion')).toBeInTheDocument();
    expect(screen.getByText(`constants.regions.${props.topPropertiesCountRegion}`)).toBeInTheDocument();
  });

  it('displays the average buying prices', () => {
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.averageSellPrice.title')).toBeInTheDocument();
    expect(screen.getByText(props.averageBuyingPrices.primary.toString())).toBeInTheDocument();
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.averageSellPrice.primary')).toBeInTheDocument();

    expect(screen.getByText(props.averageBuyingPrices.secondary.toString())).toBeInTheDocument();
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.averageSellPrice.secondary')).toBeInTheDocument();
  });

  it('displays the average rent price', () => {
    expect(screen.getByText('admin_dashboard.analytics_page.sections.general.averageRentPrice')).toBeInTheDocument();
    expect(screen.getByText(props.averageRentPrice.toString())).toBeInTheDocument();
  });
});