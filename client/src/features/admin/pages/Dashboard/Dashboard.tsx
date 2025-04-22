import { useGetGeneralStatsQuery, useLazyGetMonthlyAveragePriceStatsQuery, useLazyGetMonthlyPropertyStatsQuery, useLazyGetPropertyStatsByRegionQuery } from '../../../properties/state/propertyApi';
import { AdminPageContainer } from '../../components/AdminPageContainer/AdminPageContainer';
import { GeneralStats } from '../../components/GeneralStats/GeneralStats';
import { SectionSkeleton } from '../../skeletons/SectionSkeleton/SectionSkeleton';

const DashboardPage = () => {
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

  return (
    <AdminPageContainer heading='Dashboard'>
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
    </AdminPageContainer>
  );
};

export default DashboardPage;