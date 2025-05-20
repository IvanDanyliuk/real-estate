import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '@media(min-width:600px)': {
      flexDirection: 'row',
    }
  },
  listItem: {
    display: 'flex',
    flex: 1,
  },
  card: {
    cursor: 'pointer',
    position: 'relative',
    padding: '2rem 1rem',
    width: '100%',
    height: '100%',
    minHeight: '12rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    border: 'none',
    backgroundColor: 'secondary.light',
    transition: 'ease-in-out all 0.5s',
    '&:hover': {
      backgroundColor: 'primary.main',
    }
  },
  icon: {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  title: {
    minHeight: '5rem',
    textAlign: 'center',
    '& h6': {
      fontSize: '1rem',
      lineHeight: '1.2rem'
    },
    '& p': {
      marginTop: '0.5rem',
      fontSize: '0.8rem',
      fontStyle: 'italic',
    },
  },
};