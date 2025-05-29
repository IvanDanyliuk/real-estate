import { StyleProps } from "../../../../../components/types";

export const styles: StyleProps = {
  container: {
    minWidth: '90%',
    '@media(min-width:600px)': {
      minWidth: '30rem'
    }
  },
  form: {
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  }
};