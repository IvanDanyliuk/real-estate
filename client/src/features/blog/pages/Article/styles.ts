import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  imageContainer: {
    width: '100%',
    height: '50rem',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& p': {
      color: 'secondary.main'
    }
  },
  notFound: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    textAlign: 'center',
    color: 'primary.main',
  }
};