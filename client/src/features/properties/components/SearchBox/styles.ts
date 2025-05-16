import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    position: 'absolute',
    bottom: 0,
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
      fontSize: '1.1rem',
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
};