import { useState } from 'react';
import { Box, MenuItem, Select, TextField } from '@mui/material';
import { styles } from './styles';
import { AD_TYPE } from '../../../../constants/main';
import { SubmitHandler, useForm } from 'react-hook-form';
import { REGIONS } from '../../../../constants/geoData';
import { useTranslation } from 'react-i18next';


export const SearchBox: React.FC = () => {
  const { t } = useTranslation();
  const [searchMode, setSearchMode] = useState<string>(AD_TYPE.Sale);

  const {
    register, 
    handleSubmit,
  } = useForm();

  const handleSearchModeChange = () => {
    if(searchMode === AD_TYPE.Sale) {
      setSearchMode(AD_TYPE.Rent);
    } else {
      setSearchMode(AD_TYPE.Sale);
    }
  };

  const handleSearchDataSubmit: SubmitHandler<any> = (data) => {
    const formData = new FormData();

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
        <Box component='form' onSubmit={handleSubmit(handleSearchDataSubmit)}>
          <Select {...register('region')} defaultValue={REGIONS[2].value}>
            {REGIONS.map(({ value, label }) => (
              <MenuItem key={value} value={value}>
                {t(label)}
              </MenuItem>
            ))}
          </Select>
          <TextField {...register('city')} />
        </Box>
      </Box>
    </Box>
  );
};