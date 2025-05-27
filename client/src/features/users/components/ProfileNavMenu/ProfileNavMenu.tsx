import { CSSProperties } from 'react';
import { NavLink } from 'react-router';
import { Box, List, ListItem, SvgIcon, Typography } from '@mui/material';
import { AssignmentInd, HomeWork } from '@mui/icons-material';
import { styles } from './styles';


const navLinks = [
  {
    value: '/profile',
    label: 'Personal Info',
    icon: AssignmentInd,
  },
  {
    value: '/profile/properties',
    label: 'Liked Properties',
    icon: HomeWork,
  },
];


export const ProfileNavMenu: React.FC = () => {
  return (
    <List sx={styles.list}>
      {navLinks.map(({ value, label, icon }) => (
        <ListItem key={`profile_nav_links_${value}`} sx={styles.listItem}>
          <NavLink to={value}>
            <SvgIcon component={icon} />
            <Typography variant='caption'>
              {label}
            </Typography>
          </NavLink>
        </ListItem>
      ))}
    </List>
  );
};