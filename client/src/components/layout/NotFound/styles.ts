export const styles = {
  component: {
    width: '100%',
    height: '92vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    '& a': {
      padding: '1rem 3rem',
      backgroundColor: 'primary.main',
      color: 'primary.light',
      textTransform: 'uppercase',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'primary.main',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: 'primary.light',
        color: 'primary.main',
      },
    },
  },
  textContainer: {
    textAlign: 'center',
    '& h1': {
      fontSize: '6rem',
      color: 'primary.main',
    },
    '& p': {
      fontSize: '2rem',
      color: 'secondary.main'
    },
  }
};