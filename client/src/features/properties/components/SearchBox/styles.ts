import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    position: 'absolute',
    bottom: '1rem',
    left: 0,
    width: '100%',
  },
  searchModeSwitchContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchModeSwitchBtns: {
    width: 'content-fit',
    backgroundColor: 'primary.light',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    overflow: 'hidden',
    '& button': {
      cursor: 'pointer',
      width: '10rem',
      height: '2.5rem',
      fontSize: '1rem',
      border: 'none',
      backgroundColor: 'primary.light',
      '&:disabled': {
        color: 'secondary.dark',
        borderBottomWidth: '3px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'primary.main',
      }
    }
  },
  searchModeSwitchBody: {
    padding: '1rem',
    width: '100%',
    backgroundColor: 'primary.light',
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 1,
    '@media(min-width:600px)': {
      flexDirection: 'row',
    }
  },
  field: {
    position: 'relative',
    flex: 1,
    '& .MuiFormControl-root, .MuiInputBase-root': {
      width: '100%',
    },
    '& label': {
      marginLeft: '1rem',
      fontSize: '0.8rem',
      fontWeight: 500,
      color: 'secondary.main',
    },
    '& input': {
      
    }
  },
  submitBtn: {
    padding: '0 1.2rem',
    height: '3.2rem',
    fontSize: '0.8rem',
  }
};