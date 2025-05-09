import { StyleProps } from '../../types';

export const styles: StyleProps = {
  openBtn: {
    cursor: 'pointer',
    display: 'flex',
    gap: '1rem',
    backgroundColor: 'primary.light',
    border: 'none',
  },
  userInfo: {
    '& p': {
      textAlign: 'left',
      '&:first-of-type': {
        fontWeight: 500,
        color: 'secondary.dark',
      },
      '&:last-child': {
        fontSize: '0.8rem',
        color: 'secondary.main',
      },
    },
  },
  menuItem: {
    color: 'secondary.dark',
    '& a': {
      color: 'secondary.dark',
    },
  },
};