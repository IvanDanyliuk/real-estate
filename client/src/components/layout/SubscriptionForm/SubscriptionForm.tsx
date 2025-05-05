import { useTranslation } from 'react-i18next';
import { Box, Button, TextField } from '@mui/material';
import Send from '@mui/icons-material/Send';
import { styles } from './styles'

export const SubscriptionForm: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box component='form' sx={styles.form}>
      <TextField 
        placeholder={t('main_layout.additionalFooterLinks.getUpdatedForm.placeholder')}
        sx={styles.input} />
      <Button sx={styles.button}>
        <Send />
      </Button>
    </Box>
  );
};