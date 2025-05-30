import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { UserDataType, userSchema } from '../../../../admin/components/forms/validationSchemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FileInput } from '../../../../../components/inputs/FileInput/FileInput';
import { styles } from './styles';
import { useEffect } from 'react';


interface UpdateProflePhotoFormProps {
  open: boolean;
  currentPhotoUrl?: string;
  onSubmit: (data: FormData) => Promise<any>;
  onHandleOpen: () => void;
};


export const UpdateProfilePhotoForm: React.FC<UpdateProflePhotoFormProps> = ({
  open, 
  currentPhotoUrl, 
  onSubmit, 
  onHandleOpen
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<UserDataType>({
    defaultValues: {
      profilePhoto: undefined
    },
    resolver: zodResolver(userSchema)
  });

  const handlePhotoUpload: SubmitHandler<UserDataType> = (data) => {
    const formData = new FormData();
    if(data.profilePhoto) {
      for (const file of data.profilePhoto) {
        formData.append('profilePhoto', file);
      }
    }

    console.log('UPDATE PROFILE PHOTO HANDLER', data)
  };

  useEffect(() => {
    console.log(errors)
  }, [errors])
  
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
          <Box component='form' onSubmit={handleSubmit(handlePhotoUpload)} sx={styles.form}>
            <FileInput 
              name='profilePhoto'
              // label='Photo' 
              title={t('pages.profile.profilePhotoForm.uploadBtn')}
              error={!!errors.profilePhoto} 
              helperText={errors.profilePhoto?.message} 
              register={register}
              setValue={setValue}
            />
            <Button type='submit'>
              {t('pages.profile.profilePhotoForm.submitBtn')}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};