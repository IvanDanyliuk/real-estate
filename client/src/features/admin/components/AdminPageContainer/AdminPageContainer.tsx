import { ReactNode } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';

interface AdminPageContainerProps {
  heading: string;
  actionBtnTooltip?: string;
  actionBtnHandler?: () => void;
  children: ReactNode;
};

export const AdminPageContainer: React.FC<AdminPageContainerProps> = ({
  heading,
  actionBtnTooltip,
  actionBtnHandler,
  children,
}) => {
  return (
    <>
      <Box sx={styles.header}>
        <Typography variant='h1'>
          {heading}
        </Typography>
        {actionBtnHandler && (
          <Tooltip title={actionBtnTooltip}>
            <IconButton onClick={actionBtnHandler} sx={styles.actionBtn}>
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