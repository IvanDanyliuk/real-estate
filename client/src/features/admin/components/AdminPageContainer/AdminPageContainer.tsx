import { ReactNode } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';


interface AdminPageContainerProps {
  heading: string;
  actionBtnTooltipText?: string;
  action?: () => void;
  children: ReactNode;
};


export const AdminPageContainer: React.FC<AdminPageContainerProps> = ({
  heading,
  actionBtnTooltipText,
  action,
  children,
}) => {
  return (
    <>
      <Box sx={styles.header}>
        <Typography variant='h1'>
          {heading}
        </Typography>
        {action && (
          <Tooltip title={actionBtnTooltipText || 'Create new'}>
            <IconButton onClick={action} sx={styles.openBtn}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Box>
        {children}
      </Box>
    </>
  );
};