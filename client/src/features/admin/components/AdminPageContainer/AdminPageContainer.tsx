import { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';

interface AdminPageContainerProps {
  heading: string;
  actionComponent?: ReactNode;
  children: ReactNode;
};

export const AdminPageContainer: React.FC<AdminPageContainerProps> = ({
  heading,
  actionComponent,
  children,
}) => {
  return (
    <>
      <Box sx={styles.header}>
        <Typography variant='h1'>
          {heading}
        </Typography>
        {actionComponent}
      </Box>
      <Box>
        {children}
      </Box>
    </>
  );
};