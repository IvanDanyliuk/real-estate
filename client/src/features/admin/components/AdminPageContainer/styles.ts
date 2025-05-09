import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  header: {
    marginBottom: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openBtn: {
    padding: '0.8rem',
    backgroundColor: 'primary.main',
    color: 'primary.light',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: 'primary.main',
    '&:hover': {
      backgroundColor: 'primary.light',
      color: 'primary.main',
    },
  },
  content: {
    marginBottom: 3,
  },
};