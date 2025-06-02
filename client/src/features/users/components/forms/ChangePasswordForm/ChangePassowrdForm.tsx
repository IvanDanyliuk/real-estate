import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { User } from '../../../state/types';
import { useForm } from 'react-hook-form';


interface ChangePasswordFormProps {
  open: boolean;
  user: User;
  onSubmit: (data: FormData) => Promise<any>;
  onHandleOpen: () => void;
};

type PasswordData = {
  prevPassword: string,
  newPassowrd: string,
  confirmNewPassword: string,
}


export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ 
  open, 
  user, 
  onSubmit, 
  onHandleOpen 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PasswordData>({
    defaultValues: {
      prevPassword: '',
      newPassowrd: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(userSchema)
  });

  return (
    <>
      <Button>
        Change password
      </Button>
      <Dialog open={open} onClose={onHandleOpen}>
        <DialogTitle>
          Update password
        </DialogTitle>
        <DialogContent>
          <Box component='form'>

          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}