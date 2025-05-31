import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserDataType, userSchema } from '../../../../admin/components/forms/validationSchemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput } from '../../../../../components/inputs/FileInput/FileInput';
import { styles } from './styles';


interface UpdateProflePhotoFormProps {
  open: boolean;
  userId: string;
  isLoading: boolean;
  onSubmit: (data: FormData) => Promise<any>;
  onHandleOpen: () => void;
};


export const UpdateProfilePhotoForm: React.FC<UpdateProflePhotoFormProps> = ({
  open, 
  userId, 
  isLoading, 
  onSubmit, 
  onHandleOpen
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserDataType>({
    defaultValues: {
      profilePhoto: undefined
    },
    resolver: zodResolver(userSchema)
  });

  const handlePhotoUpload: SubmitHandler<UserDataType> = (data) => {
    const formData = new FormData();
    formData.append('_id', userId);
    if(data.profilePhoto) {
      for (const file of data.profilePhoto) {
        formData.append('profilePhoto', file);
      }
    }
    onSubmit(formData);
  };
  
  return (
    <>
      <Button onClick={onHandleOpen}>
        {t('pages.profile.profilePhotoForm.openBtn')}
      </Button>
      <Dialog open={open} onClose={onHandleOpen}>
        <DialogTitle>
          {t('pages.profile.profilePhotoForm.title')}
        </DialogTitle>
        <DialogContent>
          <Box 
            component='form' 
            onSubmit={handleSubmit(handlePhotoUpload)} 
            sx={styles.form}
          >
            <FileInput 
              name='profilePhoto'
              title={t('pages.profile.profilePhotoForm.uploadBtn')}
              error={!!errors.profilePhoto} 
              helperText={errors.profilePhoto?.message} 
              register={register}
              setValue={setValue}
            />
            <Button 
              type='submit' 
              disabled={isLoading}
            >
              {t(isLoading 
                ? 'pages.profile.profilePhotoForm.loading' 
                : 'pages.profile.profilePhotoForm.submitBtn'
              )}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};