import { NavLink } from 'react-router';
import { List, ListItem, SvgIcon, Typography, useMediaQuery } from '@mui/material';
import { PROFILE_NAV_LINKS } from '../../../../constants/navLinks';
import { styles } from './styles';


interface ProfileMenuProps {
  userId: string;
}

export const ProfileNavMenu: React.FC<ProfileMenuProps> = ({ userId }) => {
  const isMobile = useMediaQuery('(max-width:599px)');
  
  return (
    <List sx={styles.list}>
      {PROFILE_NAV_LINKS.map(({ value, label, icon }) => (
        <ListItem 
          key={`profile_nav_links_${value}`} 
          sx={styles.listItem}
        >
          <NavLink 
            to={value.replace(/:id/, userId)} 
            end={value === PROFILE_NAV_LINKS[0].value}
          >
            <SvgIcon component={icon} />
            {!isMobile && (
              <Typography variant='caption'>
                {label}
              </Typography>
            )}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};