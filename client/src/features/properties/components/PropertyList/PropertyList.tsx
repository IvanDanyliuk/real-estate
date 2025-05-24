import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Place, MeetingRoom, SelectAll, CalendarMonth, StarBorder } from '@mui/icons-material';
import { PropertyType } from '../../state/types';
import { styles } from './styles';



interface PropertyListProps {
  data: PropertyType[];
  userId?: string;
  onLike: (property: PropertyType) => void;
};


export const PropertyList: React.FC<PropertyListProps> = ({ data, userId, onLike }) => {
  const { t } = useTranslation();

  return (
    <Box component='ul' sx={styles.container}>
      {data.map(property => (
        <Card 
          key={`property_${property._id}`} 
          component='li' 
          sx={styles.card}
        >
          <IconButton 
            onClick={() => onLike(property)} 
            sx={{
              ...styles.likeBtn, 
              backgroundColor: userId && property.likes.includes(userId) ? 
                'primary.main' : 
                'primary.light', 
              color: userId && property.likes.includes(userId) ? 
                'primary.light' : 
                'primary.main',
            }}
          >
            <StarBorder />
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
                  <Place />
                  <Typography>
                    {property.location.address}
                  </Typography>
                </Box>
              </Box>
              <Box sx={styles.overview}>
                <Box sx={styles.overviewItem}>
                  <MeetingRoom />
                  <Typography>
                    {property.overview.roomsNumber}
                  </Typography>
                </Box>
                <Box sx={styles.overviewItem}>
                  <SelectAll />
                  <Typography>
                    {property.overview.area}
                  </Typography>
                </Box>
                <Box sx={styles.overviewItem}>
                  <CalendarMonth />
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