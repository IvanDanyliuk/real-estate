import { ReactNode, useMemo } from 'react';
import { Box, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';


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

  const id = useMemo(() => crypto.randomUUID(), []);

  return (
    <Paper component='section' sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant='h3' sx={styles.title}>
          {title}
        </Typography>
        <Select 
          id={id} 
          defaultValue={defaultValue} 
          onChange={onChange}
        >
          {controlOptions.map((option, i) => (
            <MenuItem key={`${id}-${i}`} value={option.value}>
              {t(option.label)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {children}
    </Paper>
  );
};