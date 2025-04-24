import { Box, Card, Typography } from '@mui/material';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';


interface GeneralStatsProps {
  propertiesCount: number;
  topPropertiesCountRegion: string;
  averageBuyingPrices: {
    primary: number;
    secondary: number;
  };
  averageRentPrice: number;
};


export const GeneralStats: React.FC<GeneralStatsProps> = ({
  propertiesCount, 
  topPropertiesCountRegion, 
  averageBuyingPrices, 
  averageRentPrice
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          {t('admin_dashboard.analytics_page.sections.general.totalProperties')}
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {propertiesCount}
        </Typography>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          {t('admin_dashboard.analytics_page.sections.general.topRegion')}
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {topPropertiesCountRegion}
        </Typography>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          {t('admin_dashboard.analytics_page.sections.general.averageSellPrice.title')}
        </Typography>
        <Box sx={styles.avgPriceValues}>
          <Box sx={styles.avgPriceSubItems}>
            <Typography variant='body2' sx={styles.value}>
              {averageBuyingPrices.primary}
            </Typography>
            <Typography variant='caption'>
              {t('admin_dashboard.analytics_page.sections.general.averageSellPrice.primary')}
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={styles.value}>
              {averageBuyingPrices.secondary}
            </Typography>
            <Typography variant='caption'>
              {t('admin_dashboard.analytics_page.sections.general.averageSellPrice.secondary')}
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          {t('admin_dashboard.analytics_page.sections.general.averageRentPrice')}
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {averageRentPrice}
        </Typography>
      </Card>
    </Box>
  );
};