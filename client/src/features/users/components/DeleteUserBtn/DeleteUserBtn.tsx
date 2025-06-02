import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { styles } from "./styles";


interface DeleteUserBtnProps {
  open: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onHandleOpen: () => void;
};


export const DeleteUserBtn: React.FC<DeleteUserBtnProps> = ({ 
  open, 
  isLoading, 
  onSubmit, 
  onHandleOpen 
}) => {
  return (
    <>
      <Button onClick={onHandleOpen} sx={styles.deleteBtn}>
        Delete account
      </Button>
      <Dialog open={open} onClose={onHandleOpen}>
        <DialogTitle>
          Are you sure you want to delete your account?
        </DialogTitle>
        <DialogContent>
          <DialogActions sx={styles.actionBtns}>
            <Button onClick={onSubmit} sx={styles.actionBtnSubmit}>
              Yes
            </Button>
            <Button onClick={onHandleOpen} sx={styles.actionBtnCancel}>
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}