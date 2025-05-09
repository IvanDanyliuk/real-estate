import { ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import { styles } from './styles';


interface ChartContainerProps {
  title: string;
  controlOptions: { 
    label: string; 
    value: string; 
  }[];
  defaultValue: string;
  onChange: (e: SelectChangeEvent) => void;
  children: ReactNode;
};


export const ChartContainer: React.FC<ChartContainerProps> = ({ 
  title, 
  controlOptions, 
  defaultValue, 
  onChange, 
  children 
}) => {
  const { t } = useTranslation();

  const controlOptionsWithIds = useMemo(() => controlOptions.map(option => ({
    ...option,
    id: crypto.randomUUID(),
  })), [controlOptions]);

  return (
    <Paper component='section' elevation={3} sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant='h3' sx={styles.title}>
          {title}
        </Typography>
        <Select 
          aria-label="Chart option select"
          defaultValue={defaultValue} 
          onChange={onChange}
        >
          {controlOptionsWithIds.map(({ id, label, value }) => (
            <MenuItem key={id} value={value}>
              {t(label)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {children}
    </Paper>
  );
};