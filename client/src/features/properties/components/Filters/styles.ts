import { StyleProps } from "../../../../components/types";

export const styles: StyleProps = {
  container: {
    position: 'relative',
  },
  content: {
    minWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& h3': {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    '@media(min-width:600px)': {
      minWidth: '20rem',
    }
  },
  sections: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  sectionName: {
    marginBottom: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  mobileFiltersBtn: {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '4rem',
    height: '4rem',
    backgroundColor: 'secondary.main',
    color: 'primary.main',
    zIndex: 10,
  },
}