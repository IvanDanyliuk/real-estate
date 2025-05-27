import { Box } from '@mui/material'
import { Container } from '../../components/layout/Container/Container';
import { ProfileNavMenu } from '../../features/users/components/ProfileNavMenu/ProfileNavMenu';
import { Outlet } from 'react-router';
import { Header } from '../../components/layout/Header/Header';


export const ProfileLayout: React.FC = () => {
  return (
    <Box>
      <Container>
        <Header />
        <ProfileNavMenu />
        <Outlet />
      </Container>
    </Box>
  );
};