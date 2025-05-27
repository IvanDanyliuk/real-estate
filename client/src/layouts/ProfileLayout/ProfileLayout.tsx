import { Box } from '@mui/material'
import { Container } from '../../components/layout/Container/Container';
import { ProfileNavMenu } from '../../features/users/components/ProfileNavMenu/ProfileNavMenu';
import { Outlet } from 'react-router';


export const ProfileLayout: React.FC = () => {
  return (
    <Box>
      <Container>
        <ProfileNavMenu />
        <Outlet />
      </Container>
    </Box>
  );
};