import { Avatar, Box, Button, Menu, MenuItem, Typography } from '@mui/material';
import { User } from '../../../features/users/state/types';
import { MouseEvent, useState } from 'react';
import { Link } from 'react-router';
import { styles } from './styles';
import { USER_ROLES } from '../../../constants/main';

interface UserMenuProps {
  user: User;
};

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const { name, email, role, profilePhoto } = user;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box 
        component='button'
        id='menu-button' 
        aria-controls={open ? 'user-menu' : undefined} 
        aria-haspopup='true' 
        aria-expanded={open ? 'true' : undefined} 
        onClick={handleOpenMenu} 
        sx={styles.openBtn}
      >
        <Avatar src={profilePhoto || ''} alt={`${name} profile photo`} />
        <Box sx={styles.userInfo}>
          <Typography>
            {name}
          </Typography>
          <Typography>
            {email}
          </Typography>
        </Box>
      </Box>
      <Menu 
        id='user-menu'
        anchorEl={anchorEl} 
        open={open} 
        onClose={handleCloseMenu}
      >
        <MenuItem sx={styles.menuItem}>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        {role === USER_ROLES.Admin && (
          <MenuItem sx={styles.menuItem}>
            <Link to='/dashboard'>
              Dashboard
            </Link>
          </MenuItem>
        )}
        <MenuItem sx={styles.menuItem}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};