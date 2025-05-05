import { Link, Navigate, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { NavMenuMobile } from '../../features/admin/components/navigation/NavMenuMobile/NavMenuMobile';
import { MenuItems } from '../../features/admin/components/navigation/MenuItems/MenuItems';
import { Logo } from '../../components/layout/Logo/Logo';
import { Loader } from '../../components/layout/Loader/Loader';
import { USER_ROLES } from '../../constants/main';
import { Container } from '../../components/layout/Container/Container';
import { useAppSelector } from '../../hooks/useAppSelector';
import { styles } from './styles';


const AdminDashboardLayout: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery('(max-width:599px)');

  const { user } = useAppSelector((state) => state.user);
  
  if(!user) {
    return <Loader />;
  }

  if(user && user.role !== USER_ROLES.Admin) {
    return <Navigate to='/login' replace />;
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
          {t('admin_dashboard.layout.goBackBtn')}
        </Link>
      </Container>
      <Container contentStyles={styles.mainContainer}>
        {isMobile ? (
          <NavMenuMobile />
        ) : (
          <Box component='nav'>
            <MenuItems />
          </Box>
        )}
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