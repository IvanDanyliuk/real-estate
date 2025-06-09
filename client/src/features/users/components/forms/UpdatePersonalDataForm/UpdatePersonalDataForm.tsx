import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserDataType, userSchema } from '../../../../admin/components/forms/validationSchemas/user.schema';
import { User } from '../../../state/types';
import { styles } from './styles';


interface UpdatePersonalDataFormProps {
  open: boolean;
  user: User;
  onSubmit: (data: FormData) => Promise<any>;
  onHandleOpen: () => void;
};


export const UpdatePersonalDataForm: React.FC<UpdatePersonalDataFormProps> = ({ 
  open, 
  user, 
  onSubmit, 
  onHandleOpen 
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserDataType>({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      location: user.location,
    },
    resolver: zodResolver(userSchema)
  });

  const onHandleFormSubmit: SubmitHandler<UserDataType> = (data) => {
    const formData = new FormData();

    formData.append('_id', user._id);
    if(data.name) formData.append('name', data.name);
    if(data.email) formData.append('email', data.email);
    if(data.phone) formData.append('phone', data.phone);
    if(data.location) formData.append('location', data.location);

    onSubmit(formData);
  };

  return (
    <>
      <IconButton onClick={onHandleOpen}>
        <EditNote />
      </IconButton>
      <Dialog 
        open={open} 
        maxWidth='lg' 
        onClose={onHandleOpen}
      >
        <DialogTitle>
          {t('pages.profile.profileForm.title')}
        </DialogTitle>
        <DialogContent sx={styles.container}>
          <Box 
            component='form' 
            onSubmit={handleSubmit(onHandleFormSubmit)}
            sx={styles.form}
          >
            <TextField 
              label={t('pages.profile.profileForm.nameLabel')} 
              fullWidth
              error={!!errors.name} 
              {...register('name')} 
            />
            <TextField 
              label={t('pages.profile.profileForm.emailLabel')} 
              fullWidth
              error={!!errors.email} 
              {...register('email')} 
            />
            <TextField 
              label={t('pages.profile.profileForm.phoneLabel')} 
              fullWidth
              error={!!errors.phone} 
              {...register('phone')} 
            />
            <TextField 
              label={t('pages.profile.profileForm.locationLabel')} 
              fullWidth
              error={!!errors.location} 
              {...register('location')} 
            />
            <Button type='submit'>
              {t('pages.profile.profileForm.submitBtn')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};