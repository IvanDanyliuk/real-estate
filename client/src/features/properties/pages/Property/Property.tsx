import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Button, Card, Divider, Grid2, Stack, Typography, useMediaQuery } from '@mui/material';
import { AccessTime, AddBoxSharp, CalendarMonth, CropSquare, MapsHomeWork, MeetingRoom, Place } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useGetPropertyByIdQuery } from '../../state/propertyApi';
import { Container } from '../../../../components/layout/Container/Container';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { NotFound } from '../../../../components/layout/NotFound/NotFound';
import { getDaysFromDate } from '../../../../utils/helpers';
import { styles } from './styles';
import 'react-image-gallery/styles/css/image-gallery.css';
import { PropertyLocationMap } from '../../components/PropertyLocationMap/PropertyLocationMap';
import { PropertyGallery } from '../../components/PropertyGallery/PropertyGallery';


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
      <NotFound title={t('pages.property.errors.notFound')} />
    );
  }

  return (
    <Container contentStyles={styles.container}>
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
          <Typography>
            {`(${Math.round(data.price / data.overview.area)} / m2)`}
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
                      <PropertyGallery data={data.images} />
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
          <Stack spacing={4}>
            <Box sx={styles.infoItem}>
              <Typography variant='h4'>
                {t('pages.property.description.title')}
              </Typography>
              <Typography>
                {data.description}
              </Typography>
            </Box>
            <Box sx={styles.infoItem}>
              <Typography variant='h4'>
                {t('pages.property.overview.title')}
              </Typography>
              <Box sx={styles.overview}>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <MeetingRoom />
                  </Box>
                  <Box sx={styles.overviewItemInfo}>
                    <Typography>
                      {t('pages.property.overview.options.roomsNumber')}
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
                  <Box sx={styles.overviewItemInfo}>
                    <Typography>
                      {t('pages.property.overview.options.yearBuilt')}
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
                  <Box sx={styles.overviewItemInfo}>
                    <Typography>
                      {t('pages.property.overview.options.propertyType')}
                    </Typography>
                    <Typography>
                      {t(`constants.propertyTypes.${data.overview.propertyType}`)}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={styles.overviewItem}>
                  <Box sx={styles.iconContainer}>
                    <CropSquare />
                  </Box>
                  <Box sx={styles.overviewItemInfo}>
                    <Typography>
                      {t('pages.property.overview.options.area')}
                    </Typography>
                    <Typography>
                      {data.overview.area}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={styles.infoItem}>
              <Typography variant='h4'>
                {t('pages.property.nearbyAmenities.title')}
              </Typography>
              <Box component='ul' sx={styles.nearbyAmenitiesList}>
                {data.nearbyAmenities.map((item: any, i: number) => (
                  <Box 
                    key={`nearby_amenity_${i + 1}`} 
                    component='li' 
                    sx={styles.nearbyAmenitiesListItem}
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
            <Box sx={styles.infoItem}>
              <Typography variant='h4'>
                {t('pages.property.location.title')}
              </Typography>
              <Box sx={styles.location}>
                <PropertyLocationMap coords={data.location.mapCoords} />
              </Box>
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={isMobile ? 12 : 4}>
          <Card sx={styles.userInfo}>
            <Avatar 
              src={data.author.profilePhoto} 
              sx={styles.userPhoto} 
            />
            <Typography sx={styles.authorName}>
              {data.author.name}
            </Typography>
            <Typography sx={styles.authorContactInfoItem}>
              <Typography variant='caption'>
                Email:
              </Typography>
              {data.author.email}
            </Typography>
            <Typography sx={styles.authorContactInfoItem}>
              <Typography variant='caption'>
                Phone:
              </Typography>
              {data.author.phone}
            </Typography>
            <Divider sx={{ width: '100%' }} />
            <Button>
              Contact
            </Button>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default PropertyPage;