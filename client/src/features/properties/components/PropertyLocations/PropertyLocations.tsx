import { Box, Card, IconButton, Typography } from '@mui/material';
import Arrow from '@mui/icons-material/ArrowForward';
import { useTranslation } from 'react-i18next';
import Kyiv from '../../../../assets/images/locations/kyiv.jpg';
import Lviv from '../../../../assets/images/locations/lviv.jpg';
import Dnipro from '../../../../assets/images/locations/dnipro.jpg';
import Kharkiv from '../../../../assets/images/locations/kharkiv.jpg';
import Odesa from '../../../../assets/images/locations/odesa.jpg';
import Uzhhorod from '../../../../assets/images/locations/uzhhorod.jpg';
import Lutsk from '../../../../assets/images/locations/lutsk.jpg';
import Vinnytsia from '../../../../assets/images/locations/vinnytsia.jpg';
import { styles } from './styles';
import { useNavigate } from 'react-router';


const locations = [
  {
    label: 'constants.cities.kyiv',
    value: 'Kyiv',
    image: Kyiv,
  },
  {
    label: 'constants.cities.lviv',
    value: 'Lviv',
    image: Lviv,
  },
  {
    label: 'constants.cities.dnipro',
    value: 'Dnipro',
    image: Dnipro,
  },
  {
    label: 'constants.cities.kharkiv',
    value: 'Kharkiv',
    image: Kharkiv,
  },
  {
    label: 'constants.cities.odesa',
    value: 'Odesa',
    image: Odesa,
  },
  {
    label: 'constants.cities.uzhhorod',
    value: 'Uzhhorod',
    image: Uzhhorod,
  },
  {
    label: 'constants.cities.lutsk',
    value: 'Lutsk',
    image: Lutsk,
  },
  {
    label: 'constants.cities.vinnytsia',
    value: 'Vinnytsia',
    image: Vinnytsia,
  },
];


export const PropertyLocations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const setLocationParams = (location: string) => {
    navigate(`/property?city=${location}`);
  };
  
  return (
    <Box component='ul' sx={styles.list}>
      {locations.map(({ label, value, image }) => (
        <Card 
          key={value} 
          component='li' 
          onClick={() => setLocationParams(value)}
          sx={{ 
            backgroundImage: `url(${image})`, 
            ...styles.listItem 
          }}
        >
          <Box sx={styles.cardInfo}>
            <Box>
              <Typography variant='h6'>
                {t(label)}
              </Typography>
              <Typography variant='body1'>
                36,556 properties
              </Typography>
            </Box>
            <IconButton>
              <Arrow />
            </IconButton>
          </Box>
        </Card>
      ))}
    </Box>
  );
};