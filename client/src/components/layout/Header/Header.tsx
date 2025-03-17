
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';

export const Header: React.FC = () => {
  return (
    <Container 
      componentType='header' 
      wrapperStyles={styles.component}
    >
      <div>Logo</div>
      <nav>Navigation</nav>
      <UserMenu />
    </Container>
  );
};