import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Box, Button, TextField } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginDataType, loginSchema } from '../../data-models';
import { styles } from './styles';
import { useLoginMutation } from '../../state/authApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { setUser } from '../../../users/state/userSlice';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema)
  });

  const [login, { isSuccess }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginDataType> = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email); 
    formData.append('password', data.password); 
    console.log('ON SUBMIT', data)
    await login(formData);
    // dispatch(setUser(user.data as any));
  };

  useEffect(() => {
    if(isSuccess) {
      reset();
      navigate('/', { replace: true });
    }
  }, [isSuccess]);

  return (
    <Box 
      component='form' 
      onSubmit={handleSubmit(onSubmit)} 
      sx={styles.form}
    >
      <TextField 
        label='Email' 
        type='email' 
        fullWidth 
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register('email')} 
      />
      <TextField 
        label='Password' 
        type='password'
        fullWidth 
        error={!!errors.password}
        helperText={errors.password?.message}
        {...register('password')} 
      />
      <Link to='/forgot-password'>
        Forgot a password?
      </Link>
      <Button type='submit' sx={styles.submitBtn}>
        {isSubmitting ? 'Loading' : 'Submit'}
      </Button>
    </Box>
  );
};