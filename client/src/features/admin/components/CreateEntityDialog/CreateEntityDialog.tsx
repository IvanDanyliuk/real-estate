import { ReactNode, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { styles } from './styles';


interface CreateEntityDialog {
  title: string;
  tooltipText: string;
  isSuccess: boolean;
  children: ReactNode;
};


export const CreateEntityDialog: React.FC<CreateEntityDialog> = ({ 
  title, 
  tooltipText, 
  isSuccess, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    if(isSuccess) setIsOpen(false);
  }, [isSuccess]);

  return (
    <>
      <Tooltip title={tooltipText}>
        <IconButton onClick={handleMenuOpen} sx={styles.openBtn}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={handleMenuOpen} maxWidth='xl'>
        <DialogTitle sx={styles.dialogHeading}>
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
};