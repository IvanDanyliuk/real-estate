import { NavLink } from 'react-router';
import { List, ListItem, SvgIcon } from '@mui/material';
import { ADMIN_DASHBOARD_NAV_LINKS } from '../../../../../constants/navLinks';
import { styles } from './styles';


interface MenuItemsProps {
  onClose?: () => void;
};


export const MenuItems: React.FC<MenuItemsProps> = ({ onClose }) => {
  return (
    <List sx={styles.navList}>
      {ADMIN_DASHBOARD_NAV_LINKS.map(({ href, label, icon }, i) => (
        <ListItem 
          key={`${href}-${i}`} 
          sx={styles.navListItem}
        >
          <NavLink 
            to={href} 
            end={href === ADMIN_DASHBOARD_NAV_LINKS[0].href}
            onClick={onClose}
          >
            <SvgIcon component={icon} />
            {label}
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};