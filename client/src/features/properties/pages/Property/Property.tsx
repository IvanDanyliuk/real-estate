import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Grid2, Stack, Typography, useMediaQuery } from '@mui/material';
import { AccessTime, AddBoxSharp, CalendarMonth, CropSquare, MapsHomeWork, MeetingRoom, Place } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetPropertyByIdQuery } from '../../state/propertyApi';
import { Container } from '../../../../components/layout/Container/Container';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { NotFound } from '../../../../components/layout/NotFound/NotFound';
import { getDaysFromDate } from '../../../../utils/helpers';
import { styles } from './styles';
import 'react-image-gallery/styles/css/image-gallery.css';


const PropertyPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetPropertyByIdQuery(id);
  const isMobile = useMediaQuery('(max-width:599px)');

  const [diffDays, setDiffDays] = useState<number>(0);

  useEffect(() => {
    if(isSuccess) {
      const value = getDaysFromDate(data.createdAt);
      setDiffDays(value);
    }
  }, [isLoading, isSuccess]);

  if(isLoading) {
    return (
      <Loader />
    );
  }

  if(isError) {
    return (
      <NotFound title='Property not found' />
    );
  }

  return (
    <Container>
      <Box sx={styles.header}>
        <Typography variant='h1'>
          {t(data.title)}
        </Typography>
        <Box sx={styles.headerSubInfo}>
          <Typography>
            <Place />
            {data.location.address}
          </Typography>
          <Typography>
            <AccessTime />
            {
              diffDays === 0 
                ? t('constants.diffDays.today') 
                : diffDays === 1 
                  ? t('constants.diffDays.yesterday') 
                  : `${diffDays} ${t('constants.diffDays.days_ago')}`
            }
          </Typography>
        </Box>
        <Box sx={styles.headerSubInfo}>
          <Typography sx={styles.price}>
            {`$${data.price}`}
          </Typography>
          <Typography sx={styles.price}>
            {`${Math.round(data.price / data.overview.area)} / m2`}
          </Typography>
        </Box>
      </Box>
      <Box sx={styles.images}>
        <Grid2 
          container 
          spacing={1} 
          sx={styles.gallery}
        >
          <Grid2 
            size={isMobile ? 12 : 8} 
            sx={styles.column}
          >
            <Box sx={styles.mainImageItem}>
              <img 
                src={data.images[0]} 
                alt='main_image' 
              />
            </Box>
          </Grid2>
          <Grid2 
            size={isMobile ? 12 : 4} 
            sx={styles.column}
          >
            <Stack 
              spacing={1} 
              sx={styles.stack}
            >
              {data.images.slice(1, 4).map((item: string, i: number) => (
                <Box 
                  key={`image_items_${i + 1}`} 
                  sx={styles.imageItem}
                >
                  <img src={item} alt={`image_${i + 1}`} />
                  {(i === 3 || i === data.images.length - 2) && (
                    <Box sx={styles.link}>
                      <Button>
                        See all images
                      </Button>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Grid2>
        </Grid2>
      </Box>
      <Grid2 container spacing={2} sx={styles.content}>
        <Grid2 size={isMobile ? 12 : 8}>
          <Stack spacing={2}>
            <Box sx={styles.descriptionItem}>
              <Typography variant='h4'>
                Description
              </Typography>
              <Typography>
                {data.description}
              </Typography>
            </Box>
            <Box sx={styles.descriptionItem}>
              <Typography variant='h4'>
                Overview
              </Typography>
              <Box sx={styles.overview}>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <MeetingRoom />
                  </Box>
                  <Box>
                    <Typography>
                      {t('roomsNumber')}
                    </Typography>
                    <Typography>
                      {data.overview.roomsNumber}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <CalendarMonth />
                  </Box>
                  <Box>
                    <Typography>
                      {t('yearBuilt')}
                    </Typography>
                    <Typography>
                      {data.overview.yearBuilt}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <MapsHomeWork />
                  </Box>
                  <Box>
                    <Typography>
                      {t('propertyType')}
                    </Typography>
                    <Typography>
                      {data.overview.propertyType}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <CropSquare />
                  </Box>
                  <Box>
                    <Typography>
                      {t('area')}
                    </Typography>
                    <Typography>
                      {data.overview.area}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={styles.nearbyAmenities}>
              <Typography variant='h4'>
                Nearby amenities
              </Typography>
              <Box component='ul' sx={styles.nearbyAmenitiesList}>
                {data.nearbyAmenities.map((item: any, i: number) => (
                  <Box 
                    key={`nearby_amenity_${i + 1}`} 
                    component='li'
                  >
                    <Typography>
                      {t(item.object)}
                    </Typography>
                    <Typography>
                      {`${t(item.distanceTo)} m`}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={styles.location}>
              <Typography variant='h4'>
                Location
              </Typography>
              <AddBoxSharp sx={styles.location}>
                
              </AddBoxSharp>
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={isMobile ? 12 : 4}>

        </Grid2>
      </Grid2>
    </Container>
  );
};

export default PropertyPage;