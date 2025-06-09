import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Loader } from '../../../../components/layout/Loader/Loader';
import { styles } from './styles';


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
  const { t } = useTranslation();

  return (
    <>
      <Button onClick={onHandleOpen} sx={styles.deleteBtn}>
        {t('pages.profile.deleteAccount.triggerBtn')}
      </Button>
      <Dialog open={open} onClose={onHandleOpen}>
        <DialogTitle sx={styles.title}>
          {t('pages.profile.deleteAccount.title')}
        </DialogTitle>
        <DialogContent>
          <DialogActions sx={styles.actionBtns}>
            <Button 
              disabled={isLoading} 
              onClick={onSubmit} 
              sx={styles.actionBtnSubmit}
            >
              {isLoading 
                ? <Loader /> 
                : t('pages.profile.deleteAccount.acceptBtn')
              }
            </Button>
            <Button 
              disabled={isLoading} 
              onClick={onHandleOpen} 
              sx={styles.actionBtnCancel}
            >
              {t('pages.profile.deleteAccount.cancelBtn')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  )
}