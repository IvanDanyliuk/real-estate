import { NavLink } from 'react-router';
import { Box } from '@mui/material';
import { NAV_LINKS } from '../../../constants/navLinks';
import { styles } from './styles';

export const Navbar: React.FC = () => {
  return (
    <Box component='nav'>
      <Box component='ul' sx={styles.navList}>
        {NAV_LINKS.map(link => (
          <NavLink key={crypto.randomUUID()} to={link.href}>
            {link.label}
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};