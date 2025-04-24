import { useEffect, useState } from 'react';
import { useGetGeneralStatsQuery, useLazyGetMonthlyAveragePriceStatsQuery, useLazyGetMonthlyPropertyStatsQuery, useLazyGetPropertyStatsByRegionQuery } from '../../../properties/state/propertyApi';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { GeneralStats } from '../../components/GeneralStats/GeneralStats';
import { SectionSkeleton } from '../../skeletons/SectionSkeleton/SectionSkeleton';
import { Box } from '@mui/material';
import { styles } from './styles';
import { BarChart } from '../../components/charts/BarChart/BarChart';
import { MONTHS } from '../../../../constants/main';
import { useTranslation } from 'react-i18next';


enum AdType {
  ForSale = 'for_sale',
  ForRent = 'for_rent'
};

type ChartDataParams = {
  name: string,
  primary: number,
  secondary: number
}


const DashboardPage = () => {
  const { t } = useTranslation();
  const [addedPropertiesChartFilterValue, setAddedPropertiesChartFilterValue] = useState<string>(AdType.ForSale);
  const [addedPropertiesByRegionChartFilterValue, setAddedPropertiesByRegionChartFilterValue] = useState<string>(AdType.ForSale);
  const [priceDynamicRegionChartFilterValue, setPriceDynamicRegionChartFilterValue] = useState<string>('All');

  const year = new Date().getFullYear();

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
    <AdminPageContainer heading='Dashboard'>
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
          <BarChart 
            data={monthlyPropertyStats} 
            nameExtractor={(item) => t(MONTHS[item._id - 1])} 
            value1='primaryCount' 
            value2='secondaryCount' 
          />
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
        {isGetPropertyStatsByRegion ? (
          <BarChart 
            data={propertyStatsByRegion} 
            nameExtractor={(item) => t(`constants.regions.${item._id}`)} 
            value1='primaryCount' 
            value2='secondaryCount' 
          />
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
        {isGetMonthlyAveragePriceStatsSuccess ? (
          <div>{JSON.stringify(monthlyAveragePriceStats)}</div>
        ) : (
          <SectionSkeleton numberOfItems={1} />
        )}
      </Box>
    </AdminPageContainer>
  );
};

export default DashboardPage;