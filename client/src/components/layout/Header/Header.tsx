
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import { Logo } from '../Logo/Logo';

export const Header: React.FC = () => {
  return (
    <Container 
      componentType='header' 
      wrapperStyles={styles.component}
      contentStyles={styles.container}
    >
      <Logo />
      <Navbar />
      <UserMenu />
    </Container>
  );
};