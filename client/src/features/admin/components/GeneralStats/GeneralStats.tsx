import { Box, Card, Typography } from '@mui/material';
import { styles } from './styles';


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
  return (
    <Box sx={styles.container}>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          Total properties added
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {propertiesCount}
        </Typography>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          Region that has the largest amount of properties
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {topPropertiesCountRegion}
        </Typography>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          Average price for 1 sqrt.m
        </Typography>
        <Box sx={styles.avgPriceValues}>
          <Box sx={styles.avgPriceSubItems}>
            <Typography variant='body2' sx={styles.value}>
              {averageBuyingPrices.primary}
            </Typography>
            <Typography variant='caption'>
              Primary market
            </Typography>
          </Box>
          <Box>
            <Typography variant='body2' sx={styles.value}>
              {averageBuyingPrices.secondary}
            </Typography>
            <Typography variant='caption'>
              Secondary market
            </Typography>
          </Box>
        </Box>
      </Card>
      <Card sx={styles.item}>
        <Typography variant='body1' sx={styles.label}>
          Average rent price
        </Typography>
        <Typography variant='body2' sx={styles.value}>
          {averageRentPrice}
        </Typography>
      </Card>
    </Box>
  );
};