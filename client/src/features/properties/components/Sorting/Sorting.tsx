import { useSearchParams } from 'react-router-dom';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';


const sortingOptions = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'price',
    label: 'price',
  },
  {
    value: 'area',
    label: 'area',
  },
  {
    value: 'overview.roomsNumber',
    label: 'roomsNumber'
  },
];


export const Sorting: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortFromParams = searchParams.get('sort') || 'default';

  const handleChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;

    const newSearchParams = new URLSearchParams(searchParams);
    if (value === 'default') {
      newSearchParams.delete('sortBy');
    } else {
      newSearchParams.set('sortBy', value);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <Select value={sortFromParams} onChange={handleChange}>
      {sortingOptions.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {t(`pages.properties.sortingMenu.${label}`)}
        </MenuItem>
      ))}
    </Select>
  );
};