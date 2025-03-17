export const styles = {
  component: {

  },
  navList: {
    display: 'flex',
    gap: '6rem',
    listStyleType: 'none',
    fontWeight: '600',
  },
  navListItem: {
    'a': {
      position: 'relative',
      paddingBottom: '6px',
      display: 'inline-block',
      textDecoration: 'none',
      color: 'text.primary',
      transition: '0.3s ease-in-out',
      '&:before': {
        content: '""',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 0,
        height: '2px',
        backgroundColor: 'primary.main',
        transition: 'width 0.3s ease-in-out',
      },
      '&.active, &:hover': {
        color: 'primary.main',
        '&:before': {
          width: '100%',
        }
      },
    }
  }
}