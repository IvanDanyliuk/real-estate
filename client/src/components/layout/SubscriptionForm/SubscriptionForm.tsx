import { Box, Button, TextField } from "@mui/material";
import Send from '@mui/icons-material/Send';
import { styles } from "./styles"

export const SubscriptionForm: React.FC = () => {
  return (
    <Box component='form' sx={styles.form}>
      <TextField sx={styles.input} placeholder='Your email address' />
      <Button sx={styles.button}>
        <Send />
      </Button>
    </Box>
  );
};