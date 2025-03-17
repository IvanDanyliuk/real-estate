import { Outlet } from 'react-router';
import { Container } from '../../components/layout/Container/Container';

const AuthLayout = () => {
  return (
    <Container componentType='main'>
      <Outlet />
    </Container>
  );
};

export default AuthLayout;