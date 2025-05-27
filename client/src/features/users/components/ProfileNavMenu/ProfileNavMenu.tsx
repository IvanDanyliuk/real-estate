import { CSSProperties } from 'react';
import { NavLink } from 'react-router';
import { Box, SvgIcon, Typography } from '@mui/material';
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
    <Box sx={styles.list}>
      {navLinks.map(({ value, label, icon }) => (
        <NavLink 
          key={`profile_nav_links_${value}`} 
          to={value} 
          style={styles.listItem as CSSProperties}
        >
          <SvgIcon component={icon} />
          <Typography variant='caption'>
            {label}
          </Typography>
        </NavLink>
      ))}
    </Box>
  );
};