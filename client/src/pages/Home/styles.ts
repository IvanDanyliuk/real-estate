import { StyleProps } from '../../components/types';

export const styles: StyleProps = {
  container: {
    margin: '0 auto',
    position: 'relative',
  },
  hero: {
    position: 'relative',
    width: '100%',
    height: '92vh',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.3 )',
      zIndex: -1,
    },
  },
  introduction: {
    position: 'absolute',
    top: '10vh',
    left: 0,
    padding: '2.5rem',
    maxWidth: '35rem',
    backgroundColor: 'primary.light',
    borderRadius: '10px',
    '& h1': {
      marginTop: '1.5rem',
      fontSize: '2rem',
      fontWeight: 500,
      fontStyle: 'italic',
      lineHeight: '1.5rem',
      '& span': {
        display: 'block',
        fontSize: '2rem',
        fontWeight: 600,
        fontStyle: 'normal',
        color: 'primary.main'
      }
    },
    '& h3': {
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontSize: '1.1rem',
      fontWeight: 500,
      '&:before': {
        content: '""',
        width: '3rem',
        height: '2px',
        backgroundColor: 'primary.main'
      }
    },
    '& p': {
      margin: '1.2rem 0',
    },
    '& a': {
      fontSize: '1.3rem',
      color: 'secondary.dark',
      '& span': {
        marginLeft: '0.3rem',
        fontSize: '1.3rem',
        fontWeight: 600,
        color: 'primary.main',
      }
    }
  }
};