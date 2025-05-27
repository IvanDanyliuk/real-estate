import { Box } from '@mui/material';
import { styles } from './styles';


const ProfilePage = () => {
  return (
    <Box sx={styles.container}>
      <Box>
        Photo
      </Box>
      <Box>
        Personal Info
      </Box>
      <Box>
        Actions: Reset Password, Delete account
      </Box>
    </Box>
  );
};

export default ProfilePage;