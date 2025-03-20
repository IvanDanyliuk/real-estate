import { Box, Typography } from '@mui/material';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { styles } from './styles';
import { NavLink } from 'react-router';

const RegisterPage = () => {
  return (
    <Box sx={styles.page}>
      <Typography variant='h1' sx={styles.title}>
        Create account
      </Typography>
      <RegisterForm />
      <Typography sx={styles.signInText}>
        Already have an account?&nbsp;
        <NavLink to='/login'>
          Sign in
        </NavLink>
      </Typography>
    </Box>
  );
};

export default RegisterPage;