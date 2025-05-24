import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { SearchBox } from '../../features/properties/components/SearchBox/SearchBox';
import { PropertyTypesList } from '../../features/properties/components/PropertyTypesList/PropertyTypesList';
import { PropertyLocations } from '../../features/properties/components/PropertyLocations/PropertyLocations';
import { StyleProps } from '../../components/types';
import videoBg from '../../assets/video/hero-bg.mp4';
import Arrow from '@mui/icons-material/East';
import { useLazyGetPopularPropertiesQuery, useUpdatePropertyMutation } from '../../features/properties/state/propertyApi';
import { styles } from './styles';
import { PropertyList } from '../../features/properties/components/PropertyList/PropertyList';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useCallback, useEffect } from 'react';
import { useUpdateUserMutation } from '../../features/users/state/userApi';
import { PropertyType } from '../../features/properties/state/types';


const HomePage = () => {
  const { t } = useTranslation();

  const [ getProperties, { data, isSuccess: isGetPropertiesSuccess } ] = useLazyGetPopularPropertiesQuery();
  const [updateExistingProperty, { isSuccess: isUpdatePropertySuccess }] = useUpdatePropertyMutation();
  const [updateUser, { isSuccess: isUpdateUserSuccess }] = useUpdateUserMutation();
  
  const { user } = useAppSelector(state => state.user)
  
  const handleLikeProperty = useCallback(async (property: PropertyType) => {
    if(user) {
      const isPropertyLiked = user.likedProperties.find(propertyId => propertyId === property._id);
      if(isPropertyLiked) {
        await updateExistingProperty({
          ...property,
          location: JSON.stringify(property.location),
          overview: JSON.stringify(property.overview),
          nearbyAmenities: JSON.stringify(property.nearbyAmenities),
          likes: property.likes.filter((userId: string) => userId !== user._id)
        });
        const updatedLikeProperties = user.likedProperties.filter(propertyId => propertyId !== property._id);
        await updateUser({
          ...user,
          likedProperties: updatedLikeProperties
        })
      } else {
        console.log({
          updatedProperty: {
            ...property,
            likes: [...property.likes, user._id]
          },
          updatedUser: {
            ...user,
            likedProperties: [...user.likedProperties, property._id]
          }
        })
        await updateExistingProperty({
          ...property,
          location: JSON.stringify(property.location),
          overview: JSON.stringify(property.overview),
          nearbyAmenities: JSON.stringify(property.nearbyAmenities),
          likes: [...property.likes, user._id]
        });
        await updateUser({
          ...user,
          likedProperties: [...user.likedProperties, property._id]
        })
      }
    }
  }, []);

  useEffect(() => {
    getProperties({ limit: 8 });
  }, [getProperties, isUpdatePropertySuccess, isUpdateUserSuccess]);

  return (
    <Box>
      <Box component='section' sx={styles.hero}>
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            zIndex: -2, 
          }}
        >
          <source src={videoBg} type='video/mp4' />
        </video>
        <Container maxWidth='lg' sx={styles.heroContainer}>
          <Box sx={styles.introduction}>
            <Typography variant='h3'>
              {t('pages.home.hero.introduction.subTitle')}
            </Typography>
            <Typography variant='h1'>
              {t('pages.home.hero.introduction.mainTitle')}
              <Typography variant='caption'>
                {t('pages.home.hero.introduction.mainTitleCaption')}
              </Typography>
            </Typography>
            <Typography variant='body1'>
              {t('pages.home.hero.introduction.text')}
            </Typography>
            <Link to='/property'>
              {t('pages.home.hero.introduction.linkMain')}
              <Typography variant='caption'>
                {t('pages.home.hero.introduction.linkCaption')}
              </Typography>
            </Link>
          </Box>
          <SearchBox />
        </Container>
      </Box>
      <Box component='section'>
        <Container maxWidth='lg' sx={styles.commonContainer}>
          <Box sx={
            {
              ...styles.sectionHeading, 
              ...styles.sectionHeadingCenterred
            } as StyleProps
          }>
            <Typography variant='h3'>
              {t('pages.home.propertyTypes.subHeading')}
            </Typography>
            <Typography variant='h2'>
              {t('pages.home.propertyTypes.heading')}
              <Typography variant='caption'>
                {t('pages.home.propertyTypes.headingCaption')}
              </Typography>
            </Typography>
          </Box>
          <PropertyTypesList />
        </Container>
      </Box>
      <Box component='section' sx={styles.popularPropertiesSection}>
        <Container maxWidth='lg' sx={styles.commonContainer}>
          <Box sx={styles.popularPropertiesHeadingContainer}>
            <Box sx={styles.sectionHeading}>
              <Typography variant='h3'>
                {t('pages.home.popularProperties.subHeading')}
              </Typography>
              <Typography variant='h2'>
                {t('pages.home.popularProperties.heading')}
                <Typography variant='caption'>
                  {t('pages.home.popularProperties.headingCaption')}
                </Typography>
              </Typography>
            </Box>
            <Link to='/property'>
              <Box sx={styles.viewAllLink}>
                <Typography>
                  {t('pages.home.popularProperties.link')}
                </Typography>
                <Arrow />
              </Box>
            </Link>
          </Box>
          {isGetPropertiesSuccess || isUpdatePropertySuccess ? (
            <PropertyList 
              data={data} 
              userId={user?._id}
              onLike={handleLikeProperty} 
            />
          ) : (
            <div>Loading...</div>
          )}
        </Container>
      </Box>
      <Box component='section'>
        <Container maxWidth='lg' sx={styles.commonContainer}>
          <Box sx={
            {
              ...styles.sectionHeading, 
              ...styles.sectionHeadingCenterred
            } as StyleProps
          }>
            <Typography variant='h3'>
              {t('pages.home.propertyLocations.subHeading')}
            </Typography>
            <Typography variant='h2'>
              {t('pages.home.propertyLocations.heading')}
              <Typography variant='caption'>
                {t('pages.home.propertyLocations.headingCaption')}
              </Typography>
            </Typography>
          </Box>
          <PropertyLocations />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;