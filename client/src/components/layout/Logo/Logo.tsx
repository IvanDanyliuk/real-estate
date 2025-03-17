import { NavLink } from 'react-router';
import { Box } from '@mui/material';
import { styles } from './styles';
import HeaderLogo from '../../../assets/images/logo_header.svg';
import FooterLogo from '../../../assets/images/logo_footer.svg';

interface LogoProps {
  type?: 'light' | 'dark';
};

export const Logo: React.FC<LogoProps> = ({ type = 'dark' }) => {
  return (
    <NavLink to='/'>
      <Box 
        component='img' 
        src={type === 'dark' ? HeaderLogo : FooterLogo} 
        alt='logo' 
        sx={styles}
      />
    </NavLink>
  );
};