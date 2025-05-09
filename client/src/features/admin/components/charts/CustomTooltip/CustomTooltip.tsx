import { TooltipProps } from 'recharts';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { styles } from './styles';


export const CustomTooltip: React.FC<TooltipProps<string, number>> = ({ active, payload, label }) => {
  const { t } = useTranslation();
  if(active) {
    return (
      <Box sx={styles.container}>
        <Typography sx={styles.title}>
          {label}
        </Typography>
        {payload?.map((entry, index) => (
          <Box key={`item-${index}`} sx={{ color: entry.color }}>
            {t(`constants.chartDataKeys.${entry.name}`)}: {entry.value}
          </Box>
        ))}
      </Box>
    );
  }

  return null;
};