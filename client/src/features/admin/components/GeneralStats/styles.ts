import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    display: 'flex',
    gap: 3,
  },
  item: {
    padding: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    flex: 1,
    // '& span': {
    //   textAlign: 'center',
    //   fontSize: '0.7rem',
    // }
  },
  label: {
    fontWeight: 500,
  },
  value: {
    color: 'primary.main',
    fontWeight: 700,
  },
  avgPriceValues: {
    display: 'flex',
  },
};