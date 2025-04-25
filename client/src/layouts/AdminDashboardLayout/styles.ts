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
  // mobileMenuContainer: {
  //   padding: '3rem',
  //   borderBottomLeftRadius: '10px',
  //   borderBottomRightRadius: '10px',
  // },
  navSection: {

  },
  contenSection: {
    width: '100%',
  },
  // navList: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   gap: 2,
  // },
  // navListItem: {
  //   padding: 0,
  //   '& a': {
  //     padding: '1rem 2rem',
  //     width: '100%',
  //     display: 'flex',
  //     alignItems: 'center',
  //     gap: 1,
  //     fontWeight: 500,
  //     backgroundColor: 'secondary.light',
  //     color: 'secondary.dark',
  //     borderRadius: '5px',
  //     transition: 'all ease-out 0.5s',
  //   },
  //   '& a.active, & a:hover': {
  //     backgroundColor: 'primary.main',
  //     color: 'primary.light',
  //   },
  // },
};