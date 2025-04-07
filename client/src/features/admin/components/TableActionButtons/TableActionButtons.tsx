import { MouseEvent, useState } from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import ActionIcon from '@mui/icons-material/MoreVert';
import UpdateIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styles } from './styles';

interface TableActionButtons {
  onUpdate: () => void;
  onDelete: () => void;
};

export const TableActionButtons: React.FC<TableActionButtons> = ({
  onUpdate,
  onDelete
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl)

  const handleMenuOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    onUpdate();
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton 
        id='menu-button' 
        aria-controls={isOpen ? 'table-action-buttons-menu' : undefined} 
        aria-haspopup='true'
        aria-expanded={isOpen ? 'true' : undefined}
        onClick={handleMenuOpen}
      >
        <ActionIcon />
      </IconButton>
      <Menu 
        id='table-action-buttons-menu' 
        anchorEl={anchorEl}
        open={isOpen} 
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={handleUpdate} 
          sx={styles.actionBtn}
        >
          <UpdateIcon />
          <Typography>
            Update
          </Typography>
        </MenuItem>
        <MenuItem 
          onClick={handleDelete} 
          sx={styles.actionBtn}
        >
          <DeleteIcon />
          <Typography>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};