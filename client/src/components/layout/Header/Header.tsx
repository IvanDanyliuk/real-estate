
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';

export const Header: React.FC = () => {
  return (
    <Container 
      componentType='header' 
      wrapperStyles={styles.component}
    >
      <div>Logo</div>
      <Navbar />
      <UserMenu />
    </Container>
  );
};