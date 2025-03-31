export const styles = {
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
  },
  mainContainer: {
    display: 'flex',
    gap: 3,
  },
  navSection: {

  },
  contenSection: {

  },
  navList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  navListItem: {
    padding: 0,
    
    '& a': {
      padding: '1rem 2rem',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      fontWeight: 500,
      backgroundColor: 'secondary.light',
      color: 'inherit',
      borderRadius: '5px',
      transition: 'all ease-out 0.5s',
      '&:hover, & .active': {
        backgroundColor: 'primary.main',
        color: 'primary.light',
      },
    },
  },
};