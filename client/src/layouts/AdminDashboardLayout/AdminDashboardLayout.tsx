import { Link, Navigate, Outlet } from 'react-router';
import { Box } from '@mui/material';
import { styles } from './styles';
import { Logo } from '../../components/layout/Logo/Logo';
import { Loader } from '../../components/layout/Loader/Loader';
import { useAppSelector } from '../../hooks/useAppSelector';
import { USER_ROLES } from '../../constants/main';

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
      <Box component='header' sx={styles.header}>
        <Logo />
        <Link to='/'>Go back</Link>
      </Box>
      <Outlet />
    </Box>
  );
};

export default AdminDashboardLayout;