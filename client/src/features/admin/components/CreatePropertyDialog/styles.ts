import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
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
  dialog: {
    minWidth: '700px',
  },
  dialogHeading: {
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};