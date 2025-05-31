import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    position: 'relative',
    padding: '1rem 0',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 2,
    '@media(min-width: 600px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
    }
  },
  card: {
    position: 'relative',
    padding: '1rem',
    minHeight: '5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& h3': {
      fontSize: '1.5rem',
      fontWeight: 500,
    }
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photo: {
    width: '10rem',
    height: '10rem',
  },
  centerred: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeleton: {
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  }
};