import { Box, Container as MUIContainer } from '@mui/material';
import { ElementType, ReactNode } from 'react';
import { styles } from './styles';

interface ContainerProps {
  children: ReactNode;
  componentType?: ElementType;
  wrapperStyles?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  componentType = 'div', 
  wrapperStyles, 
  contentStyles,
}) => {
  return (
    <Box 
      component={componentType} 
      sx={{ ...styles.wrapper, ...wrapperStyles }}
    >
      <MUIContainer sx={{ ...styles.component, ...contentStyles }}>
        {children}
      </MUIContainer>
    </Box>
  );
};