import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AD_TYPE } from '../../../../constants/main';
import { REGIONS } from '../../../../constants/geoData';
import { styles } from './styles';


interface SearchData {
  region: string;
  city: string;
  priceFrom: string;
  priceTo: string;
};

const searchInitialData = {
  region: REGIONS[2].value,
  city: 'Lutsk',
  priceFrom: '0',
  priceTo: '0',
};


export const SearchBox: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchMode, setSearchMode] = useState<string>(AD_TYPE.Sale);

  const {
    register, 
    handleSubmit,
  } = useForm<SearchData>({ defaultValues: searchInitialData });

  const handleSearchModeChange = () => {
    if(searchMode === AD_TYPE.Sale) {
      setSearchMode(AD_TYPE.Rent);
    } else {
      setSearchMode(AD_TYPE.Sale);
    }
  };

  const handleSearchDataSubmit: SubmitHandler<SearchData> = (data) => {
    const formData = new FormData();

    if(data.region) formData.append('region', data.region);
    if(data.city) formData.append('city', data.city);
    if(data.priceFrom) formData.append('priceFrom', data.priceFrom );
    if(data.priceTo) formData.append('priceTo', data.priceTo);

    const queryParams = new URLSearchParams();
    for(const [key, value] of formData.entries()) {
      queryParams.append(key, value.toString());
    }
    
    navigate(`/property?${queryParams.toString()}`);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.searchModeSwitchContainer}>
        <Box sx={styles.searchModeSwitchBtns}>
          <Box 
            component='button' 
            onClick={handleSearchModeChange}
            disabled={searchMode === AD_TYPE.Sale}
          >
            {t('pages.home.hero.search.searchModeBtns.sale')}
          </Box>
          <Box 
            component='button' 
            onClick={handleSearchModeChange}
            disabled={searchMode === AD_TYPE.Rent}
          >
            {t('pages.home.hero.search.searchModeBtns.rent')}
          </Box>
        </Box>
      </Box>
      <Box  sx={styles.searchModeSwitchBody}>
        <Box 
          component='form' 
          onSubmit={handleSubmit(handleSearchDataSubmit)} 
          sx={styles.form}
        >
          <Box sx={styles.field}>
            <InputLabel id='region'>
              Region
            </InputLabel>
            <Select 
              labelId='region' 
              defaultValue={REGIONS[2].value} 
              {...register('region')}
            >
              {REGIONS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {t(label)}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={styles.field}>
            <InputLabel htmlFor='city'>
              City
            </InputLabel>
            <TextField 
              id='city' 
              {...register('city')} 
            />
          </Box>
          <Box sx={styles.field}>
            <InputLabel htmlFor='priceFrom'>
              Price from
            </InputLabel>
            <TextField 
              id='priceFrom' 
              type='number'
              {...register('priceFrom')} 
            />
          </Box>
          <Box sx={styles.field}>
            <InputLabel htmlFor='priceTo'>
              Price to
            </InputLabel>
            <TextField 
              id='priceTo' 
              type='number'
              {...register('priceTo')} 
            />
          </Box>
          <Button type='submit' sx={styles.submitBtn}>
            <SearchIcon />
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  );
};