import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography } from '@mui/material';
import { SearchBox } from '../../features/properties/components/SearchBox/SearchBox';
import { PropertyTypesList } from '../../features/properties/components/PropertyTypesList/PropertyTypesList';
import videoBg from '../../assets/video/hero-bg.mp4';
import { styles } from './styles';
import { StyleProps } from '../../components/types';


const HomePage = () => {
  const { t } = useTranslation();

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
        <Container maxWidth='lg' sx={styles.propertyTypesContainer}>
          <Box sx={{...styles.sectionHeading, ...styles.sectionHeadingCenterred} as StyleProps}>
            <Typography variant='h3'>
              Property Types
            </Typography>
            <Typography variant='h2'>
              Explore 
              <Typography variant='caption'>
                Property Types
              </Typography>
            </Typography>
          </Box>
          <PropertyTypesList />
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;