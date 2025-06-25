import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    '& h1': {
      fontSize: '3rem',
      fontWeight: 400,
    },
  },
  headerSubInfo: {
    display: 'flex',
    alignItems: 'center',
    color: 'secondary.main',
    gap: 3,
    '& p': {
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginRight: '0.5rem',
      }
    }
  },
  price: {
    fontSize: '3rem',
    fontWeight: 600,
    color: 'primary.main'
  },
  infoItem: {
    '& h4': {
      fontSize: '2rem',
      fontWeight: 500,
    },
  },
  overview: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
  },
  overviewItem: {
    padding: '1rem',
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    gap: 1,
  },
  iconContainer: {
    width: '3rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'secondary.light',
    borderRadius: '5px',
    color: 'primary.main',
  },
  overviewItemInfo: {
    '& p:nth-child(1)': {
      fontSize: '0.9rem',
      fontWeight: 500,
    },
    '& p:nth-child(2)': {
      fontSize: '0.8rem',
      color: 'secondary.main'
    }
  },
  nearbyAmenitiesList: {
    padding: '1rem 0',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  nearbyAmenitiesListItem: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    gap: 3,
    boxSizing: 'border-box',
    '& p:nth-child(1)': {
      fontWeight: 500,
    },
    '& p:nth-child(2)': {
      color: 'secondary.main',
    },
  },
  location: {
    position: 'relative',
    width: '100%',
    minHeight: '50rem',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  userInfo: {
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  userPhoto: {
    width: '10rem',
    height: '10rem',
  },
  authorName: {
    fontSize: '1.5rem',
    fontWeight: 500,
  },
  authorContactInfoItem: {
    fontSize: '1rem',
    color: 'secondary.main',
    '& span': {
      marginRight: '0.5rem',
      fontSize: '1rem',
      fontWeight: 500,
      color: 'secondary.dark',
    }
  }
};