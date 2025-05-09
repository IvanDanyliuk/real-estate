import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
    '@media(min-width:600px)': {
      flexDirection: 'row',
    },
  },
  item: {
    padding: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 1,
    flex: 1,
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