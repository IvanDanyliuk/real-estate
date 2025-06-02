import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PasswordDataType, passwordSchema } from '../../../../admin/components/forms/validationSchemas/user.schema';
import { User } from '../../../state/types';
import { styles } from './styles';


interface ChangePasswordFormProps {
  open: boolean;
  user: User;
  onSubmit: (data: FormData) => Promise<any>;
  onHandleOpen: () => void;
};


export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ 
  open, 
  user, 
  onSubmit, 
  onHandleOpen 
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PasswordDataType>({
    defaultValues: {
      prevPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(passwordSchema)
  });

  const handleFormSubmit: SubmitHandler<PasswordDataType> = (data) => {
    const formData = new FormData();
    formData.append('prevPassword', data.prevPassword);
    formData.append('newPassword', data.newPassword);
    formData.append('confirmNewPassword', data.confirmNewPassword);
    onSubmit(formData);
  };

  return (
    <>
      <Button sx={styles.triggerBtn}>
        {t('pages.profile.updatePassword.triggerBtn')}
      </Button>
      <Dialog open={open} onClose={onHandleOpen}>
        <DialogTitle>
          {t('pages.profile.updatePassword.title')}
        </DialogTitle>
        <DialogContent>
          <Box 
            component='form' 
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <TextField 
              type='password' 
              fullWidth
              label={t('pages.profile.updatePassword.prevPasswordLabel')} 
              {...register('prevPassword')} 
            />
            <TextField 
              type='password' 
              fullWidth
              label={t('pages.profile.updatePassword.newPasswordLabel')} 
              {...register('newPassword')} 
            />
            <TextField 
              type='password' 
              fullWidth
              label={t('pages.profile.updatePassword.confirmNewPassword')} 
              {...register('confirmNewPassword')} 
            />
            <Button>
              {t('pages.profile.updatePassword.submitBtn')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};