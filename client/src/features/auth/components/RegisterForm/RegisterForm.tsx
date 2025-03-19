import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterDataType, registerSchema } from '../../data-models';
import { styles } from './styles';

export const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<RegisterDataType>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit: SubmitHandler<RegisterDataType> = (data) => {
    console.log('REGISTER FORM', data);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={styles.form}>
      <TextField 
        placeholder='Name' 
        fullWidth 
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register('name')} 
      />
      <TextField 
        placeholder='Email' 
        type='email' 
        fullWidth 
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')} 
      />
      <TextField 
        placeholder='Phone' 
        fullWidth 
        error={!!errors.phone}
        helperText={errors.phone?.message}
        {...register('phone')} 
      />
      <TextField 
        placeholder='Password' 
        fullWidth 
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')} 
      />
      <TextField 
        placeholder='Confirm password' 
        fullWidth 
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        {...register('confirmPassword')} 
      />
      <TextField 
        placeholder='Location'
        fullWidth
        error={!!errors.location}
        helperText={errors.location?.message}
        {...register('location')}
      />
      
      {/* TODO: Add the Upload Image input */}

      <Button type='submit'>
        {isSubmitting ? 'Loading' : 'Submit'}
      </Button>
    </Box>
  );
};