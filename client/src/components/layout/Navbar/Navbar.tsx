import { NavLink } from 'react-router';
import { Box } from '@mui/material';
import { NAV_LINKS } from '../../../constants/navLinks';
import { styles } from './styles';

export const Navbar: React.FC = () => {
  return (
    <Box component='nav'>
      <Box component='ul' sx={styles.navList}>
        {NAV_LINKS.map(({ href, label }) => (
          <Box 
            key={crypto.randomUUID()} 
            component='li' 
            sx={styles.navListItem}
          >
            <NavLink to={href}>
              {label}
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};