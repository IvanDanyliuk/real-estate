import { useMemo } from 'react';
import { Box, Skeleton } from '@mui/material'
import { styles } from './styles';


interface SectionSkeletonProps {
  numberOfItems: number;
}

export const SectionSkeleton: React.FC<SectionSkeletonProps> = ({ numberOfItems }) => {
  const keyPrefix = useMemo(() => crypto.randomUUID(), []);
  return (
    <Box sx={styles.container}>
      {Array(numberOfItems).fill('').map((_, i) => (
        <Skeleton 
          key={`${keyPrefix}-${i}`} 
          variant='rectangular' 
          sx={styles.item} 
        />
      ))}
    </Box>
  );
};