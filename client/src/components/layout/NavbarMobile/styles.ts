import { StyleProps } from '../../types';

export const styles: StyleProps = {
  container: {
    padding: '1rem',
    width: '300px',
  },
  nav: {
    marginTop: '2rem',
  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    listStyleType: 'none',
    '& li': {
      padding: 0,
      textAlign: 'center',
    },
    '& a': {
      padding: '1rem 3rem',
      color: 'secondary.dark',
      borderRadius: '5px',
      '&.active': {
        display: 'block',
        backgroundColor: 'primary.main',
        color: 'primary.light'
      }
    }
  },
};