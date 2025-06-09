import { StyleProps } from '../../../../components/types';


export const styles: StyleProps = {
  deleteBtn: {
    padding: '0 1rem',
    width: '100%',
    borderColor: 'error.main', 
    backgroundColor: 'error.main',
    '&:hover': {
      color: 'error.main'
    },
    '@media(min-width:600px)': {
      width: 'fit-content',
    }
  },
  title: {
    fontSize: '1.1rem',
  },
  actionBtns: {
    width: '100%',
  },
  actionBtnSubmit: {
    minWidth: '6rem',
    borderColor: 'error.main', 
    backgroundColor: 'error.main',
    '&:hover': {
      color: 'error.main'
    }
  },
  actionBtnCancel: {
    minWidth: '6rem',
    borderColor: 'success.main', 
    backgroundColor: 'success.main',
    '&:hover': {
      color: 'success.main'
    }
  },
};