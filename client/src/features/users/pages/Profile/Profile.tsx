import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useUpdateUserMutation } from '../../state/userApi';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { StyleProps } from '../../../../components/types';
import { SectionSkeleton } from '../../../../components/layout/skeletons/SectionSkeleton/SectionSkeleton';
import { UpdatePersonalDataForm } from '../../components/forms/UpdatePersonalDataForm/UpdatePersonalDataForm';
import { statusToast } from '../../../../components/toast/toast';
import { setUser } from '../../state/userSlice';
import { styles } from './styles';


const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);

  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);

  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  const handleUserFormOpen = () => {
    setIsUserFormOpen(!isUserFormOpen);
  };

  const handleUpdateUserDataSubmit = useCallback(async (data: FormData) => {
    const { data: updatedUser, error } = await updateUser(data);
    if(!error) {
      statusToast({ type: 'success', message: updatedUser.message });
      setIsUserFormOpen(false);
      dispatch(setUser(updatedUser.payload));
    } else {
      statusToast({ type: 'error', message: 'Failed to update the user data' });
    }
  }, [dispatch, updateUser]);

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
        <Avatar 
          src={user.profilePhoto} 
          alt={user.name} 
          sx={styles.photo} 
        />
        <Button>
          Update Profile photo
        </Button>
      </Paper>
      <Paper sx={styles.card}>
        <Box sx={styles.cardHeader}>
          <Typography variant='h3'>
            {t('pages.profile.pageSections.userData.title')}
          </Typography>
          <UpdatePersonalDataForm 
            open={isUserFormOpen} 
            user={user} 
            onSubmit={handleUpdateUserDataSubmit} 
            onHandleOpen={handleUserFormOpen} 
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
        Actions: Reset Password, Delete account
      </Paper>
    </Box>
  );
};

export default ProfilePage;