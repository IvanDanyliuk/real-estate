import { StyleProps } from '../../types';

export const styles: StyleProps = {
  component: {
    padding: '3rem 0',
    backgroundColor: 'secondary.dark',
    color: 'primary.light',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '3rem',
  },
  column: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    'p': {
      textWrap: 'balance',
    },
    'a': {
      color: 'primary.light'
    }
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
  }
}