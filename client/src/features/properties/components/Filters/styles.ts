import { StyleProps } from "../../../../components/types";

export const styles: StyleProps = {
  container: {
    maxWidth: '20rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    '& h3': {
      fontSize: '1.1rem',
      fontWeight: 500,
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
  }
}