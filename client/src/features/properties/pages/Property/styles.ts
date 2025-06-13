import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  images: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gallery: {
    padding: '1rem 0',
    width: '100%',
  },
  column: {
    overflow: 'hidden'
  },
  stack: {
    width: '100%',
  },
  mainImageItem: {
    width: '100%',
    height: '16rem',
    '& img': {
      objectFit: 'cover',
    },
    '@media(min-width:600px)': {
      height: 'auto',
    }
  },
  imageItem: {
    position: 'relative',
    '& img': {
      width: '100%',
      height: '16rem',
      boxSizing: 'border-box',
      objectFit: 'cover'
    },
  },
  link: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  }
};