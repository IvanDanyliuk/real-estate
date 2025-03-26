
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import { Logo } from '../Logo/Logo';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router';

export const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  return (
    <Container 
      componentType='header' 
      wrapperStyles={styles.component}
      contentStyles={styles.container}
    >
      <Logo />
      <Navbar />
      {user 
        ? <UserMenu user={user} /> 
        : <Link to='/login'>Sign in</Link>
      }
    </Container>
  );
};