import { StyleProps } from '../../../../components/types';


export const styles: StyleProps = {
  list: {
    padding: '1rem',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 2,
    '@media(min-width: 600px)': {
      padding: 0,
      gridTemplateColumns: 'repeat(4, 1fr)',
    }
  },
  listItem: {
    cursor: 'pointer',
    position: 'relative',
    padding: '1rem',
    height: '20rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&:before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.3)',
      transition: 'ease-in-out all 0.5s',
    },
    '&:hover': {
      '&:before': {
        background: 'rgba(0, 0, 0, 0)',
      }
    }
  },
  cardInfo: {
    padding: '0.5rem 1rem',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'primary.light',
    borderRadius: '10px',
    overflow: 'hidden',
    zIndex: 10,
    '& h6': {
      fontSize: '1rem',
      fontWeight: 500,
    },
    '& p': {
      fontSize: '0.8rem',
      fontStyle: 'italic',
    },
    '& button': {
      backgroundColor: 'secondary.light',
      color: 'primary.main'
    }
  }
};