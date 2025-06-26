import { useTranslation } from 'react-i18next';
import { Grid2, Stack, Typography, useMediaQuery } from '@mui/material';
import { Container } from '../../components/layout/Container/Container';
import Logo from '../../assets/images/logo_header.svg';
import { styles } from './styles';


const AboutPage = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:599px)');

  return (
    <Container contentStyles={styles.container}>
      <Typography variant='h1'>
        {t('pages.about.mainHeading')}
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={isMobile ? 12 : 8}>
          <Stack spacing={2}>
            <Typography sx={styles.contentText}>
              <Typography variant='caption'>
                2016
              </Typography>
              {t('pages.about.history.first')}
            </Typography>
            <Typography sx={styles.contentText}>
              <Typography variant='caption'>
                2024
              </Typography>
              {t('pages.about.history.second')}
            </Typography>
          </Stack>
        </Grid2>
        <Grid2 size={isMobile ? 12 : 4} sx={styles.imageContainer}>
          <img src={Logo} alt='Logo' />
        </Grid2>
      </Grid2>
      <Typography variant='h2'>
        {t('pages.about.services.heading')}
      </Typography>
      <Grid2 container spacing={5}>
        <Grid2 
          size={isMobile ? 12 : 4} 
          sx={styles.servicesListItem}
        >
          <Typography variant='h3'>
            {t('pages.about.services.consultation.heading')}
          </Typography>
          <Typography>
            {t('pages.about.services.consultation.description')}
          </Typography>
        </Grid2>
        <Grid2 
          size={isMobile ? 12 : 4} 
          sx={styles.servicesListItem}
        >
          <Typography variant='h3'>
            {t('pages.about.services.spacePlanning.heading')}
          </Typography>
          <Typography>
            {t('pages.about.services.spacePlanning.description')}
          </Typography>
        </Grid2>
        <Grid2 
          size={isMobile ? 12 : 4} 
          sx={styles.servicesListItem}
        >
          <Typography variant='h3'>
            {t('pages.about.services.projectManagement.heading')}
          </Typography>
          <Typography>
            {t('pages.about.services.projectManagement.description')}
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default AboutPage;