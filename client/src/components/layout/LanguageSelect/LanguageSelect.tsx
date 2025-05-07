import { Box, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import EnIcon from '../../../assets/images/united-kingdom-flag-icon.svg';
import UaIcon from '../../../assets/images/ukraine-flag-icon.svg';
import { styles } from './styles';


export const LanguageSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLanguage = localStorage.getItem('lang');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  return (
    <Box sx={styles.container}>
      <Tooltip title='English'>
        <Box 
          component='button'
          disabled={currentLanguage === 'en'}
          onClick={() => changeLanguage('en')} 
          sx={styles.button}
        >
          <img src={EnIcon} alt='en-icon' />
        </Box>
      </Tooltip>
      <Tooltip title='Українська'>
        <Box 
          component='button'
          disabled={currentLanguage === 'ua'}
          onClick={() => changeLanguage('ua')} 
          sx={styles.button}
        >
          <img src={UaIcon} alt='ua-icon' />
        </Box>
      </Tooltip>
    </Box>
  );
};