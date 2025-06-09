import { StyleProps } from '../../../../components/types';

export const styles: StyleProps = {
  container: {
    display: 'flex',
    gap: 2,
  },
  filters: {

  },
  main: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  sortingControls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labels: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
  label: {
    backgroundColor: 'primary.main',
    color: 'primary.light',
  },
  properties: {
    padding: '1rem 0',
  },
};