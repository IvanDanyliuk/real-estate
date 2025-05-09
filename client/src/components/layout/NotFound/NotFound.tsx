import { Link } from 'react-router';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';


interface NotFoundProps {
  title: string;
  message?: string;
};


export const NotFound: React.FC<NotFoundProps> = ({ 
  title = 'Page not found', 
  message 
}) => {
  return (
    <Box sx={styles.component}>
      <Box sx={styles.textContainer}>
        <Typography variant='h1'>
          {title}
        </Typography>
        {message && (
          <Typography>
            {message}
          </Typography>
        )}
      </Box>
      <Link to='/'>
        Go back
      </Link>
    </Box>
  );
};