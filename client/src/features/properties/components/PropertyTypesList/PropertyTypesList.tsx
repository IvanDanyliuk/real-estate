import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next'
import { Box, Card, SvgIcon, Typography } from '@mui/material'
import { PROPERTY_TYPES } from '../../../../constants/main'
import { styles } from './styles';


export const PropertyTypesList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setPropertySearchParams = (type: string) => {
    navigate(`/property?propertyType=${type}`);
  };

  return (
    <Box component='ul' sx={styles.container}>
      {PROPERTY_TYPES.map(({ value, label, icon }) => (
        <Box 
          key={value} 
          component='li' 
          sx={styles.listItem}
        >
          <Card 
            variant='outlined' 
            onClick={() => setPropertySearchParams(value)} 
            sx={styles.card}
          >
            <Box sx={styles.icon}>
              <SvgIcon component={icon} />
            </Box>
            <Box sx={styles.title}>
              <Typography variant='h6'>
                {t(label)}
              </Typography>
              <Typography variant='body1'>
                1720 properties
              </Typography>
            </Box>
          </Card>
        </Box>
      ))}
    </Box>
  );
};