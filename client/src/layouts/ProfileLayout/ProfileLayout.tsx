import { Navigate, Outlet, useParams } from 'react-router';
import { Box } from '@mui/material';
import { Container } from '../../components/layout/Container/Container';
import { Header } from '../../components/layout/Header/Header';
import { Loader } from '../../components/layout/Loader/Loader';
import { ProfileNavMenu } from '../../features/users/components/ProfileNavMenu/ProfileNavMenu';
import { useAppSelector } from '../../hooks/useAppSelector';


export const ProfileLayout: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const params = useParams();
    
  if(!user) {
    return <Loader />;
  }

  if(user && params.id !== user._id) {
    return <Navigate to='/login' replace />;
  }

  return (
    <Box>
      <Container>
        <Header />
        <ProfileNavMenu userId={user._id} />
        <Outlet />
      </Container>
    </Box>
  );
};