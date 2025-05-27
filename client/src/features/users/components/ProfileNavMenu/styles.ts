import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  list: {
    padding: 0,
    width: '100%',
    display: 'flex',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'primary.main',
    borderRadius: '10px',
    overflow: 'hidden'
  },
  listItem: {
    padding: 0,
    flex: 1,
    '& a': {
      padding: '0.5rem 0',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1,
      color: 'secondary.main',
      transition: 'ease-in-out all 0.3s',
      '& span': {
        fontWeight: 500,
      }
    },
    '& a.active, & a:hover': {
      backgroundColor: 'primary.main',
      color: 'primary.light',
    }
  },
};