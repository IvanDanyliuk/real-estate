import { Box, Card, IconButton, Typography } from '@mui/material';
import { PropertyType } from '../../state/types';
import { Link } from 'react-router';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';
import PlaceIcon from '@mui/icons-material/Place';
import RoomsNumberIcon from '@mui/icons-material/MeetingRoom';
import AreaIcon from '@mui/icons-material/SelectAll';
import YearIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/StarBorder';


interface PropertyListProps {
  data: PropertyType[];
  onLike: (id: string) => void;
};


export const PropertyList: React.FC<PropertyListProps> = ({ data, onLike }) => {
  const { t } = useTranslation();

  return (
    <Box component='ul' sx={styles.container}>
      {data.map(property => (
        <Card 
          key={property._id} 
          component='li' 
          sx={styles.card}
        >
          <IconButton 
            onClick={() => onLike(property._id)} 
            sx={styles.likeBtn}
          >
            <StarIcon />
          </IconButton>
          <Link to={`/property/${property._id}`}>
            <Box sx={styles.imageContainer}>
              <img 
                src={property.images[0]} 
                alt={property.title} 
              />
            </Box>
            <Box sx={styles.description}>
              <Box sx={styles.labels}>
                <Typography>
                  {t(`constants.adTypes.${property.type}`)}
                </Typography>
                <Typography>
                  {t(`constants.propertyTypes.${property.overview.propertyType}`)}
                </Typography>
              </Box>
              <Box sx={styles.title}>
                <Typography>
                {`$${property.price}`}
                </Typography>
                <Typography variant='h6'>
                  {property.title}
                </Typography>
                <Box sx={styles.address}>
                  <PlaceIcon />
                  <Typography>
                    {property.location.address}
                  </Typography>
                </Box>
              </Box>
              <Box sx={styles.overview}>
                <Box sx={styles.overviewItem}>
                  <RoomsNumberIcon />
                  <Typography>
                    {property.overview.roomsNumber}
                  </Typography>
                </Box>
                <Box sx={styles.overviewItem}>
                  <AreaIcon />
                  <Typography>
                    {property.overview.area}
                  </Typography>
                </Box>
                <Box sx={styles.overviewItem}>
                  <YearIcon />
                  <Typography>
                    {property.overview.yearBuilt}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Link>
        </Card>
      ))}
    </Box>
  );
};