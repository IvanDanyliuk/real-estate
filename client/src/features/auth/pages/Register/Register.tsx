import { Box, Typography } from '@mui/material';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { styles } from './styles';

const RegisterPage = () => {
  return (
    <Box sx={styles.page}>
      <Typography variant='h1'>
        Create account
      </Typography>
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;