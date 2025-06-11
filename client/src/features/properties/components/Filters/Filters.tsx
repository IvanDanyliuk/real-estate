import { useSearchParams } from 'react-router-dom';
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, Select, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AD_TYPES, MARKET_TYPES, PROPERTY_TYPES } from '../../../../constants/main';
import { REGIONS, REGIONS_DEFAULT } from '../../../../constants/geoData';
import { styles } from './styles';


type FilterKey = 'propertyType' | 'market' | 'adType'

const regions = [...REGIONS, REGIONS_DEFAULT];


export const Filters: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const propertyTypeFromParams = searchParams.get('propertyType')?.split(',') || [];
  const marketTypeFromParams = searchParams.get('marketType')?.split(',') || [];

  const defaultValues: Record<string, boolean | string[]> = {};

  defaultValues['location'] = [REGIONS_DEFAULT.value];

  PROPERTY_TYPES.forEach(({ value }) => {
    defaultValues[value] = propertyTypeFromParams.includes(value);
  });

  MARKET_TYPES.forEach(({ value }) => {
    defaultValues[value] = marketTypeFromParams.includes(value);
  });

  const { control } = useForm({ defaultValues });

  const handleInputFiltersChange = (key: string, value: string | number) => {
    searchParams.set(key, value.toString());
    setSearchParams(searchParams);
  };

  const handleCheckboxFiltersChange = (type: string, checked: boolean, key: FilterKey) => {
    const current = searchParams.get(key)?.split(',') || [];
    let updated: string[];

    if(checked) {
      updated = [...new Set([...current, type])];
    } else {
      updated = current.filter(item => item !== type);
    }

    if(updated.length > 0) {
      searchParams.set(key, updated.join(','));
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  };

  return (
    <Box sx={styles.container}>
      <Typography variant='h3'>
        {t('pages.properties.filters.title')}
      </Typography>
      <Divider sx={styles.divider} />
      <Box sx={styles.sections}>
        <Box>
          <Typography variant='h6' sx={styles.sectionName}>
            {t('pages.properties.filters.sections.location.title')}
          </Typography>
          <Controller 
            name='location'
            control={control}
            render={({ field }) => (
              <Select 
                fullWidth 
                multiple
                {...field}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  handleInputFiltersChange('location', e.target.value.toString())
                }}
              >
                {regions.map(({ value, label }) => (
                  <MenuItem 
                    key={`region_${value}`} 
                    value={value}
                  >
                    {t(label)}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </Box>
        <Divider sx={styles.divider} />
        <FormGroup>
          <Typography variant='h6' sx={styles.sectionName}>
            {t('pages.properties.filters.sections.propertyType.title')}
          </Typography>
          {PROPERTY_TYPES.map(({ value, label }) => (
            <Controller 
              key={`property_type_${value}`}
              name={value}
              control={control}
              render={({ field }) => (
                <FormControlLabel 
                  control={
                    <Checkbox 
                      {...field} 
                      checked={Boolean(field.value)} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleCheckboxFiltersChange(value, e.target.checked, 'propertyType')
                      }} 
                    />
                  }
                  label={t(label)}
                />
              )}
            />
          ))}
        </FormGroup>
        <Divider sx={styles.divider} />
        <FormGroup>
          <Typography variant='h6' sx={styles.sectionName}>
            {t('pages.properties.filters.sections.marketType.title')}
          </Typography>
          {MARKET_TYPES.map(({ value, label }) => (
            <Controller 
              key={`market_type_${value}`}
              name={value}
              control={control}
              render={({ field }) => (
                <FormControlLabel 
                  control={
                    <Checkbox 
                      {...field} 
                      checked={Boolean(field.value)} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleCheckboxFiltersChange(value, e.target.checked, 'market')
                      }} 
                    />
                  }
                  label={t(label)}
                />
              )}
            />
          ))}
        </FormGroup>
        <Divider />
        <FormGroup>
          <Typography variant='h6' sx={styles.sectionName}>
            {t('pages.properties.filters.sections.adType.title')}
          </Typography>
          {AD_TYPES.map(({ value, label }) => (
            <Controller 
              key={`ad_type_${value}`}
              name={value}
              control={control}
              render={({ field }) => (
                <FormControlLabel 
                  control={
                    <Checkbox 
                      {...field} 
                      checked={Boolean(field.value)} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleCheckboxFiltersChange(value, e.target.checked, 'adType')
                      }} 
                    />
                  }
                  label={t(label)}
                />
              )}
            />
          ))}
        </FormGroup>

      </Box>
    </Box>
  );
};