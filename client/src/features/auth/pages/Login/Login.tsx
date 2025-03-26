import { NavLink } from 'react-router';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';
import { LoginForm } from '../../components/LoginForm/LoginForm';

const LoginPage = () => {
  return (
    <Box sx={styles.page}>
      <Typography variant='h1' sx={styles.title}>
        Create account
      </Typography>
      <LoginForm />
      <Typography sx={styles.signInText}>
        Do not have an account?&nbsp;
        <NavLink to='/register'>
          Sign in
        </NavLink>
      </Typography>
    </Box>
  );
};

export default LoginPage;