export const styles = {
  component: {
    padding: '3rem 0',
    backgroundColor: 'secondary.dark',
    color: 'primary.light',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  column: {
    flex: 1,
    '&:first-child': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      'p': {
        textWrap: 'balance',
      }
    },
    'a': {
      color: 'primary.light'
    }
  }
}