import { StyleProps } from '../../../../components/types';


export const styles: StyleProps = {
  articleContainer: {
    backgroundColor: 'primary.light',
    overflow: 'hidden',
    '& a': {
      color: 'secondary.dark',
      transition: 'all ease-in-out 0.5s',
      '&:hover': {
        opacity: 0.8,
      },
    },
  },
  imageContainer: {
    width: '100%',
    height: '20rem',
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  textContentContainer: {
    padding: '1rem',
  },
  textContent: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
};