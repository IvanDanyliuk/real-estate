import { Link, Navigate, Outlet } from 'react-router';
import { Box } from '@mui/material';
import { Logo } from '../../components/layout/Logo/Logo';
import { Loader } from '../../components/layout/Loader/Loader';
import { USER_ROLES } from '../../constants/main';
import { Container } from '../../components/layout/Container/Container';
import { useAppSelector } from '../../hooks/useAppSelector';
import { styles } from './styles';

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
          Go back
        </Link>
      </Container>
      <Outlet />
    </Box>
  );
};

export default AdminDashboardLayout;