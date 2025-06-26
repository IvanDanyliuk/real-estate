import { StyleProps } from '../../components/types';


export const styles: StyleProps = {
  container: {
    width: '100%',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 3,
    '& h1': {
      fontSize: '3rem',
      fontWeight: 500,
      textAlign: 'center',
      color: 'primary.main',
    },
    '& p': {
      fontSize: '1.2rem',
      textAlign: 'center',
      color: 'secondary.main',
    }
  }
};