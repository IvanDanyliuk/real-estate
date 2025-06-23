import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    display: 'flex',
    gap: 0,
    '@media(min-width:600px)': {
      gap: 2
    }
  },
  main: {
    flex: 1,
  },
  header: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  properties: {
    padding: '1rem 0',
  },
};