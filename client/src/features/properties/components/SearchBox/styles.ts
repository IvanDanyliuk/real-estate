import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    position: 'relative',
    bottom: '1rem',
    left: 0,
    width: '100%',
    '@media(min-width:600px)': {
      position: 'absolute',

    }
  },
  searchModeSwitchContainer: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    '@media(min-width:600px)': {
      justifyContent: 'flex-end',
    }
  },
  searchModeSwitchBtns: {
    width: '100%',
    backgroundColor: 'primary.light',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    overflow: 'hidden',
    '& button': {
      cursor: 'pointer',
      width: '50%',
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
    },
    '@media(min-width:600px)': {
      width: 'auto',
      '& button': {
        width: '10rem',
      }
    }
  },
  searchModeSwitchBody: {
    padding: '1rem',
    width: '100%',
    backgroundColor: 'primary.light',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px',
    '@media(min-width:600px)': {
      borderTopLeftRadius: '10px',
    }
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
    width: '100%',
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
      
    },
  },
  submitBtn: {
    marginTop: '1rem',
    padding: '0 1.2rem',
    width: '100%',
    height: '3.2rem',
    fontSize: '0.8rem',
    '@media(min-width:600px)': {
      width: 'auto'
    }
  }
};