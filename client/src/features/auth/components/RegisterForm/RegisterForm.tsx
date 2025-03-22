import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterDataType, registerSchema } from '../../data-models';
import { styles } from './styles';
import { FileInput } from '../../../../components/inputs/FileInput/FileInput';
import { useSignUpMutation } from '../../state/authApi';

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
  } = useForm<RegisterDataType>({
    resolver: zodResolver(registerSchema)
  });

  const [signUp, response] = useSignUpMutation();

  const onSubmit: SubmitHandler<RegisterDataType> = async (data) => {
    console.log('REGISTER FORM', data);
    const formData = new FormData();
    formData.append('name', data.name); 
    formData.append('email', data.email); 
    formData.append('phone', data.phone); 
    formData.append('password', data.password); 
    formData.append('confirmPassword', data.confirmPassword); 
    if(data.location) formData.append('location', data.location); 
    if(data.profilePhoto) {
      for (const file of data.profilePhoto) {
        formData.append('profilePhoto', file);
      }
    } 

    await signUp(formData);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
      <TextField 
        label='Name' 
        fullWidth 
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')} 
      />
      <TextField 
        label='Email' 
        type='email' 
        fullWidth 
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')} 
      />
      <TextField 
        label='Phone' 
        fullWidth 
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register('phone')} 
      />
      <TextField 
        label='Password' 
        fullWidth 
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')} 
      />
      <TextField 
        label='Confirm password' 
        fullWidth 
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')} 
      />
      <TextField 
        label='Location'
        fullWidth
        error={!!errors.location}
        helperText={errors.location?.message}
        {...register('location')}
      />
      <FileInput 
        name='profilePhoto'
        label='Photo' 
        title='Upload a profile photo'
        error={!!errors.profilePhoto} 
        helperText={errors.profilePhoto?.message} 
        register={register}
        setValue={setValue}
        multiple
      />
      <Button type='submit' sx={styles.submitBtn}>
        {isSubmitting ? 'Loading' : 'Submit'}
      </Button>
    </Box>
  );
};