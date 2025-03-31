import { StyleProps } from '../../types';

export const styles: StyleProps = {
  form: {
    width: '100%',
    display: 'flex',
  },
  input: {
    flex: 1,
    '& .MuiInputBase-root': {
      minWidth: '16rem',
      height: '2.6rem',
      backgroundColor: 'primary.light',
      borderRadius: '10px 0 0 10px',
    },
    '& .MuiInputBase-input, .MuiOutlinedInput-input': {
      padding: '10px',
      fontSize: '0.8rem',
      fontStyle: 'italic',
    },
  },
  button: {
    backgroundColor: 'primary.main',
    color: 'primary.light',
    borderRadius: '0 10px 10px 0'
  },
};