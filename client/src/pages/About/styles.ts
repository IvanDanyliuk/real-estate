import { StyleProps } from '../../components/types';

export const styles: StyleProps = {
  container: {
    padding: '1rem',
    '& h1, h2': {
      marginBottom: '1rem',
      textAlign: 'center',
    },
    '& h1': {
      fontSize: '3rem',
      fontWeight: 500,
      color: 'primary.main',
    },
    '& h2': {
      marginTop: '3rem',
      fontSize: '2.5rem',
      fontWeight: 400,
      fontStyle: 'italic',
      color: 'primary.main',
    },
  },
  imageContainer: {
    padding: '1rem 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      width: '80%',
    },
  },
  contentText: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 3  ,
    fontSize: '1.2rem',
    color: 'secondary.dark',
    '& span': {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontSize: '1.4rem',
      fontWeight: 500,
      color: 'primary.main',
      '&::before': {
        content: '""',
        width: '3rem',
        height: '2px',
        display: 'inline-block',
        backgroundColor: 'primary.main',
        position: 'relative',
      },
    },
  },
  servicesListItem: {
    '& h3': {
      marginBottom: '1rem',
      fontSize: '1.5rem',
    },
    '& p': {
      color: 'secondary.main'
    }
  },
};