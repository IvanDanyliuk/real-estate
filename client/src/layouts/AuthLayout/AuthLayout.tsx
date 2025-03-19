import { NavLink, Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Logo } from '../../components/layout/Logo/Logo';
import { styles } from './styles';

const AuthLayout = () => {
  return (
    <Box sx={styles.component}>
      <Box component='header' sx={styles.header}>
        <NavLink to='/'>
          <Logo />
        </NavLink>
      </Box>
      <Box component='main' sx={styles.main}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;