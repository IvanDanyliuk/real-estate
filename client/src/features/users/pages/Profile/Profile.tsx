import { Avatar, Box, Button, IconButton, Paper, Table, TableCell, TableRow, Typography } from '@mui/material';
import { EditNote } from '@mui/icons-material';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { styles } from './styles';
import { StyleProps } from '../../../../components/types';
import { SectionSkeleton } from '../../../admin/skeletons/SectionSkeleton/SectionSkeleton';
import { UpdatePersonalDataForm } from '../../components/forms/UpdatePersonalDataForm/UpdatePersonalDataForm';
import { useCallback, useState } from 'react';


const ProfilePage = () => {
  const { user } = useAppSelector(state => state.user);

  const [isUserFormOpen, setIsUserFormOpen] = useState<boolean>(false);

  const handleUserFormOpen = () => setIsUserFormOpen(!isUserFormOpen)

  const handleUpdateUserDataSubmit = useCallback(async (data: FormData) => {
    
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
        </Table>
      </Paper>
      <Paper sx={styles.card}>
        Actions: Reset Password, Delete account
      </Paper>
    </Box>
  );
};

export default ProfilePage;