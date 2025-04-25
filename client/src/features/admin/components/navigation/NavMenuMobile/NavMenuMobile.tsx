import { useState } from 'react';
import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/ExpandMore';
import { MenuItems } from '../MenuItems/MenuItems';
import { styles } from './styles';


export const NavMenuMobile: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='top'
        open={isMenuOpen}
        onClose={handleMenuOpen}
        slotProps={{
          paper: {
            sx: styles.mobileMenuContainer
          }
        }}
      >
        <Box component='nav'>
          <MenuItems onClose={handleMenuClose} />
        </Box>
      </Drawer>
    </>
  );
};