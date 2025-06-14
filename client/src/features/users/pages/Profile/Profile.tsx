import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { useDeleteUserMutation, useUpdateUserMutation } from '../../state/userApi';
import { useLogoutMutation, useResetPasswordMutation } from '../../../auth/state/authApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { StyleProps } from '../../../../components/types';
import { SectionSkeleton } from '../../../../components/layout/skeletons/SectionSkeleton/SectionSkeleton';
import { UpdatePersonalDataForm } from '../../components/forms/UpdatePersonalDataForm/UpdatePersonalDataForm';
import { UpdateProfilePhotoForm } from '../../components/forms/UpdateProfilePhoto/UpdateProfilePhotoForm';
import { DeleteUserBtn } from '../../components/DeleteUserBtn/DeleteUserBtn';
import { statusToast } from '../../../../components/toast/toast';
import { setUser } from '../../state/userSlice';
import { styles } from './styles';


const ProfilePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const [anchor, setAnchor] = useState<string | null>(null);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [resetPassword, { isLoading: isResetingPassword }] = useResetPasswordMutation();
  const [logout] = useLogoutMutation();

  const handleDialogOpen = (anchorValue: string | null) => {
    if(!anchor) {
      setAnchor(anchorValue);
    } else {
      setAnchor(null);
    }
  };

  const handleUpdateUserDataSubmit = useCallback(async (data: FormData) => {
    const { data: updatedUser, error } = await updateUser(data);
    if(!error) {
      statusToast({ type: 'success', message: updatedUser.message });
      setAnchor(null);
      dispatch(setUser(updatedUser.payload));
    } else {
      statusToast({ type: 'error', message: 'Failed to update the user data' });
    }
  }, [dispatch, updateUser]);

  const handleResetPassword = useCallback(async () => {
    const { data: resetPasswordData, error } = await resetPassword({ email: user?.email });
    if(!error) {
      statusToast({ type: 'success', message: resetPasswordData.message });
    } else {
      statusToast({ type: 'error', message: 'Failed to reset password' });
    }
  }, []);

  const handleUserDelete = useCallback(async () => {
    if(user) {
      const { data: deletedAccountResponse, error } = await deleteUser(user._id);

      if(!error) {
        statusToast({ type: 'success', message: deletedAccountResponse.message });
        await logout(null);
        dispatch(setUser(null));
        navigate('/login', { replace: true });
      } else {
        statusToast({ type: 'error', message: 'Failed to delete a user' });
      }
    }
  }, []);

  if(!user) {
    return (
      <Box sx={styles.skeleton}>
        <SectionSkeleton numberOfItems={2} />
        <SectionSkeleton numberOfItems={2} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Paper sx={{...styles.card, ...styles.centerred} as StyleProps}>
        {user && user.verified && (
          <Typography sx={styles.verificationStatusSuccess}>
            <CheckCircleOutline />
            Verified
          </Typography>
        )}
        {user && !user.verified && (
          <Typography sx={styles.verificationStatusNotVerified}>
            <ErrorOutline />
            You have not verified your email yet. Please, check your email!
          </Typography>
        )}
        <Avatar 
          src={user.profilePhoto} 
          alt={user.name} 
          sx={styles.photo} 
        />
        <UpdateProfilePhotoForm 
          open={anchor === 'update_profile_photo'}
          userId={user._id} 
          isLoading={isUpdating}
          onHandleOpen={() => handleDialogOpen('update_profile_photo')}
          onSubmit={handleUpdateUserDataSubmit} 
        />
      </Paper>
      <Paper sx={styles.card}>
        <Box sx={styles.cardHeader}>
          <Typography variant='h3'>
            {t('pages.profile.pageSections.userData.title')}
          </Typography>
          <UpdatePersonalDataForm 
            open={anchor === 'update_personal_data'}
            user={user} 
            onSubmit={handleUpdateUserDataSubmit} 
            onHandleOpen={() => handleDialogOpen('update_personal_data')}
          />
        </Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                {t('pages.profile.pageSections.userData.nameLabel')}
              </TableCell>
              <TableCell>
                {user.name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('pages.profile.pageSections.userData.emailLabel')}
              </TableCell>
              <TableCell>
                {user.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('pages.profile.pageSections.userData.phoneLabel')}
              </TableCell>
              <TableCell>
                {user.phone}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                {t('pages.profile.pageSections.userData.addressLabel')}
              </TableCell>
              <TableCell>
                {user.location}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Paper sx={styles.card}>
        <Typography variant='h3'>
          {t('pages.profile.pageSections.actions.title')}
        </Typography>
        <Box sx={styles.actions}>
          <DeleteUserBtn 
            open={anchor === 'delete_user'} 
            isLoading={isDeleting}
            onHandleOpen={() => handleDialogOpen('delete_user')} 
            onSubmit={handleUserDelete} 
          />
          <Button onClick={handleResetPassword} sx={styles.resetPasswordBtn}>
            {t('pages.profile.resetPasswordBtn.label')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfilePage;