
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import { Logo } from '../Logo/Logo';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router';
import { Box } from '@mui/material';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';

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
      <Box sx={styles.preferences}>
        <LanguageSelect />
        {user 
          ? <UserMenu user={user} /> 
          : <Link to='/login'>Sign in</Link>
        }
      </Box>
    </Container>
  );
};