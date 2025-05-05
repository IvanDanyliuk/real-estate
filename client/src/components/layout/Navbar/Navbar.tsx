import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { NAV_LINKS } from '../../../constants/navLinks';
import { styles } from './styles';

export const Navbar: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box component='nav'>
      <Box component='ul' sx={styles.navList}>
        {NAV_LINKS.map(({ href, label }, i) => (
          <Box 
            key={`${href}-${i}`} 
            component='li' 
            sx={styles.navListItem}
          >
            <NavLink to={href}>
              {t(label)}
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};