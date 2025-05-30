import { useCallback, useState } from 'react';
import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { useUpdateUserMutation } from '../../state/userApi';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { StyleProps } from '../../../../components/types';
import { SectionSkeleton } from '../../../../components/layout/skeletons/SectionSkeleton/SectionSkeleton';
import { UpdatePersonalDataForm } from '../../components/forms/UpdatePersonalDataForm/UpdatePersonalDataForm';
import { statusToast } from '../../../../components/toast/toast';
import { styles } from './styles';


const ProfilePage = () => {
  const { user } = useAppSelector(state => state.user);

  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);

  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  const handleUserFormOpen = () => setIsUserFormOpen(!isUserFormOpen)

  const handleUpdateUserDataSubmit = useCallback(async (data: FormData) => {

    const { data: updatedUser, error } = await updateUser(data);
    console.log('UPDATED USER DATA', updatedUser)

    if(!error) {
      statusToast({ type: 'success', message: updatedUser.message });
      setIsUserFormOpen(false);
    }
  }, [updateUser]);

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
            Personal Information
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
              <TableCell>Name</TableCell>
              <TableCell>{user.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>E-mail</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{user.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{user.location}</TableCell>
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