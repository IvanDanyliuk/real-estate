import { StyleProps } from '../../types';

export const styles: StyleProps = {
  component: {
    padding: '3rem 0',
    backgroundColor: 'secondary.dark',
    color: 'primary.light',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media(min-width:600px)': {
      flexDirection: 'row',
    },
    gap: '3rem',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    'h4': {
      fontSize: '1.5rem',
    },
    'p': {
      textAlign: 'center',
      textWrap: 'balance',
    },
    'a': {
      margin: '0 auto',
      color: 'primary.light'
    },
    '@media(min-width:600px)': {
      alignItems: 'start',
      'p': {
        textAlign: 'start',
      },
      'a': {
        margin: 0,
      }
    },
  },
  list: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  listItem: {
    margin: 0,
    padding: 0,
  },
};