import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    padding: '1rem 0',
  },
  skeleton: {
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  createPropertyBtn: {
    position: 'absolute',
    bottom: '3rem',
    right: '3rem',
    width: '3rem',
    height: '3rem',
    fontSize: '2rem',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: 'success.main',
    backgroundColor: 'success.main',
    color: 'primary.light',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'primary.light',
      color: 'success.main',
    },
  },
};