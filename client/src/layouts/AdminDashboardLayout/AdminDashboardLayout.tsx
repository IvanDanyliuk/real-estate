import { Link, Navigate, NavLink, Outlet } from 'react-router';
import { Box, List, ListItem, SvgIcon } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { Logo } from '../../components/layout/Logo/Logo';
import { Loader } from '../../components/layout/Loader/Loader';
import { USER_ROLES } from '../../constants/main';
import { Container } from '../../components/layout/Container/Container';
import { useAppSelector } from '../../hooks/useAppSelector';
import { styles } from './styles';
import { ADMIN_DASHBOARD_NAV_LINKS } from '../../constants/navLinks';

const AdminDashboardLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  if(!user) {
    return <Loader />
  }

  if(user && user.role !== USER_ROLES.Admin) {
    return <Navigate to='/login' replace />
  }

  return (
    <Box sx={styles.component}>
      <Container 
        wrapperStyles={styles.header} 
        contentStyles={styles.headerContainer}
      >
        <Logo />
        <Link to='/'>
          <ArrowBack />
          Go back
        </Link>
      </Container>
      <Container contentStyles={styles.mainContainer}>
        <Box component='nav'>
          <List sx={styles.navList}>
            {ADMIN_DASHBOARD_NAV_LINKS.map(({ href, label, icon }) => (
              <ListItem 
                key={crypto.randomUUID()} 
                sx={styles.navListItem}
              >
                <NavLink 
                  to={href} 
                  end={href === ADMIN_DASHBOARD_NAV_LINKS[0].href}
                >
                  <SvgIcon component={icon} />
                  {label}
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box 
          component='main' 
          sx={styles.contenSection}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboardLayout;