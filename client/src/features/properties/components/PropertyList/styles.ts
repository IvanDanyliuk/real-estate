import { StyleProps } from '../../../../components/types';


export const styles: StyleProps = {
  container: {
    position: 'relative',
    padding: '1rem',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 2,
    '@media(min-width: 600px)': {
      padding: 0,
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  card: {
    position: 'relative',
    '& a': {
      position: 'relative',
      color: 'secondary.dark'
    },
  },
  likeBtn: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    width: '2rem',
    height: '2rem',
    backgroundColor: 'primary.light',
    color: 'primary.main',
    transition: 'ease-in-out all 0.3s',
    zIndex: 10,
    '&:hover': {
      backgroundColor: 'primary.main',
      color: 'primary.light',
    }
  },
  imageContainer: {
    width: '100%',
    height: '12rem',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  description: {
    padding: '1rem',
    width: '100%',
  },
  labels: {
    display: 'flex',
    gap: 1,
    '& p': {
      padding: '0.3rem 1rem',
      height: '2rem',
      verticalAlign: 'center',
      backgroundColor: 'primary.main',
      color: 'primary.light',
      borderRadius: '1rem'
    }
  },
  title: {
    padding: '1rem 0',
    '& h6': {
      margin: '0 0 0.5rem 0',
      fontSize: '1.2rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& p:nth-of-type(1)': {
      fontSize: '1.2rem',
      fontWeight: 600,
      color: 'primary.main',
    },
  },
  address: {
    minHeight: '3rem',
    display: 'flex',
    gap: 1,
    '& p:nth-of-type(1)': {
      fontSize: '0.8rem',
      fontWeight: 300,
      color: 'secondary.dark'
    }
  },
  overview: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: '2px',
    borderTopStyle: 'solid',
    borderTopColor: 'secondary.light',
  },
  overviewItem: {
    padding: '1rem 0',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 1,
    '& svg': {
      color: 'primary.main',
    },
    '& p': {
      fontSize: '0.8rem',
      fontWeight: 500,
      lineHeight: '0.5rem',
      color: 'secondary.main'
    }
  }
};