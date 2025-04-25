import { StyleProps } from '../../components/types';

export const styles: StyleProps = {
  component: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: '0 auto',
  },
  headerContainer: {
    height: '8vh',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a:last-child': {
      padding: '0.5rem 1rem',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      backgroundColor: 'secondary.light',
      color: 'secondary.dark',
      borderRadius: '5px',
    }
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: 3,
    '@media(min-width:600px)': {
      flexDirection: 'row'
    }
  },
  navSection: {

  },
  contenSection: {
    width: '100%',
  },
};