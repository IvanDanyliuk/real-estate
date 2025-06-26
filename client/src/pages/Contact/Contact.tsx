import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Container } from '../../components/layout/Container/Container';
import { SocialMediaLinks } from '../../components/layout/SocialMediaLinks/SocialMediaLinks';
import { styles } from './styles';


const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <Container contentStyles={styles.container}>
      <Typography variant='h1'>
        {t('pages.contacts.mainHeading')}
      </Typography>
      <Typography>
        {t('pages.contacts.subHeading')}
      </Typography>
      <SocialMediaLinks />
    </Container>
  );
};

export default ContactPage;