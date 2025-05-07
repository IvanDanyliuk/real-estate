import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { User } from '../../../features/users/state/types'
import { UserMenu } from '../UserMenu/UserMenu';
import { NAV_LINKS } from '../../../constants/navLinks';
import { styles } from './styles';


interface NavbarMobileProps {
  user: User | null;
}


export const NavbarMobile: React.FC<NavbarMobileProps> = ({ user }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsOpen(!isOpen)
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer 
        open={isOpen} 
        anchor='right' 
        onClose={handleMenuOpen}
      >
        <Box sx={styles.container}>
          <Box>
            {user 
              ? <UserMenu user={user} /> 
              : <Link to='/login'>Sign in</Link>
            }
          </Box>
          <Box component='nav' sx={styles.nav}>
            <Box component='ul' sx={styles.navList}>
              {NAV_LINKS.map(({ href, label }, i) => (
                <Box 
                  key={`${href}-${i}`} 
                  component='li' 
                  sx={styles.navListItem}
                >
                  <NavLink to={href}>
                    {t(label)}
                  </NavLink>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};