
import { UserMenu } from '../UserMenu/UserMenu';
import { styles } from './styles';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import { Logo } from '../Logo/Logo';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Link } from 'react-router';
import { Box, useMediaQuery } from '@mui/material';
import { LanguageSelect } from '../LanguageSelect/LanguageSelect';
import { NavbarMobile } from '../NavbarMobile/NavbarMobile';

export const Header: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);

  const isMobile = useMediaQuery('(max-width:599px)');

  return (
    <Container 
      componentType='header' 
      wrapperStyles={styles.component}
      contentStyles={styles.container}
    >
      <Logo />
      <>
        {isMobile ? (
          <NavbarMobile user={user} />
        ) : (
          <>
            <Navbar />
            <Box sx={styles.preferences}>
              <LanguageSelect />
              {user 
                ? <UserMenu user={user} /> 
                : <Link to='/login'>Sign in</Link>
              }
            </Box>
          </>
        )}
      </>
    </Container>
  );
};