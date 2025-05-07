import { Box, CircularProgress } from '@mui/material';
import { styles } from './styles';


export const Loader: React.FC = () => {
  return (
    <Box sx={styles.component}>
      <CircularProgress color='inherit' />
    </Box>
  );
};