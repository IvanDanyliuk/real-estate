import { StyleProps } from '../../../../../components/types';

export const styles: StyleProps = {
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navListItem: {
    padding: 0,
    '& a': {
      padding: '1rem 2rem',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontWeight: 500,
      backgroundColor: 'secondary.light',
      color: 'secondary.dark',
      borderRadius: '5px',
      transition: 'all ease-out 0.5s',
    },
    '& a.active, & a:hover': {
      backgroundColor: 'primary.main',
      color: 'primary.light',
    },
  },
};