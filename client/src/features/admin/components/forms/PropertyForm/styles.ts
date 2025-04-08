import { StyleProps } from "../../../../../components/types";

export const styles: StyleProps = {
  form: {
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
  },
  fieldset: {
    padding: '0.5rem 0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1.2,
    border: 'none',
  },
  submitBtnContainer: {
    position: 'relative',
    width: '100%',
  },
  submitBtn: {
    margin: '0 auto',
    padding: '0 2rem',
  },
  amenitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  amenitiesListItem: {
    padding: '0.3rem 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'secondary.light',
    borderRadius: '5px',
  },
};