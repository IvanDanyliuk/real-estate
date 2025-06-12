import { useSearchParams } from 'react-router-dom';
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, Select, Slider, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AD_TYPES, MARKET_TYPES, PROPERTY_TYPES } from '../../../../constants/main';
import { REGIONS } from '../../../../constants/geoData';
import { styles } from './styles';


type FilterKey = 'propertyType' | 'market' | 'adType';


export const Filters: React.FC = () => {
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();

  const propertyTypeFromParams = searchParams.get('propertyType')?.split(',') || [];
  const marketTypeFromParams = searchParams.get('marketType')?.split(',') || [];
  const priceFromParams = searchParams.get('price')?.split(',').map(Number) || [26000, 185000];
  const areaFromParams = searchParams.get('area')?.split(',').map(Number) || [26, 470];

  const defaultValues: Record<string, boolean | string[] | number[]> = {};

  defaultValues['price'] = priceFromParams;
  defaultValues['area'] = areaFromParams;
  defaultValues['location'] = [];

  PROPERTY_TYPES.forEach(({ value }) => {
    defaultValues[value] = propertyTypeFromParams.includes(value);
  });

  MARKET_TYPES.forEach(({ value }) => {
    defaultValues[value] = marketTypeFromParams.includes(value);
  });

  const { control, reset } = useForm({ defaultValues });

  const handleInputFiltersChange = (key: string, value: string | number | (string | number)[]) => {
    if (Array.isArray(value)) {
      searchParams.set(key, value.join(','));
    } else {
      searchParams.set(key, value.toString());
    }
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

  const handleClearFilters = () => {
    const newSearchParams = new URLSearchParams();
    setSearchParams(newSearchParams);
    reset(defaultValues);
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
                  handleInputFiltersChange('location', e.target.value.toString());
                }}
              >
                {REGIONS.map(({ value, label }) => (
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
        <Divider />
        <FormGroup>
          <Typography 
            variant='h6' 
            sx={styles.sectionName}
          >
            {t('pages.properties.filters.sections.price.title')}
          </Typography>
          <Controller 
            name='price'
            control={control}
            render={({ field }) => (
              <>
                <Slider
                  {...field}
                  value={field.value as any}
                  onChange={(_, value) => {
                    field.onChange(value);
                    handleInputFiltersChange('price', value as number[]);
                  }}
                  valueLabelDisplay='auto'
                  min={0}
                  max={200000}
                  step={1000}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2'>
                    {typeof field.value === 'object' ? field.value[0] : ''}
                  </Typography>
                  <Typography variant='body2'>
                    {typeof field.value === 'object' ? field.value[1] : ''}
                  </Typography>
                </Box>
              </>
            )}
          />
        </FormGroup>
        <Divider />
        <FormGroup>
          <Typography 
            variant='h6' 
            sx={styles.sectionName}
          >
            {t('pages.properties.filters.sections.area.title')}
          </Typography>
          <Controller 
            name='area'
            control={control}
            render={({ field }) => (
              <>
                <Slider
                  {...field}
                  value={field.value as any}
                  onChange={(_, value) => {
                    field.onChange(value);
                    handleInputFiltersChange('area', value as number[]);
                  }}
                  valueLabelDisplay='auto'
                  min={0}
                  max={1000}
                  step={1}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant='body2'>
                    {typeof field.value === 'object' ? field.value[0] : ''}
                  </Typography>
                  <Typography variant='body2'>
                    {typeof field.value === 'object' ? field.value[1] : ''}
                  </Typography>
                </Box>
              </>
            )}
          />
        </FormGroup>
        <Button onClick={handleClearFilters}>
          Clear filters
        </Button>
      </Box>
    </Box>
  );
};