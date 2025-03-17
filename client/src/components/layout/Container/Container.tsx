import { ElementType, ReactNode } from 'react';
import { Box, Breakpoint, Container as MUIContainer } from '@mui/material';
import { styles } from './styles';

interface ContainerProps {
  children: ReactNode;
  componentType?: ElementType;
  wrapperStyles?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
  containerMaxWidth?: Breakpoint | undefined
};

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  componentType = 'div', 
  wrapperStyles, 
  contentStyles,
  containerMaxWidth = 'xl',
}) => {
  return (
    <Box 
      component={componentType} 
      sx={{ ...styles.wrapper, ...wrapperStyles }}
    >
      <MUIContainer 
        sx={{ ...styles.component, ...contentStyles }} 
        maxWidth={containerMaxWidth}
      >
        {children}
      </MUIContainer>
    </Box>
  );
};