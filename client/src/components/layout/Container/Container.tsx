import { ElementType, ReactNode } from 'react';
import { Box, Breakpoint, Container as MUIContainer, SxProps, Theme } from '@mui/material';
import { styles } from './styles';

interface ContainerProps {
  children: ReactNode;
  componentType?: ElementType;
  wrapperStyles?: SxProps<Theme>;
  contentStyles?: SxProps<Theme>;
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
      sx={{ ...styles.wrapper, ...wrapperStyles } as SxProps}
    >
      <MUIContainer 
        sx={{ ...styles.component, ...contentStyles } as SxProps} 
        maxWidth={containerMaxWidth}
      >
        {children}
      </MUIContainer>
    </Box>
  );
};