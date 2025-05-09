import { StyleProps } from '../../types';

export const styles: StyleProps = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  button: {
    cursor: 'pointer',
    position: 'relative', 
    padding: 0,
    display: 'flex',
    width: '30px',
    border: 'none',
    borderRadius: '3px',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: 'auto',
      flex: 1,
      objectFit: 'cover',
    },
    '&:not(:disabled)': {
      '&:before': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: '#000000',
        opacity: 0.4,
      },
    },
  },
};