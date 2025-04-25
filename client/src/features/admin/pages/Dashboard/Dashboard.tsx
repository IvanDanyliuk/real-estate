import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, SelectChangeEvent } from '@mui/material';
import { 
  useGetGeneralStatsQuery, useLazyGetMonthlyAveragePriceStatsQuery, 
  useLazyGetMonthlyPropertyStatsQuery, useLazyGetPropertyStatsByRegionQuery 
} from '../../../properties/state/propertyApi';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { ChartContainer } from '../../components/ChartContainer/ChartContainer';
import { GeneralStats } from '../../components/GeneralStats/GeneralStats';
import { SectionSkeleton } from '../../skeletons/SectionSkeleton/SectionSkeleton';
import { BarChart } from '../../components/charts/BarChart/BarChart';
import { LineChart } from '../../components/charts/LineChart/LineChart';
import { fillEmptyArrayData } from '../../../../utils/helpers';
import { AD_TYPES, MONTHS } from '../../../../constants/main';
import { REGIONS } from '../../../../constants/geoData';
import { styles } from './styles';


enum AdType {
  ForSale = 'for_sale',
  ForRent = 'for_rent'
};


const DashboardPage = () => {
  const { t } = useTranslation();

  const [
    addedPropertiesChartFilterValue, setAddedPropertiesChartFilterValue
  ] = useState<string>(AdType.ForSale);

  const [
    addedPropertiesByRegionChartFilterValue, setAddedPropertiesByRegionChartFilterValue
  ] = useState<string>(AdType.ForSale);

  const [
    priceDynamicRegionChartFilterValue, setPriceDynamicRegionChartFilterValue
  ] = useState<string>('All');

  const year = new Date().getFullYear();

  const enhancedRegionsList = [
    ...REGIONS,
    {
      label: 'All',
      value: 'All',
    }
  ];

  const {
    data: generalStats, 
    isSuccess: isGetGeneralStatsSuccess 
  } = useGetGeneralStatsQuery({});

  const [
    getMonthlyPropertyStats, 
    { 
      data: monthlyPropertyStats, 
      isSuccess: isGetMonthlyPropertyStatsSuccess 
    }
  ] = useLazyGetMonthlyPropertyStatsQuery();

  const [
    getPropertyStatsByRegion, 
    { 
      data: propertyStatsByRegion, 
      isSuccess: isGetPropertyStatsByRegion 
    }
  ] = useLazyGetPropertyStatsByRegionQuery();

  const [
    getMonthlyAveragePriceStats, 
    { 
      data: monthlyAveragePriceStats, 
      isSuccess: isGetMonthlyAveragePriceStatsSuccess 
    }
  ] = useLazyGetMonthlyAveragePriceStatsQuery();

  const handleAddedPropertiesFilterChange = (e: SelectChangeEvent) => {
    setAddedPropertiesChartFilterValue(e.target.value);
  };

  const handleAddedPropertiesByRegionFilterChange = (e: SelectChangeEvent) => {
    setAddedPropertiesByRegionChartFilterValue(e.target.value);
  };

  const handlePriceDynamicFilterChange = (e: SelectChangeEvent) => {
    setPriceDynamicRegionChartFilterValue(e.target.value);
  };

  useEffect(() => {
    getMonthlyPropertyStats({ type: addedPropertiesChartFilterValue, year });
  }, [addedPropertiesChartFilterValue, getMonthlyPropertyStats]);

  useEffect(() => {
    getPropertyStatsByRegion({ type: addedPropertiesByRegionChartFilterValue, year });
  }, [addedPropertiesByRegionChartFilterValue, getPropertyStatsByRegion]);

  useEffect(() => {
    getMonthlyAveragePriceStats({ region: priceDynamicRegionChartFilterValue, year });
  }, [priceDynamicRegionChartFilterValue, getMonthlyAveragePriceStats]);

  return (
    <AdminPageContainer heading={t('admin_dashboard.analytics_page.heading')}>
      <Box sx={styles.container}>
        {isGetGeneralStatsSuccess ? (
          <GeneralStats 
            propertiesCount={generalStats.totalPropertyCount} 
            topPropertiesCountRegion={generalStats.topPropertyNumberRegion[0]._id}
            averageBuyingPrices={{
              primary: generalStats.averageBuyingPrice[0].avgPrice,
              secondary: generalStats.averageBuyingPrice[1].avgPrice,
            }}
            averageRentPrice={generalStats.averageRentPrice[0].avgPrice}
          />
        ) : (
          <SectionSkeleton numberOfItems={4} />
        )}
        {isGetMonthlyPropertyStatsSuccess ? (
          <ChartContainer 
            title={t('admin_dashboard.analytics_page.sections.addedProperties')} 
            defaultValue={addedPropertiesChartFilterValue} 
            controlOptions={AD_TYPES}
            onChange={handleAddedPropertiesFilterChange}
          >
            <BarChart 
              data={fillEmptyArrayData(monthlyPropertyStats, MONTHS)} 
              primaryKey='primaryCount' 
              secondaryKey='secondaryCount' 
            />
          </ChartContainer>
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
        {isGetPropertyStatsByRegion ? (
          <ChartContainer 
            title={t('admin_dashboard.analytics_page.sections.addedPropertiesByRegion')}  
            defaultValue={addedPropertiesByRegionChartFilterValue} 
            controlOptions={AD_TYPES}
            onChange={handleAddedPropertiesByRegionFilterChange}
          >
            <BarChart 
              data={fillEmptyArrayData(propertyStatsByRegion, REGIONS)} 
              primaryKey='primaryCount' 
              secondaryKey='secondaryCount' 
            />
          </ChartContainer>
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
        {isGetMonthlyAveragePriceStatsSuccess ? (
          <ChartContainer 
            title={t('admin_dashboard.analytics_page.sections.priceDynamics')} 
            defaultValue={priceDynamicRegionChartFilterValue} 
            controlOptions={enhancedRegionsList}
            onChange={handlePriceDynamicFilterChange}
          >
            <LineChart 
              data={fillEmptyArrayData(monthlyAveragePriceStats, MONTHS)}
              primaryKey='primaryAvgPrice'
              secondaryKey='secondaryAvgPrice'
            />
          </ChartContainer>
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
      </Box>
    </AdminPageContainer>
  );
};

export default DashboardPage;